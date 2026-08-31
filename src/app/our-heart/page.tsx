import Image from "next/image";
import Link from "next/link";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand, PageHero, SectionJumpLinks } from "@/components/sections/PageHero";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GridFillers } from "@/components/ui/GridFillers";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { churchConfig } from "@/config/church";
import { images, navyBlurDataURL } from "@/config/images";
import {
  beliefs,
  communityImpact,
  mission,
  pillars,
  storyMilestones,
  values,
  vision,
} from "@/content/our-heart";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Heart",
  description:
    "Who we are, what we believe and why Royalhouse Baltimore exists — our mission, vision, values, beliefs and commitment to the city of Baltimore.",
  path: "/our-heart",
  image: images.heroWorship.src,
});

const jumpLinks = [
  { label: "Who we are", href: "#who" },
  { label: "Mission & vision", href: "#mission" },
  { label: "Our values", href: "#values" },
  { label: "What we believe", href: "#beliefs" },
  { label: "Our story", href: "#story" },
  { label: "Community", href: "#community" },
];

export default function OurHeartPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Heart", path: "/our-heart" },
        ])}
      />

      <PageHero
        eyebrow="Our Heart"
        title={
          <>
            We exist to know God, love people and{" "}
            <em className="not-italic text-gold-300">transform lives</em>.
          </>
        }
        lede="Every church says it is about Jesus and people. Here is what that actually looks like on a Tuesday in Baltimore."
        image={images.heroWorship}
        objectPosition="50% 40%"
        breadcrumb={[{ label: "Our Heart" }]}
        size="lg"
      />

      <SectionJumpLinks links={jumpLinks} />

      {/* -------------------------------- Who we are ------------------------------ */}
      <Section tone="cream" spacing="lg" id="who">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20">
            <div>
              <SectionHeading eyebrow="Who We Are" title="An ordinary church with an extraordinary God." />
              <div className="mt-8 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-navy-900/72">
                <p>
                  {churchConfig.name} is a Spirit-filled family of believers in Baltimore, Maryland,
                  and part of the wider {churchConfig.network} family. We are West African and West
                  Baltimore, second-generation and brand new, students and grandparents, and we would
                  not have it any other way.
                </p>
                <p>
                  What holds us together is not a shared background. It is a shared conviction: that
                  Jesus is alive, that the Bible is true, that the Holy Spirit still moves, and that
                  a church is meant to be the safest room in the city.
                </p>
                <p className="font-display text-[1.375rem] italic leading-relaxed text-navy-900">
                  We would rather be a church where you can be honest than a church that looks
                  impressive.
                </p>
              </div>
            </div>

            <Reveal y={26}>
              <div className="relative aspect-[4/5] overflow-hidden mask-arch bg-navy-900">
                <Image
                  src={images.ministryMen.src}
                  alt={images.ministryMen.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  placeholder="blur"
                  blurDataURL={navyBlurDataURL}
                  className="object-cover object-[45%_50%]"
                />
              </div>
            </Reveal>
          </div>

          <Stagger className="mt-18 grid gap-px overflow-hidden rounded-media border border-navy-900/[0.08] bg-navy-900/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <StaggerItem key={pillar.id} className="group bg-white p-7">
                <span className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-full bg-navy-900/[0.05] text-navy-800 transition-colors duration-500 group-hover:bg-gold-100 group-hover:text-gold-700">
                    <Icon name={pillar.icon} className="size-5" />
                  </span>
                  <span className="font-display text-2xl text-navy-900/50 tabular-nums">
                    0{index + 1}
                  </span>
                </span>
                <h3 className="mt-6 font-display text-[1.5rem] leading-tight text-navy-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/65">
                  {pillar.description}
                </p>
              </StaggerItem>
            ))}
            <GridFillers count={pillars.length} columns={{ sm: 2, lg: 4 }} />
          </Stagger>
        </Container>
      </Section>

      {/* ----------------------------- Mission & vision --------------------------- */}
      <Section tone="navy" spacing="none" id="mission" className="overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center py-20 sm:py-24 lg:py-32">
            <Container width="full" className="max-w-[42rem] lg:pl-12 lg:pr-16">
              <Eyebrow tone="dark">{mission.eyebrow}</Eyebrow>
              <Reveal delay={0.06}>
                <p className="mt-6 font-display text-[clamp(1.875rem,3.6vw,2.875rem)] font-light leading-[1.12] text-white">
                  {mission.statement}
                </p>
              </Reveal>
              <div className="mt-8 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-white/70">
                {mission.body.map((paragraph) => (
                  <Reveal key={paragraph.slice(0, 24)} delay={0.12}>
                    <p>{paragraph}</p>
                  </Reveal>
                ))}
              </div>

              <div className="mt-14 border-t border-white/12 pt-12">
                <Eyebrow tone="dark">{vision.eyebrow}</Eyebrow>
                <Reveal delay={0.06}>
                  <p className="mt-6 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-light leading-[1.14] text-white">
                    {vision.statement}
                  </p>
                </Reveal>
                <div className="mt-8 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-white/70">
                  {vision.body.map((paragraph) => (
                    <Reveal key={paragraph.slice(0, 24)} delay={0.12}>
                      <p>{paragraph}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Container>
          </div>

          <ParallaxMedia
            src={images.eventWorshipNight.src}
            alt={images.eventWorshipNight.alt}
            className="order-first min-h-[24rem] lg:order-last lg:min-h-full"
            sizes="(min-width: 1024px) 50vw, 100vw"
            strength={7}
            overlay="soft"
          />
        </div>
      </Section>

      {/* -------------------------------- Our values ----------------------------- */}
      <Section tone="white" spacing="lg" id="values">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Our Values"
            title="The commitments we are willing to be measured by."
          />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-media border border-navy-900/[0.08] bg-navy-900/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <StaggerItem key={value.title} className="bg-white p-7 lg:p-8">
                <p className="font-display text-lg text-gold-700 tabular-nums">
                  0{index + 1}
                </p>
                <h3 className="mt-4 text-[1.0625rem] font-semibold leading-snug text-navy-900">
                  {value.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/65">
                  {value.description}
                </p>
              </StaggerItem>
            ))}
            <GridFillers count={values.length} columns={{ sm: 2, lg: 3 }} />
          </Stagger>
        </Container>
      </Section>

      {/* ------------------------------ What we believe --------------------------- */}
      <Section tone="mist" spacing="lg" id="beliefs">
        <Container>
          <SectionHeading
            eyebrow="What We Believe"
            title="The convictions underneath everything."
            lede="Historic Christian faith, held with conviction and explained without jargon. If you want to go deeper on any of these, ask us — we would love the conversation."
          />

          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {beliefs.map((belief) => (
              <StaggerItem
                key={belief.id}
                className="flex h-full flex-col rounded-media border border-navy-900/[0.08] bg-white p-7"
              >
                <h3 className="font-display text-[1.375rem] leading-tight text-navy-900">
                  {belief.title}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-navy-900/65">
                  {belief.summary}
                </p>
                <p className="mt-5 border-t border-navy-900/[0.07] pt-4 eyebrow text-gold-800">
                  {belief.scripture}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* -------------------------------- Our story ------------------------------ */}
      <Section tone="cream" spacing="lg" id="story">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Our Story"
                title="How this church came to Baltimore."
                lede="Royalhouse Baltimore is a local expression of a global family — planted here to stay, to serve and to grow with the city."
              />
              <Reveal delay={0.16}>
                <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-media bg-navy-900">
                  <Image
                    src={images.baltimoreCity.src}
                    alt={images.baltimoreCity.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    placeholder="blur"
                    blurDataURL={navyBlurDataURL}
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>

            <StoryTimeline milestones={storyMilestones} />
          </div>
        </Container>
      </Section>

      {/* ------------------------------- Community ------------------------------- */}
      <Section tone="white" spacing="lg" id="community">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal y={26}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-navy-900">
                <Image
                  src={images.ministryOutreach.src}
                  alt={images.ministryOutreach.alt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  placeholder="blur"
                  blurDataURL={navyBlurDataURL}
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Community Impact"
                title="Loving Baltimore in ways you can measure."
                lede="We would rather be known for what we build than for what we announce."
              />
              <Stagger className="mt-9 flex flex-col gap-5">
                {communityImpact.map((item) => (
                  <StaggerItem key={item.title} className="flex gap-4">
                    <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                      <Icon name="hand-heart" className="size-4" />
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-semibold text-navy-900">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-[0.9375rem] leading-relaxed text-navy-900/62">
                        {item.description}
                      </span>
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/connect#serve">Serve with us</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/leadership">Meet our leadership</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Our Heart, In Person"
        title="The best way to understand a church is to sit in one."
        lede="Read everything on this page, then come and see whether we live it. We would rather be tested than taken at our word."
        image={images.heroWorship}
        actions={
          <>
            <Button asChild variant="gold" size="xl">
              <Link href="/plan-a-visit">Plan Your Visit</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link href="/sermons">Listen to a Message</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
