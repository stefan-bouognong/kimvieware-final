"""
Test Case Generator — Generic, SUT-agnostic
Converts trajectories from Phase 3 into executable test cases per language.

Design principles:
  - No hardcoded endpoints, scenarios, or field names
  - 1 trajectory → N test cases (nominal + boundary + negative)
  - All inference is driven by trajectory content (path_condition, constraints, path_id)
  - Full terminal display of generated test cases

Supported: Python (pytest), JavaScript (jest), Java (JUnit)
"""
import re
from pathlib import Path
from typing import List, Dict, Tuple, Optional
import sys

sys.path.insert(0, str(Path(__file__).parent.parent.parent.parent / 'kimvieware-shared' / 'src'))
from kimvieware_shared.models import Trajectory


# ─────────────────────────────────────────────
# Language config
# ─────────────────────────────────────────────

LANGUAGE_CONFIG = {
    'python':     {'ext': '.py',      'filename': 'test_generated.py',       'framework': 'pytest'},
    'javascript': {'ext': '.spec.js', 'filename': 'test_generated.spec.js',  'framework': 'jest'},
    'java':       {'ext': '.java',    'filename': 'TestGenerated.java',       'framework': 'junit'},
    'c':          {'ext': '.py',      'filename': 'test_generated.py',        'framework': 'pytest'},
    'cpp':        {'ext': '.py',      'filename': 'test_generated.py',        'framework': 'pytest'},
}

# HTTP verbs we recognise in trajectory text
_HTTP_VERBS = ['POST', 'PUT', 'PATCH', 'DELETE', 'GET', 'HEAD', 'OPTIONS']

# Python / logic keywords to exclude from param extraction
_SKIP_KEYS = {
    'if', 'and', 'or', 'not', 'in', 'is', 'for', 'while', 'return',
    'true', 'false', 'null', 'none', 'True', 'False', 'None',
    'assert', 'with', 'as', 'def', 'class', 'import', 'from',
    'len', 'str', 'int', 'float', 'bool', 'list', 'dict',
}

# Boundary / negative value generators per value type
_BOUNDARY_NUMBERS = [0, -1, 999999]
_BOUNDARY_STRINGS = ['', 'a' * 256, ' ', '!@#$%']


# ─────────────────────────────────────────────
# Core helpers
# ─────────────────────────────────────────────

def _all_text(traj: Trajectory) -> str:
    """Concatenate all textual content of a trajectory for scanning."""
    parts = [traj.path_condition or '', traj.path_id or '']
    parts += list(traj.constraints or [])
    return ' '.join(parts)


def _extract_endpoint(traj: Trajectory) -> str:
    """
    Try to find an explicit endpoint path in the trajectory.
    Falls back to building one from the path_id.
    """
    text = _all_text(traj)

    # Pattern: /something/maybe/more  (anchored to a slash)
    match = re.search(r'(/[\w/\-_{}]+)', text)
    if match:
        candidate = match.group(1)
        # Ignore trivial single-segment false matches like /1 or /0
        if len(candidate) > 2 and not re.fullmatch(r'/\d+', candidate):
            return candidate

    # Build from path_id: "path_register_valid_001" → "/register"
    pid = (traj.path_id or '').lower()
    for segment in pid.split('_'):
        if segment and segment not in ('path', 'test', 'case', 'traj', 'p'):
            return f'/{segment}'

    return '/'


def _extract_http_method(traj: Trajectory) -> str:
    """Detect HTTP verb from trajectory text, default POST."""
    text = _all_text(traj).upper()
    for verb in _HTTP_VERBS:
        if verb in text:
            return verb
    # Heuristics
    lower = text.lower()
    if any(k in lower for k in ['create', 'add', 'register', 'submit', 'post', 'new']):
        return 'POST'
    if any(k in lower for k in ['update', 'edit', 'modify', 'put', 'patch']):
        return 'PUT'
    if any(k in lower for k in ['delete', 'remove']):
        return 'DELETE'
    return 'GET'


