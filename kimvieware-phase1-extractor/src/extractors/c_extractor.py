"""
CExtractor — Phase 1 : Extraction de Trajectoires pour C/C++
=============================================================
Implémente le Pattern Bridge + Decorator du mémoire (Section 1.3).

Moteur principal : KLEE (Symbolic Execution Engine)
Fallback         : libclang (analyse statique AST via Clang)

Stratégie KLEE (mémoire Section 1.3.3) :
  1. Compiler le fichier C/C++ en bitcode LLVM :
       clang -emit-llvm -c -g -O0 src/service.c -o src/service.bc
  2. Marquer les variables symboliques avec klee_make_symbolic().
  3. Lancer KLEE :
       klee --only-output-states-covering-new src/service.bc
  4. Parser le répertoire de sortie klee-out-* (fichiers .ktest + path_info).
  5. Reconstruire les Trajectory depuis les états KLEE.

Stratégie Fallback libclang (analyse statique) :
  1. Parser les fichiers .c/.cpp avec libclang (Clang Python Bindings).
  2. Construire le CFG de chaque fonction (IF_STMT, WHILE_STMT, FOR_STMT…).
  3. Explorer tous les chemins par DFS sur le CFG.
  4. Extraire les contraintes de chaque nœud de branchement → Pi(t).
  5. Vérifier la faisabilité via Z3 (τSMT = 2s).

Chaque trajectoire produite contient les champs complets du modèle Trajectory
conformément au Tableau des notations (Section 1.4.2) du mémoire.

Affichage temps réel de chaque trajectoire extraite pour visualisation.
"""

import hashlib
import logging
import os
import subprocess
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple

from kimvieware_shared.models import Trajectory

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────────────────────────────────────
# Configuration libclang (Clang Python Bindings)
# ─────────────────────────────────────────────────────────────────────────────

_LIBCLANG_PATHS = [
    "/usr/lib/llvm-18/lib/libclang-18.so.1",
    "/usr/lib/llvm-18/lib/libclang-18.so",
    "/usr/lib/llvm-18/lib/libclang.so",
    "/usr/lib/x86_64-linux-gnu/libclang-18.so.1",
    "/usr/lib/llvm-16/lib/libclang.so",
    "/usr/lib/x86_64-linux-gnu/libclang-16.so.1",
    "/usr/lib/llvm-14/lib/libclang.so",
    "/usr/local/lib/libclang.so",
]

_CLANG_AVAILABLE = False
_clang_index = None


def _init_clang():
    """Initialise libclang une seule fois."""
    global _CLANG_AVAILABLE, _clang_index
    if _CLANG_AVAILABLE:
        return True
    try:
        import clang.cindex as ci  # type: ignore

        for path in _LIBCLANG_PATHS:
            if os.path.exists(path):
                try:
                    ci.Config.set_library_file(path)
                    _clang_index = ci.Index.create()
                    _CLANG_AVAILABLE = True
                    logger.info(f"  ✅ libclang chargé : {path}")
                    return True
                except Exception:
                    continue

        # Essai avec la config système par défaut
        _clang_index = ci.Index.create()
        _CLANG_AVAILABLE = True
        logger.info("  ✅ libclang chargé (chemin système)")
        return True

    except ImportError:
        logger.warning("  ⚠️  clang Python bindings non installés.")
        logger.warning("      → pip install libclang")
        return False
    except Exception as e:
        logger.warning(f"  ⚠️  Impossible d'initialiser libclang : {e}")
        return False


# ─────────────────────────────────────────────────────────────────────────────
# Structures internes
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class CFGNode:
    """
    Nœud du Graphe de Flot de Contrôle (CFG) d'une fonction C/C++.
    Conforme à la Définition 1 (Section 1.3.1 du mémoire) :
      G = (V, E) où chaque v ∈ V représente un bloc de base.
    """
    node_id:   int
    kind:      str           # Nom du CursorKind Clang (ex: IF_STMT, FOR_STMT)
    location:  str           # "fichier:ligne:colonne"
    children:  List[int] = field(default_factory=list)
    is_branch: bool = False  # True si point de décision (crée plusieurs branches)
    condition: str  = ""     # Texte de la condition extraite du source


# ─────────────────────────────────────────────────────────────────────────────
# CExtractor
# ─────────────────────────────────────────────────────────────────────────────

