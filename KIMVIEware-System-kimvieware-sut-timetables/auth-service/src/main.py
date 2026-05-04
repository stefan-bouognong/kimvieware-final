def evaluer_note(score):
    # Chemin 1 : Score très élevé
    if score >= 90:
        print("Mention : Excellent")
    
    # Chemin 2 : Score satisfaisant
    elif score >= 70:
        print("Mention : Bien")
    
    # Chemin 3 : Score minimal
    elif score >= 50:
        print("Mention : Passable")
    
    # Chemin 4 : Score insuffisant (le "else" capture tout le reste)
    else:
        print("Mention : Échec")

# Test des 4 chemins
evaluer_note(95) # Chemin 1
evaluer_note(75) # Chemin 2
evaluer_note(55) # Chemin 3
evaluer_note(30) # Chemin 4
