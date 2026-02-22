import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

const EFriForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        // Simulation
        await new Promise(r => setTimeout(r, 1500));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
            <div className="w-full max-w-md bg-background rounded-2xl border border-border p-8 shadow-xl animate-in fade-in zoom-in duration-500">
                {!submitted ? (
                    <>
                        <h2 className="font-poppins font-bold text-2xl text-foreground mb-2">Mot de passe oublié ?</h2>
                        <p className="font-inter text-sm text-muted-foreground mb-8">
                            Pas d'inquiétude, saisissez votre email pour recevoir un lien de réinitialisation.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="font-inter text-sm text-foreground mb-1.5 block">Email</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="votre@email.com"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background font-inter text-sm outline-none focus:border-secondary focus:border-2 transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-inter text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {loading ? "Envoi en cours..." : "Envoyer le lien"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary animate-bounce">
                            <CheckCircle2 size={32} />
                        </div>
                        <h2 className="font-poppins font-bold text-2xl text-foreground mb-2">Email envoyé !</h2>
                        <p className="font-inter text-sm text-muted-foreground mb-8">
                            Nous avons envoyé un lien de réinitialisation à <span className="font-bold text-foreground">{email}</span>.
                            Veuillez vérifier votre boîte de réception.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-secondary font-inter text-sm font-medium hover:underline"
                        >
                            Renvoyer l'email
                        </button>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-border">
                    <Link to="/e-fri/connexion" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-inter text-sm">
                        <ArrowLeft size={16} /> Retour à la connexion
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EFriForgotPassword;
