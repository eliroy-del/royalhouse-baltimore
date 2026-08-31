import Link from "next/link";
import { TestimonyCard } from "@/components/cards/TestimonyCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedTestimonies } from "@/lib/content";

export async function TestimoniesPreview() {
  const testimonies = await getFeaturedTestimonies(3);

  return (
    <Section tone="mist" spacing="lg" id="testimonies">
      <Container>
        <SectionHeading
          align="center"
          chapter="09"
          eyebrow="See What God Is Doing"
          title="Look what God has done."
          lede="Not polished highlight reels — actual people from this church, telling the truth about what changed."
          className="mx-auto"
        />

        {testimonies.length > 0 ? (
          <>
            {/* Snap-scrolls on mobile, settles into a grid from md up — no carousel JS needed */}
            <Stagger className="mt-8 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 hide-scrollbar md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
              {testimonies.map((testimony) => (
                <StaggerItem
                  key={testimony.id}
                  className="w-[85vw] shrink-0 snap-center sm:w-[24rem] md:w-auto"
                >
                  <TestimonyCard testimony={testimony} className="h-full" />
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/testimonies#share">
                  Share Your Testimony
                  <Icon
                    name="arrow-right"
                    className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/testimonies">Read More Stories</Link>
              </Button>
            </div>
          </>
        ) : (
          <EmptyState
            className="mt-8"
            icon="sparkles"
            title="The first story could be yours"
            description="We are collecting testimonies from our church family right now. If God has done something in your life, we would love to hear it."
            action={
              <Button asChild>
                <Link href="/testimonies#share">Share your story</Link>
              </Button>
            }
          />
        )}
      </Container>
    </Section>
  );
}
