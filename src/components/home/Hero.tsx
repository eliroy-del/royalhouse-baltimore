import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { churchConfig } from "@/config/church";
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

        <div aria-hidden="true" className="absolute inset-0 bg-cornflower/50" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cornflower/85 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-cornflower/85 via-cornflower/50 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cornflower/75 to-transparent"
        />

        <Container className="relative z-10 py-20 sm:py-24 lg:py-24">
          <div className="rise flex max-w-5xl flex-col items-start gap-3.5 text-left sm:gap-4">
            <p className="font-display text-[clamp(1.375rem,2.8vw,2rem)] font-semibold tracking-[0.02em] text-gold-300">
              {churchConfig.name}
            </p>
            <p className="text-[1.125rem] font-medium text-white/90 sm:text-[1.25rem]">
              A Spirit-filled church for the Baltimore area.
            </p>
            <p className="max-w-2xl text-[1.125rem] font-medium leading-relaxed text-gold-300 sm:text-[1.25rem]">
              Prayer. Praise. Worship. The Word. Fellowship.
            </p>
            <h1 className="font-display text-[clamp(1.65rem,4.6vw,3.75rem)] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-white">
              <span className="block whitespace-nowrap">Touching Our Generation</span>
              <span className="block whitespace-nowrap">With the Power of God</span>
            </h1>
            <p className="max-w-3xl text-[1.125rem] leading-relaxed text-white/80 sm:text-[1.25rem]">
              <span className="block sm:whitespace-nowrap">
                A growing church family where people from every background can encounter God,
              </span>
              <span className="block sm:whitespace-nowrap">
                build meaningful relationships, and grow in faith.
              </span>
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
                <Link href="/contact">Connect With Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
