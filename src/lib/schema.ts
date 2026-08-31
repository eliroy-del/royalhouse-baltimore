import { churchConfig, churchStatus } from "@/config/church";
import { brandConfig } from "@/config/brand";
import { siteConfig, siteUrl } from "@/config/site";
import { isSupplied } from "@/lib/utils";
import type { ChurchEvent, Sermon } from "@/types";

/* ============================================================
   STRUCTURED DATA
   Only facts we actually have are emitted; no placeholder
   addresses or phone numbers leak into schema.org output.
   ============================================================ */

export type Json = Record<string, unknown>;

function postalAddress(): Json | undefined {
  const { address } = churchConfig;
  if (!churchStatus.hasAddress) {
    // Still useful for local SEO: the city we serve, without inventing a street.
    return {
      "@type": "PostalAddress",
      addressLocality: address.city,
      addressRegion: churchConfig.regionCode,
      addressCountry: "US",
    };
  }
  return {
    "@type": "PostalAddress",
    streetAddress: [address.line1, address.line2].filter(isSupplied).join(", "),
    addressLocality: address.city,
    addressRegion: churchConfig.regionCode,
    postalCode: address.postalCode,
    addressCountry: "US",
  };
}

function openingHours(): Json[] | undefined {
  if (!churchStatus.hasServiceTimes) return undefined;
  return churchConfig.serviceTimes.map((service) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${service.day}`,
    opens: service.time,
    name: service.label,
  }));
}

/** Church + Organization + LocalBusiness signals for the site as a whole. */
export function churchSchema(): Json {
  const { social } = churchConfig;
  const sameAs = Object.values(social).filter(isSupplied);

  return {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${siteUrl}/#church`,
    name: churchConfig.name,
    alternateName: `${churchConfig.name}: ${churchConfig.network}`,
    url: siteUrl,
    description: churchConfig.statement,
    slogan: churchConfig.tagline,
    image: `${siteUrl}${siteConfig.ogImage}`,
    logo: `${siteUrl}${brandConfig.logo.official.src}`,
    address: postalAddress(),
    areaServed: {
      "@type": "City",
      name: `${churchConfig.city}, ${churchConfig.region}`,
    },
    ...(isSupplied(churchConfig.contact.phone) ? { telephone: churchConfig.contact.phone } : {}),
    ...(isSupplied(churchConfig.contact.email) ? { email: churchConfig.contact.email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(openingHours() ? { openingHoursSpecification: openingHours() } : {}),
    ...(churchConfig.address.latitude && churchConfig.address.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: churchConfig.address.latitude,
            longitude: churchConfig.address.longitude,
          },
        }
      : {}),
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: churchConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteUrl}/#church` },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function eventSchema(event: ChurchEvent): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: event.date,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: `${siteUrl}${event.image}`,
    url: `${siteUrl}/events/${event.slug}`,
    location: {
      "@type": "Place",
      name: event.location,
      address: postalAddress(),
    },
    organizer: { "@type": "Organization", name: churchConfig.name, url: siteUrl },
    ...(event.registrationUrl
      ? {
          offers: {
            "@type": "Offer",
            url: event.registrationUrl,
            availability: "https://schema.org/InStock",
            price: "0",
            priceCurrency: "USD",
          },
        }
      : {}),
  };
}

export function sermonSchema(sermon: Sermon): Json {
  const base: Json = {
    "@context": "https://schema.org",
    "@type": sermon.videoUrl ? "VideoObject" : "Article",
    name: sermon.title,
    headline: sermon.title,
    description: sermon.summary,
    thumbnailUrl: `${siteUrl}${sermon.thumbnail}`,
    image: `${siteUrl}${sermon.thumbnail}`,
    uploadDate: sermon.date,
    datePublished: sermon.date,
    url: `${siteUrl}/sermons/${sermon.slug}`,
    author: { "@type": "Organization", name: churchConfig.name },
    publisher: { "@type": "Organization", name: churchConfig.name, url: siteUrl },
  };

  if (sermon.videoUrl) {
    base.contentUrl = sermon.videoUrl;
    base.duration = `PT${sermon.duration}M`;
  }

  return base;
}
