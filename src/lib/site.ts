import { SITE } from "@/data/site";
import logo from "@/assets/logos.json";

export type PlatformKey = "meet" | "student" | "instructor";

export interface PlatformConfig {
  key: string;
  name: string;
  tagline: string;
  progress: number;
  version: string;
  logo?: { dark: string; light: string };
  roadmap: { title: string; description: string }[];
}

const GENERIC_ROADMAP: PlatformConfig["roadmap"] = [
  {
    title: "Interface nouvelle génération",
    description: `Une expérience repensée, rapide et élégante, fidèle à la charte ${SITE.name}.`,
  },
  {
    title: "Synchronisation écosystème",
    description: `Connexion transparente avec toutes les plateformes ${SITE.name}.`,
  },
  {
    title: "Sécurité renforcée",
    description: "Authentification unifiée et protection des données de bout en bout.",
  },
];

export const PLATFORMS: Record<PlatformKey, PlatformConfig> = {
  instructor: {
    key: "instructor",
    name: "Espace Formateur",
    progress: 36,
    version: "v0.4.0-beta",
    tagline: `Préparer, animer et évaluer les sessions de formation : parcours, supports, présence, notation et suivi des apprenants pour ${SITE.name}.`,
    logo: { dark: logo.instructorDW, light: logo.instructorD },
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
  student: {
    key: "student",
    name: "Espace Apprenant",
    progress: 12,
    version: "v0.1.2-alpha",
    tagline: `S'inscrire à une formation, suivre ses cours, rendre ses devoirs et récupérer ses attestations depuis le Student Hub de ${SITE.name}.`,
    logo: { dark: logo.studentDW, light: logo.studentD },
    roadmap: [
      {
        title: "Parcours personnalisés",
        description: "Vos modules, vos échéances et votre progression au fil des sessions.",
      },
      {
        title: "Ressources en ligne",
        description: "Supports, corrigés et replays accessibles depuis n'importe quel appareil.",
      },
      {
        title: "Attestations numériques",
        description: "Vos certificats vérifiables générés automatiquement en fin de parcours.",
      },
    ],
  },
  meet: {
    key: "meet",
    name: "SPC Meet",
    progress: 18,
    version: "v0.2.4-alpha",
    tagline: `Plateforme de visioconférence pour les réunions et sessions à distance de ${SITE.name}.`,
    roadmap: [
      {
        title: "Salles HD instantanées",
        description: "Créez une réunion en un clic, sans installation, avec un lien unique.",
      },
      {
        title: "Partage d'écran 4K",
        description: "Présentez vos maquettes et documents avec une qualité studio.",
      },
      {
        title: "Enregistrement cloud",
        description: `Retrouvez chaque session archivée dans votre espace ${SITE.name}.`,
      },
    ],
  },
};

/** Association directe des sous-domaines stricts vers leur PlatformKey. */
const SUBDOMAIN_ALIASES: Record<string, PlatformKey> = {
  meet: "meet",
  student: "student",
  instructor: "instructor",
};

const IGNORED_SUBDOMAINS = new Set(["www", "localhost", "stafprint", "id-preview", "preview"]);

function prettifySlug(slug: string) {
  return `SPC ${slug.replace(/[-_]+/g, " ").toUpperCase()}`.trim();
}

/** Extrait le sous-domaine (partie avant stafprint.com). */
export function extractSubdomain(hostname: string): string {
  const parts = hostname.toLowerCase().split(".");
  if (parts.length < 3) return "";
  return parts[0] ?? "";
}

/**
 * Résout la configuration de la plateforme depuis le sous-domaine,
 * avec un repli générique construit dynamiquement à partir du slug.
 */
export function resolvePlatform(source: string): PlatformConfig {
  const raw = (source.includes(".") ? extractSubdomain(source) : source).toLowerCase();

  if (raw && raw in PLATFORMS) return PLATFORMS[raw as PlatformKey];

  const alias = SUBDOMAIN_ALIASES[raw];
  if (alias) return PLATFORMS[alias];

  if (!raw || IGNORED_SUBDOMAINS.has(raw)) {
    return {
      ...PLATFORMS.meet,
      key: "generic",
      name: "Nouvelle plateforme SPC",
      progress: 15,
      version: "v0.1.0-alpha",
      tagline: `Nous peaufinons les dernières fonctionnalités pour vous offrir une expérience d'exception au sein de l'écosystème ${SITE.name}.`,
      roadmap: GENERIC_ROADMAP,
    };
  }

  return {
    key: raw,
    name: prettifySlug(raw),
    progress: 15,
    version: "v0.1.0-alpha",
    tagline: `Cette plateforme de l'écosystème ${SITE.name} est en cours de construction. Nous peaufinons chaque détail avant l'ouverture.`,
    roadmap: GENERIC_ROADMAP,
  };
}

export type BuildStepStatus = "done" | "active" | "pending";

const STEP_THRESHOLDS = [
  { label: "UI Design", threshold: 25 },
  { label: "API Integration", threshold: 50 },
  { label: "Testing", threshold: 75 },
  { label: "Launch", threshold: 100 },
] as const;

/** Étapes du build déduites du pourcentage d'avancement de la plateforme. */
export function getBuildSteps(progress: number): { label: string; status: BuildStepStatus }[] {
  let activeAssigned = false;
  return STEP_THRESHOLDS.map((step) => {
    if (progress >= step.threshold) return { label: step.label, status: "done" as const };
    if (!activeAssigned) {
      activeAssigned = true;
      return { label: step.label, status: "active" as const };
    }
    return { label: step.label, status: "pending" as const };
  });
}
