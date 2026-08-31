import Image from "next/image";
import Link from "next/link";
import { PlanVisitForm } from "@/components/forms/PlanVisitForm";
import { Reveal } from "@/components/motion/Reveal";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { churchConfig } from "@/config/church";
import { images, navyBlurDataURL } from "@/config/images";
import {
  addressLines,
  churchStatus,
  directionsUrl,
  locationLine,
  serviceTimeDetail,
  serviceTimeSummary,
} from "@/lib/church";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plan a Visit",
  description:
    "We can't wait to see you at Royalhouse Baltimore. Find service times, location, what to expect for kids, what to wear, and tell us you're coming.",
  path: "/plan-a-visit",
  image: images.welcomeLobby.src,
});

/**
 * Warm, simple first-visit page modeled on a clear welcome flow:
 * invitation → practical details → kids → dress → form → map.
 * @see https://www.livingdestiny.org/plan-a-visit
 */
export default function PlanAVisitPage() {
  const directions = directionsUrl();
  const lines = addressLines();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Plan a Visit", path: "/plan-a-visit" },
        ])}
      />

      <PageHero
        title={
          <>
            We can&rsquo;t wait to{" "}
            <em className="not-italic text-gold-300">see you</em>.
          </>
        }
        lede="We'd love to welcome you to our gatherings. Find the answers you need below, and get in touch if you still have questions."
        image={images.welcomeLobby}
        objectPosition="60% 45%"
        breadcrumb={[{ label: "Plan a Visit" }]}
        size="md"
      />

      {/* Service time, address, and quick actions */}
      <Section tone="cream" spacing="sm">
        <Container width="narrow" className="text-center">
          <Reveal>
            <p className="font-display text-[clamp(1.375rem,2.6vw,1.875rem)] font-light leading-tight text-navy-900">
              {churchStatus.hasServiceTimes
                ? serviceTimeSummary()
                : "Sunday gatherings"}
            </p>
            <p className="mt-1.5 text-[0.875rem] leading-relaxed text-navy-900/70">
              {churchStatus.hasServiceTimes
                ? locationLine()
                : serviceTimeDetail()}
            </p>
            {!churchStatus.hasServiceTimes ? (
              <p className="mt-1 text-[0.875rem] leading-relaxed text-navy-900/70">
                {locationLine()}
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              <Button asChild variant="gold" size="md">
                <Link href="#form">
                  Visiting Form
                  <Icon name="arrow-right" className="size-3.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="md">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="md">
                <Link href="/connect">Get Connected</Link>
              </Button>
              <Button asChild variant="outline" size="md">
                <Link href="/watch-live">Church Online</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Children */}
      <Section tone="white" spacing="sm" id="children">
        <Container>
          <div className="grid items-center gap-5 lg:grid-cols-2 lg:gap-8">
            <Reveal y={18}>
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

            <Reveal delay={0.06}>
              <p className="eyebrow text-gold-800">For Families</p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-light leading-tight text-navy-900">
                Are there services for my children?
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/70">
                {churchConfig.visit.children}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/70">
                Our welcome team will help you check children in when you arrive. Kids are also
                welcome to stay with you in the main gathering, nobody minds the noise.
              </p>
              <div className="mt-5">
                <Button asChild variant="outline" size="md">
                  <Link href="/ministries/kids">About kids ministry</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What to wear */}
      <Section tone="mist" spacing="sm" id="wear">
        <Container>
          <div className="grid items-center gap-5 lg:grid-cols-2 lg:gap-8">
            <Reveal delay={0.06} className="lg:order-2">
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

            <Reveal className="lg:order-1">
              <p className="eyebrow text-gold-800">Come As You Are</p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-light leading-tight text-navy-900">
                What should I wear?
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/70">
                {churchConfig.visit.dressCode}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/70">
                Your presence is what matters. Dress in whatever helps you feel at ease, and walk
                through the door.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Visiting form */}
      <Section tone="white" spacing="sm" id="form">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
            <div>
              <p className="eyebrow text-gold-800">Visiting Form</p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-light leading-tight text-navy-900">
                Tell us you&rsquo;re coming.
              </h2>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-navy-900/70">
                A couple of minutes now means we can look out for you, help with kids check-in, and
                make your first Sunday feel easy.
              </p>

              <ul className="mt-5 space-y-2.5 text-[0.875rem] leading-snug text-navy-900/75">
                <li className="flex items-start gap-2.5">
                  <Icon name="map-pin" className="mt-0.5 size-4 shrink-0 text-gold-600" />
                  <span>
                    {lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
                {directions ? (
                  <li>
                    <a
                      href={directions}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 font-semibold text-navy-900 underline decoration-gold-500/50 underline-offset-4 hover:decoration-gold-500"
                    >
                      Get directions
                      <Icon name="arrow-right" className="size-3.5" />
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>

            <div className="rounded-media border border-navy-900/[0.08] bg-cream p-4 sm:p-5">
              <PlanVisitForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* Map */}
      <Section tone="cream" spacing="none" id="map">
        <MapEmbed fullBleed />
      </Section>
    </>
  );
}
