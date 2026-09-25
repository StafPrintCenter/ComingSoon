import { SITE, SITE_LINK } from "@/data/site";
import type { PlatformConfig } from "@/lib/site";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon, WhatsAppIcon } from "@/components/site/icons";

interface ComingSoonFooterProps {
  platform: PlatformConfig;
}

export function ComingSoonFooter({ platform }: ComingSoonFooterProps) {
  const socialLinks = [
    { label: "LinkedIn", href: SITE.socials.linkedin, Icon: LinkedinIcon },
    { label: "Facebook", href: SITE.socials.facebook, Icon: FacebookIcon },
    { label: "Instagram", href: SITE.socials.instagram, Icon: InstagramIcon },
    { label: "LinkedIn", href: SITE.socials.linkedin, Icon: LinkedinIcon },
    { label: "X", href: SITE.socials.x, Icon: XIcon },
    { label: "WhatsApp", href: SITE.whatsappLink, Icon: WhatsAppIcon },
  ];

  return (
    <footer className="relative z-10 border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8">
        {/* Copyright avec platform.name */}
        <p className="text-center text-xs text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} {platform.name} · Tous droits réservés.
          <span className="mx-1.5 hidden text-muted-foreground/50 sm:inline">|</span>
          <a
            href={SITE_LINK.landingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block font-medium underline underline-offset-4 transition-colors hover:text-primary sm:mt-0 sm:inline"
          >
            {SITE.name}
          </a>
        </p>

        {/* Info Build/Progression & Réseaux sociaux */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Build <span className="text-brand">{platform.version}</span> · {platform.progress}% complete
          </p>

          <span className="hidden text-muted-foreground/30 sm:inline">|</span>

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}