def _extract_params(traj: Trajectory) -> Dict[str, str]:
    """
    Extract key=value pairs from constraints and path_condition generically.
    No assumed field names — reads whatever the trajectory actually mentions.
    """
    text = _all_text(traj)
    params: Dict[str, str] = {}

    # Pattern 1: key = "value"  or  key = 'value'
    for m in re.finditer(r'(\w+)\s*[=:]\s*["\']([^"\']+)["\']', text):
        key, val = m.group(1), m.group(2)
        if key.lower() not in _SKIP_KEYS and not key[0].isdigit():
            params[key] = val

    # Pattern 2: key = bare_value (word boundary, no quote)
    for m in re.finditer(r'(\w+)\s*[=:]\s*([A-Za-z0-9_@.\-]+)', text):
        key, val = m.group(1), m.group(2)
        if key.lower() not in _SKIP_KEYS and not key[0].isdigit() and key not in params:
            params[key] = val

    # Pattern 3: standalone meaningful words in constraints become string params
    # e.g. "password is weak" → password: "weak"
    for constraint in (traj.constraints or []):
        c = constraint.lower()
        for noun in re.findall(r'\b(\w{3,})\s+(?:is|=|:)\s+(\w+)', c):
            key, val = noun
            if key not in _SKIP_KEYS and key not in {k.lower() for k in params}:
                params[key] = val

    return params


def _infer_expected_statuses(traj: Trajectory) -> List[int]:
    """
    Infer acceptable HTTP status codes from trajectory content.
    Returns a list of plausible codes (we accept any of them in the assertion).
    """
    text = _all_text(traj).lower()
    codes: List[int] = []

    # Explicit status code mentions
    for m in re.finditer(r'\b(2\d\d|4\d\d|5\d\d)\b', text):
        codes.append(int(m.group(1)))

    if not codes:
        # Semantic inference
        if any(k in text for k in ['error', 'fail', 'invalid', 'bad', 'wrong', 'reject']):
            if any(k in text for k in ['auth', 'unauthorized', 'token', 'credential']):
                codes = [400, 401, 403, 422]
            else:
                codes = [400, 409, 422]
        elif any(k in text for k in ['not found', 'missing', 'absent']):
            codes = [404]
        elif any(k in text for k in ['forbidden', 'denied', 'permission']):
            codes = [403]
        elif any(k in text for k in ['creat', 'add', 'register', 'insert', 'new']):
            codes = [200, 201, 400, 409, 422]
        elif any(k in text for k in ['success', 'ok', 'valid', 'found']):
            codes = [200, 201]
        else:
            # Fallback: accept any non-server-error
            codes = [200, 201, 204, 400, 401, 403, 404, 422]

    return sorted(set(codes))


def _make_boundary_value(val: str) -> str:
    """Given a nominal value, produce a boundary variant."""
    if re.match(r'^-?\d+(\.\d+)?$', val):
        return '0'
    if len(val) > 10:
        return ''       # empty string
    return val + val    # double it (tests max-length / duplicate)


def _make_negative_value(val: str) -> str:
    """Given a nominal value, produce a clearly invalid variant."""
    if re.match(r'^-?\d+(\.\d+)?$', val):
        return '-1'
    if '@' in val:
        return 'not-an-email'
    return '!INVALID!'


# ─────────────────────────────────────────────
# Test case expansion: 1 trajectory → N cases
# ─────────────────────────────────────────────

