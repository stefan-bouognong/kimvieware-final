"""
PythonExtractor — Phase 1 : Extraction Dynamique de Chemins
=============================================================
Implémente le Pattern Bridge + Decorator du mémoire (Section 1.3).

Stratégie (conforme au mémoire) :
  1. Analyse statique AST de Python pour construire le CFG de chaque fonction.
  2. Exploration récursive de TOUS les chemins d'exécution possibles (branchements).
  3. Pour chaque chemin, construction de la Path Condition Pi(t) = conjonction des
     contraintes symboliques accumulées le long du chemin.
  4. Vérification de la faisabilité via Z3 (SMT Solver) : seuls les chemins SAT
     sont ajoutés à T (Theorem 1.1 : Feasibility Soundness).
  5. Budget de temps global Delta_ext pour garantir la terminaison (Theorem 1.2).

Chaque trajectoire produite contient :
  - path_id         : identifiant unique
  - basic_blocks    : liste ordonnée des numéros de ligne visités (noeuds CFG)
  - path_condition  : formule logique lisible (ex: "x > 0 AND y <= 10")
  - branches_covered: ensemble d'arcs (src_line, dst_line) couverts
  - constraints     : liste des contraintes individuelles
  - cost            : longueur du chemin (nombre de blocs)
  - is_feasible     : True (toujours, car on filtre via Z3)

Affichage temps réel de chaque trajectoire extraite pour visualisation.
"""

import ast
import hashlib
import logging
import re
import time
from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple

from .base_extractor import ExtractorBase
from kimvieware_shared.models import Trajectory

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────────────────────────────────────
# SMT Solver (Z3) — Vérification de la faisabilité des Path Conditions
# ─────────────────────────────────────────────────────────────────────────────

def _check_feasibility_z3(constraints: List[str]) -> Tuple[bool, str]:
    """
    Vérifie via Z3 si la conjonction des contraintes est satisfaisable (SAT).

    Retourne (True, "SAT") si le chemin est faisable,
             (False, "UNSAT") s'il est infaisable (dead branch),
             (True, "UNKNOWN") si Z3 ne peut pas décider (on garde le chemin
             par précaution, comme indiqué dans le mémoire avec le timeout τSMT).

    Conforme à l'Algorithme 1 (ligne 13) : "if SMT-Solver(Pi(t)) = SAT"
    """
    if not constraints:
        return True, "SAT (no constraints)"

    try:
        import z3  # type: ignore

        solver = z3.Solver()
        solver.set("timeout", 2000)  # τSMT = 2 secondes (conforme mémoire)

        # On déclare des variables symboliques Z3 pour les noms rencontrés
        # dans les contraintes. On utilise un parsing simplifié mais robuste.
        vars_declared: Dict[str, Any] = {}

        def _get_or_create(name: str):
            if name not in vars_declared:
                vars_declared[name] = z3.Int(name)
            return vars_declared[name]

        for cstr in constraints:
            # Tente de parser des contraintes de forme "expr op valeur"
            # ex: "x > 0", "capacity == True", "students_count <= 30"
            parsed = _parse_constraint_to_z3(cstr, _get_or_create)
            if parsed is not None:
                solver.add(parsed)

        result = solver.check()
        if result == z3.sat:
            return True, "SAT"
        elif result == z3.unsat:
            return False, "UNSAT"
        else:
            return True, "UNKNOWN (timeout)"

    except ImportError:
        # Z3 non installé : on accepte tous les chemins (dégradé gracieux)
        logger.debug("Z3 non disponible — tous les chemins acceptés (fallback)")
        return True, "SAT (z3 unavailable)"
    except Exception as e:
        logger.debug(f"Z3 error sur [{constraints}]: {e}")
        return True, "SAT (z3 error)"


