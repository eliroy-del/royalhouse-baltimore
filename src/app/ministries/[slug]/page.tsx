import Link from "next/link";
import { notFound } from "next/navigation";
import { MinistryCard } from "@/components/cards/MinistryCard";
import { FactList } from "@/components/sections/FactList";
import { CtaBand, PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { getMinistries, getMinistryBySlug } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { isSupplied } from "@/lib/utils";

export async function generateStaticParams() {
  const ministries = await getMinistries();
  return ministries.map((ministry) => ({ slug: ministry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ministry = await getMinistryBySlug(slug);
  if (!ministry) {
    return pageMetadata({
      title: "Ministry not found",
      description: "",
      path: "/ministries",
      noIndex: true,
    });
  }

  return pageMetadata({
    title: `${ministry.name} Ministry`,
    description: `${ministry.tagline} — ${ministry.description[0] ?? ""}`.slice(0, 200),
    path: `/ministries/${ministry.slug}`,
    image: ministry.image,
  });
}

export default async function MinistryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ministry = await getMinistryBySlug(slug);
  if (!ministry) notFound();

  const all = await getMinistries();
  const related = all
    .filter((item) => item.id !== ministry.id && item.category === ministry.category)
    .concat(all.filter((item) => item.id !== ministry.id && item.category !== ministry.category))
    .slice(0, 3);

  const facts = [
    {
      icon: "users" as const,
      label: "Who it is for",
      value: ministry.audience,
    },
    {
      icon: "clock" as const,
      label: "When it meets",
      value: isSupplied(ministry.meetingTime)
        ? ministry.meetingTime
        : "Meeting times are confirmed each season — ask us and we will tell you exactly when to come.",
    },
    {
      icon: "map-pin" as const,
      label: "Where it meets",
      value: isSupplied(ministry.meetingLocation)
        ? ministry.meetingLocation
        : "Royalhouse Baltimore",
    },
    {
      icon: "hand-heart" as const,
      label: "Who leads it",
      value: isSupplied(ministry.leader)
        ? ministry.leader
        : "Led by one of our ministry leaders — we will introduce you personally.",
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Ministries", path: "/ministries" },
          { name: ministry.name, path: `/ministries/${ministry.slug}` },
        ])}
      />

      <PageHero
        eyebrow={ministry.category}
        title={ministry.name}
        lede={ministry.tagline}
        image={{ src: ministry.image, alt: ministry.imageAlt }}
        size="lg"
        breadcrumb={[{ label: "Ministries", href: "/ministries" }, { label: ministry.name }]}
        actions={
          <>
            <Button asChild variant="gold" size="lg">
              <Link href="/connect">Get Involved</Link>
            </Button>
            <Button asChild variant="outline-light" size="lg">
              <Link href="/contact">Ask a Question</Link>
            </Button>
          </>
        }
      />

      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <Badge variant="gold" size="md">
                {ministry.audience}
              </Badge>
              <h2 className="mt-6 font-display text-[clamp(1.875rem,3.4vw,2.75rem)] font-light leading-[1.08] text-navy-900">
                What this ministry is really about
              </h2>
              <div className="mt-7 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-navy-900/75">
                {ministry.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3 border-t border-navy-900/[0.08] pt-8">
                <Button asChild size="lg">
                  <Link href="/connect#serve">Join this team</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/plan-a-visit">Visit on Sunday</Link>
                </Button>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-media border border-navy-900/[0.08] bg-white p-7">
                <h2 className="eyebrow text-navy-900/65">The practical details</h2>
                <FactList facts={facts} className="mt-5" />
              </div>

              <div className="mt-6 rounded-media border border-gold-500/25 bg-gold-100/40 p-6">
                <p className="text-[0.9375rem] font-semibold text-navy-900">
                  Curious but not ready to commit?
                </p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-navy-900/70">
                  Come and watch for a week or two. Nobody will put you on a rota before you are
                  ready.
                </p>
                <Button asChild variant="link" size="none" className="mt-4">
                  <Link href="/contact">Arrange a visit to this team</Link>
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="white" spacing="lg">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-navy-900">
                Other places to belong
              </h2>
              <Link
                href="/ministries"
                className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-navy-900 underline decoration-gold-500/50 underline-offset-[6px] hover:decoration-gold-500"
              >
                All ministries
                <Icon name="arrow-right" className="size-3.5 text-gold-600" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <MinistryCard key={item.id} ministry={item} className="h-full" />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaBand
        eyebrow="Next Step"
        title="The quickest way in is a Sunday."
        lede="Come and meet us. We will point you to the people who run this and let you ask them anything."
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
