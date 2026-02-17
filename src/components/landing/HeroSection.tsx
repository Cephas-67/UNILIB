import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import studentHero from "@/assets/student-hero.png";

const DotGrid = ({ color }: { color: string }) => (
  <div className="grid grid-cols-4 gap-[6px]">
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: color }} />
    ))}
  </div>
);

const HeroSection = () => {
  return (
    <section id="accueil" className="relative overflow-hidden bg-background py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Grille de points bleus — haut gauche de la page */}
          <div className="absolute top-20 left-8 lg:left-12" style={{ zIndex: 5 }}>
            <DotGrid color="hsl(var(--secondary))" />
          </div>

          {/* Left column - Text */}
          <div className="flex-1 lg:max-w-[55%] relative z-10 pt-12">
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
          <div className="flex-1 relative h-[460px] lg:h-[500px] w-full max-w-[480px]">
            {/* 1. Grand rectangle arrondi bleu — derrière la tête */}
            <div
              className="absolute rounded-[32px]"
              style={{
                backgroundColor: "hsl(var(--secondary))",
                width: "300px",
                height: "360px",
                top: "0px",
                right: "-10px",
                transform: "rotate(-10deg)",
                zIndex: 1,
              }}
            />

            {/* 2. Cercle vert (animé) — haut centre */}
            <div
              className="absolute rounded-full animate-hero-float-green"
              style={{
                backgroundColor: "hsl(var(--primary))",
                width: "70px",
                height: "70px",
                top: "15px",
                left: "35%",
                zIndex: 3,
              }}
            />

            {/* 3. Grand cercle orange/rose rempli — bas gauche, couvre le bas de la photo */}
            <div
              className="absolute rounded-full"
              style={{
                backgroundColor: "hsl(var(--accent))",
                opacity: 0.3,
                width: "240px",
                height: "240px",
                bottom: "-40px",
                left: "30px",
                zIndex: 3,
              }}
            />

            {/* 4. Cercle outline rose — superposé au cercle rempli */}
            <div
              className="absolute rounded-full"
              style={{
                border: "1.5px solid hsl(var(--accent))",
                opacity: 0.4,
                width: "180px",
                height: "180px",
                bottom: "10px",
                left: "10px",
                zIndex: 3,
              }}
            />

            {/* 5. Photo étudiant — centrée, le bas est masqué par le cercle orange */}
            <div
              className="absolute"
              style={{
                left: "50%",
                top: "20px",
                transform: "translateX(-50%)",
                width: "250px",
                height: "420px",
                zIndex: 2,
                overflow: "hidden",
                borderRadius: "8px",
              }}
            >
              <img
                src={studentHero}
                alt="Étudiant IFRI"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 10%" }}
              />
            </div>

            {/* 6. Grille de points orange — coin inférieur droit */}
            <div className="absolute bottom-4 right-0" style={{ zIndex: 5 }}>
              <DotGrid color="hsl(var(--accent))" />
            </div>

            {/* 7. Tirets verts pointillés — haut droite */}
            <div className="absolute" style={{ top: "10px", right: "20px", zIndex: 5 }}>
              <svg width="50" height="50" viewBox="0 0 50 50" opacity="0.5">
                <circle cx="25" cy="25" r="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;