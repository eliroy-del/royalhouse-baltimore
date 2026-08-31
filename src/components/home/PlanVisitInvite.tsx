import Link from "next/link";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { expectSteps } from "@/content/visit";

export function PlanVisitInvite() {
  return (
    <Section tone="white" spacing="lg" id="plan-a-visit">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          <div>
            <Eyebrow chapter="12">Come See Us</Eyebrow>

            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.5rem)] font-light leading-[1.03] tracking-tight text-navy-900">
                Planning your first visit?{" "}
                <em className="not-italic text-gold-600">We&rsquo;ve got you.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-navy-900/70">
                Here is exactly what happens from the moment you arrive — so the only thing you have
                to decide is whether to come.
              </p>
            </Reveal>

            <Stagger className="mt-10 flex flex-col">
              {expectSteps.map((step, index) => (
                <StaggerItem
                  key={step.step}
                  className="group relative flex gap-5 border-t border-navy-900/[0.08] py-6 first:border-t-0 first:pt-0"
                >
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy-900/[0.05] text-navy-800 transition-colors duration-500 group-hover:bg-gold-100 group-hover:text-gold-700">
                    <Icon name={step.icon} className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="flex items-baseline gap-3">
                      <span className="font-display text-sm text-navy-900/65 tabular-nums">
                        {step.step}
                      </span>
                      <span className="text-[1.0625rem] font-semibold text-navy-900">
                        {step.title}
                      </span>
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-900/65">
                      {step.description}
                    </p>
                  </div>
                  {index === 0 ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-[1.375rem] top-11 -z-10 hidden h-[calc(100%-1rem)] w-px bg-navy-900/[0.08] sm:block"
                    />
                  ) : null}
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/plan-a-visit">
                    Plan Your Visit
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/plan-a-visit#faq">Read the FAQs</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal y={26} delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <MapEmbed />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/plan-a-visit#children"
                className="group flex items-center gap-3 rounded-card border border-navy-900/[0.08] bg-cream p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold-500/40 hover:shadow-elevate"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-white text-gold-700">
                  <Icon name="baby" className="size-[1.125rem]" />
                </span>
                <span>
                  <span className="block text-[0.875rem] font-semibold text-navy-900">
                    Bringing children?
                  </span>
                  <span className="block text-[0.8125rem] text-navy-900/65">
                    Here is how check-in works
                  </span>
                </span>
              </Link>
              <Link
                href="/plan-a-visit#accessibility"
                className="group flex items-center gap-3 rounded-card border border-navy-900/[0.08] bg-cream p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-gold-500/40 hover:shadow-elevate"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-white text-gold-700">
                  <Icon name="accessibility" className="size-[1.125rem]" />
                </span>
                <span>
                  <span className="block text-[0.875rem] font-semibold text-navy-900">
                    Need accessible seating?
                  </span>
                  <span className="block text-[0.8125rem] text-navy-900/65">
                    Tell us and it is arranged
                  </span>
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
