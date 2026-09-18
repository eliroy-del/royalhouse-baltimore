import { deliverMail, officeInbox } from "@/lib/mail";
import { handleSubmission } from "@/lib/api";
import { planVisitSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleSubmission({
    request,
    schema: planVisitSchema,
    scope: "visit",
    limit: 4,
    successMessage:
      "We're expecting you! Someone from our welcome team will be in touch before your visit.",
    deliver: async (data) => {
      await deliverMail({
        scope: "visit",
        to: officeInbox(),
        replyTo: data.email,
        subject: `Plan a visit · ${data.firstName} ${data.lastName}`,
        text: [
          `Name: ${data.firstName} ${data.lastName}`,
          `Email: ${data.email}`,
          data.phone ? `Phone: ${data.phone}` : null,
          `Adults: ${data.adults}`,
          `Children: ${data.children}`,
          data.preferredService ? `Preferred gathering: ${data.preferredService}` : null,
          `Wants contact: ${data.wantsContact ? "yes" : "no"}`,
          "",
          data.questions ? `Questions:\n${data.questions}` : "Questions: (none)",
        ]
          .filter(Boolean)
          .join("\n"),
        summary: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          party: { adults: data.adults, children: data.children },
          preferredService: data.preferredService,
          wantsContact: data.wantsContact,
          hasQuestions: data.questions.length > 0,
        },
      });
    },
  });
}
