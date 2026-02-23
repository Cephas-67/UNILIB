export const currentUser = {
  id: "1",
  nom: "AHOUANDJINOU",
  prenom: "Marcel",
  email: "marcel.ahouandjinou@ifri.uac.bj",
  filiere: "Genie Logiciel",
  promotion: "L3",
  semestre: "S2",
  avatar: "",
  role: "etudiant" as const,
  status: "active" as const,
};

export const registeredUsers = [
  {
    email: "marcel@gmail.com",
    password: "password123",
    nom: "AHOUANDJINOU",
    prenom: "Marcel",
    role: "etudiant" as const,
    filiere: "Genie Logiciel",
    promotion: "L3",
    semestre: "S2",
    status: "active" as const,
  },
  {
    email: "marie.coord@outlook.com",
    password: "password123",
    nom: "RESPONSABLE",
    prenom: "Marie",
    role: "responsable" as const,
    filiere: "Genie Logiciel",
    promotion: "L3",
    semestre: "S2",
    status: "active" as const,
  },
  {
    email: "admin.ifri@unilib.bj",
    password: "admin",
    nom: "IFRI",
    prenom: "Admin",
    role: "admin" as const,
    filiere: "Direction",
    promotion: "STAFF",
    semestre: "-",
    status: "active" as const,
  }
];

export const resources = [];

export const projets = [];

export const emploiDuTemps = [];

export const actualites = [
  { id: "1", titre: "Nouveaux sujets d'examen disponibles", description: "Les sujets d'examen du semestre S1 2025-2026 sont maintenant disponibles pour toutes les filières.", date: "2026-02-15", type: "ressource" },
  { id: "2", titre: "Hackathon IFRI 2026", description: "Inscrivez-vous au hackathon annuel de l'IFRI. Thème : Solutions IA pour l'éducation.", date: "2026-02-12", type: "evenement" },
  { id: "3", titre: "Mise à jour de l'emploi du temps", description: "L'emploi du temps du semestre S2 a été mis à jour. Consultez les changements.", date: "2026-02-10", type: "info" },
  { id: "4", titre: "Nouveau cours pratique disponible", description: "Un nouveau cours pratique de niveau avancé sur le Machine Learning est maintenant disponible.", date: "2026-02-08", type: "projet" },
];

export const adminStats = {
  utilisateurs: 1247,
  ressources: 856,
  contributionsEnAttente: 23,
  telechargements: 15890,
};

export const contributionsEnAttente = [
  { id: "1", titre: "Cours - Compilation", contributeur: "Jean ADJOVI", date: "2026-02-14", type: "Cours", filiere: "Genie Logiciel" },
  { id: "2", titre: "TD - Cryptographie", contributeur: "Marie DOSSOU", date: "2026-02-13", type: "TD", filiere: "Securite Informatique" },
  { id: "3", titre: "Examen - Statistiques", contributeur: "Paul AGBANGLA", date: "2026-02-12", type: "Examen", filiere: "Intelligence Artificielle" },
  { id: "4", titre: "TP - Développement Web", contributeur: "Aïcha SANNI", date: "2026-02-11", type: "TP", filiere: "Genie Logiciel" },
  { id: "5", titre: "Correction - Algèbre", contributeur: "Koffi MENSAH", date: "2026-02-10", type: "Correction", filiere: "SEIoT" },
];
