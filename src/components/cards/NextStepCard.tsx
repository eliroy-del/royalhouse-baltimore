import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { NextStep } from "@/types";

/** One clear action per card. Never "Learn more". */
export function NextStepCard({ step, className }: { step: NextStep; className?: string }) {
  return (
    <Link
      href={step.href}
      className={cn(
        "group flex h-full flex-col rounded-media border p-5 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:shadow-elevate",
        step.featured
          ? "border-gold-500/40 bg-navy-900 text-white hover:border-gold-400"
          : "border-navy-900/[0.08] bg-white hover:border-gold-500/40",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center rounded-full transition-colors duration-500",
          step.featured
            ? "bg-gold-500 text-navy-950"
            : "bg-navy-900/[0.05] text-navy-800 group-hover:bg-gold-100 group-hover:text-gold-700",
        )}
      >
        <Icon name={step.icon} className="size-5" />
      </span>

      <h3
        className={cn(
          "mt-6 font-display text-[1.5rem] leading-tight",
          step.featured ? "text-white" : "text-navy-900",
        )}
      >
        {step.title}
      </h3>

      <p
        className={cn(
          "mt-3 flex-1 text-[0.9375rem] leading-relaxed",
          step.featured ? "text-white/70" : "text-navy-900/62",
        )}
      >
        {step.description}
      </p>

      <span
        className={cn(
          "mt-6 inline-flex items-center gap-2 text-[0.875rem] font-semibold",
          step.featured ? "text-gold-300" : "text-navy-900",
        )}
      >
        <span
          className={cn(
            "border-b pb-0.5 transition-colors",
            step.featured
              ? "border-gold-400/50 group-hover:border-gold-300"
              : "border-gold-500/40 group-hover:border-gold-500",
          )}
        >
          {step.cta}
        </span>
        <Icon
          name="arrow-right"
          className={cn(
            "size-3.5 transition-transform duration-300 group-hover:translate-x-1",
            step.featured ? "text-gold-300" : "text-gold-600",
          )}
        />
      </span>
    </Link>
  );
}
