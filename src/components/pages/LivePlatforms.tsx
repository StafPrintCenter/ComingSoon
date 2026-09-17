import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { stripProtocol } from "@/lib/domain";
import { useTheme } from "@/hooks/useTheme";
import { useEcosystemSitesStore } from "@/stores/useEcosystemSitesStore";

const FEATURED_SITE_NAMES = ["Site vitrine", "Documentation officielle", "SPC Arcade"];

function PlatformSkeleton() {
  return (
    <div
      className="glass-card flex items-start justify-between gap-3 rounded-2xl p-5"
      aria-hidden="true"
    >
      <div className="flex min-w-0 items-start gap-3">
        {/* Logo */}
        <div className="size-10 shrink-0 animate-pulse rounded-xl border border-border bg-muted" />

        <div className="min-w-0 flex-1 space-y-2">
          {/* Nom */}
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />

          {/* Description */}
          <div className="space-y-1.5">
            <div className="h-3 w-full max-w-44 animate-pulse rounded bg-muted" />
            <div className="h-3 w-32 animate-pulse rounded bg-muted" />
          </div>

          {/* URL */}
          <div className="mt-1.5 h-3 w-24 animate-pulse rounded bg-muted" />
        </div>
      </div>

      {/* Icône */}
      <div className="size-4 shrink-0 animate-pulse rounded bg-muted" />
    </div>
  );
}

export function LivePlatforms() {
  const { dark } = useTheme();
  const { sites, isLoading } = useEcosystemSitesStore();

  // Filtrage exclusif sur les 3 plateformes cibles
  const featuredPlatforms = sites.filter((site) =>
    FEATURED_SITE_NAMES.some(
      (name) => site.name.toLowerCase().trim() === name.toLowerCase().trim(),
    ),
  );

  return (
    <section
      className="mx-auto w-full max-w-4xl"
      aria-label="Plateformes déjà disponibles"
      aria-busy={isLoading}
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase"
      >
        En attendant, explorez l'écosystème
      </motion.p>

      <div className="grid gap-4 sm:grid-cols-3">
        {isLoading && featuredPlatforms.length === 0
          ? Array.from({ length: 3 }).map((_, index) => (
            <PlatformSkeleton key={`skeleton-${index}`} />
          ))
          : featuredPlatforms.map((platform, index) => {
            const logoSrc = dark
              ? platform.logoVariants.mw
              : platform.logoVariants.mc;

            const displayUrl = stripProtocol(platform.url);

            return (
              <motion.a
                key={platform.id}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: index * 0.14,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="glass-card group flex items-start justify-between gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card p-1.5 transition-colors group-hover:border-brand/40">
                    <img
                      src={logoSrc}
                      alt={`Logo ${platform.name}`}
                      className="size-full object-contain"
                    />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">
                      {platform.name}
                    </span>

                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {platform.description}
                    </span>

                    <span className="mt-1.5 block font-mono text-[11px] text-brand">
                      {displayUrl}
                    </span>
                  </span>
                </div>

                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
              </motion.a>
            );
          })}
      </div>
    </section>
  );
}