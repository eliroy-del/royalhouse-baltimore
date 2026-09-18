import { Resend } from "resend";

/**
 * Server-only Resend client. Instantiated lazily so builds succeed
 * without RESEND_API_KEY, while runtime still fails closed in production.
 */
let client: Resend | null | undefined;

export function getResendClient(): Resend | null {
  if (client !== undefined) return client;

  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    client = null;
    return null;
  }

  client = new Resend(key);
  return client;
}

export function assertResendConfigured(): Resend {
  const resend = getResendClient();
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return resend;
}
