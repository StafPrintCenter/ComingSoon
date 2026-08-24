/**
 * Configuration centrale de l'écosystème STAF PRINT CENTER.
 * Le nom de la plateforme en construction est injecté dynamiquement :
 * priorité au paramètre d'URL `?platform=`, sinon détection par sous-domaine.
 */

export const SITE = {
  name: "STAF PRINT CENTER",
  shortName: "SPC",
  domain: "stafprint.com",
  version: "v0.9.2-beta",
  year: 2026,
} as const;

export type PlatformKey = "default" | "meet" | "shortener" | "formateur";

export interface PlatformConfig {
  key: PlatformKey;
  name: string;
  tagline: string;
  roadmap: { title: string; description: string }[];
}

const DEFAULT_ROADMAP: PlatformConfig["roadmap"] = [
  {
    title: "Interface nouvelle génération",
    description: "Une expérience repensée, rapide et élégante, fidèle à la charte STAF PRINT.",
  },
  {
    title: "Synchronisation écosystème",
    description: "Connexion transparente avec toutes les plateformes STAF PRINT CENTER.",
  },
  {
    title: "Sécurité renforcée",
    description: "Authentification unifiée et protection des données de bout en bout.",
  },
];

export const PLATFORMS: Record<PlatformKey, PlatformConfig> = {
  default: {
    key: "default",
    name: "Nouvelle Plateforme",
    tagline:
      "Nous peaufinons les dernières fonctionnalités pour vous offrir une expérience d'exception au sein de l'écosystème STAF PRINT CENTER.",
    roadmap: DEFAULT_ROADMAP,
  },
  meet: {
    key: "meet",
    name: "SPC Meet",
    tagline:
      "Visioconférence souveraine et fluide, pensée pour vos équipes. Nous peaufinons les dernières fonctionnalités au sein de l'écosystème STAF PRINT CENTER.",
    roadmap: [
      {
        title: "Salles HD instantanées",
        description: "Créez une réunion en un clic, sans installation, avec un partage de lien unique.",
      },
      {
        title: "Partage d'écran 4K",
        description: "Présentez vos maquettes et documents avec une qualité studio.",
      },
      {
        title: "Enregistrement cloud",
        description: "Retrouvez chaque session archivée dans votre espace STAF PRINT.",
      },
    ],
  },
  shortener: {
    key: "shortener",
    name: "SPC Shortener",
    tagline:
      "Raccourcisseur de liens intelligent avec statistiques en temps réel. Nous peaufinons les dernières fonctionnalités au sein de l'écosystème STAF PRINT CENTER.",
    roadmap: [
      {
        title: "Liens de marque",
        description: "Des URLs courtes personnalisées aux couleurs de votre identité.",
      },
      {
        title: "Analytics en direct",
        description: "Clics, origines et appareils mesurés en temps réel.",
      },
      {
        title: "QR codes dynamiques",
        description: "Générez et modifiez vos QR codes sans jamais les réimprimer.",
      },
    ],
  },
  formateur: {
    key: "formateur",
    name: "Espace Formateur",
    tagline:
      "Le cockpit pédagogique des formateurs STAF PRINT. Nous peaufinons les dernières fonctionnalités pour vous offrir une expérience d'exception.",
    roadmap: [
      {
        title: "Suivi des apprenants",
        description: "Progression, assiduité et résultats centralisés dans un tableau de bord unique.",
      },
      {
        title: "Bibliothèque de contenus",
        description: "Partagez supports, exercices et corrections en quelques secondes.",
      },
      {
        title: "Sessions planifiées",
        description: "Calendrier intégré et rappels automatiques pour chaque cohorte.",
      },
    ],
  },
};

/** Détecte la plateforme depuis le sous-domaine (ex: meet.stafprint.com). */
export function detectPlatformFromHostname(hostname: string): PlatformKey {
  const sub = hostname.split(".")[0]?.toLowerCase() ?? "";
  if (sub.includes("meet")) return "meet";
  if (sub.includes("short") || sub === "go") return "shortener";
  if (sub.includes("formateur") || sub.includes("teach")) return "formateur";
  return "default";
}

/** Plateformes disponibles de l'écosystème (navigation de secours). */
export const LIVE_PLATFORMS = [
  {
    label: "Site Principal",
    description: "Découvrir STAF PRINT CENTER",
    href: "https://stafprint.com",
    host: "stafprint.com",
    icon: "globe",
  },
  {
    label: "Documentation",
    description: "Guides et références techniques",
    href: "https://docs.stafprint.com",
    host: "docs.stafprint.com",
    icon: "book",
  },
  {
    label: "SPC Arcade",
    description: "Espace jeux et détente",
    href: "https://play.stafprint.com",
    host: "play.stafprint.com",
    icon: "gamepad",
  },
] as const;

export const BUILD_PROGRESS = 27;

export const BUILD_STEPS = [
  { label: "UI Design", status: "done" },
  { label: "API Integration", status: "done" },
  { label: "Testing", status: "active" },
  { label: "Launch", status: "pending" },
] as const;
