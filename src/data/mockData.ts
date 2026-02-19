export const currentUser = {
  id: "1",
  nom: "AHOUANDJINOU",
  prenom: "Marcel",
  email: "marcel.ahouandjinou@ifri.uac.bj",
  filiere: "Génie Logiciel",
  promotion: "L3",
  semestre: "S2",
  avatar: "",
  role: "etudiant" as const,
};

export const registeredUsers = [
  {
    email: "marcel.ahouandjinou@ifri.uac.bj",
    password: "password123",
    nom: "AHOUANDJINOU",
    prenom: "Marcel"
  }
];

export const resources = [
  { id: "1", titre: "Algorithmique Avancée - Cours Complet", type: "Cours" as const, matiere: "Algorithmique", enseignant: "Prof. GANGBE", date: "2026-02-10", pages: 45, taille: "2.3 MB", telechargements: 234, filiere: "Génie Logiciel", promotion: "L3", semestre: "S2", format: "PDF", nouveau: true },
  { id: "2", titre: "Examen Final - Base de Données", type: "Examen" as const, matiere: "Base de Données", enseignant: "Dr. HOUNKPATIN", date: "2026-01-15", pages: 8, taille: "450 KB", telechargements: 567, filiere: "Génie Logiciel", promotion: "L3", semestre: "S1", format: "PDF", nouveau: false },
  { id: "3", titre: "TD3 - Programmation Java", type: "TD" as const, matiere: "Programmation OO", enseignant: "Prof. ASSOGBA", date: "2026-02-05", pages: 12, taille: "1.1 MB", telechargements: 189, filiere: "Génie Logiciel", promotion: "L2", semestre: "S2", format: "PDF", nouveau: true },
  { id: "4", titre: "TP - Réseaux Informatiques", type: "TP" as const, matiere: "Réseaux", enseignant: "Dr. DOSSOU", date: "2026-01-28", pages: 15, taille: "3.2 MB", telechargements: 145, filiere: "Système-Réseau", promotion: "L3", semestre: "S2", format: "DOCX", nouveau: false },
  { id: "5", titre: "Rattrapage - Mathématiques Discrètes", type: "Rattrapage" as const, matiere: "Mathématiques", enseignant: "Prof. AKAKPO", date: "2026-02-12", pages: 6, taille: "320 KB", telechargements: 98, filiere: "Génie Logiciel", promotion: "L1", semestre: "S1", format: "PDF", nouveau: true },
  { id: "6", titre: "Correction - Analyse Numérique", type: "Correction" as const, matiere: "Analyse Numérique", enseignant: "Dr. AZONHIHO", date: "2026-01-20", pages: 20, taille: "1.8 MB", telechargements: 312, filiere: "Intelligence Artificielle", promotion: "M1", semestre: "S1", format: "PDF", nouveau: false },
  { id: "7", titre: "Cours Intelligence Artificielle", type: "Cours" as const, matiere: "IA", enseignant: "Prof. KIKI", date: "2026-02-14", pages: 60, taille: "5.1 MB", telechargements: 420, filiere: "Intelligence Artificielle", promotion: "M1", semestre: "S2", format: "PDF", nouveau: true },
  { id: "8", titre: "Examen - Génie Logiciel", type: "Examen" as const, matiere: "Génie Logiciel", enseignant: "Prof. GANGBE", date: "2026-01-10", pages: 10, taille: "520 KB", telechargements: 389, filiere: "Génie Logiciel", promotion: "L3", semestre: "S1", format: "PDF", nouveau: false },
  { id: "9", titre: "TD - Systèmes d'Exploitation", type: "TD" as const, matiere: "Systèmes", enseignant: "Dr. HOUNMENOU", date: "2026-02-08", pages: 14, taille: "980 KB", telechargements: 156, filiere: "Système-Réseau", promotion: "L2", semestre: "S2", format: "PDF", nouveau: true },
];

export const projets = [
  {
    id: "1",
    titre: "Programmation C++ Avancée avec Qt",
    description: "Maîtrisez le développement d'interfaces graphiques professionnelles et la gestion d'événements avec le framework Qt.",
    difficulte: "Intermédiaire" as const,
    stack: ["C++", "Qt 6", "QML", "CMake"],
    apis: ["Qt Widgets API", "Qt Network", "Qt Multimedia"],
    liens: [
      { label: "Documentation Officielle Qt", url: "https://doc.qt.io/" },
      { label: "Vogella Qt Tutorials", url: "https://www.vogella.com/tutorials/Qt/article.html" }
    ],
    etapes: [
      "Installer le setup Qt 6.5 (inclus dans le zip)",
      "Configurer l'environnement via le support de cours PDF",
      "Ouvrir le projet témoin 'QtHospital' pour tester la configuration",
      "Consulter les slides de cours pour les concepts de Signaux & Slots"
    ],
    zipUrl: "/resources/cpp-qt-pack.zip",
    image: ""
  },
  {
    id: "2",
    titre: "Architecture Microservices avec Spring Boot",
    description: "Guide complet pour concevoir des systèmes distribués, scalables et résilients en Java.",
    difficulte: "Avancé" as const,
    stack: ["Java 17", "Spring Cloud", "Docker", "Netflix Eureka"],
    apis: ["OpenAPI/Swagger", "Resilience4j", "Spring Security OAuth2"],
    liens: [
      { label: "Spring Cloud Reference", url: "https://spring.io/projects/spring-cloud" },
      { label: "Microservices.io Patterns", url: "https://microservices.io/patterns/index.html" }
    ],
    etapes: [
      "Télécharger le socle de projet Maven",
      "Lancer l'instance Eureka via Docker Compose",
      "Suivre le tutoriel d'intégration API Gateway",
      "Implémenter le circuit breaker sur le service 'Order'"
    ],
    zipUrl: "/resources/microservices-spring-pack.zip",
    image: ""
  },
  {
    id: "3",
    titre: "Bases du Développement Web Moderne",
    description: "Apprenez à construire des sites statiques et dynamiques en suivant les standards du W3C.",
    difficulte: "Débutant" as const,
    stack: ["HTML5", "CSS3", "JavaScript ES6", "Tailwind CSS"],
    apis: ["Local Storage API", "Fetch API", "Google Fonts"],
    liens: [
      { label: "MDN Web Docs", url: "https://developer.mozilla.org/" },
      { label: "Tailwind CSS Documentation", url: "https://tailwindcss.com/docs" }
    ],
    etapes: [
      "Étudier les structures HTML sémantiques",
      "Appliquer les styles via le framework Tailwind",
      "Manipuler le DOM avec du JavaScript pur",
      "Déployer le résultat sur GitHub Pages"
    ],
    zipUrl: "/resources/web-basics-pack.zip",
    image: ""
  }
];

