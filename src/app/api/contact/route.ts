import { deliverMail, inboxForContactReason, officeInbox } from "@/lib/mail";
import { handleSubmission } from "@/lib/api";
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
      const to = inboxForContactReason(data.reason);
      await deliverMail({
        scope: "contact",
        to,
        replyTo: data.email,
        subject: `Website contact · ${data.reason} · ${data.name}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          data.phone ? `Phone: ${data.phone}` : null,
          `Reason: ${data.reason}`,
          "",
          data.message,
          "",
          `Inbox: ${to}`,
          `Fallback office: ${officeInbox()}`,
        ]
          .filter(Boolean)
          .join("\n"),
        summary: {
          name: data.name,
          email: data.email,
          reason: data.reason,
          messageLength: data.message.length,
        },
      });
    },
  });
}
