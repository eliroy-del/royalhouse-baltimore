import Image from "next/image";
import Link from "next/link";
import { SermonCard } from "@/components/cards/SermonCard";
import { LiveStatus } from "@/components/media/LiveStatus";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { churchConfig } from "@/config/church";
import { images, navyBlurDataURL } from "@/config/images";
import { churchStatus, serviceTimeDetail } from "@/lib/church";
import { getLatestSermons } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Watch Live",
  description:
    "Worship with Royalhouse Baltimore online. Join our live stream on Sunday, catch the countdown to the next service, or watch a recent message.",
  path: "/watch-live",
  image: images.worshipTeam.src,
});

const onlineSteps = [
  {
    icon: "clock" as const,
    title: "Join a few minutes early",
    text: "The stream opens before we begin so you can settle in rather than arrive mid-song.",
  },
  {
    icon: "users" as const,
    title: "Watch with someone",
    text: "Church was never meant to be solitary. Invite a friend, a housemate or your family to watch with you.",
  },
  {
    icon: "hands-praying" as const,
    title: "Send us your prayer",
    text: "Our prayer team is praying during the service. Send a private request and we will carry it with us.",
  },
];

export default async function WatchLivePage() {
  const recent = await getLatestSermons(3);
  const { livestream } = churchConfig;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Watch Live", path: "/watch-live" },
        ])}
      />

      {/* ------------------------------ Live hero ------------------------------ */}
      <section className="relative isolate flex min-h-[44svh] flex-col justify-end overflow-hidden bg-navy-950 pb-8 pt-20 text-white sm:pb-10">
        <Image
          src={images.worshipTeam.src}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={82}
          placeholder="blur"
          blurDataURL={navyBlurDataURL}
          className="-z-10 object-cover"
          style={{ objectPosition: "50% 40%" }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-950/62" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/25"
        />

        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex flex-wrap items-center gap-2 text-[0.75rem] text-white/55">
              <li>
                <Link href="/" className="transition-colors hover:text-gold-200">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true" className="text-white/30">
                  /
                </span>
                <span aria-current="page" className="text-white/80">
                  Watch Live
                </span>
              </li>
            </ol>
          </nav>

          <p className="flex items-center gap-3 eyebrow text-gold-300">
            <span aria-hidden="true" className="h-px w-8 rule-gold" />
            Online Church
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(1.75rem,4vw,2.5rem)] font-light leading-[1.02] tracking-[-0.02em]">
            Worship with us <em className="not-italic text-gold-300">online</em>.
          </h1>
          <p className="mt-3 max-w-2xl text-[0.875rem] leading-relaxed text-white/75 sm:text-[0.9375rem]">
            Traveling, unwell, working, or simply not ready to walk into a building yet — you are
            still part of this. Join us live and worship from wherever you are.
          </p>

          <div className="mt-5 max-w-2xl">
            <LiveStatus
              isLiveNow={livestream.isLiveNow}
              serviceTimes={churchConfig.serviceTimes}
              fallbackMessage={serviceTimeDetail()}
            />
          </div>
        </Container>

        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px rule-gold opacity-40"
        />
      </section>

      {/* ------------------------------- The stream ------------------------------ */}
      <Section tone="navy-deep" spacing="md">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-5">
            <div>
              <VideoPlayer
                url={livestream.embedUrl}
                title="Royalhouse Baltimore live stream"
                poster={images.heroWorship}
                fallbackTitle="Our stream goes live here"
                fallbackMessage="Our live stream channel is being set up. As soon as it is live, the player will appear on this page every Sunday — and we will let you know."
              />

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {churchStatus.hasLivestream && livestream.channelUrl ? (
                  <Button asChild variant="light" size="lg">
                    <a href={livestream.channelUrl} target="_blank" rel="noreferrer noopener">
                      Open our channel
                      <Icon name="arrow-right" className="size-4" />
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="light" size="lg">
                    <Link href="/sermons">Watch a recent message</Link>
                  </Button>
                )}
                <Button asChild variant="outline-light" size="lg">
                  <Link href="/prayer">Request Prayer</Link>
                </Button>
                <Button asChild variant="link-light" size="none">
                  <Link href="/give">Give</Link>
                </Button>
              </div>
            </div>

            <aside className="flex flex-col gap-6">
              <div className="rounded-media border border-white/10 bg-white/[0.04] p-5">
                <h2 className="eyebrow text-gold-300">Service details</h2>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/80">
                  {serviceTimeDetail()}
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/60">
                  Every service includes worship, teaching from the Bible and prayer. Online or in
                  the room, it is the same church.
                </p>
                <Button asChild variant="outline-light" size="md" className="mt-6">
                  <Link href="/plan-a-visit">Come in person</Link>
                </Button>
              </div>

              <div className="rounded-media border border-white/10 bg-white/[0.04] p-5">
                <h2 className="eyebrow text-gold-300">Watching along</h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/65">
                  Live chat and prayer response open here once our stream platform is connected.
                  Until then, our prayer team is one message away and will reply personally.
                </p>
                <Button asChild variant="link-light" size="none" className="mt-5">
                  <Link href="/contact">Message the team</Link>
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ------------------------------ Online well ----------------------------- */}
      <Section tone="cream" spacing="md">
        <Container>
          <SectionHeading
            eyebrow="Watching Well"
            title="Three small things that change online church."
            lede="Watching a service is not the same as scrolling past one. A little intention makes an enormous difference."
          />

          <div className="mt-8 grid gap-px overflow-hidden rounded-media border border-navy-900/[0.08] bg-navy-900/[0.07] md:grid-cols-3">
            {onlineSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08} className="flex flex-col bg-white p-5">
                <span className="flex size-11 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                  <Icon name={step.icon} className="size-5" />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-navy-900">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/65">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------ Past streams ---------------------------- */}
      <Section tone="white" spacing="md">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Missed Sunday?"
              title="Catch up on recent messages."
              size="md"
              className="max-w-2xl"
            />
            <Link
              href="/sermons"
              className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-navy-900 underline decoration-gold-500/50 underline-offset-[6px] hover:decoration-gold-500"
            >
              All messages
              <Icon name="arrow-right" className="size-3.5 text-gold-600" />
            </Link>
          </div>

          {recent.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((sermon) => (
                <SermonCard key={sermon.id} sermon={sermon} className="h-full" />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-6"
              icon="video"
              title="Recordings are on the way"
              description="Our message library is being published. Join us live on Sunday in the meantime."
            />
          )}
        </Container>
      </Section>

      <CtaBand
        eyebrow="One Day, In Person"
        title="When you are ready, there is a seat with your name on it."
        lede="Plenty of people watch for months before they visit. Whenever that day comes, we will be glad to see you."
        image={images.churchExteriorDusk}
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
