import { resolveApiUrl } from "@/lib/api-url";
import type { APIPlatformWaitlistRegistration, WaitlistPlatform } from "@/data/waitlist";

type WaitlistResponse = { data: APIPlatformWaitlistRegistration };

export class WaitlistApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string[]>;
  constructor(message: string, status: number, fieldErrors?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

export interface RegisterToWaitlistParams {
  email: string;
  platformName: WaitlistPlatform;
}

export async function registerToWaitlist(params: RegisterToWaitlistParams): Promise<APIPlatformWaitlistRegistration> {
  const formData = new FormData();
  formData.append("email", params.email);
  formData.append("platform_name", params.platformName);

  const url = resolveApiUrl(`/api/public/waitlist/register`);
  const response = await fetch(url, { method: "POST", body: formData });

  if (!response.ok) {
    let payload: { message?: string; errors?: Record<string, string[]> } = {};
    try {
      payload = await response.json();
    } catch {
      // corps non-JSON — repli générique
    }
    throw new WaitlistApiError(
      payload.message ?? "Erreur lors de l'inscription à la liste d'attente.",
      response.status,
      payload.errors
    );
  }

  const json: WaitlistResponse = await response.json();
  return json.data;
}