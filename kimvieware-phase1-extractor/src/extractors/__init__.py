"""
Extractors package — Language-specific path extraction implementations.

Implements the Bridge pattern (Section 1.3.2 of thesis):
  - ExtractorBase: Abstract interface
  - PythonExtractor: Python implementation
  - CExtractor: C/C++ implementation  
  - JavaExtractor: Java implementation
"""

from .base_extractor import ExtractorBase
from .python_extractor import PythonExtractor
from .c_extractor import CExtractor
from .java_extractor import JavaExtractor
from .js_extractor import JSExtractor

__all__ = [
    "ExtractorBase",
    "PythonExtractor",
    "CExtractor",
    "JavaExtractor",
    "JSExtractor",
]
