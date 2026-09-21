import { SITE } from "@/data/site";
import type { PlatformConfig } from "@/lib/site";

interface ComingSoonFooterProps {
  platform: PlatformConfig;
}

export function ComingSoonFooter({ platform }: ComingSoonFooterProps) {
  return (
    <footer className="relative z-10 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row sm:px-8">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name} - Tous droits réservés.
        </p>
        <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
          Build <span className="text-brand">{platform.version}</span> · {platform.progress}% complete
        </p>
      </div>
    </footer>
  );
}