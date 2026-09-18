import { Text } from "@react-email/components";
import { BrandLayout, DetailRow } from "@/emails/BrandLayout";

interface PlanVisitNotificationEmailProps {
  logoUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  adults: number;
  children: number;
  preferredService?: string;
  wantsContact: boolean;
  questions?: string;
}

export function PlanVisitNotificationEmail(props: PlanVisitNotificationEmailProps) {
  const name = `${props.firstName} ${props.lastName}`;
  return (
    <BrandLayout
      logoUrl={props.logoUrl}
      preview={`New plan a visit request from ${name}`}
      title="New plan a visit request"
    >
      <DetailRow label="Name" value={name} />
      <DetailRow label="Email" value={props.email} />
      <DetailRow label="Phone" value={props.phone ?? ""} />
      <DetailRow label="Adults" value={String(props.adults)} />
      <DetailRow label="Children" value={String(props.children)} />
      <DetailRow label="Preferred gathering" value={props.preferredService ?? ""} />
      <DetailRow label="Wants contact" value={props.wantsContact ? "Yes" : "No"} />
      <DetailRow label="Questions" value={props.questions ?? ""} />
    </BrandLayout>
  );
}

export function PlanVisitConfirmationEmail({
  logoUrl,
  firstName,
}: {
  logoUrl: string;
  firstName: string;
}) {
  return (
    <BrandLayout
      logoUrl={logoUrl}
      preview="We're looking forward to meeting you"
      title="We're looking forward to meeting you"
    >
      <Text style={body}>Hi {firstName},</Text>
      <Text style={body}>
        Thank you for planning a visit to Royalhouse Baltimore. You do not need to know anyone
        or have everything figured out — just come. Our welcome team will look out for you.
      </Text>
      <Text style={body}>
        If you shared questions or asked us to follow up, someone from our team will be in touch
        before your visit.
      </Text>
      <Text style={body}>We cannot wait to meet you.</Text>
    </BrandLayout>
  );
}

const body = {
  color: "#1a1a1a",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 14px",
} as const;
