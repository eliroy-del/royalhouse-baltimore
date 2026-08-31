import { socialGlyphs } from "@/components/brand/SocialGlyphs";
import { churchConfig } from "@/config/church";
import { isSupplied, cn } from "@/lib/utils";

interface SocialLinksProps {
  tone?: "light" | "dark";
  className?: string;
  size?: "sm" | "md";
}

const order = ["instagram", "tiktok"] as const;

/** Live Instagram and TikTok profiles for Royalhouse Baltimore. */
export function SocialLinks({ tone = "light", className, size = "md" }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {order.map((platform) => {
        const entry = socialGlyphs[platform];
        if (!entry) return null;
        const Glyph = entry.icon;
        const url = churchConfig.social[platform];
        if (!isSupplied(url)) return null;

        const classes = cn(
          "inline-flex items-center justify-center rounded-full border transition-colors duration-300",
          size === "md" ? "size-10" : "size-9",
          tone === "dark"
            ? "border-white/15 text-white/70 hover:border-gold-400/60 hover:bg-white/[0.06] hover:text-gold-300"
            : "border-navy-900/12 text-navy-900/65 hover:border-gold-500/50 hover:bg-gold-100/60 hover:text-gold-700",
        );

        return (
          <li key={platform}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${entry.label}, opens in a new tab`}
              className={classes}
            >
              <Glyph className="size-[1.0625rem]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
