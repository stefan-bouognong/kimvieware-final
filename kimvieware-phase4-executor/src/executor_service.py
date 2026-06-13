"""
Phase 4: Test Executor Service

Consumes: exec.job (from Phase 3)
Produces: execution.completed

Responsibilities:
  1. Generate concrete test cases from optimized trajectories
  2. Execute tests against the running SUT
  3. Run mutation testing (MutPy/Stryker/PIT/builtin) per language
  4. Report mutation score, strong/weak mutation, and generated test cases
"""
import shutil
import sys
from pathlib import Path
import tempfile
from datetime import datetime, timezone
from typing import Optional

sys.path.insert(0, str(Path(__file__).parent.parent.parent / 'kimvieware-shared' / 'src'))

from kimvieware_shared import MicroserviceBase, JobStatus, Trajectory
from kimvieware_shared.utils.rabbitmq import declare_queue, publish_message
from generators.test_generator import TestGenerator
from executors.test_executor import TestExecutor
from executors.mutation_tester import MutationTester

BASE_DIR = Path(__file__).resolve().parents[2]

# Statuses from Phase 3 that we accept as "ready to process"
PROCESSABLE_STATUSES = {'optimized', 'reduced', 'extracted', 'completed'}


def _normalize_test_cases_for_frontend(test_cases: list) -> list:
    """
    Adapt the generic test_generator output to the shape expected by the frontend.

    Frontend (renderTestCaseList) reads:
      tc.id, tc.scenario, tc.path_condition, tc.constraints,
      tc.inputs  (dict),  tc.expected  (str),  tc.basic_blocks

    test_generator now produces:
      tc.id, tc.variant, tc.endpoint, tc.method,
      tc.inputs  (dict),  tc.expected_statuses  (list[int]),
      tc.path_condition, tc.constraints, tc.basic_blocks
    """
    normalized = []
    for tc in test_cases:
        # Build a human-readable expected string from the list of status codes
        statuses = tc.get('expected_statuses', [])
        if statuses:
            expected_str = 'HTTP [' + ', '.join(str(s) for s in statuses) + ']'
        else:
            expected_str = tc.get('expected', '—')

        # Use variant + method + endpoint as the "scenario" label
        variant  = tc.get('variant', 'nominal')
        method   = tc.get('method', 'GET')
        endpoint = tc.get('endpoint', '/')
        scenario = f"{variant} — {method} {endpoint}"

        normalized.append({
            # ── fields the frontend reads ──────────────────────────────────
            'id':              tc.get('id', tc.get('name', '')),
            'name':            tc.get('name', tc.get('id', '')),
            'scenario':        scenario,
            'path_condition':  tc.get('path_condition', ''),
            'constraints':     tc.get('constraints', []),
            'inputs':          tc.get('inputs', {}),
            'expected':        expected_str,
            'basic_blocks':    tc.get('basic_blocks', []),
            # ── extra fields kept for completeness ─────────────────────────
            'variant':         variant,
            'endpoint':        endpoint,
            'method':          method,
            'expected_statuses': statuses,
            'trajectory_id':   tc.get('trajectory_id', ''),
            'description':     tc.get('description', ''),
            'cost':            tc.get('cost'),
            'fitness':         tc.get('fitness'),
            'language':        tc.get('language', ''),
        })
    return normalized


