import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { getEvents } from "@/lib/content";

const staticRoutes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/plan-a-visit", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about/who-we-are", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/our-senior-pastor", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/our-north-american-missions-lead", priority: 0.8, changeFrequency: "monthly" },
  { path: "/events", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/give", priority: 0.7, changeFrequency: "yearly" },
  { path: "/prayer", priority: 0.7, changeFrequency: "yearly" },
  { path: "/serve", priority: 0.6, changeFrequency: "monthly" },
  { path: "/sermons", priority: 0.4, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const events = await getEvents();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path === "/" ? "" : route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...events.map((event) => ({
      url: `${siteUrl}/events/${event.slug}`,
      lastModified: new Date(event.date),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
