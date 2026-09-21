import type { ReactNode } from "react";
import { ComingSoonHeader, ComingSoonFooter } from "./";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ComingSoonHeader />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <ComingSoonFooter />
    </div>
  );
}