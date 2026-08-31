import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

interface EyebrowProps {
  /** Two-digit chapter number for the homepage narrative, e.g. "03". */
  chapter?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/** Small-caps label with optional chapter number. */
export function Eyebrow({ chapter, children, tone = "light", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 eyebrow",
        tone === "dark" ? "text-gold-300" : "text-gold-800",
        className,
      )}
    >
      {chapter ? (
        <span
          className={cn(
            "font-display text-sm tracking-normal tabular-nums",
            tone === "dark" ? "text-white/50" : "text-navy-900/65",
          )}
        >
          {chapter}
        </span>
      ) : null}
      <span>{children}</span>
    </p>
  );
}

interface SectionHeadingProps {
  chapter?: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  tone?: "light" | "dark";
  size?: "md" | "lg";
  actions?: ReactNode;
  className?: string;
}

export function SectionHeading({
  chapter,
  eyebrow,
  title,
  lede,
  as: Tag = "h2",
  align = "left",
  tone = "light",
  size = "lg",
  actions,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow chapter={chapter} tone={tone}>
            {eyebrow}
          </Eyebrow>
        </Reveal>
      ) : null}

      <Reveal delay={0.06}>
        <Tag
          className={cn(
            // Cormorant sits low in its line box, so multi-line display
            // headings need leading below 1 to look properly set.
            "font-display font-normal leading-[0.96] tracking-tight",
            size === "lg"
              ? "mt-2 text-[clamp(1.5rem,2.8vw,2.25rem)]"
              : "mt-2 text-[clamp(1.375rem,2.2vw,1.875rem)]",
            tone === "dark" ? "text-white" : "text-navy-900",
          )}
        >
          {title}
        </Tag>
      </Reveal>

      {lede ? (
        <Reveal delay={0.12}>
          <div
            className={cn(
              "mt-2.5 max-w-2xl text-[0.875rem] leading-relaxed sm:text-[0.9375rem]",
              align === "center" && "mx-auto",
              tone === "dark" ? "text-white/70" : "text-navy-900/70",
            )}
          >
            {lede}
          </div>
        </Reveal>
      ) : null}

      {actions ? (
        <Reveal delay={0.18}>
          <div
            className={cn(
              "mt-4 flex flex-wrap items-center gap-3",
              align === "center" && "justify-center",
            )}
          >
            {actions}
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
