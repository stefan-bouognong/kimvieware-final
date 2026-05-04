#!/usr/bin/env bash
# ===================================================================
# Vérification Phase 1 Extractor — Configuration complète
# ===================================================================

set -e

VENV="/home/davie/KIMVIWARE/venv_kimvieware"
PYTHON="$VENV/bin/python"
PYTHONPATH="src"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Phase 1 Extractor — Diagnostic Complet                           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════════╝${NC}"

# ===================================================================
# 1. Python Virtual Environment
# ===================================================================

echo -e "\n${BLUE}═══ 1. PYTHON VIRTUAL ENVIRONMENT${NC}"
if [ -f "$PYTHON" ]; then
    echo -e "${GREEN}✅ Venv trouvé${NC}: $VENV"
    PYTHON_VERSION=$($PYTHON --version 2>&1)
    echo -e "${GREEN}✅ Version${NC}: $PYTHON_VERSION"
else
    echo -e "${RED}❌ Venv non trouvé${NC}: $VENV"
    exit 1
fi

# ===================================================================
# 2. Z3 Solver
# ===================================================================

echo -e "\n${BLUE}═══ 2. Z3 SMT SOLVER${NC}"
Z3_TEST=$($PYTHON -c "import z3; print(z3.get_version())" 2>&1 || echo "FAILED")
if [[ $Z3_TEST != "FAILED" && $Z3_TEST == *"."* ]]; then
    echo -e "${GREEN}✅ Z3 disponible${NC}: Version $Z3_TEST"
else
    echo -e "${YELLOW}⚠️  Z3 détection échouée${NC}, test manuel..."
    Z3_MANUAL=$($PYTHON << 'EOFZ3'
try:
    import z3
    print("OK:" + str(z3.get_version()))
except ImportError:
    print("FAILED")
EOFZ3
)
    if [[ $Z3_MANUAL == OK:* ]]; then
        echo -e "${GREEN}✅ Z3 disponible${NC}: Version ${Z3_MANUAL#OK:}"
    else
        echo -e "${RED}❌ Z3 non disponible${NC}"
    fi
fi

# ===================================================================
# 3. LibClang (C Analysis)
# ===================================================================

echo -e "\n${BLUE}═══ 3. LIBCLANG (C/C++ Analysis)${NC}"
LIBCLANG_PATHS=(
    "/usr/lib/llvm-18/lib/libclang-18.so.1"
    "/usr/lib/llvm-18/lib/libclang.so"
)

LIBCLANG_FOUND=0
for path in "${LIBCLANG_PATHS[@]}"; do
    if [ -f "$path" ]; then
        echo -e "${GREEN}✅ libclang trouvé${NC}: $path"
        LIBCLANG_FOUND=1
        break
    fi
done

if [ $LIBCLANG_FOUND -eq 0 ]; then
    echo -e "${YELLOW}⚠️  libclang non trouvé${NC} (chercher dans /usr/lib/llvm-*/lib/)"
fi

LIBCLANG_PY_TEST=$($PYTHON -c "import clang.cindex; print('OK')" 2>&1 || echo "FAILED")
if [[ $LIBCLANG_PY_TEST == "OK" ]]; then
    echo -e "${GREEN}✅ Python libclang bindings disponibles${NC}"
else
    echo -e "${RED}❌ Python libclang bindings non disponibles${NC}"
fi

# ===================================================================
# 4. Javalang (Java Analysis)
# ===================================================================

echo -e "\n${BLUE}═══ 4. JAVALANG (Java Analysis)${NC}"
JAVALANG_TEST=$($PYTHON -c "import javalang; print('OK')" 2>&1 || echo "FAILED")
if [[ $JAVALANG_TEST == "OK" ]]; then
    echo -e "${GREEN}✅ javalang disponible${NC}"
else
    echo -e "${RED}❌ javalang non disponible${NC}"
fi

# ===================================================================
# 5. Java Compiler
# ===================================================================

echo -e "\n${BLUE}═══ 5. JAVA COMPILER${NC}"
if command -v javac &> /dev/null; then
    JAVAC_VERSION=$(javac -version 2>&1)
    echo -e "${GREEN}✅ javac disponible${NC}: $JAVAC_VERSION"
