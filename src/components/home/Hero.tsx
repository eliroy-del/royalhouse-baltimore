import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { churchConfig } from "@/config/church";
import { images } from "@/config/images";
import { churchStatus, serviceTimeSummary } from "@/lib/church";

/**
 * The first six seconds. Deliberately server-rendered with CSS-only motion:
 * no JavaScript is required for the hero to paint, animate or be read.
 */
export function Hero() {
  return (
    // Bottom padding always exceeds the floating service card's negative
    // margin, so the hero's service line is never clipped by it.
    <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-navy-950 pb-28 pt-32 sm:pb-32 sm:pt-36 lg:min-h-[96svh] lg:pb-36 lg:pt-44">
      {/* Cinematic photography with a slow, single settle — never a loop */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={images.heroWorship.src}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={82}
          className="animate-slow-zoom object-cover object-[50%_38%]"
        />
        {/* Layered navy scrim: keeps AA contrast on every screen size */}
        <div className="absolute inset-0 bg-navy-950/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/72 to-navy-950/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/30 to-transparent" />
      </div>

      {/* Three slow motes of light. Restrained on purpose. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="absolute left-[18%] top-[28%] size-2 rounded-full bg-gold-300/50 blur-[2px] animate-drift" />
        <span
          className="absolute left-[62%] top-[42%] size-1.5 rounded-full bg-gold-200/40 blur-[2px] animate-drift"
          style={{ animationDelay: "3s", animationDuration: "18s" }}
        />
        <span
          className="absolute left-[81%] top-[22%] size-1 rounded-full bg-white/40 blur-[1px] animate-drift"
          style={{ animationDelay: "6s", animationDuration: "22s" }}
        />
      </div>

      <Container className="relative">
        <div className="max-w-[68rem]">
          <p
            className="rise flex items-center gap-3 eyebrow text-gold-300"
            style={{ animationDelay: "80ms" }}
          >
            <span aria-hidden="true" className="h-px w-10 rule-gold" />
            Welcome to {churchConfig.name}
          </p>

          <h1
            className="rise mt-7 font-display text-[clamp(2.75rem,6.6vw,5.25rem)] font-light leading-[0.98] tracking-[-0.02em] text-white"
            style={{ animationDelay: "180ms" }}
          >
            A place to encounter God,
            <br className="hidden sm:block" /> grow in faith and{" "}
            <em className="not-italic text-gold-300">find your family</em>.
          </h1>

          <p
            className="rise mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-white/80 sm:text-lg"
            style={{ animationDelay: "300ms" }}
          >
            We are an ordinary group of people in Baltimore who have met an extraordinary God.
            Whether you have followed Jesus for forty years or you are simply curious, there is a
            seat here with your name on it.
          </p>

          <div
            className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "420ms" }}
          >
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
              <Link href="/watch-live">
                <Icon name="play" className="size-4" />
                Watch Live
              </Link>
            </Button>
          </div>

          <p
            className="rise mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-white/60"
            style={{ animationDelay: "540ms" }}
          >
            <span className="flex items-center gap-2">
              <Icon name="clock" className="size-4 text-gold-400" />
              {churchStatus.hasServiceTimes ? serviceTimeSummary() : "Sunday Gatherings"}
            </span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/20 sm:block" />
            <span className="flex items-center gap-2">
              <Icon name="map-pin" className="size-4 text-gold-400" />
              {churchConfig.city}, {churchConfig.region}
            </span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/20 sm:block" />
            {/* The service card immediately below repeats this on small screens. */}
            <span className="hidden items-center gap-2 sm:flex">
              <Icon name="baby" className="size-4 text-gold-400" />
              Kids ministry every service
            </span>
          </p>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="eyebrow text-white/60">Scroll</span>
        <span className="scroll-cue block h-8 w-px bg-gradient-to-b from-gold-400/70 to-transparent" />
      </div>
    </section>
  );
}
