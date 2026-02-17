import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import studentHero from "@/assets/student-hero.png";

const DotGrid = ({ color, className }: { color: string; className?: string }) => (
  <div className={`grid grid-cols-4 gap-2 ${className}`}>
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
    ))}
  </div>
);

const HeroSection = () => {
  return (
    <section id="accueil" className="relative overflow-hidden bg-background py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left column - Text */}
          <div className="flex-1 lg:max-w-[55%] relative z-10">
            <h1 className="font-poppins font-bold text-4xl lg:text-5xl text-foreground leading-tight mb-4">
              Préparez vos examens avec les bonnes ressources.
              <ArrowRight className="inline-block ml-3 text-secondary" size={32} />
            </h1>

            <p className="font-inter text-sm text-muted-foreground mb-8 max-w-md leading-relaxed">
              Accédez facilement aux épreuves, consultez les sujets des années précédentes et préparez vos examens avec des ressources fiables et organisées
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/e-fri/ressources"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-inter text-sm font-medium text-accent-foreground hover:bg-accent-hover transition-colors"
              >
                Accéder aux épreuves
                <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/e-fri/inscription"
                className="inline-flex items-center gap-2 rounded-lg border border-accent px-6 py-3 font-inter text-sm font-medium text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Créer mon compte
              </Link>
            </div>
          </div>

          {/* Right column - Photo + Decorative shapes */}
          <div className="flex-1 relative h-[400px] lg:h-[480px] w-full">
            {/* 1. Grand rectangle arrondi violet-bleu (arrière-plan) */}
            <div
              className="absolute rounded-[28px] animate-hero-float-rect"
              style={{
                backgroundColor: "#5C6BC0",
                opacity: 0.9,
                width: "280px",
                height: "320px",
                top: "-10px",
                right: "-10px",
                transform: "rotate(-8deg)",
              }}
            />

            {/* 2. Cercle vert menthe */}
            <div
              className="absolute rounded-full animate-hero-float-green"
              style={{
                backgroundColor: "#A5D6A7",
                width: "110px",
                height: "110px",
                top: "20px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />

            {/* 3. Grand cercle rose outline */}
            <div
              className="absolute rounded-full animate-hero-float-pink"
              style={{
                border: "1.5px solid #EF9A9A",
                backgroundColor: "transparent",
                width: "200px",
                height: "200px",
                bottom: "10px",
                left: "40px",
              }}
            />

            {/* 4. Photo étudiant - fixe, au centre */}
            <div
              className="absolute z-10 rounded-xl overflow-hidden"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "240px",
                height: "320px",
              }}
            >
              <img
                src={studentHero}
                alt="Étudiant IFRI"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* 5. Grille de points roses - coin inférieur droit */}
            <div className="absolute bottom-4 right-4 z-20 animate-hero-pulse-dots">
              <DotGrid color="#F48FB1" />
            </div>

            {/* 6. Grille de points bleus - coin supérieur gauche */}
            <div className="absolute top-8 left-4 z-20 animate-hero-pulse-dots">
              <DotGrid color="#90CAF9" />
            </div>

            {/* 7. Tirets verts décoratifs - coin supérieur droit */}
            <div className="absolute top-8 right-8 z-20 animate-hero-rotate-dashes">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <line x1="5" y1="5" x2="18" y2="5" stroke="#81C784" strokeWidth="2" />
                <line x1="10" y1="14" x2="28" y2="14" stroke="#81C784" strokeWidth="2" />
                <line x1="5" y1="23" x2="22" y2="23" stroke="#81C784" strokeWidth="2" />
                <line x1="12" y1="32" x2="25" y2="32" stroke="#81C784" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
