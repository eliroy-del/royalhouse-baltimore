import Image from "next/image";
import Link from "next/link";
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
  title: "Who We Are",
  description:
    "Royalhouse Baltimore is a campus of Royalhouse Chapel Maryland Mission and part of Royalhouse Chapel International. You belong here.",
  path: "/about/who-we-are",
  image: images.congregationPrayer.src,
});

export default function WhoWeArePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Who We Are", path: "/about/who-we-are" },
        ])}
      />
      <PageHero
        eyebrow="About"
        title="Who We Are"
        image={images.congregationPrayer}
        breadcrumb={[{ label: "Who We Are" }]}
      />

      <Section tone="cream" spacing="lg">
        <Container width="narrow">
          <h2 className="font-display text-3xl text-navy-900">Who We Are</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-navy-900/75">
            Royalhouse Baltimore is a campus of {churchConfig.campusOf} and part of the{" "}
            {churchConfig.network} family, with churches across North America and around the world
            and international headquarters in {churchConfig.headquarters}.
          </p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-navy-900/75">
            {churchConfig.statement}
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {churchConfig.identity.map((item) => (
              <li key={item} className="text-navy-900">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white" spacing="lg">
        <Container>
          <h2 className="font-display text-3xl text-navy-900">Our Vision</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {churchConfig.vision.map((pillar) => (
              <div key={pillar.title} className="rounded-card border border-navy-900/10 p-6">
                <h3 className="font-display text-2xl text-navy-900">{pillar.title}</h3>
                <p className="mt-3 text-[0.8125rem] uppercase tracking-[0.16em] text-gold-700">
                  {pillar.intro}
                </p>
                <ul className="mt-3 flex flex-col gap-1.5 text-navy-900/75">
                  {pillar.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cream" spacing="lg">
        <Container className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl text-navy-900">
              Our relationship to Royalhouse Chapel International
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-navy-900/75">
              Royalhouse Baltimore is a campus of {churchConfig.campusOf} and belongs to the wider{" "}
              {churchConfig.network} family. The international headquarters is in{" "}
              {churchConfig.headquarters}.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-media">
            <Image
              src={images.apostleAgorMina.src}
              alt={images.apostleAgorMina.alt}
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>
        </Container>
      </Section>

      <Section tone="white" spacing="lg">
        <Container width="narrow">
          <h2 className="font-display text-3xl text-navy-900">Our Story</h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-navy-900/75">
            Royalhouse Baltimore exists to touch this generation with the power of God. More of
            our story will be shared here as the church provides it.
          </p>
          <Button asChild variant="gold" size="lg" className="mt-8">
            <Link href="/plan-a-visit">Plan a Visit</Link>
          </Button>
        </Container>
      </Section>
    </>
  );
}
