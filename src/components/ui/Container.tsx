import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerWidth = "narrow" | "prose" | "default" | "wide" | "full";

const widths: Record<ContainerWidth, string> = {
  prose: "max-w-[46rem]",
  narrow: "max-w-[64rem]",
  /** ~1344px — stays within the 1280–1440 content band on large screens. */
  default: "max-w-[84rem]",
  wide: "max-w-[90rem]",
  full: "max-w-none",
};

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  width?: ContainerWidth;
}

/** Site-wide gutters: 16 → 24 → 32 → 48px. Content never kisses the viewport edge. */
export function Container({
  as: Tag = "div",
  width = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12",
        widths[width],
        className,
      )}
      {...props}
    />
  );
}
