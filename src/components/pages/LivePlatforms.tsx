import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { stripProtocol } from "@/lib/domain";
import { useTheme } from "@/hooks/useTheme";
import { useEcosystemSitesStore } from "@/stores/useEcosystemSitesStore";

const FEATURED_SITE_NAMES = ["Site vitrine", "Documentation officielle", "SPC Arcade"];

export function LivePlatforms() {
  const { dark } = useTheme();
  const { sites, isLoading } = useEcosystemSitesStore();

  // Filtrage exclusif sur les 3 plateformes cibles
  const featuredPlatforms = sites.filter((site) =>
    FEATURED_SITE_NAMES.some(
      (name) => site.name.toLowerCase().trim() === name.toLowerCase().trim()
    )
  );

  if (isLoading && featuredPlatforms.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-4xl" aria-label="Plateformes déjà disponibles">
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
        {ECOSYSTEM_SITES.map((platform, index) => {
          const logoSrc = logos[dark ? platform.logoDarkKey : platform.logoKey];
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
              transition={{ delay: index * 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card group flex items-start justify-between gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card p-1.5 transition-colors group-hover:border-brand/40">
                  <img
                    src={logoSrc}
                    alt={`Logo ${platform.name}`}
                    className="size-full object-contain"
                  />
                </span>
                <span>
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