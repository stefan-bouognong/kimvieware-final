"""
Phase 4: Test Executor Service

Consumes: optimization.completed
Produces: execution.completed
"""
import sys
from pathlib import Path
import tempfile
from datetime import datetime, timezone

sys.path.insert(0, str(Path(__file__).parent.parent.parent / 'kimvieware-shared' / 'src'))

from kimvieware_shared import MicroserviceBase, JobStatus, Trajectory
from kimvieware_shared.utils.rabbitmq import declare_queue, publish_message
from generators.test_generator import TestGenerator
from executors.test_executor import TestExecutor
from executors.mutation_tester import MutationTester

class ExecutorService(MicroserviceBase):
    """Phase 4: Test Execution and Mutation Testing"""
    
    def __init__(self):
        super().__init__(
            service_name="Phase4_Executor",
            input_queue="exec.job",
            output_queue="execution.completed"
        )
        
        self.test_generator = TestGenerator()
        self.test_executor = TestExecutor()
        self.mutation_tester = MutationTester()
    
    def process_message(self, message: dict) -> dict:
        """Execute tests and perform mutation analysis"""
        
        job_id = message['job_id']
        
        # Only process optimized jobs
        if message.get('status') != 'optimized':
            self.logger.warning(f"[{job_id}] Skipping: not optimized")
            return message
        
        trajectories_data = message.get('trajectories', [])
        sut_info = message['sut_info']
        # Extract port from metadata or default to 8000
        sut_port = message.get('metadata', {}).get('port', 8000)
        sut_url = f"http://localhost:{sut_port}"
        
        if not trajectories_data:
            return self._error(job_id, "No trajectories to execute")
        
        self.logger.info(f"[{job_id}] Phase 4: Executing {len(trajectories_data)} trajectories on {sut_url}")
        
        # DEBUG LOG
        self.logger.info(f"[{job_id}] DEBUG: extracted_path in message: {message.get('extracted_path')}")
        self.logger.info(f"[{job_id}] DEBUG: extracted_path in sut_info: {sut_info.get('extracted_path')}")
        
        # Reconstruct Trajectory objects
        trajectories = [Trajectory.from_dict(t) for t in trajectories_data]
        test_count = len(trajectories)
        
        # Step 1: Generate tests
        with tempfile.TemporaryDirectory() as tmpdir:
            output_dir = Path(tmpdir)
            
            try:
                # Pass the custom SUT URL to the generator
                test_file = self.test_generator.generate(trajectories, output_dir)
                
                # Capture generated code for dashboard
                generated_test_code = test_file.read_text()[:2000] # Limit size
                
                # Step 2: Execute tests
                exec_stats = self.test_executor.execute(test_file, sut_url=sut_url, test_count=test_count)
                
                # Step 3: Mutation testing
                # Use the real extracted_path from earlier phases
                extracted_path = message.get('extracted_path') or sut_info.get('extracted_path')
                
                if extracted_path:
                    sut_path = Path(extracted_path)
                    mutation_stats = self.mutation_tester.run_mutation_testing(
                        sut_path=sut_path,
                        test_file=test_file
                    )
                else:
                    self.logger.warning(f"[{job_id}] No extracted_path found. Skipping mutation testing.")
                    mutation_stats = {
                        'total_mutants': 0, 'killed': 0, 'survived': 0, 
                        'mutation_score': 0, 'quality': 'Unknown',
                        'error': 'SUT path missing'
                    }
                
            except Exception as e:
                self.logger.error(f"[{job_id}] Execution failed: {str(e)}")
                return self._error(job_id, str(e))
        
        self.logger.info(
            f"[{job_id}] ✅ Execution: {exec_stats['passed']}/{exec_stats['total']} passed, "
            f"Mutation: {mutation_stats['mutation_score']:.1f}%"
        )

        # --- FEEDBACK LOOP TO PHASE 3 ---
        try:
            feedback_msg = {
                'job_id': job_id,
                'mutation_score': mutation_stats['mutation_score'],
                'execution_stats': exec_stats,
                'timestamp': datetime.now(timezone.utc).isoformat()
            }
            declare_queue(self.channel, 'ga.feedback')
            publish_message(self.channel, 'ga.feedback', feedback_msg)
            self.logger.info(f"[{job_id}] 🔄 Feedback sent to Phase 3 (ga.feedback)")
        except Exception as e:
            self.logger.error(f"[{job_id}] Failed to send feedback: {e}")
        
        # Return result - KEEP ALL DATA FROM PREVIOUS PHASES
        return {
            'job_id': job_id,
            'status': JobStatus.COMPLETED.value,
            'sut_info': sut_info,
            'extracted_path': message.get('extracted_path'),
            # IMPORTANT: Keep ALL previous phase data for dashboard
            'extraction_count': message.get('extraction_count'),
            'original_trajectories': message.get('original_trajectories'),
            'sgats_stats': message.get('sgats_stats'),
            'evopath_stats': message.get('evopath_stats'),
            'execution_stats': exec_stats,
            'mutation_stats': mutation_stats,
            'generated_test_code': generated_test_code,
            'trajectories_count': len(trajectories),
            'trajectories': [t.to_dict() for t in trajectories],
            'metadata': {
                'phase': 'execution',
                'test_count': len(trajectories)
            }
        }
    
    def _error(self, job_id: str, msg: str) -> dict:
        return {
            'job_id': job_id,
            'status': JobStatus.FAILED.value,
            'error': msg,
            'phase': 'execution'
        }

if __name__ == "__main__":
    service = ExecutorService()
    service.start()

