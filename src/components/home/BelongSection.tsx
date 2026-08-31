import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { images, navyBlurDataURL } from "@/config/images";

const welcomes = [
  "Walking in for the very first time",
  "Bringing young children with you",
  "New to Baltimore and looking for people",
  "Exploring Christianity and full of questions",
  "Coming back after a long time away",
  "Following Jesus for decades already",
];

export function BelongSection() {
  return (
    <Section tone="cream" spacing="lg" id="belong">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-10">
          {/* The arch is our one architectural motif — a quiet nod to sanctuary windows */}
          <Reveal y={28} className="relative">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden mask-arch bg-navy-900 lg:max-w-none">
              <Image
                src={images.welcomeLobby.src}
                alt={images.welcomeLobby.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                placeholder="blur"
                blurDataURL={navyBlurDataURL}
                className="object-cover object-[55%_50%]"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -left-4 -top-4 -z-10 hidden h-40 w-40 rounded-full bg-gold-100 lg:block"
            />
          </Reveal>

          <div>
            <Eyebrow chapter="03">You Belong Here</Eyebrow>

            <Reveal delay={0.06}>
              <h2 className="mt-5 font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-light leading-[1.02] tracking-tight text-navy-900">
                You belong here — <em className="not-italic text-gold-600">before</em> you have
                anything figured out.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-navy-900/70">
                Church can feel like a room where everybody already knows the words. Not here. We
                are a mix of generations, backgrounds and accents — Baltimore natives and people who
                landed last month — and we would genuinely rather have you honest than impressive.
              </p>
            </Reveal>

            <Stagger className="mt-9 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {welcomes.map((item) => (
                <StaggerItem key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-700">
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3">
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
                  <span className="text-[0.9375rem] leading-snug text-navy-900/75">{item}</span>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/connect#new">
                    I&rsquo;m New Here
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </Link>
                </Button>
                <Button asChild variant="link" size="none">
                  <Link href="/plan-a-visit#expect">See what a Sunday is like</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
