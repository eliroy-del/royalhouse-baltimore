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
  title: "Apostle Emmanuel Agormeda",
  description:
    "Meet Apostle Emmanuel Agormeda, Apostle over Royalhouse Chapel churches across North America.",
  path: "/about/our-north-american-missions-lead",
  image: images.apostleAgormeda.src,
});

export default async function MissionsLeadPage() {
  const leaders = await getLeaders();
  const apostle = leaders.find((leader) => leader.id === "apostle-agormeda");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            {
              name: "Our North American Missions Lead",
              path: "/about/our-north-american-missions-lead",
            },
          ]),
          ...(apostle ? [personSchema(apostle)] : []),
        ]}
      />
      <PageHero
        title="Apostle Emmanuel Agormeda"
        image={images.apostleAgormeda}
        objectPosition="50% 15%"
        breadcrumb={[{ label: "Our North American Missions Lead" }]}
      />

      <Section tone="cream" spacing="lg">
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,18rem)_1fr]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-media">
            <Image
              src={images.apostleAgormeda.src}
              alt={images.apostleAgormeda.alt}
              fill
              sizes="320px"
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="eyebrow text-gold-700">Apostle, North American Missions</p>
            <h2 className="mt-3 font-display text-4xl text-navy-900">
              Apostle Emmanuel Agormeda
            </h2>
            {apostle ? (
              <p className="mt-5 text-[1.05rem] leading-relaxed text-navy-900/75">{apostle.bio}</p>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
