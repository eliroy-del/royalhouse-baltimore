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
  "Exploring faith and full of questions",
  "Coming back after a long time away",
  "Following Jesus for decades already",
];

/** First full section after the hero: a clear welcome for whoever walks in. */
export function WelcomeSection() {
  return (
    <Section tone="cream" spacing="sm" id="welcome">
      <Container>
        <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-6">
          <Reveal y={16} className="relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[14rem] overflow-hidden mask-arch bg-navy-900 sm:max-w-[16rem] lg:max-w-[18rem]">
              <Image
                src={images.welcomeLobby.src}
                alt={images.welcomeLobby.alt}
                fill
                sizes="(min-width: 1024px) 18rem, 16rem"
                placeholder="blur"
                blurDataURL={navyBlurDataURL}
                className="object-cover object-[55%_50%]"
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -left-2 -top-2 -z-10 hidden size-20 rounded-full bg-gold-100 lg:block"
            />
          </Reveal>

          <div>
            <Eyebrow>Welcome</Eyebrow>

            <Reveal delay={0.06}>
              <h2 className="mt-2 font-display text-[clamp(1.375rem,2.8vw,1.875rem)] font-light leading-[1.05] tracking-tight text-navy-900">
                You belong here{" "}
                <em className="not-italic text-gold-600">before</em> you have anything figured out.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-2 max-w-lg text-[0.8125rem] leading-relaxed text-navy-900/70 sm:text-[0.875rem]">
                Church can feel like a room where everybody already knows the words. Not here. We are
                a mix of generations, backgrounds and accents, Baltimore natives and people who
                landed last month, and we would rather have you honest than impressive.
              </p>
            </Reveal>

            <Stagger className="mt-3.5 grid gap-x-5 gap-y-1.5 sm:grid-cols-2">
              {welcomes.map((item) => (
                <StaggerItem key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-700">
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-2">
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
                  <span className="text-[0.75rem] leading-snug text-navy-900/75 sm:text-[0.8125rem]">
                    {item}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.14}>
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <Button asChild size="md">
                  <Link href="/connect#new">
                    I&rsquo;m New Here
                    <Icon
                      name="arrow-right"
                      className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
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
