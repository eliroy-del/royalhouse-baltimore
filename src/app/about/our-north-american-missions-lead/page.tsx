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

const FAMILY_LINE =
  "He is married to Rev. Mrs. Willhemina Agormeda and they have three children.";

function ministryParagraphs(bio: string) {
  const ministry = bio.replace(FAMILY_LINE, "").replace(/\s+/g, " ").trim();
  const markers = ["He carries Apostolic", "He holds a Bachelor"] as const;
  const parts: string[] = [];
  let remaining = ministry;

  for (const marker of markers) {
    const index = remaining.indexOf(marker);
    if (index > 0) {
      parts.push(remaining.slice(0, index).trim());
      remaining = remaining.slice(index).trim();
    }
  }
  if (remaining) parts.push(remaining);
  return parts.length ? parts : [ministry];
}

export default async function MissionsLeadPage() {
  const leaders = await getLeaders();
  const apostle = leaders.find((leader) => leader.id === "apostle-agormeda");
  const paragraphs = apostle ? ministryParagraphs(apostle.bio) : [];

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
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <figure className="mx-auto w-full max-w-[24rem] lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-media shadow-elevate">
              <Image
                src={images.apostleAgormeda.src}
                alt={images.apostleAgormeda.alt}
                fill
                sizes="(min-width: 1024px) 384px, min(100vw - 2rem, 384px)"
                quality={90}
                className="object-cover object-top"
                priority
              />
            </div>
          </figure>

          <div className="lg:pt-1">
            <p className="text-[1.125rem] font-semibold tracking-[0.03em] text-gold-600">
              Apostle, North American Missions
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-navy-900">
              Apostle Emmanuel Agormeda
            </h2>
            <span aria-hidden="true" className="mt-5 block h-px w-14 bg-gold-400" />
            <div className="mt-6 space-y-4 type-body-lg text-navy-900/75">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>{FAMILY_LINE}</p>
            </div>
          </div>
        </Container>
      </Section>

      <section
        aria-label="Apostle Emmanuel Agormeda and Rev. Mrs. Willhemina Agormeda"
        className="bg-navy-950"
      >
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:min-h-[min(72vh,38rem)]">
          <div className="order-2 flex flex-col justify-center px-8 py-12 sm:px-12 lg:order-1 lg:px-14 lg:py-16">
            <p className="max-w-lg text-[1.25rem] leading-relaxed text-white/90 sm:text-[1.375rem] lg:text-[1.5rem]">
              Apostle Emmanuel Agormeda is married to Rev. Mrs. Willhemina Agormeda. Together they
              serve Royalhouse Chapel churches across North America and are blessed with three
              children.
            </p>
          </div>
          <figure className="relative order-1 flex min-h-[24rem] items-end justify-center overflow-hidden bg-navy-950 sm:min-h-[30rem] lg:order-2 lg:min-h-0">
            <Image
              src={images.apostleAgorMina.src}
              alt={images.apostleAgorMina.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={90}
              className="object-contain object-bottom"
            />
          </figure>
        </div>
      </section>
    </>
  );
}
