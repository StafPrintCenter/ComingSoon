import logos from "@/assets/logos.json";
import { SITE, SITE_LINK } from "@/data/site";

export interface EcosystemSite {
  id: string;
  name: string;
  description: string;
  url: string;
  logoKey: keyof typeof logos;
  host: string
  icon: string
}

export const ECOSYSTEM_SITES: EcosystemSite[] = [
  {
    id: "landing",
    name: "Site vitrine",
    description: `Le site principal de ${SITE.name} : services, réalisations, formations, blog et contact.`,
    url: SITE_LINK.landingUrl,
    logoKey: "mc",
    host: "stafprint.com",
    icon: "globe",
  },
  {
    id: "arcade",
    name: "SPC Arcade",
    description: `Hub de jeux interactifs pour se divertir tout en développant ses compétences techniques.`,
    url: SITE_LINK.arcadeUrl,
    logoKey: "arcade",
    host: "stafprint.com",
    icon: "globe",
  },
  {
    id: "documentation",
    name: "Documentation officielle",
    description: `Guides, procédures et ressources techniques de ${SITE.name}.`,
    url: SITE_LINK.docsUrl,
    logoKey: "docs",
    host: "stafprint.com",
    icon: "globe",
  },
];