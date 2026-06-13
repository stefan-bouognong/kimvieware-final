"""
Mutation Operators for multi-language source code mutation testing.

Operators: AOR, ROR, LOR, SDL, CON (as per KIMVIEware spec)
"""
import re
import copy
from dataclasses import dataclass
from typing import List, Tuple


@dataclass
class Mutant:
    mutant_id: str
    operator: str
    file_path: str
    line_number: int
    original: str
    mutated: str
    source: str  # full mutated source


# Arithmetic Operator Replacement
AOR_REPLACEMENTS = [
    ('+', '-'), ('-', '+'), ('*', '/'), ('/', '*'),
    ('+=', '-='), ('-=', '+='), ('*=', '/='),
]

# Relational Operator Replacement
ROR_REPLACEMENTS = [
    ('>=', '<='), ('<=', '>='), ('>', '<'), ('<', '>'),
    ('==', '!='), ('!=', '=='),
    ('>=', '>'), ('<=', '<'),
]

# Logical Operator Replacement
LOR_REPLACEMENTS = [
    (' and ', ' or '), (' or ', ' and '),
    ('&&', '||'), ('||', '&&'),
    ('!', ''),  # delete negation
]

# Constant replacement values
CON_REPLACEMENTS = [
    ('0', '1'), ('1', '0'), ('true', 'false'), ('false', 'true'),
    ('True', 'False'), ('False', 'True'),
    ('null', '""'), ('NULL', '0'),
]


def _apply_replacement(line: str, old: str, new: str) -> Tuple[str, bool]:
    """Apply a single replacement if found outside of strings."""
    if old not in line:
        return line, False
    idx = line.find(old)
    if idx == -1:
        return line, False
    mutated = line[:idx] + new + line[idx + len(old):]
    return mutated, True


def generate_mutants(source: str, file_path: str, max_mutants: int = 50) -> List[Mutant]:
    """
    Generate mutants from source code using standard mutation operators.
    Returns a list of Mutant objects with full mutated source.
    """
    lines = source.splitlines(keepends=True)
    mutants: List[Mutant] = []
    mutant_counter = 0

    operator_sets = [
        ('AOR', AOR_REPLACEMENTS),
        ('ROR', ROR_REPLACEMENTS),
        ('LOR', LOR_REPLACEMENTS),
        ('CON', CON_REPLACEMENTS),
    ]

    for line_idx, line in enumerate(lines):
        stripped = line.strip()
        if not stripped or stripped.startswith('//') or stripped.startswith('#') or stripped.startswith('*'):
            continue
        if stripped.startswith('"""') or stripped.startswith("'''"):
            continue
        # Skip import lines and decorators without conditions
        if stripped.startswith('import ') or stripped.startswith('from '):
            continue

        for op_name, replacements in operator_sets:
            for old, new in replacements:
                # Only apply ROR/LOR/AOR on lines with actual code operators
                if op_name in ('ROR', 'LOR', 'AOR') and old not in line:
                    continue
                if op_name == 'CON' and not any(kw in stripped for kw in ['if ', 'if(', 'return ', '==', '!=']):
                    continue

                mutated_line, applied = _apply_replacement(line, old, new)
                if not applied or mutated_line == line:
                    continue
                # Skip mutations inside string literals (heuristic)
                if op_name == 'AOR' and ('"' in line or "'" in line) and not any(op in stripped for op in [' + ', ' - ', ' * ', ' / ', '+=', '-=']):
                    continue

                new_lines = copy.copy(lines)
                new_lines[line_idx] = mutated_line
                mutant_source = ''.join(new_lines)

                mutant_counter += 1
                mutants.append(Mutant(
                    mutant_id=f"M{mutant_counter:04d}",
                    operator=op_name,
                    file_path=file_path,
                    line_number=line_idx + 1,
                    original=line.strip(),
                    mutated=mutated_line.strip(),
                    source=mutant_source,
                ))

                if len(mutants) >= max_mutants:
                    return mutants

        # SDL: Statement Deletion on branch/return lines only
        if any(kw in stripped for kw in ['if ', 'if(', 'return ', 'raise ', 'throw ']):
            new_lines = copy.copy(lines)
            new_lines[line_idx] = '    // MUTANT-DELETED: ' + line.lstrip()
            mutant_counter += 1
            mutants.append(Mutant(
                mutant_id=f"M{mutant_counter:04d}",
                operator='SDL',
                file_path=file_path,
                line_number=line_idx + 1,
                original=line.strip(),
                mutated='// DELETED',
                source=''.join(new_lines),
            ))
            if len(mutants) >= max_mutants:
                return mutants

    return mutants


def find_source_files(sut_path, language: str, max_files: int = 5) -> List:
    """Find source files to mutate based on language."""
    from pathlib import Path
    sut_path = Path(sut_path)

    extensions = {
        'python': ['.py'],
        'java': ['.java'],
        'javascript': ['.js', '.ts'],
        'c': ['.c', '.h'],
        'cpp': ['.cpp', '.cc', '.cxx', '.hpp', '.c', '.h'],
    }

    exts = extensions.get(language, ['.py', '.java', '.js', '.c', '.cpp'])
    ignore = {'node_modules', 'venv', '.venv', '__pycache__', 'dist', 'build', 'test', 'tests'}

    files = []
    for ext in exts:
        for f in sut_path.rglob(f'*{ext}'):
            if any(d in f.parts for d in ignore):
                continue
            if f.name in ('__init__.py',):
                continue
            files.append(f)
            if len(files) >= max_files:
                return files
    return files
