import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Sparkles, AlertCircle, Compass } from "lucide-react";
import { SITE } from "@/data/site";

export function NotFoundComponent() {
  const navigate = useNavigate();
  const [problematicRoute, setProblematicRoute] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProblematicRoute(window.location.pathname + window.location.search);
    }
  }, []);

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 2) {
      window.history.back();
    } else {
      navigate({ to: "/" });
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col justify-between p-6 md:p-12 select-none overflow-hidden">
      {/* Halos de lumière décoratifs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

      {/* En-tête de la page */}
      <header className="relative z-10 flex items-center justify-between border-b border-border/40 pb-5 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="font-display font-semibold text-sm">{SITE.name}</span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
          Plateforme en attente
        </span>
      </header>

      {/* Carte Centrale */}
      <main className="relative z-10 max-w-2xl mx-auto w-full py-12 my-auto text-center">
        <div className="rounded-3xl border border-border/60 bg-card/60 backdrop-blur-xl p-8 md:p-12 shadow-2xl space-y-6">

          {/* Badge statut & route */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-1">
              <Compass className="h-6 w-6" />
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/10 px-3.5 py-1 font-mono text-xs font-semibold text-destructive">
              <AlertCircle className="h-3.5 w-3.5" />
              Page inexistante (404)
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Adresse introuvable
            </h1>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md mx-auto">
              La page renseignée n'existe pas sur cette plateforme. Même en phase de préparation, nous ne trouvons aucune ressource à l'adresse indiquée.
            </p>
          </div>

          {/* Affichage de l'URL incorrecte */}
          {problematicRoute && (
            <div className="inline-block max-w-full rounded-xl bg-muted/60 border border-border/60 px-4 py-2 font-mono text-xs text-muted-foreground truncate">
              Chemin erroné : <span className="text-foreground font-semibold">{problematicRoute}</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-black hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
            >
              <Sparkles className="h-4 w-4" />
              Page de lancement
            </Link>

            <button
              type="button"
              onClick={handleGoBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-muted active:scale-95 transition-all shadow-xs"
            >
              <ArroswLeft className="h-4 w-4" />
              Page précédente
            </button>
          </div>

        </div>
      </main>

      {/* Pied de page */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full pt-6 border-t border-border/40 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
      </footer>
    </div>
  );
}