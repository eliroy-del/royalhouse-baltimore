import { deliverMail, officeInbox } from "@/lib/mail";
import { handleSubmission } from "@/lib/api";
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
      await deliverMail({
        scope: "newsletter",
        to: officeInbox(),
        replyTo: data.email,
        subject: `Newsletter signup · ${data.email}`,
        text: [
          `Email: ${data.email}`,
          `Consent: ${data.consent ? "yes" : "no"}`,
          "",
          "Add this address to the church mailing list.",
        ].join("\n"),
        summary: { email: data.email, consent: data.consent },
      });
    },
  });
}
