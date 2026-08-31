import { handleSubmission, logSubmission } from "@/lib/api";
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
      "Thank you — your message is with our team. We usually reply within two working days.",
    deliver: (data) => {
      // TODO: route by `reason` to the right inbox (office, pastoral care, media, giving).
      logSubmission("contact", {
        name: data.name,
        email: data.email,
        reason: data.reason,
        messageLength: data.message.length,
      });
    },
  });
}
