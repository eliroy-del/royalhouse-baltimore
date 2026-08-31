import Link from "next/link";
import { notFound } from "next/navigation";
import { EventCard } from "@/components/cards/EventCard";
import { FactList } from "@/components/sections/FactList";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { CtaBand, PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { ShareButton } from "@/components/ui/ShareButton";
import { churchStatus, directionsUrl } from "@/lib/church";
import { getEventBySlug, getEvents, getRelatedEvents } from "@/lib/content";
import { formatDate, formatDayOfWeek, googleCalendarUrl, isUpcoming } from "@/lib/dates";
import { breadcrumbSchema, eventSchema } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) {
    return pageMetadata({
      title: "Event not found",
      description: "",
      path: "/events",
      noIndex: true,
    });
  }

  return pageMetadata({
    title: event.title,
    description: event.summary,
    path: `/events/${event.slug}`,
    image: event.image,
    type: "article",
  });
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const related = await getRelatedEvents(event, 3);
  const past = !isUpcoming(event.endDate ?? event.date);
  const directions = directionsUrl();

  const details = [
    {
      icon: "calendar" as const,
      label: "Date",
      value: `${formatDayOfWeek(event.date)}, ${formatDate(event.date)}${
        event.endDate ? ` – ${formatDate(event.endDate)}` : ""
      }`,
    },
    {
      icon: "clock" as const,
      label: "Time",
      value: event.endTime ? `${event.startTime} – ${event.endTime}` : event.startTime,
    },
    { icon: "map-pin" as const, label: "Location", value: event.location },
    ...(event.speaker ? [{ icon: "mic" as const, label: "Speaker", value: event.speaker }] : []),
    ...(event.recurring
      ? [{ icon: "compass" as const, label: "Repeats", value: event.recurring }]
      : []),
  ];

  return (
    <>
      <JsonLd
        data={[
          eventSchema(event),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
            { name: event.title, path: `/events/${event.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={event.category}
        title={event.title}
        lede={event.summary}
        image={{ src: event.image, alt: event.imageAlt }}
        size="lg"
        breadcrumb={[{ label: "Events", href: "/events" }, { label: event.title }]}
        actions={
          <>
            {event.registrationUrl ? (
              <Button asChild variant="gold" size="lg">
                <a href={event.registrationUrl} target="_blank" rel="noreferrer noopener">
                  Register
                  <Icon name="arrow-right" className="size-4" />
                </a>
              </Button>
            ) : (
              <Button asChild variant="gold" size="lg">
                <Link href="/plan-a-visit">Plan Your Visit</Link>
              </Button>
            )}
            <Button asChild variant="outline-light" size="lg">
              <a
                href={googleCalendarUrl({
                  title: event.title,
                  details: event.summary,
                  location: event.location,
                  date: event.date,
                  endDate: event.endDate,
                })}
                target="_blank"
                rel="noreferrer noopener"
              >
                Add to Calendar
              </a>
            </Button>
          </>
        }
      />

      <Section tone="cream" spacing="lg">
        <Container>
          {past ? (
            <div
              role="status"
              className="mb-12 flex flex-wrap items-center justify-between gap-4 rounded-media border border-navy-900/[0.08] bg-white p-6"
            >
              <p className="text-[0.9375rem] text-navy-900/70">
                <span className="font-semibold text-navy-900">This event has passed.</span> Have a
                look at what is coming up next.
              </p>
              <Button asChild variant="outline" size="md">
                <Link href="/events">See upcoming events</Link>
              </Button>
            </div>
          ) : null}

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="gold" size="md">
                  {event.category}
                </Badge>
                {event.featured ? (
                  <Badge variant="outline" size="md">
                    Featured
                  </Badge>
                ) : null}
              </div>

              <h2 className="mt-6 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight text-navy-900">
                About this gathering
              </h2>
              <div className="mt-6 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-navy-900/75">
                {event.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3 border-t border-navy-900/[0.08] pt-8">
                {event.registrationUrl ? (
                  <Button asChild size="lg">
                    <a href={event.registrationUrl} target="_blank" rel="noreferrer noopener">
                      Register for this event
                    </a>
                  </Button>
                ) : null}
                <ShareButton
                  title={event.title}
                  text={event.summary}
                  url={absoluteUrl(`/events/${event.slug}`)}
                  label="Share this event"
                  size="lg"
                />
                <Button asChild variant="ghost" size="lg">
                  <Link href="/contact">Ask a question</Link>
                </Button>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-media border border-navy-900/[0.08] bg-white p-7">
                <h2 className="eyebrow text-navy-900/65">Event details</h2>
                <FactList className="mt-5" facts={details} />

                <div className="mt-7 flex flex-col gap-2.5">
                  <Button asChild variant="outline" size="md">
                    <a
                      href={googleCalendarUrl({
                        title: event.title,
                        details: event.summary,
                        location: event.location,
                        date: event.date,
                        endDate: event.endDate,
                      })}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Add to calendar
                    </a>
                  </Button>
                  {churchStatus.hasAddress && directions ? (
                    <Button asChild variant="ghost" size="md">
                      <a href={directions} target="_blank" rel="noreferrer noopener">
                        Get directions
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>

              <MapEmbed className="mt-6" />
            </aside>
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="white" spacing="lg">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-navy-900">
                Also coming up
              </h2>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-navy-900 underline decoration-gold-500/50 underline-offset-[6px] hover:decoration-gold-500"
              >
                Full calendar
                <Icon name="arrow-right" className="size-3.5 text-gold-600" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <EventCard key={item.id} event={item} className="h-full" />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        eyebrow="First Time?"
        title="Events are a lovely way to start."
        lede="No pressure, no spotlight — just come, have a look around, and let us make you welcome."
        actions={
          <>
            <Button asChild variant="gold" size="xl">
              <Link href="/plan-a-visit">Plan Your Visit</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link href="/connect">Get Connected</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