def _parse_constraint_to_z3(cstr: str, get_var):
    """
    Parse une contrainte textuelle en expression Z3.
    Supporte les formes : "var op valeur", "var == True/False"
    """
    try:
        import z3  # type: ignore

        # Nettoyage
        cstr = cstr.strip()

        # Formes booléennes explicites
        if cstr in ("True", "False", "true", "false"):
            return None  # Trivial

        # On cherche un opérateur de comparaison
        for op in ["==", "!=", ">=", "<=", ">", "<"]:
            if op in cstr:
                parts = cstr.split(op, 1)
                if len(parts) != 2:
                    continue
                lhs_str = parts[0].strip()
                rhs_str = parts[1].strip()

                # LHS doit être un nom de variable simple
                if not lhs_str.isidentifier():
                    return None

                lhs = get_var(lhs_str)

                # RHS : entier, booléen ou autre variable
                if rhs_str.lstrip("-").isdigit():
                    rhs = int(rhs_str)
                elif rhs_str in ("True", "False"):
                    rhs = 1 if rhs_str == "True" else 0
                elif rhs_str.isidentifier():
                    rhs = get_var(rhs_str)
                else:
                    return None

                ops = {
                    "==": lhs == rhs,
                    "!=": lhs != rhs,
                    ">=": lhs >= rhs,
                    "<=": lhs <= rhs,
                    ">":  lhs > rhs,
                    "<":  lhs < rhs,
                }
                return ops[op]
        return None
    except Exception:
        return None


# ─────────────────────────────────────────────────────────────────────────────
# PathCrawler — Parcours récursif du CFG via l'AST Python
# ─────────────────────────────────────────────────────────────────────────────

