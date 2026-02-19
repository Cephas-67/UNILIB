import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, FolderKanban, Calendar, Bot, Upload, Settings, LogOut, Search, Bell, Menu, X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import EFriLogo from "@/components/EFriLogo";
import { currentUser } from "@/data/mockData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const navItems = [
  { label: "Tableau de bord", icon: LayoutDashboard, path: "/e-fri/dashboard" },
  { label: "Ressources", icon: BookOpen, path: "/e-fri/ressources" },
  { label: "Projets", icon: FolderKanban, path: "/e-fri/projets" },
  { label: "Emploi du Temps", icon: Calendar, path: "/e-fri/emploi-du-temps" },
  { label: "IA Assistant", icon: Bot, path: "/e-fri/ia" },
  { label: "Téléverser", icon: Upload, path: "/e-fri/televerser" },
  { label: "Paramètres", icon: Settings, path: "/e-fri/profil" },
];

const mockNotifications = [
  { id: 1, title: "Nouveau cours disponible", description: "Le support de cours d'Architecture des Ordinateurs est en ligne.", time: "Il y a 10 min", type: "success", icon: CheckCircle2 },
  { id: 2, title: "Rappel examen", description: "L'examen de Génie Logiciel commence dans 48 heures.", time: "Il y a 2h", type: "warning", icon: AlertCircle },
  { id: 3, title: "Mise à jour projet", description: "Le projet 'Smart City' a été mis à jour avec de nouvelles ressources.", time: "Hier", type: "info", icon: Info },
];

import { useSession } from "@/hooks/use-session";

const DashboardLayout = () => {
  const { user } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-background border-r border-border flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-5 border-b border-border">
          <EFriLogo size="md" />
        </div>

        {/* User info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-poppins font-bold text-sm">
              {user?.prenom?.[0]}{user?.nom?.[0]}
            </div>
            <div>
              <p className="font-poppins font-semibold text-sm text-foreground">{user?.prenom} {user?.nom}</p>
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-inter bg-[#E3F2FD] text-secondary">{user?.filiere} · {user?.promotion}</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-inter text-sm transition-colors ${isActive(item.path)
                ? "bg-[#E3F2FD] text-secondary border-l-[3px] border-secondary font-medium"
                : "text-foreground hover:bg-muted"
                }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => navigate("/e-fri")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-inter text-sm text-destructive hover:bg-destructive/10 w-full transition-colors"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-background border-b border-border flex items-center px-4 lg:px-8 gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
            <Menu size={22} />
          </button>

          <div className="hidden md:block font-inter text-sm text-muted-foreground">
            e-FRI / <span className="text-foreground">{navItems.find(n => isActive(n.path))?.label || "Page"}</span>
          </div>

          <div className="flex-1 max-w-md mx-auto">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Rechercher..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background font-inter text-sm outline-none focus:border-secondary"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative text-foreground hover:text-secondary transition-colors outline-none">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-[10px] text-accent-foreground flex items-center justify-center font-bold">3</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 mr-4" align="end">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h4 className="font-poppins font-bold text-sm">Notifications</h4>
                  <button className="text-[10px] font-bold text-secondary uppercase tracking-wider hover:underline">Tout marquer comme lu</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {mockNotifications.map((notif) => (
                    <div key={notif.id} className="p-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer group">
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${notif.type === 'success' ? 'bg-primary/10 text-primary' :
                          notif.type === 'warning' ? 'bg-accent/10 text-accent' : 'bg-secondary/10 text-secondary'
                          }`}>
                          <notif.icon size={16} />
                        </div>
                        <div className="space-y-1">
                          <p className="font-poppins font-semibold text-xs text-foreground leading-tight group-hover:text-secondary transition-colors">{notif.title}</p>
                          <p className="font-inter text-[11px] text-muted-foreground line-clamp-2">{notif.description}</p>
                          <p className="font-inter text-[9px] text-muted-foreground font-bold uppercase">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="#" className="block p-3 text-center border-t border-border font-inter text-[10px] font-bold text-muted-foreground hover:text-secondary transition-colors">VOIR TOUTES LES NOTIFICATIONS</Link>
              </PopoverContent>
            </Popover>

            <Link to="/e-fri/profil" className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-poppins font-bold text-xs hover:ring-2 hover:ring-secondary/20 transition-all">
              {user?.prenom?.[0]}{user?.nom?.[0]}
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border flex lg:hidden">
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex-1 flex flex-col items-center py-2 text-[10px] font-inter ${isActive(item.path) ? "text-secondary" : "text-muted-foreground"
              }`}
          >
            <item.icon size={20} />
            <span className="mt-0.5">{item.label.split(" ")[0]}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DashboardLayout;
