import { handleSubmission, logSubmission } from "@/lib/api";
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
    deliver: (data) => {
      // TODO: add to the church mailing list (Mailchimp / Resend Audiences / Brevo)
      // with double opt-in enabled.
      logSubmission("newsletter", { email: data.email, consent: data.consent });
    },
  });
}
