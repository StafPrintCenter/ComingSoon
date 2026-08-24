import { motion } from "framer-motion";
import { Moon, Rocket, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logos.json";
import { SITE_LINK } from "@/data/site";

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("spc-theme", next ? "dark" : "light");
    } catch {
      /* stockage indisponible */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-brand"
    >
      {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export function ComingSoonHeader() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href={SITE_LINK.landingUrl} className="flex items-center">
          <img src={logo.dc} alt="Logo SPC" className="h-10 md:h-12 w-auto" />
        </a>

        <div className="flex items-center gap-3">
          {/* Badge bêta rétro-éclairé */}
          <span className="glass-card hidden items-center gap-2 rounded-full px-4 py-1.5 sm:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-brand" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Rocket className="size-3.5 text-brand" />
              Bientôt disponible
              <span className="text-muted-foreground">•</span>
              <span className="font-mono text-[11px] text-brand">Phase Bêta</span>
            </span>
          </span>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
