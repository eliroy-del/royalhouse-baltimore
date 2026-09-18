import type { ReactElement } from "react";
import { render } from "@react-email/render";
import { siteUrl } from "@/config/site";
import { logSubmission } from "@/lib/api";
import { assertResendConfigured, getResendClient } from "@/lib/email/client";
import { emailConfig, type EmailScope } from "@/lib/email/config";

export function absoluteLogoUrl(): string {
  return `${siteUrl}${emailConfig.logoPath}`;
}

export function officeInbox(): string {
  return emailConfig.defaultRecipient;
}

export function prayerInbox(): string {
  return emailConfig.prayerRecipient;
}

export function inboxForContactReason(reason: string): string {
  switch (reason) {
    case "Prayer":
    case "Pastoral Care":
      return prayerInbox();
    default:
      return officeInbox();
  }
}

interface SendBrandedEmailOptions {
  scope: EmailScope;
  to: string | string[];
  subject: string;
  react: ReactElement;
  text: string;
  replyTo?: string;
  /** Non-sensitive metadata only — never include prayer bodies. */
  summary: Record<string, unknown>;
}

/**
 * Sends a branded HTML + text email via Resend.
 * Logs a safe summary. Throws on failure so API routes can return 502.
 */
export async function sendBrandedEmail({
  scope,
  to,
  subject,
  react,
  text,
  replyTo,
  summary,
}: SendBrandedEmailOptions): Promise<void> {
  const recipients = Array.isArray(to) ? to : [to];

  logSubmission(scope, {
    ...summary,
    to: recipients,
    hasReplyTo: Boolean(replyTo),
  });

  const resend = getResendClient();
  if (!resend) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("RESEND_API_KEY is not configured");
    }
    console.warn(
      `[royalhouse:${scope}] RESEND_API_KEY missing — submission logged only (dev).`,
    );
    return;
  }

  const html = await render(react);

  const { error } = await resend.emails.send({
    from: emailConfig.from,
    to: recipients,
    subject,
    html,
    text,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    console.error(`[royalhouse:${scope}] email failed`, {
      name: error.name,
      message: error.message,
    });
    throw new Error(error.message);
  }
}

/** Optional hard check used by health scripts. */
export function requireResendInProduction(): void {
  if (process.env.NODE_ENV === "production") {
    assertResendConfigured();
  }
}
