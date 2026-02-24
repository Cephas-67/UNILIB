import { BookOpen, FolderKanban, Calendar, Sparkles, TrendingUp, Clock, Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useSession } from "@/hooks/use-session";
import { useDataFetch } from "@/hooks/useDataFetch";
import { fetchResourceStats } from "@/services/dashboardService";

const EFriDashboard = () => {
  const { user } = useSession();


  // Fetch real dashboard stats from backend
  const { data: stats, loading, error } = useDataFetch(fetchResourceStats, []);


  if (loading) {
    return <div className="p-8 text-center">Chargement du tableau de bord...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">Erreur lors du chargement des statistiques.</div>;
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Greeting */}
      <h1 className="font-poppins font-semibold text-2xl text-secondary">
        Bienvenue, {user?.prenom || "Étudiant"} 👋
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
          <p className="font-poppins font-bold text-2xl text-foreground">{stats?.totalResources ?? 0}</p>
          <p className="font-inter text-xs text-muted-foreground mt-1">
            {stats?.recentResourcesCount ?? 0} nouvelles cette semaine
          </p>
        </div>

        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FolderKanban size={20} className="text-primary" />
            </div>
            <span className="font-inter text-sm text-muted-foreground">Cours pratiques</span>
          </div>
          <p className="font-poppins font-bold text-2xl text-foreground">{stats?.coursCount ?? 0}</p>
          <p className="font-inter text-xs text-muted-foreground mt-1">supports disponibles</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Calendar size={20} className="text-accent" />
            </div>
            <span className="font-inter text-sm text-muted-foreground">Prochain cours</span>
          </div>
          <p className="font-poppins font-bold text-lg text-foreground">Planning en attente</p>
          <p className="font-inter text-xs text-muted-foreground mt-1">Consultez l'emploi du temps</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <TrendingUp size={20} className="text-secondary" />
            </div>
            <span className="font-inter text-sm text-muted-foreground">Téléchargements</span>
          </div>
          <p className="font-poppins font-bold text-2xl text-foreground">{stats?.totalDownloads ?? 0}</p>
          <p className="font-inter text-xs text-muted-foreground mt-1">total effectués</p>
        </div>
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="font-poppins font-semibold text-lg text-foreground mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/e-fri/ressources" className="flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            <span className="font-inter text-sm font-medium">Accéder aux ressources</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/e-fri/cours-pratiques" className="flex items-center justify-between p-4 rounded-xl bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity">
            <span className="font-inter text-sm font-medium">Explorer les cours pratiques</span>
            <ArrowRight size={18} />
          </Link>
          <Link to="/e-fri/televerser" className="flex items-center justify-between p-4 rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition-opacity">
            <span className="font-inter text-sm font-medium">Téléverser une ressource</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EFriDashboard;
