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
          <div className="flex-1 relative h-[500px] lg:h-[560px] w-full">
            {/* 1. Grand rectangle arrondi bleu — DERRIÈRE la photo */}
            <div
              className="absolute rounded-[32px]"
              style={{
                backgroundColor: "hsl(var(--secondary))",
                width: "340px",
                height: "400px",
                top: "10px",
                right: "0px",
                transform: "rotate(-10deg)",
                zIndex: 1,
              }}
            />

            {/* 2. Cercle vert (animé) */}
            <div
              className="absolute rounded-full animate-hero-float-green"
              style={{
                backgroundColor: "hsl(var(--primary))",
                width: "80px",
                height: "80px",
                top: "20px",
                left: "40%",
                zIndex: 3,
              }}
            />

            {/* 3. Grand cercle orange (fixe) */}
            <div
              className="absolute rounded-full"
              style={{
                backgroundColor: "hsl(var(--accent))",
                opacity: 0.3,
                width: "260px",
                height: "260px",
                bottom: "0px",
                left: "10px",
                zIndex: 1,
              }}
            />

            {/* 4. Photo étudiant — bien cadrée, pas coupée */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: "50%",
                bottom: "0px",
                transform: "translateX(-50%)",
                width: "280px",
                height: "480px",
                zIndex: 2,
              }}
            >
              <img
                src={studentHero}
                alt="Étudiant IFRI"
                className="w-full h-full object-contain object-bottom"
              />
            </div>

            {/* 5. Grille de points orange — coin inférieur droit */}
            <div className="absolute bottom-8 right-4" style={{ zIndex: 4 }}>
              <DotGrid color="hsl(var(--accent))" />
            </div>

            {/* 6. Cercle outline vert pointillé — haut droite */}
            <div
              className="absolute"
              style={{
                top: "30px",
                right: "50px",
                zIndex: 4,
              }}
            >
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="28" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
