import { motion } from "framer-motion";
import { Check, Loader2, Circle } from "lucide-react";
import { getBuildSteps } from "@/lib/site";

const stepIcon = {
  done: <Check className="size-3.5" />,
  active: <Loader2 className="size-3.5 animate-spin" />,
  pending: <Circle className="size-3.5" />,
} as const;

export function BuildProgress({ progress }: { progress: number }) {
  const steps = getBuildSteps(progress);

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card mx-auto w-full max-w-2xl rounded-3xl p-6 sm:p-8"
      aria-label="Avancement des développements"
    >
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
            Avancement
          </p>
          <p className="mt-1 font-display text-4xl font-bold tracking-tight text-foreground">
            <span className="font-mono text-brand text-glow-brand">{progress}%</span>
            <span className="ml-2 text-lg font-semibold text-muted-foreground">finalisé</span>
          </p>
        </div>
        <span className="rounded-full border border-brand/30 bg-brand-soft px-3 py-1 font-mono text-[10px] font-semibold tracking-widest text-brand uppercase">
          En cours
        </span>
      </div>

      {/* Barre de progression animée */}
      <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-brand relative h-full overflow-hidden rounded-full"
        >
          <span className="absolute inset-y-0 w-1/2 animate-shimmer-bar bg-linear-to-r from-transparent via-white/40 to-transparent" />
        </motion.div>
      </div>

      {/* Étapes du build */}
      <ol className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4">
        {steps.map((step, index) => (
          <motion.li
            key={step.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.12, duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <span
              className={
                step.status === "done"
                  ? "flex size-6 items-center justify-center rounded-full bg-brand text-primary-foreground"
                  : step.status === "active"
                    ? "flex size-6 items-center justify-center rounded-full border border-brand text-brand"
                    : "flex size-6 items-center justify-center rounded-full border border-border text-muted-foreground"
              }
            >
              {stepIcon[step.status]}
            </span>
            <span
              className={
                step.status === "pending"
                  ? "font-mono text-[11px] font-medium text-muted-foreground"
                  : "font-mono text-[11px] font-semibold text-foreground"
              }
            >
              {step.label}
            </span>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
}
