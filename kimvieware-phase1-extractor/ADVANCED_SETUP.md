# Configuration Avancée : KLEE et JBSE

## État actuel

✅ **Phase 1 Extractor** fonctionne en mode **Fallback Gracieux** :

- **Python (PythonExtractor)** : ✅ Opérationnel (AST + Z3 SMT Solver)
- **C/C++ (CExtractor)** : ✅ Opérationnel en fallback (libclang + Z3)
  - Mode primaire KLEE : ⚠️  Non installé
  - Mode fallback : ✅ libclang (analyse AST) + Z3 (vérification SAT)
- **Java (JavaExtractor)** : ✅ Opérationnel en fallback (javalang + Z3)
  - Mode primaire JBSE : ⚠️  Non configuré
  - Mode fallback : ✅ javalang (analyse AST) + Z3 (vérification SAT)

## Installation optionnelle : KLEE

KLEE offre une exploration **symbolique plus profonde** pour le C/C++.

### Option 1 : Compilation depuis les sources (Recommandé)

```bash
# 1. Cloner le repo KLEE
git clone https://github.com/klee/klee.git
cd klee
git checkout v3.0.0

# 2. Installer les dépendances
sudo apt-get install -y build-essential cmake llvm-18-dev clang-18 libcap-dev

# 3. Compiler KLEE
mkdir build && cd build
cmake -DLLVM_CONFIG_BINARY=/usr/bin/llvm-config-18 ..
make -j$(nproc)

# 4. Installer
sudo make install

# 5. Vérifier l'installation
klee --version
```

### Option 2 : Docker (Plus simple)

```bash
docker pull klee/klee:latest
docker run -v $(pwd):/workspace klee/klee:latest klee /workspace/file.bc
```

## Installation optionnelle : JBSE

JBSE offre une exploration **symbolique pour Java** (bytecode).

### Option 1 : Installation manuelle

```bash
# 1. Télécharger JBSE
cd /opt
sudo git clone https://github.com/pietrobraione/jbse.git
cd jbse

# 2. Compiler avec Maven
sudo apt-get install -y maven
sudo mvn clean install

# 3. Configurer la variable d'environnement
echo 'export JBSE_HOME=/opt/jbse' >> ~/.bashrc
source ~/.bashrc

# 4. Vérifier
java -cp $JBSE_HOME/target/jbse-2.0.0.jar jbse.Main --help
```

### Option 2 : Docker

```bash
docker run -v $(pwd):/workspace jbse java -cp /jbse/lib/* jbse.Main --help
```

## Variables d'environnement

```bash
# Pour KLEE
export KLEE_HOME=/path/to/klee/install
export PATH=$KLEE_HOME/bin:$PATH

# Pour JBSE
export JBSE_HOME=/opt/jbse
export PATH=$JBSE_HOME/bin:$PATH

# Pour le Phase1 Extractor
export PATH=$KLEE_HOME/bin:$JBSE_HOME/bin:$PATH
```

## Vérification

```bash
cd /home/davie/KIMVIWARE/kimvieware-phase1-extractor

# Test libclang (C fallback)
PYTHONPATH=src /home/davie/KIMVIWARE/venv_kimvieware/bin/python -c "
import clang.cindex
print('✅ libclang OK')
"

# Test javalang (Java fallback)  
/home/davie/KIMVIWARE/venv_kimvieware/bin/python -c "
import javalang
print('✅ javalang OK')
"

# Test Z3 (SMT Solver)
/home/davie/KIMVIWARE/venv_kimvieware/bin/python -c "
import z3
print('✅ Z3 version:', z3.get_version())
"

# Test KLEE (optionnel)
which klee && echo "✅ KLEE OK" || echo "⚠️ KLEE non trouvé (fallback disponible)"

# Test JBSE (optionnel)
test -n "$JBSE_HOME" && echo "✅ JBSE_HOME: $JBSE_HOME" || echo "⚠️ JBSE_HOME vide (fallback disponible)"
```

## Performance

| Extracteur | Mode | Vitesse | Précision | Installation |
|-----------|------|---------|-----------|--------------|
| Python | AST + Z3 | Rapide | Très bonne | ✅ Intégré |
| C/C++ | libclang + Z3 | Rapide | Bonne | ✅ Système |
| C/C++ | KLEE + Z3 | Lente | Excellente | ⚠️ Manuel |
| Java | javalang + Z3 | Rapide | Bonne | ✅ Intégré |
| Java | JBSE + Z3 | Moyenne | Excellente | ⚠️ Manuel |

## Notes

- Le **fallback libclang + Z3** et **javalang + Z3** sont complètement fonctionnels et recommandés pour la plupart des cas.
- **KLEE** et **JBSE** offrent une **exploration symbolique poussée** pour détecter les chemins infaisables plus précisément, mais sont optionnels.
- Le Phase 1 Extractor **gère la dégradation gracieuse** et continue en fallback mode si KLEE ou JBSE ne sont pas disponibles.

## Support et Dépannage

- **libclang non trouvé** : Vérifier `ls /usr/lib/llvm-18/lib/libclang*.so*`
- **javalang erreur** : Vérifier `javac -version`
- **KLEE compilation** : Consulter https://klee.github.io/getting-started/building-from-source/
- **JBSE erreur** : Consulter https://github.com/pietrobraione/jbse