def _expand_trajectory(traj: Trajectory, index: int) -> List[Dict]:
    """
    Derive multiple test cases from a single trajectory:
      0 — nominal   : params as extracted
      1 — boundary  : at least one param pushed to edge value
      2 — negative  : at least one param set to clearly invalid value
    """
    endpoint = _extract_endpoint(traj)
    method   = _extract_http_method(traj)
    params   = _extract_params(traj)
    statuses = _infer_expected_statuses(traj)
    path_cond = traj.path_condition or ''
    constraints = list(traj.constraints or [])

    base = {
        'trajectory_id': traj.path_id,
        'endpoint': endpoint,
        'method': method,
        'path_condition': path_cond,
        'constraints': constraints,
        'basic_blocks': list(traj.basic_blocks or []),
        'cost': traj.cost,
        'fitness': traj.fitness,
    }

    cases = []

    # ── Case 0: nominal ──────────────────────────────────────────────────────
    cases.append({
        **base,
        'id':       f"{traj.path_id}_nominal",
        'name':     f"test_{_safe_name(traj.path_id)}_nominal",
        'variant':  'nominal',
        'inputs':   dict(params),
        'expected_statuses': statuses,
        'description': f"Nominal path: {path_cond[:80]}",
    })

    # ── Case 1: boundary ─────────────────────────────────────────────────────
    if params:
        boundary_params = dict(params)
        pivot_key = next(iter(params))   # mutate the first param
        boundary_params[pivot_key] = _make_boundary_value(params[pivot_key])
        boundary_statuses = sorted(set(statuses + [400, 422]))
        cases.append({
            **base,
            'id':       f"{traj.path_id}_boundary",
            'name':     f"test_{_safe_name(traj.path_id)}_boundary",
            'variant':  'boundary',
            'inputs':   boundary_params,
            'expected_statuses': boundary_statuses,
            'description': f"Boundary: '{pivot_key}' set to edge value '{boundary_params[pivot_key]}'",
        })

    # ── Case 2: negative ─────────────────────────────────────────────────────
    if params:
        negative_params = dict(params)
        pivot_key = next(iter(params))
        negative_params[pivot_key] = _make_negative_value(params[pivot_key])
        negative_statuses = sorted(set([400, 401, 403, 422]))
        cases.append({
            **base,
            'id':       f"{traj.path_id}_negative",
            'name':     f"test_{_safe_name(traj.path_id)}_negative",
            'variant':  'negative',
            'inputs':   negative_params,
            'expected_statuses': negative_statuses,
            'description': f"Negative: '{pivot_key}' set to invalid value '{negative_params[pivot_key]}'",
        })

    return cases


def _safe_name(s: str) -> str:
    """Convert arbitrary string to safe Python identifier."""
    return re.sub(r'[^a-zA-Z0-9_]', '_', s)[:50]


# ─────────────────────────────────────────────
# Terminal display
# ─────────────────────────────────────────────

_VARIANT_ICONS = {
    'nominal':  '✅',
    'boundary': '⚠️ ',
    'negative': '❌',
}

_VARIANT_COLORS = {
    'nominal':  '\033[92m',   # green
    'boundary': '\033[93m',   # yellow
    'negative': '\033[91m',   # red
}
_RESET = '\033[0m'
_BOLD  = '\033[1m'
_DIM   = '\033[2m'
_CYAN  = '\033[96m'
_BLUE  = '\033[94m'


def _print_separator(char: str = '─', width: int = 72):
    print(f"{_DIM}{char * width}{_RESET}")


