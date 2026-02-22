import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UniLibLogo from "@/components/UniLibLogo";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const filieres = ["Génie Logiciel", "Système-Réseau", "SEIoT", "Intelligence Artificielle"];
const promotions = ["L1", "L2", "L3", "M1", "M2"];
const semestres = ["S1", "S2"];

const getPasswordStrength = (pw: string) => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: "Faible", color: "#F44336", width: "33%" };
  if (score <= 2) return { label: "Moyen", color: "#FF9800", width: "66%" };
  return { label: "Fort", color: "#4CAF50", width: "100%" };
};

const EFriSignup = () => {
  const [form, setForm] = useState({
    nom: "", prenom: "", email: "", filiere: "", promotion: "", semestre: "",
    password: "", confirmPassword: "", cgu: false, role: "etudiant" as "etudiant" | "responsable", verificationCode: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const update = (key: string, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.nom.trim()) errs.nom = "Requis";
    if (!form.prenom.trim()) errs.prenom = "Requis";
    if (!form.email) errs.email = "Requis";
    if (!form.filiere) errs.filiere = "Requis";
    if (!form.promotion) errs.promotion = "Requis";
    if (!form.semestre) errs.semestre = "Requis";
    if (!form.password) errs.password = "Requis";
    else if (form.password.length < 8) errs.password = "Minimum 8 caractères";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Les mots de passe ne correspondent pas";
    if (form.role === "responsable") {
      if (!form.verificationCode) {
        errs.verificationCode = "Un code de vérification est requis";
      } else {
        const storedCodes = JSON.parse(localStorage.getItem("unilib_resp_codes") || "[]");
        const validCode = storedCodes.find((c: any) => c.code === form.verificationCode.toUpperCase() && !c.used);
        if (!validCode) errs.verificationCode = "Code invalide ou déjà utilisé";
      }
    }
    if (!form.cgu) errs.cgu = "Vous devez accepter les CGU";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    // Simuler l'enregistrement (localStorage persistence)
    const newUser = {
      email: form.email.toLowerCase(),
      password: form.password,
      nom: form.nom,
      prenom: form.prenom,
      filiere: form.filiere,
      promotion: form.promotion,
      semestre: form.semestre,
      role: form.role,
      status: "active" as const
    };

    const existingUsers = JSON.parse(localStorage.getItem("unilib_users") || "[]");
    localStorage.setItem("unilib_users", JSON.stringify([...existingUsers, newUser]));

    // Consume the code if it's a responsable
    if (form.role === "responsable") {
      const storedCodes = JSON.parse(localStorage.getItem("unilib_resp_codes") || "[]");
      const updatedCodes = storedCodes.map((c: any) =>
        c.code === form.verificationCode.toUpperCase() ? { ...c, used: true } : c
      );
      localStorage.setItem("unilib_resp_codes", JSON.stringify(updatedCodes));
    }

    setLoading(false);
    toast({
      title: "Inscription réussie",
      description: "Votre compte a été créé. Vous pouvez maintenant vous connecter !"
    });
    navigate("/e-fri/connexion");
  };

  const strength = getPasswordStrength(form.password);
  const isFormValid = form.nom && form.prenom && form.email && form.filiere && form.promotion && form.semestre && form.password && form.confirmPassword && form.cgu;

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg border font-inter text-sm text-foreground bg-background outline-none transition-colors ${errors[field] ? "border-destructive border-2" : "border-input focus:border-secondary focus:border-2"
    }`;

  const selectClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg border font-inter text-sm text-foreground bg-background outline-none transition-colors appearance-none ${errors[field] ? "border-destructive border-2" : "border-input focus:border-secondary focus:border-2"
    }`;

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[40%] bg-primary items-center justify-center p-12 relative">
        <div className="absolute top-4 left-4">
          <UniLibLogo size="small" />
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="16" cy="24" r="12" fill="white" opacity="0.3" />
              <circle cx="24" cy="24" r="12" fill="white" opacity="0.25" />
              <circle cx="20" cy="14" r="12" fill="white" opacity="0.35" />
            </svg>
            <span className="font-poppins text-2xl text-primary-foreground">
              <span className="font-medium opacity-80">e-</span>
              <span className="font-bold">FRI</span>
            </span>
          </div>
          <p className="font-inter text-sm text-primary-foreground opacity-80 max-w-xs">
            "Rejoignez la communauté e-FRI et accédez à des milliers de ressources académiques."
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <UniLibLogo size="small" />
          </div>
          <Link to="/e-fri" className="flex items-center gap-2 mb-4 lg:hidden hover:opacity-80 transition-opacity">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
              <circle cx="16" cy="24" r="12" fill="#3D5AFE" opacity="0.85" />
              <circle cx="24" cy="24" r="12" fill="#FF9800" opacity="0.75" />
              <circle cx="20" cy="14" r="12" fill="#69F0AE" opacity="0.8" />
            </svg>
            <span className="font-poppins text-lg">
              <span className="font-medium text-muted-foreground">e-</span>
              <span className="font-bold text-foreground">FRI</span>
            </span>
          </Link>

          <h2 className="font-poppins font-bold text-2xl text-foreground mb-1">Créer un compte e-FRI</h2>
          <p className="font-inter text-sm text-muted-foreground mb-8">Remplissez vos informations pour commencer</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-inter text-sm text-foreground mb-1.5 block">Nom</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input value={form.nom} onChange={(e) => update("nom", e.target.value)} placeholder="Votre nom" className={`${inputClass("nom")} pl-10`} />
                </div>
                {errors.nom && <p className="font-inter text-xs text-destructive mt-1">{errors.nom}</p>}
              </div>
              <div>
                <label className="font-inter text-sm text-foreground mb-1.5 block">Prénom</label>
                <input value={form.prenom} onChange={(e) => update("prenom", e.target.value)} placeholder="Votre prénom" className={inputClass("prenom")} />
                {errors.prenom && <p className="font-inter text-xs text-destructive mt-1">{errors.prenom}</p>}
              </div>
            </div>

            <div>
              <label className="font-inter text-sm text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="votre@email.com" className={`${inputClass("email")} pl-10`} />
              </div>
              {errors.email && <p className="font-inter text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="font-inter text-sm text-foreground mb-1.5 block">Type de compte</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => update("role", "etudiant")}
                  className={`py-2.5 rounded-lg font-inter text-sm transition-all border ${form.role === "etudiant" ? "bg-secondary text-secondary-foreground border-secondary" : "bg-background text-foreground border-border hover:bg-muted"}`}
                >
                  Étudiant
                </button>
                <button
                  type="button"
                  onClick={() => update("role", "responsable")}
                  className={`py-2.5 rounded-lg font-inter text-sm transition-all border ${form.role === "responsable" ? "bg-secondary text-secondary-foreground border-secondary" : "bg-background text-foreground border-border hover:bg-muted"}`}
                >
                  Responsable
                </button>
              </div>
            </div>

            {form.role === "responsable" && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <label className="font-inter text-sm text-foreground mb-1.5 block">Code de vérification responsable</label>
                <input
                  value={form.verificationCode}
                  onChange={(e) => update("verificationCode", e.target.value)}
                  placeholder="Ex: RESP2026"
                  className={inputClass("verificationCode")}
                />
                <p className="font-inter text-[10px] text-muted-foreground mt-1">Contactez l'administration pour obtenir votre code.</p>
                {errors.verificationCode && <p className="font-inter text-xs text-destructive mt-1">{errors.verificationCode}</p>}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="font-inter text-sm text-foreground mb-1.5 block">Filière</label>
                <select value={form.filiere} onChange={(e) => update("filiere", e.target.value)} className={selectClass("filiere")}>
                  <option value="">Choisir</option>
                  {filieres.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
                {errors.filiere && <p className="font-inter text-xs text-destructive mt-1">{errors.filiere}</p>}
              </div>
              <div>
                <label className="font-inter text-sm text-foreground mb-1.5 block">Promotion</label>
                <select value={form.promotion} onChange={(e) => update("promotion", e.target.value)} className={selectClass("promotion")}>
                  <option value="">Choisir</option>
                  {promotions.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.promotion && <p className="font-inter text-xs text-destructive mt-1">{errors.promotion}</p>}
              </div>
              <div>
                <label className="font-inter text-sm text-foreground mb-1.5 block">Semestre</label>
                <select value={form.semestre} onChange={(e) => update("semestre", e.target.value)} className={selectClass("semestre")}>
                  <option value="">Choisir</option>
                  {semestres.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.semestre && <p className="font-inter text-xs text-destructive mt-1">{errors.semestre}</p>}
              </div>
            </div>

            <div>
              <label className="font-inter text-sm text-foreground mb-1.5 block">Mot de passe</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Minimum 8 caractères"
                  className={`${inputClass("password")} pl-10 pr-12`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: strength.width, backgroundColor: strength.color }} />
                  </div>
                  <p className="font-inter text-xs mt-1" style={{ color: strength.color }}>{strength.label}</p>
                </div>
              )}
              {errors.password && <p className="font-inter text-xs text-destructive mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="font-inter text-sm text-foreground mb-1.5 block">Confirmer le mot de passe</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  placeholder="Retapez votre mot de passe"
                  className={`${inputClass("confirmPassword")} pl-10`}
                />
              </div>
              {errors.confirmPassword && <p className="font-inter text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={form.cgu} onChange={(e) => update("cgu", e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-input accent-primary" />
              <span className="font-inter text-sm text-foreground">
                J'accepte les <a href="#" className="text-secondary hover:underline">conditions générales d'utilisation</a>
              </span>
            </label>
            {errors.cgu && <p className="font-inter text-xs text-destructive">{errors.cgu}</p>}

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-inter text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Création...
                </>
              ) : (
                "Créer mon compte"
              )}
            </button>
          </form>

          <p className="text-center font-inter text-sm text-muted-foreground mt-6">
            Déjà un compte ?{" "}
            <Link to="/e-fri/connexion" className="text-secondary hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EFriSignup;
