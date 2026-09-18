import { ServeConfirmationEmail, ServeNotificationEmail } from "@/emails/ServeEmails";
import { handleSubmission } from "@/lib/api";
import { absoluteLogoUrl, officeInbox, sendBrandedEmail } from "@/lib/email/send";
import { sanitizeEmail, sanitizeText } from "@/lib/email/sanitize";
import { serveSchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleSubmission({
    request,
    schema: serveSchema,
    scope: "serve",
    limit: 4,
    successMessage:
      "Thank you for stepping up to serve. Someone from our team will follow up with next steps.",
    deliver: async (data) => {
      const name = sanitizeText(data.name, 80);
      const email = sanitizeEmail(data.email);
      const phone = sanitizeText(data.phone, 32);
      const team = sanitizeText(data.team, 120);
      const areas = sanitizeText(data.areas, 400);
      const experience = sanitizeText(data.experience, 2000);
      const message = sanitizeText(data.message, 2000);
      const logoUrl = absoluteLogoUrl();

      await sendBrandedEmail({
        scope: "serve",
        to: officeInbox(),
        replyTo: email,
        subject: `New Launch Team Submission — ${name}`,
        react: (
          <ServeNotificationEmail
            logoUrl={logoUrl}
            name={name}
            email={email}
            phone={phone}
            team={team}
            areas={areas}
            experience={experience}
            message={message}
          />
        ),
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          phone ? `Phone: ${phone}` : null,
          `Team: ${team}`,
          areas ? `Areas: ${areas}` : null,
          experience ? `Experience:\n${experience}` : null,
          message ? `Message:\n${message}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
        summary: {
          name,
          email,
          team,
          hasAreas: areas.length > 0,
          hasExperience: experience.length > 0,
        },
      });

      await sendBrandedEmail({
        scope: "serve",
        to: email,
        subject: "Thanks for Joining the Launch Team — Royalhouse Baltimore",
        react: <ServeConfirmationEmail logoUrl={logoUrl} name={name} team={team} />,
        text: [
          `Hi ${name},`,
          "",
          `Thank you for offering to serve with the ${team} at Royalhouse Baltimore. Someone from our team will follow up with next steps.`,
        ].join("\n"),
        summary: { confirmation: true, email, team },
      });
    },
  });
}
