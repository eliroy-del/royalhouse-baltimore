import {
  PlanVisitConfirmationEmail,
  PlanVisitNotificationEmail,
} from "@/emails/PlanVisitEmails";
import { handleSubmission } from "@/lib/api";
import { absoluteLogoUrl, officeInbox, sendBrandedEmail } from "@/lib/email/send";
import { sanitizeEmail, sanitizeText } from "@/lib/email/sanitize";
import { planVisitSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleSubmission({
    request,
    schema: planVisitSchema,
    scope: "plan-a-visit",
    limit: 4,
    successMessage:
      "We're expecting you! Someone from our welcome team will be in touch before your visit.",
    deliver: async (data) => {
      const firstName = sanitizeText(data.firstName, 80);
      const lastName = sanitizeText(data.lastName, 80);
      const email = sanitizeEmail(data.email);
      const phone = sanitizeText(data.phone, 32);
      const preferredService = sanitizeText(data.preferredService, 80);
      const questions = sanitizeText(data.questions, 2000);
      const logoUrl = absoluteLogoUrl();
      const name = `${firstName} ${lastName}`;

      await sendBrandedEmail({
        scope: "plan-a-visit",
        to: officeInbox(),
        replyTo: email,
        subject: `New Plan a Visit Request — ${name}`,
        react: (
          <PlanVisitNotificationEmail
            logoUrl={logoUrl}
            firstName={firstName}
            lastName={lastName}
            email={email}
            phone={phone}
            adults={data.adults}
            children={data.children}
            preferredService={preferredService}
            wantsContact={data.wantsContact}
            questions={questions}
          />
        ),
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : null,
          `Adults: ${data.adults}`,
          `Children: ${data.children}`,
          preferredService ? `Preferred gathering: ${preferredService}` : null,
          `Wants contact: ${data.wantsContact ? "yes" : "no"}`,
          "",
          questions || "Questions: (none)",
        ]
          .filter(Boolean)
          .join("\n"),
        summary: {
          name,
          email,
          party: { adults: data.adults, children: data.children },
          preferredService,
          wantsContact: data.wantsContact,
          hasQuestions: questions.length > 0,
        },
      });

      await sendBrandedEmail({
        scope: "plan-a-visit",
        to: email,
        subject: "We're Looking Forward to Meeting You — Royalhouse Baltimore",
        react: <PlanVisitConfirmationEmail logoUrl={logoUrl} firstName={firstName} />,
        text: [
          `Hi ${firstName},`,
          "",
          "Thank you for planning a visit to Royalhouse Baltimore. Our welcome team will look out for you.",
        ].join("\n"),
        summary: { confirmation: true, email },
      });
    },
  });
}
