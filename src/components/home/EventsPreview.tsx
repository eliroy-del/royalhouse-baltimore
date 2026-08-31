import Link from "next/link";
import { EventCard } from "@/components/cards/EventCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedEvent, getUpcomingEvents } from "@/lib/content";

export async function EventsPreview() {
  const featured = await getFeaturedEvent();
  const upcoming = (await getUpcomingEvents(5)).filter((event) => event.id !== featured?.id);

  return (
    <Section tone="white" spacing="md" id="events">
      <Container>
        <SectionHeading
          chapter="05"
          eyebrow="What's Happening"
          title="There is always something worth turning up for."
          lede="Worship nights, serve days, brunches, youth Fridays and the occasional conference. Come to one and you will meet more of this church than any Sunday can show you."
          actions={
            <>
              <Button asChild size="lg">
                <Link href="/events">
                  See All Events
                  <Icon
                    name="arrow-right"
                    className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/events#calendar">Church Calendar</Link>
              </Button>
            </>
          }
        />

        {featured ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-5">
            <EventCard event={featured} variant="feature" />

            <div className="flex flex-col gap-3">
              <p className="eyebrow px-1 text-navy-900/65">Also coming up</p>
              {upcoming.length > 0 ? (
                <Stagger className="flex flex-col gap-3">
                  {upcoming.slice(0, 4).map((event) => (
                    <StaggerItem key={event.id}>
                      <EventCard event={event} variant="compact" />
                    </StaggerItem>
                  ))}
                </Stagger>
              ) : (
                <EmptyState
                  icon="calendar"
                  title="More dates on the way"
                  description="We are finalising the next season of the calendar. Check back soon, or subscribe and we will tell you first."
                  className="flex-1"
                />
              )}
              <Link
                href="/events"
                className="mt-2 inline-flex items-center gap-2 px-1 text-[0.875rem] font-semibold text-navy-900 underline decoration-gold-500/50 decoration-1 underline-offset-[6px] transition-colors hover:decoration-gold-500"
              >
                View the full calendar
                <Icon name="arrow-right" className="size-3.5 text-gold-600" />
              </Link>
            </div>
          </div>
        ) : (
          <EmptyState
            className="mt-8"
            icon="calendar"
            title="We're preparing something special"
            description="Our next season of events is being planned right now. Check back shortly, or come and see us this Sunday in the meantime."
            action={
              <Button asChild>
                <Link href="/plan-a-visit">Plan Your Visit</Link>
              </Button>
            }
          />
        )}
      </Container>
    </Section>
  );
}
