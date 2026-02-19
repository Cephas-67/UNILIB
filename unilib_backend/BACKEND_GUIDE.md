# Guide Technique : Backend Django UniLib 🚀

Ce document explique le fonctionnement, la structure et la base de données du backend de l'application UniLib Portal.

## 📌 Présentation Globale
Le backend est construit avec **Python 3** et le framework **Django**. Il utilise **Django REST Framework (DRF)** pour fournir une API et **SimpleJWT** pour l'authentification.

---

## 🏗️ Architecture du Projet

Le dossier `unilib_backend/` est structuré comme suit :

### 1. Dossier `backend_project/`
C'est le dossier de configuration principale.
- `settings.py` : Contient toute la configuration (Apps, Middleware, JWT, CORS, et Base de données).
- `urls.py` : Définit les routes de base.

### 2. Dossier `authentication/`
Gère les comptes utilisateurs et les profils.
- `models.py` : Contient le modèle `User` (voir section base de données).
- `serializers.py` : Prépare les données pour être envoyées au Frontend (JSON).
- `views.py` : Logique de traitement des requêtes (Inscription, Connexion, Profil).

---

## 🗄️ Base de Données

### Type de Base de Données
Pour la phase de développement, nous utilisons **SQLite**.
- **Fichier** : `unilib_backend/db.sqlite3`
- **Pourquoi ?** : SQLite est une base de données légère, sans serveur, qui stocke tout dans un seul fichier. C'est idéal pour le développement rapide et le partage de projet.

### Schéma de la Table Utilisateur (`authentication_user`)
Nous utilisons un modèle utilisateur personnalisé qui remplace le modèle par défaut de Django. Voici les colonnes principales :

| Champ | Type | Description |
| :--- | :--- | :--- |
| `username` | String | Identifiant unique (Email ou matricule). |
| `email` | String | Email institutionnel (@ifri.uac.bj). |
| `nom` | String | Nom de famille de l'étudiant. |
| `prenom` | String | Prénom de l'étudiant. |
| `filiere` | String | Branche d'étude (ex: Génie Logiciel). |
| `promotion` | String | Niveau d'étude (L1, L2, L3...). |
| `semestre` | String | Semestre actuel (S1, S2...). |
| `role` | Choice | `etudiant` (défaut) ou `admin`. |
| `avatar` | Image | Photo de profil (stockée dans `media/avatars/`). |

### Migrations
Toute modification du fichier `models.py` doit être récutée sur la base de données via :
1. `python manage.py makemigrations` (Prépare le changement).
2. `python manage.py migrate` (Applique le changement au fichier `.sqlite3`).

---

## 🔐 Accès et Administration

### Django Admin
L'interface d'administration est accessible pour gérer directement les données.
- **URL** : [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
- **Super Utilisateur créés** :
  - **Login** : `admin`
  - **Mot de passe** : `admin123`

### Commandes Utiles
- **Lancer le serveur** : `python manage.py runserver`
- **Créer un nouveau super-admin** : `python manage.py createsuperuser`

---

## ⚙️ Configuration Spéciale (Settings)
- **CORS** : Configuré pour autoriser les requêtes provenant du Frontend (Vite/React).
- **JWT** : Les tokens expirent après 24h pour la sécurité.
- **MEDIA_URL** : Configuré pour servir les avatars téléchargés.

> [!NOTE]
> Pour passer en production (Serveur réel), il suffira de changer la section `DATABASES` dans `settings.py` pour pointer vers **PostgreSQL** ou **MySQL**.
