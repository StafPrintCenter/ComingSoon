import { useRouter, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Hammer, RefreshCw, Home, Terminal } from "lucide-react";
import { reportError } from "@/lib/error/reporting";
import { SITE } from "@/data/site";

export function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportError(error, { boundary: "coming_soon_error_boundary" });
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center p-4 md:p-8 font-mono select-none">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">

        {/* Top Bar */}
        <div className="bg-slate-100/80 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Hammer className="h-4 w-4 text-amber-600" />
            <span className="text-xs font-bold tracking-wider text-slate-700 uppercase">
              BUILD_PREVIEW_EXCEPTION // {SITE.name}
            </span>
          </div>
          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
            DEV_BUILD
          </span>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold font-display text-slate-900">
              Anomalie lors du chargement de la pré-version
            </h1>
            <p className="text-sm font-sans text-slate-600 leading-relaxed">
              Un composant en cours d'intégration a rencontré un problème sur la version de démonstration.
            </p>
          </div>

          {/* Console d'erreur claire */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-2 shadow-inner">
            <div className="flex items-center gap-2 text-xs text-slate-400 pb-2 border-b border-slate-800">
              <Terminal className="h-3.5 w-3.5 text-amber-400" />
              <span>LOG_PREVIEW_INIT:</span>
            </div>
            <div className="text-xs text-amber-400 font-bold">
              {error?.name || "InitializationError"}
            </div>
            <div className="max-h-28 overflow-y-auto text-xs text-slate-200 whitespace-pre-wrap leading-relaxed pr-1 custom-scrollbar">
              {error?.message || "Erreur critique de rendu sur la plateforme en cours de développement."}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-end font-sans">
            <button
              type="button"
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-md shadow-amber-500/20 hover:bg-amber-400 active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Relancer la démonstration
            </button>
            <Link
              to="/"
              search={{ platform: "default" }}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 active:scale-95 transition-all"
            >
              <Home className="h-4 w-4" />
              Accueil Coming Soon
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
