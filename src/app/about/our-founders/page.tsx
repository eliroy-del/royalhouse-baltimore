import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { images } from "@/config/images";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Founders",
  description:
    "Meet Most Rev. Sam Korankye Ankrah and Mama Rita Korankye Ankrah, Founders of Royalhouse Chapel International.",
  path: "/about/our-founders",
  image: images.foundersKorankyeAnkrah.src,
});

export default function OurFoundersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Founders", path: "/about/our-founders" },
        ])}
      />
      <PageHero
        title="Our Founders"
        image={images.foundersKorankyeAnkrah}
        objectPosition="50% 22%"
        breadcrumb={[{ label: "Our Founders" }]}
      />

      <Section tone="cream" spacing="lg">
        <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,40rem)] lg:gap-16">
          <figure className="mx-auto w-full max-w-[20rem] lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-media shadow-elevate">
              <Image
                src={images.foundersKorankyeAnkrah.src}
                alt={images.foundersKorankyeAnkrah.alt}
                fill
                sizes="320px"
                className="object-cover object-[center_18%]"
                priority
              />
            </div>
            <figcaption className="mt-3 text-center text-[0.875rem] leading-relaxed text-navy-900/65">
              Most Rev. Sam Korankye Ankrah and Mama Rita Korankye Ankrah
            </figcaption>
          </figure>

          <div className="lg:pt-1">
            <p className="eyebrow text-gold-700">Our Apostle General</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-navy-900">
              Sam Korankye Ankrah
            </h2>
            <span aria-hidden="true" className="mt-5 block h-px w-14 bg-gold-400" />
            <div className="mt-6 space-y-4 type-body-lg text-navy-900/75">
              <p>
                Most Rev. Sam Korankye Ankrah is the Founder and Apostle General of Royalhouse
                Chapel International, among the most notable and rapidly expanding Charismatic and
                Pentecostal ministries in Ghana, with numerous successful local Assemblies and
                International Missions.
              </p>
              <p>
                Rev. Sam also serves as the Senior Pastor at the international headquarters
                (Ahenfie), which hosts a capacity of thousands of lively, devoted worshippers in
                Accra, Ghana, every week.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white" spacing="lg">
        <Container width="narrow">
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-navy-900">
            A Christian Statesman
          </h2>
          <div className="mt-5 space-y-4 type-body-lg text-navy-900/75">
            <p>
              In 1984, Rev. Sam completed his studies at Ghana&rsquo;s leading university, the
              University of Ghana, Legon. Since then, he has earned several certificates in
              Christian leadership, Management, and Entrepreneurship from the Haggai Institute in
              Singapore and the Ghana Institute of Management and Public Administration (GIMPA),
              respectively.
            </p>
            <p>
              With a commitment to public service rooted in Christ, Most Rev. Sam Korankye Ankrah
              is a faithful advisor to leaders in government, an author, a pacifist, and a mentor
              to various religious leaders who have submitted to his apostleship.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="cream" spacing="lg">
        <Container width="narrow">
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] text-navy-900">
            A Legacy Builder
          </h2>
          <div className="mt-5 space-y-4 type-body-lg text-navy-900/75">
            <p>
              As the founder of Powerline Media Ministries, Rev. Korankye Ankrah&rsquo;s radio and
              television programmes reach millions of people in Ghana and across the world.
            </p>
            <p>
              For his countless ministerial and societal contributions, Rev. Sam has received
              several awards, including the U.S. President&rsquo;s Lifetime Achievement Award in
              February 2022, presented by the U.S. government with a citation signed by the 46th
              U.S. President, Joe Biden.
            </p>
            <p>
              Most importantly, Rev. Sam is happily married to Rita Korankye Ankrah, with whom they
              have four wonderful children.
            </p>
            <p>
              Mama Rita, as she&rsquo;s affectionately called, founded the highly successful and
              legendary Royal Ladies Ministry International in 1994, now with ministry branches and
              affiliations all over the world, particularly characterized by the ministry
              organization&rsquo;s immense community outreach projects and her much talked about
              extraordinary International Camp Conferences currently held annually in Ghana, UK and
              USA.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
