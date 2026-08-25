import { resolveApiUrl } from "@/lib/api-url";
import { parseApiError } from "@/lib/api-error";
import { CURRENT_WAITLIST_PLATFORM } from "@/data/waitlist";
import type { APIPlatformWaitlistRegistration } from "@/data/waitlist";

type WaitlistResponse = { message?: string; data: APIPlatformWaitlistRegistration };

export interface RegisterToWaitlistParams {
  email: string;
}

export interface RegisterToWaitlistResult {
  registration: APIPlatformWaitlistRegistration;
  message: string | null;
}

export async function registerToWaitlist(params: RegisterToWaitlistParams): Promise<RegisterToWaitlistResult> {
  const formData = new FormData();
  formData.append("email", params.email);
  formData.append("platform_name", CURRENT_WAITLIST_PLATFORM);

  const url = resolveApiUrl(`/api/public/waitlist/register`);
  const response = await fetch(url, { method: "POST", body: formData });

  if (!response.ok) {
    throw await parseApiError(response, "Erreur lors de l'inscription à la liste d'attente.");
  }

  const json: WaitlistResponse = await response.json();
  return { registration: json.data, message: json.message ?? null };
}