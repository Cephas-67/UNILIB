import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import studentHero from "@/assets/retouch_2026021720400735.png";

const DotGrid = ({ color }: { color: string }) => (
  <div className="grid grid-cols-4 gap-[6px]">
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: color }} />
    ))}
  </div>
);

const HeroSection = () => {
  return (
    <section id="accueil" className="relative overflow-hidden bg-background pt-28 pb-16 lg:pt-36 lg:pb-24">
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
              <a
                href="#ecoles"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-inter text-sm font-medium text-accent-foreground hover:bg-accent-hover transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('ecoles')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Accéder aux épreuves
                <ArrowUpRight size={16} />
              </a>
              <a
                href="#ecoles"
                className="inline-flex items-center gap-2 rounded-lg border border-accent px-6 py-3 font-inter text-sm font-medium text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('ecoles')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Créer mon compte
              </a>
            </div>
          </div>

          {/* Right column - Photo + Decorative shapes (Refined with Blue, Orange, Green) */}
          <div className="flex-1 relative h-[500px] lg:h-[550px] w-full max-w-[550px] flex items-center justify-center">
            {/* 1. Blue Card (Main background) - Frames the student */}
            <div
              className="absolute rounded-[40px] shadow-lg animate-in fade-in zoom-in duration-700"
              style={{
                backgroundColor: "hsl(var(--secondary))", // Blue
                width: "320px",
                height: "380px",
                top: "120px",
                right: "30px",
                transform: "rotate(10deg)",
                zIndex: 1,
              }}
            />

            {/* 2. Orange Circle (Bottom left overlap) - Floating */}
            <div
              className="absolute rounded-full shadow-md animate-hero-float-orange"
              style={{
                backgroundColor: "rgba(255, 152, 0, 0.25)", // Translucent Orange
                border: "2px solid hsl(var(--accent))",
                width: "200px",
                height: "200px",
                bottom: "20px",
                left: "10px",
                zIndex: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* Smiley icon inside orange circle */}
              <div className="w-8 h-8 rounded-full border-2 border-[hsl(var(--accent))] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))] mr-1" />
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
              </div>
            </div>

            {/* 3. Green Circle (Top left overlay) - Floating */}
            <div
              className="absolute rounded-full shadow-sm animate-hero-float-green"
              style={{
                backgroundColor: "hsl(var(--primary))", // Green
                width: "70px",
                height: "70px",
                top: "120px",
                left: "50px",
                zIndex: 0,
              }}
            />

            {/* 4. Small Blue Circle (Accent right) - Floating */}
            <div
              className="absolute rounded-full shadow-sm animate-hero-float-blue"
              style={{
                backgroundColor: "hsl(var(--secondary))", // Blue
                width: "40px",
                height: "40px",
                bottom: "150px",
                right: "0px",
                zIndex: 0,
              }}
            />

            {/* 5. Decorative wavy lines (SVG) - Orange */}
            <div className="absolute top-[100px] left-[30px] z-10 opacity-70">
              <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                <path d="M5 25C15 10 25 10 35 25C45 40 55 40 65 25" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            {/* 6. Main Student Image - Floating and animated */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center items-end z-[3]">
              <div className="relative w-[280px] h-[420px] lg:w-[320px] lg:h-[480px] animate-in fade-in slide-in-from-bottom duration-1000">
                <img
                  src={studentHero}
                  alt="Étudiant UniLib"
                  className="w-full h-full object-contain drop-shadow-2xl animate-hero-float"
                  loading="lazy"
                />
              </div>
            </div>

            {/* 7. Floating "Smiley" bubbles - Orange and Blue */}
            <div className="absolute top-[60px] right-[20px] z-10 bg-white/90 p-2 rounded-full shadow-lg border border-gray-100 animate-hero-float-blue">
              <div className="w-5 h-5 rounded-full border-2 border-[hsl(var(--secondary))] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--secondary))] mr-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--secondary))]" />
              </div>
            </div>

            <div className="absolute bottom-[200px] left-[20%] z-10 bg-white/90 p-2 rounded-full shadow-lg border border-gray-100 animate-hero-float-orange">
              <div className="w-5 h-5 rounded-full border-2 border-[hsl(var(--accent))] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))] mr-0.5" />
                <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;