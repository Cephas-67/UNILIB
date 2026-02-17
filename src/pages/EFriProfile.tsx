import { useState } from "react";
import { Camera, Download, Heart, Upload, FolderKanban, Bell, Shield, Trash2 } from "lucide-react";
import { currentUser } from "@/data/mockData";

const tabs = ["Informations", "Activité", "Statistiques", "Paramètres"];

const EFriProfile = () => {
  const [activeTab, setActiveTab] = useState("Informations");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...currentUser });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="bg-background rounded-xl border border-border p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-poppins font-bold text-2xl">
            {currentUser.prenom[0]}{currentUser.nom[0]}
          </div>
          <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center">
            <Camera size={14} />
          </button>
        </div>
        <div className="text-center md:text-left flex-1">
          <h1 className="font-poppins font-bold text-xl text-foreground">{currentUser.prenom} {currentUser.nom}</h1>
          <p className="font-inter text-sm text-muted-foreground">Étudiant · {currentUser.filiere} · {currentUser.promotion}</p>
          <p className="font-inter text-xs text-muted-foreground mt-1">{currentUser.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-lg p-0.5 overflow-x-auto">
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-md font-inter text-sm font-medium whitespace-nowrap transition-colors ${activeTab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>{t}</button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Informations" && (
        <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-poppins font-semibold text-lg text-foreground">Informations personnelles</h2>
            <button onClick={() => setEditing(!editing)} className="px-4 py-2 rounded-lg border border-border font-inter text-sm text-foreground hover:bg-muted transition-colors">
              {editing ? "Annuler" : "Modifier"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[{ label: "Nom", key: "nom" }, { label: "Prénom", key: "prenom" }, { label: "Email", key: "email" }, { label: "Filière", key: "filiere" }, { label: "Promotion", key: "promotion" }, { label: "Semestre", key: "semestre" }].map(field => (
              <div key={field.key}>
                <label className="font-inter text-xs text-muted-foreground block mb-1">{field.label}</label>
                {editing ? (
                  <input value={(form as any)[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-border bg-background font-inter text-sm outline-none focus:border-secondary" />
                ) : (
                  <p className="font-inter text-sm text-foreground">{(currentUser as any)[field.key]}</p>
                )}
              </div>
            ))}
          </div>
          {editing && (
            <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-inter text-sm font-medium hover:opacity-90 transition-opacity">Enregistrer</button>
          )}
        </div>
      )}

      {activeTab === "Activité" && (
        <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-4">
          <h2 className="font-poppins font-semibold text-lg text-foreground mb-2">Historique</h2>
          {[
            { icon: Download, text: "Téléchargé « Algorithmique Avancée - Cours Complet »", date: "Il y a 2 heures" },
            { icon: Heart, text: "Ajouté « Examen Final - Base de Données » aux favoris", date: "Hier" },
            { icon: Upload, text: "Contribué « TD - Programmation C »", date: "Il y a 3 jours" },
            { icon: FolderKanban, text: "Commencé le projet « Application de Gestion Scolaire »", date: "Il y a 1 semaine" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <item.icon size={16} className="text-muted-foreground" />
              <div className="flex-1">
                <p className="font-inter text-sm text-foreground">{item.text}</p>
                <p className="font-inter text-xs text-muted-foreground">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Statistiques" && (
        <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
          <h2 className="font-poppins font-semibold text-lg text-foreground mb-4">Mes statistiques</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Téléchargements", value: "47" },
              { label: "Favoris", value: "12" },
              { label: "Contributions", value: "3" },
              { label: "Projets", value: "2" },
            ].map(s => (
              <div key={s.label} className="text-center p-4 rounded-lg bg-muted">
                <p className="font-poppins font-bold text-2xl text-foreground">{s.value}</p>
                <p className="font-inter text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Paramètres" && (
        <div className="space-y-4">
          <div className="bg-background rounded-xl border border-border p-6 shadow-sm space-y-4">
            <h2 className="font-poppins font-semibold text-lg text-foreground">Notifications</h2>
            {["Nouvelles ressources", "Mises à jour projets", "Messages IA"].map(n => (
              <label key={n} className="flex items-center justify-between py-2">
                <span className="font-inter text-sm text-foreground">{n}</span>
                <div className="w-10 h-5 rounded-full bg-primary relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-primary-foreground" />
                </div>
              </label>
            ))}
          </div>
          <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
            <h2 className="font-poppins font-semibold text-lg text-foreground flex items-center gap-2"><Shield size={18} /> Sécurité</h2>
            <button className="mt-3 px-4 py-2 rounded-lg border border-border font-inter text-sm text-foreground hover:bg-muted transition-colors">Changer le mot de passe</button>
          </div>
          <div className="bg-background rounded-xl border border-destructive/30 p-6 shadow-sm">
            <h2 className="font-poppins font-semibold text-lg text-destructive flex items-center gap-2"><Trash2 size={18} /> Zone de danger</h2>
            <p className="font-inter text-xs text-muted-foreground mt-1 mb-3">Cette action est irréversible.</p>
            <button className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-inter text-sm font-medium hover:opacity-90 transition-opacity">Supprimer mon compte</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EFriProfile;
