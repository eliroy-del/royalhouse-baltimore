import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { images } from "@/config/images";

/**
 * Campaign hero: the artwork carries the message, so we keep site copy
 * off the image and only overlay CTAs on a soft bottom scrim.
 */
export function Hero() {
  return (
    // Aspect tracks the campaign banner; bottom padding clears the floating service card.
    <section className="relative isolate w-full overflow-hidden bg-navy-950 pb-10 sm:pb-12 lg:pb-14">
      <div className="relative aspect-[5/2] min-h-[16rem] w-full sm:min-h-[20rem] lg:min-h-[26rem]">
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

        {/* Soft overlays: readable CTAs without washing out campaign type */}
        <div aria-hidden="true" className="absolute inset-0 bg-navy-950/15" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-navy-950/70 to-transparent sm:h-28"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy-950/85 via-navy-950/40 to-transparent sm:h-32"
        />

        <h1 className="sr-only">
          We Are Not Consumed. Lamentations 3:22. Royalhouse Chapel International — Baltimore.
        </h1>

        <Container className="absolute inset-x-0 bottom-0 pb-5 sm:pb-6 lg:pb-7">
          <div
            className="rise flex flex-col gap-2.5 sm:flex-row sm:items-center"
            style={{ animationDelay: "200ms" }}
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
