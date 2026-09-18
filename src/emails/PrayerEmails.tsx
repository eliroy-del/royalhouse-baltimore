import { Text } from "@react-email/components";
import { BrandLayout, DetailRow } from "@/emails/BrandLayout";

interface PrayerNotificationEmailProps {
  logoUrl: string;
  displayName: string;
  email?: string;
  phone?: string;
  category: string;
  request: string;
  keepPrivate: boolean;
  wantsFollowUp: boolean;
}

/** Staff-only notification. Never mirror this content to analytics or client logs. */
export function PrayerNotificationEmail(props: PrayerNotificationEmailProps) {
  return (
    <BrandLayout
      logoUrl={props.logoUrl}
      preview="New prayer request — Royalhouse Baltimore"
      title="New prayer request"
      footerNote="Confidential — for the prayer team only · Royalhouse Baltimore"
    >
      <DetailRow label="From" value={props.displayName} />
      <DetailRow label="Email" value={props.email ?? "(not provided)"} />
      <DetailRow label="Phone" value={props.phone ?? "(not provided)"} />
      <DetailRow label="Category" value={props.category} />
      <DetailRow label="Keep private" value={props.keepPrivate ? "Yes" : "No"} />
      <DetailRow label="Wants follow-up" value={props.wantsFollowUp ? "Yes" : "No"} />
      <DetailRow label="Request" value={props.request} />
    </BrandLayout>
  );
}

export function PrayerConfirmationEmail({
  logoUrl,
  name,
}: {
  logoUrl: string;
  name?: string;
}) {
  const greeting = name?.trim() ? `Hi ${name.trim()},` : "Hello,";
  return (
    <BrandLayout
      logoUrl={logoUrl}
      preview="We've received your prayer request"
      title="We've received your prayer request"
    >
      <Text style={body}>{greeting}</Text>
      <Text style={body}>
        Thank you for trusting us with your prayer request. Our prayer team will pray over it
        this week in confidence.
      </Text>
      <Text style={body}>
        If you asked for follow-up and shared contact details, a member of our pastoral team may
        reach out.
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