class CExtractor:
    """
    Extracteur de trajectoires pour les microservices C/C++.

    Flux d'exécution (Algorithme 1 adapté C/C++) :
      1. Tentative KLEE sur le bitcode LLVM.
      2. Si KLEE indisponible ou échec → analyse AST libclang.
      3. Pour chaque fonction : construction CFG → DFS → trajectoires.
      4. Vérification SAT via Z3 pour chaque chemin.
      5. Affichage temps réel de chaque trajectoire retenue.
    """

    # CursorKinds identifiés comme points de branchement dans Clang
    BRANCH_CURSOR_KINDS_NAMES: Set[str] = {
        "IF_STMT",
        "WHILE_STMT",
        "FOR_STMT",
        "DO_STMT",
        "SWITCH_STMT",
        "CASE_STMT",
        "CONDITIONAL_OPERATOR",
    }

    def __init__(
        self,
        max_paths:      int = 200,
        timeout_global: int = 120,
    ):
        self.max_paths      = max_paths
        self.timeout_global = timeout_global
        self._next_id       = 0

    # ─────────────────────────────────────────────────────────────────────────
    # Point d'entrée public
    # ─────────────────────────────────────────────────────────────────────────

    def extract_paths(self, source_dir: Path) -> List[Trajectory]:
        """
        Extrait les trajectoires symboliques d'un projet C/C++.
        Retourne la liste T des chemins faisables.
        """
        logger.info("=" * 70)
        logger.info("  PHASE 1 — C/C++ EXTRACTOR (KLEE / libclang AST)")
        logger.info(f"  SUT Path  : {source_dir}")
        logger.info(f"  Budget    : {self.timeout_global}s  |  Max paths: {self.max_paths}")
        logger.info("=" * 70)

        start_time = time.time()

        # ── Tentative 1 : KLEE ───────────────────────────────────────────────
        logger.info("\n  🔬 Tentative KLEE (Symbolic Execution Engine)…")
        klee_trajectories = self._run_klee(source_dir, start_time)

        if klee_trajectories:
            elapsed = time.time() - start_time
            logger.info(f"\n  ✅ KLEE : {len(klee_trajectories)} trajectoires extraites "
                        f"en {elapsed:.2f}s")
            return klee_trajectories

        # ── Tentative 2 : libclang ───────────────────────────────────────────
        logger.warning("  ⚠️  KLEE non disponible ou non configuré.")
        logger.info("  🔄 Fallback : analyse statique AST avec libclang…\n")
        return self._extract_via_ast(source_dir, start_time)

    # ─────────────────────────────────────────────────────────────────────────
    # KLEE — Exécution symbolique sur bitcode LLVM
    # ─────────────────────────────────────────────────────────────────────────

    def _run_klee(self, source_dir: Path, start_time: float) -> List[Trajectory]:
        """
        Orchestre l'appel à KLEE :
          1. Compilation clang → bitcode LLVM (.bc)
          2. Appel KLEE CLI
          3. Parsing du répertoire klee-out-*
          4. Conversion en Trajectory

        Référence mémoire (Section 1.3.3) :
          clang -emit-llvm -c -g src/auth.c -o src/auth.bc
          klee --only-output-states-covering-new src/auth.bc
        """
        # Vérifier que klee est installé
        if not _is_tool_available("klee"):
            logger.debug("  KLEE non trouvé dans PATH.")
            return []
        if not _is_tool_available("clang"):
            logger.warning("  ⚠️  clang non trouvé dans PATH (nécessaire pour KLEE).")
            return []

        c_files = list(source_dir.rglob("*.c")) + list(source_dir.rglob("*.cpp"))
        c_files = [f for f in c_files
                   if "test" not in str(f).lower()
                   and "build" not in str(f).lower()]

        if not c_files:
            return []

        trajectories: List[Trajectory] = []

        for c_file in c_files[:5]:  # Limiter pour la démo
            elapsed = time.time() - start_time
            if elapsed >= self.timeout_global:
                break

            # Étape 1 : Compiler en bitcode LLVM
            bc_file = c_file.with_suffix(".bc")
            std_flag = "-std=c++14" if c_file.suffix == ".cpp" else "-std=c11"
            compile_cmd = [
                "clang", std_flag,
                "-emit-llvm", "-c", "-g", "-O0",
                str(c_file), "-o", str(bc_file)
            ]

            logger.info(f"  🔨 Compilation LLVM : {c_file.name} → {bc_file.name}")
            try:
                result = subprocess.run(
                    compile_cmd, capture_output=True, text=True, timeout=30
                )
                if result.returncode != 0:
                    logger.warning(f"  ⚠️  Compilation échouée : {result.stderr[:200]}")
                    continue
            except (subprocess.TimeoutExpired, FileNotFoundError) as e:
                logger.warning(f"  ⚠️  clang error : {e}")
                continue

            # Étape 2 : Lancer KLEE
            klee_out = source_dir / f"klee-out-{c_file.stem}"
            remaining = self.timeout_global - (time.time() - start_time)
            klee_cmd = [
                "klee",
                "--only-output-states-covering-new",
                "--max-time", str(int(min(30, remaining))),
                "--output-dir", str(klee_out),
                str(bc_file)
            ]

            logger.info(f"  🚀 KLEE sur : {bc_file.name}")
            try:
                r = subprocess.run(
                    klee_cmd, capture_output=True, text=True,
                    timeout=min(30, remaining)
                )
                klee_trajs = self._parse_klee_output(
                    r.stdout + r.stderr, klee_out, c_file.stem
                )
                trajectories.extend(klee_trajs)
                for t in klee_trajs:
                    _print_trajectory(t, len(trajectories), "KLEE-SAT",
                                      time.time() - start_time)
            except subprocess.TimeoutExpired:
                logger.warning(f"  ⏰ KLEE timeout sur {bc_file.name}")
            except Exception as e:
                logger.warning(f"  ⚠️  Erreur KLEE : {e}")
            finally:
                # Nettoyer le .bc
                if bc_file.exists():
                    bc_file.unlink()

        return trajectories

    def _parse_klee_output(
        self, output: str, klee_out_dir: Path, stem: str
    ) -> List[Trajectory]:
        """
        Parse la sortie de KLEE pour reconstruire les trajectoires.
        KLEE produit des fichiers .ktest et des logs avec les path conditions.
        """
        trajectories: List[Trajectory] = []

        # Parser les fichiers .ktest si disponibles
        if klee_out_dir.exists():
            ktest_files = list(klee_out_dir.glob("*.ktest"))
            for idx, ktest in enumerate(ktest_files):
                traj = Trajectory(
                    path_id=f"klee_{stem}_state_{idx:03d}",
                    basic_blocks=[idx],
                    path_condition=f"klee_path_{idx}",
                    branches_covered=set(),
                    constraints=[f"klee_test_{ktest.name}"],
                    cost=1.0,
                    is_feasible=True,
                )
                trajectories.append(traj)

        # Parser les logs texte KLEE (path conditions en sortie)
        if output:
            path_idx = 0
            for line in output.splitlines():
                line = line.strip()
                if "KLEE: generated" in line and "test" in line:
                    # KLEE: generated test: test000001
                    traj = Trajectory(
                        path_id=f"klee_{stem}_path_{path_idx:03d}",
                        basic_blocks=[path_idx],
                        path_condition=f"klee_generated_path_{path_idx}",
                        branches_covered=set(),
                        constraints=[line],
                        cost=1.0,
                        is_feasible=True,
                    )
                    trajectories.append(traj)
                    path_idx += 1

        return trajectories

    # ─────────────────────────────────────────────────────────────────────────
    # Fallback : Analyse AST avec libclang
    # ─────────────────────────────────────────────────────────────────────────

    def _extract_via_ast(self, source_dir: Path, start_time: float) -> List[Trajectory]:
        """
        Analyse statique des sources C/C++ via libclang.
        Construit le CFG de chaque fonction et explore tous les chemins par DFS.
        """
        if not _init_clang():
            logger.error("  ❌ libclang non disponible — impossible d'analyser C/C++.")
            logger.info("     → pip install libclang && apt install clang")
            return []

        c_files  = list(source_dir.rglob("*.c"))
        cpp_files = list(source_dir.rglob("*.cpp"))
        all_files = [
            f for f in c_files + cpp_files
            if "test" not in str(f).lower() and "build" not in str(f).lower()
        ]

        if not all_files:
            logger.warning("  ⚠️  Aucun fichier C/C++ trouvé dans le SUT.")
            return []

        logger.info(f"  📂 {len(all_files)} fichier(s) C/C++ à analyser :")
        for f in all_files:
            logger.info(f"      • {f.relative_to(source_dir)}")

        all_trajectories: List[Trajectory] = []

        for src_file in all_files:
            elapsed = time.time() - start_time
            if elapsed >= self.timeout_global:
                logger.warning(f"  ⏰ Budget global atteint ({self.timeout_global}s).")
                break
            if len(all_trajectories) >= self.max_paths:
                logger.warning(f"  🔢 Limite {self.max_paths} trajectoires atteinte.")
                break

            logger.info(f"\n  📄 Analyse : {src_file.name}")
            logger.info("  " + "─" * 60)

            try:
                trajs = self._extract_from_file(src_file, start_time)
                all_trajectories.extend(trajs)
            except Exception as e:
                logger.error(f"  ❌ Erreur sur {src_file.name} : {e}")

        elapsed = time.time() - start_time
        logger.info("\n" + "=" * 70)
        logger.info("  RÉSUMÉ EXTRACTION C/C++ (libclang AST)")
        logger.info(f"  Trajectoires retenues : {len(all_trajectories)}")
        logger.info(f"  Temps écoulé          : {elapsed:.2f}s / {self.timeout_global}s")
        logger.info("=" * 70)

        return all_trajectories

    def _extract_from_file(self, file_path: Path, start_time: float) -> List[Trajectory]:
        """Extrait les trajectoires d'un fichier C/C++ via libclang."""
        import clang.cindex as ci  # type: ignore

        std_flag = "-std=c++14" if file_path.suffix == ".cpp" else "-std=c11"
        tu = _clang_index.parse(
            str(file_path),
            args=[std_flag, "-Wall"],
            options=ci.TranslationUnit.PARSE_DETAILED_PROCESSING_RECORD,
        )

        if not tu:
            logger.error(f"  ❌ libclang ne peut pas parser {file_path.name}")
            return []

        # Afficher les erreurs de parsing non fatales
        errors = [d for d in tu.diagnostics if d.severity >= 3]
        if errors:
            logger.warning(f"  ⚠️  {len(errors)} erreur(s) de parsing dans {file_path.name}")
            for e in errors[:2]:
                logger.warning(f"      {e.spelling}")

        trajectories: List[Trajectory] = []

        # Trouver toutes les définitions de fonctions
        functions = self._find_functions(tu.cursor)
        logger.info(f"  🔧 {len(functions)} fonction(s) trouvée(s)")

        for func_cursor in functions:
            elapsed = time.time() - start_time
            if elapsed >= self.timeout_global:
                break
            if len(trajectories) >= self.max_paths:
                break

            func_name = func_cursor.spelling
            logger.info(f"\n  🔧 Fonction : {func_name}()")

            # Construction du CFG
            self._next_id = 0
            cfg = self._build_cfg(func_cursor, file_path)
            logger.info(f"     Nœuds CFG : {len(cfg)}")

            # DFS → chemins
            raw_paths = self._dfs_paths(cfg)
            logger.info(f"     Chemins bruts : {len(raw_paths)}")

            for idx, path_nodes in enumerate(raw_paths):
                if len(trajectories) >= self.max_paths:
                    break

                traj = self._nodes_to_trajectory(
                    path_nodes, func_name, file_path.name, idx
                )

                # Vérification SAT via Z3
                feasible, smt_res = _check_feasibility_z3(traj.constraints)
                if not feasible:
                    logger.debug(f"     ✗ Chemin {idx:04d} UNSAT — éliminé")
                    continue

                traj.is_feasible = True
                trajectories.append(traj)
                _print_trajectory(traj, idx, smt_res, time.time() - start_time)

        return trajectories

    # ─────────────────────────────────────────────────────────────────────────
    # Trouver les fonctions dans l'AST Clang
    # ─────────────────────────────────────────────────────────────────────────

    def _find_functions(self, cursor) -> List:
        """
        Retourne toutes les définitions de fonctions dans l'AST Clang.
        On ne considère que les FUNCTION_DECL qui sont des définitions
        (is_definition() == True), pas de simples déclarations.
        """
        import clang.cindex as ci  # type: ignore

        functions = []

        def visit(node):
            if (node.kind == ci.CursorKind.FUNCTION_DECL and
                    node.is_definition()):
                functions.append(node)
            for child in node.get_children():
                visit(child)

        visit(cursor)
        return functions

    # ─────────────────────────────────────────────────────────────────────────
    # Construction du CFG pour une fonction C/C++
    # ─────────────────────────────────────────────────────────────────────────

    def _build_cfg(self, func_cursor, source_file: Path) -> List[CFGNode]:
        """
        Construit le CFG de la fonction via l'AST libclang.
        Retourne la liste ordonnée des nœuds CFG.

        Conforme à la Définition 1 (Section 1.3.1) :
          G = (V, E), V = blocs de base, E = arcs de contrôle.
        """
        import clang.cindex as ci  # type: ignore

        cfg: List[CFGNode] = []
        self._next_id = 0

        def new_node(cursor, is_branch: bool = False, cond: str = "") -> int:
            nid = self._next_id
            self._next_id += 1
            loc = (f"{source_file.name}:"
                   f"{cursor.location.line}:{cursor.location.column}")
            cfg.append(CFGNode(
                node_id=nid,
                kind=cursor.kind.name,
                location=loc,
                is_branch=is_branch,
                condition=cond,
            ))
            return nid

        def visit(cursor, parent_id: Optional[int] = None) -> Optional[int]:
            """Construit récursivement le CFG depuis le curseur Clang."""
            is_branch = cursor.kind.name in self.BRANCH_CURSOR_KINDS_NAMES
            cond_str  = ""

            if is_branch:
                cond_str = _extract_c_condition(cursor, source_file)

            current_id = new_node(cursor, is_branch, cond_str)
            if parent_id is not None:
                cfg[parent_id].children.append(current_id)

            children = list(cursor.get_children())

            if cursor.kind == ci.CursorKind.IF_STMT:
                # IF_STMT : [condition, then, (else)]
                if len(children) >= 1:
                    visit(children[0], current_id)   # condition
                if len(children) >= 2:
                    visit(children[1], current_id)   # branche THEN
                if len(children) >= 3:
                    visit(children[2], current_id)   # branche ELSE

            elif cursor.kind in (ci.CursorKind.WHILE_STMT,
                                 ci.CursorKind.DO_STMT):
                # [condition, body] ou [body, condition]
                for child in children:
                    visit(child, current_id)

            elif cursor.kind == ci.CursorKind.FOR_STMT:
                # [init, condition, increment, body]
                for child in children:
                    visit(child, current_id)

            elif cursor.kind == ci.CursorKind.SWITCH_STMT:
                for child in children:
                    visit(child, current_id)

            elif cursor.kind == ci.CursorKind.CASE_STMT:
                for child in children:
                    visit(child, current_id)

            else:
                # Instruction générique : visiter tous les enfants séquentiellement
                for child in children:
                    visit(child, current_id)

            return current_id

        # Point d'entrée : corps de la fonction
        body_children = list(func_cursor.get_children())
        for child in body_children:
            import clang.cindex as ci2  # noqa
            if child.kind == ci2.CursorKind.COMPOUND_STMT:
                visit(child)
                break
        else:
            # Pas de COMPOUND_STMT trouvé : analyser le curseur directement
            visit(func_cursor)

        return cfg

    # ─────────────────────────────────────────────────────────────────────────
    # DFS sur le CFG
    # ─────────────────────────────────────────────────────────────────────────

    def _dfs_paths(self, cfg: List[CFGNode]) -> List[List[CFGNode]]:
        """
        Génère tous les chemins du CFG par DFS depuis la racine (nœud 0).
        Limite : max_depth = 50 (prévention de boucles infinies).
        """
        if not cfg:
            return []

        paths: List[List[int]] = []
        max_depth = 50

        def dfs(node_id: int, current: List[int], visited: Set[int], depth: int):
            if depth > max_depth or len(paths) >= self.max_paths:
                return
            node = cfg[node_id]
            current.append(node_id)

            if not node.children:
                paths.append(current.copy())
            else:
                if node.is_branch:
                    # Branchement : explorer TOUTES les branches
                    for child_id in node.children:
                        if child_id not in visited:
                            dfs(child_id, current, visited | {child_id}, depth + 1)
                else:
                    for child_id in node.children:
                        if child_id not in visited:
                            dfs(child_id, current, visited | {node_id}, depth + 1)

            current.pop()

        dfs(0, [], set(), 0)

        if not paths and cfg:
            paths = [[n.node_id for n in cfg]]

        return [[cfg[nid] for nid in p if nid < len(cfg)] for p in paths]

    # ─────────────────────────────────────────────────────────────────────────
    # Conversion en Trajectory
    # ─────────────────────────────────────────────────────────────────────────

    def _nodes_to_trajectory(
        self,
        path:      List[CFGNode],
        func_name: str,
        filename:  str,
        path_idx:  int,
    ) -> Trajectory:
        """
        Convertit un chemin (liste de CFGNode) en objet Trajectory.
        Extrait les contraintes des nœuds branch pour former Pi(t).
        """
        basic_blocks = [n.node_id for n in path]
        branches: Set[Tuple[int, int]] = set()
        constraints: List[str] = []

        for i, node in enumerate(path):
            if node.is_branch:
                if i + 1 < len(path):
                    branches.add((node.node_id, path[i+1].node_id))
                if node.condition:
                    # Déterminer si on est dans la branche TRUE ou FALSE
                    is_true = (
                        i + 1 < len(path) and
                        path[i+1].node_id == node.children[0]
                        if node.children else True
                    )
                    if is_true:
                        constraints.append(f"{node.condition}")
                    else:
                        constraints.append(f"NOT ({node.condition})")

        path_cond = " AND ".join(constraints) if constraints else "TRUE"
        uid = hashlib.md5(
            f"{filename}::{func_name}::{path_idx}::{path_cond}".encode()
        ).hexdigest()[:8]

        return Trajectory(
            path_id=f"c_{func_name}_{uid}",
            basic_blocks=basic_blocks,
            path_condition=path_cond,
            branches_covered=branches,
            constraints=constraints,
            cost=float(len(basic_blocks)),
            is_feasible=True,
        )

    def find_entry_point(self, service_path: Path) -> Optional[Path]:
        """Trouve le point d'entrée principal du projet C/C++."""
        for name in ["main.c", "main.cpp", "service.c", "service.cpp"]:
            candidate = service_path / name
            if candidate.exists():
                return candidate
        c_files = list(service_path.rglob("*.c"))
        return c_files[0] if c_files else next(service_path.rglob("*.cpp"), None)


