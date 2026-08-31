import type { ReactNode } from "react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types";

export interface Fact {
  label: string;
  value: ReactNode;
  icon: IconName;
}

interface FactListProps {
  facts: Fact[];
  className?: string;
}

/**
 * Label/value list used in the detail sidebars (event, message, ministry).
 * The icon lives inside the <dt> so every <dl> stays a valid
 * dl > div > (dt, dd) structure for assistive technology.
 */
export function FactList({ facts, className }: FactListProps) {
  return (
    <dl className={cn("flex flex-col divide-y divide-navy-900/[0.07]", className)}>
      {facts.map((fact) => (
        <div key={fact.label} className="py-3.5 first:pt-0 last:pb-0">
          <dt className="flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.14em] text-navy-900/65">
            <Icon name={fact.icon} className="size-4 shrink-0 text-gold-600" />
            {fact.label}
          </dt>
          <dd className="mt-1.5 pl-6 text-[0.9375rem] leading-relaxed text-navy-900/80">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
