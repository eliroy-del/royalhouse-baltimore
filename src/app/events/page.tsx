import Link from "next/link";
import { EventCard } from "@/components/cards/EventCard";
import { EventsBrowser } from "@/components/events/EventsBrowser";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/config/images";
import { getFeaturedEvent, getUpcomingEvents } from "@/lib/content";
import { breadcrumbSchema, eventSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import type { EventCategory } from "@/types";

export const metadata = pageMetadata({
  title: "Events",
  description:
    "What is happening at Royalhouse Baltimore: Sunday gatherings, midweek prayer, youth nights, conferences and community outreach across Baltimore.",
  path: "/events",
  image: images.eventConference.src,
});

export default async function EventsPage() {
  const upcoming = await getUpcomingEvents();
  const featured = await getFeaturedEvent();
  const rest = upcoming.filter((event) => event.id !== featured?.id);

  const categories = Array.from(
    new Set(upcoming.map((event) => event.category)),
  ) as EventCategory[];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
          ]),
          ...upcoming.slice(0, 10).map((event) => eventSchema(event)),
        ]}
      />

      <PageHero
        eyebrow="Events"
        title={
          <>
            There is always <em className="not-italic text-gold-300">something happening</em>.
          </>
        }
        lede="Worship nights, prayer, youth, outreach and conferences. Come to one thing and you will have met half the church by the end of it."
        image={images.eventConference}
        objectPosition="50% 40%"
        breadcrumb={[{ label: "Events" }]}
      />

      {featured ? (
        <Section tone="cream" spacing="md">
          <Container>
            <SectionHeading eyebrow="Next Up" title="Start here." />
            <Reveal className="mt-6" y={24}>
              <EventCard event={featured} variant="feature" />
            </Reveal>

            {rest.length > 0 ? (
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {rest.slice(0, 3).map((event) => (
                  <EventCard key={event.id} event={event} variant="compact" />
                ))}
              </div>
            ) : null}
          </Container>
        </Section>
      ) : null}

      <Section tone="white" spacing="md" id="calendar">
        <Container>
          <SectionHeading
            eyebrow="The Calendar"
            title="Everything coming up."
            lede="Filter by what you are looking for. Everything on this page is open to visitors unless it says otherwise."
          />

          <div className="mt-6">
            {upcoming.length > 0 ? (
              <EventsBrowser events={upcoming} categories={categories} />
            ) : (
              <EmptyState
                icon="calendar"
                title="The calendar is being set"
                description="Our next season of gatherings is being confirmed. Sunday worship continues as normal. Come and join us."
                action={
                  <Button asChild>
                    <Link href="/plan-a-visit">Plan your visit</Link>
                  </Button>
                }
              />
            )}
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Come Along"
        title="You do not need an invitation. This is one."
        lede="Bring a friend, bring your family, or come on your own and let us look after you."
        image={images.eventWorshipNight}
        actions={
          <>
            <Button asChild variant="gold" size="xl">
              <Link href="/plan-a-visit">Plan Your Visit</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link href="/contact">Ask About an Event</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
