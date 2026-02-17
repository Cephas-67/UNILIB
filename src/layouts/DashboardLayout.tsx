import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, FolderKanban, Calendar, Bot, Upload, Settings, LogOut, Search, Bell, Menu, X } from "lucide-react";
import EFriLogo from "@/components/EFriLogo";
import { currentUser } from "@/data/mockData";

const navItems = [
  { label: "Tableau de bord", icon: LayoutDashboard, path: "/e-fri/dashboard" },
  { label: "Ressources", icon: BookOpen, path: "/e-fri/ressources" },
  { label: "Projets", icon: FolderKanban, path: "/e-fri/projets" },
  { label: "Emploi du Temps", icon: Calendar, path: "/e-fri/emploi-du-temps" },
  { label: "IA Assistant", icon: Bot, path: "/e-fri/ia" },
  { label: "Contribuer", icon: Upload, path: "/e-fri/contribuer" },
  { label: "Paramètres", icon: Settings, path: "/e-fri/profil" },
];

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-[#F5F5F5]">
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
              {currentUser.prenom[0]}{currentUser.nom[0]}
            </div>
            <div>
              <p className="font-poppins font-semibold text-sm text-foreground">{currentUser.prenom} {currentUser.nom}</p>
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-inter bg-[#E3F2FD] text-secondary">{currentUser.filiere} · {currentUser.promotion}</span>
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-inter text-sm transition-colors ${
                isActive(item.path)
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
            <button className="relative text-foreground hover:text-secondary transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-[10px] text-accent-foreground flex items-center justify-center font-bold">3</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-poppins font-bold text-xs">
              {currentUser.prenom[0]}{currentUser.nom[0]}
            </div>
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
            className={`flex-1 flex flex-col items-center py-2 text-[10px] font-inter ${
              isActive(item.path) ? "text-secondary" : "text-muted-foreground"
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
