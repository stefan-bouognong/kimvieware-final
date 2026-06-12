"""
JS/TS Trajectory Extractor — Version avancée (alignée PythonExtractor)

Features:
- AST via Acorn
- Support fonctions + programme global
- PathCrawler symbolique
- Extraction des constantes (const/let)
- Construction Pi(t)
- Vérification SMT (Z3)
"""

import json
import subprocess
import tempfile
import textwrap
import time
from pathlib import Path
from typing import List, Dict, Any, Tuple
import logging

from kimvieware_shared.models import Trajectory

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────
# Z3 SMT
# ─────────────────────────────────────────────

def _check_feasibility_z3(constraints: List[str]) -> Tuple[bool, str]:
    if not constraints:
        return True, "SAT"

    try:
        import z3
        solver = z3.Solver()
        solver.set("timeout", 2000)

        vars_declared = {}

        def get_var(name):
            if name not in vars_declared:
                vars_declared[name] = z3.Int(name)
            return vars_declared[name]

        for c in constraints:
            parsed = _parse_constraint_to_z3(c, get_var)
            if parsed is not None:
                solver.add(parsed)

        res = solver.check()

        if res == z3.sat:
            return True, "SAT"
        elif res == z3.unsat:
            return False, "UNSAT"
        else:
            return True, "UNKNOWN"

    except Exception as e:
        logger.debug(f"Z3 error: {e}")
        return True, "UNKNOWN"


def _parse_constraint_to_z3(cstr: str, get_var):
    try:
        import z3

        cstr = cstr.replace("===", "==").replace("!==", "!=")

        for op in ["==", "!=", ">=", "<=", ">", "<"]:
            if op in cstr:
                lhs, rhs = cstr.split(op, 1)
                lhs = lhs.strip()
                rhs = rhs.strip()

                if not lhs.isidentifier():
                    return None

                lhs = get_var(lhs)

                if rhs.isdigit():
                    rhs = int(rhs)
                elif rhs in ("true", "false"):
                    rhs = 1 if rhs == "true" else 0
                elif rhs.isidentifier():
                    rhs = get_var(rhs)
                else:
                    return None

                ops = {
                   "==": lhs == rhs,
                    "!=": lhs != rhs,
                    ">=": lhs >= rhs,
                    "<=": lhs <= rhs,
                    ">": lhs > rhs,
                    "<": lhs < rhs,
                }

                return ops[op]

        return None

    except Exception:
        return None


# ─────────────────────────────────────────────
# PathCrawler JS
# ─────────────────────────────────────────────

class JSPathCrawler:

    def __init__(self, source_text: str = "", max_paths: int = 1000):
        self.source_text = source_text
        self.max_paths = max_paths

    def _extract_condition(self, node):
        if not isinstance(node, dict):
            return "cond"
        start = node.get("start")
        end = node.get("end")
        if start is not None and end is not None and self.source_text:
            return self.source_text[start:end]
        return "cond"

    def explore_function(self, func_node: dict):
        #  Support GLOBAL PROGRAM
        if func_node.get("type") == "Program":
            body = func_node.get("body", [])
        else:
            body = func_node.get("body", {}).get("body", [])

        paths = [[]]

        for stmt in body:
            new_paths = []
            for p in paths:
                new_paths.extend(self._explore(stmt, p))
                if len(new_paths) > self.max_paths:
                    new_paths = new_paths[:self.max_paths]
            paths = new_paths

        return paths

    def _explore(self, node, current_path):
        if not isinstance(node, dict):
            return [current_path]

        t = node.get("type")
        line = node.get("loc", {}).get("start", {}).get("line", 0)

        # ───── IF ─────
        if t == "IfStatement":
            cond = self._extract_condition(node.get("test"))

            true_step = {"type": "branch", "cond": cond, "val": True, "line": line}
            false_step = {"type": "branch", "cond": cond, "val": False, "line": line}

            true_paths = self._explore_block(
                node.get("consequent"), current_path + [true_step]
            )

            if node.get("alternate"):
                false_paths = self._explore_block(
                    node.get("alternate"), current_path + [false_step]
                )
            else:
                false_paths = [current_path + [false_step]]

            return true_paths + false_paths

        # ───── LOOP ─────
        elif t in ("WhileStatement", "ForStatement"):
            cond = self._extract_condition(node.get("test"))

            enter = current_path + [{"type": "loop", "cond": cond, "val": True, "line": line}]
            skip = current_path + [{"type": "loop", "cond": cond, "val": False, "line": line}]

            entered = self._explore_block(node.get("body"), enter)

            return entered + [skip]

        # ───── VARIABLE DECLARATION ─────
        elif t == "VariableDeclaration":
            steps = []
            for decl in node.get("declarations", []):
                name = decl.get("id", {}).get("name")
                value_node = decl.get("init")

                if name and value_node and value_node.get("type") == "Literal":
                    value = value_node.get("value")
                    steps.append({
                        "type": "constraint",
                        "cond": f"{name} == {value}",
                        "line": line
                    })

            return [current_path + steps]

        # ───── DEFAULT ─────
        return [current_path + [{"type": "stmt", "node": t, "line": line}]]

    def _explore_block(self, block, path):
        if not isinstance(block, dict):
            return [path]

        if block.get("type") == "BlockStatement":
            paths = [path]
            for stmt in block.get("body", []):
                new_paths = []
                for p in paths:
                    new_paths.extend(self._explore(stmt, p))
                    if len(new_paths) > self.max_paths:
                        new_paths = new_paths[:self.max_paths]
                paths = new_paths
            return paths

        return [path]


