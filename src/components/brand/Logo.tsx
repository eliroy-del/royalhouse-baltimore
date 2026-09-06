import Image from "next/image";
import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { cn } from "@/lib/utils";

type LogoTone = "light" | "dark";
type LogoSize = "sm" | "md" | "lg";

const sizes: Record<LogoSize, string> = {
  sm: "h-12",
  md: "h-16",
  lg: "h-28",
};

interface LogoProps {
  tone?: LogoTone;
  size?: LogoSize;
  className?: string;
  /** Preload the mark, true in the header, false in the footer. */
  preload?: boolean;
  /** Decorative when the parent link already names the church. */
  decorative?: boolean;
}

/**
 * Official Royalhouse Chapel Baltimore lockup. The supplied artwork is
 * never recoloured, cropped in the layout, or given effects. Sizing is
 * CSS-only; the intrinsic ratio stays locked.
 */
export function Logo({
  size = "md",
  className,
  preload = false,
  decorative = false,
}: LogoProps) {
  const { official } = brandConfig.logo;

  return (
    <span className={cn("inline-flex items-center", brandConfig.clearSpace, className)}>
      <Image
        src={official.src}
        alt={decorative ? "" : brandConfig.name}
        width={official.width}
        height={official.height}
        preload={preload}
        className={cn("w-auto object-contain", sizes[size])}
      />
    </span>
  );
}

/** The logo wrapped as a home link, used in the header and footer. */
export function LogoLink({
  size = "md",
  className,
  onNavigate,
  preload = false,
}: LogoProps & { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      aria-label={`${brandConfig.name}, home`}
      onClick={onNavigate}
      className={cn(
        "inline-flex shrink-0 items-center rounded-md transition-opacity duration-300 hover:opacity-90",
        className,
      )}
    >
      <Logo size={size} preload={preload} decorative />
    </Link>
  );
}
