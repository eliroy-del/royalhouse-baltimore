import Link from "next/link";
import { CountUp } from "@/components/motion/CountUp";
import { ParallaxMedia } from "@/components/motion/ParallaxMedia";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { images } from "@/config/images";
import { communityImpact } from "@/content/our-heart";

/**
 * Baltimore identity, carried by photography and commitment rather than
 * skyline clip-art. Royalhouse is a global family; this church is a local one.
 */
export function BaltimoreSection() {
  return (
    <Section tone="white" spacing="none" id="baltimore" className="overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <ParallaxMedia
          src={images.baltimoreCity.src}
          alt={images.baltimoreCity.alt}
          className="min-h-[18rem] lg:min-h-full"
          sizes="(min-width: 1024px) 50vw, 100vw"
          strength={6}
        />

        <div className="flex items-center py-8 sm:py-10 lg:py-12">
          <Container width="full" className="max-w-[42rem] lg:pr-10">
            <Eyebrow chapter="08">Rooted in Baltimore</Eyebrow>

            <Reveal delay={0.06}>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.6vw,2.375rem)] font-light leading-[1.05] tracking-tight text-navy-900">
                This city is not our backdrop.{" "}
                <em className="not-italic text-gold-600">It is our assignment.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/70">
                Royalhouse Baltimore belongs to a global family of churches, and to one very
                particular set of streets. We are here for the long haul: in the rowhouses and the
                high-rises, the schools and the shift work, the block parties and the hard weeks.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/70">
                Our aim is simple: that Baltimore would be measurably better because this church is
                in it.
              </p>
            </Reveal>

            <Stagger className="mt-6 flex flex-col gap-5 border-t border-navy-900/[0.08] pt-5">
              {communityImpact.map((item) => (
                <StaggerItem key={item.title} className="flex gap-4">
                  <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                    <Icon name="hand-heart" className="size-4" />
                  </span>
                  <span>
                    <span className="block text-[0.9375rem] font-semibold text-navy-900">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-navy-900/65">
                      {item.description}
                    </span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>

            {/* Only claims we can stand behind: our commitment, not invented statistics. */}
            <Reveal delay={0.2}>
              <dl className="mt-6 grid grid-cols-3 gap-6 border-t border-navy-900/[0.08] pt-5">
                <div>
                  <dd className="stat-figure text-navy-900">
                    <CountUp to={52} suffix="" />
                  </dd>
                  <dt className="mt-2 text-[0.8125rem] leading-snug text-navy-900/65">
                    Sundays a year, doors open
                  </dt>
                </div>
                <div>
                  <dd className="stat-figure text-navy-900">
                    <CountUp to={100} suffix="%" />
                  </dd>
                  <dt className="mt-2 text-[0.8125rem] leading-snug text-navy-900/65">
                    Of kids volunteers background-checked
                  </dt>
                </div>
                <div>
                  <dd className="stat-figure text-navy-900">One</dd>
                  <dt className="mt-2 text-[0.8125rem] leading-snug text-navy-900/65">
                    City we are committed to for good
                  </dt>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="outline" size="lg">
                  <Link href="/our-heart#community">Our community work</Link>
                </Button>
                <Button asChild variant="link" size="none">
                  <Link href="/connect#serve">Serve with us</Link>
                </Button>
              </div>
            </Reveal>
          </Container>
        </div>
      </div>
    </Section>
  );
}
