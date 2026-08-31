import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { getEvents, getMinistries, getSermons } from "@/lib/content";

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/plan-a-visit", priority: 0.9, changeFrequency: "monthly" },
  { path: "/connect", priority: 0.8, changeFrequency: "monthly" },
  { path: "/our-heart", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sermons", priority: 0.8, changeFrequency: "weekly" },
  { path: "/events", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ministries", priority: 0.7, changeFrequency: "monthly" },
  { path: "/give", priority: 0.7, changeFrequency: "yearly" },
  { path: "/prayer", priority: 0.7, changeFrequency: "yearly" },
  { path: "/testimonies", priority: 0.6, changeFrequency: "monthly" },
  { path: "/leadership", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [sermons, events, ministries] = await Promise.all([
    getSermons(),
    getEvents(),
    getMinistries(),
  ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...sermons.map((sermon) => ({
      url: `${siteUrl}/sermons/${sermon.slug}`,
      lastModified: new Date(sermon.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...events.map((event) => ({
      url: `${siteUrl}/events/${event.slug}`,
      lastModified: new Date(event.date),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...ministries.map((ministry) => ({
      url: `${siteUrl}/ministries/${ministry.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
