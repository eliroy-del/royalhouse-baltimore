import Image from "next/image";
import Link from "next/link";
import { brandConfig } from "@/config/brand";
import { cn } from "@/lib/utils";

type LogoTone = "light" | "dark";
type LogoSize = "sm" | "md" | "lg";

const sizes: Record<
  LogoSize,
  { mark: string; word: string; local: string }
> = {
  sm: {
    mark: "size-10",
    word: "text-[1.0625rem]",
    local: "text-[0.5rem] tracking-[0.32em]",
  },
  md: {
    mark: "size-12",
    word: "text-[1.25rem]",
    local: "text-[0.5625rem] tracking-[0.36em]",
  },
  lg: {
    mark: "size-16",
    word: "text-[1.625rem]",
    local: "text-[0.625rem] tracking-[0.4em]",
  },
};

interface LogoProps {
  tone?: LogoTone;
  size?: LogoSize;
  className?: string;
  /** Preload the mark — true in the header, false in the footer. */
  preload?: boolean;
}

/**
 * Official Royalhouse Chapel mark, sized with CSS only, paired with the
 * local wordmark "Royalhouse Baltimore". The supplied artwork is never
 * recoloured, cropped or given effects. On every surface it sits in a
 * white rounded badge so the native white dove remains visible.
 */
export function Logo({ tone = "light", size = "md", className, preload = false }: LogoProps) {
  const scale = sizes[size];
  const { official } = brandConfig.logo;

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative shrink-0 overflow-hidden rounded-lg bg-white",
          "shadow-[0_0_0_1px_rgba(201,162,39,0.28)]",
          scale.mark,
          brandConfig.clearSpace,
        )}
      >
        <Image
          src={official.src}
          alt=""
          width={official.width}
          height={official.height}
          preload={preload}
          className="size-full object-contain"
        />
      </span>
      <span className="flex min-w-0 flex-col items-start leading-none">
        <span
          className={cn(
            "font-display font-medium tracking-[0.005em]",
            scale.word,
            tone === "dark" ? "text-white" : "text-navy-900",
          )}
        >
          Royalhouse
        </span>
        <span className="mt-1 flex items-center gap-2">
          <span aria-hidden="true" className="h-px w-4 rule-gold" />
          <span
            className={cn(
              "font-semibold uppercase",
              scale.local,
              tone === "dark" ? "text-gold-300" : "text-gold-800",
            )}
          >
            {brandConfig.localName}
          </span>
        </span>
      </span>
    </span>
  );
}

/** The logo wrapped as a home link — used in the header and footer. */
export function LogoLink({
  tone = "light",
  size = "md",
  className,
  onNavigate,
  preload = false,
}: LogoProps & { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      aria-label={`${brandConfig.name} — home`}
      onClick={onNavigate}
      className={cn(
        "inline-flex shrink-0 items-center rounded-md transition-opacity duration-300 hover:opacity-90",
        className,
      )}
    >
      <Logo tone={tone} size={size} preload={preload} />
    </Link>
  );
}
