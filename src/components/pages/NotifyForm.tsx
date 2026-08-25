import { Bell, BellRing, CheckCircle2, Send, Loader2, AlertCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { registerToWaitlist, WaitlistApiError } from "@/stores/useWaitlistStore";
import type { WaitlistPlatform } from "@/data/waitlist";

const emailSchema = z.string().trim().email("Adresse email invalide");

interface NotifyFormProps {
  /** Libellé affiché à l'utilisateur, ex: "SPC Meet" */
  platformName: string;
  /** Valeur technique attendue par l'API, ex: "meet" */
  platform: WaitlistPlatform;
}

export function NotifyForm({ platformName, platform }: NotifyFormProps) {
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error("Adresse email invalide", {
        description: "Vérifiez le format de votre adresse, ex : prenom@exemple.com",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await registerToWaitlist({ email: parsed.data, platformName: platform });
      setRegistered(result.email);
      toast.success("Vous êtes sur la liste !", {
        description: `Nous préviendrons ${result.email} dès le lancement de ${platformName}.`,
        icon: <BellRing className="size-4" />,
      });
      setEmail("");
    } catch (err) {
      const message = err instanceof WaitlistApiError ? err.message : "Une erreur inattendue est survenue.";
      setError(message);
      toast.error("Inscription impossible", { description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
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
    <div className="mx-auto w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="glass-card flex w-full flex-col gap-3 rounded-2xl p-2.5 sm:flex-row sm:items-center"
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
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="gradient-brand glow-brand flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Envoi…
            </>
          ) : (
            <>
              M'avertir du lancement
              <Send className="size-4" />
            </>
          )}
        </button>
      </form>

      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="size-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}
