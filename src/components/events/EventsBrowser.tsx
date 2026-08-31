"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/cards/EventCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import type { ChurchEvent, EventCategory } from "@/types";

interface EventsBrowserProps {
  events: ChurchEvent[];
  categories: EventCategory[];
}

/** Category filtering stays on the client; the list itself is server-rendered data. */
export function EventsBrowser({ events, categories }: EventsBrowserProps) {
  const [active, setActive] = useState<EventCategory | "All">("All");

  const results = useMemo(
    () => (active === "All" ? events : events.filter((event) => event.category === active)),
    [events, active],
  );

  const options: (EventCategory | "All")[] = ["All", ...categories];

  return (
    <div>
      <div
        role="group"
        aria-label="Filter events by category"
        className="flex flex-wrap items-center gap-2"
      >
        {options.map((option) => {
          const isActive = active === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(option)}
              className={cn(
                "rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-300",
                isActive
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-navy-900/12 text-navy-900/65 hover:border-gold-500/50 hover:bg-gold-100/50 hover:text-navy-900",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-[0.875rem] text-navy-900/65">
        {results.length} {results.length === 1 ? "event" : "events"}
        {active === "All" ? " coming up" : ` in ${active}`}
      </p>

      {results.length > 0 ? (
        <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((event) => (
            <StaggerItem key={event.id} className="h-full">
              <EventCard event={event} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <EmptyState
          className="mt-6"
          icon="calendar"
          title="Nothing in this category yet"
          description="Try another category, or check back soon. Our calendar is updated every week."
        />
      )}
    </div>
  );
}
