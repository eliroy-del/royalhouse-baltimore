import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GridFillers } from "@/components/ui/GridFillers";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars } from "@/content/our-heart";

export function OurHeartSection() {
  return (
    <Section tone="navy" spacing="lg" id="our-heart" className="overflow-hidden">
      {/* Warm light from the upper right keeps the navy field from going flat */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(201,162,39,0.16),transparent_65%)]"
      />

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
          <SectionHeading
            chapter="04"
            eyebrow="Our Heart"
            tone="dark"
            title={
              <>
                We exist to know God, love people and{" "}
                <em className="not-italic text-gold-300">transform lives</em>.
              </>
            }
            lede="These convictions shape everything we do here — how we gather on Sunday, how we spend money, and how we treat the person who has never walked through our doors."
            actions={
              <Button asChild variant="light" size="lg">
                <Link href="/our-heart">
                  Read our heart
                  <Icon
                    name="arrow-right"
                    className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
              </Button>
            }
          />

          <Stagger className="grid gap-px overflow-hidden rounded-media bg-white/10 sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <StaggerItem
                key={pillar.id}
                className="group relative bg-navy-900 p-7 transition-colors duration-500 hover:bg-navy-800/60 sm:p-8"
              >
                <span className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 transition-colors duration-500 group-hover:border-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950">
                    <Icon name={pillar.icon} className="size-5" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl text-white/40 tabular-nums"
                  >
                    0{index + 1}
                  </span>
                </span>

                <h3 className="mt-6 font-display text-[1.625rem] leading-tight text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/65">
                  {pillar.description}
                </p>
              </StaggerItem>
            ))}
            <GridFillers count={pillars.length} columns={{ sm: 2 }} tone="dark" />
          </Stagger>
        </div>

        <Reveal delay={0.1}>
          <blockquote className="mt-8 border-t border-white/10 pt-8 text-center">
            <p className="mx-auto max-w-3xl font-display text-[clamp(1.5rem,2.8vw,2.125rem)] font-light italic leading-[1.35] text-white/85">
              &ldquo;They devoted themselves to the apostles&rsquo; teaching and to fellowship, to
              the breaking of bread and to prayer.&rdquo;
            </p>
            <footer className="mt-5 eyebrow text-gold-300">Acts 2:42</footer>
          </blockquote>
        </Reveal>
      </Container>
    </Section>
  );
}
