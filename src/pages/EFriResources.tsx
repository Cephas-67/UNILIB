import { useState } from "react";
import { Download, Eye, Heart, Share2, FileText, Grid, List, Search } from "lucide-react";
import { resources } from "@/data/mockData";

const typeColors: Record<string, string> = {
  Cours: "bg-[#E3F2FD] text-secondary",
  Examen: "bg-[#FFF3E0] text-accent",
  TD: "bg-[#E8F5E9] text-primary",
  TP: "bg-[#E8F5E9] text-[#66BB6A]",
  Rattrapage: "bg-[#FFF3E0] text-accent",
  Correction: "bg-[#E3F2FD] text-secondary",
};

const formatIcons: Record<string, string> = { PDF: "#F44336", DOCX: "#2196F3", ZIP: "#FF9800" };

const filieres = ["Tous", "Génie Logiciel", "Système-Réseau", "SEIoT", "Intelligence Artificielle"];
const promotions = ["Tous", "L1", "L2", "L3", "M1", "M2"];
const semestres = ["Tous", "S1", "S2"];
const types = ["Tous", "Cours", "TD", "TP", "Examen", "Rattrapage", "Correction"];

const EFriResources = () => {
  const [filiere, setFiliere] = useState("Tous");
  const [promotion, setPromotion] = useState("Tous");
  const [semestre, setSemestre] = useState("Tous");
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = resources.filter(r => {
    if (filiere !== "Tous" && r.filiere !== filiere) return false;
    if (promotion !== "Tous" && r.promotion !== promotion) return false;
    if (semestre !== "Tous" && r.semestre !== semestre) return false;
    if (typeFilter !== "Tous" && r.type !== typeFilter) return false;
    if (search && !r.titre.toLowerCase().includes(search.toLowerCase()) && !r.matiere.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selectClass = "px-3 py-2 rounded-lg border border-border bg-background font-inter text-sm outline-none focus:border-secondary";

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Filters */}
      <div className="bg-background rounded-xl border border-border p-4 shadow-sm sticky top-16 z-20 space-y-4">
        <div className="flex flex-wrap gap-3">
          <select value={filiere} onChange={e => setFiliere(e.target.value)} className={selectClass}>
            {filieres.map(f => <option key={f}>{f}</option>)}
          </select>
          <select value={promotion} onChange={e => setPromotion(e.target.value)} className={selectClass}>
            {promotions.map(p => <option key={p}>{p}</option>)}
          </select>
          <select value={semestre} onChange={e => setSemestre(e.target.value)} className={selectClass}>
            {semestres.map(s => <option key={s}>{s}</option>)}
          </select>
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher par titre ou matière..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background font-inter text-sm outline-none focus:border-secondary" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {types.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 py-1.5 rounded-full font-inter text-xs font-medium transition-colors ${typeFilter === t ? "bg-secondary text-secondary-foreground" : "bg-muted text-foreground hover:bg-muted-foreground/10"}`}>{t}</button>
            ))}
          </div>
          <div className="flex gap-1 ml-4">
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded ${viewMode === "grid" ? "bg-secondary/10 text-secondary" : "text-muted-foreground"}`}><Grid size={16} /></button>
            <button onClick={() => setViewMode("list")} className={`p-2 rounded ${viewMode === "list" ? "bg-secondary/10 text-secondary" : "text-muted-foreground"}`}><List size={16} /></button>
          </div>
        </div>
      </div>

      {/* Results */}
      <p className="font-inter text-sm text-muted-foreground">{filtered.length} résultat(s)</p>

      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
        {filtered.map(r => (
          <div key={r.id} className="group bg-background rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            {/* Card Header with Type-based Color Accent */}
            <div className={`h-1.5 w-full ${typeColors[r.type as keyof typeof typeColors].split(' ')[0]}`} />

            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300 ${typeColors[r.type as keyof typeof typeColors]}`}>
                  <FileText size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${typeColors[r.type as keyof typeof typeColors]}`}>
                      {r.type}
                    </span>
                  </div>
                  <h3 className="font-poppins font-bold text-base text-foreground line-clamp-2 leading-tight group-hover:text-secondary transition-colors italic">
                    {r.titre}
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-secondary" />
                  <p className="font-inter text-xs font-semibold text-muted-foreground uppercase">{r.matiere}</p>
                </div>

                <div className="grid grid-cols-2 gap-y-2 py-3 border-y border-border/50">
                  <div className="space-y-0.5">
                    <p className="font-inter text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Enseignant</p>
                    <p className="font-inter text-xs text-foreground truncate">{r.enseignant}</p>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <p className="font-inter text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Mis en ligne</p>
                    <p className="font-inter text-xs text-foreground">{r.date}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-inter text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Volume</p>
                    <p className="font-inter text-xs text-foreground">{r.taille} · {r.pages} p.</p>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <p className="font-inter text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Stats</p>
                    <p className="font-inter text-xs text-foreground font-semibold text-secondary">{r.telechargements} DLs</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-poppins text-xs font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
                  <Download size={14} /> Télécharger
                </button>
                <div className="flex gap-1.5">
                  <button title="Aperçu" className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-secondary hover:border-secondary transition-all hover:bg-secondary/5"><Eye size={16} /></button>
                  <button title="Ajouter aux favoris" className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-all hover:bg-destructive/5"><Heart size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EFriResources;