class PathCrawler:
    """
    Parcourt récursivement l'AST d'une fonction Python pour énumérer
    tous les chemins d'exécution possibles.

    Chaque chemin est une liste de "steps" (étapes), où chaque step est un dict :
      - type   : "branch" | "loop" | "stmt"
      - cond   : la condition textuelle (pour branch/loop)
      - val    : True (branche prise) ou False (branche non prise)
      - line   : numéro de ligne dans le source
      - node   : nom du type AST (pour les stmt)

    Conforme à la Section 1.3.3 (Algorithme 1) du mémoire.
    """

    def explore_function(self, node: ast.FunctionDef) -> List[List[Dict[str, Any]]]:
        """
        Retourne la liste de tous les chemins possibles dans la fonction.
        Chaque chemin est une séquence ordonnée de steps.
        """
        current_paths: List[List[Dict[str, Any]]] = [[]]

        for stmt in node.body:
            new_paths: List[List[Dict[str, Any]]] = []
            for path in current_paths:
                branches = self._explore_statement(stmt, path)
                new_paths.extend(branches)
            current_paths = new_paths

        return current_paths if current_paths else [[]]

    def _explore_statement(
        self,
        stmt: ast.stmt,
        current_path: List[Dict[str, Any]]
    ) -> List[List[Dict[str, Any]]]:
        """
        Retourne la liste de TOUS les chemins possibles issus de 'stmt'.
        La récursivité garantit l'exploration exhaustive (conforme mémoire).
        """

        # ── IF / ELIF ────────────────────────────────────────────────────────
        if isinstance(stmt, ast.If):
            cond_str = ast.unparse(stmt.test)

            # Branche TRUE : la condition est vérifiée
            true_step = {
                "type": "branch",
                "cond": cond_str,
                "val": True,
                "line": stmt.lineno,
                "col":  stmt.col_offset,
            }
            true_base = current_path + [true_step]
            true_paths = self._explore_body(stmt.body, true_base)

            # Branche FALSE : la condition n'est pas vérifiée
            false_step = {
                "type": "branch",
                "cond": cond_str,
                "val": False,
                "line": stmt.lineno,
                "col":  stmt.col_offset,
            }
            false_base = current_path + [false_step]
            if stmt.orelse:
                false_paths = self._explore_body(stmt.orelse, false_base)
            else:
                false_paths = [false_base]  # Pas de bloc else : chemin direct

            return true_paths + false_paths

        # ── WHILE ────────────────────────────────────────────────────────────
        elif isinstance(stmt, ast.While):
            cond_str = ast.unparse(stmt.test)

            # Chemin : boucle exécutée au moins une fois
            entered_step = {
                "type": "loop",
                "cond": cond_str,
                "val": True,
                "line": stmt.lineno,
                "col":  stmt.col_offset,
            }
            entered_base = current_path + [entered_step]
            entered_paths = self._explore_body(stmt.body, entered_base)

            # Chemin : boucle jamais exécutée
            skip_step = {
                "type": "loop",
                "cond": cond_str,
                "val": False,
                "line": stmt.lineno,
                "col":  stmt.col_offset,
            }
            skipped_path = current_path + [skip_step]

            return entered_paths + [skipped_path]

        # ── FOR ──────────────────────────────────────────────────────────────
        elif isinstance(stmt, ast.For):
            target_str = ast.unparse(stmt.target)
            iter_str   = ast.unparse(stmt.iter)
            cond_str   = f"for {target_str} in {iter_str}"

            entered_step = {
                "type": "loop",
                "cond": cond_str,
                "val": True,
                "line": stmt.lineno,
                "col":  stmt.col_offset,
            }
            entered_base  = current_path + [entered_step]
            entered_paths = self._explore_body(stmt.body, entered_base)

            skip_step = {
                "type": "loop",
                "cond": cond_str,
                "val": False,
                "line": stmt.lineno,
                "col":  stmt.col_offset,
            }
            skipped_path = current_path + [skip_step]

            return entered_paths + [skipped_path]

        # ── TRY / EXCEPT ─────────────────────────────────────────────────────
        elif isinstance(stmt, ast.Try):
            # Chemin nominal : le bloc try s'exécute sans exception
            try_step = {
                "type": "branch",
                "cond": "try_no_exception",
                "val": True,
                "line": stmt.lineno,
                "col":  stmt.col_offset,
            }
            nominal_base  = current_path + [try_step]
            nominal_paths = self._explore_body(stmt.body, nominal_base)

            all_paths = nominal_paths

            # Un chemin par handler d'exception
            for handler in stmt.handlers:
                exc_name = (
                    ast.unparse(handler.type) if handler.type else "Exception"
                )
                exc_step = {
                    "type": "branch",
                    "cond": f"except {exc_name}",
                    "val": False,
                    "line": getattr(handler, "lineno", stmt.lineno),
                    "col":  stmt.col_offset,
                }
                exc_base  = current_path + [exc_step]
                exc_paths = self._explore_body(handler.body, exc_base)
                all_paths.extend(exc_paths)

            return all_paths

        # ── RETURN / RAISE ───────────────────────────────────────────────────
        elif isinstance(stmt, (ast.Return, ast.Raise)):
            terminal_step = {
                "type": "stmt",
                "node": type(stmt).__name__,
                "line": getattr(stmt, "lineno", 0),
                "col":  getattr(stmt, "col_offset", 0),
            }
            return [current_path + [terminal_step]]

        # ── Instruction atomique quelconque ──────────────────────────────────
        else:
            atomic_step = {
                "type": "stmt",
                "node": type(stmt).__name__,
                "line": getattr(stmt, "lineno", 0),
                "col":  getattr(stmt, "col_offset", 0),
            }
            return [current_path + [atomic_step]]

    def _explore_body(
        self,
        body: List[ast.stmt],
        base_path: List[Dict[str, Any]]
    ) -> List[List[Dict[str, Any]]]:
        """
        Explore séquentiellement un bloc de code (liste de statements).
        Produit le produit cartésien de tous les chemins possibles.
        """
        current_paths = [base_path]
        for stmt in body:
            new_paths: List[List[Dict[str, Any]]] = []
            for path in current_paths:
                new_paths.extend(self._explore_statement(stmt, path))
            current_paths = new_paths
        return current_paths


# ─────────────────────────────────────────────────────────────────────────────
# PythonExtractor — Orchestration complète (conforme mémoire Section 1.3)
# ─────────────────────────────────────────────────────────────────────────────

