import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { churchStatus, serviceTimeSummary } from "@/lib/church";
import { images, navyBlurDataURL } from "@/config/images";

/** The last word: warm, specific, and impossible to misread. */
export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden bg-navy-950 py-28 text-white sm:py-32 lg:py-40"
    >
      <Image
        src={images.churchExteriorDusk.src}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={navyBlurDataURL}
        className="-z-10 object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-950/72" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/50 to-navy-950/70"
      />

      <Container className="relative text-center">
        <Reveal>
          <p className="flex items-center justify-center gap-3 eyebrow text-gold-300">
            <span aria-hidden="true" className="h-px w-8 bg-gold-500/70" />
            Come See Us
            <span aria-hidden="true" className="h-px w-8 bg-gold-500/70" />
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="final-cta-heading"
            className="mx-auto mt-7 max-w-4xl font-display text-[clamp(2.5rem,6.4vw,5rem)] font-light leading-[1.02] tracking-[-0.02em]"
          >
            We&rsquo;ll see you Sunday.
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75 sm:text-lg">
            Tell us you are coming and we will look out for you at the door, save you a seat and
            make sure your children are settled before the first song.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="gold" size="xl">
              <Link href="/plan-a-visit">
                Plan Your Visit
                <Icon
                  name="arrow-right"
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link href="/contact">Ask Us Anything</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.8125rem] text-white/55">
            <span className="flex items-center gap-2">
              <Icon name="clock" className="size-4 text-gold-400" />
              {churchStatus.hasServiceTimes ? serviceTimeSummary() : "Sunday Gatherings"}
            </span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/20 sm:block" />
            <span className="flex items-center gap-2">
              <Icon name="map-pin" className="size-4 text-gold-400" />
              Baltimore, Maryland
            </span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
