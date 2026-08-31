import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative rounded-card transition-[transform,box-shadow,border-color] duration-500 ease-out-expo",
  {
    variants: {
      tone: {
        light: "border border-navy-900/[0.08] bg-white",
        cream: "border border-navy-900/[0.08] bg-cream",
        navy: "border border-white/10 bg-navy-800/40",
        "navy-solid": "border border-white/10 bg-navy-900",
        glass: "border border-white/15 bg-white/[0.06] backdrop-blur-md",
        bare: "",
      },
      interactive: {
        true: "hover:-translate-y-1 hover:border-gold-500/40 hover:shadow-elevate",
        false: "",
      },
      padding: {
        none: "",
        sm: "p-5",
        md: "p-6 sm:p-7",
        lg: "p-7 sm:p-9",
      },
    },
    defaultVariants: { tone: "light", interactive: false, padding: "md" },
  },
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, tone, interactive, padding, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ tone, interactive, padding }), className)} {...props} />
  );
}

/** Fixed-ratio media well with an internal zoom on hover of the parent card/link. */
export function CardMedia({
  className,
  ratio = "4/3",
  children,
}: {
  className?: string;
  ratio?: "4/3" | "16/9" | "3/2" | "1/1" | "3/4";
  children: React.ReactNode;
}) {
  const ratios: Record<string, string> = {
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-video",
    "3/2": "aspect-[3/2]",
    "1/1": "aspect-square",
    "3/4": "aspect-[3/4]",
  };
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[0.625rem] bg-navy-900",
        ratios[ratio],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  as: Tag = "h3",
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" | "h4" }) {
  return (
    <Tag
      className={cn("text-lg font-semibold leading-snug tracking-[-0.01em]", className)}
      {...props}
    />
  );
}

export function CardText({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-[0.9375rem] leading-relaxed text-navy-900/65", className)} {...props} />;
}
