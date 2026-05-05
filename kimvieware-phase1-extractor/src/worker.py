"""
Phase 1 Worker - Path Extraction (refactored with Strategy)
"""
import pika
import json
import logging
from pathlib import Path
from datetime import datetime, timezone

from kimvieware_shared import MicroserviceBase, JobStatus, Trajectory
from extractors.extraction_strategy import registry as extractor_registry  # <- stratégie

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - Phase1 - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# RabbitMQ Configuration (inchangée)
RABBITMQ_HOST = "localhost"
RABBITMQ_USER = "admin"
RABBITMQ_PASS = "kimvie2025"


def get_rabbitmq_connection():
    credentials = pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASS)
    return pika.BlockingConnection(
        pika.ConnectionParameters(host=RABBITMQ_HOST, credentials=credentials)
    )


def send_to_queue(queue_name: str, message: dict):
    connection = get_rabbitmq_connection()
    channel = connection.channel()
    channel.queue_declare(queue=queue_name, durable=True)
    channel.basic_publish(
        exchange='',
        routing_key=queue_name,
        body=json.dumps(message),
        properties=pika.BasicProperties(delivery_mode=2)
    )
    connection.close()
    logger.info(f"📤 Sent to {queue_name}")


def process_job(message: dict):
    job_id = message['job_id']
    sut_path = Path(message['sut_path'])
    sut_info = message.get('sut_info', {})
    language = sut_info.get('language', 'unknown')

    logger.info(f"📦 Processing job {job_id[:8]}... (Language: {language})")

    # ========== STRATEGY ==========
    strategy = extractor_registry.get(language)
    if strategy is None:
        raise ValueError(f"Unsupported language: {language}")

    logger.info(f"Using {strategy.get_language()} extractor")
    trajectories = strategy.extract_paths(sut_path, max_paths=100)

    logger.info(f"✅ Extracted {len(trajectories)} trajectories")

    result = {
        'job_id': job_id,
        'status': JobStatus.EXTRACTED.value,
        'sut_info': sut_info,
        'trajectories': [
            {
                'path_id': t.path_id,
                'basic_blocks': t.basic_blocks,
                'path_condition': t.path_condition,
                'branches_covered': list(t.branches_covered),
                'constraints': t.constraints,
                'cost': t.cost,
                'is_feasible': t.is_feasible
            }
            for t in trajectories
        ],
        'metadata': {
            'language': language,
            'extractor': strategy.get_language(),
            'trajectories_count': len(trajectories),
            'timestamp': datetime.now(timezone.utc).isoformat()
        }
    }

    send_to_queue('extraction.completed', result)
    logger.info(f"✅ Job {job_id[:8]} completed - sent to Phase 2")


def callback(ch, method, properties, body):
    try:
        message = json.loads(body)
        logger.info(f"📥 Received job: {message['job_id'][:8]}")
        process_job(message)
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        logger.error(f"❌ Error in callback: {e}")
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)


def main():
    logger.info("=" * 60)
    logger.info("🚀 Phase 1 Worker - Path Extraction (Strategy Pattern)")
    logger.info("=" * 60)

    connection = get_rabbitmq_connection()
    channel = connection.channel()
    channel.queue_declare(queue='validation.completed', durable=True)
    channel.queue_declare(queue='extraction.completed', durable=True)
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='validation.completed', on_message_callback=callback)

    logger.info("✅ Worker ready - waiting for jobs...")
    try:
        channel.start_consuming()
    except KeyboardInterrupt:
        logger.info("\n⏸️  Worker stopped")
        channel.stop_consuming()
    connection.close()


if __name__ == "__main__":
    main()