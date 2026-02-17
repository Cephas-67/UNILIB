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
          {/* 1. Grand rectangle arrondi bleu (arrière-plan, fixe) */}
            <div
              className="absolute rounded-[32px]"
              style={{
                backgroundColor: "hsl(var(--secondary))",
                width: "320px",
                height: "380px",
                top: "-20px",
                right: "-20px",
                transform: "rotate(-12deg)",
              }}
            />

            {/* 2. Cercle vert (animé) */}
            <div
              className="absolute rounded-full animate-hero-float-green"
              style={{
                backgroundColor: "hsl(var(--primary))",
                width: "80px",
                height: "80px",
                top: "10px",
                left: "42%",
              }}
            />

            {/* 3. Grand cercle orange (fixe, rempli) */}
            <div
              className="absolute rounded-full"
              style={{
                backgroundColor: "hsl(var(--accent))",
                opacity: 0.35,
                width: "240px",
                height: "240px",
                bottom: "-30px",
                left: "20px",
              }}
            />

            {/* 4. Photo étudiant - fixe, au centre */}
            <div
              className="absolute z-10 rounded-xl overflow-hidden"
              style={{
                left: "50%",
                top: "45%",
                transform: "translate(-50%, -50%)",
                width: "260px",
                height: "350px",
              }}
            >
              <img
                src={studentHero}
                alt="Étudiant IFRI"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 15%" }}
              />
            </div>

            {/* 5. Grille de points orange — coin inférieur droit */}
            <div className="absolute bottom-4 right-4 z-20">
              <DotGrid color="hsl(var(--accent))" />
            </div>

            {/* 6. Cercle outline vert pointillé — haut droite */}
            <div
              className="absolute z-5"
              style={{
                top: "30px",
                right: "60px",
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
