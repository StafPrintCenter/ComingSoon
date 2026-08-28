import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ComingSoonHeader,
  PreviewIllustration,
  BuildProgress,
  Roadmap,
  LivePlatforms,
  ComingSoonHeroText,
  ComingSoonFooter,
} from "@/components/pages";
import { SITE } from "@/data/site";
import { resolvePlatform, type PlatformConfig } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    const raw = typeof search["platform"] === "string" ? search["platform"].trim() : "";
    return raw ? { platform: raw } : {};
  },
  head: ({ match }) => {
    const search = match.search as { platform?: string };
    const platformConfig = resolvePlatform(search.platform ?? "");

    const title = `${platformConfig.name} en cours de développement | ${SITE.name}`;
    const description = `${platformConfig.name} (${SITE.name}) est actuellement en cours de construction. ${platformConfig.tagline}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "noindex, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ComingSoonPage,
});

function ComingSoonPage() {
  const { platform: platformParam } = Route.useSearch();
  const [platform, setPlatform] = useState<PlatformConfig>(() =>
    resolvePlatform(platformParam ?? ""),
  );

  // Détection par sous-domaine quand aucun paramètre d'URL n'est fourni.
  useEffect(() => {
    setPlatform(resolvePlatform(platformParam ?? window.location.hostname));
  }, [platformParam]);

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

      <ComingSoonHeader platform={platform} />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-16 px-5 pt-28 pb-16 sm:px-8 sm:pt-36">
        {/* Hero Section */}
        <section className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">
          <ComingSoonHeroText platform={platform} />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease }}
            className="w-full"
          >
            <PreviewIllustration platform={platform} />
          </motion.div>
        </section>

        <BuildProgress progress={platform.progress} />
        <Roadmap roadmap={platform.roadmap} />
        <LivePlatforms />
      </main>

      <ComingSoonFooter platform={platform} />
    </div>
  );
}