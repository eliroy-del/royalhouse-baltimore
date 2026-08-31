import Link from "next/link";
import { LeaderCard, LeaderSlotCard } from "@/components/cards/LeaderCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand, PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/config/images";
import { getLeaders, getLeadershipGroups, getLeadershipSlots } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Leadership",
  description:
    "Meet the leadership of Royalhouse Baltimore — the pastoral team, ministry leaders and staff who serve and shepherd this church family.",
  path: "/leadership",
  image: images.churchExteriorDusk.src,
});

const commitments = [
  {
    icon: "hands-praying" as const,
    title: "Accountable",
    text: "Our leaders are accountable to one another and to the wider Royalhouse Chapel International family, not to themselves.",
  },
  {
    icon: "book-open" as const,
    title: "Teachable",
    text: "We preach the Bible and we submit to it. Leadership here means being under the Word before standing over it.",
  },
  {
    icon: "hand-heart" as const,
    title: "Reachable",
    text: "You should be able to speak to a leader without an appointment or a gatekeeper. That is on purpose.",
  },
];

export default async function LeadershipPage() {
  const leaders = await getLeaders();
  const slots = await getLeadershipSlots();
  const groups = await getLeadershipGroups();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Leadership", path: "/leadership" },
        ])}
      />

      <PageHero
        eyebrow="Leadership"
        title={
          <>
            Meet the people who <em className="not-italic text-gold-300">carry this house</em>.
          </>
        }
        lede="Leadership here is service before status. These are the people responsible for the teaching, care and direction of Royalhouse Baltimore."
        image={images.churchExteriorDusk}
        objectPosition="50% 45%"
        breadcrumb={[{ label: "Leadership" }]}
      />

      <Section tone="cream" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="How We Lead"
            title="Three commitments we hold each other to."
            lede="A church rises or falls on the character of the people leading it. So we say out loud what we expect of ourselves."
          />

          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-media border border-navy-900/[0.08] bg-navy-900/[0.07] md:grid-cols-3">
            {commitments.map((commitment) => (
              <StaggerItem key={commitment.title} className="flex flex-col bg-white p-8">
                <span className="flex size-11 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                  <Icon name={commitment.icon} className="size-5" />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-navy-900">{commitment.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/65">
                  {commitment.text}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {groups.map((group, index) => {
        const people = leaders.filter((leader) => leader.group === group.id);
        const groupSlots = slots.filter((slot) => slot.group === group.id);
        if (people.length === 0 && groupSlots.length === 0) return null;

        return (
          <Section
            key={group.id}
            tone={index % 2 === 0 ? "white" : "cream"}
            spacing="lg"
            id={group.id.toLowerCase()}
            className="scroll-mt-24"
          >
            <Container>
              <SectionHeading
                eyebrow={group.eyebrow}
                title={group.title}
                lede={group.description}
                size="md"
              />

              {/* Small groups keep a bounded grid so one card never floats in a void */}
              <Stagger
                className={cn(
                  "mt-12 grid gap-5",
                  people.length + groupSlots.length === 1 && "max-w-md",
                  people.length + groupSlots.length === 2 && "max-w-3xl sm:grid-cols-2",
                  people.length + groupSlots.length > 2 &&
                    "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                )}
              >
                {people.map((leader) => (
                  <StaggerItem key={leader.id} className="h-full">
                    <LeaderCard leader={leader} className="h-full" />
                  </StaggerItem>
                ))}
                {groupSlots.map((slot) => (
                  <StaggerItem key={slot.id} className="h-full">
                    <LeaderSlotCard
                      role={slot.role}
                      responsibility={slot.responsibility}
                      className="h-full"
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            </Container>
          </Section>
        );
      })}

      <CtaBand
        eyebrow="Talk To Us"
        title="You do not need permission to ask a question."
        lede="If you would like to speak with a pastor, ask about membership, or simply understand what we believe, get in touch and a real person will answer."
        actions={
          <>
            <Button asChild variant="gold" size="xl">
              <Link href="/contact">Contact the Team</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link href="/our-heart">What We Believe</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
