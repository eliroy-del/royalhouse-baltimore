import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { navyBlurDataURL } from "@/config/images";
import { dateParts, formatDate } from "@/lib/dates";
import { cn } from "@/lib/utils";
import type { ChurchEvent } from "@/types";

interface EventCardProps {
  event: ChurchEvent;
  /** `feature` is the large hero treatment used at the top of a list. */
  variant?: "default" | "feature" | "compact";
  className?: string;
}

export function EventCard({ event, variant = "default", className }: EventCardProps) {
  const { month, day } = dateParts(event.date);
  const href = `/events/${event.slug}`;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-5 rounded-card border border-navy-900/[0.08] bg-white p-4 transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:border-gold-500/40 hover:shadow-elevate",
          className,
        )}
      >
        <span className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-900 text-white">
          <span className="eyebrow text-gold-300">{month}</span>
          <span className="font-display text-2xl leading-none figures-lining">{day}</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[0.9375rem] font-semibold text-navy-900 transition-colors group-hover:text-navy-800">
            {event.title}
          </span>
          <span className="mt-1 block truncate text-[0.8125rem] text-navy-900/65">
            {event.startTime} · {event.category}
          </span>
        </span>
        <Icon
          name="arrow-right"
          className="size-4 shrink-0 text-navy-900/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-600"
        />
      </Link>
    );
  }

  if (variant === "feature") {
    return (
      <Link
        href={href}
        className={cn(
          "group relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-media bg-navy-950 p-6 text-white sm:min-h-[24rem] lg:p-8",
          className,
        )}
      >
        <Image
          src={event.image}
          alt={event.imageAlt}
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          placeholder="blur"
          blurDataURL={navyBlurDataURL}
          className="-z-10 object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 scrim-navy" />

        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="gold" size="md">
            Featured
          </Badge>
          <Badge variant="outline-light" size="md">
            {event.category}
          </Badge>
        </div>

        <h3 className="mt-5 max-w-2xl font-display text-[clamp(1.875rem,3.4vw,2.875rem)] leading-[1.05]">
          {event.title}
        </h3>
        <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-white/75">
          {event.summary}
        </p>

        <dl className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.875rem] text-white/80">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Date</dt>
            <Icon name="calendar" className="size-4 text-gold-400" />
            <dd>{formatDate(event.date)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Time</dt>
            <Icon name="clock" className="size-4 text-gold-400" />
            <dd>{event.startTime}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Location</dt>
            <Icon name="map-pin" className="size-4 text-gold-400" />
            <dd>{event.location}</dd>
          </div>
        </dl>

        <span className="mt-8 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-gold-300">
          See event details
          <Icon
            name="arrow-right"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-card border border-navy-900/[0.08] bg-white transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-elevate",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
        <Image
          src={event.image}
          alt={event.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={navyBlurDataURL}
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
        />
        <span className="absolute left-4 top-4 flex size-14 flex-col items-center justify-center rounded-xl bg-white/95 text-navy-900 shadow-elevate backdrop-blur">
          <span className="eyebrow text-gold-800">{month}</span>
          <span className="font-display text-xl leading-none figures-lining">{day}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Badge variant="soft" className="self-start">
          {event.category}
        </Badge>
        <h3 className="mt-4 text-lg font-semibold leading-snug text-navy-900">{event.title}</h3>
        <p className="mt-2.5 flex-1 text-[0.9375rem] leading-relaxed text-navy-900/65">
          {event.summary}
        </p>
        <p className="mt-5 flex items-center gap-2 border-t border-navy-900/[0.07] pt-4 text-[0.8125rem] text-navy-900/65">
          <Icon name="clock" className="size-3.5 text-gold-600" />
          {event.startTime}
          {event.recurring ? ` · ${event.recurring}` : null}
        </p>
      </div>
    </Link>
  );
}