# ─────────────────────────────────────────────────────────────────────────────
# Helpers — Extraction de conditions depuis l'AST Clang
# ─────────────────────────────────────────────────────────────────────────────

def _extract_c_condition(cursor, source_file: Path) -> str:
    """
    Extrait le texte de la condition d'un nœud de branchement C/C++
    en lisant directement les tokens du fichier source.
    """
    try:
        import clang.cindex as ci  # type: ignore

        tokens = list(cursor.get_tokens())
        if not tokens:
            return cursor.kind.name

        # Reconstituer le texte de la condition
        # Pour IF_STMT : on prend ce qui est entre '(' et ')'
        token_spellings = [t.spelling for t in tokens]

        if cursor.kind == ci.CursorKind.IF_STMT:
            try:
                i_open  = token_spellings.index("(")
                i_close = len(token_spellings) - 1 - \
                          token_spellings[::-1].index(")")
                cond_tokens = token_spellings[i_open+1:i_close]
                return " ".join(cond_tokens) if cond_tokens else "condition"
            except ValueError:
                pass

        elif cursor.kind == ci.CursorKind.WHILE_STMT:
            try:
                i_open  = token_spellings.index("(")
                i_close = token_spellings.index(")")
                cond_tokens = token_spellings[i_open+1:i_close]
                return " ".join(cond_tokens) if cond_tokens else "while_cond"
            except ValueError:
                pass

        elif cursor.kind == ci.CursorKind.FOR_STMT:
            # Extraire la partie condition du for (entre les deux ';')
            try:
                semicolons = [i for i, t in enumerate(token_spellings) if t == ";"]
                if len(semicolons) >= 2:
                    cond_tokens = token_spellings[semicolons[0]+1:semicolons[1]]
                    return " ".join(cond_tokens) if cond_tokens else "for_cond"
            except Exception:
                pass

        # Fallback : retourner les premiers tokens significatifs
        meaningful = [t for t in token_spellings
                      if t not in ("{", "}", ";", "(", ")")]
        return " ".join(meaningful[:5]) if meaningful else cursor.kind.name

    except Exception as e:
        logger.debug(f"_extract_c_condition error : {e}")
        return cursor.kind.name


