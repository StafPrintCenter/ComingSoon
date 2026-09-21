import { SITE } from "@/data/site";
import type { PlatformConfig } from "@/lib/site";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon, WhatsAppIcon } from "@/components/site/icons";

interface ComingSoonFooterProps {
  platform: PlatformConfig;
}

export function ComingSoonFooter({ platform }: ComingSoonFooterProps) {
  const socialLinks = [
    { label: "Facebook", href: SITE.socials.facebook, Icon: FacebookIcon },
    { label: "Instagram", href: SITE.socials.instagram, Icon: InstagramIcon },
    { label: "LinkedIn", href: SITE.socials.linkedin, Icon: LinkedinIcon },
    { label: "X", href: SITE.socials.x, Icon: XIcon },
    { label: "WhatsApp", href: SITE.whatsappLink, Icon: WhatsAppIcon },
  ];

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