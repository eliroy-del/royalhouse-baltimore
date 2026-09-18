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
  image: images.apostleAgorMina.src,
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
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div className="mx-auto flex w-full max-w-[22rem] flex-col gap-5 lg:mx-0">
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden rounded-media shadow-elevate">
                <Image
                  src={images.apostleAgormeda.src}
                  alt={images.apostleAgormeda.alt}
                  fill
                  sizes="(min-width: 1024px) 352px, min(100vw - 2rem, 352px)"
                  quality={90}
                  className="object-cover object-top"
                  priority
                />
              </div>
            </figure>
            <figure>
              <div className="relative aspect-[3/4] overflow-hidden rounded-media shadow-elevate">
                <Image
                  src={images.apostleAgorMina.src}
                  alt={images.apostleAgorMina.alt}
                  fill
                  sizes="(min-width: 1024px) 352px, min(100vw - 2rem, 352px)"
                  quality={90}
                  className="object-cover object-[center_18%]"
                />
              </div>
              <figcaption className="mt-3 text-center text-[0.875rem] leading-relaxed text-navy-900/65">
                Apostle Emmanuel Agormeda and Rev. Mrs. Willhemina Agormeda
              </figcaption>
            </figure>
          </div>
          <div className="lg:pt-1">
            <p className="text-[1.125rem] font-semibold tracking-[0.03em] text-gold-600">
              Apostle, North American Missions
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-navy-900">
              Apostle Emmanuel Agormeda
            </h2>
            <span aria-hidden="true" className="mt-5 block h-px w-14 bg-gold-400" />
            {apostle ? (
              <p className="mt-6 type-body-lg leading-relaxed text-navy-900/75">{apostle.bio}</p>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
