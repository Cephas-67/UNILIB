# 📚 UNILIB — Bibliothèque Académique e-FRI

Plateforme centralisée de ressources académiques pour les étudiants et enseignants de l'IFRI (Institut de Formation et de Recherche en Informatique — UAC).

## 🗂 Table des matières

1. [Présentation](#présentation)
2. [Stack Technique](#stack-technique)
3. [Installation & Démarrage](#installation--démarrage)
4. [Build & Production](#build--production)
5. [Structure du Projet](#structure-du-projet)
6. [Fonctionnalités](#fonctionnalités)
7. [Rôles & Accès](#rôles--accès)
8. [Identifiants de Test](#identifiants-de-test)
9. [Se connecter / S'inscrire](#se-connecter--sinscrire)
10. [Créer un compte Responsable](#créer-un-compte-responsable)
11. [Notes de développement](#notes-de-développement)

## Présentation

**UNILIB / e-FRI** est une application web monopage (SPA) permettant à la communauté de l'IFRI :

- d'accéder à des ressources académiques (cours, TDs, TPs, examens, projets) filtrées par filière et type ;
- de soumettre et modérer des ressources pédagogiques ;
- de consulter un emploi du temps interactif ;
- de dialoguer avec un assistant IA intégré ;
- de gérer les utilisateurs et les codes d'accès (espace admin).

**Mode actuel :** La plateforme fonctionne en **mode hors-ligne / démo** — toutes les données sont stockées dans le `localStorage` du navigateur. Aucune base de données distante n'est requise pour tester.

## Stack Technique

| Couche          | Technologie              |
| --------------- | ------------------------ |
| Framework UI    | React 18 + TypeScript    |
| Build           | Vite 5                   |
| Routage         | React Router DOM 6       |
| UI Components   | shadcn/ui (Radix UI)     |
| Style           | Tailwind CSS 3           |
| State / Session | `localStorage` + hooks   |
| Formulaires     | React Hook Form + Zod    |
| Requêtes        | TanStack Query           |
| Tests           | Vitest + Testing Library |

## Installation & Démarrage

### Prérequis

- **Node.js** ≥ 18 ([télécharger](https://nodejs.org/))
- **npm** ≥ 9 (inclus avec Node.js)

### Étapes

# 1. Cloner le dépôt

git clone <URL_DU_REPO>
cd UNILIB

# 2. Installer les dépendances

npm install

# 3. Lancer le serveur de développement

npm run dev

L'application sera accessible sur **http://localhost:8080** (ou le port affiché dans le terminal).

### Autres commandes utiles

# Vérifier les types TypeScript

npx tsc --noEmit

# Analyser le code (ESLint)

npm run lint

# Lancer les tests unitaires

npm test

# Lancer les tests en mode watch

npm run test:watch

## Build & Production

# Générer le bundle de production (dossier /dist)

npm run build

# Prévisualiser le build en local

npm run preview

## Structure du Projet

UNILIB/
├── public/ # Assets statiques publics
├── src/
│ ├── assets/ # Images, logos, photos
│ ├── components/ # Composants réutilisables (UI, landing, layout)
│ ├── data/ # Données fictives (mockData.ts)
│ ├── hooks/ # Hooks custom (useSession, useUserStats, etc.)
│ ├── layouts/ # DashboardLayout (sidebar, header, notifications)
│ ├── pages/ # Pages principales (EFriLanding, EFriSignup, etc.)
│ └── App.tsx # Routeur principal
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── USER_ROLES.md # Ce fichier

## Fonctionnalités

| Module                 | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| 🏠 **Landing**         | Présentation de la plateforme, accès connexion/inscription    |
| 📂 **Ressources**      | Téléchargement, filtrage par filière et type, favoris         |
| 🗂 **Cours Pratiques** | Projets pratiques avec suivi de progression                   |
| 📅 **Emploi du Temps** | Calendrier hebdomadaire interactif                            |
| 🤖 **IA Assistant**    | Chat IA pour aide aux révisions                               |
| ⬆️ **Téléversement**   | Soumission de nouvelles ressources (responsable/admin)        |
| 👤 **Profil**          | Gestion des informations, statistiques, préférences, sécurité |
| 🔔 **Notifications**   | Suivi en temps réel, marquage lu au clic                      |
| 🛡 **Administration**  | Gestion des utilisateurs, ressources, codes responsable       |

## Rôles & Accès

| Rôle            | Inscription                                   | Accès                                                            |
| --------------- | --------------------------------------------- | ---------------------------------------------------------------- |
| **Étudiant**    | Libre, tout email valide                      | Ressources, cours pratiques, emploi du temps, IA, profil         |
| **Responsable** | Code d'invitation requis (fourni par l'admin) | Tout + publication et gestion de ressources                      |
| **Admin**       | Compte créé manuellement                      | Contrôle total : modération, gestion utilisateurs, codes d'accès |

## Identifiants de Test

Ces comptes sont pré-enregistrés dans `src/data/mockData.ts` et fonctionnent immédiatement sans configuration.

| Rôle           | Email                     | Mot de passe  |
| -------------- | ------------------------- | ------------- |
| 🎓 Étudiant    | `marcel@gmail.com`        | `password123` |
| 🧑‍🏫 Responsable | `marie.coord@outlook.com` | `password123` |
| 🛡 Admin       | `admin.ifri@unilib.bj`    | `admin`       |

## Se connecter / S'inscrire

### Connexion

1. Accéder à `/e-fri` (page d'accueil e-FRI)
2. Cliquer sur **"Se connecter"**
3. Saisir l'**email** et le **mot de passe**
4. Cliquer sur **"Se connecter"** → redirection vers le tableau de bord

💡 **Mot de passe oublié ?** Cliquer sur le lien _"Mot de passe oublié"_ sur la page de connexion → `/e-fri/mot-de-passe-oublie`

🔵 **Connexion Google** : un bouton de connexion Google est également disponible sur la page de connexion (simulation).

### Inscription — Étudiant

1. Accéder à `/e-fri/inscription`
2. Sélectionner le rôle **"Étudiant"**
3. Remplir : **Nom**, **Prénom**, **Email**, **Filière**, **Mot de passe**
4. Accepter les CGU
5. Cliquer sur **"Créer mon compte"**

### Inscription — Responsable

1. Récupérer un **code d'invitation** valide auprès de l'administrateur (format `RESP-XXXX1234`)
2. Accéder à `/e-fri/inscription`
3. Sélectionner le rôle **"Responsable"**
4. Saisir le code d'invitation dans le champ dédié
5. Remplir les autres champs et valider

## Créer un compte Responsable (Workflow Admin)

1. Se connecter avec le compte **Admin** → aller dans **Administration → onglet "Codes Responsable"**
2. Cliquer sur **"Générer un code"** → un code unique `RESP-XXXX1234` est créé
3. **Copier et transmettre** le code au futur responsable (email, message, etc.)
4. Le responsable s'inscrit via `/e-fri/inscription` avec ce code
5. Le code est automatiquement marqué **"Utilisé"** et ne peut plus être réutilisé
6. L'admin peut consulter l'historique complet des codes (disponibles / utilisés)

## Notes de développement

- **Stockage :** toutes les données utilisateur, ressources, notifications et statistiques sont persistées dans le `localStorage` du navigateur. Aucune API externe n'est nécessaire.
- **Mode sombre :** disponible via le bouton ☀️/🌙 sur la page de profil (enregistré dans `localStorage`, clé `theme`).
- **Filières disponibles :** Genie Logiciel · Intelligence Artificielle · Securite Informatique · SEiot · Internet Multimedia
- **Types de ressources :** Cours · TD · TP · Examen · Correction · Projet

_Développé dans le cadre du Hackathon IFRI 2026 · © IFRI-UAC · Tous droits réservés_
