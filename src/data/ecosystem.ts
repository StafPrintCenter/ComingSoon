import logos from "@/assets/logos.json";
import { SITE, SITE_LINK } from "@/data/site";

export interface EcosystemSite {
  id: string;
  name: string;
  description: string;
  url: string;
  logoKey: keyof typeof logos;
  logoDarkKey: keyof typeof logos;
}

export const ECOSYSTEM_SITES: EcosystemSite[] = [
  {
    id: "landing",
    name: "Site vitrine",
    description: `Le site principal de ${SITE.name} : services, réalisations, formations, blog et contact.`,
    url: SITE_LINK.landingUrl,
    logoKey: "mc",
    logoDarkKey: "mw",
  },
  {
    id: "arcade",
    name: "SPC Arcade",
    description: "Hub de jeux interactifs pour se divertir tout en développant ses compétences techniques.",
    url: SITE_LINK.arcadeUrl,
    logoKey: "arcade",
    logoDarkKey: "arcadeW",
  },
  {
    id: "documentation",
    name: "Documentation officielle",
    description: `Guides, procédures et ressources techniques de ${SITE.name}.`,
    url: SITE_LINK.docsUrl,
    logoKey: "docs",
    logoDarkKey: "docsW",
  },
];