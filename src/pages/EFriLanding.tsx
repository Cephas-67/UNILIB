import { Link } from "react-router-dom";
import { ArrowUpRight, Database, Clock, Users, Sparkles } from "lucide-react";

const EFriLogo = () => (
  <div className="flex items-center gap-2">
    <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
      <circle cx="16" cy="24" r="12" fill="#3D5AFE" opacity="0.85" />
      <circle cx="24" cy="24" r="12" fill="#FF9800" opacity="0.75" />
      <circle cx="20" cy="14" r="12" fill="#69F0AE" opacity="0.8" />
    </svg>
    <span className="font-poppins text-xl">
      <span className="font-medium text-muted-foreground">e-</span>
      <span className="font-bold text-foreground">FRI</span>
    </span>
  </div>
);

const stats = [
  { value: "500+", label: "ressources" },
  { value: "200+", label: "projets" },
  { value: "1000+", label: "étudiants actifs" },
  { value: "50+", label: "enseignants" },
];

const features = [
  { icon: Database, color: "#2196F3", title: "Centralisation", description: "Tous vos cours, TDs, TPs et examens accessibles depuis un seul endroit." },
  { icon: Clock, color: "#4CAF50", title: "Gain de temps", description: "Trouvez rapidement ce dont vous avez besoin avec notre système de filtres avancés." },
  { icon: Users, color: "#FF9800", title: "Collaboration", description: "Partagez vos ressources et contribuez à enrichir la bibliothèque commune." },
  { icon: Sparkles, color: "#2196F3", title: "IA Intégrée", description: "Un assistant intelligent pour vous aider dans vos révisions et projets." },
];

const EFriLanding = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-12">
          <Link to="/e-fri">
            <EFriLogo />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/e-fri" className="font-inter text-sm font-medium text-foreground">Accueil</Link>
            <Link to="/e-fri/ressources" className="font-inter text-sm text-muted-foreground hover:text-foreground transition-colors">Ressources</Link>
            <Link to="/e-fri/projets" className="font-inter text-sm text-muted-foreground hover:text-foreground transition-colors">Projets</Link>
            <Link to="/e-fri/emploi-du-temps" className="font-inter text-sm text-muted-foreground hover:text-foreground transition-colors">Emploi du Temps</Link>
            <Link to="/e-fri/ia" className="font-inter text-sm text-muted-foreground hover:text-foreground transition-colors">IA Assistant</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/e-fri/connexion" className="rounded-lg bg-secondary px-5 py-2 font-inter text-sm text-secondary-foreground hover:bg-secondary-hover transition-colors">
              Se connecter
            </Link>
            <Link to="/e-fri/inscription" className="rounded-lg bg-primary px-5 py-2 font-inter text-sm text-primary-foreground hover:bg-primary-hover transition-colors">
              S'inscrire
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-background py-16 lg:py-24">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 lg:max-w-[55%]">
                <h1 className="font-poppins font-bold text-4xl lg:text-5xl text-foreground leading-tight mb-4">
                  Votre bibliothèque académique centralisée
                </h1>
                <p className="font-inter text-sm text-muted-foreground mb-8 max-w-md leading-relaxed">
                  Cours, TDs, TPs, examens et projets — tout ce dont vous avez besoin pour réussir à l'IFRI
                </p>
                <Link
                  to="/e-fri/connexion"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-inter text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors"
                >
                  Accéder à la plateforme
                  <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="flex-1 relative h-[400px] w-full">
                <div className="absolute top-0 right-0 w-[320px] h-[280px] rounded-[32px]" style={{ backgroundColor: "#5C6BC0", transform: "rotate(-5deg)" }} />
                <div className="absolute w-16 h-16 rounded-full" style={{ backgroundColor: "#A5D6A7", top: "40px", left: "60px" }} />
                <div className="absolute w-40 h-40 rounded-full" style={{ border: "1.5px solid #EF9A9A", backgroundColor: "rgba(239,154,154,0.15)", bottom: "40px", left: "40px" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-stats py-12 lg:py-16">
          <div className="container mx-auto px-6 lg:px-12 flex flex-wrap justify-center gap-12 lg:gap-20">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-poppins font-bold text-4xl text-primary-foreground">{s.value}</div>
                <div className="font-inter text-sm text-primary-foreground mt-1 opacity-90">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="bg-background py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-12">
            <h2 className="font-poppins font-bold text-2xl text-foreground text-center mb-12">Fonctionnalités</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => (
                <div key={f.title} className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: f.color }}>
                    <f.icon size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <EFriLogo />
          <p className="font-inter text-xs text-muted-foreground">2026 ©Copyright IFRI-UAC, tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
};

export default EFriLanding;
