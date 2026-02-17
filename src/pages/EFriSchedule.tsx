import { useState } from "react";
import { Download } from "lucide-react";
import { emploiDuTemps } from "@/data/mockData";

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const heures = Array.from({ length: 11 }, (_, i) => i + 8); // 8h to 18h
const typeColors = { CM: "bg-secondary/15 border-secondary text-secondary", TD: "bg-primary/15 border-primary text-primary", TP: "bg-accent/15 border-accent text-accent" };

const EFriSchedule = () => {
  const [view, setView] = useState<"semaine" | "mois" | "liste">("semaine");
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-poppins font-semibold text-2xl text-foreground">Emploi du Temps</h1>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-muted rounded-lg p-0.5">
            {(["semaine", "mois", "liste"] as const).map(v => (
              <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 rounded-md font-inter text-xs font-medium capitalize transition-colors ${view === v ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>{v}</button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-inter text-sm font-medium hover:opacity-90 transition-opacity">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 font-inter text-xs">
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-secondary/30" /> CM</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-primary/30" /> TD</span>
        <span className="flex items-center gap-2"><span className="w-3 h-3 rounded bg-accent/30" /> TP</span>
      </div>

      {view === "semaine" && (
        <div className="bg-background rounded-xl border border-border shadow-sm overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-border">
              <div className="p-3" />
              {jours.map(j => (
                <div key={j} className="p-3 text-center font-poppins font-medium text-sm text-foreground border-l border-border">{j}</div>
              ))}
            </div>

            {/* Time grid */}
            {heures.map(h => (
              <div key={h} className="grid grid-cols-[80px_repeat(5,1fr)] border-b border-border last:border-0 min-h-[60px]">
                <div className="p-2 font-inter text-xs text-muted-foreground flex items-start justify-end pr-3 pt-1">{h}h</div>
                {jours.map((_, jourIdx) => {
                  const block = emploiDuTemps.find(e => e.jour === jourIdx && e.heureDebut === h);
                  return (
                    <div key={jourIdx} className="border-l border-border relative p-0.5">
                      {block && (
                        <div
                          className={`rounded-lg border-l-[3px] p-2 text-xs cursor-pointer transition-shadow ${typeColors[block.type]} ${hoveredBlock === `${jourIdx}-${h}` ? "shadow-md" : ""}`}
                          style={{ height: `${(block.heureFin - block.heureDebut) * 60 - 4}px`, minHeight: "56px" }}
                          onMouseEnter={() => setHoveredBlock(`${jourIdx}-${h}`)}
                          onMouseLeave={() => setHoveredBlock(null)}
                        >
                          <p className="font-poppins font-medium text-[11px] leading-tight">{block.matiere}</p>
                          <p className="font-inter text-[10px] opacity-70 mt-0.5">{block.type} · {block.salle}</p>
                          {hoveredBlock === `${jourIdx}-${h}` && (
                            <p className="font-inter text-[10px] opacity-60 mt-0.5">{block.enseignant} · {block.heureDebut}h-{block.heureFin}h</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "liste" && (
        <div className="space-y-2">
          {emploiDuTemps.sort((a, b) => a.jour - b.jour || a.heureDebut - b.heureDebut).map((e, i) => (
            <div key={i} className="bg-background rounded-xl border border-border p-4 shadow-sm flex items-center gap-4">
              <div className={`w-1 h-12 rounded-full ${e.type === "CM" ? "bg-secondary" : e.type === "TD" ? "bg-primary" : "bg-accent"}`} />
              <div className="flex-1">
                <h3 className="font-poppins font-medium text-sm text-foreground">{e.matiere}</h3>
                <p className="font-inter text-xs text-muted-foreground">{jours[e.jour]} · {e.heureDebut}h-{e.heureFin}h · {e.salle} · {e.enseignant}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[11px] font-inter font-medium ${typeColors[e.type]}`}>{e.type}</span>
            </div>
          ))}
        </div>
      )}

      {view === "mois" && (
        <div className="bg-background rounded-xl border border-border p-8 shadow-sm text-center">
          <p className="font-inter text-sm text-muted-foreground">Vue mensuelle — Fonctionnalité à venir</p>
        </div>
      )}
    </div>
  );
};

export default EFriSchedule;
