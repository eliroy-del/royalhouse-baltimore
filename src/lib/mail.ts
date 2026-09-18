import { Resend } from "resend";
import { churchConfig } from "@/config/church";
import { prayerEmail } from "@/lib/church";
import { logSubmission } from "@/lib/api";

const FROM_EMAIL =
  process.env.FORM_FROM_EMAIL?.trim() || "Royalhouse Baltimore <onboarding@resend.dev>";

const OFFICE_EMAIL =
  process.env.FORM_TO_EMAIL?.trim() || churchConfig.contact.email;

function getResend() {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

export function inboxForContactReason(reason: string): string {
  switch (reason) {
    case "Prayer":
    case "Pastoral Care":
      return prayerEmail();
    case "Giving":
      return OFFICE_EMAIL;
    default:
      return OFFICE_EMAIL;
  }
}

interface SendMailOptions {
  scope: string;
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  summary: Record<string, unknown>;
}

/**
 * Delivers a form submission by email when Resend is configured.
 * Always logs a non-sensitive summary. Throws if delivery fails so the
 * API can return a clear error instead of a false success.
 */
export async function deliverMail({
  scope,
  to,
  subject,
  text,
  replyTo,
  summary,
}: SendMailOptions) {
  logSubmission(scope, { ...summary, to });

  const resend = getResend();
  if (!resend) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("RESEND_API_KEY is not configured");
    }
    console.warn(
      `[royalhouse:${scope}] RESEND_API_KEY missing — submission logged only (dev).`,
    );
    return;
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [to],
    subject,
    text,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    console.error(`[royalhouse:${scope}] email failed`, error);
    throw new Error(error.message);
  }
}

export function officeInbox() {
  return OFFICE_EMAIL;
}

export function prayerInbox() {
  return process.env.PRAYER_TO_EMAIL?.trim() || prayerEmail();
}
