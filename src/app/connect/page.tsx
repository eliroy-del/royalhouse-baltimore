import Image from "next/image";
import Link from "next/link";
import { NextStepCard } from "@/components/cards/NextStepCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand, PageHero, SectionJumpLinks } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GridFillers } from "@/components/ui/GridFillers";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, navyBlurDataURL } from "@/config/images";
import { membershipJourney, nextSteps, serveTeams } from "@/content/connect";
import { getGroups } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Connect",
  description:
    "Find your next step at Royalhouse Baltimore, join a group, serve on a team, get baptized, request prayer, become a member or share your testimony.",
  path: "/connect",
  image: images.smallGroup.src,
});

const jumpLinks = [
  { label: "I'm new", href: "#new" },
  { label: "Next steps", href: "#steps" },
  { label: "Groups", href: "#groups" },
  { label: "Serve", href: "#serve" },
  { label: "Baptism", href: "#baptism" },
  { label: "Membership", href: "#membership" },
];

export default async function ConnectPage() {
  const groups = await getGroups();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Connect", path: "/connect" },
        ])}
      />

      <PageHero
        eyebrow="Get Connected"
        title={
          <>
            Let&rsquo;s <em className="not-italic text-gold-300">connect</em>.
          </>
        }
        lede="Sunday is the front door, not the whole house. Whatever stage you are at, there is one clear next step waiting for you here."
        image={images.smallGroup}
        objectPosition="50% 55%"
        breadcrumb={[{ label: "Connect" }]}
      />

      <SectionJumpLinks links={jumpLinks} />

      {/* --------------------------------- I'm new -------------------------------- */}
      <Section tone="cream" spacing="md" id="new">
        <Container>
          <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-6">
            <div>
              <SectionHeading
                eyebrow="I'm New Here"
                title="Start with one Sunday."
                lede="You do not have to sign up for anything, join anything or believe anything in particular. Come once, sit wherever you like, and see what you think."
              />
              <div className="mt-9 grid gap-4 sm:grid-cols-3">
                {[
                  { step: "01", title: "Come and see", text: "Any Sunday. No announcement needed." },
                  { step: "02", title: "Say hello", text: "Find the welcome team. That is what we are there for." },
                  { step: "03", title: "Take a next step", text: "A group, a team, a conversation. Your pace." },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="rounded-card border border-navy-900/[0.08] bg-white p-5"
                  >
                    <p className="font-display text-sm text-gold-800 tabular-nums">{item.step}</p>
                    <p className="mt-2 text-[0.9375rem] font-semibold text-navy-900">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[0.875rem] leading-relaxed text-navy-900/65">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/plan-a-visit">
                    Plan Your Visit
                    <Icon name="arrow-right" className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/events/new-here-lunch">Come to a New Here Lunch</Link>
                </Button>
              </div>
            </div>

            <Reveal y={26}>
              <div className="relative aspect-[4/5] overflow-hidden mask-arch bg-navy-900">
                <Image
                  src={images.welcomeLobby.src}
                  alt={images.welcomeLobby.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  placeholder="blur"
                  blurDataURL={navyBlurDataURL}
                  className="object-cover object-[60%_50%]"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------------- Next steps ------------------------------- */}
      <Section tone="white" spacing="md" id="steps">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Find Your Next Step"
            title="Every door here is open."
            lede="Pick the one that fits where you actually are, not where you think you ought to be."
          />
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {nextSteps.map((step) => (
              <StaggerItem key={step.id} className="h-full">
                <NextStepCard step={step} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* --------------------------------- Groups -------------------------------- */}
      <Section tone="navy" spacing="md" id="groups" className="overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-0 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.14),transparent_65%)]"
        />
        <Container className="relative">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6">
            <SectionHeading
              tone="dark"
              eyebrow="Join a Group"
              title="Church gets real around a table."
              lede="Groups meet midweek in homes across Baltimore. Six to twelve people, an open Bible, honest conversation and usually far too much food."
              actions={
                <Button asChild variant="gold" size="lg">
                  <Link href="/contact">
                    Ask about joining a group
                    <Icon name="arrow-right" className="size-4" />
                  </Link>
                </Button>
              }
            />

            <Stagger className="grid gap-px overflow-hidden rounded-media bg-white/10 sm:grid-cols-2">
              {groups.map((group) => (
                <StaggerItem key={group.id} className="bg-navy-900 p-6">
                  <p className="text-[1.0625rem] font-semibold text-white">{group.name}</p>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-white/60">
                    {group.focus}
                  </p>
                  <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.75rem] text-white/60">
                    <span className="flex items-center gap-1.5">
                      <Icon name="clock" className="size-3.5 text-gold-400" />
                      {group.cadence}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="map-pin" className="size-3.5 text-gold-400" />
                      {group.neighborhood}
                    </span>
                  </p>
                </StaggerItem>
              ))}
              <GridFillers count={groups.length} columns={{ sm: 2 }} tone="dark" />
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* --------------------------------- Serve --------------------------------- */}
      <Section tone="cream" spacing="md" id="serve">
        <Container>
          <SectionHeading
            eyebrow="Serve on a Team"
            title="You were given gifts on purpose."
            lede="Serving is where faith stops being an idea. Bring whatever you have, we will train you for the rest, and nobody serves alone."
            actions={
              <Button asChild size="lg">
                <Link href="/contact">
                  Talk to us about serving
                  <Icon name="arrow-right" className="size-4" />
                </Link>
              </Button>
            }
          />

          <Stagger className="mt-8 grid gap-px overflow-hidden rounded-media border border-navy-900/[0.08] bg-navy-900/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {serveTeams.map((team) => (
              <StaggerItem key={team.name} className="bg-white p-6">
                <p className="text-[0.9375rem] font-semibold text-navy-900">{team.name}</p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-navy-900/65">
                  {team.description}
                </p>
              </StaggerItem>
            ))}
            <GridFillers count={serveTeams.length} columns={{ sm: 2, lg: 4 }} />
          </Stagger>
        </Container>
      </Section>

      {/* -------------------------------- Baptism -------------------------------- */}
      <Section tone="white" spacing="md" id="baptism">
        <Container>
          <div className="grid items-center gap-5 lg:grid-cols-2 lg:gap-6">
            <Reveal y={26}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-navy-900">
                <Image
                  src={images.baptism.src}
                  alt={images.baptism.alt}
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
                eyebrow="Get Baptized"
                title="Go public with a changed life."
                lede="Baptism is not a graduation ceremony for people who have it together. It is how followers of Jesus have always said out loud what has happened on the inside."
              />
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-navy-900/65">
                We will sit down with you first, answer every question, and then celebrate properly
               , photographs, applause and all. Bring the people you love.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">I want to be baptized</Link>
                </Button>
                <Button asChild variant="link" size="none">
                  <Link href="/events/baptism-sunday">See the next baptism Sunday</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------- Membership ------------------------------ */}
      <Section tone="mist" spacing="md" id="membership">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Become a Member"
            title="Put down roots on purpose."
            lede="Membership is not a club card. It is saying: these are my people, this is my church, and I am in, for the ordinary weeks as well as the good ones."
          />

          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {membershipJourney.map((item) => (
              <StaggerItem
                key={item.step}
                className="relative rounded-media border border-navy-900/[0.08] bg-white p-5"
              >
                <span className="font-display text-3xl text-gold-600 tabular-nums">
                  {item.step}
                </span>
                <p className="mt-4 text-[1.0625rem] font-semibold text-navy-900">{item.title}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-900/62">
                  {item.description}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/contact">Start the conversation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/our-heart#beliefs">Read what we believe</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="One More Thing"
        title="Nobody here found their place by accident."
        lede="Every person who now calls this church home started with a single step. Take yours this week."
        actions={
          <>
            <Button asChild variant="gold" size="xl">
              <Link href="/plan-a-visit">Plan Your Visit</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link href="/prayer">Request Prayer</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
