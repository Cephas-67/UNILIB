import { useState, useEffect, useRef } from "react";
import { Download, Upload, FileText, X, Eye } from "lucide-react";
import { useSession } from "@/hooks/use-session";
import { useToast } from "@/hooks/use-toast";

const EFriSchedule = () => {
  const { user } = useSession();
  const { toast } = useToast();
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load PDF from localStorage on mount
  useEffect(() => {
    const savedPdf = localStorage.getItem("unilib_schedule_pdf");
    if (savedPdf) {
      setPdfData(savedPdf);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        localStorage.setItem("unilib_schedule_pdf", result);
        setPdfData(result);
        setIsUploading(false);
        toast({
          title: "Emploi du temps mis à jour",
          description: "Le nouveau document a été téléversé avec succès.",
        });
      };
      reader.readAsDataURL(file);
    } else if (file) {
      toast({
        title: "Format non supporté",
        description: "Veuillez téléverser un fichier PDF.",
        variant: "destructive",
      });
    }
  };

  const removePdf = () => {
    localStorage.removeItem("unilib_schedule_pdf");
    setPdfData(null);
    toast({
      title: "Document supprimé",
      description: "L'emploi du temps a été retiré.",
    });
  };

  const isAdmin = user?.role === "admin";

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-poppins font-semibold text-2xl text-foreground">Emploi du Temps</h1>
          <p className="font-inter text-sm text-muted-foreground mt-1">
            Consultez le planning officiel fourni par l'administration
          </p>
        </div>

        <div className="flex items-center gap-3">
          {pdfData && (
            <a
              href={pdfData}
              download="Emploi_du_Temps.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-inter text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Download size={16} /> Télécharger
            </a>
          )}

          {isAdmin && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-inter text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Upload size={16} /> {pdfData ? "Mettre à jour" : "Téléverser"}
            </button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf"
            className="hidden"
          />
        </div>
      </div>

      <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        {pdfData ? (
          <div className="flex-1 flex flex-col">
            <div className="bg-muted/30 p-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <FileText size={18} className="text-primary" />
                <span>Emploi_du_Temps_Officiel.pdf</span>
              </div>
              {isAdmin && (
                <button
                  onClick={removePdf}
                  className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"
                  title="Supprimer le document"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="flex-1 w-full bg-muted/10">
              <iframe
                src={pdfData}
                className="w-full h-full min-h-[700px] border-none"
                title="Emploi du temps PDF"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-2xl bg-muted fill-muted-foreground flex items-center justify-center">
              <FileText size={40} className="text-muted-foreground/40" />
            </div>
            <div className="max-w-md space-y-2">
              <h3 className="font-poppins font-semibold text-xl text-foreground">Aucun emploi du temps</h3>
              <p className="font-inter text-sm text-muted-foreground">
                L'administration n'a pas encore publié d'emploi du temps pour cette période.
              </p>
            </div>

            {isAdmin && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-inter text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
              >
                <Upload size={18} /> Téléverser le planning (PDF)
              </button>
            )}
          </div>
        )}
      </div>

      <div className="bg-secondary/5 rounded-xl border border-secondary/10 p-4 flex gap-4 items-start">
        <div className="p-2 bg-secondary/10 rounded-lg text-secondary flex-shrink-0">
          <Eye size={18} />
        </div>
        <div className="space-y-1">
          <h4 className="font-poppins font-semibold text-sm text-foreground">Information d'affichage</h4>
          <p className="font-inter text-xs text-muted-foreground leading-relaxed">
            L'affichage interactif a été remplacé par le document PDF officiel pour garantir l'exactitude des informations
            transmises par l'IFRI. Vous pouvez visualiser le tableau directement ici ou le télécharger pour une consultation hors ligne.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EFriSchedule;
