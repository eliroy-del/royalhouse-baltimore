import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { images } from "@/config/images";

/**
 * Campaign art as the hero field, with the welcome headline and CTAs
 * overlaid on a bottom scrim for contrast.
 */
export function Hero() {
  return (
    // Aspect tracks the campaign banner; bottom padding clears the floating service card.
    <section className="relative isolate w-full overflow-hidden bg-navy-950 pb-10 sm:pb-12 lg:pb-14">
      <div className="relative aspect-[5/2] min-h-[18rem] w-full sm:min-h-[22rem] lg:min-h-[28rem]">
        <Image
          src={images.heroCampaign.src}
          alt={images.heroCampaign.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />

        <div aria-hidden="true" className="absolute inset-0 bg-navy-950/25" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy-950/75 to-transparent sm:h-28"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent sm:h-48 lg:h-56"
        />

        <Container className="absolute inset-x-0 bottom-0 pb-5 sm:pb-6 lg:pb-7">
          <h1
            className="rise max-w-5xl font-display text-[clamp(2.25rem,6.5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.02em] text-white"
            style={{ animationDelay: "80ms" }}
          >
            Welcome to{" "}
            <em className="not-italic text-gold-300">Royalhouse Chapel</em>
            {" - Baltimore"}
          </h1>

          <div
            className="rise mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center"
            style={{ animationDelay: "280ms" }}
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
        </Container>
      </div>
    </section>
  );
}
