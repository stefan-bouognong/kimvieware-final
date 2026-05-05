from abc import ABC, abstractmethod
from pathlib import Path
from typing import List, Dict, Optional
from kimvieware_shared import Trajectory


class ExtractionStrategy(ABC):
    """Interface Strategy pour l'extraction de chemins d'exécution"""

    @abstractmethod
    def get_language(self) -> str:
        pass

    @abstractmethod
    def extract_paths(self, source_dir: Path, max_paths: int = 1000) -> List[Trajectory]:
        pass


class PythonExtractionStrategy(ExtractionStrategy):
    def get_language(self) -> str:
        return "python"

    def extract_paths(self, source_dir: Path, max_paths: int = 1000) -> List[Trajectory]:
        from .python_extractor import PythonExtractor
        extractor = PythonExtractor(max_paths=max_paths)
        return extractor.extract_paths(source_dir)


class CppExtractionStrategy(ExtractionStrategy):
    def get_language(self) -> str:
        return "cpp"

    def extract_paths(self, source_dir: Path, max_paths: int = 1000) -> List[Trajectory]:
        from .c_extractor import CExtractor
        extractor = CExtractor(max_paths=max_paths)
        return extractor.extract_paths(source_dir)


class JavaExtractionStrategy(ExtractionStrategy):
    def get_language(self) -> str:
        return "java"

    def extract_paths(self, source_dir: Path, max_paths: int = 1000) -> List[Trajectory]:
        from .java_extractor import JavaExtractor
        extractor = JavaExtractor(max_paths=max_paths)
        return extractor.extract_paths(source_dir)


class JsExtractionStrategy(ExtractionStrategy):
    def get_language(self) -> str:
        return "javascript"

    def extract_paths(self, source_dir: Path, max_paths: int = 1000) -> List[Trajectory]:
        from .js_extractor import JSExtractor
        extractor = JSExtractor(max_paths=max_paths)
        return extractor.extract_paths(source_dir)


class ExtractorRegistry:
    def __init__(self):
        self._strategies: Dict[str, ExtractionStrategy] = {}

    def register(self, strategy: ExtractionStrategy):
        self._strategies[strategy.get_language()] = strategy

    def get(self, language: str) -> Optional[ExtractionStrategy]:
        return self._strategies.get(language.lower())


# Registre global prêt à être utilisé
registry = ExtractorRegistry()
registry.register(PythonExtractionStrategy())
registry.register(CppExtractionStrategy())
registry.register(JavaExtractionStrategy())
registry.register(JsExtractionStrategy())
registry._strategies["js"] = registry._strategies["javascript"]
registry._strategies["typescript"] = registry._strategies["javascript"]
registry._strategies["ts"] = registry._strategies["javascript"]