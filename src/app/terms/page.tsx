import Link from "next/link";
import { LegalBody, type LegalSection } from "@/components/sections/LegalPage";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { images } from "@/config/images";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description:
    "The terms that govern your use of the Royalhouse Baltimore website, including submissions, giving, media and intellectual property.",
  path: "/terms",
});

const sections: LegalSection[] = [
  {
    heading: "Using this website",
    body: [
      <p key="1">
        This website exists to serve our church family and anyone considering a visit. You are
        welcome to read, share and link to anything on it. Please do not use it to distribute
        unlawful, abusive or misleading material, or to attempt to disrupt the site or its systems.
      </p>,
    ],
  },
  {
    heading: "What you send us",
    body: [
      <p key="1">
        When you submit a message, prayer request or testimony, you confirm that it is your own, that
        it is truthful, and that you have the right to share anything about other people it
        mentions. Please do not include sensitive information about a third party without their
        permission.
      </p>,
      <p key="2">
        Testimonies are published only with explicit permission, and only after review. We may edit
        for length and clarity, never for meaning.
      </p>,
    ],
  },
  {
    heading: "Giving",
    body: [
      <p key="1">
        Giving is voluntary. Online gifts are processed by a third-party provider on their own secure
        platform, subject to their terms. Gifts are used for the ministry purposes of Royalhouse
        Baltimore, and designated gifts are applied to the fund you select wherever that is
        practicable.
      </p>,
    ],
  },
  {
    heading: "Photography and video",
    body: [
      <p key="1">
        Our services and events are sometimes photographed and streamed. If you would rather not
        appear, tell a member of our team on arrival and we will make sure it is respected, that
        includes children.
      </p>,
    ],
  },
  {
    heading: "Content and intellectual property",
    body: [
      <p key="1">
        Sermons, articles, photography, artwork and brand marks on this site belong to Royalhouse
        Baltimore or the wider Royalhouse Chapel International family, unless stated otherwise.
        Please share our messages freely and credit the source; do not resell them or use our brand
        marks to imply endorsement.
      </p>,
    ],
  },
  {
    heading: "External links",
    body: [
      <p key="1">
        We sometimes link to other organizations, partners or platforms. We are not responsible for
        their content or their privacy practices.
      </p>,
    ],
  },
  {
    heading: "Pastoral care is not professional advice",
    body: [
      <p key="1">
        Nothing on this website is legal, medical, financial or clinical advice. If you are in
        crisis, please contact the emergency services or a qualified professional. We will gladly
        walk alongside you, but we are not a substitute for professional care.
      </p>,
    ],
  },
  {
    heading: "Changes and contact",
    body: [
      <p key="1">
        We may update these terms as our ministry and this website develop. Questions are always
        welcome, use the{" "}
        <Link
          href="/contact"
          className="font-semibold text-navy-900 underline decoration-gold-500/50 underline-offset-4 hover:decoration-gold-500"
        >
          contact page
        </Link>{" "}
        and a real person will answer.
      </p>,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms" },
        ])}
      />

      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        lede="The straightforward terms that apply when you use this website."
        image={images.churchExteriorDusk}
        breadcrumb={[{ label: "Terms of Use" }]}
      />

      <LegalBody
        lastUpdated="August 2026"
        intro="These terms cover how this website may be used, what happens with anything you submit, and the boundaries around giving, media and content. They are written to be read, not to hide behind."
        sections={sections}
      />
    </>
  );
}
