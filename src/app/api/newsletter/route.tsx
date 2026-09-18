import {
  NewsletterConfirmationEmail,
  NewsletterNotificationEmail,
} from "@/emails/NewsletterEmails";
import { handleSubmission } from "@/lib/api";
import { absoluteLogoUrl, officeInbox, sendBrandedEmail } from "@/lib/email/send";
import { sanitizeEmail } from "@/lib/email/sanitize";
import { newsletterSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleSubmission({
    request,
    schema: newsletterSchema,
    scope: "newsletter",
    limit: 5,
    successMessage: "You're subscribed. Watch out for our next update.",
    deliver: async (data) => {
      const email = sanitizeEmail(data.email);
      const logoUrl = absoluteLogoUrl();

      await sendBrandedEmail({
        scope: "newsletter",
        to: officeInbox(),
        replyTo: email,
        subject: `Newsletter Signup — ${email}`,
        react: <NewsletterNotificationEmail logoUrl={logoUrl} email={email} />,
        text: `Email: ${email}\nConsent: yes\n\nAdd this address to the church mailing list.`,
        summary: { email, consent: data.consent },
      });

      await sendBrandedEmail({
        scope: "newsletter",
        to: email,
        subject: "You're Subscribed — Royalhouse Baltimore",
        react: <NewsletterConfirmationEmail logoUrl={logoUrl} />,
        text: "Thank you for signing up for Royalhouse Baltimore updates. You can unsubscribe any time.",
        summary: { confirmation: true, email },
      });
    },
  });
}
