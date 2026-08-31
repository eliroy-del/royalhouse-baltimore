import { events } from "@/content/events";
import { groups } from "@/content/connect";
import {
  leaders,
  leadershipGroups,
  leadershipSlots,
  type LeadershipSlot,
} from "@/content/leaders";
import { ministries } from "@/content/ministries";
import { series, sermons } from "@/content/sermons";
import { testimonies } from "@/content/testimonies";
import { isUpcoming, timestamp } from "@/lib/dates";
import type {
  ChurchEvent,
  GroupItem,
  Leader,
  Ministry,
  Sermon,
  SermonSeries,
  Testimony,
} from "@/types";

/* ============================================================
   CONTENT ADAPTER — the CMS seam
   ------------------------------------------------------------
   Every page reads content through these functions and never
   imports `src/content/*` directly. They are async on purpose:
   swapping the local arrays for a Sanity/Payload/Strapi/Supabase
   query is a change inside this file only.
   ============================================================ */

const byDateDesc = (a: { date: string }, b: { date: string }) =>
  timestamp(b.date) - timestamp(a.date);
const byDateAsc = (a: { date: string }, b: { date: string }) =>
  timestamp(a.date) - timestamp(b.date);

/* ---------------------------------- Events --------------------------------- */

export async function getEvents(): Promise<ChurchEvent[]> {
  return [...events].sort(byDateAsc);
}

export async function getUpcomingEvents(limit?: number): Promise<ChurchEvent[]> {
  const upcoming = (await getEvents()).filter((event) => isUpcoming(event.endDate ?? event.date));
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

export async function getFeaturedEvent(): Promise<ChurchEvent | null> {
  const upcoming = await getUpcomingEvents();
  return upcoming.find((event) => event.featured) ?? upcoming[0] ?? null;
}

export async function getEventBySlug(slug: string): Promise<ChurchEvent | null> {
  return events.find((event) => event.slug === slug) ?? null;
}

export async function getRelatedEvents(event: ChurchEvent, limit = 3): Promise<ChurchEvent[]> {
  const upcoming = await getUpcomingEvents();
  const sameCategory = upcoming.filter(
    (item) => item.id !== event.id && item.category === event.category,
  );
  const others = upcoming.filter(
    (item) => item.id !== event.id && item.category !== event.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

/* --------------------------------- Sermons --------------------------------- */

export async function getSermons(): Promise<Sermon[]> {
  return [...sermons].sort(byDateDesc);
}

export async function getFeaturedSermon(): Promise<Sermon | null> {
  const all = await getSermons();
  return all.find((sermon) => sermon.featured) ?? all[0] ?? null;
}

export async function getLatestSermons(limit = 3): Promise<Sermon[]> {
  return (await getSermons()).slice(0, limit);
}

export async function getSermonBySlug(slug: string): Promise<Sermon | null> {
  return sermons.find((sermon) => sermon.slug === slug) ?? null;
}

export async function getRelatedSermons(sermon: Sermon, limit = 3): Promise<Sermon[]> {
  const all = await getSermons();
  const sameSeries = all.filter((item) => item.id !== sermon.id && item.series === sermon.series);
  const others = all.filter((item) => item.id !== sermon.id && item.series !== sermon.series);
  return [...sameSeries, ...others].slice(0, limit);
}

export async function getSeries(): Promise<SermonSeries[]> {
  return series;
}

export async function getCurrentSeries(): Promise<SermonSeries | null> {
  return series.find((item) => item.current) ?? series[0] ?? null;
}

/* -------------------------------- Ministries ------------------------------- */

export async function getMinistries(): Promise<Ministry[]> {
  return ministries;
}

export async function getFeaturedMinistries(limit = 4): Promise<Ministry[]> {
  const featured = ministries.filter((ministry) => ministry.featured);
  return (featured.length > 0 ? featured : ministries).slice(0, limit);
}

export async function getMinistryBySlug(slug: string): Promise<Ministry | null> {
  return ministries.find((ministry) => ministry.slug === slug) ?? null;
}

/* ------------------------------- Testimonies ------------------------------- */

/** Only moderated, approved testimonies are ever returned. */
export async function getTestimonies(): Promise<Testimony[]> {
  return testimonies.filter((testimony) => testimony.approved).sort(byDateDesc);
}

export async function getFeaturedTestimonies(limit = 3): Promise<Testimony[]> {
  const approved = await getTestimonies();
  const featured = approved.filter((testimony) => testimony.featured);
  return (featured.length > 0 ? featured : approved).slice(0, limit);
}

/* -------------------------------- Leadership ------------------------------- */

export async function getLeaders(): Promise<Leader[]> {
  return leaders;
}

/** Role slots shown while the church has not yet supplied real people. */
export async function getLeadershipSlots(): Promise<LeadershipSlot[]> {
  return leadershipSlots;
}

export async function getLeadershipGroups(): Promise<typeof leadershipGroups> {
  return leadershipGroups;
}

/* ---------------------------------- Groups --------------------------------- */

export async function getGroups(): Promise<GroupItem[]> {
  return groups;
}
