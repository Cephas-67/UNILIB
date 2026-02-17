import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const DotGrid = ({ color, className }: { color: string; className?: string }) => (
  <div className={`grid grid-cols-4 gap-2 ${className}`}>
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: color, opacity: 0.5 }} />
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
            <DotGrid color="#2196F3" className="mb-8" />

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

          {/* Right column - Decorative shapes */}
          <div className="flex-1 relative h-[400px] lg:h-[480px] w-full">
            {/* Large purple/blue rounded rectangle, rotated */}
            <div
              className="absolute top-0 right-0 w-[320px] h-[280px] lg:w-[400px] lg:h-[340px] rounded-[32px]"
              style={{
                backgroundColor: "#5C6BC0",
                transform: "rotate(-5deg)",
                top: "-10px",
                right: "-20px",
              }}
            />

            {/* Green circle */}
            <div
              className="absolute w-16 h-16 lg:w-20 lg:h-20 rounded-full"
              style={{ backgroundColor: "#A5D6A7", top: "40px", left: "60px" }}
            />

            {/* Pink/salmon circle outline */}
            <div
              className="absolute w-40 h-40 lg:w-52 lg:h-52 rounded-full"
              style={{
                border: "1.5px solid #EF9A9A",
                backgroundColor: "rgba(239, 154, 154, 0.15)",
                bottom: "40px",
                left: "40px",
              }}
            />

            {/* Pink dot grid bottom-right */}
            <div className="absolute bottom-4 right-4">
              <DotGrid color="#EF9A9A" />
            </div>

            {/* Small green dashes top-right */}
            <div className="absolute top-12 right-8">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <line x1="5" y1="5" x2="15" y2="5" stroke="#A5D6A7" strokeWidth="2" strokeDasharray="4 3" />
                <line x1="10" y1="15" x2="25" y2="15" stroke="#A5D6A7" strokeWidth="2" strokeDasharray="4 3" />
                <line x1="5" y1="25" x2="20" y2="25" stroke="#A5D6A7" strokeWidth="2" strokeDasharray="4 3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