def _print_test_cases(test_cases: List[Dict], language: str):
    """Pretty-print all generated test cases to the terminal."""
    total = len(test_cases)
    by_variant = {}
    for tc in test_cases:
        by_variant.setdefault(tc['variant'], []).append(tc)

    print()
    _print_separator('═')
    print(f"{_BOLD}{_CYAN}  🧪 Generated Test Cases — {language.upper()}{_RESET}")
    print(f"  Total: {_BOLD}{total}{_RESET} cases  "
          f"({len(by_variant.get('nominal', []))} nominal · "
          f"{len(by_variant.get('boundary', []))} boundary · "
          f"{len(by_variant.get('negative', []))} negative)")
    _print_separator('═')

    # Group by originating trajectory
    by_traj: Dict[str, List[Dict]] = {}
    for tc in test_cases:
        by_traj.setdefault(tc['trajectory_id'], []).append(tc)

    for traj_id, cases in by_traj.items():
        print()
        print(f"  {_BOLD}{_BLUE}Trajectory: {traj_id}{_RESET}")
        first = cases[0]
        print(f"  {_DIM}Endpoint : {first['method']} {first['endpoint']}{_RESET}")
        if first['path_condition']:
            cond_preview = first['path_condition'][:70]
            print(f"  {_DIM}Condition: {cond_preview}{'…' if len(first['path_condition']) > 70 else ''}{_RESET}")
        _print_separator()

        for tc in cases:
            icon  = _VARIANT_ICONS.get(tc['variant'], '  ')
            color = _VARIANT_COLORS.get(tc['variant'], '')
            print(f"  {icon} {color}{_BOLD}{tc['name']}{_RESET}")
            print(f"     {_DIM}Variant    :{_RESET} {tc['variant']}")
            print(f"     {_DIM}Description:{_RESET} {tc['description']}")

            # Inputs
            if tc['inputs']:
                print(f"     {_DIM}Inputs     :{_RESET}")
                for k, v in tc['inputs'].items():
                    v_display = repr(v) if isinstance(v, str) else str(v)
                    print(f"       • {k} = {v_display}")
            else:
                print(f"     {_DIM}Inputs     : (none extracted){_RESET}")

            # Expected
            statuses_str = ', '.join(str(s) for s in tc['expected_statuses'])
            print(f"     {_DIM}Expected   :{_RESET} HTTP [{statuses_str}]")
            print()

    _print_separator('═')
    print(f"  {_BOLD}Summary{_RESET}: {len(by_traj)} trajectories → {total} test cases")
    _print_separator('═')
    print()


# ─────────────────────────────────────────────
# Code generators
# ─────────────────────────────────────────────

def _request_block_python(tc: Dict) -> str:
    """Generate the requests call + assertion for one test case."""
    method  = tc['method'].lower()
    ep      = tc['endpoint']
    inputs  = tc['inputs']
    codes   = tc['expected_statuses']

    if method in ('post', 'put', 'patch'):
        body = f"    payload = {repr(inputs)}\n"
        call = f"    response = requests.{method}(f\"{{BASE_URL}}{ep}\", json=payload)\n"
    elif method == 'delete':
        body = ""
        call = f"    response = requests.delete(f\"{{BASE_URL}}{ep}\")\n"
    else:
        body = f"    params = {repr(inputs)}\n" if inputs else ""
        call = f"    response = requests.get(f\"{{BASE_URL}}{ep}\", params={repr(inputs)})\n"

    codes_str = repr(codes)
    assertion = (
        f"    assert response.status_code in {codes_str}, (\n"
        f"        f\"[{tc['id']}] Expected one of {codes_str}, \"\n"
        f"        f\"got {{response.status_code}} — {{response.text[:200]}}\"\n"
        f"    )\n"
    )
    return body + call + assertion


def _generate_python_code(test_cases: List[Dict], sut_url: str) -> str:
    lines = [
        '"""',
        'Auto-generated test cases from symbolic execution trajectories',
        f'Generated by KIMVIEware Phase 4 Executor — {len(test_cases)} test cases',
        '"""',
        'import pytest',
        'import requests',
        '',
        f'BASE_URL = "{sut_url}"',
        '',
        '',
    ]
    for tc in test_cases:
        path_cond  = (tc['path_condition'] or '').replace('"', '\\"')[:120]
        constraints = '; '.join(tc['constraints'][:3]).replace('"', '\\"')
        lines += [
            f"def {tc['name']}():",
            f'    """',
            f'    Trajectory : {tc["trajectory_id"]}',
            f'    Variant    : {tc["variant"]}',
            f'    Endpoint   : {tc["method"]} {tc["endpoint"]}',
            f'    Description: {tc["description"]}',
            f'    Condition  : {path_cond}',
            f'    Constraints: {constraints}',
            f'    """',
        ]
        lines.append(_request_block_python(tc))
        lines.append('')

    return '\n'.join(lines)


