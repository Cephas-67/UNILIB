import { useState, useEffect } from "react";
import {
  Download, Heart, Upload, FolderKanban,
  Bell, Shield, Trash2, Check, Moon, Sun, Lock, Eye, EyeOff, X, Clock
} from "lucide-react";
import { useSession, User as UserType } from "@/hooks/use-session";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";
import { useUserStats } from "@/hooks/useUserStats";
import { useUserActivities, ActivityType } from "@/hooks/useUserActivities";

const tabs = ["Informations", "Activité", "Statistiques", "Paramètres"];

// Map activity types to icons and colors
const ACTIVITY_META: Record<ActivityType, { icon: typeof Download; color: string }> = {
  download: { icon: Download, color: "text-secondary" },
  favorite: { icon: Heart, color: "text-accent" },
  upload: { icon: Upload, color: "text-primary" },
  project: { icon: FolderKanban, color: "text-secondary" },
};

// Format a stored ISO date to a relative label
function relativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `Il y a ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Il y a ${hrs} heure${hrs > 1 ? "s" : ""}`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Hier";
  return `Il y a ${days} jours`;
}

// ─── Password Modal ───────────────────────────────────────────────────────────
interface PasswordModalProps {
  onClose: () => void;
  onSave: (old: string, next: string) => boolean;
}

