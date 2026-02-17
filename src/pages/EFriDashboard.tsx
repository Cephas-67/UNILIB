import { BookOpen, FolderKanban, Calendar, Sparkles, TrendingUp, Clock, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { currentUser, resources, projets, actualites } from "@/data/mockData";

const EFriDashboard = () => {
  const recentResources = resources.slice(0, 3);
  const activeProjects = projets.filter(p => p.progression > 0 && p.progression < 100).slice(0, 2);

  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      {/* Greeting */}
      <h1 className="font-poppins font-semibold text-2xl text-foreground">
        Bonjour, {currentUser.prenom} 👋
      </h1>

      {/* Widget cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <BookOpen size={20} className="text-secondary" />
            </div>
            <span className="font-inter text-sm text-muted-foreground">Dernières ressources</span>
          </div>
          <p className="font-poppins font-bold text-2xl text-foreground">12</p>
          <p className="font-inter text-xs text-muted-foreground mt-1">nouvelles cette semaine</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderKanban size={20} className="text-primary" />
            </div>
            <span className="font-inter text-sm text-muted-foreground">Projets en cours</span>
          </div>
          <p className="font-poppins font-bold text-2xl text-foreground">{activeProjects.length}</p>
          <p className="font-inter text-xs text-muted-foreground mt-1">en progression</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Calendar size={20} className="text-accent" />
            </div>
            <span className="font-inter text-sm text-muted-foreground">Prochain cours</span>
          </div>
          <p className="font-poppins font-bold text-lg text-foreground">Algo. Avancée</p>
          <p className="font-inter text-xs text-muted-foreground mt-1">Lundi 8h — Amphi A</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <TrendingUp size={20} className="text-secondary" />
            </div>
            <span className="font-inter text-sm text-muted-foreground">Téléchargements</span>
          </div>
          <p className="font-poppins font-bold text-2xl text-foreground">47</p>
          <p className="font-inter text-xs text-muted-foreground mt-1">ce mois-ci</p>
        </div>
      </div>

      {/* Recommendations IA */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={20} className="text-accent" />
          <h2 className="font-poppins font-semibold text-lg text-foreground">Recommandations IA</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentResources.map((r) => (
            <div key={r.id} className="bg-background rounded-xl border border-border p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
              <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-inter font-medium mb-2 ${
                r.type === "Cours" ? "bg-[#E3F2FD] text-secondary" :
                r.type === "Examen" ? "bg-[#FFF3E0] text-accent" :
                "bg-[#E8F5E9] text-primary"
              }`}>{r.type}</span>
              <h3 className="font-poppins font-medium text-sm text-foreground mb-1 line-clamp-2">{r.titre}</h3>
              <p className="font-inter text-xs text-muted-foreground mb-3">{r.matiere} · {r.enseignant}</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Download size={14} />
                <span className="font-inter text-xs">{r.telechargements} téléchargements</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fil d'actualité */}
      <section>
        <h2 className="font-poppins font-semibold text-lg text-foreground mb-4">Actualités</h2>
        <div className="space-y-3">
          {actualites.map((a) => (
            <div key={a.id} className="bg-background rounded-xl border border-border p-4 shadow-sm flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className={`w-2 h-2 rounded-full ${
                  a.type === "ressource" ? "bg-primary" :
                  a.type === "evenement" ? "bg-accent" :
                  a.type === "projet" ? "bg-secondary" : "bg-muted-foreground"
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-poppins font-medium text-sm text-foreground">{a.titre}</h3>
                <p className="font-inter text-xs text-muted-foreground mt-0.5">{a.description}</p>
                <p className="font-inter text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock size={12} /> {a.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="font-poppins font-semibold text-lg text-foreground mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/e-fri/ressources" className="flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            <span className="font-inter text-sm font-medium">Accéder aux ressources</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/e-fri/projets" className="flex items-center justify-between p-4 rounded-xl bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity">
            <span className="font-inter text-sm font-medium">Explorer les projets</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/e-fri/contribuer" className="flex items-center justify-between p-4 rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition-opacity">
            <span className="font-inter text-sm font-medium">Contribuer une ressource</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EFriDashboard;