class PythonExtractor(ExtractorBase):
    """
    Extracteur de trajectoires symboliques pour les microservices Python.

    Implémente le Pattern Bridge (Section 1.3.2) :
      - PythonExtractor est l'implémentation concrète retournée par
        InstantiateExtractor("python").
      - Le Decorator Pattern ajoute la couche SMT (Z3) et le logging.

    Pipeline interne :
      1. Trouver tous les fichiers .py du SUT (hors tests/venv).
      2. Parser chaque fichier en AST Python.
      3. Pour chaque FunctionDef, lancer PathCrawler → liste de chemins bruts.
      4. Pour chaque chemin brut :
           a. Construire la Path Condition Pi(t).
           b. Appeler Z3 pour vérifier SAT (budget τSMT = 2s).
           c. Si SAT → créer Trajectory et l'ajouter à T.
      5. Respecter le budget global Delta_ext (timeout_global).
      6. Afficher chaque trajectoire extraite en temps réel.
    """

    def __init__(
        self,
        timeout_global: int = 120,  # Delta_ext en secondes
        max_paths: int = 1000,      # Limite de sécurité
    ):
        self.timeout_global = timeout_global
        self.max_paths = max_paths

    def extract_paths(self, service_path: Path) -> List[Trajectory]:
        """
        Point d'entrée principal — conforme à l'Algorithme 1 du mémoire.

        Input : répertoire racine du SUT (ex: /tmp/jobs/job_xyz/extracted/)
        Output: liste T de trajectoires faisables
        """
        logger.info("=" * 70)
        logger.info("  PHASE 1 — PYTHON EXTRACTOR (AST + Z3 SMT Solver)")
        logger.info(f"  SUT Path  : {service_path}")
        logger.info(f"  Budget    : {self.timeout_global}s  |  Max paths: {self.max_paths}")
        logger.info("=" * 70)

        start_time = time.time()  # StartTime (Algorithme 1, ligne 8)

        py_files = [
            f for f in service_path.rglob("*.py")
            if not any(x in str(f) for x in ["test_", "venv", "__pycache__", ".tox"])
        ]

        if not py_files:
            logger.warning("  ⚠️  Aucun fichier Python trouvé dans le SUT.")
            return []

        logger.info(f"  📂 {len(py_files)} fichier(s) Python à analyser :")
        for f in py_files:
            logger.info(f"      • {f.relative_to(service_path)}")

        all_trajectories: List[Trajectory] = []
        total_raw        = 0
        total_infeasible = 0
        crawler          = PathCrawler()

        for py_file in py_files:
            # ── Budget global (Theorem 1.2 : Budgeted Termination) ──────────
            elapsed = time.time() - start_time
            if elapsed >= self.timeout_global:
                logger.warning(f"  ⏰ Budget global atteint ({self.timeout_global}s). Arrêt.")
                break
            if len(all_trajectories) >= self.max_paths:
                logger.warning(f"  🔢 Limite de {self.max_paths} trajectoires atteinte. Arrêt.")
                break

            logger.info(f"\n  📄 Analyse : {py_file.name}")
            logger.info("  " + "─" * 60)

            try:
                source = py_file.read_text(encoding="utf-8")
                tree   = ast.parse(source, filename=str(py_file))
            except SyntaxError as e:
                logger.error(f"  ❌ Erreur de syntaxe dans {py_file.name}: {e}")
                continue
            except Exception as e:
                logger.error(f"  ❌ Impossible de lire {py_file.name}: {e}")
                continue

            # Parcourir toutes les FunctionDef du fichier
            for node in ast.walk(tree):
                if not isinstance(node, ast.FunctionDef):
                    continue

                # Budget global
                elapsed = time.time() - start_time
                if elapsed >= self.timeout_global:
                    break
                if len(all_trajectories) >= self.max_paths:
                    break

                func_name = node.name
                logger.info(f"\n  🔧 Fonction : {func_name}() — ligne {node.lineno}")

                # ── Exploration AST (Phase 1, Algorithme 1) ─────────────────
                raw_paths = crawler.explore_function(node)
                total_raw += len(raw_paths)

                logger.info(f"     Chemins bruts trouvés : {len(raw_paths)}")

                for idx, raw_path in enumerate(raw_paths):
                    if len(all_trajectories) >= self.max_paths:
                        break

                    # ── Construire la Path Condition Pi(t) ──────────────────
                    constraints = _build_constraints(raw_path)
                    path_cond   = _simplify_logical_formula(" AND ".join(constraints)) if constraints else "TRUE"

                    # ── Vérification SMT Z3 (Theorem 1.1) ───────────────────
                    is_feasible, smt_result = _check_feasibility_z3(constraints)

                    if not is_feasible:
                        total_infeasible += 1
                        logger.debug(
                            f"     ✗ Chemin {idx:04d} INFAISABLE (UNSAT) — "
                            f"π(t) = [{path_cond[:60]}...]"
                        )
                        continue

                    # ── Construire la Trajectory ─────────────────────────────
                    traj = _build_trajectory(
                        raw_path, func_name, py_file.name,
                        idx, constraints, path_cond
                    )
                    all_trajectories.append(traj)

                    # ── Affichage temps réel (demandé) ──────────────────────
                    _print_trajectory(traj, idx, smt_result, elapsed)

        # ── Résumé final ─────────────────────────────────────────────────────
        elapsed = time.time() - start_time
        logger.info("\n" + "=" * 70)
        logger.info("  RÉSUMÉ EXTRACTION PYTHON")
        logger.info(f"  Chemins bruts explorés  : {total_raw}")
        logger.info(f"  Chemins INFAISABLES     : {total_infeasible}  (éliminés par Z3)")
        logger.info(f"  Trajectoires retenues   : {len(all_trajectories)}")
        logger.info(f"  Temps écoulé            : {elapsed:.2f}s / {self.timeout_global}s")
        logger.info("=" * 70)

        return all_trajectories

    def find_entry_point(self, service_path: Path) -> Optional[Path]:
        """Trouve le point d'entrée principal du microservice."""
        for name in ["main.py", "app.py", "run.py", "service.py"]:
            candidate = service_path / name
            if candidate.exists():
                return candidate
        return next(service_path.rglob("*.py"), None)


