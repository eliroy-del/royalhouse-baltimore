import { Text } from "@react-email/components";
import { BrandLayout, DetailRow } from "@/emails/BrandLayout";

interface ContactNotificationEmailProps {
  logoUrl: string;
  name: string;
  email: string;
  phone?: string;
  reason: string;
  message: string;
}

export function ContactNotificationEmail({
  logoUrl,
  name,
  email,
  phone,
  reason,
  message,
}: ContactNotificationEmailProps) {
  return (
    <BrandLayout
      logoUrl={logoUrl}
      preview={`New contact request from ${name}`}
      title="New contact request"
    >
      <DetailRow label="Name" value={name} />
      <DetailRow label="Email" value={email} />
      <DetailRow label="Phone" value={phone ?? ""} />
      <DetailRow label="Reason" value={reason} />
      <DetailRow label="Message" value={message} />
      <Text style={{ color: "#6b7280", fontSize: "13px", marginTop: "20px" }}>
        Reply directly to this email to respond to the sender.
      </Text>
    </BrandLayout>
  );
}

export function ContactConfirmationEmail({
  logoUrl,
  name,
}: {
  logoUrl: string;
  name: string;
}) {
  return (
    <BrandLayout
      logoUrl={logoUrl}
      preview="Thanks for connecting with Royalhouse Baltimore"
      title="Thanks for connecting"
    >
      <Text style={body}>Hi {name},</Text>
      <Text style={body}>
        Thank you for reaching out to Royalhouse Baltimore. We received your message and our
        team will get back to you soon — usually within two working days.
      </Text>
      <Text style={body}>We are glad you connected with us.</Text>
    </BrandLayout>
  );
}

const body = {
  color: "#1a1a1a",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 14px",
} as const;
