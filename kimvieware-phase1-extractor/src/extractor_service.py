"""
Phase 1: Path Extractor Service (refactored with Strategy)
"""
import sys
from pathlib import Path
import os
from datetime import datetime, timezone

from kimvieware_shared import MicroserviceBase, JobStatus
from extractors.extraction_strategy import registry as extractor_registry  # <- nouvelle import


class ExtractorService(MicroserviceBase):
    def __init__(self):
        super().__init__(
            service_name="Phase1_Extractor",
            input_queue="validation.completed",
            output_queue="extract.path"
        )
        self.max_paths = int(os.getenv('EXTRACTOR_MAX_PATHS', '1000'))
        # Plus besoin de stocker les extracteurs individuellement

    def process_message(self, message: dict) -> dict:
        job_id = message['job_id']

        if message.get('status') != JobStatus.VALIDATED.value:
            return self._error_response(job_id, f"Job not validated. Status: {message.get('status')}")

        sut_info = message['sut_info']
        extracted_path_str = message.get('extracted_path') or sut_info.get('extracted_path')
        if not extracted_path_str:
            return self._error_response(job_id, "Missing extracted_path")
        extracted_path = Path(extracted_path_str)
        language = sut_info['language']

        self.logger.info(f"[{job_id}] Extracting paths from {language} service")
        self.logger.info(f"[{job_id}] Path: {extracted_path}")
        self.logger.info(f"[{job_id}] Entry point: {sut_info.get('entry_point')}")

        # ========== STRATEGY ==========
        strategy = extractor_registry.get(language)
        if strategy is None:
            return self._error_response(job_id, f"Unsupported language: {language}")

        trajectories = strategy.extract_paths(extracted_path, max_paths=self.max_paths)
        self.logger.info(f"[{job_id}]  Extracted {len(trajectories)} trajectories")

        return {
            'job_id': job_id,
            'status': JobStatus.EXTRACTED.value,
            'sut_info': sut_info,
            'extracted_path': str(extracted_path),
            'trajectories_count': len(trajectories),
            'trajectories': [t.to_dict() for t in trajectories],
            'metadata': {
                'language': language,
                'extractor': strategy.get_language(),  # nom de la stratégie
                'trajectories_count': len(trajectories),
                'timestamp': datetime.now(timezone.utc).isoformat()
            }
        }

    def _error_response(self, job_id: str, error: str) -> dict:
        self.logger.warning(f"[{job_id}] {error}")
        return {
            'job_id': job_id,
            'status': JobStatus.FAILED.value,
            'error': error,
            'phase': 'extraction'
        }


if __name__ == "__main__":
    service = ExtractorService()
    service.start()