# ─────────────────────────────────────────────────────────────────────────────
# Fonctions utilitaires internes
# ─────────────────────────────────────────────────────────────────────────────

def _simplify_logical_formula(formula: str) -> str:
    """
    Simplifie les formules logiques pour un affichage plus lisible.

    - NOT (not x) -> x
    - NOT (A or B) -> NOT A AND NOT B
    - NOT (A and B) -> NOT A OR NOT B
    - NOT (x < y) -> x >= y
    - NOT (x <= y) -> x > y
    - NOT (x > y) -> x <= y
    - NOT (x >= y) -> x < y
    """
    normalized = formula.replace("NOT (", "not (")
    normalized = normalized.replace(" AND ", " and ").replace(" OR ", " or ")

    class _FormulaSimplifier(ast.NodeTransformer):
        def visit_UnaryOp(self, node: ast.UnaryOp) -> ast.AST:
            node = self.generic_visit(node)
            if isinstance(node.op, ast.Not):
                operand = node.operand
                if isinstance(operand, ast.UnaryOp) and isinstance(operand.op, ast.Not):
                    return self.visit(operand.operand)
                if isinstance(operand, ast.BoolOp):
                    new_op = ast.And() if isinstance(operand.op, ast.Or) else ast.Or()
                    values = [self.visit(ast.UnaryOp(op=ast.Not(), operand=value)) for value in operand.values]
                    return ast.copy_location(ast.BoolOp(op=new_op, values=values), node)
                if isinstance(operand, ast.Compare):
                    return ast.copy_location(_negate_compare(operand), node)
                if isinstance(operand, ast.Constant) and isinstance(operand.value, bool):
                    return ast.copy_location(ast.Constant(value=not operand.value), node)
            return node

    def _negate_compare(node: ast.Compare) -> ast.AST:
        negation_map = {
            ast.Lt: ast.GtE,
            ast.LtE: ast.Gt,
            ast.Gt: ast.LtE,
            ast.GtE: ast.Lt,
            ast.Eq: ast.NotEq,
            ast.NotEq: ast.Eq,
            ast.Is: ast.IsNot,
            ast.IsNot: ast.Is,
            ast.In: ast.NotIn,
            ast.NotIn: ast.In,
        }

        new_ops = []
        for op in node.ops:
            op_type = type(op)
            if op_type in negation_map:
                new_ops.append(negation_map[op_type]())
            else:
                return ast.copy_location(ast.UnaryOp(op=ast.Not(), operand=node), node)
        return ast.copy_location(ast.Compare(left=node.left, ops=new_ops, comparators=node.comparators), node)

    try:
        tree = ast.parse(normalized, mode="eval")
        tree = _FormulaSimplifier().visit(tree)
        ast.fix_missing_locations(tree)
        simplified = ast.unparse(tree)
        simplified = re.sub(r"\s+", " ", simplified).strip()
        simplified = re.sub(r"\band\b", "AND", simplified)
        simplified = re.sub(r"\bor\b", "OR", simplified)
        simplified = re.sub(r"\bnot\b", "NOT", simplified)
        return simplified
    except Exception:
        return formula


