import { Text } from "@react-email/components";
import { BrandLayout, DetailRow } from "@/emails/BrandLayout";

interface TestimonyNotificationEmailProps {
  logoUrl: string;
  displayName: string;
  email: string;
  category: string;
  testimony: string;
  permissionToPublish: boolean;
  anonymous: boolean;
}

export function TestimonyNotificationEmail(props: TestimonyNotificationEmailProps) {
  return (
    <BrandLayout
      logoUrl={props.logoUrl}
      preview={`New testimony from ${props.displayName}`}
      title="New testimony submission"
      footerNote="Moderation required before any public use."
    >
      <DetailRow label="Name" value={props.displayName} />
      <DetailRow label="Email" value={props.email} />
      <DetailRow label="Category" value={props.category} />
      <DetailRow
        label="Permission to publish"
        value={props.permissionToPublish ? "yes" : "no"}
      />
      <DetailRow label="Anonymous requested" value={props.anonymous ? "yes" : "no"} />
      <Text style={body}>{props.testimony}</Text>
      <Text style={note}>Moderation status: pending</Text>
    </BrandLayout>
  );
}

const body = {
  color: "#1a1a1a",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 14px",
  whiteSpace: "pre-wrap" as const,
} as const;

const note = {
  color: "#6b7280",
  fontSize: "13px",
  margin: "0",
} as const;
