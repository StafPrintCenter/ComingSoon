import { motion } from "framer-motion";
import { HardHat } from "lucide-react";
import { NotifyForm } from "@/components/pages";
import type { PlatformConfig } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

interface ComingSoonHeroTextProps {
  platform: PlatformConfig;
}

export function ComingSoonHeroText({ platform }: ComingSoonHeroTextProps) {
  return (
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
        arrive très bientôt.sss
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
          Zéro spam - un seul email au moment du lancement.
        </p>
      </motion.div>
    </div>
  );
}