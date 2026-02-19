import { useState } from "react";
import { Upload, FileText, X, Check, ChevronRight, ChevronLeft, ShieldCheck, FileUp, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const filieres = ["Génie Logiciel", "Système-Réseau", "SEIoT", "Intelligence Artificielle"];
const promotions = ["L1", "L2", "L3", "M1", "M2"];
const typesDoc = ["Cours", "TD", "TP", "Examen", "Rattrapage", "Correction"];

const EFriContribute = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState({
    titre: "",
    matiere: "",
    enseignant: "",
    type: "",
    filiere: "",
    promotion: "",
    semestre: "S1",
    description: ""
  });
  const { toast } = useToast();

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setUploading(true);
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 150));
    }
    setUploading(false);
    toast({
      title: "Téléchargement réussi !",
      description: "Le document a été enregistré avec succès dans la base académique.",
    });
    // Reset
    setStep(1);
    setFile(null);
    setProgress(0);
    setForm({ titre: "", matiere: "", enseignant: "", type: "", filiere: "", promotion: "", semestre: "S1", description: "" });
  };

  const isFormValid = form.titre && form.matiere && form.type && form.filiere && form.promotion;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 lg:pb-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-poppins font-bold text-3xl text-foreground">Portail de Téléversement</h1>
          <p className="font-inter text-sm text-muted-foreground mt-1">Espace réservé aux responsables académiques</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
          <ShieldCheck size={16} className="text-secondary" />
          <span className="font-inter text-xs font-semibold text-secondary">Accès Sécurisé - Staff</span>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-0.5 before:bg-border before:-z-10 px-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-poppins font-bold transition-all duration-500 border-4 ${step >= s ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-110" : "bg-background text-muted-foreground border-border"
              }`}
          >
            {step > s ? <Check size={20} /> : s}
            <span className={`absolute -bottom-7 font-inter text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${step === s ? "text-primary" : "text-muted-foreground"}`}>
              {s === 1 ? "Classification" : s === 2 ? "Fichier" : "Validation"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-background rounded-2xl border border-border shadow-sm p-6 lg:p-8 min-h-[400px] flex flex-col justify-between overflow-hidden relative">
        <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-500">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 col-span-1 md:col-span-2">
                <h3 className="font-poppins font-semibold text-lg flex items-center gap-2">
                  <Info size={18} className="text-primary" /> Détails du document
                </h3>
                <div className="h-0.5 w-12 bg-primary rounded-full" />
              </div>

              <div className="space-y-1.5">
                <label className="font-inter text-xs font-bold text-muted-foreground uppercase tracking-wider">Titre de la ressource</label>
                <input
                  value={form.titre}
                  onChange={e => update("titre", e.target.value)}
                  placeholder="Ex: Analyse Numérique - Chapitre 2"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-inter text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-inter text-xs font-bold text-muted-foreground uppercase tracking-wider">Matière</label>
                <input
                  value={form.matiere}
                  onChange={e => update("matiere", e.target.value)}
                  placeholder="Ex: Mathématiques"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-inter text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-inter text-xs font-bold text-muted-foreground uppercase tracking-wider">Enseignant (Auteur)</label>
                <input
                  value={form.enseignant}
                  onChange={e => update("enseignant", e.target.value)}
                  placeholder="Ex: Dr. AZONHIHO"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-inter text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-inter text-xs font-bold text-muted-foreground uppercase tracking-wider">Type de document</label>
                <select
                  value={form.type}
                  onChange={e => update("type", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-inter text-sm focus:border-primary outline-none transition-all cursor-pointer"
                >
                  <option value="">Sélectionner</option>
                  {typesDoc.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-inter text-xs font-bold text-muted-foreground uppercase tracking-wider">Filière concernée</label>
                <select
                  value={form.filiere}
                  onChange={e => update("filiere", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-inter text-sm focus:border-primary outline-none transition-all cursor-pointer"
                >
                  <option value="">Sélectionner</option>
                  {filieres.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-inter text-xs font-bold text-muted-foreground uppercase tracking-wider">Promotion</label>
                <select
                  value={form.promotion}
                  onChange={e => update("promotion", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 font-inter text-sm focus:border-primary outline-none transition-all cursor-pointer"
                >
                  <option value="">Sélectionner</option>
                  {promotions.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="h-full flex flex-col items-center justify-center space-y-8 animate-in zoom-in-95 duration-500">
              <div className="text-center space-y-2">
                <h3 className="font-poppins font-semibold text-lg">Format et Fichier</h3>
                <p className="font-inter text-xs text-muted-foreground">Sélectionnez le support numérique à téléverser</p>
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                onClick={() => document.getElementById("file-input")?.click()}
                className={`w-full max-w-xl aspect-video border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all duration-300 group cursor-pointer ${file ? "border-primary bg-primary/5" : "border-border hover:border-primary hover:bg-muted/50"
                  }`}
              >
                {file ? (
                  <div className="text-center animate-in bounce-in duration-500">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <FileText size={40} className="text-primary" />
                    </div>
                    <p className="font-poppins font-bold text-foreground truncate max-w-[200px]">{file.name}</p>
                    <p className="font-inter text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button
                      onClick={() => setFile(null)}
                      className="mt-6 flex items-center gap-2 mx-auto px-4 py-2 rounded-lg bg-destructive/10 text-destructive font-inter text-xs font-bold hover:bg-destructive hover:text-white transition-all shadow-sm"
                    >
                      <X size={14} /> Supprimer
                    </button>
                  </div>
                ) : (
                  <div className="text-center pointer-events-none" onClick={() => document.getElementById("file-input")?.click()}>
                    <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <FileUp size={40} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="font-poppins font-semibold text-foreground mb-2">Glissez votre fichier ici</p>
                    <p className="font-inter text-xs text-muted-foreground mb-6">ou cliquez pour parcourir vos dossiers</p>
                    <div className="flex items-center gap-4 justify-center">
                      <span className="px-3 py-1 bg-background border border-border rounded text-[10px] font-bold text-muted-foreground">PDF</span>
                      <span className="px-3 py-1 bg-background border border-border rounded text-[10px] font-bold text-muted-foreground">DOCX</span>
                      <span className="px-3 py-1 bg-background border border-border rounded text-[10px] font-bold text-muted-foreground">ZIP</span>
                    </div>
                  </div>
                )}
                <input id="file-input" type="file" className="hidden" onChange={handleFileInput} accept=".pdf,.docx,.zip" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-2">
                <h3 className="font-poppins font-semibold text-lg">Confirmation finale</h3>
                <p className="font-inter text-xs text-muted-foreground">Vérifiez les informations avant l'envoi immédiat</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-2xl border border-border flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-primary flex-shrink-0">
                    <FileText size={18} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Document</label>
                    <p className="font-poppins font-semibold text-sm line-clamp-1">{form.titre}</p>
                    <p className="font-inter text-[11px] text-muted-foreground">{form.type} · {file?.name}</p>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-2xl border border-border flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-secondary flex-shrink-0">
                    <ChevronRight size={18} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Destination</label>
                    <p className="font-poppins font-semibold text-sm line-clamp-1">{form.matiere}</p>
                    <p className="font-inter text-[11px] text-muted-foreground">{form.filiere} · {form.promotion}</p>
                  </div>
                </div>
              </div>

              {uploading && (
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between items-end">
                    <p className="font-inter text-xs font-bold text-primary animate-pulse">Transmission en cours...</p>
                    <p className="font-inter text-xs font-bold text-muted-foreground">{progress}%</p>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden p-0.5 border border-border shadow-inner">
                    <div className="h-full bg-primary rounded-full transition-all duration-300 shadow-sm" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {!uploading && (
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-inter text-sm font-bold text-muted-foreground hover:bg-muted transition-all disabled:opacity-0"
            >
              <ChevronLeft size={18} /> Retour
            </button>

            {step < 3 ? (
              <button
                onClick={nextStep}
                disabled={(step === 1 && !isFormValid) || (step === 2 && !file)}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-secondary text-secondary-foreground font-inter text-sm font-bold shadow-lg shadow-secondary/20 hover:opacity-90 transition-all disabled:opacity-50"
              >
                Continuer <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-inter text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
              >
                <Upload size={18} /> Lancer le téléversement
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EFriContribute;
