import { useEffect, useState } from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle, Bell } from "lucide-react";
import { BaseModal } from "./BaseModal";
import { ModalHeader } from "./ModalHeader";
import { registerToWaitlist, WaitlistApiError } from "@/stores/useWaitlistStore";
import { WAITLIST_PLATFORM_LABELS, type WaitlistPlatform } from "@/data/waitlist";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: WaitlistPlatform;
}

export function WaitlistModal({ isOpen, onClose, platform }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const platformLabel = WAITLIST_PLATFORM_LABELS[platform];

  // Réinitialise l'état à chaque ouverture, pour ne pas garder l'état de la
  // plateforme précédemment consultée si le modal est réutilisé.
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setError(null);
      setSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await registerToWaitlist({ email, platformName: platform });
      setSubmitted(true);
    } catch (err) {
      if (err instanceof WaitlistApiError) {
        setError(err.message);
      } else {
        setError("Une erreur inattendue est survenue. Merci de réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidthClassName="max-w-sm">
      <div className="p-6">
        <ModalHeader title="Liste d'attente" icon={Bell} onClose={onClose} />

        {submitted ? (
          <div className="mt-4 flex flex-col items-center gap-2 py-4 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 size={28} />
            </span>
            <p className="text-sm font-medium">Inscription confirmée</p>
            <p className="text-xs text-muted-foreground">
              Vous serez informé(e) par email dès l'ouverture de <strong>{platformLabel}</strong>.
            </p>
            <button
              onClick={onClose}
              className="mt-3 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted cursor-pointer"
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <p className="mt-4 mb-4 text-sm text-muted-foreground">
              <strong className="text-foreground">{platformLabel}</strong> n'est pas encore disponible. Laissez votre
              email pour être averti(e) dès son ouverture.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium"><Mail size={14} /> Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
                />
              </label>

              {error && (
                <div className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2.5 text-xs text-destructive">
                  <AlertCircle size={14} className="mt-0.5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Inscription…
                  </>
                ) : (
                  "M'inscrire à la liste d'attente"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </BaseModal>
  );
}