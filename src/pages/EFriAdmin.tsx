import { useState } from "react";
import { Users, BookOpen, Clock, Download, Check, X, TrendingUp, BarChart3 } from "lucide-react";
import { adminStats, contributionsEnAttente, resources } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const EFriAdmin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [contributions, setContributions] = useState(contributionsEnAttente);
  const { toast } = useToast();

  const handleApprove = (id: string) => {
    setContributions(c => c.filter(x => x.id !== id));
    toast({ title: "Approuvée", description: "La contribution a été publiée." });
  };

  const handleReject = (id: string) => {
    setContributions(c => c.filter(x => x.id !== id));
    toast({ title: "Rejetée", description: "La contribution a été supprimée." });
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <h1 className="font-poppins font-semibold text-2xl text-foreground">Administration</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: "Utilisateurs", value: adminStats.utilisateurs.toLocaleString(), icon: Users, color: "text-secondary" },
          { label: "Ressources", value: adminStats.ressources.toLocaleString(), icon: BookOpen, color: "text-primary" },
          { label: "En attente", value: adminStats.contributionsEnAttente.toString(), icon: Clock, color: "text-accent" },
          { label: "Téléchargements", value: adminStats.telechargements.toLocaleString(), icon: Download, color: "text-secondary" },
        ].map(kpi => (
          <div key={kpi.label} className="bg-background rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="font-inter text-sm text-muted-foreground">{kpi.label}</span>
              <kpi.icon size={18} className={kpi.color} />
            </div>
            <p className="font-poppins font-bold text-2xl text-foreground">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-lg p-0.5">
        {[
          { id: "overview", label: "Vue d'ensemble" },
          { id: "moderation", label: `Modération (${contributions.length})` },
          { id: "users", label: "Utilisateurs" },
          { id: "resources", label: "Ressources" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-md font-inter text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>{tab.label}</button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
            <h3 className="font-poppins font-semibold text-base text-foreground mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-secondary" /> Activité utilisateurs
            </h3>
            <div className="space-y-3">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((j, i) => {
                const width = [75, 90, 60, 85, 95, 40, 25][i];
                return (
                  <div key={j} className="flex items-center gap-3">
                    <span className="font-inter text-xs text-muted-foreground w-8">{j}</span>
                    <div className="flex-1 h-5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: `${width}%` }} />
                    </div>
                    <span className="font-inter text-xs text-muted-foreground w-8">{width}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
            <h3 className="font-poppins font-semibold text-base text-foreground mb-4 flex items-center gap-2">
              <BarChart3 size={16} className="text-primary" /> Top ressources
            </h3>
            <div className="space-y-3">
              {resources.sort((a, b) => b.telechargements - a.telechargements).slice(0, 5).map((r, i) => (
                <div key={r.id} className="flex items-center gap-3 py-1">
                  <span className="font-poppins font-bold text-sm text-muted-foreground w-5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-inter text-sm text-foreground truncate">{r.titre}</p>
                    <p className="font-inter text-xs text-muted-foreground">{r.matiere}</p>
                  </div>
                  <span className="font-inter text-xs text-muted-foreground flex items-center gap-1">
                    <Download size={12} /> {r.telechargements}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Moderation */}
      {activeTab === "moderation" && (
        <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-inter text-xs text-muted-foreground font-medium">Titre</th>
                  <th className="text-left p-4 font-inter text-xs text-muted-foreground font-medium">Contributeur</th>
                  <th className="text-left p-4 font-inter text-xs text-muted-foreground font-medium">Type</th>
                  <th className="text-left p-4 font-inter text-xs text-muted-foreground font-medium">Filière</th>
                  <th className="text-left p-4 font-inter text-xs text-muted-foreground font-medium">Date</th>
                  <th className="text-right p-4 font-inter text-xs text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map(c => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-inter text-sm text-foreground">{c.titre}</td>
                    <td className="p-4 font-inter text-sm text-muted-foreground">{c.contributeur}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded text-[11px] font-inter font-medium bg-[#E3F2FD] text-secondary">{c.type}</span></td>
                    <td className="p-4 font-inter text-sm text-muted-foreground">{c.filiere}</td>
                    <td className="p-4 font-inter text-sm text-muted-foreground">{c.date}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleApprove(c.id)} className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"><Check size={14} /></button>
                        <button onClick={() => handleReject(c.id)} className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"><X size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {contributions.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center font-inter text-sm text-muted-foreground">Aucune contribution en attente</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Users */}
      {activeTab === "users" && (
        <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
          <h3 className="font-poppins font-semibold text-base text-foreground mb-4">Gestion des utilisateurs</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-inter text-xs text-muted-foreground font-medium">Nom</th>
                  <th className="text-left p-3 font-inter text-xs text-muted-foreground font-medium">Email</th>
                  <th className="text-left p-3 font-inter text-xs text-muted-foreground font-medium">Filière</th>
                  <th className="text-left p-3 font-inter text-xs text-muted-foreground font-medium">Rôle</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nom: "Marcel AHOUANDJINOU", email: "marcel.a@ifri.uac.bj", filiere: "GL · L3", role: "Étudiant" },
                  { nom: "Aïcha SANNI", email: "aicha.s@ifri.uac.bj", filiere: "SR · L2", role: "Étudiant" },
                  { nom: "Prof. GANGBE", email: "gangbe@ifri.uac.bj", filiere: "GL", role: "Enseignant" },
                  { nom: "Admin IFRI", email: "admin@ifri.uac.bj", filiere: "-", role: "Admin" },
                ].map((u, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="p-3 font-inter text-sm text-foreground">{u.nom}</td>
                    <td className="p-3 font-inter text-sm text-muted-foreground">{u.email}</td>
                    <td className="p-3 font-inter text-sm text-muted-foreground">{u.filiere}</td>
                    <td className="p-3"><span className={`px-2 py-0.5 rounded text-[11px] font-inter font-medium ${u.role === "Admin" ? "bg-accent/15 text-accent" : u.role === "Enseignant" ? "bg-primary/15 text-primary" : "bg-[#E3F2FD] text-secondary"}`}>{u.role}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resources */}
      {activeTab === "resources" && (
        <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
          <h3 className="font-poppins font-semibold text-base text-foreground mb-4">Gestion des ressources</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-inter text-xs text-muted-foreground font-medium">Titre</th>
                  <th className="text-left p-3 font-inter text-xs text-muted-foreground font-medium">Type</th>
                  <th className="text-left p-3 font-inter text-xs text-muted-foreground font-medium">Filière</th>
                  <th className="text-left p-3 font-inter text-xs text-muted-foreground font-medium">Téléch.</th>
                </tr>
              </thead>
              <tbody>
                {resources.map(r => (
                  <tr key={r.id} className="border-b border-border last:border-0">
                    <td className="p-3 font-inter text-sm text-foreground">{r.titre}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-[11px] font-inter font-medium bg-[#E3F2FD] text-secondary">{r.type}</span></td>
                    <td className="p-3 font-inter text-sm text-muted-foreground">{r.filiere}</td>
                    <td className="p-3 font-inter text-sm text-muted-foreground">{r.telechargements}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EFriAdmin;
