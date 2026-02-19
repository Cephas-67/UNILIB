import { useState } from "react";
import { FolderArchive, Cpu, Zap, Link as LinkIcon, Download, Info, ArrowRight } from "lucide-react";
import { projets } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const diffColors = {
  "Débutant": "bg-[#E8F5E9] text-primary",
  "Intermédiaire": "bg-[#FFF3E0] text-accent",
  "Avancé": "bg-[#FFEBEE] text-destructive"
};

const EFriProjects = () => {
  const [filter, setFilter] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filtered = filter === "Tous" ? projets : projets.filter(p => p.difficulte === filter);

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-poppins font-semibold text-2xl text-foreground">Projets de Référence</h1>
        <div className="flex gap-2">
          {["Tous", "Débutant", "Intermédiaire", "Avancé"].map(d => (
            <button key={d} onClick={() => setFilter(d)} className={`px-3 py-1.5 rounded-full font-inter text-xs font-medium transition-colors ${filter === d ? "bg-secondary text-secondary-foreground" : "bg-muted text-foreground"}`}>{d}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(p => (
          <Dialog key={p.id}>
            <DialogTrigger asChild>
              <div
                className="bg-background rounded-xl border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden cursor-pointer group"
                onClick={() => setSelectedProject(p)}
              >
                {/* Banner */}
                <div className="h-40 bg-secondary/5 flex items-center justify-center transition-colors group-hover:bg-secondary/10">
                  <FolderArchive size={48} className="text-secondary/40" />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-inter font-medium ${diffColors[p.difficulte as keyof typeof diffColors]}`}>{p.difficulte}</span>
                  </div>
                  <h3 className="font-poppins font-semibold text-base text-foreground mb-1 group-hover:text-secondary transition-colors">{p.titre}</h3>
                  <p className="font-inter text-xs text-muted-foreground mb-4 line-clamp-2">{p.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.stack.slice(0, 3).map((t: string) => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-inter text-foreground">{t}</span>
                    ))}
                    {p.stack.length > 3 && <span className="text-[10px] text-muted-foreground font-inter">+{p.stack.length - 3}</span>}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-inter text-[11px] text-muted-foreground">Pack complet disponible</span>
                    <div className="flex items-center gap-1 text-secondary font-medium text-[11px]">
                      <span>Détails</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </div>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              {selectedProject && (
                <>
                  <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-inter font-medium ${diffColors[selectedProject.difficulte as keyof typeof diffColors]}`}>
                        {selectedProject.difficulte}
                      </span>
                    </div>
                    <DialogTitle className="font-poppins text-2xl">{selectedProject.titre}</DialogTitle>
                    <DialogDescription className="font-inter text-sm pt-2">
                      {selectedProject.description}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    {/* Stack & APIs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 font-poppins font-semibold text-sm text-foreground">
                          <Cpu size={16} className="text-secondary" /> Technologies clés
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.stack.map((t: string) => (
                            <span key={t} className="px-2.5 py-1 rounded bg-secondary/10 text-secondary font-inter text-xs">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="flex items-center gap-2 font-poppins font-semibold text-sm text-foreground">
                          <Zap size={16} className="text-accent" /> APIs utilisées
                        </h4>
                        <ul className="space-y-1">
                          {selectedProject.apis.map((a: string) => (
                            <li key={a} className="font-inter text-xs text-muted-foreground flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-accent" /> {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Steps */}
                    <div className="bg-muted/50 rounded-xl p-5 space-y-3">
                      <h4 className="flex items-center gap-2 font-poppins font-semibold text-sm text-foreground">
                        <Info size={16} className="text-primary" /> Étapes & Ressources
                      </h4>
                      <div className="space-y-3">
                        {selectedProject.etapes.map((e: string, i: number) => (
                          <div key={i} className="flex gap-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                              {i + 1}
                            </span>
                            <p className="font-inter text-xs text-foreground/80 leading-relaxed">{e}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2 font-poppins font-semibold text-sm text-foreground">
                        <LinkIcon size={16} className="text-muted-foreground" /> Liens utiles
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {selectedProject.liens.map((l: any) => (
                          <a
                            key={l.url}
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-inter text-xs text-secondary hover:underline"
                          >
                            {l.label} <ArrowRight size={10} className="-rotate-45" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="pt-4">
                      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-inter font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
                        <Download size={18} /> Télécharger le pack complet (.zip)
                      </button>
                      <p className="font-inter text-[10px] text-muted-foreground text-center mt-3">
                        Contient les slides, les setups d'installation et les codes sources de référence.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default EFriProjects;
