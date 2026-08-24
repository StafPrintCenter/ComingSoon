import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { PlatformConfig } from "@/lib/site";

export function Roadmap({ roadmap }: { roadmap: PlatformConfig["roadmap"] }) {
  return (
    <section className="mx-auto w-full max-w-4xl" aria-label="Fonctionnalités à venir">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center justify-center gap-2 font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase"
      >
        <Sparkles className="size-3.5 text-brand" />
        Ce qui vous attend
      </motion.p>
      <div className="grid gap-4 sm:grid-cols-3">
        {roadmap.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
          >
            <span className="gradient-brand mb-4 flex size-9 items-center justify-center rounded-lg font-mono text-xs font-bold text-primary-foreground">
              0{index + 1}
            </span>
            <h3 className="font-display text-sm font-semibold text-foreground transition-colors group-hover:text-brand">
              {item.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