const PasswordModal = ({ onClose, onSave }: PasswordModalProps) => {
  const [form, setForm] = useState({ old: "", next: "", confirm: "" });
  const [show, setShow] = useState({ old: false, next: false, confirm: false });
  const [error, setError] = useState("");

  const toggleShow = (field: keyof typeof show) =>
    setShow(s => ({ ...s, [field]: !s[field] }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.old || !form.next || !form.confirm) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    if (form.next.length < 6) {
      setError("Le nouveau mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (form.next !== form.confirm) {
      setError("La confirmation ne correspond pas au nouveau mot de passe.");
      return;
    }

    const ok = onSave(form.old, form.next);
    if (!ok) {
      setError("L'ancien mot de passe est incorrect.");
    }
  };

  const fields: { label: string; key: keyof typeof form; placeholder: string }[] = [
    { label: "Ancien mot de passe", key: "old", placeholder: "••••••••" },
    { label: "Nouveau mot de passe", key: "next", placeholder: "Minimum 6 caractères" },
    { label: "Confirmer le nouveau mot de passe", key: "confirm", placeholder: "••••••••" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-background rounded-2xl border border-border shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lock size={18} className="text-primary" />
            </div>
            <h2 className="font-poppins font-bold text-lg text-foreground">
              Changer le mot de passe
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {fields.map(f => (
            <div key={f.key} className="space-y-1.5">
              <label className="font-inter text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {f.label}
              </label>
              <div className="relative">
                <input
                  type={show[f.key] ? "text" : "password"}
                  value={form[f.key]}
                  onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full px-3 py-2.5 pr-10 rounded-lg border border-border bg-muted/20 font-inter text-sm
                             outline-none focus:border-secondary transition-all placeholder:text-muted-foreground/50"
                />
                <button
                  type="button"
                  onClick={() => toggleShow(f.key)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {show[f.key] ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}

          {error && (
            <p className="font-inter text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-lg border border-destructive/20">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-border font-inter text-sm text-muted-foreground hover:bg-muted transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-inter text-sm font-bold
                         shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Check size={15} /> Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const EFriProfile = () => {
  const { user, updateSession, loading } = useSession();
  const [activeTab, setActiveTab] = useState("Informations");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<UserType | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifs, setNotifs] = useState({ resources: true, projects: true, ai: false });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  // Stats & activities (tied to logged-in user's email)
  const { stats } = useUserStats(user?.email);
  const { activities } = useUserActivities(user?.email);

  useEffect(() => {
    if (!loading && !user) navigate("/e-fri/connexion");
  }, [user, loading, navigate]);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  const handleSaveProfile = () => {
    if (form) {
      updateSession(form);
      setEditing(false);
      toast({ title: "Profil mis à jour", description: "Vos modifications ont été enregistrées avec succès." });
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    toast({ title: newMode ? "Mode sombre activé" : "Mode clair activé" });
  };

  const handleDeleteAccount = () => {
    toast({ title: "Compte supprimé", description: "Au revoir !", variant: "destructive" });
    navigate("/e-fri");
  };

  const toggleNotif = (key: keyof typeof notifs) =>
    setNotifs(n => ({ ...n, [key]: !n[key] }));

  // Returns true if old password matches, saves if so
  const handlePasswordSave = (oldPwd: string, newPwd: string): boolean => {
    const storedPwd = user?.password ?? "";

    // If no password was ever stored, any "old" value is accepted
    if (storedPwd && storedPwd !== oldPwd) return false;

    updateSession({ password: newPwd });
    setShowPasswordModal(false);
    toast({
      title: "Mot de passe mis à jour",
      description: "Votre mot de passe a été changé avec succès.",
    });
    return true;
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary" />
      </div>
    );
  }

  // Stats display config
  const statsConfig = [
    { label: "Téléchargements", value: stats.downloads, color: "text-secondary" },
    { label: "Favoris", value: stats.favorites, color: "text-accent" },
    { label: "Contributions", value: stats.contributions, color: "text-primary" },
    { label: "Projets", value: stats.projects, color: "text-secondary" },
  ];

  return (
    <>
      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSave={handlePasswordSave}
        />
      )}

      <div className="relative">
        <div
          className={`max-w-4xl mx-auto space-y-6 pb-20 lg:pb-0 transition-all duration-300 ${showDeleteConfirm ? "blur-md scale-[0.98] pointer-events-none" : ""
            }`}
        >
          {/* Header */}
          <div className="bg-background rounded-xl border border-border p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-poppins font-bold text-2xl">
                {user.prenom[0]}{user.nom[0]}
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="font-poppins font-bold text-xl text-foreground">{user.prenom} {user.nom}</h1>
              <p className="font-inter text-sm text-muted-foreground">
                Étudiant · {user.filiere}
              </p>
              <p className="font-inter text-xs text-muted-foreground mt-1">{user.email}</p>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-3 rounded-xl border border-border bg-muted/30 text-foreground hover:bg-muted transition-all group active:scale-90"
            >
              {darkMode
                ? <Sun size={20} className="text-yellow-500 transition-all duration-500 group-hover:rotate-90" />
                : <Moon size={20} className="text-secondary transition-all duration-500 group-hover:-rotate-12" />}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-muted rounded-lg p-0.5 overflow-x-auto scroller-hide">
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-md font-inter text-sm font-medium whitespace-nowrap transition-all ${activeTab === t
                  ? "bg-background text-foreground shadow-sm scale-105"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">

            {/* ── Informations ── */}
            {activeTab === "Informations" && (
              <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-poppins font-semibold text-lg text-foreground">Informations personnelles</h2>
                  <button
                    onClick={() => setEditing(!editing)}
                    className="px-4 py-2 rounded-lg border border-border font-inter text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    {editing ? "Annuler" : "Modifier"}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    { label: "Nom", key: "nom" },
                    { label: "Prénom", key: "prenom" },
                    { label: "Email", key: "email" },
                    { label: "Filière", key: "filiere" },
                  ].map(field => (
                    <div key={field.key} className="space-y-1.5">
                      <label className="font-inter text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        {field.label}
                      </label>
                      {editing ? (
                        <input
                          value={(form as any)[field.key]}
                          onChange={e => setForm(f => ({ ...f!, [field.key]: e.target.value }))}
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

            {/* ── Activité ── */}
            {activeTab === "Activité" && (
              <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-4">
                <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">Historique récent</h2>

                {activities.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
                    <Clock size={36} className="opacity-30" />
                    <p className="font-inter text-sm">Aucune activité récente</p>
                    <p className="font-inter text-xs opacity-60 text-center max-w-xs">
                      Vos téléchargements, favoris et contributions apparaîtront ici.
                    </p>
                  </div>
                ) : (
                  activities.map((item, i) => {
                    const meta = ACTIVITY_META[item.type];
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-4 py-3 border-b border-border last:border-0 group cursor-default"
                      >
                        <div className={`w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${meta.color}`}>
                          <meta.icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-inter text-sm text-foreground font-medium truncate">{item.text}</p>
                          <p className="font-inter text-xs text-muted-foreground">{relativeDate(item.date)}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* ── Statistiques ── */}
            {activeTab === "Statistiques" && (
              <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
                <h2 className="font-poppins font-semibold text-lg text-foreground mb-4">Aperçu analytique</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {statsConfig.map(s => (
                    <div
                      key={s.label}
                      className="text-center p-6 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-all"
                    >
                      <p className={`font-poppins font-bold text-3xl mb-1 ${s.color}`}>{s.value}</p>
                      <p className="font-inter text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Paramètres ── */}
            {activeTab === "Paramètres" && (
              <div className="space-y-4">
                {/* Notifications */}
                <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-4">
                  <h2 className="font-poppins font-semibold text-lg text-foreground flex items-center gap-2">
                    <Bell size={18} /> Préférences de notification
                  </h2>
                  {[
                    { label: "Nouvelles ressources", key: "resources" },
                    { label: "Mises à jour projets", key: "projects" },
                    { label: "Messages IA", key: "ai" },
                  ].map(n => (
                    <label key={n.key} className="flex items-center justify-between py-2 cursor-pointer group">
                      <span className="font-inter text-sm text-foreground group-hover:text-secondary transition-colors">
                        {n.label}
                      </span>
                      <div
                        onClick={() => toggleNotif(n.key as keyof typeof notifs)}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${notifs[n.key as keyof typeof notifs] ? "bg-primary" : "bg-muted-foreground/30"
                          }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 shadow-sm ${notifs[n.key as keyof typeof notifs] ? "right-1" : "left-1"
                            }`}
                        />
                      </div>
                    </label>
                  ))}
                </div>

                {/* Sécurité */}
                <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
                  <h2 className="font-poppins font-semibold text-lg text-foreground flex items-center gap-2 group">
                    <Shield size={18} className="group-hover:text-secondary transition-colors" />
                    Confidentialité &amp; Sécurité
                  </h2>
                  <p className="font-inter text-xs text-muted-foreground mt-1 mb-4">
                    Gérez la protection de vos données institutionnelles.
                  </p>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2.5 rounded-lg border border-border font-inter text-sm font-bold text-foreground
                               hover:bg-muted hover:border-secondary transition-all active:scale-95 flex items-center gap-2"
                  >
                    <Lock size={15} /> Changer le mot de passe
                  </button>
                </div>

                {/* Zone de danger */}
                <div className="bg-background rounded-xl border border-destructive/20 p-6 shadow-sm overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-destructive/5 rounded-full -mr-16 -mt-16" />
                  <h2 className="font-poppins font-semibold text-lg text-destructive flex items-center gap-2">
                    <Trash2 size={18} /> Zone de danger
                  </h2>
                  <p className="font-inter text-xs text-muted-foreground mt-1 mb-6">
                    La suppression de votre compte entraînera la perte définitive de toutes vos données académiques.
                  </p>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-6 py-3 rounded-xl bg-destructive text-destructive-foreground font-poppins text-xs font-bold
                               shadow-lg shadow-destructive/20 hover:opacity-90 transition-all active:scale-95"
                  >
                    Supprimer définitivement mon compte
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Delete Confirm Dialog */}
          <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
            <AlertDialogContent className="max-w-[450px] rounded-2xl border-destructive/20 animate-in fade-in zoom-in duration-300">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-poppins font-bold text-xl text-destructive flex items-center gap-2">
                  <AlertCircle size={22} /> Action Irréversible
                </AlertDialogTitle>
                <AlertDialogDescription className="font-inter text-muted-foreground pt-2">
                  Êtes-vous absolument sûr de vouloir supprimer votre compte ? Toutes vos ressources téléversées,
                  vos cours enregistrés et votre progression seront <strong>définitivement perdus</strong>. Cette
                  action ne peut pas être annulée.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="gap-2 sm:gap-0 mt-4">
                <AlertDialogCancel className="rounded-xl font-inter border-border hover:bg-muted">
                  Annuler
                </AlertDialogCancel>
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
    </>
  );
};

export default EFriProfile;
