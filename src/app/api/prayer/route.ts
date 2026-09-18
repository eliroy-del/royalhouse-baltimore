import { deliverMail, prayerInbox } from "@/lib/mail";
import { handleSubmission } from "@/lib/api";
import { prayerSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Prayer requests are pastorally sensitive. The request body is emailed only
 * to the prayer inbox and is never written to logs or analytics.
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
      const to = prayerInbox();
      const displayName = data.anonymous || !data.name ? "Anonymous" : data.name;

      await deliverMail({
        scope: "prayer",
        to,
        replyTo: data.email || undefined,
        subject: `Prayer request · ${data.category}${data.keepPrivate ? " · private" : ""}`,
        text: [
          `Category: ${data.category}`,
          `From: ${displayName}`,
          data.email ? `Email: ${data.email}` : "Email: (not provided)",
          data.phone ? `Phone: ${data.phone}` : "Phone: (not provided)",
          `Keep private: ${data.keepPrivate ? "yes" : "no"}`,
          `Wants follow-up: ${data.wantsFollowUp ? "yes" : "no"}`,
          "",
          data.request,
        ].join("\n"),
        summary: {
          category: data.category,
          anonymous: data.anonymous,
          keepPrivate: data.keepPrivate,
          wantsFollowUp: data.wantsFollowUp,
          hasContactDetails: Boolean(data.email || data.phone),
          requestLength: data.request.length,
        },
      });
    },
  });
}
