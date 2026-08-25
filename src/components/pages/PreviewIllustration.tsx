import { Terminal, Cpu, Hammer, CheckCircle2, Clock } from "lucide-react";
import { SITE_LINK } from "@/data/site";
import { stripProtocol } from "@/lib/domain";
import type { PlatformConfig } from "@/lib/site";

interface PreviewIllustrationProps {
  platformName?: string;
  progress?: number;
  platform?: PlatformConfig;
}

export function PreviewIllustration({
  platformName,
  progress: progressProp,
  platform,
}: PreviewIllustrationProps) {
  const name = platform?.name ?? platformName ?? "Platform";
  const progress = platform?.progress ?? progressProp ?? 0;

  const landingDomain = stripProtocol(SITE_LINK.landingUrl ?? "");
  const platformSlug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="relative mx-auto w-full max-w-md min-w-0 lg:mx-0 lg:max-w-none">
      {/* Halo lumineux de fond */}
      <div className="absolute -inset-10 -z-10 rounded-full bg-brand/10 blur-3xl" />

      {/* Fenêtre style IDE / Terminal de build */}
      <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
        {/* Barre supérieure de fenêtre */}
        <div className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-destructive/70 shrink-0" />
            <span className="size-2.5 rounded-full bg-amber-500/70 shrink-0" />
            <span className="size-2.5 rounded-full bg-emerald-500/70 shrink-0" />
            <span className="ml-2 font-mono text-[10px] text-muted-foreground truncate">
              build://{platformSlug}.{landingDomain}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded bg-brand/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-brand border border-brand/20">
            <Hammer className="size-3" />
            IN_PROGRESS
          </span>
        </div>

        {/* Corps de l'illustration */}
        <div className="p-5 space-y-4 font-mono text-xs">
          {/* Header de console */}
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Terminal className="size-4 text-brand" />
              <span>STAF_ENGINE_DEPLOY</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <Cpu className="size-3.5" />
              <span>{progress}%</span>
            </div>
          </div>

          {/* Séquence de logs de construction */}
          <div className="space-y-2 text-[11px] leading-relaxed">
            <div className="flex items-start gap-2 text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Core Architecture & Design System <span className="text-emerald-600 dark:text-emerald-400">[READY]</span></span>
            </div>
            <div className="flex items-start gap-2 text-muted-foreground">
              <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>Database Models & API Endpoints <span className="text-emerald-600 dark:text-emerald-400">[READY]</span></span>
            </div>
            <div className="flex items-start gap-2 text-foreground font-semibold">
              <Clock className="size-3.5 text-brand animate-pulse shrink-0 mt-0.5" />
              <span>Integration tests & UI Optimizations <span className="text-brand">[IN_PROGRESS]</span></span>
            </div>
          </div>

          {/* Barre de progression dynamique */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Compilateur V-Engine</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-brand transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Encadré d'information bas de carte */}
          <div className="rounded-xl border border-border bg-muted/40 p-3 flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Accès anticipé :</span>
            <span className="font-semibold text-foreground">Sur invitation / Notification</span>
          </div>
        </div>
      </div>
    </div>
  );
}