import Image from "next/image";
import Link from "next/link";
import { PlanVisitForm } from "@/components/forms/PlanVisitForm";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaBand, PageHero, SectionJumpLinks } from "@/components/sections/PageHero";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GridFillers } from "@/components/ui/GridFillers";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, navyBlurDataURL } from "@/config/images";
import { expectSteps, faqs, visitAnswers } from "@/content/visit";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plan a Visit",
  description:
    "Planning your first visit to Royalhouse Baltimore? Find service times, location, parking, what to expect, children's ministry and accessibility — then let us know you're coming.",
  path: "/plan-a-visit",
  image: images.welcomeLobby.src,
});

const jumpLinks = [
  { label: "When & where", href: "#when" },
  { label: "What to expect", href: "#expect" },
  { label: "Your questions", href: "#answers" },
  { label: "Children", href: "#children" },
  { label: "Accessibility", href: "#accessibility" },
  { label: "Tell us you're coming", href: "#form" },
  { label: "FAQs", href: "#faq" },
];

const reassurances = [
  { icon: "handshake" as const, text: "Someone will meet you at the door by name." },
  { icon: "baby" as const, text: "Kids check-in handled before the first song." },
  { icon: "accessibility" as const, text: "Accessible seating reserved if you need it." },
  { icon: "message-circle" as const, text: "One friendly message — never a sales pitch." },
];

