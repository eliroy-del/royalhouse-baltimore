import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/config/site";

interface PageMetaInput {
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/plan-a-visit". */
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}

/** Consistent metadata for every route: canonical, OG, Twitter, robots. */
export function pageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  type = "website",
  publishedTime,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  const absoluteImage = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: siteConfig.locale,
      images: [{ url: absoluteImage, width: 2000, height: 1125, alt: siteConfig.name }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
