import { churchConfig, churchStatus } from "@/config/church";
import { isSupplied } from "@/lib/utils";

/* ============================================================
   GRACEFUL FALLBACKS
   ------------------------------------------------------------
   The church has not supplied every factual detail yet, and we
   do not invent any of it. These helpers return honest, warm
   copy in place of missing data so the interface never shows a
   blank, a dash, or a fabricated address.
   ============================================================ */

/** Compact service-time summary, e.g. "Sundays · 9:00 AM & 11:30 AM". */
export function serviceTimeSummary(): string {
  const { serviceTimes } = churchConfig;
  if (serviceTimes.length === 0) return "Sunday Gatherings";

  const sundays = serviceTimes.filter((s) => s.day === "Sunday");
  const times = (sundays.length > 0 ? sundays : serviceTimes).map((s) => s.time);
  const dayLabel = sundays.length > 0 ? "Sundays" : `${serviceTimes[0]!.day}s`;

  if (times.length === 1) return `${dayLabel} · ${times[0]}`;
  return `${dayLabel} · ${times.slice(0, -1).join(", ")} & ${times.at(-1)}`;
}

/** Line used under the hero and in the service card. */
export function serviceTimeDetail(): string {
  return churchStatus.hasServiceTimes
    ? serviceTimeSummary()
    : "Service times for this week are confirmed by our team, get in touch and we will make sure you know exactly when to arrive.";
}

/** Single-line location string, as specific as the data allows. */
export function locationLine(): string {
  const { address } = churchConfig;
  if (!churchStatus.hasAddress) return `${address.city}, ${address.region}`;
  return [address.line1, address.line2, `${address.city}, ${address.region} ${address.postalCode}`]
    .filter(isSupplied)
    .join(", ");
}

/** Multi-line address block for the footer and contact page. */
export function addressLines(): string[] {
  const { address } = churchConfig;
  if (!churchStatus.hasAddress) {
    return [`${address.city}, ${address.region}`, "Full address & directions coming soon"];
  }
  return [
    address.line1,
    address.line2,
    `${address.city}, ${address.region} ${address.postalCode}`,
  ].filter(isSupplied);
}

/** Google Maps directions link, or an empty string when there is nothing to link to. */
export function directionsUrl(): string {
  const { address } = churchConfig;
  const query = isSupplied(address.mapQuery)
    ? address.mapQuery
    : churchStatus.hasAddress
      ? `${address.line1}, ${address.city}, ${address.region} ${address.postalCode}`
      : "";
  if (!isSupplied(query)) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Embeddable map URL. Empty until a location is supplied. */
export function mapEmbedUrl(): string {
  const { address } = churchConfig;
  const query = isSupplied(address.mapQuery) ? address.mapQuery : "";
  if (!isSupplied(query)) return "";
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

/** Where the "Give" call to action should point. */
export function givingHref(): string {
  return isSupplied(churchConfig.giving.onlineUrl) ? churchConfig.giving.onlineUrl : "/give";
}

export function isExternalGiving(): boolean {
  return isSupplied(churchConfig.giving.onlineUrl);
}

/** Prayer inbox, falling back to the general church address. */
export function prayerEmail(): string {
  return isSupplied(churchConfig.contact.prayerEmail)
    ? churchConfig.contact.prayerEmail
    : churchConfig.contact.email;
}

export function telHref(): string {
  return churchConfig.contact.phone.replace(/[^\d+]/g, "");
}

/** Only the social platforms that actually have a URL. */
export function activeSocials(): { platform: keyof typeof churchConfig.social; url: string }[] {
  return (
    Object.entries(churchConfig.social) as [keyof typeof churchConfig.social, string | undefined][]
  )
    .filter(([, url]) => isSupplied(url))
    .map(([platform, url]) => ({ platform, url: url as string }));
}

export { churchConfig, churchStatus };
