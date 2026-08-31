import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { SermonLibrary } from "@/components/sermons/SermonLibrary";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images, navyBlurDataURL } from "@/config/images";
import { formatDate, formatDuration } from "@/lib/dates";
import { getCurrentSeries, getFeaturedSermon, getSermons } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Messages",
  description:
    "Watch and listen to messages from Royalhouse Baltimore. Browse by series, topic or scripture, practical Bible teaching for real life in Baltimore.",
  path: "/sermons",
  image: images.sermonFeatured.src,
});

export default async function SermonsPage() {
  const sermons = await getSermons();
  const featured = await getFeaturedSermon();
  const currentSeries = await getCurrentSeries();

  const seriesOptions = Array.from(new Set(sermons.map((sermon) => sermon.series)));
  const speakerOptions = Array.from(new Set(sermons.map((sermon) => sermon.speaker)));
  const topicOptions = Array.from(new Set(sermons.flatMap((sermon) => sermon.topics))).sort();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Messages", path: "/sermons" },
        ])}
      />

      <PageHero
        eyebrow="Messages"
        title={
          <>
            Teaching you can <em className="not-italic text-gold-300">actually use</em> on Monday.
          </>
        }
        lede="Every message we preach, free to watch or listen to, whenever you need it. Search by series, topic or scripture."
        image={images.sermonFeatured}
        objectPosition="50% 35%"
        breadcrumb={[{ label: "Messages" }]}
        actions={
          <>
            <Button asChild variant="gold" size="lg">
              <Link href="/watch-live">
                <Icon name="play" className="size-4" />
                Watch Live
              </Link>
            </Button>
            {featured ? (
              <Button asChild variant="outline-light" size="lg">
                <Link href={`/sermons/${featured.slug}`}>Latest Message</Link>
              </Button>
            ) : null}
          </>
        }
      />

      {/* ------------------------------ Featured ------------------------------ */}
      {featured ? (
        <Section tone="cream" spacing="md">
          <Container>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center lg:gap-6">
              <Reveal y={24}>
                <Link
                  href={`/sermons/${featured.slug}`}
                  className="group relative block aspect-video overflow-hidden rounded-media bg-navy-900"
                >
                  <Image
                    src={featured.thumbnail}
                    alt={featured.thumbnailAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    placeholder="blur"
                    blurDataURL={navyBlurDataURL}
                    className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-navy-950/30" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex size-18 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-md transition-all duration-500 ease-out-expo group-hover:scale-105 group-hover:border-gold-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                      <Icon name="play" className="ml-1 size-6" strokeWidth={2} />
                    </span>
                  </span>
                </Link>
              </Reveal>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="gold" size="md">
                    Latest Message
                  </Badge>
                  {currentSeries ? (
                    <Badge variant="outline" size="md">
                      Series · {currentSeries.title}
                    </Badge>
                  ) : null}
                </div>
                <h2 className="mt-5 font-display text-[clamp(1.875rem,3.6vw,2.125rem)] font-light leading-[1.06] text-navy-900">
                  {featured.title}
                </h2>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-navy-900/70">
                  {featured.summary}
                </p>
                <p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.875rem] text-navy-900/65">
                  <span className="flex items-center gap-2">
                    <Icon name="calendar" className="size-4 text-gold-600" />
                    {formatDate(featured.date)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Icon name="clock" className="size-4 text-gold-600" />
                    {formatDuration(featured.duration)}
                  </span>
                  {featured.scripture ? (
                    <span className="flex items-center gap-2">
                      <Icon name="book-open" className="size-4 text-gold-600" />
                      {featured.scripture}
                    </span>
                  ) : null}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href={`/sermons/${featured.slug}`}>
                      <Icon name="play" className="size-4" />
                      Watch Message
                    </Link>
                  </Button>
                  {currentSeries ? (
                    <Button asChild variant="outline" size="lg">
                      <Link href="#library">Browse the series</Link>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ------------------------------- Library ------------------------------- */}
      <Section tone="white" spacing="md" id="library">
        <Container>
          <SectionHeading
            eyebrow="The Library"
            title="Every message, searchable."
            lede="Filter by series, topic or speaker, or type whatever you remember and let the search find it."
          />
          <div className="mt-6">
            <SermonLibrary
              sermons={sermons}
              seriesOptions={seriesOptions}
              speakerOptions={speakerOptions}
              topicOptions={topicOptions}
            />
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Better In The Room"
        title="Messages are good. Being here is better."
        lede="Watching online is a real way to be part of this church. Sitting in the room with us is another."
        actions={
          <>
            <Button asChild variant="gold" size="xl">
              <Link href="/plan-a-visit">Plan Your Visit</Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <Link href="/watch-live">Watch Live</Link>
            </Button>
          </>
        }
      />
    </>
  );
}
