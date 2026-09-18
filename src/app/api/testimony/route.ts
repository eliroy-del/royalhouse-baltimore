import { deliverMail, officeInbox } from "@/lib/mail";
import { handleSubmission } from "@/lib/api";
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
      const displayName = data.anonymous ? "(anonymous requested)" : data.name;

      await deliverMail({
        scope: "testimony",
        to: officeInbox(),
        replyTo: data.email,
        subject: `Testimony · ${data.category} · ${displayName}`,
        text: [
          `Name: ${displayName}`,
          `Email: ${data.email}`,
          `Category: ${data.category}`,
          `Permission to publish: ${data.permissionToPublish ? "yes" : "no"}`,
          `Anonymous: ${data.anonymous ? "yes" : "no"}`,
          "",
          data.testimony,
          "",
          "Moderation status: pending",
        ].join("\n"),
        summary: {
          name: displayName,
          email: data.email,
          category: data.category,
          permissionToPublish: data.permissionToPublish,
          anonymous: data.anonymous,
          length: data.testimony.length,
          moderationStatus: "pending",
        },
      });
    },
  });
}
