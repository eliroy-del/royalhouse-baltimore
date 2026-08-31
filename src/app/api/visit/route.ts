import { handleSubmission, logSubmission } from "@/lib/api";
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
    deliver: (data) => {
      // TODO: forward to the church office inbox / church management system.
      logSubmission("visit", {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        party: { adults: data.adults, children: data.children },
        preferredService: data.preferredService,
        wantsContact: data.wantsContact,
        hasQuestions: data.questions.length > 0,
      });
    },
  });
}
