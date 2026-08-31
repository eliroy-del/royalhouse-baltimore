import { handleSubmission, logSubmission } from "@/lib/api";
import { prayerSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Prayer requests are pastorally sensitive. The body of the request is never
 * logged, never cached and never sent to analytics — only non-identifying
 * metadata is recorded so the team can confirm delivery.
 */
export async function POST(request: Request) {
  return handleSubmission({
    request,
    schema: prayerSchema,
    scope: "prayer",
    limit: 6,
    successMessage:
      "Your request has been received. Our prayer team will pray over it this week — in complete confidence.",
    deliver: (data) => {
      // TODO: deliver to the private prayer team inbox over an encrypted transport.
      logSubmission("prayer", {
        category: data.category,
        anonymous: data.anonymous,
        keepPrivate: data.keepPrivate,
        wantsFollowUp: data.wantsFollowUp,
        hasContactDetails: Boolean(data.email || data.phone),
        requestLength: data.request.length,
      });
    },
  });
}
