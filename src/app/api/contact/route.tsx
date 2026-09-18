import { ContactConfirmationEmail, ContactNotificationEmail } from "@/emails/ContactEmails";
import { handleSubmission } from "@/lib/api";
import {
  absoluteLogoUrl,
  inboxForContactReason,
  sendBrandedEmail,
} from "@/lib/email/send";
import { sanitizeEmail, sanitizeText } from "@/lib/email/sanitize";
import { contactSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleSubmission({
    request,
    schema: contactSchema,
    scope: "contact",
    limit: 5,
    successMessage:
      "Thank you, your message is with our team. We usually reply within two working days.",
    deliver: async (data) => {
      const name = sanitizeText(data.name, 80);
      const email = sanitizeEmail(data.email);
      const phone = sanitizeText(data.phone, 32);
      const reason = sanitizeText(data.reason, 80);
      const message = sanitizeText(data.message, 4000);
      const logoUrl = absoluteLogoUrl();
      const to = inboxForContactReason(reason);

      await sendBrandedEmail({
        scope: "contact",
        to,
        replyTo: email,
        subject: `New Contact Request — ${name}`,
        react: (
          <ContactNotificationEmail
            logoUrl={logoUrl}
            name={name}
            email={email}
            phone={phone}
            reason={reason}
            message={message}
          />
        ),
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : null,
          `Reason: ${reason}`,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
        summary: {
          name,
          email,
          reason,
          messageLength: message.length,
        },
      });

      await sendBrandedEmail({
        scope: "contact",
        to: email,
        subject: "Thanks for Connecting With Royalhouse Baltimore",
        react: <ContactConfirmationEmail logoUrl={logoUrl} name={name} />,
        text: [
          `Hi ${name},`,
          "",
          "Thank you for reaching out to Royalhouse Baltimore. We received your message and our team will get back to you soon.",
        ].join("\n"),
        summary: { confirmation: true, email },
      });
    },
  });
}
