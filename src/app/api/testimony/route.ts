import { handleSubmission, logSubmission } from "@/lib/api";
import { testimonySchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Testimonies enter a moderation queue. Nothing submitted here is ever
 * published automatically, a human must review it, and `permissionToPublish`
 * must be explicitly granted before it can appear on the site.
 */
export async function POST(request: Request) {
  return handleSubmission({
    request,
    schema: testimonySchema,
    scope: "testimony",
    limit: 3,
    successMessage:
      "Thank you for sharing. A member of our team will read it personally and get in touch before anything is published.",
    deliver: (data) => {
      // TODO: write to a moderation queue with `approved: false`.
      logSubmission("testimony", {
        name: data.anonymous ? "(anonymous requested)" : data.name,
        email: data.email,
        category: data.category,
        permissionToPublish: data.permissionToPublish,
        anonymous: data.anonymous,
        length: data.testimony.length,
        moderationStatus: "pending",
      });
    },
  });
}
