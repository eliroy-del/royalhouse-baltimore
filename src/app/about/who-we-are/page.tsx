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
          <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
            {churchConfig.vision.map((pillar) => (
              <p
                key={pillar.statement}
                className="border border-navy-900/10 bg-white p-6 text-[0.9375rem] leading-relaxed text-navy-900 sm:p-8"
              >
                {pillar.statement}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-14">
            <div className="max-w-2xl">
              <h2 className="text-balance font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] text-navy-900">
                Our relationship to Royalhouse Chapel International
              </h2>
              <span aria-hidden="true" className="mt-5 block h-px w-14 bg-gold-400" />
              <p className="mt-5 text-[1.05rem] leading-relaxed text-navy-900/75">
                Royalhouse Baltimore is a campus of {churchConfig.campusOf} and belongs to the
                wider {churchConfig.network} family. The international headquarters is in{" "}
                {churchConfig.headquarters}.
              </p>
              <Button asChild variant="primary" size="lg" className="mt-8">
                <Link href="/about/our-north-american-missions-lead">
                  Meet Apostle Emmanuel Agormeda
                </Link>
              </Button>
            </div>
            <figure className="mx-auto w-full max-w-[22rem] lg:mx-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-media shadow-elevate">
                <Image
                  src={images.apostleAgorMina.src}
                  alt={images.apostleAgorMina.alt}
                  fill
                  sizes="352px"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 text-center text-[0.875rem] leading-relaxed text-navy-900/60">
                Apostle Emmanuel Agormeda and Rev. Mrs. Willhemina Agormeda
              </figcaption>
            </figure>
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
