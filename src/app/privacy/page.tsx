import Link from "next/link";
import { LegalBody, type LegalSection } from "@/components/sections/LegalPage";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { churchConfig, churchStatus } from "@/config/church";
import { images } from "@/config/images";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Royalhouse Baltimore collects, uses and protects the information you share with us through this website — including prayer requests and contact forms.",
  path: "/privacy",
});

const contactLine = churchStatus.hasEmail
  ? churchConfig.contact.email
  : "our contact form at /contact";

const sections: LegalSection[] = [
  {
    heading: "What we collect",
    body: [
      <p key="1">
        We only collect what you choose to send us. That means the details you type into a form on
        this site: your name, email address, phone number if you provide one, and the content of
        your message, prayer request, testimony or visit plan.
      </p>,
      <p key="2">
        We do not buy contact lists, and we do not ask for financial details on this website. Any
        online giving is handled by a dedicated, PCI-compliant provider on their own secure
        platform.
      </p>,
    ],
  },
  {
    heading: "How we use it",
    body: [
      <p key="1">
        We use your information for the single purpose you gave it to us for: to reply to your
        question, to pray for your request, to prepare for your visit, or to send you the newsletter
        you asked for.
      </p>,
      <p key="2">
        We never sell your information, and we never share it with third parties for marketing.
      </p>,
    ],
  },
  {
    heading: "Prayer requests are treated as confidential",
    body: [
      <p key="1">
        Prayer requests submitted through this site are read only by our pastoral prayer team. They
        are never published on the website, read aloud publicly, or shared beyond that team without
        your explicit permission.
      </p>,
      <p key="2">
        If you ask to remain anonymous, your request is prayed over without your name attached.
      </p>,
    ],
  },
  {
    heading: "Testimonies and moderation",
    body: [
      <p key="1">
        Nothing you submit is published automatically. Testimonies are reviewed by a person, and we
        publish only what you have given us explicit permission to publish. You can withdraw that
        permission at any time and we will remove it.
      </p>,
    ],
  },
  {
    heading: "Newsletter and consent",
    body: [
      <p key="1">
        You will only receive email from us if you have asked for it. Every email includes a
        one-click unsubscribe, and unsubscribing does not affect anything else about your
        relationship with this church.
      </p>,
    ],
  },
  {
    heading: "Analytics and cookies",
    body: [
      <p key="1">
        This site uses no advertising cookies. If and when we enable privacy-respecting analytics,
        it will be to understand which pages help people find us — not to track individuals across
        the internet. Analytics are configured through environment variables and are disabled by
        default.
      </p>,
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      <p key="1">
        We keep submissions for as long as we need them to care for you well, and no longer. You can
        ask us to delete your information at any time and we will do it.
      </p>,
    ],
  },
  {
    heading: "Your rights",
    body: [
      <p key="1">
        You can ask us what information we hold about you, ask us to correct it, or ask us to delete
        it. Contact us and we will respond promptly.
      </p>,
    ],
  },
  {
    heading: "Getting in touch",
    body: [
      <p key="1">
        For any question about this policy or your information, contact us at {contactLine}, or use
        the{" "}
        <Link
          href="/contact"
          className="font-semibold text-navy-900 underline decoration-gold-500/50 underline-offset-4 hover:decoration-gold-500"
        >
          contact form
        </Link>
        .
      </p>,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />

      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lede="Plain English, no small print: what you share with us, what we do with it, and how we protect it."
        image={images.welcomeLobby}
        breadcrumb={[{ label: "Privacy Policy" }]}
      />

      <LegalBody
        lastUpdated="August 2026"
        intro="Royalhouse Baltimore takes the trust behind every message, prayer request and testimony seriously. This policy explains, without jargon, how we handle the information you share with us through this website."
        sections={sections}
      />
    </>
  );
}
