import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { churchConfig, churchStatus } from "@/config/church";
import { images } from "@/config/images";
import { directionsUrl } from "@/lib/church";

export function YouBelongHere() {
  return (
    <Section tone="cream" spacing="lg">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-media">
            <Image
              src={images.welcomeHome.src}
              alt={images.welcomeHome.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-gold-700">Welcome</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] text-navy-900">
              {churchConfig.belongingLine}
            </h2>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-navy-900/75">
              Royalhouse Baltimore is a place to build faith, share fellowship, encounter God in
              prayer and worship, grow through God&rsquo;s Word, and find genuine community.
            </p>
            <Button asChild variant="primary" size="lg" className="mt-6">
              <Link href="/about/who-we-are">
                Discover Who We Are
                <Icon name="arrow-right" className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function WhoWeAreHome() {
  return (
    <Section tone="white" spacing="lg">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-navy-900">
              A campus of Royalhouse Chapel
            </h2>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-navy-900/75">
              Royalhouse Baltimore is a campus of {churchConfig.campusOf} and part of the{" "}
              {churchConfig.network} family, with churches across North America and around the
              world and international headquarters in {churchConfig.headquarters}.
            </p>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-navy-900/75">
              {churchConfig.statement}
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {churchConfig.identity.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[0.9375rem] text-navy-900">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-media">
            <Image
              src={images.worshipResponse.src}
              alt={images.worshipResponse.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[center_30%]"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function OurVisionHome() {
  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20 lg:py-24">
      <Image
        src={images.congregationPrayer.src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-navy-950/70" />
      <Container className="relative z-10">
        <h2 className="text-center text-[clamp(2rem,4.5vw,3.25rem)] font-bold text-white">
          Our Vision
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          {churchConfig.vision.map((pillar) => (
            <p
              key={pillar.statement}
              className="bg-white p-6 text-[0.9375rem] leading-relaxed text-black sm:p-8"
            >
              {pillar.statement}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function PlanVisitHome() {
  const stackedImages = [
    images.welcomeHome,
    images.outdoorWelcome,
    images.worshipResponse,
  ] as const;

  return (
    <Section tone="cream" spacing="lg">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-navy-900">
              What to expect
            </h2>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-navy-900/75">
              Planning your first visit? Here is what you need to know.
            </p>
            <ul className="mt-6 flex flex-col gap-2 text-[0.9375rem] text-navy-900">
              {churchConfig.visit.serviceIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-gold-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-card border border-navy-900/10 bg-white p-4 shadow-subtle">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-gold-100 text-navy-900">
                  <Icon name="clock" className="size-4" />
                </span>
                <p className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-700">
                  Service length
                </p>
                <p className="mt-1 font-display text-2xl leading-tight text-navy-900">
                  {churchConfig.visit.serviceLength.replace(/\.$/, "")}
                </p>
              </div>
              <div className="rounded-card border border-navy-900/10 bg-white p-4 shadow-subtle">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-gold-100 text-navy-900">
                  <Icon name="baby" className="size-4" />
                </span>
                <p className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-gold-700">
                  Kids Church
                </p>
                <p className="mt-1 font-display text-2xl leading-tight text-navy-900">
                  Ages {churchConfig.visit.childrenAges}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            <div className="relative col-span-1 row-span-2 min-h-[18rem] overflow-hidden rounded-media sm:min-h-[22rem]">
              <Image
                src={stackedImages[0].src}
                alt={stackedImages[0].alt}
                fill
                sizes="(min-width: 1024px) 22vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[8.5rem] overflow-hidden rounded-media sm:min-h-[10.5rem]">
              <Image
                src={stackedImages[1].src}
                alt={stackedImages[1].alt}
                fill
                sizes="(min-width: 1024px) 18vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[8.5rem] overflow-hidden rounded-media sm:min-h-[10.5rem]">
              <Image
                src={stackedImages[2].src}
                alt={stackedImages[2].alt}
                fill
                sizes="(min-width: 1024px) 18vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function WelcomeVideo() {
  const hasVideo = churchStatus.hasWelcomeVideo;

  return (
    <Section tone="navy-deep" spacing="lg">
      <Container width="narrow" className="text-center">
        <p className="eyebrow text-gold-300">Welcome Video</p>
        <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] text-white">
          Welcome to Royalhouse Baltimore
        </h2>
        <p className="mt-3 text-white/70">Meet us before you meet us.</p>
        <div className="relative mx-auto mt-8 aspect-video overflow-hidden rounded-media">
          <Image
            src={images.heroCampaign.src}
            alt="Welcome video placeholder"
            fill
            sizes="80vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-navy-950/45" />
          {hasVideo ? (
            <a
              href={churchConfig.welcomeVideoUrl}
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-gold-400 text-black">
                <Icon name="play" className="size-6" />
                <span className="sr-only">Play welcome video</span>
              </span>
            </a>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-white">
              <span
                aria-hidden="true"
                className="inline-flex size-16 items-center justify-center rounded-full bg-gold-400 text-black"
              >
                <Icon name="play" className="size-6" />
              </span>
              <p className="mt-4 text-sm text-white/80">Welcome video coming soon.</p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

export function ConnectHome() {
  return (
    <Section tone="white" spacing="lg">
      <Container>
        <p className="eyebrow text-gold-700">Next Steps</p>
        <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] text-navy-900">
          Prayer. Connect. Serve.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              href: "/prayer",
              title: "Need Prayer?",
              text: "We're here to pray with you.",
            },
            {
              href: "/contact",
              title: "Connect",
              text: "Ask a question or take a next step.",
            },
            {
              href: "/serve",
              title: "Join the Launch Team",
              text: "Find a place to serve.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-card border border-navy-900/10 bg-cream p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-elevate"
            >
              <h3 className="font-display text-2xl text-navy-900">{item.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-navy-900/70">{item.text}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function GiveHome() {
  return (
    <Section tone="cream" spacing="lg">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="relative aspect-[16/11] overflow-hidden rounded-media">
            <Image
              src={images.prayerKneeling.src}
              alt={images.prayerKneeling.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-gold-700">Give</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] text-navy-900">
              Give With Purpose
            </h2>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-navy-900/75">
              Generosity is part of worship and helps support the mission of Royalhouse Baltimore.
            </p>
            <Button asChild variant="gold" size="lg" className="mt-6">
              <Link href="/give">Give</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function LocationHome() {
  const directions = directionsUrl();
  const query = encodeURIComponent(churchConfig.address.mapQuery);

  return (
    <Section tone="white" spacing="none">
      <div className="grid lg:grid-cols-[minmax(0,22rem)_1fr]">
        <div className="flex flex-col justify-center bg-navy-900 px-6 py-10 text-white sm:px-10">
          <p className="eyebrow text-gold-300">Location</p>
          <h2 className="mt-3 font-display text-3xl">Find us</h2>
          <p className="mt-4 text-white/75">{churchConfig.address.line1}</p>
          <p className="text-white/75">{churchConfig.address.line2}</p>
          <p className="text-white/75">
            {churchConfig.address.city}, {churchConfig.regionCode} {churchConfig.address.postalCode}
          </p>
          {directions ? (
            <Link
              href={directions}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-gold-300"
            >
              Get Directions
              <Icon name="arrow-right" className="size-4" />
            </Link>
          ) : null}
        </div>
        <iframe
          title="Royalhouse Baltimore location"
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          className="h-80 w-full border-0 lg:h-full min-h-80"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </Section>
  );
}
