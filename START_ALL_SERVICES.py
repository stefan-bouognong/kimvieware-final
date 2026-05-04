
import subprocess
import time
import os

services = [
    ("Phase 0 (Validator)", "kimvieware-phase0-validator/src/validator_service.py"),
    ("Phase 1 (Extractor)", "kimvieware-phase1-extractor/src/extractor_service.py"),
    ("Phase 2 (SGATS)", "kimvieware-phase2-sgats/src/sgats_service.py"),
    ("Phase 3 (EvoPath)", "kimvieware-phase3-evopath/src/evopath_service.py"),
    ("Phase 4 (Executor)", "kimvieware-phase4-executor/src/executor_service.py")
]

processes = []

print("🚀 Lancement des services KIMVIware...")

for name, path in services:
    log_file = f"log_{name.replace(' ', '_').lower()}.txt"
    print(f"🎬 Démarrage de {name}...")
    try:
        with open(log_file, "w") as f:
            p = subprocess.Popen(["python3", path], stdout=f, stderr=f)
            processes.append((name, p, log_file))
        time.sleep(2) # Attente entre les lancements
    except Exception as e:
        print(f"❌ Erreur lors du lancement de {name}: {e}")

print("\n✅ Tous les services ont été lancés en arrière-plan.")
print("🔍 Vérification du statut dans 5 secondes...")
time.sleep(5)

for name, p, log in processes:
    if p.poll() is None:
        print(f"   🟢 {name} : EN COURS")
    else:
        print(f"   🔴 {name} : ARRÊTÉ (Vérifiez {log})")

print("\n💡 Pour arrêter tous les services, utilisez : pkill -f _service.py")