# ─────────────────────────────────────────────
# JSExtractor
# ─────────────────────────────────────────────

class JSExtractor:

    NODE_SCRIPT = textwrap.dedent("""
        const acorn = require('acorn');
        const fs = require('fs');

        const file = process.argv[2];
        const src = fs.readFileSync(file, 'utf8');

        const ast = acorn.parse(src, {
            ecmaVersion: 2022,
            sourceType: 'module',
            locations: true
        });

        console.log(JSON.stringify(ast));
    """)

    def __init__(self, max_paths=200, timeout_global=120):
        self.max_paths = max_paths
        self.timeout_global = timeout_global

    # ─────────────────────────

    def extract_paths(self, source_dir: Path) -> List[Trajectory]:
        all_files = list(source_dir.rglob("*.js")) + list(source_dir.rglob("*.ts"))
        files = [f for f in all_files if not any(part in f.parts for part in ["node_modules", "dist", "build", ".next"])]

        all_traj = []
        start_time = time.time()

        for f in files:
            if time.time() - start_time > self.timeout_global:
                logger.warning(f" Budget global atteint ({self.timeout_global}s).")
                break
            if len(all_traj) >= self.max_paths:
                break

            logger.info(f"Processing {f.name}")

            try:
                source_text = f.read_text(encoding="utf-8")
            except Exception as e:
                logger.error(f"Error reading {f.name}: {e}")
                continue

            crawler = JSPathCrawler(source_text, max_paths=self.max_paths)

            ast = self._get_ast(f)
            if not ast:
                continue

            #  inclure programme global
            functions = self._find_functions(ast)
            functions.append(ast)

            for func in functions:
                if time.time() - start_time > self.timeout_global:
                    break
                if len(all_traj) >= self.max_paths:
                    break

                raw_paths = crawler.explore_function(func)

                for i, path in enumerate(raw_paths):
                    if time.time() - start_time > self.timeout_global:
                        break
                    if len(all_traj) >= self.max_paths:
                        break

                    constraints = _build_constraints_js(path)

                    feasible, smt = _check_feasibility_z3(constraints)
                    if not feasible:
                        continue

                    basic_blocks = []
                    branches = set()
                    prev_line = None
                    for step in path:
                        line = step.get("line", 0)
                        basic_blocks.append(line)
                        if prev_line is not None and step["type"] in ("branch", "loop"):
                            branches.add((prev_line, line))
                        prev_line = line

                    traj = Trajectory(
                        path_id=f"js_{i}",
                        basic_blocks=basic_blocks,
                        path_condition=" AND ".join(constraints) if constraints else "TRUE",
                        branches_covered=branches,
                        constraints=constraints,
                        cost=float(len(path)),
                        is_feasible=True
                    )

                    all_traj.append(traj)
                    self._print_trajectory(traj, i, smt)

        return all_traj[:self.max_paths]

    # ─────────────────────────

    def _get_ast(self, file_path: Path):
        with tempfile.NamedTemporaryFile(suffix=".js", delete=False, mode="w") as tmp:
            tmp.write(self.NODE_SCRIPT)
            tmp_path = tmp.name

        try:
            result = subprocess.run(
                ["node", tmp_path, str(file_path)],
                capture_output=True,
                text=True
            )

            if result.returncode != 0:
                logger.error(result.stderr)
                return None

            return json.loads(result.stdout)

        finally:
            Path(tmp_path).unlink(missing_ok=True)

    # ─────────────────────────

    def _find_functions(self, node):
        results = []

        def walk(n):
            if not isinstance(n, dict):
                return

            if n.get("type") in (
                "FunctionDeclaration",
                "FunctionExpression",
                "ArrowFunctionExpression"
            ):
                results.append(n)

            for v in n.values():
                if isinstance(v, dict):
                    walk(v)
                elif isinstance(v, list):
                    for i in v:
                        walk(i)

        walk(node)
        return results

    # ─────────────────────────



    # ─────────────────────────

    def _print_trajectory(self, traj, idx, smt):
        print("\n──── JS TRAJECTORY ────")
        print("ID:", traj.path_id)
        print("SMT:", smt)
        print("Cost:", traj.cost)
        print("Pi(t):", traj.path_condition)
        print("Constraints:", traj.constraints)


# ─────────────────────────────────────────────

def _build_constraints_js(path):
    constraints = []
    for step in path:
        if step["type"] == "constraint":
            constraints.append(step["cond"])

        elif step["type"] in ("branch", "loop"):
            if step["val"]:
                constraints.append(step["cond"])
            else:
                constraints.append(f"NOT ({step['cond']})")

    return constraints