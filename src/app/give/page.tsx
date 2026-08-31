import Image from "next/image";
import Link from "next/link";
import { GivingOptions } from "@/components/giving/GivingOptions";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand, PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GridFillers } from "@/components/ui/GridFillers";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { churchConfig } from "@/config/church";
import { images, navyBlurDataURL } from "@/config/images";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Give",
  description:
    "Give to Royalhouse Baltimore. Support tithes, offering, missions and community impact in Baltimore — securely, simply and with a clear picture of where it goes.",
  path: "/give",
  image: images.generosity.src,
});

const trust = [
  {
    icon: "church" as const,
    title: "Accountable",
    text: "Our finances are overseen by church leadership with annual review. Ask us anything and we will show you.",
  },
  {
    icon: "hand-heart" as const,
    title: "Local first",
    text: "A significant share stays in Baltimore — kids ministry, outreach, and families who need help this week.",
  },
  {
    icon: "globe" as const,
    title: "Kingdom wide",
    text: "The rest carries the gospel further, alongside the wider Royalhouse family and our mission partners.",
  },
];

export default function GivePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Give", path: "/give" },
        ])}
      />

      <PageHero
        eyebrow="Generosity"
        title={
          <>
            Give with <em className="not-italic text-gold-300">purpose</em>.
          </>
        }
        lede="Generosity is not the church asking for something. It is the church becoming something — for a family three streets away, for a child in our kids ministry, for a city we refuse to give up on."
        image={images.generosity}
        objectPosition="50% 55%"
        breadcrumb={[{ label: "Give" }]}
        actions={
          <Button asChild variant="gold" size="lg">
            <Link href="#ways">
              See ways to give
              <Icon name="arrow-right" className="size-4" />
            </Link>
          </Button>
        }
      />

      {/* ------------------------------ Why we give ------------------------------ */}
      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-10">
            <div>
              <SectionHeading
                eyebrow="Why We Give"
                title="Every gift becomes something you can point at."
              />
              <div className="mt-8 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-navy-900/72">
                <p>
                  Giving here is not about a building fund or a budget line. It is how a group of
                  ordinary people funds extraordinary things: volunteers trained to keep children
                  safe, groceries delivered without a lecture attached, a livestream that reaches
                  somebody who cannot leave the house, a mentor who keeps showing up.
                </p>
                <p>
                  If you are visiting for the first time, please do not give. Genuinely. Let it pass
                  you by and enjoy being a guest. Giving is for people who call this church home.
                </p>
              </div>

              <Stagger className="mt-10 flex flex-col gap-5 border-t border-navy-900/[0.08] pt-9">
                {trust.map((item) => (
                  <StaggerItem key={item.title} className="flex gap-4">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                      <Icon name={item.icon} className="size-4" />
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-semibold text-navy-900">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-[0.9375rem] leading-relaxed text-navy-900/62">
                        {item.text}
                      </span>
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            <Reveal y={26}>
              <div className="relative aspect-[4/5] overflow-hidden mask-arch bg-navy-900">
                <Image
                  src={images.ministryOutreach.src}
                  alt={images.ministryOutreach.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  placeholder="blur"
                  blurDataURL={navyBlurDataURL}
                  className="object-cover object-[55%_50%]"
                />
              </div>
              <blockquote className="relative -mt-16 ml-6 mr-10 rounded-card border border-navy-900/[0.08] bg-white p-6 shadow-float">
                <p className="font-display text-[1.25rem] italic leading-snug text-navy-900">
                  &ldquo;Each of you should give what you have decided in your heart to give, not
                  reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
                </p>
                <footer className="mt-3 eyebrow text-gold-800">2 Corinthians 9:7</footer>
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* -------------------------------- The funds ------------------------------ */}
      <Section tone="navy" spacing="lg" id="funds" className="overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.16),transparent_65%)]"
        />
        <Container className="relative">
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow="Where It Goes"
            title="Every fund, named and explained."
            lede="These are the only funds approved by our leadership. If you want your gift to go somewhere specific, choose it — and we will honor that."
          />

          <Stagger className="mt-8 grid gap-px overflow-hidden rounded-media bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {churchConfig.giving.funds.map((fund, index) => (
              <StaggerItem key={fund.id} className="flex flex-col bg-navy-900 p-7">
                <span className="font-display text-2xl text-gold-400/50 tabular-nums">
                  0{index + 1}
                </span>
                <h3 className="mt-4 font-display text-[1.5rem] leading-tight text-white">
                  {fund.name}
                </h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-white/65">
                  {fund.description}
                </p>
                {fund.url ? (
                  <Button asChild variant="outline-light" size="sm" className="mt-6 self-start">
                    <a href={fund.url} target="_blank" rel="noreferrer noopener">
                      Give to {fund.name}
                    </a>
                  </Button>
                ) : null}
              </StaggerItem>
            ))}
            <GridFillers
              count={churchConfig.giving.funds.length}
              columns={{ sm: 2, lg: 4 }}
              tone="dark"
            />
          </Stagger>
        </Container>
      </Section>

      {/* ------------------------------ Ways to give ----------------------------- */}
      <Section tone="white" spacing="lg" id="ways">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="How to Give"
                title="Choose whatever is simplest for you."
                lede="Every route reaches the same place. Nothing here requires an account, an app or a phone call you did not want to make."
              />
              <div
                id="other-ways"
                className="mt-9 scroll-mt-32 rounded-card border border-gold-500/25 bg-gold-100/40 p-6"
              >
                <p className="flex items-center gap-2.5 text-[0.9375rem] font-semibold text-navy-900">
                  <Icon name="church" className="size-4 text-gold-700" />
                  A note on security
                </p>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-navy-900/70">
                  When our online giving goes live it will run through a certified payment provider.
                  Royalhouse Baltimore will never store your card details, and we will never ask for
                  banking information by email, text or social media message.
                </p>
              </div>
            </div>

            <GivingOptions />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Thank You"
        title="Generosity is how this church loves Baltimore out loud."
        lede="Whether you give a little or a lot, you are part of every meal delivered, every child taught and every prayer answered here."
        actions={
          <>
            <Button asChild variant="gold" size="xl">
              <Link href="/contact">Ask a Giving Question</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link href="/our-heart#community">See Our Community Work</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