def _request_block_js(tc: Dict) -> str:
    method = tc['method'].upper()
    ep     = tc['endpoint']
    inputs = tc['inputs']
    codes  = tc['expected_statuses']
    codes_str = '[' + ', '.join(str(c) for c in codes) + ']'

    if method in ('POST', 'PUT', 'PATCH'):
        payload_js = (
            '        const payload = ' + _dict_to_js(inputs) + ';\n'
            f'        const response = await fetch(`${{BASE_URL}}{ep}`, {{\n'
            '            method: "' + method + '",\n'
            '            headers: { "Content-Type": "application/json" },\n'
            '            body: JSON.stringify(payload)\n'
            '        });\n'
        )
    elif method == 'DELETE':
        payload_js = (
            f'        const response = await fetch(`${{BASE_URL}}{ep}`, '
            '{ method: "DELETE" });\n'
        )
    else:
        qs = '?' + '&'.join(f'{k}={v}' for k, v in inputs.items()) if inputs else ''
        payload_js = (
            f'        const response = await fetch(`${{BASE_URL}}{ep}{qs}`);\n'
        )

    return (
        payload_js +
        f'        expect({codes_str}).toContain(response.status);\n'
    )


def _dict_to_js(d: Dict) -> str:
    items = ', '.join(f'{k}: {repr(v)}' for k, v in d.items())
    return '{' + items + '}'


def _generate_javascript_code(test_cases: List[Dict], sut_url: str) -> str:
    lines = [
        '/**',
        ' * Auto-generated test cases from symbolic execution trajectories',
        f' * Generated by KIMVIEware Phase 4 Executor — {len(test_cases)} test cases',
        ' */',
        '',
        f'const BASE_URL = "{sut_url}";',
        '',
        'describe("Auto-generated API Tests", () => {',
    ]
    for tc in test_cases:
        path_cond = (tc['path_condition'] or '').replace('`', '\\`')[:120]
        lines += [
            '',
            f'    test("{tc["id"]} [{tc["variant"]}] {tc["method"]} {tc["endpoint"]}", async () => {{',
            f'        // Trajectory  : {tc["trajectory_id"]}',
            f'        // Variant     : {tc["variant"]}',
            f'        // Description : {tc["description"]}',
            f'        // Condition   : {path_cond}',
        ]
        lines.append(_request_block_js(tc))
        lines.append('    });')

    lines.append('});')
    return '\n'.join(lines)


def _request_block_java(tc: Dict) -> str:
    method = tc['method'].upper()
    ep     = tc['endpoint']
    inputs = tc['inputs']
    codes  = tc['expected_statuses']
    codes_list = ', '.join(str(c) for c in codes)

    if method in ('POST', 'PUT', 'PATCH'):
        import json as _json
        body_str = _json.dumps(inputs).replace('"', '\\"')
        req = (
            f'        String body = "{body_str}";\n'
            f'        HttpRequest request = HttpRequest.newBuilder()\n'
            f'            .uri(URI.create(BASE_URL + "{ep}"))\n'
            f'            .header("Content-Type", "application/json")\n'
            f'            .{method}(HttpRequest.BodyPublishers.ofString(body))\n'
            f'            .build();\n'
        )
    elif method == 'DELETE':
        req = (
            f'        HttpRequest request = HttpRequest.newBuilder()\n'
            f'            .uri(URI.create(BASE_URL + "{ep}"))\n'
            f'            .DELETE()\n'
            f'            .build();\n'
        )
    else:
        qs = '?' + '&'.join(f'{k}={v}' for k, v in inputs.items()) if inputs else ''
        req = (
            f'        HttpRequest request = HttpRequest.newBuilder()\n'
            f'            .uri(URI.create(BASE_URL + "{ep}{qs}"))\n'
            f'            .GET()\n'
            f'            .build();\n'
        )

    assertion = (
        f'        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());\n'
        f'        assertTrue(java.util.List.of({codes_list}).contains(response.statusCode()),\n'
        f'            "Unexpected status: " + response.statusCode() + " — " + response.body().substring(0, Math.min(200, response.body().length())));\n'
    )
    return req + assertion


