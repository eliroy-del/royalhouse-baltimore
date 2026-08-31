import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "cream" | "white" | "mist" | "navy" | "navy-deep" | "transparent";
type Spacing = "sm" | "md" | "lg" | "xl" | "none";

const tones: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  white: "bg-white text-ink",
  mist: "bg-mist text-ink",
  navy: "bg-navy-900 text-white",
  "navy-deep": "bg-navy-950 text-white",
  transparent: "",
};

const spacings: Record<Spacing, string> = {
  none: "",
  sm: "py-6 sm:py-8",
  md: "py-8 sm:py-10 lg:py-12",
  lg: "py-10 sm:py-12 lg:py-14",
  xl: "py-8 sm:py-10 lg:py-12",
};

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  tone?: Tone;
  spacing?: Spacing;
}

/** Vertical rhythm + background tone. Sections alternate tone to pace the page. */
export function Section({
  as: Tag = "section",
  tone = "cream",
  spacing = "md",
  className,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn("relative", tones[tone], spacings[spacing], className)} {...props} />
  );
}
