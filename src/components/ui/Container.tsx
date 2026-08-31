import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerWidth = "narrow" | "prose" | "default" | "wide" | "full";

const widths: Record<ContainerWidth, string> = {
  prose: "max-w-[46rem]",
  narrow: "max-w-[64rem]",
  default: "max-w-[84rem]",
  wide: "max-w-[96rem]",
  full: "max-w-none",
};

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  width?: ContainerWidth;
}

/** The single horizontal rhythm for the whole site: 20/32/48px gutters. */
export function Container({
  as: Tag = "div",
  width = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", widths[width], className)}
      {...props}
    />
  );
}