# ─────────────────────────────────────────────────────────────────────────────
# Vérification SMT Z3
# ─────────────────────────────────────────────────────────────────────────────

def _check_feasibility_z3(constraints: List[str]) -> Tuple[bool, str]:
    """
    Vérifie la satisfaisabilité de Pi(t) via Z3.
    Conforme à l'Algorithme 1 (ligne 13) du mémoire.
    τSMT = 2 secondes (budget par requête SMT).
    """
    if not constraints:
        return True, "SAT (no constraints)"
    try:
        import z3  # type: ignore
        solver = z3.Solver()
        solver.set("timeout", 2000)  # τSMT

        declared: Dict[str, Any] = {}

        def get_var(name: str):
            n = name.replace(".", "_").replace("->", "_").replace("[", "_").replace("]", "_")
            if n not in declared:
                declared[n] = z3.Int(n)
            return declared[n]

        for c in constraints:
            c = c.strip()
            if c.startswith("NOT (") and c.endswith(")"):
                inner = c[5:-1]
                expr = _parse_c_constraint(inner, get_var)
                if expr is not None:
                    solver.add(z3.Not(expr))
            else:
                expr = _parse_c_constraint(c, get_var)
                if expr is not None:
                    solver.add(expr)

        r = solver.check()
        if r == z3.sat:
            return True, "SAT"
        elif r == z3.unsat:
            return False, "UNSAT"
        return True, "UNKNOWN"

    except ImportError:
        return True, "SAT (z3 unavailable)"
    except Exception as e:
        logger.debug(f"Z3 error: {e}")
        return True, "SAT (z3 error)"


