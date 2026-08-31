import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { images, navyBlurDataURL } from "@/config/images";

const assurances = [
  "Read only by our pastoral prayer team",
  "Never published, never shared, never posted",
  "Prayed over within the week — every single one",
];

export function PrayerInvite() {
  return (
    <Section tone="navy" spacing="md" id="prayer" className="overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(80%_60%_at_100%_50%,rgba(201,162,39,0.12),transparent_70%)]"
      />

      <Container className="relative">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] lg:gap-8">
          <div>
            <Eyebrow chapter="10" tone="dark">
              We&rsquo;re Here For You
            </Eyebrow>

            <Reveal delay={0.06}>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-light leading-[1.03] tracking-tight text-white">
                We would love to <em className="not-italic text-gold-300">pray with you</em>.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-white/70 sm:text-base">
                You do not have to be a member, a believer, or anywhere near sure of what you think
                about God. If you are carrying something heavy, send it to us. We will pray — with
                complete confidence and no follow-up you have not asked for.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <ul className="mt-5 flex flex-col gap-2.5">
                {assurances.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-300">
                      <svg viewBox="0 0 16 16" aria-hidden="true" className="size-2.5">
                        <path
                          d="M3.5 8.5l3 3L12.5 5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-[0.875rem] leading-snug text-white/75">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild variant="gold" size="md">
                  <Link href="/prayer">
                    Request Prayer
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </Link>
                </Button>
                <Button asChild variant="outline-light" size="md">
                  <Link href="/ministries/prayer">Join the prayer team</Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal y={20} delay={0.08}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden mask-arch bg-navy-950 lg:max-w-sm">
              <Image
                src={images.prayerCircle.src}
                alt={images.prayerCircle.alt}
                fill
                sizes="(min-width: 1024px) 28vw, 70vw"
                placeholder="blur"
                blurDataURL={navyBlurDataURL}
                className="object-cover"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-navy-950/20" />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/70 to-transparent"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
