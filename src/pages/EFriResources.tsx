import { useState } from "react";
import { Download, Eye, Heart, Share2, FileText, Grid, List, Search, Clock, Trash2 } from "lucide-react";
import { resources } from "@/data/mockData";
import { useSession } from "@/hooks/use-session";
import { useToast } from "@/hooks/use-toast";

const typeColors: Record<string, string> = {
  Cours: "bg-[#E3F2FD] text-secondary",
  Examen: "bg-[#FFF3E0] text-accent",
  TD: "bg-[#E8F5E9] text-primary",
  TP: "bg-[#E8F5E9] text-[#66BB6A]",
  Rattrapage: "bg-[#FFF3E0] text-accent",
  Correction: "bg-[#E3F2FD] text-secondary",
};

const formatIcons: Record<string, string> = { PDF: "#F44336", DOCX: "#2196F3", ZIP: "#FF9800" };

const filieres = ["Tous", "Genie Logiciel", "Intelligence Artificielle", "Securite Informatique", "SEiot", "Internet Multimedia"];
const promotions = ["Tous", "L1", "L2", "L3", "M1", "M2"];
const semestres = ["Tous", "S1", "S2"];
const types = ["Tous", "Cours", "TD", "TP", "Examen", "Rattrapage", "Correction"];

const EFriResources = () => {
  const { user } = useSession();
  const { toast } = useToast();
  const [filiere, setFiliere] = useState("Tous");
  const [promotion, setPromotion] = useState("Tous");
  const [semestre, setSemestre] = useState("Tous");
  const [typeFilter, setTypeFilter] = useState("Tous");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const isAdmin = user?.role === "admin";

  // Load from localStorage + mockData
  const [allResources, setAllResources] = useState(() => {
    const stored = localStorage.getItem("unilib_resources");
    const parsed = stored ? JSON.parse(stored) : [];
    return [...resources, ...parsed];
  });

  const filtered = allResources.filter(r => {
    if (filiere !== "Tous" && r.filiere !== filiere) return false;
    if (promotion !== "Tous" && r.promotion !== promotion) return false;
    if (semestre !== "Tous" && r.semestre !== semestre) return false;
    if (typeFilter !== "Tous" && r.type !== typeFilter) return false;
    const searchLow = search.toLowerCase();
    if (search && !r.titre.toLowerCase().includes(searchLow) && !r.matiere.toLowerCase().includes(searchLow)) return false;
    return true;
  });

  const trackDownload = () => {
    if (!user?.email) return;
    const key = `unilib_download_count_${user.email}`;
    const count = parseInt(localStorage.getItem(key) || "0");
    localStorage.setItem(key, (count + 1).toString());
  };

  const handleDownload = (r: any) => {
    trackDownload();
    // If it's a real file (Data URL or Blob URL), download it
    if (r.fileUrl) {
      const link = document.createElement("a");
      link.href = r.fileUrl;
      link.download = `${r.titre}.${r.format || 'pdf'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // For mock data, simulate download
      const blob = new Blob(["Contenu du document de simulation"], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${r.titre}.txt`;
      link.click();
    }
  };

  const handleDelete = (id: string) => {
    const updated = allResources.filter(r => r.id !== id);
    setAllResources(updated);

    // Also update localStorage (only for user-added resources)
    const stored = localStorage.getItem("unilib_resources");
    if (stored) {
      const parsed = JSON.parse(stored);
      const filtered = parsed.filter((r: any) => r.id !== id);
      localStorage.setItem("unilib_resources", JSON.stringify(filtered));
    }

    toast({
      title: "Ressource supprimée",
      description: "Le document a été retiré de la bibliothèque.",
    });
  };

  const selectClass = "px-3 py-2 rounded-lg border border-border bg-background font-inter text-sm outline-none focus:border-secondary transition-all";

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Filters */}
      <div className="bg-background rounded-xl border border-border p-4 shadow-sm lg:sticky lg:top-16 z-20 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-3">
          <select value={filiere} onChange={e => setFiliere(e.target.value)} className={selectClass}>
            {filieres.map(f => <option key={f}>{f}</option>)}
          </select>
          <select value={promotion} onChange={e => setPromotion(e.target.value)} className={selectClass}>
            {promotions.map(p => <option key={p}>{p}</option>)}
          </select>
          <select value={semestre} onChange={e => setSemestre(e.target.value)} className={selectClass}>
            {semestres.map(s => <option key={s}>{s}</option>)}
          </select>
          <div className="relative flex-1 min-w-0 sm:col-span-2 lg:col-span-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background font-inter text-sm outline-none focus:border-secondary shadow-inner"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar mask-fade-right">
            {types.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)} className={`px-4 py-1.5 rounded-lg border font-inter text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${typeFilter === t ? "bg-secondary border-secondary text-secondary-foreground shadow-md shadow-secondary/20" : "bg-background border-border text-muted-foreground hover:bg-muted"}`}>{t}</button>
            ))}
          </div>
          <div className="flex gap-1 bg-muted/50 p-1 rounded-lg self-end sm:self-auto">
            <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded ${viewMode === "grid" ? "bg-background text-secondary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><Grid size={16} /></button>
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded ${viewMode === "list" ? "bg-background text-secondary shadow-sm" : "text-muted-foreground hover:text-foreground"}`}><List size={16} /></button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="font-inter text-sm text-muted-foreground"><span className="font-bold text-foreground">{filtered.length}</span> documents trouvés</p>
      </div>

      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" : "space-y-3"}>
        {filtered.map(r => (
          <div key={r.id} className="group bg-background rounded-xl border border-border overflow-hidden hover:border-secondary hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ${typeColors[r.type as keyof typeof typeColors] || "bg-muted text-muted-foreground"}`}>
                  <FileText size={22} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.1em]">{r.matiere}</span>
                  </div>
                  <h3 className="font-poppins font-semibold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-secondary transition-colors">
                    {r.titre}
                  </h3>
                </div>
                {isAdmin && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(r.id); }}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/5"
                    title="Supprimer la ressource"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <span className="font-inter text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                    <Clock size={12} /> {r.date}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${typeColors[r.type as keyof typeof typeColors] || "bg-muted text-muted-foreground"}`}>
                    {r.type}
                  </span>
                </div>

                <button
                  onClick={() => handleDownload(r)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 font-inter text-[11px] font-bold"
                >
                  <Download size={14} /> Télécharger
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EFriResources;
