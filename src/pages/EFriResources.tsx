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

      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" : "space-y-3"}>
        {filtered.map(r => (
          <div key={r.id} className="bg-background rounded-xl border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: formatIcons[r.format] || "#9E9E9E" }}>
                <FileText size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-inter font-medium ${typeColors[r.type]}`}>{r.type}</span>
                  {r.nouveau && <span className="px-2 py-0.5 rounded text-[11px] font-inter font-medium bg-accent text-accent-foreground">Nouveau</span>}
                </div>
                <h3 className="font-poppins font-medium text-[15px] text-foreground line-clamp-2">{r.titre}</h3>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              <p className="font-inter text-xs text-muted-foreground">📚 {r.matiere} · 👨‍🏫 {r.enseignant}</p>
              <p className="font-inter text-xs text-muted-foreground">📅 {r.date} · 📄 {r.pages} pages · 💾 {r.taille}</p>
              <p className="font-inter text-xs text-muted-foreground">⬇️ {r.telechargements} téléchargements</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-primary-foreground font-inter text-xs font-medium hover:opacity-90 transition-opacity">
                <Download size={14} /> Télécharger
              </button>
              <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-secondary hover:border-secondary transition-colors"><Eye size={14} /></button>
              <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"><Heart size={14} /></button>
              <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-secondary hover:border-secondary transition-colors"><Share2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EFriResources;
