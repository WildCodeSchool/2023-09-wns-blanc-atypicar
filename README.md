# Atypicar

🚗 _plus qu'un projet, une expérience !_ 🚗

## Objectif du projet

Nous cherchons à créer une plateforme permettant aux automobilistes de partager des trajets en covoiturage en mettant en avant la spécificité de leur véhicule, offrant ainsi une expérience unique aux passagers en quête d'aventures insolites. De même, elle offre la possibilité à ceux qui cherchent une expérience atypique de se déplacer d'un point A à un point B à une date précise à travers des trajets singuliers.

## Fonctionnalités principales

- **Création de trajets** : Les conducteurs peuvent créer des trajets en spécifiant les détails du départ, de l'arrivée, de la date, du prix et des spécificités du véhicule.
- **Recherche de trajets** : Les utilisateurs peuvent rechercher des trajets en fonction de leur point de départ, de leur destination, de la date et des caractéristiques spécifiques du véhicule.
- **Réservation de places** : Les passagers peuvent réserver des places pour des trajets spécifiques.
- **Gestion des utilisateurs** : Les utilisateurs peuvent s'inscrire, se connecter et gérer leur profil.

## Installation et lancement

1. Cloner le répertoire du projet
2. Créez un fichier .env à la racine du projet et ajoutez les configurations nécessaires :

```
PGDATA=***
POSTGRES_HOST=***
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database
JWT_SECRET_KEY=your_jwt_secret_key
```

3. Lancer le projet avec Docker :`docker-compose up --build`
4. L'application sera accessible à l'adresse suivante : http://localhost:3000.
