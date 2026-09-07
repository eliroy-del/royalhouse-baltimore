import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { churchConfig } from "@/config/church";
import { images } from "@/config/images";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Messages",
  description: "Messages and media from Royalhouse Baltimore are coming soon.",
  path: "/sermons",
});

export default function SermonsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Messages", path: "/sermons" },
        ])}
      />
      <PageHero
        title="Messages"
        image={images.pastorRichieOPreaching}
        breadcrumb={[{ label: "Messages" }]}
      />
      <Section tone="cream" spacing="lg">
        <Container>
          <EmptyState
            icon="mic"
            title="Messages and media are coming soon."
            description={
              churchConfig.livestream.enabled
                ? "Watch with us when livestream is available."
                : "Online streaming coming soon."
            }
          />
        </Container>
      </Section>
    </>
  );
}
