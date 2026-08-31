import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium",
    "whitespace-nowrap transition-[background-color,color,border-color,box-shadow,transform] duration-300",
    "ease-out-expo will-change-transform",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold-500",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:translate-y-px",
  ],
  {
    variants: {
      variant: {
        /** Navy: the default action across light sections. */
        primary:
          "bg-navy-900 text-white shadow-subtle hover:bg-navy-800 hover:shadow-elevate",
        /** Royal gold: reserved for the single most important action on a screen. */
        gold: "bg-gold-500 text-navy-950 shadow-subtle hover:bg-gold-400 hover:shadow-elevate",
        /** Outlined navy for secondary actions on light backgrounds. */
        outline:
          "border border-navy-900/20 bg-transparent text-navy-900 hover:border-navy-900/40 hover:bg-navy-900/[0.04]",
        /** White pill for use over photography and navy sections. */
        light: "bg-white text-navy-900 shadow-elevate hover:bg-gold-100",
        /** Glass outline for use over photography. */
        "outline-light":
          "border border-white/35 bg-white/[0.06] text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/15",
        ghost: "text-navy-900 hover:bg-navy-900/[0.05]",
        "ghost-light": "text-white/90 hover:bg-white/10 hover:text-white",
        /** Inline text action with the signature gold underline. */
        link: "h-auto rounded-none p-0 text-navy-900 underline decoration-gold-500/60 decoration-1 underline-offset-[6px] hover:decoration-gold-500",
        /** The same inline action, for navy sections and photography. */
        "link-light":
          "h-auto rounded-none p-0 text-white underline decoration-gold-400/70 decoration-1 underline-offset-[6px] hover:decoration-gold-300",
      },
      size: {
        sm: "h-8 px-3.5 text-[0.8125rem]",
        md: "h-10 px-5 text-sm",
        lg: "h-11 px-6 text-[0.9375rem]",
        xl: "h-12 px-7 text-[0.9375rem]",
        icon: "size-10 p-0",
        none: "",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
