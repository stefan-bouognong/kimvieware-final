"""
Mutation Testing
Evaluates test suite quality using language-specific mutation tools.

Supported languages: Python (MutPy), JavaScript (Stryker), Java (PIT), C, C++ (builtin)
"""
from pathlib import Path
from typing import Dict, Optional

from executors.language_runners import get_runner, MUTATION_TOOLS, _quality_label


class MutationTester:
    """
    Multi-language mutation testing orchestrator.

    Mutation Score = (Killed / (Total - Equivalent - Timeout)) × 100%
    Strong mutation = killed mutants (tests detect the fault)
    Weak mutation   = survived mutants (tests miss the fault)
    """

    SUPPORTED_LANGUAGES = ['python', 'javascript', 'java', 'c', 'cpp']

    def __init__(self):
        pass

    def detect_language(self, sut_path: Path, sut_info: dict = None) -> str:
        """Detect programming language from sut_info or source files."""
        if sut_info and sut_info.get('language'):
            lang = sut_info['language'].lower()
            if lang in self.SUPPORTED_LANGUAGES:
                return lang

        extensions = {
            '.py': 'python',
            '.java': 'java',
            '.js': 'javascript',
            '.ts': 'javascript',
            '.c': 'c',
            '.cpp': 'cpp',
            '.cc': 'cpp',
            '.cxx': 'cpp',
        }

        counts = {lang: 0 for lang in self.SUPPORTED_LANGUAGES}
        ignore = {'node_modules', 'venv', '.venv', '__pycache__', 'dist', 'build'}

        for f in sut_path.rglob('*'):
            if not f.is_file() or any(d in f.parts for d in ignore):
                continue
            lang = extensions.get(f.suffix.lower())
            if lang:
                counts[lang] += 1

        if max(counts.values()) == 0:
            return 'python'

        return max(counts, key=counts.get)

    def run_mutation_testing(
        self,
        sut_path: Path,
        test_file: Path,
        sut_info: dict = None,
        job_id: str = None,
        test_cases: list = None,
    ) -> Dict:
        """
        Run mutation testing with the appropriate tool for the detected language.

        Args:
            sut_path: Path to extracted SUT source code
            test_file: Path to generated test file
            sut_info: SUT metadata from Phase 0 (contains language)
            job_id: Job identifier for Stryker executions path

        Returns:
            Mutation testing statistics including strong/weak mutation counts
        """
        language = self.detect_language(sut_path, sut_info)
        tool = MUTATION_TOOLS.get(language, 'builtin')

        print(f"\n🧬 Mutation Testing")
        print(f"{'='*60}")
        print(f"  SUT:       {sut_path}")
        print(f"  Tests:     {test_file}")
        print(f"  Language:  {language}")
        print(f"  Tool:      {tool}")
        print(f"{'='*60}")

        runner = get_runner(language)

        if language == 'javascript':
            stats = runner.run(sut_path, test_file, job_id=job_id, test_cases=test_cases)
        else:
            stats = runner.run(sut_path, test_file, test_cases=test_cases)

        # Ensure all required fields are present
        stats.setdefault('language', language)
        stats.setdefault('tool', tool)
        stats.setdefault('quality', _quality_label(stats.get('mutation_score', 0)))
        stats.setdefault('strong_mutation', stats.get('killed', 0))
        stats.setdefault('weak_mutation', stats.get('survived', 0))
        stats.setdefault('strong_mutation_pct', round(
            (stats.get('killed', 0) / max(1, stats.get('total_mutants', 1))) * 100, 1
        ))
        stats.setdefault('weak_mutation_pct', round(
            (stats.get('survived', 0) / max(1, stats.get('total_mutants', 1))) * 100, 1
        ))

        print(f"\n📊 Mutation Testing Results:")
        print(f"   Total mutants:    {stats['total_mutants']}")
        print(f"   Strong (killed):  {stats['strong_mutation']} ({stats['strong_mutation_pct']}%)")
        print(f"   Weak (survived):  {stats['weak_mutation']} ({stats['weak_mutation_pct']}%)")
        print(f"   Timeout:          {stats.get('timeout', 0)}")
        print(f"   Mutation Score:   {stats['mutation_score']:.1f}%")
        print(f"   Quality:          {stats['quality']}")
        print(f"   Tool:             {stats.get('tool', tool)}")
        print(f"{'='*60}\n")

        return stats
