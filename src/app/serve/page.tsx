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
  description:
    "Help build Royalhouse Baltimore. Find a place to serve on the launch team.",
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
        title="Help Build Royalhouse Baltimore"
        lede="We're not waiting until launch day to build a church. We're building it together now."
        image={images.congregationNotes}
        breadcrumb={[{ label: "Serve" }]}
        actions={
          <Button asChild variant="gold" size="lg">
            <a href={churchConfig.forms.serveUrl} target="_blank" rel="noreferrer noopener">
              Join a Team
            </a>
          </Button>
        }
      />

      <Section tone="cream" spacing="lg">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-2xl text-[1.05rem] leading-relaxed text-navy-900/75">
              Choose a team below, then tell us where you&rsquo;d like to serve.
            </p>
            <Button asChild variant="gold" size="lg" className="shrink-0">
              <a href={churchConfig.forms.serveUrl} target="_blank" rel="noreferrer noopener">
                Serve With Us
              </a>
            </Button>
          </div>
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
        </Container>
      </Section>
    </>
  );
}
