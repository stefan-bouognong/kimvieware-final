def traiter_activites(liste_pas):
    total_valide = 0
    alertes = 0

    print("Début du traitement des données...")

    for pas in liste_pas:
        # Condition : on ne traite que les données cohérentes
        if pas > 0 and pas < 50000:
            total_valide += pas
            print(f"Enregistré : {pas} pas.")
        else:
            # Autre chemin : gestion des anomalies
            alertes += 1
            print(f"Alerte : Valeur {pas} rejetée (incohérente).")

    print("--- Rapport Final ---")
    print(f"Total des pas valides : {total_valide}")
    print(f"Nombre d'anomalies détectées : {alertes}")

# Simulation de données
donnees_utilisateur = [5000, -100, 12000, 99999, 8000]
traiter_activites(donnees_utilisateur)
