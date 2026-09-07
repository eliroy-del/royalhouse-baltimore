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

export default async function SeniorPastorPage() {
  const leaders = await getLeaders();
  const pastor = leaders.find((leader) => leader.id === "pastor-richieo");

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
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,18rem)_1fr]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-media">
            <Image
              src={images.pastorRichieO.src}
              alt={images.pastorRichieO.alt}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-gold-700">Lead Pastor</p>
            <h2 className="mt-3 font-display text-4xl text-navy-900">Pastor RichieO</h2>
            {pastor ? (
              <p className="mt-5 text-[1.05rem] leading-relaxed text-navy-900/75">{pastor.bio}</p>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section tone="white" spacing="sm">
        <Container className="grid items-center gap-5 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-8">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[20rem] overflow-hidden rounded-media">
            <Image
              src={images.pastorRichieOFamily.src}
              alt={images.pastorRichieOFamily.alt}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
          <p className="text-lg leading-relaxed text-navy-900/75 sm:text-xl">
            He has been married to Lady Trisha for 14 years and they have four sons.
          </p>
        </Container>
      </Section>
    </>
  );
}