def _parse_c_constraint(cstr: str, get_var) -> Optional[Any]:
    """Parse une contrainte C/C++ en expression Z3."""
    try:
        import z3  # type: ignore
        for op in ["==", "!=", ">=", "<=", ">", "<"]:
            if op in cstr:
                parts = cstr.split(op, 1)
                if len(parts) != 2:
                    continue
                lhs_s = parts[0].strip().replace("->", "_").replace(".", "_")
                rhs_s = parts[1].strip()

                # Identifiant valide
                if not all(c.isalnum() or c == "_" for c in lhs_s):
                    return None
                lhs = get_var(lhs_s)

                if rhs_s.lstrip("-").isdigit():
                    rhs = int(rhs_s)
                elif rhs_s in ("true", "false", "NULL", "nullptr"):
                    rhs = 0
                elif all(c.isalnum() or c == "_" for c in rhs_s):
                    rhs = get_var(rhs_s)
                else:
                    return None

                return {
                    "==": lhs == rhs, "!=": lhs != rhs,
                    ">=": lhs >= rhs, "<=": lhs <= rhs,
                    ">":  lhs > rhs,  "<":  lhs < rhs,
                }[op]
        return None
    except Exception:
        return None


# ─────────────────────────────────────────────────────────────────────────────
# Utilitaires
# ─────────────────────────────────────────────────────────────────────────────

