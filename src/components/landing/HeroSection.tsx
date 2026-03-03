import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import studentHero from "@/assets/retouch_2026021720400735.png";
import { Button } from "../ui/button";

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
      <div className="container mx-auto px-10 lg:p-8">
        <img src="/dots_top.svg" className="absolute z-10 top-42 left-10 w-16" />
        <img src="/dots_bottom.svg" className="absolute z-10 bottom-10 right-10 w-16" />
        <div className="flex flex-col lg:flex-row items-center gap-12">


          {/* Left column - Text */}
          <div className="flex-1 lg:max-w-[55%] relative z-10 pt-12">
            <h1 className="font-semibold text-4xl lg:text-5xl text-foreground leading-snug mb-4">
              Préparez vos examens avec les bonnes ressources.
              <ArrowRight className="inline-block ml-3 text-secondary" size={32} />
            </h1>

            <p className="font-inter text-lg text-muted-foreground mb-8 max-w-md leading-relaxed">
              Accédez facilement aux épreuves, consultez les sujets des années précédentes et préparez vos examens avec des ressources fiables et organisées
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/choix-entite" className="w-full md:w-max">
                <Button variant="primary" className="rounded-xl w-full md:w-max">
                  Accéder aux épreuves
                  <ArrowUpRight size={16} />

                </Button>
              </Link>

              <Link to="/choix-entite" className="w-full md:w-max">
                <Button variant="primarySoft" className="rounded-xl w-full md:w-max">
                  Choisir mon entité
                </Button>
              </Link>

            </div>
          </div>

          {/* Right column - Photo + Decorative shapes */}
          <div className="flex-1 hidden relative h-[400px] lg:h-[630px] w-full max-w-[650px] lg:flex items-center justify-center">
            <svg width="553.896" height="364.028" className="w-[60%]" viewBox="0 0 553.896 364.028" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.2528 158.207C-8.99741 209.207 -10.4973 269.957 29.2529 316.207C69.0031 362.457 120.753 373.707 182.253 356.207C243.754 338.707 208.503 254.707 262.253 246.207C316.003 237.707 434.255 333.707 487.256 300.207C540.256 266.707 574.253 155.207 540.253 99.2073C506.252 43.2073 410.503 -11.7926 334.253 2.20737C258.002 16.2073 241.754 111.957 182.254 130.207C122.753 148.457 67.5031 107.207 29.2528 158.207Z" fill="#849DE0" fill-rule="evenodd" />
            </svg>
            <img
              src="/src/assets/stdGroup.png"
              alt="Duvalier"
              className="absolute w-[90%] left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%]"
              style={{
                objectPosition: "center top",
                maskImage: "linear-gradient(to bottom, black 85%, transparent 90%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 90%)",
              }}
            />

          </div>
        </div>
      </div>
    </section >
  );
};

export default HeroSection;