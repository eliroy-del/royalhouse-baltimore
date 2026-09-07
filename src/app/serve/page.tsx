import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { churchConfig } from "@/config/church";
import { images } from "@/config/images";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Serve",
  description: "Join the launch team at Royalhouse Baltimore and find a place to serve.",
  path: "/serve",
  image: images.congregationNotes.src,
});

export default function ServePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Serve", path: "/serve" },
        ])}
      />
      <PageHero
        eyebrow="Serve"
        title="Join the Launch Team"
        lede="Find a place to serve at Royalhouse Baltimore."
        image={images.congregationNotes}
        breadcrumb={[{ label: "Serve" }]}
      />

      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {churchConfig.serveTeams.map((team) => (
              <article
                key={team.id}
                className="rounded-card border border-navy-900/10 bg-white p-5"
              >
                <h2 className="font-display text-2xl text-navy-900">{team.name}</h2>
                {team.areas.length > 0 ? (
                  <ul className="mt-3 flex flex-col gap-1 text-[0.9375rem] text-navy-900/70">
                    {team.areas.map((area) => (
                      <li key={area}>{area}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
          <Button asChild variant="gold" size="lg" className="mt-10">
            <a href={churchConfig.forms.serveUrl} target="_blank" rel="noreferrer noopener">
              Join the Launch Team
            </a>
          </Button>
        </Container>
      </Section>
    </>
  );
}
