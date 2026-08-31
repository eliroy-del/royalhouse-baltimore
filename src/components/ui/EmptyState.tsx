import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types";

interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description: string;
  action?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

/** Content gaps should still feel considered — never a blank region. */
export function EmptyState({
  icon = "sparkles",
  title,
  description,
  action,
  tone = "light",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-card border border-dashed px-6 py-16 text-center",
        tone === "dark" ? "border-white/15 bg-white/[0.03]" : "border-navy-900/12 bg-white/60",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-12 items-center justify-center rounded-full",
          tone === "dark" ? "bg-white/10 text-gold-300" : "bg-gold-100 text-gold-800",
        )}
      >
        <Icon name={icon} className="size-5" />
      </span>
      <p
        className={cn(
          "mt-5 font-display text-2xl",
          tone === "dark" ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "mt-2 max-w-md text-[0.9375rem] leading-relaxed",
          tone === "dark" ? "text-white/60" : "text-navy-900/65",
        )}
      >
        {description}
      </p>
      {action ? <div className="mt-7">{action}</div> : null}
    </div>
  );
}
