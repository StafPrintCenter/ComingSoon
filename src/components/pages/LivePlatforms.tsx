import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Gamepad2, Globe } from "lucide-react";
import { LIVE_PLATFORMS } from "@/lib/site";

const icons = {
  globe: Globe,
  book: BookOpen,
  gamepad: Gamepad2,
} as const;

export function LivePlatforms() {
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
        {LIVE_PLATFORMS.map((platform, index) => {
          const Icon = icons[platform.icon];
          return (
            <motion.a
              key={platform.host}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card group flex items-start justify-between gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors group-hover:border-brand/40 group-hover:text-brand">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {platform.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {platform.description}
                  </span>
                  <span className="mt-1.5 block font-mono text-[11px] text-brand">
                    {platform.host}
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
