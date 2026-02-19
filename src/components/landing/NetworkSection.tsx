import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UniLibLogo from "../UniLibLogo";
import logoIfri from "@/assets/logoifri.png";
import logoEpac from "@/assets/epac.png";
import logoEneam from "@/assets/eneam.png";
import logoImsp from "@/assets/imsp.png";
import { useToast } from "@/hooks/use-toast";

interface SchoolNode {
  id: string;
  name: string;
  logo: string;
  x: number;
  y: number;
  available: boolean;
  route?: string;
}

const schools: SchoolNode[] = [
  { id: "ifri", name: "IFRI", logo: logoIfri, x: 15, y: 30, available: true, route: "/e-fri" },
  { id: "epac", name: "EPAC", logo: logoEpac, x: 75, y: 20, available: false },
  { id: "eneam", name: "ENEAM", logo: logoEneam, x: 20, y: 75, available: false },
  { id: "imsp", name: "IMSP", logo: logoImsp, x: 80, y: 65, available: false },
];

const CENTER_X = 50;
const CENTER_Y = 50;

const NetworkSection = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Stable Z-positions for 3D effect without jitter
  const zPositions = useMemo(() => {
    return schools.reduce((acc, school) => {
      acc[school.id] = Math.random() * 40 - 20; // Reduced range to avoid too much depth interference
      return acc;
    }, {} as Record<string, number>);
  }, []);

  const handleNodeClick = (school: SchoolNode) => {
    if (school.available && school.route) {
      navigate(school.route);
    } else {
      toast({
        title: "Bientôt disponible",
        description: `L'espace ${school.name} sera bientôt disponible sur UniLib.`,
      });
    }
  };

  return (
    <section id="ecoles" className="bg-network py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 text-center mb-12">
        <h2 className="font-poppins font-bold text-3xl text-foreground mb-4">Notre Réseau d'Excellence</h2>
        <p className="font-inter text-muted-foreground max-w-2xl mx-auto text-sm">
          Connectez-vous à votre établissement pour accéder à vos ressources spécifiques
        </p>
      </div>

      <div className="container mx-auto px-6 lg:px-12 network-container-3d">
        <div className="relative w-full max-w-3xl mx-auto circuit-wrapper-3d" style={{ aspectRatio: "4/3" }}>
          {/* SVG lines with Branch animations */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {schools.map((school) => (
              <line
                key={school.id}
                x1={CENTER_X}
                y1={CENTER_Y}
                x2={school.x}
                y2={school.y}
                stroke="hsl(var(--secondary))"
                strokeWidth="0.4"
                className={`pulse-connection transition-all duration-500 ${hoveredNode === school.id ? "pulse-connection-active" : "branch-breathing"
                  }`}
              />
            ))}
          </svg>

          {/* Center UniLib node - Fixed 3D Position */}
          <div
            className="absolute flex items-center justify-center z-30"
            style={{
              left: `${CENTER_X}%`,
              top: `${CENTER_Y}%`,
              transform: "translate(-50%, -50%) translateZ(30px)",
            }}
          >
            <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-background border-4 border-secondary/20 shadow-xl flex items-center justify-center">
              <div className="animate-pulse">
                <UniLibLogo size="default" />
              </div>
            </div>
          </div>

          {/* School nodes - Stable 3D Space */}
          {schools.map((school) => (
            <div
              key={school.id}
              className="absolute cursor-pointer"
              style={{
                left: `${school.x}%`,
                top: `${school.y}%`,
                width: "80px",
                height: "80px",
                transform: "translate(-50%, -50%)",
                zIndex: hoveredNode === school.id ? 100 : 20,
              }}
              onMouseEnter={() => setHoveredNode(school.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeClick(school)}
            >
              <div
                className="w-full h-full flex items-center justify-center transition-all duration-300"
                style={{
                  transform: `translateZ(${zPositions[school.id]}px) ${hoveredNode === school.id ? "scale(1.1)" : "scale(1)"
                    }`,
                }}
              >
                <div
                  className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-background flex items-center justify-center transition-all overflow-hidden shadow-lg border-2 ${school.available
                      ? "border-secondary shadow-secondary/10"
                      : "border-muted-foreground/10 grayscale opacity-60"
                    } ${hoveredNode === school.id ? "border-secondary ring-4 ring-secondary/20" : ""}`}
                >
                  <img
                    src={school.logo}
                    alt={school.name}
                    className="w-12 h-12 lg:w-14 lg:h-14 object-contain"
                  />
                </div>
              </div>

              {/* Tooltip - Anchored to the stable container */}
              {hoveredNode === school.id && (
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-lg font-inter text-[10px] font-semibold whitespace-nowrap z-50 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
                  {school.available ? `Accéder à l'espace ${school.name}` : `${school.name} — Bientôt disponible`}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NetworkSection;
