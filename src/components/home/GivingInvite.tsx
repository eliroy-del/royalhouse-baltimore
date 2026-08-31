import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GridFillers } from "@/components/ui/GridFillers";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { churchConfig } from "@/config/church";
import { images, navyBlurDataURL } from "@/config/images";

export function GivingInvite() {
  const funds = churchConfig.giving.funds;

  return (
    <Section tone="cream" spacing="xl" id="give">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal y={28} className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-media bg-navy-900">
              <Image
                src={images.generosity.src}
                alt={images.generosity.alt}
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                placeholder="blur"
                blurDataURL={navyBlurDataURL}
                className="object-cover"
              />
            </div>
            <div className="relative -mt-12 ml-6 mr-12 rounded-card border border-navy-900/[0.08] bg-white p-6 shadow-float sm:ml-10 sm:mr-16">
              <p className="font-display text-[1.25rem] italic leading-snug text-navy-900">
                &ldquo;Each of you should give what you have decided in your heart to give&hellip;
                for God loves a cheerful giver.&rdquo;
              </p>
              <p className="mt-3 eyebrow text-gold-800">2 Corinthians 9:7</p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Eyebrow chapter="11">Be Part of the Mission</Eyebrow>

            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.5rem)] font-light leading-[1.03] tracking-tight text-navy-900">
                Give with purpose.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-navy-900/70">
                Generosity here is not about keeping the lights on. It pays for kids ministry
                volunteers to be trained, for groceries to reach a family three streets away, for a
                livestream that finds someone who could not leave the house, and for the gospel to
                keep traveling.
              </p>
            </Reveal>

            <Stagger className="mt-9 grid gap-px overflow-hidden rounded-card border border-navy-900/[0.08] bg-navy-900/[0.07] sm:grid-cols-2">
              {funds.map((fund) => (
                <StaggerItem key={fund.id} className="bg-white p-6">
                  <p className="flex items-center gap-2 text-[0.9375rem] font-semibold text-navy-900">
                    <Icon name="gift" className="size-4 text-gold-600" />
                    {fund.name}
                  </p>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-navy-900/65">
                    {fund.description}
                  </p>
                </StaggerItem>
              ))}
              <GridFillers count={funds.length} columns={{ sm: 2 }} />
            </Stagger>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button asChild variant="gold" size="lg">
                  <Link href="/give">
                    Give Online
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </Link>
                </Button>
                <Button asChild variant="link" size="none">
                  <Link href="/give#other-ways">Other ways to give</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
