import { Link } from "react-router-dom";
import { ArrowUpRight, Database, Clock, Users, Sparkles } from "lucide-react";
import EFriLogo from "@/components/EFriLogo";
import UniLibLogo from "@/components/UniLibLogo";

import logoifri from "@/assets/logoifri.png";

const stats = [
  { value: "500+", label: "ressources" },
  { value: "200+", label: "cours pratiques" },
  { value: "1000+", label: "étudiants actifs" },
  { value: "50+", label: "enseignants" },
];

const features = [
  { icon: Database, color: "#2196F3", title: "Centralisation", description: "Tous vos cours, TDs, TPs et examens accessibles depuis un seul endroit." },
  { icon: Clock, color: "#4CAF50", title: "Gain de temps", description: "Trouvez rapidement ce dont vous avez besoin avec notre système de filtres avancés." },
  { icon: Users, color: "#FF9800", title: "Collaboration", description: "Partagez vos ressources et contribuez à enrichir la bibliothèque commune." },
  { icon: Sparkles, color: "#2196F3", title: "IA Intégrée", description: "Un assistant intelligent pour vous aider dans vos révisions et cours pratiques." },
];

import studentHero from "@/assets/student-efri.png";

const DotGrid = ({ color }: { color: string }) => (
  <div className="grid grid-cols-4 gap-[6px]">
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: color }} />
    ))}
  </div>
);

import { useEffect } from "react";

const EFriLanding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-4">
            <UniLibLogo size="small" />
            <div className="w-px h-5 bg-border" />
            <Link to="/e-fri">
              <EFriLogo />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/e-fri" className="font-inter text-sm font-medium text-foreground">Accueil</Link>
            <Link to="/e-fri/ressources" className="font-inter text-sm text-muted-foreground hover:text-foreground transition-colors">Ressources</Link>
            <Link to="/e-fri/cours-pratiques" className="font-inter text-sm text-muted-foreground hover:text-foreground transition-colors">Cours Pratiques</Link>
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
              {/* Grille de points bleus — haut gauche */}
              <div className="hidden lg:block absolute top-20 left-8 lg:left-12 opacity-50" style={{ zIndex: 5 }}>
                <DotGrid color="hsl(var(--secondary))" />
              </div>

              {/* Left column - Text */}
              <div className="flex-1 lg:max-w-[55%] relative z-10 pt-12">
                <h1 className="font-poppins font-bold text-4xl lg:text-5xl text-foreground leading-tight mb-4 animate-in fade-in slide-in-from-left duration-700">
                  Votre bibliothèque académique centralisée
                </h1>
                <p className="font-inter text-sm text-muted-foreground mb-8 max-w-md leading-relaxed animate-in fade-in slide-in-from-left duration-700 delay-100">
                  Cours, TDs, TPs, examens et projets — tout ce dont vous avez besoin pour réussir à l'IFRI
                </p>
                <Link
                  to="/e-fri/connexion"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-inter text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-all hover:scale-105 duration-300 animate-in fade-in slide-in-from-left duration-700 delay-200"
                >
                  Accéder à la plateforme
                  <ArrowUpRight size={16} />
                </Link>
              </div>

              {/* Right column - Photo + Decorative shapes */}
              <div className="flex-1 relative h-[500px] lg:h-[550px] w-full max-w-[550px] flex items-center justify-center">
                {/* 1. Blue Card (Main background) */}
                <div
                  className="hidden lg:block absolute rounded-[40px] shadow-lg animate-in fade-in zoom-in duration-1000"
                  style={{
                    backgroundColor: "hsl(var(--secondary))",
                    width: "320px",
                    height: "380px",
                    top: "80px",
                    right: "30px",
                    transform: "rotate(10deg)",
                    zIndex: 1,
                  }}
                />

                {/* 2. Orange Circle (Overlap) */}
                <div
                  className="hidden lg:block absolute rounded-full shadow-md animate-hero-float-orange"
                  style={{
                    backgroundColor: "rgba(255, 152, 0, 0.25)",
                    border: "2px solid hsl(var(--accent))",
                    width: "200px",
                    height: "200px",
                    bottom: "20px",
                    left: "10px",
                    zIndex: 4,
                  }}
                />

                {/* 3. Green Circle */}
                <div
                  className="hidden lg:block absolute rounded-full shadow-sm animate-hero-float-green"
                  style={{
                    backgroundColor: "hsl(var(--primary))",
                    width: "70px",
                    height: "70px",
                    top: "120px",
                    left: "50px",
                    zIndex: 0,
                  }}
                />

                {/* 4. Small Blue Circle */}
                <div
                  className="hidden lg:block absolute rounded-full shadow-sm animate-hero-float-blue"
                  style={{
                    backgroundColor: "hsl(var(--secondary))",
                    width: "40px",
                    height: "40px",
                    bottom: "150px",
                    right: "0px",
                    zIndex: 0,
                  }}
                />

                {/* 5. Decorative wavy lines */}
                <div className="hidden lg:block absolute top-[100px] left-[30px] z-10 opacity-70">
                  <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                    <path d="M5 25C15 10 25 10 35 25C45 40 55 40 65 25" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>

                {/* 6. Student Photo Container */}
                <div
                  className="hidden lg:block absolute"
                  style={{
                    width: "320px",
                    height: "480px",
                    top: "-20px",
                    right: "40px",
                    zIndex: 3,
                    pointerEvents: "none",
                  }}
                >
                  <img
                    src={studentHero}
                    alt="Étudiant IFRI"
                    className="w-full h-full object-contain"
                    style={{
                      objectPosition: "center top",
                      filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.15))",
                      maskImage: "linear-gradient(to bottom, black 85%, transparent 90%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 90%)",
                    }}
                  />
                </div>

                {/* 7. Floating "Smiley" bubbles */}
                <div className="hidden lg:block absolute top-[60px] right-[20px] z-10 bg-white/90 p-2 rounded-full shadow-lg border border-gray-100 animate-hero-float-blue">
                  <div className="w-5 h-5 rounded-full border-2 border-[hsl(var(--secondary))] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--secondary))] mr-0.5" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--secondary))]" />
                  </div>
                </div>
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
