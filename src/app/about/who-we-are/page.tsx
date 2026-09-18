import Image from "next/image";
import Link from "next/link";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
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
    "Why Royalhouse Baltimore is here, what we believe, and how we serve Baltimore and surrounding communities.",
  path: "/about/who-we-are",
  image: images.baltimoreSkylineDusk.src,
});

const beliefs = [
  {
    title: "Jesus",
    body: "Jesus is at the center of everything we are and everything we do. We believe He is the Son of God, our Savior and Lord, and that through His death and resurrection we have forgiveness, new life, and the hope of eternity. We exist to help people know Jesus, follow Jesus, and become more like Jesus.",
  },
  {
    title: "Scripture",
    body: "We believe the Bible is the inspired Word of God and the foundation for our faith, our values, and the way we live. We are committed to teaching Scripture faithfully and allowing God's Word to shape how we think, believe, and live.",
  },
  {
    title: "Holy Spirit",
    body: "We believe in the person and power of the Holy Spirit. He empowers us to live holy lives, understand God's Word, walk in spiritual gifts, and boldly represent Jesus. We desire to be a Spirit-filled church where prayer, spiritual formation, and the presence of God are central to our life together.",
  },
  {
    title: "Salvation",
    body: "We believe salvation is a gift of God, received through faith in Jesus Christ. We believe that Jesus transforms lives, and that no one is beyond the reach of His grace. Our desire is to see people encounter Christ, experience new life, and grow in their relationship with Him.",
  },
  {
    title: "Prayer",
    body: "We believe prayer is more than a church activity. It is how we cultivate our relationship with God and seek His will. We are a praying church that believes God hears, responds to, and works through the prayers of His people.",
  },
  {
    title: "Worship",
    body: "We believe worship is our response to who God is and what He has done. We pursue worship that is passionate, reverent, authentic, and centered on Jesus. Worship is not limited to a Sunday gathering; it is a lifestyle of honoring God with our whole lives.",
  },
  {
    title: "Discipleship",
    body: "We believe following Jesus means becoming a disciple and helping others become disciples. We are committed to teaching, mentoring, equipping, and challenging people to grow in their faith, discover their God-given purpose, and live out their calling.",
  },
  {
    title: "Community",
    body: "We believe God created us for relationship with Him and with one another. We want Royalhouse Baltimore to be a place where people are known, welcomed, encouraged, challenged, and cared for. We believe life and faith are meant to be lived in community.",
  },
] as const;

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
        image={images.baltimoreSkylineDusk}
        objectPosition="50% 35%"
        breadcrumb={[{ label: "Who We Are" }]}
      />

      <section className="relative isolate overflow-hidden py-20 sm:py-24 lg:py-28">
        <ParallaxMedia
          src={images.baltimoreHarbor.src}
          alt=""
          className="absolute inset-0"
          imageClassName="object-[center_42%]"
          sizes="100vw"
          strength={14}
          overlay="none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy-950/78 via-navy-950/72 to-navy-950/82"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-950/55 via-transparent to-navy-950/40"
        />
        <Container width="narrow" className="relative z-10">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-white">Why Baltimore?</h2>
          <div className="mt-5 space-y-4 type-body-lg text-white/85">
            <p>
              The Baltimore region is rich with history, culture, creativity, resilience, families,
              students, entrepreneurs, and people with dreams for their future. It is a region with
              deep challenges and tremendous potential, and we believe there is hope for Baltimore
              and the communities that surround it.
            </p>
            <p>
              We believe the story of this region is not ultimately defined by its challenges,
              circumstances, or past. God is the author of Baltimore&rsquo;s story, and we believe He
              has a purpose for this city, its surrounding communities, and the generations that call
              this region home. Royalhouse Baltimore is here because we believe there is more to the
              story, and we want to be part of what God is doing throughout the Baltimore region.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="white" spacing="lg">
        <Container>
          <h2 className="font-display text-3xl text-navy-900">What We Believe</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {beliefs.map((item) => (
              <article key={item.title} className="border-t border-navy-900/10 pt-5">
                <h3 className="font-display text-xl text-navy-900">{item.title}</h3>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-navy-900/75">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cream" spacing="lg">
        <Container width="narrow">
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-navy-900">
            Serving Baltimore and surrounding communities
          </h2>
          <p className="mt-2 text-[0.9375rem] font-medium text-gold-800">
            Catonsville, Woodlawn, Randallstown, Windsor Mill and beyond
          </p>
          <p className="mt-5 type-body-lg text-navy-900/75">
            We believe the Church is called to love and serve the people around it. Baltimore and
            the surrounding communities are not simply where we are located. They are the people and
            places God has entrusted to us. We believe there is hope for Baltimore and that its
            story is ultimately being written by God, not defined by its challenges or circumstances.
            We are here to serve the city and region, build community, raise leaders, and help people
            encounter the transforming power of Jesus Christ.
          </p>
        </Container>
      </Section>

      <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
        <ParallaxMedia
          src={images.grace2GraceCenter.src}
          alt=""
          className="absolute inset-0"
          imageClassName="object-[center_70%]"
          sizes="100vw"
          strength={12}
          overlay="none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-cornflower/75 via-cornflower/60 to-cornflower/78"
        />
        <Container className="relative z-10">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-14">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.1] text-white">
                <span className="block">Our relationship to</span>
                <span className="block">Royalhouse Chapel International</span>
              </h2>
              <span aria-hidden="true" className="mt-5 block h-px w-14 bg-gold-400" />
              <p className="mt-5 text-[1.05rem] leading-relaxed text-white/75">
                Royalhouse Baltimore is a campus of {churchConfig.campusOf} and belongs to the wider{" "}
                {churchConfig.network} family. The international headquarters is in{" "}
                {churchConfig.headquarters}.
              </p>
              <Button asChild variant="gold" size="lg" className="mt-8">
                <Link href="/about/our-north-american-missions-lead">
                  Meet Apostle Emmanuel Agormeda
                </Link>
              </Button>
            </div>
            <figure className="mx-auto w-full max-w-[22rem] lg:mx-0">
              <div className="relative aspect-[3/4] overflow-hidden rounded-media shadow-float">
                <Image
                  src={images.apostleAgorMina.src}
                  alt={images.apostleAgorMina.alt}
                  fill
                  sizes="352px"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 text-center text-[0.875rem] leading-relaxed text-white/70">
                Apostle Emmanuel Agormeda and Rev. Mrs. Willhemina Agormeda
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <Section tone="white" spacing="lg">
        <Container width="narrow" className="text-center">
          <h2 className="font-display text-3xl text-navy-900">Come see for yourself</h2>
          <p className="mx-auto mt-4 max-w-xl type-body-lg text-navy-900/75">
            You belong here. Plan a visit and take the next step with us.
          </p>
          <Button asChild variant="gold" size="lg" className="mt-8">
            <Link href="/plan-a-visit">Plan My Visit</Link>
          </Button>
        </Container>
      </Section>
    </>
  );
}
