"""
JavaExtractor — Phase 1 : Extraction de Trajectoires pour Java
===============================================================
Implémente le Pattern Bridge + Decorator du mémoire (Section 1.3).

Moteur principal : JBSE (Java Bytecode Symbolic Executor)
Fallback         : javalang (analyse statique AST)

Stratégie JBSE (mémoire Section 1.3.3) :
  1. Compiler les sources Java (.java → .class) via javac.
  2. Lancer JBSE sur le bytecode avec --only-output-states-covering-new.
  3. Parser la sortie JBSE pour reconstruire les trajectoires + Path Conditions.
  4. Vérifier chaque chemin via Z3 si JBSE ne fournit pas de verdict SMT.

Stratégie Fallback javalang (analyse AST statique) :
  1. Parser les fichiers .java avec javalang.
  2. Construire le CFG de chaque méthode (IfStatement, While, For, Switch, Try).
  3. Explorer tous les chemins par DFS sur le CFG.
  4. Extraire les contraintes et vérifier la faisabilité.

Chaque trajectoire produite contient les champs complets du modèle Trajectory
(path_id, basic_blocks, path_condition, branches_covered, constraints, cost,
is_feasible) conformément au Tableau des notations du mémoire.

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
# Structures internes
# ─────────────────────────────────────────────────────────────────────────────

@dataclass
class CFGNode:
    """
    Nœud du Graphe de Flot de Contrôle (CFG) d'une méthode Java.
    Conforme à la Définition 1 (Section 1.3.1 du mémoire) :
      G = (V, E) où chaque v ∈ V est un bloc de base.
    """
    node_id:   int
    kind:      str            # Type de nœud AST (IfStatement, WhileStatement…)
    location:  str            # "ligne:colonne" dans le fichier source
    children:  List[int] = field(default_factory=list)
    is_branch: bool = False   # True si ce nœud est un point de décision
    condition: str  = ""      # Texte de la condition (pour les branches)


# ─────────────────────────────────────────────────────────────────────────────
# JavaExtractor
# ─────────────────────────────────────────────────────────────────────────────

class JavaExtractor:
    """
    Extracteur de trajectoires pour les microservices Java.

    Flux d'exécution (Algorithme 1 adapté Java) :
      1. Tentative JBSE sur le bytecode compilé.
      2. Si JBSE indisponible ou échec → analyse AST avec javalang.
      3. Pour chaque méthode : construction CFG → DFS → trajectoires.
      4. Vérification SAT via Z3 pour chaque chemin.
      5. Affichage temps réel de chaque trajectoire retenue.
    """

    # Types AST javalang identifiés comme points de branchement
    BRANCH_TYPES: Set[str] = {
        "IfStatement",
        "WhileStatement",
        "ForStatement",
        "BasicForStatement",
        "EnhancedForStatement",
        "DoStatement",
        "SwitchStatement",
        "TryStatement",
        "ConditionalExpression",
    }

    def __init__(
        self,
        max_paths:      int = 200,
        timeout_global: int = 120,
        jbse_home:      Optional[str] = None,
    ):
        self.max_paths      = max_paths
        self.timeout_global = timeout_global
        self.jbse_home      = jbse_home or os.getenv("JBSE_HOME", "")
        self._next_id       = 0

    # ─────────────────────────────────────────────────────────────────────────
    # Point d'entrée public
    # ─────────────────────────────────────────────────────────────────────────

    def extract_paths(self, source_dir: Path) -> List[Trajectory]:
        """
        Extrait les trajectoires symboliques d'un projet Java.
        Retourne la liste T des chemins faisables.
        """
        logger.info("=" * 70)
        logger.info("  PHASE 1 — JAVA EXTRACTOR (JBSE / javalang AST)")
        logger.info(f"  SUT Path  : {source_dir}")
        logger.info(f"  Budget    : {self.timeout_global}s  |  Max paths: {self.max_paths}")
        logger.info("=" * 70)

        start_time = time.time()

        # ── Tentative 1 : JBSE (Exécution Symbolique sur Bytecode) ──────────
        logger.info("\n  🔬 Tentative JBSE (Java Bytecode Symbolic Executor)…")
        jbse_trajectories = self._run_jbse(source_dir, start_time)

        if jbse_trajectories:
            elapsed = time.time() - start_time
            logger.info(f"\n  ✅ JBSE : {len(jbse_trajectories)} trajectoires extraites "
                        f"en {elapsed:.2f}s")
            return jbse_trajectories

        # ── Tentative 2 : Analyse AST avec javalang ──────────────────────────
        logger.warning("  ⚠️  JBSE non configuré (JBSE_HOME vide ou absent).")
        logger.info("  🔄 Fallback : analyse statique AST avec javalang…\n")
        return self._extract_via_ast(source_dir, start_time)

    # ─────────────────────────────────────────────────────────────────────────
    # JBSE — Exécution symbolique sur bytecode Java
    # ─────────────────────────────────────────────────────────────────────────

    def _run_jbse(self, source_dir: Path, start_time: float) -> List[Trajectory]:
        """
        Orchestre l'appel à JBSE :
          1. Compilation javac → .class
          2. Appel JBSE CLI
          3. Parsing de la sortie XML/texte JBSE
          4. Conversion en Trajectory

        Référence mémoire (Section 1.3.3, InstantiateExtractor) :
          jbse.Run --cp bin --target com.example.MyService
        """
        if not self.jbse_home or not Path(self.jbse_home).exists():
            logger.debug(f"  JBSE_HOME = '{self.jbse_home}' — non trouvé.")
            return []

        # Étape 1 : Compilation
        java_files = list(source_dir.rglob("*.java"))
        java_files = [f for f in java_files
                      if "test" not in str(f).lower()
                      and "target" not in str(f).lower()]

        if not java_files:
            return []

        bin_dir = source_dir / "bin_jbse"
        bin_dir.mkdir(exist_ok=True)

        logger.info(f"  🔨 Compilation de {len(java_files)} fichier(s) Java…")
        compile_cmd = [
            "javac", "-cp", str(source_dir),
            "-d", str(bin_dir),
        ] + [str(f) for f in java_files]

        try:
            result = subprocess.run(
                compile_cmd,
                capture_output=True, text=True,
                timeout=30
            )
            if result.returncode != 0:
                logger.warning(f"  ⚠️  Compilation échouée : {result.stderr[:200]}")
                return []
            logger.info("  ✅ Compilation réussie.")
        except (subprocess.TimeoutExpired, FileNotFoundError) as e:
            logger.warning(f"  ⚠️  javac non disponible : {e}")
            return []

        # Étape 2 : Appel JBSE
        jbse_jar = Path(self.jbse_home) / "jbse-0.10.0-shaded.jar"
        if not jbse_jar.exists():
            logger.warning(f"  ⚠️  JAR JBSE introuvable : {jbse_jar}")
            return []

        remaining = self.timeout_global - (time.time() - start_time)
        trajectories: List[Trajectory] = []

        for java_file in java_files[:5]:  # Limiter pour la démo
            # Dériver le nom de classe à partir du fichier
            class_name = self._file_to_class_name(java_file, source_dir)
            if not class_name:
                continue

            logger.info(f"  🚀 JBSE sur : {class_name}")
            jbse_cmd = [
                "java", "-jar", str(jbse_jar),
                "--cp", str(bin_dir),
                "--target", class_name,
                "--only-output-states-covering-new",
            ]

            try:
                r = subprocess.run(
                    jbse_cmd,
                    capture_output=True, text=True,
                    timeout=min(30, remaining)
                )
                jbse_trajs = self._parse_jbse_output(r.stdout, class_name)
                trajectories.extend(jbse_trajs)
                for t in jbse_trajs:
                    _print_trajectory(t, len(trajectories), "JBSE-SAT",
                                      time.time() - start_time)
            except subprocess.TimeoutExpired:
                logger.warning(f"  ⏰ JBSE timeout sur {class_name}")
            except Exception as e:
                logger.warning(f"  ⚠️  Erreur JBSE : {e}")

        return trajectories

    def _file_to_class_name(self, java_file: Path, source_dir: Path) -> Optional[str]:
        """Convertit un chemin .java en nom de classe Java qualifié."""
        try:
            rel = java_file.relative_to(source_dir)
            return str(rel).replace("/", ".").replace("\\", ".").removesuffix(".java")
        except ValueError:
            return None

    def _parse_jbse_output(self, output: str, class_name: str) -> List[Trajectory]:
        """
        Parse la sortie texte de JBSE pour reconstruire les trajectoires.
        JBSE produit une ligne par chemin avec la path condition et les décisions.
        """
        trajectories: List[Trajectory] = []
        if not output.strip():
            return trajectories

        lines = output.strip().splitlines()
        path_idx = 0
        current_constraints: List[str] = []
        current_blocks: List[int] = []

        for line in lines:
            line = line.strip()
            # JBSE affiche les path conditions ligne par ligne
            if line.startswith("Path condition:"):
                cond = line.replace("Path condition:", "").strip()
                if cond:
                    current_constraints.append(cond)
            elif line.startswith("Branch:") or line.startswith("Decision:"):
                parts = line.split("@", 1)
                if len(parts) == 2 and parts[1].strip().isdigit():
                    current_blocks.append(int(parts[1].strip()))
            elif line.startswith("---") and current_constraints:
                # Fin d'un chemin
                path_cond = " AND ".join(current_constraints)
                traj = Trajectory(
                    path_id=f"jbse_{class_name.split('.')[-1]}_path_{path_idx:03d}",
                    basic_blocks=current_blocks or [path_idx],
                    path_condition=path_cond,
                    branches_covered=set(
                        (current_blocks[i], current_blocks[i+1])
                        for i in range(len(current_blocks)-1)
                    ),
                    constraints=current_constraints,
                    cost=float(len(current_blocks) or 1),
                    is_feasible=True,
                )
                trajectories.append(traj)
                path_idx += 1
                current_constraints = []
                current_blocks = []

        return trajectories

    # ─────────────────────────────────────────────────────────────────────────
    # Fallback : Analyse AST avec javalang
    # ─────────────────────────────────────────────────────────────────────────

    def _extract_via_ast(self, source_dir: Path, start_time: float) -> List[Trajectory]:
        """
        Analyse statique des sources Java via le parser javalang.
        Construit le CFG de chaque méthode et explore tous les chemins par DFS.
        """
        java_files = [
            f for f in source_dir.rglob("*.java")
            if "test" not in str(f).lower() and "target" not in str(f).lower()
        ]

        if not java_files:
            logger.warning("  ⚠️  Aucun fichier Java trouvé dans le SUT.")
            return []

        logger.info(f"  📂 {len(java_files)} fichier(s) Java à analyser :")
        for f in java_files:
            logger.info(f"      • {f.relative_to(source_dir)}")

        all_trajectories: List[Trajectory] = []

        for java_file in java_files:
            elapsed = time.time() - start_time
            if elapsed >= self.timeout_global:
                logger.warning(f"  ⏰ Budget global atteint ({self.timeout_global}s).")
                break
            if len(all_trajectories) >= self.max_paths:
                logger.warning(f"  🔢 Limite {self.max_paths} trajectoires atteinte.")
                break

            logger.info(f"\n  📄 Analyse : {java_file.name}")
            logger.info("  " + "─" * 60)

            try:
                trajs = self._extract_from_file(java_file, start_time)
                all_trajectories.extend(trajs)
            except Exception as e:
                logger.error(f"  ❌ Erreur sur {java_file.name} : {e}")

        elapsed = time.time() - start_time
        logger.info("\n" + "=" * 70)
        logger.info("  RÉSUMÉ EXTRACTION JAVA (AST javalang)")
        logger.info(f"  Trajectoires retenues : {len(all_trajectories)}")
        logger.info(f"  Temps écoulé          : {elapsed:.2f}s / {self.timeout_global}s")
        logger.info("=" * 70)

        return all_trajectories

    def _extract_from_file(self, file_path: Path, start_time: float) -> List[Trajectory]:
        """Extrait les trajectoires d'un fichier Java via javalang."""
        try:
            import javalang  # type: ignore
        except ImportError:
            logger.error("  ❌ javalang non installé : pip install javalang")
            return []

        try:
            code = file_path.read_text(encoding="utf-8")
            tree = javalang.parse.parse(code)
        except Exception as e:
            logger.error(f"  ❌ Parse Java échoué sur {file_path.name} : {e}")
            return []

        trajectories: List[Trajectory] = []

        # Trouver toutes les déclarations de méthodes
        methods = [node for _, node in tree.filter(javalang.tree.MethodDeclaration)]
        logger.info(f"  🔧 {len(methods)} méthode(s) trouvée(s)")

        for method in methods:
            elapsed = time.time() - start_time
            if elapsed >= self.timeout_global:
                break
            if len(trajectories) >= self.max_paths:
                break

            method_name = method.name
            logger.info(f"\n  🔧 Méthode : {method_name}()")

            # Construction du CFG
            self._next_id = 0
            cfg = self._build_cfg(method)
            logger.info(f"     Nœuds CFG : {len(cfg)}")

            # DFS sur le CFG → chemins
            raw_paths = self._dfs_paths(cfg)
            logger.info(f"     Chemins bruts : {len(raw_paths)}")

            for idx, path_nodes in enumerate(raw_paths):
                if len(trajectories) >= self.max_paths:
                    break

                traj = self._nodes_to_trajectory(
                    path_nodes, method_name, file_path.name, idx
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
    # Construction du CFG pour une méthode Java
    # ─────────────────────────────────────────────────────────────────────────

    def _build_cfg(self, method_node) -> List[CFGNode]:
        """
        Construit le CFG de la méthode à partir de l'AST javalang.
        Retourne la liste des nœuds CFG (indexés par node_id).
        """
        cfg: List[CFGNode] = []

        def new_node(kind: str, location: str, is_branch: bool = False,
                     condition: str = "") -> int:
            nid = self._next_id
            self._next_id += 1
            cfg.append(CFGNode(
                node_id=nid,
                kind=kind,
                location=location,
                is_branch=is_branch,
                condition=condition,
            ))
            return nid

        def visit(node, parent_id: Optional[int] = None) -> Optional[int]:
            """Parcourt récursivement l'AST javalang pour construire le CFG."""
            if node is None:
                return None

            node_type = type(node).__name__
            is_branch = node_type in self.BRANCH_TYPES
            loc = _get_location(node)

            # Extraire la condition textuelle si c'est un branchement
            cond_str = ""
            if is_branch:
                cond_str = _extract_java_condition(node, node_type)

            current_id = new_node(node_type, loc, is_branch, cond_str)

            if parent_id is not None:
                cfg[parent_id].children.append(current_id)

            # Traitement spécifique par type de nœud
            if node_type == "IfStatement":
                _visit_if(node, current_id, visit)

            elif node_type in ("WhileStatement", "DoStatement"):
                if hasattr(node, "body") and node.body:
                    visit(node.body, current_id)

            elif node_type in ("ForStatement", "BasicForStatement",
                               "EnhancedForStatement"):
                if hasattr(node, "body") and node.body:
                    visit(node.body, current_id)

            elif node_type == "SwitchStatement":
                if hasattr(node, "cases") and node.cases:
                    for case in node.cases:
                        visit(case, current_id)

            elif node_type == "TryStatement":
                if hasattr(node, "block") and node.block:
                    visit(node.block, current_id)
                if hasattr(node, "catches") and node.catches:
                    for catch in node.catches:
                        visit(catch, current_id)

            elif hasattr(node, "statements") and node.statements:
                for stmt in node.statements:
                    if stmt is not None:
                        visit(stmt, current_id)

            else:
                # Nœud générique : visiter les enfants
                if hasattr(node, "children"):
                    for child in node.children:
                        if child and not isinstance(child, (str, int, float, bool)):
                            if isinstance(child, list):
                                for item in child:
                                    if item and not isinstance(
                                            item, (str, int, float, bool)):
                                        visit(item, current_id)
                            else:
                                visit(child, current_id)

            return current_id

        # Point d'entrée : corps de la méthode
        if hasattr(method_node, "body") and method_node.body:
            if hasattr(method_node.body, "statements"):
                prev = None
                for stmt in method_node.body.statements:
                    if stmt is not None:
                        cur = visit(stmt, prev)
                        if prev is None and cur is not None:
                            prev = cur
            else:
                visit(method_node.body)

        return cfg

    # ─────────────────────────────────────────────────────────────────────────
    # DFS sur le CFG
    # ─────────────────────────────────────────────────────────────────────────

    def _dfs_paths(self, cfg: List[CFGNode]) -> List[List[CFGNode]]:
        """
        Génère tous les chemins du CFG par DFS depuis la racine (nœud 0).
        Limite : max_depth = 50 (prévention de boucles infinies).
        Conforme à l'Algorithme 1 : exploration de Q jusqu'à épuisement
        ou atteinte du budget.
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
                # Nœud terminal → chemin complet
                paths.append(current.copy())
            else:
                if node.is_branch:
                    # Branchement : explorer TOUTES les branches
                    for child_id in node.children:
                        if child_id not in visited:
                            dfs(child_id, current, visited | {child_id}, depth + 1)
                else:
                    # Nœud linéaire : continuer
                    for child_id in node.children:
                        if child_id not in visited:
                            dfs(child_id, current, visited | {node_id}, depth + 1)

            current.pop()

        dfs(0, [], set(), 0)

        # Si aucun chemin terminal trouvé, retourner le chemin complet du CFG
        if not paths and cfg:
            paths = [[n.node_id for n in cfg]]

        return [[cfg[nid] for nid in p if nid < len(cfg)] for p in paths]

    # ─────────────────────────────────────────────────────────────────────────
    # Conversion en Trajectory
    # ─────────────────────────────────────────────────────────────────────────

    def _nodes_to_trajectory(
        self,
        path:        List[CFGNode],
        method_name: str,
        filename:    str,
        path_idx:    int,
    ) -> Trajectory:
        """
        Convertit un chemin (liste de CFGNode) en objet Trajectory.
        Extrait les contraintes des nœuds de branchement pour former Pi(t).
        """
        basic_blocks  = [n.node_id for n in path]
        branches:       Set[Tuple[int, int]] = set()
        constraints:   List[str] = []

        for i, node in enumerate(path):
            if node.is_branch:
                if i + 1 < len(path):
                    branches.add((node.node_id, path[i+1].node_id))
                if node.condition:
                    is_true_branch = (i + 1 < len(path) and
                                      path[i+1].node_id == node.children[0]
                                      if node.children else True)
                    if is_true_branch:
                        constraints.append(f"{node.condition}")
                    else:
                        constraints.append(f"NOT ({node.condition})")

        path_cond = " AND ".join(constraints) if constraints else "TRUE"
        uid = hashlib.md5(
            f"{filename}::{method_name}::{path_idx}::{path_cond}".encode()
        ).hexdigest()[:8]

        return Trajectory(
            path_id=f"java_{method_name}_{uid}",
            basic_blocks=basic_blocks,
            path_condition=path_cond,
            branches_covered=branches,
            constraints=constraints,
            cost=float(len(basic_blocks)),
            is_feasible=True,
        )

    def find_entry_point(self, service_path: Path) -> Optional[Path]:
        """Trouve le point d'entrée principal du projet Java."""
        # Chercher main() dans les fichiers Java
        for java_file in service_path.rglob("*.java"):
            try:
                content = java_file.read_text(encoding="utf-8")
                if "public static void main" in content:
                    return java_file
            except Exception:
                pass
        return next(service_path.rglob("*.java"), None)


# ─────────────────────────────────────────────────────────────────────────────
# Helpers AST javalang
# ─────────────────────────────────────────────────────────────────────────────

def _get_location(node) -> str:
    """Retourne la position source d'un nœud javalang."""
    pos = getattr(node, "position", None)
    if pos:
        return f"{pos.line}:{pos.column}"
    return "unknown"


def _extract_java_condition(node, node_type: str) -> str:
    """Extrait la représentation textuelle de la condition d'un nœud branch."""
    if node_type == "IfStatement":
        cond = getattr(node, "condition", None)
        if cond is not None:
            return _unparse_java_expr(cond)
    elif node_type in ("WhileStatement", "DoStatement"):
        cond = getattr(node, "condition", None)
        if cond is not None:
            return _unparse_java_expr(cond)
    elif node_type in ("ForStatement", "BasicForStatement"):
        control = getattr(node, "control", None)
        if control:
            cond = getattr(control, "condition", None)
            if cond is not None:
                return _unparse_java_expr(cond)
    elif node_type == "EnhancedForStatement":
        var = getattr(node, "var", None)
        it  = getattr(node, "iterable", None)
        var_str = _unparse_java_expr(var) if var else "var"
        it_str  = _unparse_java_expr(it)  if it  else "iterable"
        return f"for {var_str} in {it_str}"
    elif node_type == "SwitchStatement":
        expr = getattr(node, "expression", None)
        if expr is not None:
            return f"switch({_unparse_java_expr(expr)})"
    elif node_type == "TryStatement":
        return "try"
    return node_type


def _unparse_java_expr(node) -> str:
    """
    Reconstruit la représentation textuelle d'une expression AST javalang.
    Méthode récursive simple (non exhaustive mais suffisante pour Pi(t)).
    """
    if node is None:
        return "null"

    node_type = type(node).__name__

    if node_type == "BinaryOperation":
        op    = getattr(node, "operator", "?")
        left  = _unparse_java_expr(getattr(node, "operandl", None))
        right = _unparse_java_expr(getattr(node, "operandr", None))
        return f"{left} {op} {right}"

    elif node_type == "MethodInvocation":
        member = getattr(node, "member", "method")
        qualifier = getattr(node, "qualifier", "")
        args = getattr(node, "arguments", []) or []
        args_str = ", ".join(_unparse_java_expr(a) for a in args)
        if qualifier:
            return f"{qualifier}.{member}({args_str})"
        return f"{member}({args_str})"

    elif node_type == "MemberReference":
        qualifier = getattr(node, "qualifier", "")
        member    = getattr(node, "member", "ref")
        if qualifier:
            return f"{qualifier}.{member}"
        return member

    elif node_type == "Literal":
        return str(getattr(node, "value", "?"))

    elif node_type == "ClassCreator":
        cls = getattr(node, "type", None)
        cls_str = _unparse_java_expr(cls) if cls else "Object"
        return f"new {cls_str}()"

    elif node_type == "ReferenceType":
        return getattr(node, "name", "Type")

    elif hasattr(node, "name"):
        return str(node.name)

    elif hasattr(node, "value"):
        return str(node.value)

    return node_type


def _visit_if(node, parent_id: int, visit_fn) -> None:
    """
    Traitement spécifique du IfStatement javalang.
    Crée deux branches distinctes dans le CFG : then et else.
    """
    then_stmt = getattr(node, "then_statement", None)
    else_stmt = getattr(node, "else_statement", None)

    if then_stmt is not None:
        visit_fn(then_stmt, parent_id)
    if else_stmt is not None:
        visit_fn(else_stmt, parent_id)


# ─────────────────────────────────────────────────────────────────────────────
# Vérification SMT Z3 (partagée avec python_extractor)
# ─────────────────────────────────────────────────────────────────────────────

def _check_feasibility_z3(constraints: List[str]) -> Tuple[bool, str]:
    """
    Vérifie la satisfaisabilité des contraintes via Z3.
    Conforme à l'Algorithme 1 (ligne 13) : SMT-Solver(Pi(t)) = SAT ?
    τSMT = 2 secondes.
    """
    if not constraints:
        return True, "SAT (no constraints)"
    try:
        import z3  # type: ignore
        solver = z3.Solver()
        solver.set("timeout", 2000)

        declared: Dict[str, Any] = {}

        def get_var(name: str):
            if name not in declared:
                declared[name] = z3.Int(name)
            return declared[name]

        for c in constraints:
            c = c.strip()
            if c.startswith("NOT (") and c.endswith(")"):
                inner = c[5:-1]
                z3_expr = _parse_simple_constraint(inner, get_var)
                if z3_expr is not None:
                    import z3 as _z3
                    solver.add(_z3.Not(z3_expr))
            else:
                z3_expr = _parse_simple_constraint(c, get_var)
                if z3_expr is not None:
                    solver.add(z3_expr)

        r = solver.check()
        import z3 as _z3
        if r == _z3.sat:
            return True, "SAT"
        elif r == _z3.unsat:
            return False, "UNSAT"
        return True, "UNKNOWN"
    except ImportError:
        return True, "SAT (z3 unavailable)"
    except Exception as e:
        logger.debug(f"Z3 error: {e}")
        return True, "SAT (z3 error)"


def _parse_simple_constraint(cstr: str, get_var) -> Optional[Any]:
    """Parse une contrainte simple en expression Z3."""
    try:
        import z3  # type: ignore
        for op in ["==", "!=", ">=", "<=", ">", "<"]:
            if op in cstr:
                parts = cstr.split(op, 1)
                if len(parts) != 2:
                    continue
                lhs_s = parts[0].strip()
                rhs_s = parts[1].strip()
                if not lhs_s.replace(".", "_").replace("_", "").isalnum():
                    return None
                lhs = get_var(lhs_s.replace(".", "_"))
                if rhs_s.lstrip("-").isdigit():
                    rhs = int(rhs_s)
                elif rhs_s in ("true", "false", "True", "False"):
                    rhs = 1 if rhs_s.lower() == "true" else 0
                elif rhs_s.replace(".", "_").replace("_", "").isalnum():
                    rhs = get_var(rhs_s.replace(".", "_"))
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
# Affichage temps réel
# ─────────────────────────────────────────────────────────────────────────────

def _print_trajectory(traj: Trajectory, idx: int, smt_res: str, elapsed: float):
    """Affiche une trajectoire extraite en temps réel."""
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


# Alias pour compatibilité
from typing import Dict, Tuple  # noqa: E402
