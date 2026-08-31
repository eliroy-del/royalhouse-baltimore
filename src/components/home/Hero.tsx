import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { images } from "@/config/images";

/**
 * The first six seconds. Deliberately server-rendered with CSS-only motion:
 * no JavaScript is required for the hero to paint, animate or be read.
 */
export function Hero() {
  return (
    // Bottom padding always exceeds the floating service card's negative
    // margin, so the hero's service line is never clipped by it.
    <section className="relative isolate flex min-h-[72svh] w-full flex-col justify-end overflow-hidden bg-navy-950 pb-16 pt-20 sm:min-h-[78svh] sm:pb-20 sm:pt-24 lg:min-h-[85svh] lg:pb-24 lg:pt-24">
      {/* Cinematic photography with a slow, single settle, never a loop */}
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
          <h1
            className="rise font-display text-[clamp(1.875rem,4.5vw,2.75rem)] font-light leading-[0.98] tracking-[-0.02em] text-white"
            style={{ animationDelay: "80ms" }}
          >
            A place to encounter God,
            <br className="hidden sm:block" /> grow in faith and{" "}
            <em className="not-italic text-gold-300">find your family</em>.
          </h1>

          <p
            className="rise mt-3 max-w-xl text-[0.875rem] leading-relaxed text-white/80 sm:text-[0.9375rem]"
            style={{ animationDelay: "300ms" }}
          >
            Experience the presence of God and the power of His Word with Royalhouse Chapel
            International - Baltimore
          </p>

          <div
            className="rise mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center"
            style={{ animationDelay: "420ms" }}
          >
            <Button asChild variant="gold" size="lg">
              <Link href="/plan-a-visit">
                Plan Your Visit
                <Icon
                  name="arrow-right"
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link href="/give">Give</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
