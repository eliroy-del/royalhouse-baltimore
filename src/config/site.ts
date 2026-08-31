import { churchConfig } from "./church";

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL in the deployment environment. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://royalhousebaltimore.org"
).replace(/\/$/, "");

export const siteConfig = {
  name: churchConfig.name,
  title: `${churchConfig.name} — A Church in Baltimore, Maryland`,
  description:
    "Royalhouse Baltimore is a Spirit-filled church in Baltimore, Maryland. Join us on Sunday to worship Jesus, grow in faith and find your family. Plan your visit, watch messages online or request prayer.",
  url: siteUrl,
  locale: "en_US",
  ogImage: "/images/hero-worship.jpg",
  keywords: [
    "church in Baltimore",
    "churches in Baltimore Maryland",
    "Royalhouse Baltimore",
    "Royalhouse Chapel Baltimore",
    "Christian church Baltimore",
    "Pentecostal church Baltimore",
    "Sunday service Baltimore",
    "African church Baltimore",
    "worship in Baltimore",
    "Bible teaching church Baltimore",
    "prayer request Baltimore",
    "family church Baltimore",
  ],
  /** Populated automatically from the church config once social URLs are supplied. */
  get sameAs(): string[] {
    return Object.values(churchConfig.social).filter(
      (url): url is string => typeof url === "string" && url.trim().length > 0,
    );
  },
} as const;

/** Analytics is opt-in: nothing loads unless an ID is configured. */
export const analyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
} as const;
