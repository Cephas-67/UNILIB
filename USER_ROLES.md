# Documentation des Utilisateurs & Accès (e-FRI)

Ce document répertorie les différents types de rôles disponibles sur la plateforme e-FRI, ainsi que les identifiants de test par défaut.

## 👥 Types d'Utilisateurs

| Rôle | Inscription | Accès |
| :--- | :--- | :--- |
| **Étudiant** | Libre, tout email valide | Ressources, cours pratiques, notifications |
| **Responsable** | Code d'invitation requis (généré par l'admin) | Publication de ressources, gestion de cours |
| **Admin** | Compte créé manuellement | Contrôle total, modération, gestion utilisateurs |

---

## 🔑 Identifiants de Test

| Rôle | Email | Mot de passe |
| :--- | :--- | :--- |
| Étudiant | `marcel@gmail.com` | `password123` |
| Responsable | `marie.coord@outlook.com` | `password123` |
| Admin | `admin.ifri@unilib.bj` | `admin` |

---

## 🛠 Créer un compte Responsable (Workflow réel)

1. **L'admin** se connecte → va dans **Administration → onglet "Codes Responsable"**
2. Clique sur **"Générer un code"** → un code unique type `RESP-XXXX1234` est créé
3. L'admin **copie le code** (bouton copier) et l'envoie au futur responsable (email, message, etc.)
4. **Le responsable** va sur `/e-fri/inscription`, sélectionne **"Responsable"**, entre le code, et complète l'inscription
5. Le code est automatiquement **marqué "Utilisé"** et ne peut plus être réutilisé
6. L'admin peut voir l'historique de tous les codes (disponibles / utilisés)

---

## 🔐 Récupération & Google Sign-In

- **Mot de passe oublié** : Accessible via `/e-fri/mot-de-passe-oublie` (lien sur la page de connexion)
- **Connexion Google** : Bouton disponible sur la page de connexion (simulation)