def _generate_java_code(test_cases: List[Dict], sut_url: str) -> str:
    lines = [
        '/**',
        ' * Auto-generated test cases from symbolic execution trajectories',
        f' * Generated by KIMVIEware Phase 4 Executor — {len(test_cases)} test cases',
        ' */',
        'import org.junit.jupiter.api.Test;',
        'import java.net.URI;',
        'import java.net.http.HttpClient;',
        'import java.net.http.HttpRequest;',
        'import java.net.http.HttpResponse;',
        'import static org.junit.jupiter.api.Assertions.*;',
        '',
        'public class TestGenerated {',
        f'    private static final String BASE_URL = "{sut_url}";',
        '    private final HttpClient client = HttpClient.newHttpClient();',
    ]
    for i, tc in enumerate(test_cases):
        method_name = _safe_name(tc['id'])[:45]
        path_cond   = (tc['path_condition'] or '').replace('"', '\\"')[:120]
        lines += [
            '',
            '    @Test',
            f'    public void {method_name}_{i}() throws Exception {{',
            f'        // Trajectory  : {tc["trajectory_id"]}',
            f'        // Variant     : {tc["variant"]}',
            f'        // Description : {tc["description"]}',
            f'        // Endpoint    : {tc["method"]} {tc["endpoint"]}',
            f'        // Condition   : {path_cond}',
        ]
        lines.append(_request_block_java(tc))
        lines.append('    }')

    lines.append('}')
    return '\n'.join(lines)


# ─────────────────────────────────────────────
# Public API
# ─────────────────────────────────────────────

class TestGenerator:
    """
    Generate executable tests from symbolic execution trajectories.

    Key behaviours:
    • Generic — no hardcoded endpoint, field, or domain knowledge
    • Expansive — each trajectory yields nominal + boundary + negative cases
    • Verbose — every generated case is printed to the terminal in colour
    """

    def __init__(self, sut_type: str = 'rest_api'):
        self.sut_type = sut_type

    def generate(
        self,
        trajectories: List[Trajectory],
        output_dir: Path,
        sut_url: str = "http://localhost:5000",
        language: str = "python",
    ) -> Tuple[Path, List[Dict]]:
        """
        Generate test file and structured test case list from trajectories.

        Returns:
            (test_file_path, list of test case dicts)
        """
        output_dir.mkdir(parents=True, exist_ok=True)
        language = self._normalize_language(language)
        config   = LANGUAGE_CONFIG.get(language, LANGUAGE_CONFIG['python'])
        test_file = output_dir / config['filename']

        print(f"\n{'='*72}")
        print(f"  🔬 TestGenerator — Phase 4")
        print(f"  Trajectories : {len(trajectories)}")
        print(f"  Language     : {language} ({config['framework']})")
        print(f"  SUT URL      : {sut_url}")
        print(f"{'='*72}")

        # Expand each trajectory into N test cases
        all_test_cases: List[Dict] = []
        for i, traj in enumerate(trajectories):
            cases = _expand_trajectory(traj, i)
            for tc in cases:
                tc['language'] = language
            all_test_cases.extend(cases)

        # Display everything in the terminal
        _print_test_cases(all_test_cases, language)

        # Generate code
        generators = {
            'python':     _generate_python_code,
            'javascript': _generate_javascript_code,
            'java':       _generate_java_code,
            'c':          _generate_python_code,
            'cpp':        _generate_python_code,
        }
        code_fn   = generators.get(language, _generate_python_code)
        test_code = code_fn(all_test_cases, sut_url)
        test_file.write_text(test_code, encoding='utf-8')

        print(f"  📄 Written → {test_file}  ({len(all_test_cases)} test cases)\n")

        return test_file, all_test_cases

    # ── helpers ────────────────────────────────────────────────────────────

    @staticmethod
    def _normalize_language(language: str) -> str:
        lang = (language or 'python').lower()
        aliases = {
            'js': 'javascript', 'typescript': 'javascript', 'ts': 'javascript',
            'c++': 'cpp', 'cxx': 'cpp',
        }
        return aliases.get(lang, lang)