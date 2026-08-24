import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HardHat } from "lucide-react";
import { useEffect, useState } from "react";
import {
  ComingSoonHeader,
  PreviewIllustration,
  BuildProgress,
  Roadmap,
  NotifyForm,
  LivePlatforms
} from "@/components/pages";

import {
  BUILD_PROGRESS,
  PLATFORMS,
  SITE,
  detectPlatformFromHostname,
  type PlatformKey,
} from "@/lib/site";

const COMING_SOON_TITLE = `En cours de développement | ${SITE.name}`;
const COMING_SOON_DESC = `Cette plateforme de l'écosystème ${SITE.name} est actuellement en cours de construction. Inscrivez-vous pour être informé du lancement.`;

const ease = [0.22, 1, 0.36, 1] as const;

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    const raw = typeof search["platform"] === "string" ? search["platform"] : undefined;
    const platform: PlatformKey =
      raw && raw in PLATFORMS ? (raw as PlatformKey) : "default";
    return { platform };
  },
  head: () => ({
    meta: [
      { title: COMING_SOON_TITLE },
      { name: "description", content: COMING_SOON_DESC },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: COMING_SOON_TITLE },
      { property: "og:description", content: COMING_SOON_DESC },
    ],
  }),
  component: ComingSoonPage,
});

function ComingSoonPage() {
  const { platform: platformParam } = Route.useSearch();
  const [platformKey, setPlatformKey] = useState<PlatformKey>(platformParam);

  useEffect(() => {
    if (platformParam === "default") {
      setPlatformKey(detectPlatformFromHostname(window.location.hostname));
    }
  }, [platformParam]);

  const platform = PLATFORMS[platformKey];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background font-sans text-foreground">
      {/* Décor : trame de points + halos */}
      <div className="dot-matrix pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-120 w-180 -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -left-40 size-96 animate-float-slow rounded-full bg-brand/10 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 size-96 rounded-full bg-brand-deep/10 blur-[100px]"
        aria-hidden="true"
      />

      <ComingSoonHeader />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-16 px-5 pt-28 pb-16 sm:px-8 sm:pt-36">
        {/* ---- Hero Section en 2 colonnes ---- */}
        <section className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">

          {/* Colonne gauche — Textes & Formulaire */}
          <div className="flex flex-col items-start text-left">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm"
            >
              <HardHat className="h-3.5 w-3.5 text-brand" />
              Plateforme en cours de construction
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.7, ease }}
              className="mt-7 text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl"
            >
              <span className="text-glow-brand text-brand">{platform.name}</span>
              <br />
              arrive très bientôt.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.7, ease }}
              className="mt-6 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {platform.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.7, ease }}
              className="mt-8 w-full"
            >
              <NotifyForm platformName={platform.name} />
              <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                Zéro spam — un seul email au moment du lancement.
              </p>
            </motion.div>
          </div>

          {/* Colonne droite — Illustration technique du Build */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease }}
            className="w-full"
          >
            <PreviewIllustration platformName={platform.name} />
          </motion.div>
        </section>

        {/* ---- Progression ---- */}
        <BuildProgress />

        {/* ---- Roadmap teaser ---- */}
        <Roadmap roadmap={platform.roadmap} />

        {/* ---- Navigation de secours ---- */}
        <LivePlatforms />
      </main>

      {/* ---- Pied de page ---- */}
      <footer className="relative z-10 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row sm:px-8">
          <p className="text-xs text-muted-foreground">
            © {SITE.year} {SITE.name} — Tous droits réservés.
          </p>
          <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
            Build <span className="text-brand">{SITE.version}</span> · {BUILD_PROGRESS}% complete
          </p>
        </div>
      </footer>
    </div>
  );
}