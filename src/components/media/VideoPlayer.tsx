import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { navyBlurDataURL } from "@/config/images";
import { cn } from "@/lib/utils";

/** Converts a YouTube or Vimeo watch URL into its privacy-friendly embed form. */
export function toEmbedUrl(url: string): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}`;
    }
    if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const id = parsed.searchParams.get("v");
        return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
      }
      if (parsed.pathname.startsWith("/embed/")) return url;
      if (parsed.pathname.startsWith("/live/")) {
        return `https://www.youtube-nocookie.com/embed/${parsed.pathname.split("/")[2]}`;
      }
    }
    if (host === "vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    if (host === "player.vimeo.com") return url;

    // Already an embeddable URL supplied by the church.
    return url;
  } catch {
    return null;
  }
}

interface VideoPlayerProps {
  url: string;
  title: string;
  poster?: { src: string; alt: string };
  className?: string;
  /** Copy shown when no video URL exists yet. */
  fallbackTitle?: string;
  fallbackMessage?: string;
}

/**
 * Renders an embedded player when a video URL exists, and a composed
 * placeholder when it does not — we never ship a broken or fake player.
 */
export function VideoPlayer({
  url,
  title,
  poster,
  className,
  fallbackTitle = "Video coming soon",
  fallbackMessage = "We are uploading this message now. In the meantime you can join us live on Sunday, or read the summary below.",
}: VideoPlayerProps) {
  const embed = toEmbedUrl(url);

  if (embed) {
    return (
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-media border border-navy-900/10 bg-navy-950",
          className,
        )}
      >
        <iframe
          src={embed}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full border-0"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate flex aspect-video flex-col items-center justify-center overflow-hidden rounded-media bg-navy-950 p-5 text-center",
        className,
      )}
    >
      {poster ? (
        <>
          <Image
            src={poster.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            placeholder="blur"
            blurDataURL={navyBlurDataURL}
            className="-z-10 object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-navy-950/80" />
        </>
      ) : null}

      <span className="flex size-14 items-center justify-center rounded-full border border-gold-500/40 text-gold-300">
        <Icon name="video" className="size-6" />
      </span>
      <p className="mt-5 font-display text-[clamp(1.375rem,2.4vw,1.875rem)] text-white">
        {fallbackTitle}
      </p>
      <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-white/65">
        {fallbackMessage}
      </p>
      <Button asChild variant="light" size="md" className="mt-7">
        <Link href="/watch-live">
          Watch live on Sunday
          <Icon name="arrow-right" className="size-3.5" />
        </Link>
      </Button>
    </div>
  );
}
