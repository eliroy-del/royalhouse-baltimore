import Link from "next/link";
import { MinistryCard } from "@/components/cards/MinistryCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand, PageHero, SectionJumpLinks } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/config/images";
import { getMinistries } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { cn, slugify } from "@/lib/utils";
import type { Ministry, MinistryCategory } from "@/types";

export const metadata = pageMetadata({
  title: "Ministries",
  description:
    "Find your people at Royalhouse Baltimore — worship, kids, youth, young adults, women, men, prayer, outreach, hospitality and media ministries.",
  path: "/ministries",
  image: images.ministryYouth.src,
});

const categoryIntros: Record<MinistryCategory, string> = {
  Worship: "The teams that carry Sunday — music, sound, lighting and everything in between.",
  "Next Generation":
    "Children and teenagers are not the church of tomorrow; they are the church right now.",
  Adults: "Communities for every season of adult life, from your first job to your grandchildren.",
  Outreach: "Baltimore is not our audience. It is our neighborhood.",
  Prayer: "The quiet, unglamorous work that everything else here rests on.",
  Serving: "Practical teams that make Sunday, and everything around it, actually happen.",
};

const order: MinistryCategory[] = [
  "Worship",
  "Next Generation",
  "Adults",
  "Prayer",
  "Outreach",
  "Serving",
];

export default async function MinistriesPage() {
  const ministries = await getMinistries();

  const grouped = order
    .map((category) => ({
      category,
      items: ministries.filter((ministry) => ministry.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Ministries", path: "/ministries" },
        ])}
      />

      <PageHero
        eyebrow="Ministries"
        title={
          <>
            Find your <em className="not-italic text-gold-300">people</em>.
          </>
        }
        lede="Church gets real when a room of two hundred becomes a table of eight. These are the places where that happens."
        image={images.ministryYouth}
        objectPosition="50% 40%"
        breadcrumb={[{ label: "Ministries" }]}
      />

      <SectionJumpLinks
        links={grouped.map((group) => ({
          label: group.category,
          href: `#${slugify(group.category)}`,
        }))}
      />

      {grouped.map((group, index) => (
        <Section
          key={group.category}
          id={slugify(group.category)}
          tone={index % 2 === 0 ? "cream" : "white"}
          spacing="lg"
          className="scroll-mt-24"
        >
          <Container>
            <SectionHeading
              eyebrow={group.category}
              title={groupTitle(group.category)}
              lede={categoryIntros[group.category]}
            />
            {/* A category with one or two ministries keeps a bounded grid,
                so a single card never sits beside a wide empty gap. */}
            <Stagger
              className={cn(
                "mt-12 grid gap-5",
                group.items.length === 1 && "max-w-xl",
                group.items.length === 2 && "max-w-3xl sm:grid-cols-2",
                group.items.length > 2 && "sm:grid-cols-2 xl:grid-cols-3",
              )}
            >
              {group.items.map((ministry: Ministry) => (
                <StaggerItem key={ministry.id} className="h-full">
                  <MinistryCard ministry={ministry} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      ))}

      <Section tone="navy" spacing="lg">
        <Container width="narrow">
          <div className="text-center">
            <p className="flex items-center justify-center gap-3 eyebrow text-gold-300">
              <span aria-hidden="true" className="h-px w-8 bg-gold-500/70" />
              Not Sure Where You Fit?
            </p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] font-light leading-[1.06]">
              Tell us what you love and we will help you find it.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">
              You do not have to have it worked out. Most people discover their place by trying
              something for a season and seeing what comes alive.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="gold" size="xl">
                <Link href="/connect#serve">Explore Serving</Link>
              </Button>
              <Button asChild variant="outline-light" size="xl">
                <Link href="/contact">Talk to Someone</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Start With Sunday"
        title="Everything here begins in the same room."
        lede="Come on a Sunday, meet a few people, and let the rest follow at your pace."
        actions={
          <>
            <Button asChild variant="gold" size="xl">
              <Link href="/plan-a-visit">Plan Your Visit</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link href="/connect">Get Connected</Link>
            </Button>
          </>
        }
      />
    </>
  );
}

function groupTitle(category: MinistryCategory): string {
  switch (category) {
    case "Worship":
      return "The sound of our house.";
    case "Next Generation":
      return "Kids and youth, taken seriously.";
    case "Adults":
      return "Communities for grown-up life.";
    case "Prayer":
      return "The engine room.";
    case "Outreach":
      return "Love with its sleeves rolled up.";
    case "Serving":
      return "The teams that make it happen.";
  }
}
