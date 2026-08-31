import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { navyBlurDataURL } from "@/config/images";
import { formatDate, formatDuration } from "@/lib/dates";
import { cn } from "@/lib/utils";
import type { Sermon } from "@/types";

interface SermonCardProps {
  sermon: Sermon;
  variant?: "default" | "row";
  tone?: "light" | "dark";
  className?: string;
}

export function SermonCard({
  sermon,
  variant = "default",
  tone = "light",
  className,
}: SermonCardProps) {
  const href = `/sermons/${sermon.slug}`;

  if (variant === "row") {
    return (
      <Link
        href={href}
        className={cn(
          "group flex items-center gap-4 rounded-card border p-3 transition-all duration-500 ease-out-expo",
          tone === "dark"
            ? "border-white/10 hover:border-gold-400/40 hover:bg-white/[0.04]"
            : "border-navy-900/[0.08] bg-white hover:-translate-y-0.5 hover:border-gold-500/40 hover:shadow-elevate",
          className,
        )}
      >
        <span className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg bg-navy-900 sm:w-28">
          <Image
            src={sermon.thumbnail}
            alt={sermon.thumbnailAlt}
            fill
            sizes="112px"
            placeholder="blur"
            blurDataURL={navyBlurDataURL}
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "eyebrow block",
              tone === "dark" ? "text-gold-300" : "text-gold-800",
            )}
          >
            {sermon.series}
          </span>
          <span
            className={cn(
              "mt-1.5 block text-[0.9375rem] font-semibold leading-snug",
              tone === "dark" ? "text-white" : "text-navy-900",
            )}
          >
            {sermon.title}
          </span>
          <span
            className={cn(
              "mt-1 block text-[0.8125rem]",
              tone === "dark" ? "text-white/50" : "text-navy-900/65",
            )}
          >
            {formatDate(sermon.date)} · {formatDuration(sermon.duration)}
          </span>
        </span>
        <Icon
          name="arrow-right"
          className={cn(
            "size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1",
            tone === "dark" ? "text-white/30" : "text-navy-900/30",
          )}
        />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-card border transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-elevate",
        tone === "dark"
          ? "border-white/10 bg-white/[0.03] hover:border-gold-400/40"
          : "border-navy-900/[0.08] bg-white hover:border-gold-500/40",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden bg-navy-900">
        <Image
          src={sermon.thumbnail}
          alt={sermon.thumbnailAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={navyBlurDataURL}
          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-navy-950/25" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-14 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md transition-all duration-500 ease-out-expo group-hover:scale-110 group-hover:border-gold-300 group-hover:bg-gold-500 group-hover:text-navy-950">
            <Icon name="play" className="ml-0.5 size-5" strokeWidth={2} />
          </span>
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-navy-950/80 px-2.5 py-1 text-[0.6875rem] font-semibold text-white backdrop-blur">
          {formatDuration(sermon.duration)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <Badge variant={tone === "dark" ? "outline-light" : "gold"} className="self-start">
          {sermon.series}
        </Badge>
        <h3
          className={cn(
            "mt-4 text-lg font-semibold leading-snug",
            tone === "dark" ? "text-white" : "text-navy-900",
          )}
        >
          {sermon.title}
        </h3>
        <p
          className={cn(
            "mt-2.5 flex-1 text-[0.9375rem] leading-relaxed",
            tone === "dark" ? "text-white/60" : "text-navy-900/65",
          )}
        >
          {sermon.summary}
        </p>
        <p
          className={cn(
            "mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-4 text-[0.8125rem]",
            tone === "dark" ? "border-white/10 text-white/50" : "border-navy-900/[0.07] text-navy-900/65",
          )}
        >
          <span>{formatDate(sermon.date)}</span>
          {sermon.scripture ? (
            <>
              <span aria-hidden="true" className="h-3 w-px bg-current opacity-25" />
              <span>{sermon.scripture}</span>
            </>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
