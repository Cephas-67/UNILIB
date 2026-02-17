import { useState } from "react";
import { Clock, Users, Star, BookOpen, ArrowRight } from "lucide-react";
import { projets } from "@/data/mockData";

const diffColors = { "Débutant": "bg-[#E8F5E9] text-primary", "Intermédiaire": "bg-[#FFF3E0] text-accent", "Avancé": "bg-[#FFEBEE] text-destructive" };

const EFriProjects = () => {
  const [filter, setFilter] = useState("Tous");

  const filtered = filter === "Tous" ? projets : projets.filter(p => p.difficulte === filter);

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-poppins font-semibold text-2xl text-foreground">Projets</h1>
        <div className="flex gap-2">
          {["Tous", "Débutant", "Intermédiaire", "Avancé"].map(d => (
            <button key={d} onClick={() => setFilter(d)} className={`px-3 py-1.5 rounded-full font-inter text-xs font-medium transition-colors ${filter === d ? "bg-secondary text-secondary-foreground" : "bg-muted text-foreground"}`}>{d}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(p => (
          <div key={p.id} className="bg-background rounded-xl border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden">
            {/* Banner placeholder */}
            <div className="h-40 bg-secondary/10 flex items-center justify-center">
              <FolderIcon />
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[11px] font-inter font-medium ${diffColors[p.difficulte]}`}>{p.difficulte}</span>
              </div>
              <h3 className="font-poppins font-semibold text-base text-foreground mb-1">{p.titre}</h3>
              <p className="font-inter text-xs text-muted-foreground mb-3 line-clamp-2">{p.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.technologies.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-muted text-[11px] font-inter text-foreground">{t}</span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4 font-inter text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock size={12} /> {p.duree}</span>
                <span className="flex items-center gap-1"><BookOpen size={12} /> {p.ressources} ressources</span>
                <span className="flex items-center gap-1"><Users size={12} /> {p.etudiants} étudiants</span>
                <span className="flex items-center gap-1"><Star size={12} /> {p.note}/5</span>
              </div>

              {p.progression > 0 && p.progression < 100 && (
                <div className="mb-4">
                  <div className="flex justify-between font-inter text-xs text-muted-foreground mb-1">
                    <span>Progression</span><span>{p.progression}%</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${p.progression}%` }} />
                  </div>
                </div>
              )}

              <button className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-inter text-sm font-medium transition-colors ${
                p.progression === 0 ? "bg-secondary text-secondary-foreground" :
                p.progression === 100 ? "border border-border text-foreground hover:bg-muted" :
                "bg-primary text-primary-foreground"
              }`}>
                {p.progression === 0 ? "Découvrir" : p.progression === 100 ? "Revoir" : "Continuer"}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FolderIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-secondary/40">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

export default EFriProjects;
