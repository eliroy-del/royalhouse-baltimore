import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-[0.14em]",
  {
    variants: {
      variant: {
        gold: "bg-gold-100 text-gold-800",
        navy: "bg-navy-900 text-white",
        soft: "bg-navy-900/[0.06] text-navy-900/70",
        outline: "border border-navy-900/15 text-navy-900/70",
        "outline-light": "border border-white/25 text-white/80",
        live: "bg-red-600 text-white",
      },
      size: {
        sm: "px-2.5 py-1 text-[0.625rem]",
        md: "px-3 py-1.5 text-[0.6875rem]",
      },
    },
    defaultVariants: { variant: "soft", size: "sm" },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

/** Pulsing dot used by the live-stream status pill. */
export function LiveDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative flex size-2 items-center justify-center", className)}
    >
      <span className="absolute size-2 rounded-full bg-current animate-pulse-live" />
      <span className="size-1 rounded-full bg-current" />
    </span>
  );
}
