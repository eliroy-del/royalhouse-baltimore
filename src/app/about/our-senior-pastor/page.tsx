import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
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
  "He has been married to Lady Trisha for 14 years and they have four sons.";

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
        eyebrow="Lead Pastor"
        title="Pastor RichieO"
        image={images.pastorRichieOPreaching}
        objectPosition="50% 20%"
        breadcrumb={[{ label: "Our Senior Pastor" }]}
      />

      <Section tone="cream" spacing="lg">
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,38rem)] lg:gap-16">
          <figure className="mx-auto w-full max-w-[20rem] lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-media shadow-elevate">
              <Image
                src={images.pastorRichieO.src}
                alt={images.pastorRichieO.alt}
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
          </figure>
          <div className="lg:pt-1">
            <p className="eyebrow text-gold-700">Lead Pastor</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-navy-900">
              Pastor RichieO
            </h2>
            <span aria-hidden="true" className="mt-5 block h-px w-14 bg-gold-400" />
            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-navy-900/75">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="navy-deep" spacing="lg">
        <Container>
          <article className="overflow-hidden rounded-media bg-navy-900 shadow-float lg:grid lg:grid-cols-2 lg:items-stretch">
            <figure className="relative aspect-[4/5] w-full">
              <Image
                src={images.pastorRichieOFamily.src}
                alt={images.pastorRichieOFamily.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-[center_18%]"
              />
            </figure>
            <div className="flex flex-col justify-center px-8 py-10 sm:px-12 lg:px-16 lg:py-14">
              <p className="eyebrow text-gold-300">Family</p>
              <h2 className="mt-3 text-balance font-display text-[clamp(1.875rem,3.4vw,2.75rem)] leading-[1.08] text-white">
                Lady Trisha
              </h2>
              <p className="mt-2 font-display text-xl italic text-gold-300/90">and their four sons</p>
              <span aria-hidden="true" className="mt-6 block h-px w-14 bg-gold-400" />
              <p className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-white/75">
                Pastor RichieO has been married to Lady Trisha for 14 years.
              </p>
            </div>
          </article>
        </Container>
      </Section>
    </>
  );
}