export const emploiDuTemps = [
  { jour: 0, heureDebut: 8, heureFin: 10, matiere: "Algorithmique Avancée", type: "CM" as const, salle: "Amphi A", enseignant: "Prof. GANGBE" },
  { jour: 0, heureDebut: 10, heureFin: 12, matiere: "Base de Données", type: "TD" as const, salle: "Salle 201", enseignant: "Dr. HOUNKPATIN" },
  { jour: 0, heureDebut: 14, heureFin: 16, matiere: "Programmation OO", type: "TP" as const, salle: "Labo Info 1", enseignant: "Prof. ASSOGBA" },
  { jour: 1, heureDebut: 8, heureFin: 10, matiere: "Réseaux Informatiques", type: "CM" as const, salle: "Amphi B", enseignant: "Dr. DOSSOU" },
  { jour: 1, heureDebut: 10, heureFin: 12, matiere: "Génie Logiciel", type: "CM" as const, salle: "Amphi A", enseignant: "Prof. GANGBE" },
  { jour: 1, heureDebut: 14, heureFin: 17, matiere: "Projet Intégrateur", type: "TP" as const, salle: "Labo Info 2", enseignant: "Dr. AZONHIHO" },
  { jour: 2, heureDebut: 8, heureFin: 10, matiere: "Mathématiques Discrètes", type: "CM" as const, salle: "Salle 105", enseignant: "Prof. AKAKPO" },
  { jour: 2, heureDebut: 10, heureFin: 12, matiere: "Anglais Technique", type: "TD" as const, salle: "Salle 302", enseignant: "Mme. JOHNSON" },
  { jour: 2, heureDebut: 14, heureFin: 16, matiere: "Intelligence Artificielle", type: "CM" as const, salle: "Amphi A", enseignant: "Prof. KIKI" },
  { jour: 3, heureDebut: 8, heureFin: 10, matiere: "Algorithmique Avancée", type: "TD" as const, salle: "Salle 201", enseignant: "Prof. GANGBE" },
  { jour: 3, heureDebut: 10, heureFin: 13, matiere: "Base de Données", type: "TP" as const, salle: "Labo Info 1", enseignant: "Dr. HOUNKPATIN" },
  { jour: 4, heureDebut: 8, heureFin: 10, matiere: "Réseaux Informatiques", type: "TD" as const, salle: "Salle 105", enseignant: "Dr. DOSSOU" },
  { jour: 4, heureDebut: 10, heureFin: 12, matiere: "Génie Logiciel", type: "TD" as const, salle: "Salle 201", enseignant: "Prof. GANGBE" },
  { jour: 4, heureDebut: 14, heureFin: 16, matiere: "Programmation OO", type: "CM" as const, salle: "Amphi B", enseignant: "Prof. ASSOGBA" },
];

export const actualites = [
  { id: "1", titre: "Nouveaux sujets d'examen disponibles", description: "Les sujets d'examen du semestre S1 2025-2026 sont maintenant disponibles pour toutes les filières.", date: "2026-02-15", type: "ressource" },
  { id: "2", titre: "Hackathon IFRI 2026", description: "Inscrivez-vous au hackathon annuel de l'IFRI. Thème : Solutions IA pour l'éducation.", date: "2026-02-12", type: "evenement" },
  { id: "3", titre: "Mise à jour de l'emploi du temps", description: "L'emploi du temps du semestre S2 a été mis à jour. Consultez les changements.", date: "2026-02-10", type: "info" },
  { id: "4", titre: "Nouveau projet disponible", description: "Un nouveau projet de niveau avancé sur le Machine Learning est maintenant disponible.", date: "2026-02-08", type: "projet" },
];

export const adminStats = {
  utilisateurs: 1247,
  ressources: 856,
  contributionsEnAttente: 23,
  telechargements: 15890,
};

export const contributionsEnAttente = [
  { id: "1", titre: "Cours - Compilation", contributeur: "Jean ADJOVI", date: "2026-02-14", type: "Cours", filiere: "Génie Logiciel" },
  { id: "2", titre: "TD - Cryptographie", contributeur: "Marie DOSSOU", date: "2026-02-13", type: "TD", filiere: "Système-Réseau" },
  { id: "3", titre: "Examen - Statistiques", contributeur: "Paul AGBANGLA", date: "2026-02-12", type: "Examen", filiere: "Intelligence Artificielle" },
  { id: "4", titre: "TP - Développement Web", contributeur: "Aïcha SANNI", date: "2026-02-11", type: "TP", filiere: "Génie Logiciel" },
  { id: "5", titre: "Correction - Algèbre", contributeur: "Koffi MENSAH", date: "2026-02-10", type: "Correction", filiere: "SEIoT" },
];
