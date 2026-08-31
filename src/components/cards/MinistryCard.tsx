import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { navyBlurDataURL } from "@/config/images";
import { cn } from "@/lib/utils";
import type { Ministry } from "@/types";

interface MinistryCardProps {
  ministry: Ministry;
  variant?: "default" | "tall";
  className?: string;
}

/** Photograph-led card: the ministry image carries the invitation, the text confirms it. */
export function MinistryCard({ ministry, variant = "default", className }: MinistryCardProps) {
  return (
    <Link
      href={`/ministries/${ministry.slug}`}
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-media bg-navy-950 p-6 text-white transition-transform duration-500 ease-out-expo hover:-translate-y-1 sm:p-5",
        variant === "tall" ? "min-h-[14rem]" : "min-h-[14rem]",
        className,
      )}
    >
      <Image
        src={ministry.image}
        alt={ministry.imageAlt}
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
        placeholder="blur"
        blurDataURL={navyBlurDataURL}
        className="-z-10 object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 scrim-soft" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-navy-950/10 transition-colors duration-500 group-hover:bg-navy-950/25"
      />

      <p className="eyebrow text-gold-300">{ministry.audience}</p>
      <h3 className="mt-3 font-display text-[1.75rem] leading-tight">{ministry.name}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/70">{ministry.tagline}</p>

      <span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-white">
        <span className="border-b border-gold-400/50 pb-0.5 transition-colors group-hover:border-gold-300">
          Explore {ministry.name}
        </span>
        <Icon
          name="arrow-right"
          className="size-3.5 text-gold-300 transition-transform duration-300 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
