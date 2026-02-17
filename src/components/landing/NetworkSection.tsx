import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UniLibLogo from "../UniLibLogo";
import logoIfri from "@/assets/logoifri.png";
import logoEpac from "@/assets/epac.png";
import logoEneam from "@/assets/eneam.png";
import logoImsp from "@/assets/imsp.png";
import logoUac from "@/assets/logouac.png";
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
  { id: "uac", name: "UAC", logo: logoUac, x: 50, y: 85, available: false },
];

const CENTER_X = 50;
const CENTER_Y = 50;

const NetworkSection = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    <section id="ecoles" className="bg-network py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="relative w-full max-w-3xl mx-auto" style={{ aspectRatio: "4/3" }}>
          {/* SVG lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {schools.map((school) => (
              <line
                key={school.id}
                x1={CENTER_X}
                y1={CENTER_Y}
                x2={school.x}
                y2={school.y}
                stroke="#BDBDBD"
                strokeWidth="0.3"
                strokeDasharray="1.5 1"
              />
            ))}
          </svg>

          {/* Center UniLib node */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: `${CENTER_X}%`,
              top: `${CENTER_Y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-background border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
              <UniLibLogo size="small" />
            </div>
          </div>

          {/* School nodes */}
          {schools.map((school) => (
            <div
              key={school.id}
              className="absolute group"
              style={{
                left: `${school.x}%`,
                top: `${school.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <button
                onClick={() => handleNodeClick(school)}
                onMouseEnter={() => setHoveredNode(school.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-background flex items-center justify-center transition-all cursor-pointer overflow-hidden ${
                  school.available
                    ? "border-2 border-secondary shadow-md hover:shadow-lg hover:scale-110"
                    : "border border-muted-foreground/20 hover:border-muted-foreground/40 hover:scale-105"
                }`}
              >
                <img
                  src={school.logo}
                  alt={school.name}
                  className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                />
              </button>

              {/* Tooltip */}
              {hoveredNode === school.id && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background px-3 py-1.5 rounded-md font-inter text-xs whitespace-nowrap z-10">
                  {school.available ? school.name : `${school.name} — Bientôt disponible`}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
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
