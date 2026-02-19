import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { registeredUsers } from "@/data/mockData";

const EFriLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const errs: typeof errors = {};
    if (!email) errs.email = "L'email est requis";
    else if (!email.endsWith("@ifri.uac.bj")) errs.email = "L'email doit se terminer par @ifri.uac.bj";
    if (!password) errs.password = "Le mot de passe est requis";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    const storedUsers = JSON.parse(localStorage.getItem("unilib_users") || "[]");
    const allUsers = [...registeredUsers, ...storedUsers];
    const user = allUsers.find(u => u.email === email.toLowerCase() && u.password === password);

    setLoading(false);

    if (user) {
      localStorage.setItem("unilib_session", JSON.stringify(user));
      toast({ title: "Connexion réussie", description: `Ravi de vous revoir, ${user.prenom} !` });
      navigate("/e-fri/dashboard");
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect.",
        variant: "destructive"
      });
      setErrors({ email: "Identifiants invalides" });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[40%] bg-secondary items-center justify-center p-12">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="16" cy="24" r="12" fill="white" opacity="0.3" />
              <circle cx="24" cy="24" r="12" fill="white" opacity="0.25" />
              <circle cx="20" cy="14" r="12" fill="white" opacity="0.35" />
            </svg>
            <span className="font-poppins text-2xl text-secondary-foreground">
              <span className="font-medium opacity-80">e-</span>
              <span className="font-bold">FRI</span>
            </span>
          </div>
          <p className="font-inter text-sm text-secondary-foreground opacity-80 max-w-xs">
            "La connaissance est la clé de la réussite. Accédez à toutes vos ressources académiques en un clic."
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <circle cx="16" cy="24" r="12" fill="#3D5AFE" opacity="0.85" />
              <circle cx="24" cy="24" r="12" fill="#FF9800" opacity="0.75" />
              <circle cx="20" cy="14" r="12" fill="#69F0AE" opacity="0.8" />
            </svg>
            <span className="font-poppins text-xl">
              <span className="font-medium text-muted-foreground">e-</span>
              <span className="font-bold text-foreground">FRI</span>
            </span>
          </div>

          <h2 className="font-poppins font-bold text-2xl text-foreground mb-1">Bienvenue sur e-FRI</h2>
          <p className="font-inter text-sm text-muted-foreground mb-8">
            Connectez-vous pour accéder à vos ressources
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-inter text-sm text-foreground mb-1.5 block">Email institutionnel</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@ifri.uac.bj"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border font-inter text-sm text-foreground bg-background outline-none transition-colors ${errors.email ? "border-destructive border-2" : "border-input focus:border-secondary focus:border-2"
                    }`}
                />
              </div>
              {errors.email && <p className="font-inter text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="font-inter text-sm text-foreground mb-1.5 block">Mot de passe</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border font-inter text-sm text-foreground bg-background outline-none transition-colors ${errors.password ? "border-destructive border-2" : "border-input focus:border-secondary focus:border-2"
                    }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="font-inter text-xs text-destructive mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded border-input accent-primary" />
                <span className="font-inter text-sm text-foreground">Se souvenir de moi</span>
              </label>
              <a href="#" className="font-inter text-sm text-secondary hover:underline">Mot de passe oublié ?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-inter text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="font-inter text-xs text-muted-foreground">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-center font-inter text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link to="/e-fri/inscription" className="text-secondary hover:underline font-medium">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EFriLogin;
