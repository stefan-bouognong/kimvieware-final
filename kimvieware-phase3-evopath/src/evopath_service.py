"""
Phase 3: EvoPath-GA Optimization Service

Consumes: reduce.path AND ga.feedback
Produces: exec.job
"""
import sys
from pathlib import Path
import threading
import json

# Add shared to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent / 'kimvieware-shared' / 'src'))

from kimvieware_shared import MicroserviceBase, JobStatus, Trajectory
from kimvieware_shared.utils.rabbitmq import create_connection, declare_queue
from algorithms.evopath_ga import EvoPathGA

class EvoPathService(MicroserviceBase):
    """Phase 3: Genetic Algorithm Optimization with Feedback"""
    
    def __init__(self):
        super().__init__(
            service_name="Phase3_EvoPath",
            input_queue="reduce.path",
            output_queue="exec.job"
        )
        
        self.evopath = EvoPathGA(
            w_cov=0.4,
            w_div=0.2,
            w_mut=0.3,
            w_cost=0.1,
            population_size=50,
            generations=100
        )
        
        # Start feedback consumer in background
        self.feedback_thread = threading.Thread(target=self._start_feedback_consumer, daemon=True)
    
    def start(self):
        """Start both consumers"""
        self.feedback_thread.start()
        super().start()

    def _start_feedback_consumer(self):
        """Consume feedback from Phase 4 to adjust GA weights"""
        try:
            # Create a separate connection for the background consumer
            conn = create_connection(
                host=self.rabbitmq_host,
                port=self.rabbitmq_port,
                username=self.rabbitmq_user,
                password=self.rabbitmq_pass,
                logger=self.logger
            )
            ch = conn.channel()
            declare_queue(ch, 'ga.feedback')
            
            def callback(ch, method, properties, body):
                try:
                    feedback = json.loads(body.decode())
                    score = feedback.get('mutation_score', 0)
                    self.logger.info(f"🔄 Received feedback: Mutation Score = {score}%")
                    
                    # Adjust GA mutation score bias
                    self.evopath.current_mutation_score = score / 100.0
                    
                    # Dynamic weight adjustment (Self-Adaptive GA)
                    if score < 80:
                        self.logger.info("⚠️ Low mutation score detected. Increasing mutation bias.")
                        self.evopath.w_mut += 0.05
                        self.evopath.w_cov -= 0.05
                    
                    ch.basic_ack(delivery_tag=method.delivery_tag)
                except Exception as e:
                    self.logger.error(f"Error processing feedback: {e}")
            
            ch.basic_consume(queue='ga.feedback', on_message_callback=callback)
            ch.start_consuming()
        except Exception as e:
            self.logger.error(f"Feedback consumer failed: {e}")

    def process_message(self, message: dict) -> dict:
        """Optimize trajectory set using GA"""
        
        job_id = message['job_id']
        
        # Only process reduced jobs
        if message.get('status') != 'reduced':
            self.logger.warning(f"[{job_id}] Skipping: not reduced")
            return message
        
        trajectories_data = message.get('trajectories', [])
        
        if not trajectories_data:
            return self._error(job_id, "No trajectories to optimize")
        
        self.logger.info(f"[{job_id}] EvoPath-GA optimization on {len(trajectories_data)} trajectories")
        
        # Reconstruct Trajectory objects
        trajectories = [Trajectory.from_dict(t) for t in trajectories_data]
        
        # Apply EvoPath-GA
        optimized_set, stats = self.evopath.optimize(trajectories)
        
        self.logger.info(
            f"[{job_id}] ✅ Optimized {stats['original_count']} → {stats['optimized_count']} "
            f"({stats['size_reduction']*100:.1f}% reduction)"
        )
        
        # Return result - KEEP ALL DATA FROM PREVIOUS PHASES
        return {
            'job_id': job_id,
            'status': JobStatus.OPTIMIZED.value,
            'sut_info': message['sut_info'],
            'extracted_path': message.get('extracted_path'),
            'trajectories_count': len(optimized_set),
            'trajectories': [t.to_dict() for t in optimized_set],
            # IMPORTANT: Keep ALL previous phase data for dashboard
            'extraction_count': message.get('extraction_count', message.get('trajectories_count')),
            'original_trajectories': message.get('original_trajectories', message.get('trajectories', [])),
            'sgats_stats': message.get('sgats_stats'),
            'evopath_stats': stats,
            'metadata': {
                'phase': 'evopath_optimization',
                'algorithm': 'genetic_algorithm',
                'mutation_bias': self.evopath.current_mutation_score
            }
        }
    
    def _error(self, job_id: str, msg: str) -> dict:
        return {
            'job_id': job_id,
            'status': JobStatus.FAILED.value,
            'error': msg,
            'phase': 'evopath'
        }

if __name__ == "__main__":
    service = EvoPathService()
    service.start()
