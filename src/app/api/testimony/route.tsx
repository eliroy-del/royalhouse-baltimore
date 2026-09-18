import { TestimonyNotificationEmail } from "@/emails/TestimonyEmails";
import { handleSubmission } from "@/lib/api";
import { absoluteLogoUrl, officeInbox, sendBrandedEmail } from "@/lib/email/send";
import { sanitizeEmail, sanitizeText } from "@/lib/email/sanitize";
import { testimonySchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Testimonies enter a moderation queue by email. Nothing submitted here is
 * published automatically.
 */
export async function POST(request: Request) {
  return handleSubmission({
    request,
    schema: testimonySchema,
    scope: "testimony",
    limit: 3,
    successMessage:
      "Thank you for sharing. A member of our team will read it personally and get in touch before anything is published.",
    deliver: async (data) => {
      const name = sanitizeText(data.name, 80);
      const email = sanitizeEmail(data.email);
      const category = sanitizeText(data.category, 80);
      const testimony = sanitizeText(data.testimony, 6000);
      const displayName = data.anonymous ? "(anonymous requested)" : name;
      const logoUrl = absoluteLogoUrl();

      await sendBrandedEmail({
        scope: "testimony",
        to: officeInbox(),
        replyTo: email,
        subject: `Testimony · ${category} · ${displayName}`,
        react: (
          <TestimonyNotificationEmail
            logoUrl={logoUrl}
            displayName={displayName}
            email={email}
            category={category}
            testimony={testimony}
            permissionToPublish={data.permissionToPublish}
            anonymous={data.anonymous}
          />
        ),
        text: [
          `Name: ${displayName}`,
          `Email: ${email}`,
          `Category: ${category}`,
          `Permission to publish: ${data.permissionToPublish ? "yes" : "no"}`,
          `Anonymous: ${data.anonymous ? "yes" : "no"}`,
          "",
          testimony,
          "",
          "Moderation status: pending",
        ].join("\n"),
        summary: {
          name: displayName,
          email,
          category,
          permissionToPublish: data.permissionToPublish,
          anonymous: data.anonymous,
          length: testimony.length,
          moderationStatus: "pending",
        },
      });
    },
  });
}
