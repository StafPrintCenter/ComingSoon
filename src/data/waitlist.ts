export type WaitlistPlatform =
  | "instructor"
  | "student"
  | "meet"
  | "roadmap"
  | "other";

export const WAITLIST_PLATFORM_LABELS: Record<WaitlistPlatform, string> = {
  instructor: "Espace Formateur",
  student: "Espace Apprenant",
  meet: "SPC Meet",
  roadmap: "SPC Roadmap",
  other: "Autre",
};

const VALID_PLATFORMS: WaitlistPlatform[] = [
  "instructor",
  "student",
  "meet",
  "roadmap",
  "other",
];

function resolvePlatformFromEnv(): WaitlistPlatform {
  const raw = import.meta.env.VITE_PLATFORM_NAME;

  return VALID_PLATFORMS.includes(raw as WaitlistPlatform)
    ? (raw as WaitlistPlatform)
    : "other";
}

export const CURRENT_WAITLIST_PLATFORM: WaitlistPlatform =
  resolvePlatformFromEnv();

export type APIPlatformWaitlistRegistration = {
  id: string;
  email: string;
  platformName: WaitlistPlatform;
  createdAt: string;
};