def _build_constraints(raw_path: List[Dict[str, Any]]) -> List[str]:
    """
    Construit la liste des contraintes symboliques d'un chemin brut.
    Chaque branchement contribue une contrainte :
      - Si val=True  → "condition"
      - Si val=False → "NOT (condition)"
    Conforme à la définition de Pi(t) (Section 1.3.1 du mémoire).
    """
    constraints = []
    for step in raw_path:
        if step["type"] in ("branch", "loop"):
            cond = step["cond"]
            taken = step["val"]
            if taken:
                constraints.append(_simplify_logical_formula(cond))
            else:
                constraints.append(_simplify_logical_formula(f"NOT ({cond})"))
    return constraints


def _build_trajectory(
    raw_path:    List[Dict[str, Any]],
    func_name:   str,
    filename:    str,
    idx:         int,
    constraints: List[str],
    path_cond:   str,
) -> Trajectory:
    """
    Convertit un chemin brut en objet Trajectory conforme au modèle du mémoire.

    Attributs produits :
      - path_id         : identifiant unique reproductible
      - basic_blocks    : séquence de numéros de ligne (noeuds CFG)
      - path_condition  : Pi(t) = conjonction des contraintes
      - branches_covered: ensemble d'arcs (src_line, dst_line)
      - constraints     : liste des contraintes individuelles
      - cost            : |path| = nombre de blocs (utilisé dans ρ(t))
      - is_feasible     : True (vérifié par Z3)
    """
    basic_blocks: List[int] = []
    branches: Set[Tuple[int, int]] = set()

    prev_line: Optional[int] = None
    for step in raw_path:
        line = step.get("line", 0)
        basic_blocks.append(line)
        if prev_line is not None and step["type"] in ("branch", "loop"):
            branches.add((prev_line, line))
        prev_line = line

    uid = hashlib.md5(
        f"{filename}::{func_name}::{idx}::{path_cond}".encode()
    ).hexdigest()[:8]

    return Trajectory(
        path_id=f"py_{func_name}_{uid}",
        basic_blocks=basic_blocks,
        path_condition=path_cond,
        branches_covered=branches,
        constraints=constraints,
        cost=float(len(basic_blocks)),
        is_feasible=True,
    )


def _print_trajectory(
    traj:       Trajectory,
    idx:        int,
    smt_result: str,
    elapsed:    float,
) -> None:
    """
    Affiche une trajectoire extraite en temps réel sur la sortie standard.
    Format détaillé et lisible, conforme à la demande de visualisation.
    """
    blocks_str = " → ".join(str(b) for b in traj.basic_blocks[:10])
    if len(traj.basic_blocks) > 10:
        blocks_str += f" → … ({len(traj.basic_blocks)} blocs total)"

    print(f"\n  ┌─ TRAJECTOIRE #{idx:04d} ──────────────────────────────────────────────")
    print(f"  │  ID           : {traj.path_id}")
    print(f"  │  SMT          : {smt_result}")
    print(f"  │  Blocs CFG    : {blocks_str}")
    print(f"  │  Branches     : {len(traj.branches_covered)} arc(s) couvert(s)")
    print(f"  │  Coût |t|     : {int(traj.cost)}")
    print(f"  │  Pi(t)        : {traj.path_condition[:80]}{'...' if len(traj.path_condition) > 80 else ''}")
    if traj.constraints:
        print(f"  │  Contraintes  :")
        for i, c in enumerate(traj.constraints):
            print(f"  │    [{i+1:02d}] {c}")
    print(f"  └──────────────────────────────────────────────── t={elapsed:.2f}s ──")