class ExecutorService(MicroserviceBase):
    """Phase 4: Test Execution and Mutation Testing"""

    def __init__(self):
        super().__init__(
            service_name="Phase4_Executor",
            input_queue="exec.job",
            output_queue="execution.completed"
        )
        self.test_generator = TestGenerator()
        self.test_executor  = TestExecutor()
        self.mutation_tester = MutationTester()

    def _resolve_sut_path(self, message: dict, job_id: str) -> Optional[Path]:
        """Resolve SUT source path from pipeline message or stryker_executions."""
        candidates = [
            message.get('extracted_path'),
            message.get('sut_info', {}).get('extracted_path'),
        ]
        for c in candidates:
            if c and Path(c).exists():
                return Path(c)

        stryker_path = BASE_DIR.parent / 'stryker_executions' / job_id
        if stryker_path.exists():
            return stryker_path

        uploads = BASE_DIR.parent / 'kimvieware-orchestrator' / 'uploads'
        if uploads.exists():
            for f in uploads.glob(f'{job_id}_*'):
                return f.parent

        return None

    def _persist_test_artifacts(self, job_id: str, test_file: Path, test_code: str) -> Path:
        """Save generated tests to stryker_executions/{job_id} for mutation tools."""
        dest_dir = BASE_DIR.parent / 'stryker_executions' / job_id
        dest_dir.mkdir(parents=True, exist_ok=True)
        dest_file = dest_dir / test_file.name
        dest_file.write_text(test_code)
        return dest_dir

    def process_message(self, message: dict) -> dict:
        job_id = message['job_id']
        status = (message.get('status') or '').lower()

        # ── Guard: only process messages from earlier phases ─────────────
        if status not in PROCESSABLE_STATUSES:
            self.logger.warning(
                f"[{job_id}] Skipping: status '{status}' not in {PROCESSABLE_STATUSES}"
            )
            return message

        trajectories_data = message.get('trajectories', [])
        sut_info  = message.get('sut_info', {})
        sut_port  = message.get('metadata', {}).get('port', 8000)
        sut_url   = f"http://localhost:{sut_port}"
        language  = sut_info.get('language', 'python')

        if not trajectories_data:
            return self._error(job_id, "No trajectories to execute")

        self.logger.info(
            f"[{job_id}] Phase 4: {len(trajectories_data)} trajectories "
            f"({language}) → {sut_url}"
        )

        trajectories = [Trajectory.from_dict(t) for t in trajectories_data]

        with tempfile.TemporaryDirectory() as tmpdir:
            output_dir = Path(tmpdir)

            try:
                # ── Step 1: Generate tests ────────────────────────────────
                test_file, raw_test_cases = self.test_generator.generate(
                    trajectories,
                    output_dir,
                    sut_url=sut_url,
                    language=language,
                )
                generated_test_code = test_file.read_text()

                # ── Normalize for frontend display ────────────────────────
                test_cases = _normalize_test_cases_for_frontend(raw_test_cases)

                # ── Step 2: Persist & execute ─────────────────────────────
                work_dir       = self._persist_test_artifacts(job_id, test_file, generated_test_code)
                work_test_file = work_dir / test_file.name

                exec_stats = self.test_executor.execute(
                    work_test_file,
                    sut_url=sut_url,
                    test_count=len(raw_test_cases),
                    language=language,
                )

                # ── Step 3: Mutation testing ──────────────────────────────
                sut_path = self._resolve_sut_path(message, job_id)

                if sut_path:
                    mutation_stats = self.mutation_tester.run_mutation_testing(
                        sut_path=sut_path,
                        test_file=work_test_file,
                        sut_info=sut_info,
                        job_id=job_id,
                        test_cases=raw_test_cases,
                    )
                else:
                    self.logger.warning(f"[{job_id}] No SUT path found. Skipping mutation testing.")
                    mutation_stats = {
                        'total_mutants': 0, 'killed': 0, 'survived': 0,
                        'strong_mutation': 0, 'weak_mutation': 0,
                        'strong_mutation_pct': 0, 'weak_mutation_pct': 0,
                        'mutation_score': 0, 'quality': 'Unknown',
                        'tool': 'none', 'language': language,
                        'error': 'SUT path missing',
                    }

            except Exception as e:
                self.logger.error(f"[{job_id}] Execution failed: {str(e)}", exc_info=True)
                return self._error(job_id, str(e))

        # ── Log summary ───────────────────────────────────────────────────
        self.logger.info(
            f"[{job_id}] ✅ Tests: {exec_stats['passed']}/{exec_stats['total']} passed | "
            f"Mutation: {mutation_stats['mutation_score']:.1f}% "
            f"(strong={mutation_stats.get('strong_mutation', 0)}, "
            f"weak={mutation_stats.get('weak_mutation', 0)}, "
            f"tool={mutation_stats.get('tool', '?')})"
        )

        # ── Send feedback to Phase 3 ──────────────────────────────────────
        try:
            feedback_msg = {
                'job_id': job_id,
                'mutation_score': mutation_stats['mutation_score'],
                'execution_stats': exec_stats,
                'timestamp': datetime.now(timezone.utc).isoformat(),
            }
            declare_queue(self.channel, 'ga.feedback')
            publish_message(self.channel, 'ga.feedback', feedback_msg)
            self.logger.info(f"[{job_id}] Feedback sent to Phase 3 (ga.feedback)")
        except Exception as e:
            self.logger.error(f"[{job_id}] Failed to send feedback: {e}")

        # ── Build output message ──────────────────────────────────────────
        return {
            'job_id':     job_id,
            'status':     JobStatus.COMPLETED.value,   # ← always 'completed' here
            'sut_info':   sut_info,

            # Provenance chain
            'extracted_path':         message.get('extracted_path'),
            'extraction_count':       message.get('extraction_count'),
            'original_trajectories':  message.get('original_trajectories'),
            'phase1_trajectories':    message.get('phase1_trajectories') or message.get('original_trajectories'),
            'phase2_trajectories':    message.get('phase2_trajectories'),
            'phase3_trajectories':    message.get('phase3_trajectories') or trajectories_data,
            'phase4_trajectories':    [t.to_dict() for t in trajectories],
            'trajectories':           [t.to_dict() for t in trajectories],
            'trajectories_count':     len(trajectories),

            # Optimiser stats (pass-through)
            'sgats_stats':   message.get('sgats_stats'),
            'evopath_stats': message.get('evopath_stats'),

            # Phase 4 results
            'execution_stats':     exec_stats,
            'mutation_stats':      mutation_stats,
            'generated_test_code': generated_test_code,

            # test_cases: normalized for frontend + full raw list
            'test_cases':     test_cases,       # frontend-compatible
            'raw_test_cases': raw_test_cases,   # full generic format (for debugging)

            'metadata': {
                'phase':         'execution',
                'test_count':    len(test_cases),
                'language':      language,
                'mutation_tool': mutation_stats.get('tool', 'unknown'),
            },
        }

    def _error(self, job_id: str, msg: str) -> dict:
        return {
            'job_id': job_id,
            'status': JobStatus.FAILED.value,
            'error':  msg,
            'phase':  'execution',
        }


if __name__ == "__main__":
    service = ExecutorService()
    service.start()