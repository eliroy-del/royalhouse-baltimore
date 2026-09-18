import { Text } from "@react-email/components";
import { BrandLayout, DetailRow } from "@/emails/BrandLayout";

export function NewsletterNotificationEmail({
  logoUrl,
  email,
}: {
  logoUrl: string;
  email: string;
}) {
  return (
    <BrandLayout
      logoUrl={logoUrl}
      preview={`Newsletter signup — ${email}`}
      title="New newsletter signup"
    >
      <DetailRow label="Email" value={email} />
      <Text style={{ color: "#6b7280", fontSize: "13px", marginTop: "8px" }}>
        Add this address to the church mailing list.
      </Text>
    </BrandLayout>
  );
}

export function NewsletterConfirmationEmail({
  logoUrl,
}: {
  logoUrl: string;
}) {
  return (
    <BrandLayout
      logoUrl={logoUrl}
      preview="You're on the list — Royalhouse Baltimore"
      title="You're subscribed"
    >
      <Text style={body}>Thank you for signing up.</Text>
      <Text style={body}>
        You will receive occasional updates from Royalhouse Baltimore about gatherings, events,
        and what God is doing in our house. You can unsubscribe any time.
      </Text>
    </BrandLayout>
  );
}

const body = {
  color: "#1a1a1a",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 14px",
} as const;
