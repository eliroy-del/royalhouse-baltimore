/**
 * Centralized email configuration for Royalhouse Baltimore.
 * Secrets come only from server env — never NEXT_PUBLIC_*.
 */

export const emailBrand = {
  royalBlue: "#004AAD",
  gold: "#F4D26C",
  white: "#FFFFFF",
  black: "#000000",
  navyDeep: "#001226",
} as const;

export const emailConfig = {
  /** Verified Resend sender. Override with FORM_FROM_EMAIL if needed. */
  from:
    process.env.FORM_FROM_EMAIL?.trim() ||
    "Royalhouse Baltimore <website@royalhousebaltimore.org>",

  /** Primary church inbox for form notifications. */
  defaultRecipient:
    process.env.FORM_TO_EMAIL?.trim() || "baltimore@royalhousemd.org",

  /** Prayer / pastoral care inbox (defaults to office). */
  prayerRecipient:
    process.env.PRAYER_TO_EMAIL?.trim() ||
    process.env.FORM_TO_EMAIL?.trim() ||
    "baltimore@royalhousemd.org",

  logoPath: "/logo/royalhouse-baltimore.png",
} as const;

export type EmailScope =
  | "contact"
  | "plan-a-visit"
  | "prayer"
  | "serve"
  | "newsletter"
  | "testimony"
  | "transactional";
