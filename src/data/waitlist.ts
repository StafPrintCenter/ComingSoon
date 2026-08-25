export type WaitlistPlatform = "instructor" | "student" | "meet" | "other";

export const WAITLIST_PLATFORM_LABELS: Record<WaitlistPlatform, string> = {
  instructor: "Espace Formateur",
  student: "Espace Apprenant",
  meet: "SPC Meet",
  other: "Autre",
};

/**
 * Type aligné sur la réponse de POST /public/waitlist/register
 */
export type APIPlatformWaitlistRegistration = {
  id: string;
  email: string;
  platformName: WaitlistPlatform;
  createdAt: string;
};