import Link from "next/link";
import { notFound } from "next/navigation";
import { SermonCard } from "@/components/cards/SermonCard";
import { VideoPlayer } from "@/components/media/VideoPlayer";
import { FactList, type Fact } from "@/components/sections/FactList";
import { CtaBand, PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { formatDate, formatDuration } from "@/lib/dates";
import { getRelatedSermons, getSermonBySlug, getSermons } from "@/lib/content";
import { breadcrumbSchema, sermonSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const sermons = await getSermons();
  return sermons.map((sermon) => ({ slug: sermon.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sermon = await getSermonBySlug(slug);
  if (!sermon) return pageMetadata({ title: "Message not found", description: "", path: "/sermons", noIndex: true });

  return pageMetadata({
    title: sermon.title,
    description: sermon.summary,
    path: `/sermons/${sermon.slug}`,
    image: sermon.thumbnail,
    type: "article",
    publishedTime: sermon.date,
  });
}

export default async function SermonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sermon = await getSermonBySlug(slug);
  if (!sermon) notFound();

  const related = await getRelatedSermons(sermon, 3);

  const details: Fact[] = [
    { label: "Speaker", value: sermon.speaker, icon: "mic" },
    { label: "Date", value: formatDate(sermon.date), icon: "calendar" },
    { label: "Length", value: formatDuration(sermon.duration), icon: "clock" },
    ...(sermon.scripture
      ? [{ label: "Scripture", value: sermon.scripture, icon: "book-open" as const }]
      : []),
  ];

  return (
    <>
      <JsonLd
        data={[
          sermonSchema(sermon),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Messages", path: "/sermons" },
            { name: sermon.title, path: `/sermons/${sermon.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={`Series · ${sermon.series}`}
        title={sermon.title}
        image={{ src: sermon.thumbnail, alt: sermon.thumbnailAlt }}
        breadcrumb={[{ label: "Messages", href: "/sermons" }, { label: sermon.title }]}
      />

      <Section tone="cream" spacing="md">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-6">
            <div>
              <VideoPlayer
                url={sermon.videoUrl}
                title={sermon.title}
                poster={{ src: sermon.thumbnail, alt: sermon.thumbnailAlt }}
              />

              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="gold" size="md">
                    {sermon.series}
                  </Badge>
                  {sermon.topics.map((topic) => (
                    <Badge key={topic} variant="outline" size="md">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-navy-900/75">
                  {sermon.description.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-media border border-navy-900/[0.08] bg-white p-5">
                <h2 className="eyebrow text-navy-900/65">Message details</h2>
                <FactList className="mt-5" facts={details} />

                <div className="mt-7 flex flex-col gap-2.5">
                  {sermon.audioUrl ? (
                    <Button asChild variant="outline" size="md">
                      <a href={sermon.audioUrl} target="_blank" rel="noreferrer noopener">
                        Listen to audio
                      </a>
                    </Button>
                  ) : null}
                  <Button asChild variant="outline" size="md">
                    <Link href="/sermons">Browse all messages</Link>
                  </Button>
                  <Button asChild size="md">
                    <Link href="/plan-a-visit">Join us on Sunday</Link>
                  </Button>
                </div>
              </div>

              <div className="mt-6 rounded-media border border-gold-500/25 bg-gold-100/40 p-6">
                <p className="text-[0.9375rem] font-semibold text-navy-900">
                  Something stirred while you were listening?
                </p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-navy-900/70">
                  Our prayer team would love to pray with you, privately and with no follow-up
                  unless you ask for it.
                </p>
                <Button asChild variant="link" size="none" className="mt-4">
                  <Link href="/prayer">Request prayer</Link>
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="white" spacing="md">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-navy-900">
                Keep listening
              </h2>
              <Link
                href="/sermons"
                className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-navy-900 underline decoration-gold-500/50 underline-offset-[6px] hover:decoration-gold-500"
              >
                All messages
                <Icon name="arrow-right" className="size-3.5 text-gold-600" />
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <SermonCard key={item.id} sermon={item} className="h-full" />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        eyebrow="Next Step"
        title="Come and hear it in the room."
        lede="There is something about being present that a screen cannot quite carry. We would love to have you with us."
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
