import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { images, navyBlurDataURL } from "@/config/images";
import { mapEmbedUrl } from "@/lib/church";
import { cn } from "@/lib/utils";

/**
 * Interactive map when a location is configured; otherwise an honest,
 * well-composed panel that still gets the visitor to a human being.
 */
export function MapEmbed({ className }: { className?: string }) {
  const embed = mapEmbedUrl();

  if (embed) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-media border border-navy-900/[0.08] bg-mist",
          className,
        )}
      >
        <iframe
          title="Map showing the location of Royalhouse Baltimore"
          src={embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-[2/1] h-full min-h-52 w-full border-0 grayscale-[0.15] sm:min-h-64"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-media border border-navy-900/[0.08] bg-navy-950",
        className,
      )}
    >
      <Image
        src={images.baltimoreCity.src}
        alt={images.baltimoreCity.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        placeholder="blur"
        blurDataURL={navyBlurDataURL}
        className="-z-10 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-950/72" />

      <div className="flex flex-col items-start gap-4 p-6 sm:p-5">
        <span className="flex size-11 items-center justify-center rounded-full border border-gold-500/40 text-gold-300">
          <Icon name="map-pin" className="size-5" />
        </span>
        <div>
          <p className="eyebrow text-gold-300">Where to find us</p>
          <p className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-white">
            Baltimore, Maryland
          </p>
          <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-white/70">
            Our full street address and an interactive map go live here as soon as our venue details
            are confirmed. In the meantime, message us and we will send you the exact location,
            parking and the easiest door to walk through.
          </p>
        </div>
        <Button asChild variant="light" size="md">
          <Link href="/contact">
            Ask us where to come
            <Icon name="arrow-right" className="size-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