def _is_tool_available(tool: str) -> bool:
    """Vérifie si un outil système est disponible dans le PATH."""
    try:
        subprocess.run(
            [tool, "--version"],
            capture_output=True, timeout=5
        )
        return True
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return False


def _print_trajectory(traj: Trajectory, idx: int, smt_res: str, elapsed: float):
    """Affiche une trajectoire extraite en temps réel sur stdout."""
    blocks_str = " → ".join(str(b) for b in traj.basic_blocks[:8])
    if len(traj.basic_blocks) > 8:
        blocks_str += f" → … ({len(traj.basic_blocks)} blocs)"

    print(f"\n  ┌─ TRAJECTOIRE #{idx:04d} ─────────────────────────────────────────────")
    print(f"  │  ID           : {traj.path_id}")
    print(f"  │  SMT          : {smt_res}")
    print(f"  │  Blocs CFG    : {blocks_str}")
    print(f"  │  Branches     : {len(traj.branches_covered)} arc(s) couvert(s)")
    print(f"  │  Coût |t|     : {int(traj.cost)}")
    pc = traj.path_condition
    print(f"  │  Pi(t)        : {pc[:80]}{'...' if len(pc) > 80 else ''}")
    if traj.constraints:
        print(f"  │  Contraintes  :")
        for i, c in enumerate(traj.constraints):
            print(f"  │    [{i+1:02d}] {c}")
    print(f"  └──────────────────────────────────────────────── t={elapsed:.2f}s ──")
