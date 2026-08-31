import Link from "next/link";
import { TestimonyCard } from "@/components/cards/TestimonyCard";
import { TestimonyForm } from "@/components/forms/TestimonyForm";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand, PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/config/images";
import { getTestimonies } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Testimonies",
  description:
    "Look what God has done. Real stories of salvation, healing, provision, freedom and community from the Royalhouse Baltimore church family.",
  path: "/testimonies",
  image: images.baptism.src,
});

export default async function TestimoniesPage() {
  const testimonies = await getTestimonies();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Testimonies", path: "/testimonies" },
        ])}
      />

      <PageHero
        eyebrow="Testimonies"
        title={
          <>
            Look what <em className="not-italic text-gold-300">God has done</em>.
          </>
        }
        lede="Not highlight reels. Ordinary people from this church telling the truth about what changed — and what is still changing."
        image={images.baptism}
        objectPosition="50% 40%"
        breadcrumb={[{ label: "Testimonies" }]}
        actions={
          <Button asChild variant="gold" size="lg">
            <Link href="#share">
              Share Your Testimony
              <Icon name="arrow-right" className="size-4" />
            </Link>
          </Button>
        }
      />

      <Section tone="cream" spacing="lg">
        <Container>
          <SectionHeading
            eyebrow="Stories From Our Family"
            title="Every one of these started with a single Sunday."
            lede="Shared with permission. Some names are withheld at the request of the person telling the story."
          />

          {testimonies.length > 0 ? (
            <Stagger className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {testimonies.map((testimony) => (
                <StaggerItem key={testimony.id} className="h-full">
                  <TestimonyCard testimony={testimony} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <EmptyState
              className="mt-14"
              icon="sparkles"
              title="The first story could be yours"
              description="We are gathering testimonies from our church family right now. Every one is read by a person and shared only with permission."
              action={
                <Button asChild>
                  <Link href="#share">Share your story</Link>
                </Button>
              }
            />
          )}
        </Container>
      </Section>

      {/* --------------------------------- Share --------------------------------- */}
      <Section tone="white" spacing="lg" id="share">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                eyebrow="Share Your Testimony"
                title="God did something. Tell us about it."
                lede="Your story might be exactly what convinces somebody else that God will do it for them too. You do not have to be a writer — plain words are perfect."
              />

              <div className="mt-10 rounded-media border border-gold-500/25 bg-gold-100/40 p-7">
                <p className="flex items-center gap-2.5 text-[0.9375rem] font-semibold text-navy-900">
                  <Icon name="church" className="size-4 text-gold-700" />
                  How we handle your story
                </p>
                <ul className="mt-4 flex flex-col gap-3 text-[0.875rem] leading-relaxed text-navy-900/72">
                  {[
                    "Nothing is ever published automatically — a person reads it first.",
                    "We only publish with your explicit permission, and we will contact you before we do.",
                    "You can ask to stay anonymous, and we will honor it.",
                    "We edit only for length and clarity, never for meaning.",
                    "You can ask us to remove your story at any time.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-gold-500/25 text-gold-700">
                        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-2.5">
                          <path
                            d="M3.5 8.5l3 3L12.5 5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-media border border-navy-900/[0.08] bg-cream p-7 sm:p-10">
              <TestimonyForm />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Your Turn"
        title="Come and find out what God will do here."
        lede="Every story on this page began with somebody deciding to walk through the door once."
        image={images.heroWorship}
        actions={
          <>
            <Button asChild variant="gold" size="xl">
              <Link href="/plan-a-visit">Plan Your Visit</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link href="/prayer">Request Prayer</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
