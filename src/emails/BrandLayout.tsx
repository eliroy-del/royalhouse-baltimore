import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";
import { emailBrand } from "@/lib/email/config";

interface BrandLayoutProps {
  preview: string;
  title: string;
  children: ReactNode;
  logoUrl: string;
  footerNote?: string;
}

export function BrandLayout({
  preview,
  title,
  children,
  logoUrl,
  footerNote = "Royalhouse Baltimore · Baltimore, Maryland",
}: BrandLayoutProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Img
              src={logoUrl}
              width="160"
              height="48"
              alt="Royalhouse Baltimore"
              style={styles.logo}
            />
            <Text style={styles.brandLabel}>Royalhouse Baltimore</Text>
          </Section>
          <Section style={styles.card}>
            <Heading as="h1" style={styles.title}>
              {title}
            </Heading>
            <Hr style={styles.rule} />
            {children}
          </Section>
          <Section style={styles.footer}>
            <Text style={styles.footerText}>{footerNote}</Text>
            <Text style={styles.footerText}>
              This message was sent from the royalhousebaltimore.org website.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <Text style={styles.detail}>
      <span style={styles.detailLabel}>{label}</span>
      <br />
      {value}
    </Text>
  );
}

const styles = {
  body: {
    backgroundColor: "#F5F7FA",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: "0",
    padding: "24px 12px",
  },
  container: {
    margin: "0 auto",
    maxWidth: "560px",
  },
  header: {
    backgroundColor: emailBrand.royalBlue,
    borderRadius: "12px 12px 0 0",
    padding: "28px 28px 20px",
    textAlign: "center" as const,
  },
  logo: {
    display: "block",
    margin: "0 auto 12px",
  },
  brandLabel: {
    color: emailBrand.gold,
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.06em",
    margin: "0",
    textTransform: "uppercase" as const,
  },
  card: {
    backgroundColor: emailBrand.white,
    borderRadius: "0 0 12px 12px",
    padding: "28px",
  },
  title: {
    color: emailBrand.navyDeep,
    fontSize: "22px",
    fontWeight: 700,
    lineHeight: "1.3",
    margin: "0 0 16px",
  },
  rule: {
    borderColor: emailBrand.gold,
    borderTop: `2px solid ${emailBrand.gold}`,
    margin: "0 0 20px",
    width: "56px",
  },
  detail: {
    color: "#1a1a1a",
    fontSize: "15px",
    lineHeight: "1.55",
    margin: "0 0 14px",
  },
  detailLabel: {
    color: emailBrand.royalBlue,
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
  },
  footer: {
    padding: "20px 8px 0",
    textAlign: "center" as const,
  },
  footerText: {
    color: "#6b7280",
    fontSize: "12px",
    lineHeight: "1.5",
    margin: "0 0 4px",
  },
} as const;
