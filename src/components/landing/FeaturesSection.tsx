import { Database, Search, Sparkles } from "lucide-react";

const features = [
  {
    icon: Database,
    color: "#2196F3",
    title: "Ressources centralisées",
    description:
      "Retrouvez tous vos cours, TDs, TPs, examens et corrections en un seul endroit, organisés par filière et par semestre.",
  },
  {
    icon: Search,
    color: "#4CAF50",
    title: "Recherche avancée",
    description:
      "Trouvez rapidement les ressources dont vous avez besoin grâce à notre moteur de recherche intelligent par matière, enseignant ou type.",
  },
  {
    icon: Sparkles,
    color: "#FF9800",
    title: "Assistant IA",
    description:
      "Posez vos questions et obtenez des réponses personnalisées grâce à notre assistant intelligent intégré à la plateforme.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="fonctionnalites" className="bg-background py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="font-poppins font-bold text-2xl lg:text-3xl text-foreground text-center mb-12">
          Fonctionnalités
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl border border-border p-6 lg:p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: feature.color }}
              >
                <feature.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
