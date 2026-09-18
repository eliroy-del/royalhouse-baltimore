import { PrayerConfirmationEmail, PrayerNotificationEmail } from "@/emails/PrayerEmails";
import { handleSubmission } from "@/lib/api";
import { absoluteLogoUrl, prayerInbox, sendBrandedEmail } from "@/lib/email/send";
import { sanitizeEmail, sanitizeText } from "@/lib/email/sanitize";
import { prayerSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Prayer requests are pastorally sensitive. The request body is emailed only
 * to the prayer inbox. Client logs and analytics never receive the request text.
 */
export async function POST(request: Request) {
  return handleSubmission({
    request,
    schema: prayerSchema,
    scope: "prayer",
    limit: 6,
    successMessage:
      "Your request has been received. Our prayer team will pray over it this week, in complete confidence.",
    deliver: async (data) => {
      const name = sanitizeText(data.name, 80);
      const email = sanitizeEmail(data.email);
      const phone = sanitizeText(data.phone, 32);
      const category = sanitizeText(data.category, 80);
      const requestText = sanitizeText(data.request, 4000);
      const displayName = data.anonymous || !name ? "Anonymous" : name;
      const logoUrl = absoluteLogoUrl();

      await sendBrandedEmail({
        scope: "prayer",
        to: prayerInbox(),
        replyTo: email || undefined,
        subject: "New Prayer Request — Royalhouse Baltimore",
        react: (
          <PrayerNotificationEmail
            logoUrl={logoUrl}
            displayName={displayName}
            email={email || undefined}
            phone={phone || undefined}
            category={category}
            request={requestText}
            keepPrivate={data.keepPrivate}
            wantsFollowUp={data.wantsFollowUp}
          />
        ),
        text: [
          `From: ${displayName}`,
          email ? `Email: ${email}` : "Email: (not provided)",
          phone ? `Phone: ${phone}` : "Phone: (not provided)",
          `Category: ${category}`,
          `Keep private: ${data.keepPrivate ? "yes" : "no"}`,
          `Wants follow-up: ${data.wantsFollowUp ? "yes" : "no"}`,
          "",
          requestText,
        ].join("\n"),
        // Never include request body in logs.
        summary: {
          category,
          anonymous: data.anonymous,
          keepPrivate: data.keepPrivate,
          wantsFollowUp: data.wantsFollowUp,
          hasContactDetails: Boolean(email || phone),
          requestLength: requestText.length,
        },
      });

      if (email) {
        await sendBrandedEmail({
          scope: "prayer",
          to: email,
          subject: "We've Received Your Prayer Request",
          react: (
            <PrayerConfirmationEmail logoUrl={logoUrl} name={data.anonymous ? undefined : name} />
          ),
          text: [
            data.anonymous || !name ? "Hello," : `Hi ${name},`,
            "",
            "Thank you for trusting us with your prayer request. Our prayer team will pray over it this week in confidence.",
          ].join("\n"),
          summary: { confirmation: true, hasEmail: true },
        });
      }
    },
  });
}