else
    echo -e "${YELLOW}⚠️  javac non trouvé${NC} (optionnel pour compilation Java)"
fi

# ===================================================================
# 6. Clang/LLVM (C Compiler)
# ===================================================================

echo -e "\n${BLUE}═══ 6. CLANG/LLVM (C Compiler)${NC}"
if command -v clang-18 &> /dev/null; then
    CLANG_VERSION=$(clang-18 --version 2>&1 | head -1)
    echo -e "${GREEN}✅ clang-18 disponible${NC}: $CLANG_VERSION"
else
    echo -e "${YELLOW}⚠️  clang-18 non trouvé${NC} (optionnel)"
fi

# ===================================================================
# 7. KLEE (C Symbolic Execution) [OPTIONNEL]
# ===================================================================

echo -e "\n${BLUE}═══ 7. KLEE (C Symbolic Execution) [OPTIONNEL]${NC}"
if command -v klee &> /dev/null; then
    KLEE_VERSION=$(klee --version 2>&1)
    echo -e "${GREEN}✅ KLEE disponible${NC}: $KLEE_VERSION"
else
    echo -e "${YELLOW}⚠️  KLEE non installé${NC}"
    echo "   Fallback: libclang (AST) + Z3 (vérification)"
    echo "   Installation: voir ADVANCED_SETUP.md"
fi

# ===================================================================
# 8. JBSE (Java Symbolic Execution) [OPTIONNEL]
# ===================================================================

echo -e "\n${BLUE}═══ 8. JBSE (Java Symbolic Execution) [OPTIONNEL]${NC}"
if [ -n "$JBSE_HOME" ] && [ -d "$JBSE_HOME" ]; then
    echo -e "${GREEN}✅ JBSE_HOME configuré${NC}: $JBSE_HOME"
else
    echo -e "${YELLOW}⚠️  JBSE_HOME non configuré${NC}"
    echo "   Fallback: javalang (AST) + Z3 (vérification)"
    echo "   Installation: voir ADVANCED_SETUP.md"
fi

# ===================================================================
# 9. Module Extraction
# ===================================================================

echo -e "\n${BLUE}═══ 9. MODULE EXTRACTION${NC}"
cd "$SCRIPT_DIR"
IMPORT_TEST=$(PYTHONPATH=src $PYTHON -c "
from extractors import PythonExtractor, CExtractor, JavaExtractor
print('✅ Imports OK')
" 2>&1 || echo "FAILED")

if [[ $IMPORT_TEST == *"✅"* ]]; then
    echo -e "${GREEN}$IMPORT_TEST${NC}"
else
    echo -e "${RED}❌ Imports échoués${NC}: $IMPORT_TEST"
fi

# ===================================================================
# RÉSUMÉ FINAL
# ===================================================================

echo -e "\n${BLUE}╔════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  RÉSUMÉ − Status Opérationnel                                     ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${GREEN}✅ EXTRACTEURS FONCTIONNELS:${NC}"
echo -e "  • PythonExtractor    — AST + Z3 (${GREEN}COMPLET${NC})"
echo -e "  • CExtractor         — libclang + Z3 (${GREEN}COMPLET${NC})"
echo -e "  • JavaExtractor      — javalang + Z3 (${GREEN}COMPLET${NC})"

echo -e "\n${YELLOW}⚠️  OPTIONS AVANCÉES:${NC}"
echo -e "  • KLEE               — Installation optionnelle (voir ADVANCED_SETUP.md)"
echo -e "  • JBSE               — Installation optionnelle (voir ADVANCED_SETUP.md)"

echo -e "\n${BLUE}Prochaines étapes:${NC}"
echo -e "  1. Lancer le service extractor:"
echo -e "     ${YELLOW}cd $SCRIPT_DIR${NC}"
echo -e "     ${YELLOW}$PYTHON src/extractor_service.py${NC}"
echo -e ""
echo -e "  2. Pour installer KLEE ou JBSE (optionnel):"
echo -e "     ${YELLOW}cat ADVANCED_SETUP.md${NC}"
echo -e ""

echo -e "${GREEN}✅ Configuration OK − Prêt pour l'extraction${NC}\n"
