import { getEvents, getMinistries, getSermons, getTestimonies } from "@/lib/content";
import type { IconName } from "@/types";

export type SearchGroup = "Messages" | "Events" | "Ministries" | "Testimonies" | "Pages";

export interface SearchResult {
  id: string;
  group: SearchGroup;
  title: string;
  description: string;
  href: string;
  icon: IconName;
  /** Higher is better. */
  score: number;
}

/** Site pages are part of the index: most searches are navigational. */
const pages: { title: string; description: string; href: string; icon: IconName; keywords: string }[] =
  [
    {
      title: "Plan a Visit",
      description: "Service times, what to expect, parking, kids and accessibility.",
      href: "/plan-a-visit",
      icon: "map-pin",
      keywords: "visit first time service times location parking directions what to wear expect new",
    },
    {
      title: "Connect",
      description: "Groups, serving, baptism, membership and your next step.",
      href: "/connect",
      icon: "users",
      keywords: "connect groups serve volunteer baptism membership next steps new here",
    },
    {
      title: "Our Heart",
      description: "Who we are, our mission, vision, beliefs and story.",
      href: "/our-heart",
      icon: "heart",
      keywords: "about beliefs mission vision values story history statement of faith",
    },
    {
      title: "Give",
      description: "Tithes, offering, missions and community impact.",
      href: "/give",
      icon: "gift",
      keywords: "give giving tithe tithes offering donate generosity missions building",
    },
    {
      title: "Request Prayer",
      description: "Send a confidential prayer request to our prayer team.",
      href: "/prayer",
      icon: "hands-praying",
      keywords: "prayer pray request intercession confidential help",
    },
    {
      title: "Leadership",
      description: "Meet the pastoral team, ministry leaders and staff.",
      href: "/leadership",
      icon: "users",
      keywords: "leadership pastor pastors team staff elders leaders",
    },
    {
      title: "Contact",
      description: "Phone, email, office hours and how to reach a person.",
      href: "/contact",
      icon: "message-circle",
      keywords: "contact phone email address office hours reach us questions",
    },
  ];

function scoreMatch(needle: string, haystacks: { text: string; weight: number }[]): number {
  let score = 0;

  for (const { text, weight } of haystacks) {
    const value = text.toLowerCase();
    if (!value) continue;
    if (value === needle) score += weight * 3;
    else if (value.startsWith(needle)) score += weight * 2;
    else if (value.includes(needle)) score += weight;
  }

  return score;
}

/**
 * Small, dependency-free relevance search across every content type.
 * Runs on the server so no index is shipped to the browser.
 */
export async function searchSite(query: string, limit = 12): Promise<SearchResult[]> {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) return [];

  const [sermons, events, ministries, testimonies] = await Promise.all([
    getSermons(),
    getEvents(),
    getMinistries(),
    getTestimonies(),
  ]);

  const results: SearchResult[] = [];

  for (const page of pages) {
    const score = scoreMatch(needle, [
      { text: page.title, weight: 10 },
      { text: page.keywords, weight: 5 },
      { text: page.description, weight: 3 },
    ]);
    if (score > 0) {
      results.push({
        id: `page-${page.href}`,
        group: "Pages",
        title: page.title,
        description: page.description,
        href: page.href,
        icon: page.icon,
        score: score + 4, // Navigational intent wins ties.
      });
    }
  }

  for (const sermon of sermons) {
    const score = scoreMatch(needle, [
      { text: sermon.title, weight: 10 },
      { text: sermon.series, weight: 6 },
      { text: sermon.topics.join(" "), weight: 5 },
      { text: sermon.scripture ?? "", weight: 5 },
      { text: sermon.speaker, weight: 4 },
      { text: sermon.summary, weight: 2 },
    ]);
    if (score > 0) {
      results.push({
        id: `sermon-${sermon.id}`,
        group: "Messages",
        title: sermon.title,
        description: `${sermon.series} · ${sermon.speaker}`,
        href: `/sermons/${sermon.slug}`,
        icon: "mic",
        score,
      });
    }
  }

  for (const event of events) {
    const score = scoreMatch(needle, [
      { text: event.title, weight: 10 },
      { text: event.category, weight: 5 },
      { text: event.summary, weight: 3 },
      { text: event.location, weight: 2 },
    ]);
    if (score > 0) {
      results.push({
        id: `event-${event.id}`,
        group: "Events",
        title: event.title,
        description: `${event.category} · ${event.startTime}`,
        href: `/events/${event.slug}`,
        icon: "calendar",
        score,
      });
    }
  }

  for (const ministry of ministries) {
    const score = scoreMatch(needle, [
      { text: ministry.name, weight: 10 },
      { text: ministry.audience, weight: 5 },
      { text: ministry.tagline, weight: 4 },
      { text: ministry.category, weight: 3 },
      { text: ministry.description.join(" "), weight: 1 },
    ]);
    if (score > 0) {
      results.push({
        id: `ministry-${ministry.id}`,
        group: "Ministries",
        title: ministry.name,
        description: ministry.tagline,
        href: `/ministries/${ministry.slug}`,
        icon: "users",
        score,
      });
    }
  }

  for (const testimony of testimonies) {
    const score = scoreMatch(needle, [
      { text: testimony.category, weight: 6 },
      { text: testimony.quote, weight: 3 },
      { text: testimony.content.join(" "), weight: 1 },
    ]);
    if (score > 0) {
      results.push({
        id: `testimony-${testimony.id}`,
        group: "Testimonies",
        title: `${testimony.category} story`,
        description: testimony.quote,
        href: "/testimonies",
        icon: "sparkles",
        score,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}
