import type { ReactNode } from "react";
import { ComingSoonHeader, ComingSoonFooter } from "./";
import type { PlatformConfig } from "@/lib/site";

interface SiteShellProps {
  children: ReactNode;
  platform: PlatformConfig;
}

export function SiteShell({ children, platform }: SiteShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <ComingSoonHeader platform={platform} />

      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <ComingSoonFooter platform={platform} />
    </div>
  );
}