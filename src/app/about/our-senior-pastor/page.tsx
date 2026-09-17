import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { images } from "@/config/images";
import { getLeaders } from "@/lib/content";
import { breadcrumbSchema, personSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pastor RichieO",
  description:
    "Meet Pastor RichieO, Lead Pastor of Royalhouse Baltimore. He is committed to preaching the Word, raising disciples, and touching Baltimore with the power of God.",
  path: "/about/our-senior-pastor",
  image: images.pastorRichieO.src,
});

const FAMILY_LINE =
  "Pastor RichieO has been married to Lady Trisha for 14 years and is blessed with 4 sons.";

function ministryParagraphs(bio: string) {
  const ministry = bio.replace(FAMILY_LINE, "").replace(/\s+/g, " ").trim();
  const breakAt = "He has a passion for serving God";
  const index = ministry.indexOf(breakAt);
  if (index <= 0) return [ministry];
  return [ministry.slice(0, index).trim(), ministry.slice(index).trim()];
}

export default async function SeniorPastorPage() {
  const leaders = await getLeaders();
  const pastor = leaders.find((leader) => leader.id === "pastor-richieo");
  const paragraphs = pastor ? ministryParagraphs(pastor.bio) : [];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Senior Pastor", path: "/about/our-senior-pastor" },
          ]),
          ...(pastor ? [personSchema(pastor)] : []),
        ]}
      />
      <PageHero
        title="Pastor RichieO"
        image={images.pastorRichieOPreaching}
        objectPosition="50% 20%"
        breadcrumb={[{ label: "Our Senior Pastor" }]}
      />

      <Section tone="cream" spacing="lg">
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,40rem)] lg:gap-14">
          <figure className="mx-auto w-full max-w-[16rem] lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-media shadow-elevate">
              <Image
                src={images.pastorRichieO.src}
                alt={images.pastorRichieO.alt}
                fill
                sizes="256px"
                className="object-cover object-[center_12%]"
              />
            </div>
          </figure>
          <div className="lg:pt-1">
            <p className="text-[1.125rem] font-semibold tracking-[0.03em] text-gold-600">
              Lead Pastor
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-navy-900">
              Pastor RichieO
            </h2>
            <span aria-hidden="true" className="mt-5 block h-px w-14 bg-gold-400" />
            <div className="mt-6 space-y-4 type-body-lg text-navy-900/75">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>{FAMILY_LINE}</p>
            </div>
            <Button asChild variant="primary" size="lg" className="mt-6">
              <a
                href="https://www.instagram.com/_richieo/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Follow Pastor RichieO
              </a>
            </Button>
          </div>
        </Container>
      </Section>

      <section
        aria-label="Pastor RichieO with family and at rest"
        className="bg-navy-950"
      >
        <div className="grid gap-px bg-navy-950 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] lg:h-[min(82vh,42rem)]">
          <figure className="relative order-2 min-h-[17rem] overflow-hidden sm:min-h-[22rem] lg:order-1 lg:min-h-0">
            <Image
              src={images.pastorRichieOFamily.src}
              alt={images.pastorRichieOFamily.alt}
              fill
              sizes="(min-width: 1024px) 32vw, 50vw"
              className="object-cover object-[center_18%]"
            />
          </figure>
          <figure className="relative order-1 col-span-2 min-h-[26rem] overflow-hidden sm:min-h-[32rem] lg:order-2 lg:col-span-1 lg:min-h-0">
            <Image
              src={images.pastorRichieOSeated.src}
              alt={images.pastorRichieOSeated.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[center_16%]"
            />
          </figure>
          <figure className="relative order-3 min-h-[17rem] overflow-hidden sm:min-h-[22rem] lg:order-3 lg:min-h-0">
            <Image
              src={images.pastorRichieOFamilyDenim.src}
              alt={images.pastorRichieOFamilyDenim.alt}
              fill
              sizes="(min-width: 1024px) 32vw, 50vw"
              className="object-cover object-[center_22%]"
            />
          </figure>
        </div>
      </section>
    </>
  );
}
