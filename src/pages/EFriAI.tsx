import { useState, useRef } from "react";
import { Send, Paperclip, Sparkles, Bot, User } from "lucide-react";

const suggestions = [
  "Explique-moi les algorithmes de tri",
  "Résume le cours de Base de Données",
  "Aide-moi à préparer l'examen de Réseaux",
  "Quelles sont les étapes d'un projet UML ?",
];

type Message = { role: "user" | "ai"; content: string };

const EFriAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    await new Promise(r => setTimeout(r, 1500));

    const aiMsg: Message = { role: "ai", content: generateResponse(text) };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] pb-20 lg:pb-0">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-2">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
              <Bot size={32} className="text-secondary" />
            </div>
            <h2 className="font-poppins font-semibold text-xl text-foreground mb-2">Assistant IA e-FRI</h2>
            <p className="font-inter text-sm text-muted-foreground mb-8 max-w-md">Posez une question sur vos cours, demandez un résumé ou de l'aide pour vos examens.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg w-full">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s)} className="p-3 rounded-xl border border-border bg-background text-left font-inter text-sm text-foreground hover:border-secondary hover:shadow-sm transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "ai" && (
              <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-secondary" />
              </div>
            )}
            <div className={`max-w-[70%] p-3 rounded-xl font-inter text-sm ${
              msg.role === "user" ? "bg-[#E3F2FD] text-foreground" : "bg-[#F5F5F5] text-foreground"
            }`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-secondary-foreground" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center">
              <Bot size={16} className="text-secondary" />
            </div>
            <div className="bg-[#F5F5F5] p-3 rounded-xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-border bg-background rounded-b-xl">
        <button type="button" className="p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Paperclip size={18} />
        </button>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Posez votre question..."
          className="flex-1 py-2 px-3 rounded-lg border border-border bg-background font-inter text-sm outline-none focus:border-secondary"
        />
        <button type="submit" disabled={!input.trim() || loading} className="p-2.5 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

function generateResponse(question: string): string {
  if (question.toLowerCase().includes("tri")) {
    return "Les algorithmes de tri principaux sont :\n\n**1. Tri à bulles** — O(n²) : Compare les éléments adjacents et les échange si nécessaire.\n\n**2. Tri par insertion** — O(n²) : Insère chaque élément à sa bonne position.\n\n**3. Tri rapide (Quicksort)** — O(n log n) en moyenne : Utilise un pivot pour partitionner le tableau.\n\n**4. Tri fusion (Mergesort)** — O(n log n) : Divise, trie et fusionne.\n\nPour vos examens à l'IFRI, concentrez-vous sur Quicksort et Mergesort ! 📚";
  }
  if (question.toLowerCase().includes("base de données")) {
    return "Voici un résumé du cours de Base de Données :\n\n• **Modèle relationnel** : Tables, clés primaires, clés étrangères\n• **SQL** : SELECT, INSERT, UPDATE, DELETE, JOIN\n• **Normalisation** : 1NF, 2NF, 3NF, BCNF\n• **Transactions** : ACID (Atomicité, Cohérence, Isolation, Durabilité)\n• **Indexation** : B-Tree, Hash\n\nBesoin de plus de détails sur un point ? 🎓";
  }
  return "Merci pour votre question ! C'est un sujet important dans le programme de l'IFRI.\n\nJe vous recommande de consulter les ressources disponibles dans la section « Ressources » de la plateforme pour approfondir ce sujet.\n\nN'hésitez pas à poser d'autres questions ! 💡";
}

export default EFriAI;
