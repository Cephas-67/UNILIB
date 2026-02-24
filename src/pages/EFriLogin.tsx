import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { login, getCurrentUser } from "@/lib/api";
import { registeredUsers } from "@/data/mockData";
import UniLibLogo from "@/components/UniLibLogo";

const EFriLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { error?: string };
    if (state?.error) {
      toast({
        title: "Session interrompue",
        description: state.error,
        variant: "destructive"
      });
    }
  }, [location, toast]);

  const validate = () => {
    const errs: typeof errors = {};
    if (!email) errs.email = "L'email est requis";
    if (!password) errs.password = "Le mot de passe est requis";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);

    try {
      // 1. Login API et récupération des tokens
      console.log('🔐 Tentative de connexion...', email);
      const loginData = await login(email.toLowerCase(), password);
      console.log('✅ Login réussi, tokens stockés');
      
      // 2. Récupérer les infos utilisateur
      console.log('👤 Récupération des infos utilisateur...');
      const userData = await getCurrentUser();
      console.log('✅ User data:', userData);
      
      // 3. Vérifier le statut
      if (userData.status && userData.status !== "active") {
        toast({
          title: "Accès refusé",
          description: userData.status === "banned" 
            ? "Votre compte a été banni par l'administration." 
            : "Votre compte est actuellement désactivé.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // 4. Stocker la session
      localStorage.setItem("unilib_session", JSON.stringify(userData));
      console.log('✅ Session stockée');
      
      toast({ 
        title: "Connexion réussie", 
        description: `Ravi de vous revoir, ${userData.prenom} !` 
      });
      
      navigate("/e-fri/dashboard");
      
    } catch (error: any) {
      console.error('❌ Login error:', error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Email ou mot de passe incorrect.",
        variant: "destructive"
      });
      setErrors({ email: "Identifiants invalides" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
  toast({
    title: "Connexion Google",
    description: "Simulation de l'authentification Google...",
  });
  
  try {
    // Utiliser un compte de test prédéfini
    const testEmail = "test@ifri.edu";
    const testPassword = "test1234"; // Créez ce compte en base d'abord !
    
    const data = await login(testEmail, testPassword);
    const userData = await getCurrentUser();
    
    localStorage.setItem("unilib_session", JSON.stringify(userData));
    
    toast({ 
      title: "Connecté via Google", 
      description: `Bienvenue, ${userData.prenom} !` 
    });
    
    navigate("/e-fri/dashboard");
  } catch (error) {
    toast({
      title: "Erreur",
      description: "La connexion Google a échoué",
      variant: "destructive"
    });
  }
};

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[40%] bg-secondary items-center justify-center p-12">
        <div className="text-center">
          <div className="absolute top-4 left-4">
            <UniLibLogo size="small" />
          </div>
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

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <UniLibLogo size="small" />
          </div>
          <Link to="/e-fri" className="flex items-center gap-2 mb-8 lg:hidden hover:opacity-80 transition-opacity">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <circle cx="16" cy="24" r="12" fill="#3D5AFE" opacity="0.85" />
              <circle cx="24" cy="24" r="12" fill="#FF9800" opacity="0.75" />
              <circle cx="20" cy="14" r="12" fill="#69F0AE" opacity="0.8" />
            </svg>
            <span className="font-poppins text-xl">
              <span className="font-medium text-muted-foreground">e-</span>
              <span className="font-bold text-foreground">FRI</span>
            </span>
          </Link>

          <h2 className="font-poppins font-bold text-2xl text-foreground mb-1">Bienvenue sur e-FRI</h2>
          <p className="font-inter text-sm text-muted-foreground mb-8">Connectez-vous pour accéder à vos ressources</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-inter text-sm text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border font-inter text-sm text-foreground bg-background outline-none transition-colors ${
                    errors.email ? "border-destructive border-2" : "border-input focus:border-secondary focus:border-2"
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
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border font-inter text-sm text-foreground bg-background outline-none transition-colors ${
                    errors.password ? "border-destructive border-2" : "border-input focus:border-secondary focus:border-2"
                  }`}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="font-inter text-xs text-destructive mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={remember} 
                  onChange={(e) => setRemember(e.target.checked)} 
                  className="w-4 h-4 rounded border-input accent-primary" 
                />
                <span className="font-inter text-sm text-foreground">Se souvenir de moi</span>
              </label>
              <Link to="/e-fri/mot-de-passe-oublie" className="font-inter text-sm text-secondary hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-inter text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Connexion...
                </>
              ) : "Se connecter"}
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 rounded-lg border border-border bg-background text-foreground font-inter text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continuer avec Google
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="font-inter text-xs text-muted-foreground">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-center font-inter text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link to="/e-fri/inscription" className="text-secondary hover:underline font-medium">S'inscrire</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EFriLogin;