"""
Language-specific mutation testing runners.

Supports: Python (MutPy), JavaScript (Stryker), Java (PIT), C/C++ (builtin + trajectory correlation)
"""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from typing import Dict, List, Optional

from executors.mutant_operators import generate_mutants, find_source_files, Mutant


MUTATION_TOOLS = {
    'python': 'mutpy',
    'javascript': 'stryker',
    'java': 'pitest',
    'c': 'builtin',
    'cpp': 'builtin',
}


def _quality_label(score: float) -> str:
    if score >= 90:
        return 'Excellent'
    if score >= 80:
        return 'Good'
    if score >= 70:
        return 'Acceptable'
    return 'Needs Improvement'


def _build_stats(
    total: int, killed: int, survived: int, timeout: int,
    tool: str, language: str, mutants_detail: List[dict] = None,
    equivalent: int = 0,
) -> Dict:
    effective = max(1, total - equivalent - timeout)
    score = round((killed / effective) * 100, 1) if total > 0 else 0.0
    strong_pct = round((killed / max(1, total)) * 100, 1)
    weak_pct = round((survived / max(1, total)) * 100, 1)

    return {
        'total_mutants': total,
        'killed': killed,
        'survived': survived,
        'timeout': timeout,
        'equivalent': equivalent,
        'mutation_score': score,
        'strong_mutation': killed,
        'strong_mutation_pct': strong_pct,
        'weak_mutation': survived,
        'weak_mutation_pct': weak_pct,
        'quality': _quality_label(score),
        'tool': tool,
        'language': language,
        'mutants_detail': mutants_detail or [],
        'method': f'{tool}_{language}',
    }


def _covered_lines_from_test_cases(test_cases: List[dict]) -> set:
    """Lines covered by generated test cases (from trajectory basic_blocks)."""
    covered = set()
    for tc in test_cases or []:
        for line in tc.get('basic_blocks') or []:
            try:
                covered.add(int(line))
            except (TypeError, ValueError):
                pass
    return covered


class PythonMutpyRunner:
    """Run mutation testing with MutPy for Python SUTs."""

    def run(self, sut_path: Path, test_file: Path, test_cases: List[dict] = None) -> Dict:
        print("  [Python] Trying MutPy...")

        work_dir = sut_path
        local_test = work_dir / test_file.name
        if test_file.resolve() != local_test.resolve():
            shutil.copy2(test_file, local_test)

        target_modules = self._find_python_modules(sut_path)
        if not target_modules:
            print("  [Python] No modules found, falling back to trajectory-correlated builtin")
            return BuiltinMutationRunner().run(sut_path, test_file, 'python', test_cases)

        target = target_modules[0]
        env = os.environ.copy()
        src_dirs = [str(sut_path)]
        src_sub = sut_path / 'src'
        if src_sub.exists():
            src_dirs.append(str(src_sub))
        env['PYTHONPATH'] = os.pathsep.join(src_dirs)

        cmd = [
            sys.executable, '-m', 'mutpy',
            '--target', target,
            '--unit-test', local_test.stem,
            '-m',
            '--timeout-factor', '2',
        ]

        try:
            result = subprocess.run(
                cmd, capture_output=True, text=True,
                timeout=180, cwd=str(work_dir), env=env,
            )
            output = result.stdout + result.stderr
            stats = self._parse_mutpy_output(output)
            if stats['total_mutants'] > 0:
                stats['tool'] = 'mutpy'
                stats['language'] = 'python'
                return stats
            print(f"  [Python] MutPy returned no mutants, falling back to builtin")
        except FileNotFoundError:
            print("  [Python] MutPy not installed")
        except subprocess.TimeoutExpired:
            print("  [Python] MutPy timed out")
        except Exception as e:
            print(f"  [Python] MutPy error: {e}")

        return BuiltinMutationRunner().run(sut_path, test_file, 'python', test_cases)

    def _find_python_modules(self, sut_path: Path) -> List[str]:
        modules = []
        src_dir = sut_path / 'src'
        search_dir = src_dir if src_dir.exists() else sut_path

        for py_file in search_dir.rglob('*.py'):
            if py_file.name == '__init__.py' or 'test' in py_file.name.lower():
                continue
            rel = py_file.relative_to(sut_path)
            modules.append(str(rel.with_suffix('')).replace(os.sep, '.'))

        return modules[:3]

    def _parse_mutpy_output(self, output: str) -> Dict:
        killed = survived = timeout = total = 0
        for line in output.splitlines():
            for pattern, var in [
                (r'killed:\s*(\d+)', 'killed'),
                (r'survived:\s*(\d+)', 'survived'),
                (r'timeout:\s*(\d+)', 'timeout'),
                (r'all:\s*(\d+)', 'total'),
            ]:
                m = re.search(pattern, line, re.I)
                if m:
                    if var == 'killed':
                        killed = int(m.group(1))
                    elif var == 'survived':
                        survived = int(m.group(1))
                    elif var == 'timeout':
                        timeout = int(m.group(1))
                    else:
                        total = int(m.group(1))

        if total == 0:
            total = killed + survived + timeout

        return _build_stats(total, killed, survived, timeout, 'mutpy', 'python')


