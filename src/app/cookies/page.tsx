import { LegalBody, type LegalSection } from "@/components/sections/LegalPage";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { images } from "@/config/images";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description: "How Royalhouse Baltimore uses cookies on this website.",
  path: "/cookies",
});

const sections: LegalSection[] = [
  {
    heading: "Placeholder",
    body: [
      <p key="1">
        This cookie policy is a placeholder until Royalhouse Baltimore provides approved legal
        text. Essential cookies needed to operate the website may be used. Analytics cookies load
        only when an analytics ID is configured.
      </p>,
    ],
  },
];

export default function CookiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookies" },
        ])}
      />
      <PageHero
        title="Cookie Policy"
        image={images.baltimoreCity}
        breadcrumb={[{ label: "Cookie Policy" }]}
        size="md"
      />
      <LegalBody
        intro="Approved cookie language will replace this placeholder."
        sections={sections}
        lastUpdated="September 2026"
      />
    </>
  );
}
