"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types";

/** Accessible disclosure list. Keyboard, screen-reader and reduced-motion safe. */
export function FaqAccordion({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className={cn("divide-y divide-navy-900/[0.08] border-y border-navy-900/[0.08]", className)}
    >
      {items.map((item) => (
        <Accordion.Item key={item.id} value={item.id}>
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-navy-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">
              <span className="text-[1.0625rem] font-semibold leading-snug text-navy-900">
                {item.question}
              </span>
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-navy-900/12 text-navy-900/65 transition-all duration-300 ease-out-expo group-hover:border-gold-500/50 group-hover:text-gold-700 group-data-[state=open]:rotate-45 group-data-[state=open]:border-gold-500 group-data-[state=open]:bg-gold-500 group-data-[state=open]:text-navy-950">
                <Plus aria-hidden="true" className="size-4" strokeWidth={2} />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_.25s_ease] data-[state=open]:animate-[accordion-down_.3s_var(--ease-out-expo)]">
            <p className="max-w-3xl pb-7 pr-14 text-[0.9375rem] leading-relaxed text-navy-900/70">
              {item.answer}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