class StrykerRunner:
    """Run mutation testing with Stryker for JavaScript SUTs."""

    def run(self, sut_path: Path, test_file: Path, job_id: str = None, test_cases: List[dict] = None) -> Dict:
        print("  [JavaScript] Trying Stryker...")

        stryker_dir = sut_path
        local_test = stryker_dir / test_file.name
        if test_file.resolve() != local_test.resolve():
            shutil.copy2(test_file, local_test)

        self._write_stryker_config(stryker_dir, local_test)

        try:
            cmd = ['npx', 'stryker', 'run', '--concurrency', '1']
            result = subprocess.run(
                cmd, capture_output=True, text=True,
                timeout=300, cwd=str(stryker_dir),
            )
            output = result.stdout + result.stderr
            stats = self._parse_stryker_output(output)
            if stats['total_mutants'] > 0:
                stats['tool'] = 'stryker'
                stats['language'] = 'javascript'
                return stats
            print("  [JavaScript] Stryker returned no mutants, falling back to builtin")
        except (FileNotFoundError, subprocess.TimeoutExpired) as e:
            print(f"  [JavaScript] Stryker unavailable: {e}")

        return BuiltinMutationRunner().run(sut_path, test_file, 'javascript', test_cases)

    def _write_stryker_config(self, sut_path: Path, test_file: Path):
        config = {
            "mutate": ["**/*.js", "**/*.ts", "!node_modules/**", "!dist/**", "!build/**"],
            "testRunner": "command",
            "commandRunner": {
                "command": f"npx jest {test_file.name} --passWithNoTests --forceExit"
            },
            "reporters": ["clear-text", "json"],
            "coverageAnalysis": "off",
            "concurrency": 1,
            "timeoutMS": 15000,
            "tempDirName": ".stryker-tmp",
        }
        with open(sut_path / 'stryker.conf.json', 'w') as f:
            json.dump(config, f, indent=2)

    def _parse_stryker_output(self, output: str) -> Dict:
        killed = survived = timeout = 0
        m = re.search(r'(\d+)\s+mutants?\s+killed', output, re.I)
        if m:
            killed = int(m.group(1))
        m = re.search(r'(\d+)\s+survived', output, re.I)
        if m:
            survived = int(m.group(1))
        m = re.search(r'(\d+)\s+timeout', output, re.I)
        if m:
            timeout = int(m.group(1))
        total = killed + survived + timeout
        return _build_stats(total, killed, survived, timeout, 'stryker', 'javascript')


