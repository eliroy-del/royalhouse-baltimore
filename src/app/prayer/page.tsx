import Link from "next/link";
import { PrayerForm } from "@/components/forms/PrayerForm";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/config/images";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request Prayer",
  description:
    "Send a private prayer request to the Royalhouse Baltimore prayer team. Confidential, read only by our pastoral team, and prayed over every week.",
  path: "/prayer",
  image: images.prayerCircle.src,
});

const promises = [
  {
    icon: "hands-praying" as const,
    title: "It gets prayed for",
    text: "Every request reaches our prayer team and is prayed over during the week — not filed and forgotten.",
  },
  {
    icon: "church" as const,
    title: "It stays private",
    text: "Requests are read only by the pastoral prayer team. Nothing is published, shared or read out.",
  },
  {
    icon: "message-circle" as const,
    title: "No strings",
    text: "You will not be added to a mailing list or chased. If you want follow-up, tick the box; if not, we will simply pray.",
  },
];

export default function PrayerPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Request Prayer", path: "/prayer" },
        ])}
      />

      <PageHero
        eyebrow="Prayer"
        title={
          <>
            We would love to <em className="not-italic text-gold-300">pray with you</em>.
          </>
        }
        lede="You do not need to be a member, a Christian, or sure of what you think about God. If something is heavy, send it to us."
        image={images.prayerCircle}
        objectPosition="50% 30%"
        breadcrumb={[{ label: "Request Prayer" }]}
      />

      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Our Promise"
                title="Three things we commit to."
                lede="Prayer is not a formality here. It is the reason most of the good things in this church happened at all."
              />

              <ul className="mt-10 flex flex-col gap-7 border-t border-navy-900/[0.08] pt-9">
                {promises.map((promise) => (
                  <li key={promise.title} className="flex gap-4">
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                      <Icon name={promise.icon} className="size-[1.125rem]" />
                    </span>
                    <div>
                      <p className="text-[0.9375rem] font-semibold text-navy-900">
                        {promise.title}
                      </p>
                      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-navy-900/62">
                        {promise.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <Reveal delay={0.1}>
                <blockquote className="mt-10 rounded-media border border-navy-900/[0.08] bg-white p-7">
                  <p className="font-display text-[1.3125rem] italic leading-relaxed text-navy-900">
                    &ldquo;Do not be anxious about anything, but in every situation, by prayer and
                    petition, with thanksgiving, present your requests to God.&rdquo;
                  </p>
                  <footer className="mt-4 eyebrow text-gold-800">Philippians 4:6</footer>
                </blockquote>
              </Reveal>
            </div>

            <div className="rounded-media border border-navy-900/[0.08] bg-white p-7 sm:p-10">
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-tight text-navy-900">
                Send your request
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/65">
                Say as much or as little as you want. There is no right way to do this.
              </p>
              <div className="mt-8">
                <PrayerForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Pray With Us"
        title="Or come and pray in the room."
        lede="We gather midweek to pray for our families, our city and every request that reaches us. You are welcome to sit in and simply add your amen."
        actions={
          <>
            <Button asChild variant="gold" size="xl">
              <Link href="/events/midweek-prayer">Midweek Prayer</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link href="/ministries/prayer">Join the Prayer Team</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
