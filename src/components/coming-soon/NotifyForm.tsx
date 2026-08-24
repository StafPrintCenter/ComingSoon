import { Bell, BellRing, CheckCircle2, Send } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { SITE } from "../../lib/site";

const emailSchema = z.string().trim().email("Adresse email invalide");
const STORAGE_KEY = "spc-notify-email";

export function NotifyForm({ platformName }: { platformName: string }) {
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setRegistered(saved);
    } catch {
      /* stockage indisponible */
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error("Adresse email invalide", {
        description: "Vérifiez le format de votre adresse, ex : prenom@exemple.com",
      });
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, parsed.data);
    } catch {
      /* stockage indisponible */
    }
    setRegistered(parsed.data);
    toast.success("Vous êtes sur la liste !", {
      description: `Nous préviendrons ${parsed.data} dès le lancement de ${platformName}.`,
      icon: <BellRing className="size-4" />,
    });
    setEmail("");
  };

  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* stockage indisponible */
    }
    setRegistered(null);
  };

  if (registered) {
    return (
      <div className="glass-card mx-auto flex w-full max-w-xl flex-col items-center gap-3 rounded-2xl px-6 py-5 text-center">
        <CheckCircle2 className="size-6 text-brand" />
        <p className="text-sm font-semibold text-foreground">
          Notification activée pour{" "}
          <span className="font-mono text-[13px] text-brand">{registered}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Vous serez averti en priorité dès l'ouverture de {platformName}.
        </p>
        <button
          onClick={handleReset}
          className="text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
        >
          Utiliser une autre adresse
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card mx-auto flex w-full max-w-xl flex-col gap-3 rounded-2xl p-2.5 sm:flex-row sm:items-center"
    >
      <label htmlFor="notify-email" className="sr-only">
        Adresse email
      </label>
      <div className="flex flex-1 items-center gap-2 px-3">
        <Bell className="size-4 shrink-0 text-muted-foreground" />
        <input
          id="notify-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre adresse email"
          className="w-full bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          autoComplete="email"
        />
      </div>
      <button
        type="submit"
        className="gradient-brand glow-brand flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        M'avertir du lancement
        <Send className="size-4" />
      </button>
    </form>
  );
}
