import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { formatMonthYear } from "@/lib/dates";
import { cn, initialsOf } from "@/lib/utils";
import type { Testimony } from "@/types";

interface TestimonyCardProps {
  testimony: Testimony;
  tone?: "light" | "dark";
  className?: string;
}

export function TestimonyCard({ testimony, tone = "light", className }: TestimonyCardProps) {
  const displayName = testimony.anonymous ? "Shared anonymously" : testimony.name;

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-media border p-5 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-elevate sm:p-5",
        tone === "dark"
          ? "border-white/10 bg-white/[0.04] hover:border-gold-400/40"
          : "border-navy-900/[0.08] bg-white hover:border-gold-500/40",
        className,
      )}
    >
      {/* Category sits at the top so the byline below always has full width */}
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className={cn(
            "font-display text-5xl leading-none",
            tone === "dark" ? "text-gold-400/50" : "text-gold-500/40",
          )}
        >
          &ldquo;
        </span>
        <Badge variant={tone === "dark" ? "outline-light" : "soft"} className="mt-1 shrink-0">
          {testimony.category}
        </Badge>
      </div>

      <blockquote
        className={cn(
          "mt-1 flex-1 font-display text-[1.375rem] leading-[1.45]",
          tone === "dark" ? "text-white/90" : "text-navy-900",
        )}
      >
        {testimony.quote}
      </blockquote>

      <figcaption
        className={cn(
          "mt-7 flex items-center gap-4 border-t pt-6",
          tone === "dark" ? "border-white/10" : "border-navy-900/[0.07]",
        )}
      >
        {testimony.photo && !testimony.anonymous ? (
          <Image
            src={testimony.photo}
            alt=""
            width={52}
            height={52}
            sizes="52px"
            className="size-13 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className={cn(
              "flex size-13 shrink-0 items-center justify-center rounded-full font-display text-lg",
              tone === "dark" ? "bg-white/10 text-gold-300" : "bg-navy-900/[0.06] text-navy-800",
            )}
          >
            {testimony.anonymous ? "—" : initialsOf(testimony.name)}
          </span>
        )}

        <div className="min-w-0">
          <p
            className={cn(
              "text-[0.9375rem] font-semibold",
              tone === "dark" ? "text-white" : "text-navy-900",
            )}
          >
            {displayName}
          </p>
          <p
            className={cn(
              "mt-0.5 text-[0.8125rem] leading-snug",
              tone === "dark" ? "text-white/50" : "text-navy-900/65",
            )}
          >
            {testimony.location ? `${testimony.location} · ` : null}
            {formatMonthYear(testimony.date)}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