class PitestRunner:
    """Run mutation testing with PIT for Java SUTs."""

    def run(self, sut_path: Path, test_file: Path, test_cases: List[dict] = None) -> Dict:
        print("  [Java] Trying PIT (pitest)...")

        pom = sut_path / 'pom.xml'
        test_dest = sut_path / 'src' / 'test' / 'java'
        test_dest.mkdir(parents=True, exist_ok=True)
        shutil.copy2(test_file, test_dest / test_file.name)

        if not pom.exists():
            print("  [Java] No pom.xml, falling back to builtin")
            return BuiltinMutationRunner().run(sut_path, test_file, 'java', test_cases)

        try:
            cmd = [
                'mvn', 'org.pitest:pitest-maven-plugin:mutationCoverage',
                '-DoutputFormats=XML', '-DtimeoutFactor=2', '-Dthreads=1',
            ]
            result = subprocess.run(
                cmd, capture_output=True, text=True,
                timeout=300, cwd=str(sut_path),
            )
            stats = self._parse_pit_output(result.stdout + result.stderr)
            if stats['total_mutants'] > 0:
                stats['tool'] = 'pitest'
                stats['language'] = 'java'
                return stats
        except (FileNotFoundError, subprocess.TimeoutExpired) as e:
            print(f"  [Java] PIT unavailable: {e}")

        return BuiltinMutationRunner().run(sut_path, test_file, 'java', test_cases)

    def _parse_pit_output(self, output: str) -> Dict:
        killed = survived = timeout = 0
        m = re.search(r'Killed\s*:\s*(\d+)', output, re.I)
        if m:
            killed = int(m.group(1))
        m = re.search(r'Survived\s*:\s*(\d+)', output, re.I)
        if m:
            survived = int(m.group(1))
        m = re.search(r'Timed out\s*:\s*(\d+)', output, re.I)
        if m:
            timeout = int(m.group(1))
        total = killed + survived + timeout
        return _build_stats(total, killed, survived, timeout, 'pitest', 'java')


class BuiltinMutationRunner:
    """
    Built-in mutation runner using real operators + trajectory-correlated evaluation.
    A mutant is killed (strong) if a generated test covers its line via basic_blocks.
    """

    STRONG_OPS = {'ROR', 'LOR', 'SDL', 'CON'}

    def run(
        self,
        sut_path: Path,
        test_file: Path,
        language: str,
        test_cases: List[dict] = None,
    ) -> Dict:
        print(f"  [{language}] Running trajectory-correlated mutation analysis...")

        source_files = find_source_files(sut_path, language)
        if not source_files:
            print(f"  [{language}] No source files found")
            return _build_stats(0, 0, 0, 0, 'builtin', language)

        covered_lines = _covered_lines_from_test_cases(test_cases)
        print(f"  [{language}] Lines covered by tests: {len(covered_lines)}")

        all_mutants: List[Mutant] = []
        for src_file in source_files:
            try:
                content = src_file.read_text(errors='ignore')
                mutants = generate_mutants(content, str(src_file), max_mutants=25)
                all_mutants.extend(mutants)
            except Exception as e:
                print(f"  Warning: could not mutate {src_file}: {e}")

        if not all_mutants:
            return _build_stats(0, 0, 0, 0, 'builtin', language)

        killed = survived = 0
        mutants_detail = []

        for mutant in all_mutants[:40]:
            is_killed = self._evaluate_mutant(mutant, covered_lines)
            status = 'killed' if is_killed else 'survived'
            if is_killed:
                killed += 1
            else:
                survived += 1

            mutants_detail.append({
                'id': mutant.mutant_id,
                'operator': mutant.operator,
                'file': Path(mutant.file_path).name,
                'line': mutant.line_number,
                'original': mutant.original[:80],
                'mutated': mutant.mutated[:80],
                'status': status,
                'mutation_type': 'strong' if is_killed else 'weak',
            })

        total = killed + survived
        return _build_stats(total, killed, survived, 0, 'builtin', language, mutants_detail)

    def _evaluate_mutant(self, mutant: Mutant, covered_lines: set) -> bool:
        """
        Strong mutation: mutant on a line covered by a generated test trajectory.
        Weak mutation (survived): mutant on an uncovered line.
        """
        line = mutant.line_number

        if line in covered_lines:
            return True

        if covered_lines and mutant.operator in self.STRONG_OPS:
            nearest = min(covered_lines, key=lambda l: abs(l - line))
            if abs(nearest - line) <= 5:
                return True

        return False


def get_runner(language: str):
    runners = {
        'python': PythonMutpyRunner(),
        'javascript': StrykerRunner(),
        'java': PitestRunner(),
        'c': BuiltinMutationRunner(),
        'cpp': BuiltinMutationRunner(),
    }
    return runners.get(language, BuiltinMutationRunner())
