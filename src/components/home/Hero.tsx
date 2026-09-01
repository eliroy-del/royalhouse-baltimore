import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { images } from "@/config/images";

/**
 * Homepage hero: glowing cross on the right, welcome headline and primary
 * CTA on the left. The Sunday invite bar floats across the bottom edge.
 */
export function Hero() {
  return (
    // Extra bottom padding so the floating Sunday bar can overlap cleanly.
    <section className="relative isolate w-full overflow-hidden bg-navy-950 pb-14 sm:pb-16 lg:pb-20">
      <div className="relative flex min-h-[70svh] w-full items-center sm:min-h-[74svh] lg:min-h-[78svh]">
        <Image
          src={images.heroCampaign.src}
          alt={images.heroCampaign.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={90}
          className="object-cover object-[72%_center]"
        />

        <div aria-hidden="true" className="absolute inset-0 bg-navy-950/35" />
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

        <Container className="relative z-10 py-24 sm:py-28 lg:py-32">
          <div className="rise flex max-w-3xl flex-col items-start gap-5 text-left">
            <p className="eyebrow text-gold-300">Come as you are</p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.02em] text-white">
              <span className="block">Welcome to</span>
              <span className="block">
                <span className="text-gold-300">Royalhouse Chapel</span>
                {" - Baltimore"}
              </span>
            </h1>
            <p className="max-w-xl text-[0.9375rem] leading-relaxed text-white/80 sm:text-base">
              Experience the presence of God and the power of His Word with Royalhouse Chapel
              International - Baltimore.
            </p>
            <Button asChild variant="gold" size="lg">
              <Link href="/plan-a-visit">
                I&rsquo;m New Here
                <Icon
                  name="arrow-right"
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
