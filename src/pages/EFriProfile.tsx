import { useState, useEffect } from "react";
import { Download, Heart, Upload, FolderKanban, Bell, Shield, Trash2, Check, Moon, Sun } from "lucide-react";
import { useSession, User as UserType } from "@/hooks/use-session";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

const tabs = ["Informations", "Activité", "Statistiques", "Paramètres"];

const EFriProfile = () => {
  const { user, updateSession, loading } = useSession();
  const [activeTab, setActiveTab] = useState("Informations");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<UserType | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifs, setNotifs] = useState({ resources: true, projects: true, ai: false });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/e-fri/connexion");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  const handleUpdateProfile = () => {
    if (form) {
      updateSession(form);
      setEditing(false);
      toast({ title: "Profil mis à jour", description: "Vos informations ont été enregistrées avec succès." });
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    toast({ title: newMode ? "Mode sombre activé" : "Mode clair activé" });
  };

  const handleSaveProfile = () => {
    if (form) {
      updateSession(form);
      setEditing(false);
      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées avec succès."
      });
    }
  };

  const handleDeleteAccount = () => {
    // Actual deletion logic (simulated)
    toast({ title: "Compte supprimé", description: "Au revoir !", variant: "destructive" });
    navigate("/e-fri");
  };

  const toggleNotif = (key: keyof typeof notifs) => {
    setNotifs(n => ({ ...n, [key]: !n[key] }));
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className={`max-w-4xl mx-auto space-y-6 pb-20 lg:pb-0 transition-all duration-300 ${showDeleteConfirm ? "blur-md scale-[0.98] pointer-events-none" : ""}`}>
        {/* Header */}
        <div className="bg-background rounded-xl border border-border p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-poppins font-bold text-2xl">
              {user.prenom[0]}{user.nom[0]}
            </div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="font-poppins font-bold text-xl text-foreground">{user.prenom} {user.nom}</h1>
            <p className="font-inter text-sm text-muted-foreground">Étudiant · {user.filiere} · {user.promotion}</p>
            <p className="font-inter text-xs text-muted-foreground mt-1">{user.email}</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-xl border border-border bg-muted/30 text-foreground hover:bg-muted transition-all group active:scale-90"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-500 transition-all duration-500 rotate-0 group-hover:rotate-90 animate-in zoom-in spin-in-90" />
            ) : (
              <Moon size={20} className="text-secondary transition-all duration-500 rotate-0 group-hover:-rotate-12 animate-in zoom-in spin-in-45" />
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-lg p-0.5 overflow-x-auto scroller-hide">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-md font-inter text-sm font-medium whitespace-nowrap transition-all ${activeTab === t ? "bg-background text-foreground shadow-sm scale-105" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {activeTab === "Informations" && (
            <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-poppins font-semibold text-lg text-foreground">Informations personnelles</h2>
                <button onClick={() => setEditing(!editing)} className="px-4 py-2 rounded-lg border border-border font-inter text-sm text-foreground hover:bg-muted transition-colors">
                  {editing ? "Annuler" : "Modifier"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {[
                  { label: "Nom", key: "nom" },
                  { label: "Prénom", key: "prenom" },
                  { label: "Email", key: "email" },
                  { label: "Filière", key: "filiere" },
                  { label: "Promotion", key: "promotion" },
                  { label: "Semestre", key: "semestre" }
                ].map(field => (
                  <div key={field.key} className="space-y-1.5">
                    <label className="font-inter text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{field.label}</label>
                    {editing ? (
                      <input
                        value={(form as any)[field.key]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-muted/20 font-inter text-sm outline-none focus:border-secondary transition-all"
                      />
                    ) : (
                      <p className="font-inter text-sm text-foreground bg-muted/10 px-3 py-2 rounded-lg border border-transparent">
                        {(user as any)[field.key]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              {editing && (
                <button
                  onClick={handleSaveProfile}
                  className="mt-4 flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-inter text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                >
                  <Check size={16} /> Enregistrer les modifications
                </button>
              )}
            </div>
          )}

          {activeTab === "Activité" && (
            <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-4">
              <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">Historique récent</h2>
              {[
                { icon: Download, text: "Téléchargé « Algorithmique Avancée - Cours Complet »", date: "Il y a 2 heures", color: "text-secondary" },
                { icon: Heart, text: "Ajouté « Examen Final - Base de Données » aux favoris", date: "Hier", color: "text-accent" },
                { icon: Upload, text: "Contribué « TD - Programmation C »", date: "Il y a 3 jours", color: "text-primary" },
                { icon: FolderKanban, text: "Commencé le projet « Application de Gestion Scolaire »", date: "Il y a 1 semaine", color: "text-secondary" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-border last:border-0 group cursor-default">
                  <div className={`w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-inter text-sm text-foreground font-medium truncate">{item.text}</p>
                    <p className="font-inter text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Statistiques" && (
            <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
              <h2 className="font-poppins font-semibold text-lg text-foreground mb-4">Aperçu analytique</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Téléchargements", value: "47", color: "text-secondary" },
                  { label: "Favoris", value: "12", color: "text-accent" },
                  { label: "Contributions", value: "3", color: "text-primary" },
                  { label: "Projets", value: "2", color: "text-secondary" },
                ].map(s => (
                  <div key={s.label} className="text-center p-6 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-all">
                    <p className={`font-poppins font-bold text-3xl mb-1 ${s.color}`}>{s.value}</p>
                    <p className="font-inter text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Paramètres" && (
            <div className="space-y-4">
              <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-4">
                <h2 className="font-poppins font-semibold text-lg text-foreground">Préférences de notification</h2>
                {[
                  { label: "Nouvelles ressources", key: "resources" },
                  { label: "Mises à jour projets", key: "projects" },
                  { label: "Messages IA", key: "ai" }
                ].map(n => (
                  <label key={n.key} className="flex items-center justify-between py-2 cursor-pointer group">
                    <span className="font-inter text-sm text-foreground group-hover:text-secondary transition-colors">{n.label}</span>
                    <div
                      onClick={() => toggleNotif(n.key as keyof typeof notifs)}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${notifs[n.key as keyof typeof notifs] ? "bg-primary" : "bg-muted-foreground/30"}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm ${notifs[n.key as keyof typeof notifs] ? "right-1" : "left-1"}`} />
                    </div>
                  </label>
                ))}
              </div>

              <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
                <h2 className="font-poppins font-semibold text-lg text-foreground flex items-center gap-2 group"><Shield size={18} className="group-hover:text-secondary transition-colors" /> Confidentialité & Sécurité</h2>
                <p className="font-inter text-xs text-muted-foreground mt-1 mb-4">Gérez la protection de vos données institutionnelles.</p>
                <button className="px-4 py-2.5 rounded-lg border border-border font-inter text-sm font-bold text-foreground hover:bg-muted hover:border-secondary transition-all active:scale-95">
                  Changer le mot de passe
                </button>
              </div>

              <div className="bg-background rounded-xl border border-destructive/20 p-6 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full -mr-16 -mt-16" />
                <h2 className="font-poppins font-semibold text-lg text-destructive flex items-center gap-2"><Trash2 size={18} /> Zone de danger</h2>
                <p className="font-inter text-xs text-muted-foreground mt-1 mb-6">La suppression de votre compte entraînera la perte définitive de toutes vos données académiques et contributions.</p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-6 py-3 rounded-xl bg-destructive text-destructive-foreground font-poppins text-xs font-bold shadow-lg shadow-destructive/20 hover:opacity-90 transition-all active:scale-95"
                >
                  Supprimer définitivement mon compte
                </button>
              </div>
            </div>
          )}
        </div>

        <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <AlertDialogContent className="max-w-[450px] rounded-2xl border-destructive/20 animate-in fade-in zoom-in duration-300">
            <AlertDialogHeader>
              <AlertDialogTitle className="font-poppins font-bold text-xl text-destructive flex items-center gap-2">
                <AlertCircle size={22} />
                Action Irréversible
              </AlertDialogTitle>
              <AlertDialogDescription className="font-inter text-muted-foreground pt-2">
                Êtes-vous absolument sûr de vouloir supprimer votre compte ? Toutes vos ressources téléversées, vos cours enregistrés et votre progression seront **définitivement perdus**. Cette action ne peut pas être annulée.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-2 sm:gap-0 mt-4">
              <AlertDialogCancel className="rounded-xl font-inter border-border hover:bg-muted">Annuler</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 font-inter font-bold"
              >
                Confirmer la suppression
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default EFriProfile;
