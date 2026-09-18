import { Text } from "@react-email/components";
import { BrandLayout, DetailRow } from "@/emails/BrandLayout";

interface ServeNotificationEmailProps {
  logoUrl: string;
  name: string;
  email: string;
  phone?: string;
  team: string;
  areas?: string;
  experience?: string;
  message?: string;
}

export function ServeNotificationEmail(props: ServeNotificationEmailProps) {
  return (
    <BrandLayout
      logoUrl={props.logoUrl}
      preview={`New launch team submission from ${props.name}`}
      title="New launch team submission"
    >
      <DetailRow label="Name" value={props.name} />
      <DetailRow label="Email" value={props.email} />
      <DetailRow label="Phone" value={props.phone ?? ""} />
      <DetailRow label="Team" value={props.team} />
      <DetailRow label="Areas" value={props.areas ?? ""} />
      <DetailRow label="Experience" value={props.experience ?? ""} />
      <DetailRow label="Message" value={props.message ?? ""} />
    </BrandLayout>
  );
}

export function ServeConfirmationEmail({
  logoUrl,
  name,
  team,
}: {
  logoUrl: string;
  name: string;
  team: string;
}) {
  return (
    <BrandLayout
      logoUrl={logoUrl}
      preview="Thanks for joining the launch team"
      title="Thanks for stepping up to serve"
    >
      <Text style={body}>Hi {name},</Text>
      <Text style={body}>
        Thank you for offering to serve with the {team} at Royalhouse Baltimore. Someone from
        our team will follow up with next steps.
      </Text>
      <Text style={body}>We are building this house together — glad you are part of it.</Text>
    </BrandLayout>
  );
}

const body = {
  color: "#1a1a1a",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 14px",
} as const;
