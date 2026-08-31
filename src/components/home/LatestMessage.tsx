import Image from "next/image";
import Link from "next/link";
import { SermonCard } from "@/components/cards/SermonCard";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { navyBlurDataURL } from "@/config/images";
import { formatDate, formatDuration } from "@/lib/dates";
import { getCurrentSeries, getFeaturedSermon, getLatestSermons } from "@/lib/content";

export async function LatestMessage() {
  const featured = await getFeaturedSermon();
  const series = await getCurrentSeries();
  const recent = (await getLatestSermons(4)).filter((sermon) => sermon.id !== featured?.id);

  return (
    <Section tone="navy-deep" spacing="lg" id="latest-message" className="overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(20,69,127,0.5),transparent_65%)]"
      />

      <Container className="relative">
        {featured ? (
          <>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
              <div>
                <Eyebrow chapter="06" tone="dark">
                  Be Encouraged
                </Eyebrow>

                <Reveal delay={0.06}>
                  <Link
                    href={`/sermons/${featured.slug}`}
                    className="group mt-6 block overflow-hidden rounded-media border border-white/10"
                  >
                    <span className="relative block aspect-video bg-navy-900">
                      <Image
                        src={featured.thumbnail}
                        alt={featured.thumbnailAlt}
                        fill
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        placeholder="blur"
                        blurDataURL={navyBlurDataURL}
                        className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
                      />
                      <span aria-hidden="true" className="absolute inset-0 bg-navy-950/35" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex size-20 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-md transition-all duration-500 ease-out-expo group-hover:scale-105 group-hover:border-gold-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                          <Icon name="play" className="ml-1 size-7" strokeWidth={2} />
                        </span>
                      </span>
                      <span className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
                        <Badge variant="gold" size="md">
                          Latest Message
                        </Badge>
                        <Badge variant="outline-light" size="md">
                          {formatDuration(featured.duration)}
                        </Badge>
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </div>

              <div className="flex flex-col justify-center">
                {series ? (
                  <p className="eyebrow text-gold-300">Current series · {series.title}</p>
                ) : null}

                <Reveal delay={0.06}>
                  <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.05] text-white">
                    {featured.title}
                  </h2>
                </Reveal>

                <Reveal delay={0.12}>
                  <p className="mt-5 text-[1.0625rem] leading-relaxed text-white/70">
                    {featured.summary}
                  </p>
                </Reveal>

                <Reveal delay={0.16}>
                  <dl className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-2 text-[0.875rem] text-white/60">
                    {featured.scripture ? (
                      <div className="flex items-center gap-2">
                        <dt className="sr-only">Scripture</dt>
                        <Icon name="book-open" className="size-4 text-gold-400" />
                        <dd>{featured.scripture}</dd>
                      </div>
                    ) : null}
                    <div className="flex items-center gap-2">
                      <dt className="sr-only">Date</dt>
                      <Icon name="calendar" className="size-4 text-gold-400" />
                      <dd>{formatDate(featured.date)}</dd>
                    </div>
                  </dl>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="mt-9 flex flex-wrap items-center gap-3">
                    <Button asChild variant="gold" size="lg">
                      <Link href={`/sermons/${featured.slug}`}>
                        <Icon name="play" className="size-4" />
                        Watch Message
                      </Link>
                    </Button>
                    <Button asChild variant="outline-light" size="lg">
                      <Link href="/sermons">Browse All Messages</Link>
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>

            {recent.length > 0 ? (
              <div className="mt-10 border-t border-white/10 pt-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <h3 className="font-display text-2xl text-white">Recent messages</h3>
                  <Link
                    href="/sermons"
                    className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-gold-300 transition-colors hover:text-gold-200"
                  >
                    See the full library
                    <Icon name="arrow-right" className="size-3.5" />
                  </Link>
                </div>
                <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {recent.slice(0, 3).map((sermon) => (
                    <SermonCard key={sermon.id} sermon={sermon} variant="row" tone="dark" />
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <EmptyState
            tone="dark"
            icon="mic"
            title="More messages coming soon"
            description="We are getting our message library online. In the meantime, join us on Sunday or watch the service live."
            action={
              <Button asChild variant="gold">
                <Link href="/watch-live">Watch Live</Link>
              </Button>
            }
          />
        )}
      </Container>
    </Section>
  );
}
