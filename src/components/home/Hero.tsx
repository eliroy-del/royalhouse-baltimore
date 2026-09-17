import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { images } from "@/config/images";

export function Hero() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-navy-950 pb-10 sm:pb-12 lg:pb-14">
      <div className="relative flex min-h-[min(100svh,44rem)] w-full items-center sm:min-h-[min(100svh,48rem)] lg:min-h-[min(92svh,52rem)]">
        <Image
          src={images.heroCampaign.src}
          alt={images.heroCampaign.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={82}
          className="object-cover object-[58%_center]"
        />

        <div aria-hidden="true" className="absolute inset-0 bg-[#004AAD]/45" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-navy-950/80 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-navy-950/80 via-navy-950/45 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950/70 to-transparent"
        />

        <Container className="relative z-10 py-20 sm:py-24 lg:py-24">
          <div className="rise flex max-w-5xl flex-col items-start gap-3.5 text-left sm:gap-4">
            <p className="type-body-lg font-medium text-white/90">
              A Spirit-filled church for the Baltimore area.
            </p>
            <p className="max-w-2xl text-[1.0625rem] font-medium leading-relaxed text-gold-300 sm:text-[1.125rem]">
              Prayer. Praise. Worship. The Word. Fellowship.
            </p>
            <h1 className="font-display type-display text-white">
              Touching Our Generation
              <br />
              With the Power of God
            </h1>
            <p className="max-w-xl type-body-lg text-white/80">
              A growing church family where people from every background can encounter God, build
              meaningful relationships, and grow in faith.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-3">
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
                <Link href="/contact">Join Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
