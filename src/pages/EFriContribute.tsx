import { useState } from "react";
import { Upload, FileText, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const filieres = ["Génie Logiciel", "Système-Réseau", "SEIoT", "Intelligence Artificielle"];
const promotions = ["L1", "L2", "L3", "M1", "M2"];
const semestres = ["S1", "S2"];
const typesDoc = ["Cours", "TD", "TP", "Examen", "Rattrapage", "Correction"];

const EFriContribute = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [form, setForm] = useState({ titre: "", matiere: "", enseignant: "", type: "", filiere: "", promotion: "", semestre: "", description: "" });
  const { toast } = useToast();

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 200));
    }
    setUploading(false);
    setProgress(0);
    setFile(null);
    setForm({ titre: "", matiere: "", enseignant: "", type: "", filiere: "", promotion: "", semestre: "", description: "" });
    toast({ title: "Soumission réussie !", description: "Votre ressource sera examinée par un modérateur." });
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-border bg-background font-inter text-sm outline-none focus:border-secondary focus:border-2";
  const selectClass = "w-full px-4 py-3 rounded-lg border border-border bg-background font-inter text-sm outline-none focus:border-secondary focus:border-2 appearance-none";

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 lg:pb-0">
      <h1 className="font-poppins font-semibold text-2xl text-foreground">Contribuer une ressource</h1>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        className="border-2 border-dashed border-[#9E9E9E] rounded-xl p-8 text-center cursor-pointer hover:border-secondary transition-colors"
        onClick={() => document.getElementById("file-input")?.click()}
      >
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <FileText size={24} className="text-secondary" />
            <span className="font-inter text-sm text-foreground">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
            <button onClick={e => { e.stopPropagation(); setFile(null); }} className="text-muted-foreground hover:text-destructive"><X size={16} /></button>
          </div>
        ) : (
          <>
            <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
            <p className="font-inter text-sm text-foreground mb-1">Glissez-déposez votre fichier ici</p>
            <p className="font-inter text-xs text-muted-foreground">PDF, DOCX, ZIP — Max 20 MB</p>
          </>
        )}
        <input id="file-input" type="file" className="hidden" onChange={handleFileInput} accept=".pdf,.docx,.zip" />
      </div>

      {uploading && (
        <div className="space-y-1">
          <div className="h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="font-inter text-xs text-muted-foreground text-right">{progress}%</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-inter text-sm text-foreground mb-1.5 block">Titre</label>
            <input value={form.titre} onChange={e => update("titre", e.target.value)} placeholder="Titre de la ressource" className={inputClass} required />
          </div>
          <div>
            <label className="font-inter text-sm text-foreground mb-1.5 block">Matière</label>
            <input value={form.matiere} onChange={e => update("matiere", e.target.value)} placeholder="Ex: Algorithmique" className={inputClass} required />
          </div>
          <div>
            <label className="font-inter text-sm text-foreground mb-1.5 block">Enseignant</label>
            <input value={form.enseignant} onChange={e => update("enseignant", e.target.value)} placeholder="Ex: Prof. GANGBE" className={inputClass} />
          </div>
          <div>
            <label className="font-inter text-sm text-foreground mb-1.5 block">Type</label>
            <select value={form.type} onChange={e => update("type", e.target.value)} className={selectClass} required>
              <option value="">Choisir</option>
              {typesDoc.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="font-inter text-sm text-foreground mb-1.5 block">Filière</label>
            <select value={form.filiere} onChange={e => update("filiere", e.target.value)} className={selectClass} required>
              <option value="">Choisir</option>
              {filieres.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="font-inter text-sm text-foreground mb-1.5 block">Promotion</label>
            <select value={form.promotion} onChange={e => update("promotion", e.target.value)} className={selectClass} required>
              <option value="">Choisir</option>
              {promotions.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="font-inter text-sm text-foreground mb-1.5 block">Description (optionnelle)</label>
          <textarea value={form.description} onChange={e => update("description", e.target.value)} placeholder="Décrivez brièvement cette ressource..." rows={3} className={`${inputClass} resize-none`} />
        </div>

        <button type="submit" disabled={!file || uploading} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-inter text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
          <Check size={16} /> Soumettre pour modération
        </button>
      </form>
    </div>
  );
};

export default EFriContribute;
