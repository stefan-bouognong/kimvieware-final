"""
BaseExtractor — Abstract base class for language-specific extractors
=====================================================================

Implements the Bridge pattern from the thesis (Section 1.3.2).
Defines the interface that all language-specific extractors must implement.
"""

from abc import ABC, abstractmethod
from pathlib import Path
from typing import List, Optional

from kimvieware_shared.models import Trajectory


class ExtractorBase(ABC):
    """
    Abstract base class for all extractors (Python, C, Java, etc.).
    
    Each concrete extractor implements:
      - extract_paths(): Main entry point for extraction
      - find_entry_point(): Locate the microservice's main entry point
    """

    @abstractmethod
    def extract_paths(self, service_path: Path) -> List[Trajectory]:
        """
        Extract all feasible trajectories from a microservice.
        
        Args:
            service_path: Root directory of the service under test (SUT)
            
        Returns:
            List of Trajectory objects representing feasible execution paths
        """
        pass

    @abstractmethod
    def find_entry_point(self, service_path: Path) -> Optional[Path]:
        """
        Find the main entry point of the microservice.
        
        Args:
            service_path: Root directory of the service under test (SUT)
            
        Returns:
            Path to the entry point file, or None if not found
        """
        pass
