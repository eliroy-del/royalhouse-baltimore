import { churchConfig } from "./church";

function firstOrigin(...candidates: (string | undefined)[]): string {
  for (const candidate of candidates) {
    const value = candidate?.trim().replace(/\/$/, "");
    if (!value) continue;
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  }
  return "https://royalhousebaltimore.org";
}

/**
 * Canonical origin for metadata, sitemap and structured data.
 * Empty Vercel env values are treated as unset (an empty string is not
 * nullish, and `new URL("")` would crash the build).
 *
 * NEXT_PUBLIC_SITE_URL is optional. On Vercel we fall back to the project
 * production domain, then the deployment URL, then the church placeholder.
 */
export const siteUrl = firstOrigin(
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
);

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
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "",
  googleTagManagerId: process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "",
} as const;