export default function PlanAVisitPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Plan a Visit", path: "/plan-a-visit" },
        ])}
      />

      <PageHero
        eyebrow="First Time Here?"
        title={
          <>
            Planning your first visit?{" "}
            <em className="not-italic text-gold-300">We&rsquo;ve got you.</em>
          </>
        }
        lede="No dress code, no awkward introductions, no pressure. Here is everything you need to know before Sunday — and a way to tell us you're coming so we can look out for you."
        image={images.welcomeLobby}
        objectPosition="60% 45%"
        breadcrumb={[{ label: "Plan a Visit" }]}
        actions={
          <>
            <Button asChild variant="gold" size="lg">
              <Link href="#form">
                Tell Us You&rsquo;re Coming
                <Icon name="arrow-right" className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link href="#expect">What to Expect</Link>
            </Button>
          </>
        }
      />

      <SectionJumpLinks links={jumpLinks} />

      {/* ------------------------------ When & where ----------------------------- */}
      <Section tone="cream" spacing="md" id="when">
        <ServiceCard />
      </Section>

      {/* ---------------------------- What to expect ---------------------------- */}
      <Section tone="white" spacing="lg" id="expect">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-10">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="What to Expect"
                title="A Sunday, start to finish."
                lede="You will not be singled out, asked to stand up, or handed a form. Here is the honest shape of a service with us."
              />
              <Reveal delay={0.2}>
                <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-media bg-navy-900">
                  <Image
                    src={images.worshipTeam.src}
                    alt={images.worshipTeam.alt}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    placeholder="blur"
                    blurDataURL={navyBlurDataURL}
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>

            <Stagger className="flex flex-col">
              {expectSteps.map((step) => (
                <StaggerItem
                  key={step.step}
                  className="group flex gap-6 border-b border-navy-900/[0.08] py-8 first:pt-0 last:border-b-0"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-navy-900/10 text-navy-800 transition-colors duration-500 group-hover:border-gold-500/50 group-hover:bg-gold-100 group-hover:text-gold-700">
                    <Icon name={step.icon} className="size-5" />
                  </span>
                  <div>
                    <p className="flex items-baseline gap-3">
                      <span className="font-display text-sm text-navy-900/65 tabular-nums">
                        {step.step}
                      </span>
                      <span className="font-display text-[1.5rem] leading-tight text-navy-900">
                        {step.title}
                      </span>
                    </p>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/65">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* ------------------------- Practical answers grid ------------------------ */}
      <Section tone="mist" spacing="lg" id="answers">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Your Questions, Answered"
            title="The things people actually want to know."
            lede="Straight answers, no church jargon. If we have not covered it, just ask us."
          />

          <Stagger className="mt-8 grid gap-px overflow-hidden rounded-media border border-navy-900/[0.08] bg-navy-900/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {visitAnswers.map((answer) => {
              const isPending = answer.answer.trim().length === 0;
              const body = isPending ? (answer.fallback ?? "") : answer.answer;
              return (
                <StaggerItem
                  key={answer.id}
                  id={answer.id}
                  className="scroll-mt-32 bg-white p-7 lg:p-8"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-navy-900/[0.05] text-navy-800">
                    <Icon name={answer.icon} className="size-5" />
                  </span>
                  <h3 className="mt-5 text-[1.0625rem] font-semibold leading-snug text-navy-900">
                    {answer.question}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/65">{body}</p>
                </StaggerItem>
              );
            })}
            <GridFillers count={visitAnswers.length} columns={{ sm: 2, lg: 3 }} />
          </Stagger>
        </Container>
      </Section>

      {/* -------------------------------- Children ------------------------------- */}
      <Section tone="white" spacing="lg" id="children">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <Reveal y={26}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-navy-900">
                <Image
                  src={images.ministryKids.src}
                  alt={images.ministryKids.alt}
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
                eyebrow="What About My Children?"
                title="Bring them. All of them."
                lede="Children are genuinely welcome in the main service — nobody minds the noise. And if they would rather have their own space, our kids team is ready and waiting."
              />
              <ul className="mt-9 flex flex-col gap-4">
                {[
                  "Every kids volunteer is screened and background-checked",
                  "Secure check-in and matched pick-up, every single week",
                  "Age-appropriate teaching, songs, crafts and a lot of laughing",
                  "Allergy and medical notes recorded at check-in",
                  "Babies and toddlers welcome in the room with you",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-700">
                      <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3">
                        <path
                          d="M3.5 8.5l3 3L12.5 5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-[0.9375rem] leading-snug text-navy-900/75">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild variant="outline" size="lg">
                  <Link href="/ministries/kids">About kids ministry</Link>
                </Button>
                <Button asChild variant="link" size="none">
                  <Link href="/ministries/youth">Youth (grades 6–12)</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------ Where & access ---------------------------- */}
      <Section tone="cream" spacing="lg" id="where">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <SectionHeading
                eyebrow="Getting Here"
                title="Where we meet."
                lede="We gather in Baltimore, Maryland. Message us any time and we will send you the exact location, the best place to park and the door to walk through."
              />
              <div id="accessibility" className="mt-10 scroll-mt-32 rounded-media border border-navy-900/[0.08] bg-white p-7">
                <span className="flex size-11 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                  <Icon name="accessibility" className="size-5" />
                </span>
                <h3 className="mt-5 text-[1.0625rem] font-semibold text-navy-900">
                  Accessibility
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/65">
                  Step-free access, accessible restrooms, and seating reserved near the front and on
                  the aisles. Tell a member of the welcome team — or mention it on the form below —
                  and it will be arranged before you arrive.
                </p>
              </div>
            </div>

            <MapEmbed className="lg:mt-2" />
          </div>
        </Container>
      </Section>

      {/* --------------------------------- The form ------------------------------- */}
      <Section tone="white" spacing="lg" id="form">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-10">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Plan Your Visit"
                title="Tell us you're coming."
                lede="Two minutes now saves you every awkward moment later. We will look out for you, save you a seat and have your children's check-in ready."
              />

              <ul className="mt-10 flex flex-col gap-4 border-t border-navy-900/[0.08] pt-9">
                {reassurances.map((item) => (
                  <li key={item.text} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                      <Icon name={item.icon} className="size-4" />
                    </span>
                    <span className="text-[0.9375rem] leading-snug text-navy-900/75">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-media border border-navy-900/[0.08] bg-cream p-7 sm:p-10">
              <PlanVisitForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------- FAQ --------------------------------- */}
      <Section tone="mist" spacing="lg" id="faq">
        <Container width="narrow">
          <SectionHeading
            align="center"
            eyebrow="Still Wondering?"
            title="Frequently asked questions."
          />
          <FaqAccordion items={faqs} className="mt-12" />
          <p className="mt-10 text-center text-[0.9375rem] text-navy-900/65">
            Cannot find your question?{" "}
            <Link
              href="/contact"
              className="font-semibold text-navy-900 underline decoration-gold-500/50 underline-offset-4 hover:decoration-gold-500"
            >
              Ask us directly
            </Link>{" "}
            — a real person will reply.
          </p>
        </Container>
      </Section>

      <CtaBand
        eyebrow="We Can't Wait"
        title="Come as you are. Seriously."
        lede="Whatever kind of week you have had, there is a seat here with your name on it this Sunday."
        image={images.churchExteriorDusk}
        actions={
          <>
            <Button asChild variant="gold" size="xl">
              <Link href="#form">Plan Your Visit</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link href="/watch-live">Watch Online First</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
