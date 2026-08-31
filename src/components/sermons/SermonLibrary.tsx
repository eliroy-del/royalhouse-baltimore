"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { SermonCard } from "@/components/cards/SermonCard";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import type { Sermon } from "@/types";

interface SermonLibraryProps {
  sermons: Sermon[];
  seriesOptions: string[];
  speakerOptions: string[];
  topicOptions: string[];
}

type FilterKey = "series" | "speaker" | "topic";

/**
 * Client-side library. Data is passed down from the server component so the
 * content layer stays server-only and the page can still be statically rendered.
 */
export function SermonLibrary({
  sermons,
  seriesOptions,
  speakerOptions,
  topicOptions,
}: SermonLibraryProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    series: "All",
    speaker: "All",
    topic: "All",
  });

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return sermons.filter((sermon) => {
      if (filters.series !== "All" && sermon.series !== filters.series) return false;
      if (filters.speaker !== "All" && sermon.speaker !== filters.speaker) return false;
      if (filters.topic !== "All" && !sermon.topics.includes(filters.topic)) return false;
      if (!needle) return true;

      return [sermon.title, sermon.summary, sermon.series, sermon.speaker, sermon.scripture ?? "", ...sermon.topics]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [sermons, query, filters]);

  const isFiltered =
    query.trim().length > 0 || Object.values(filters).some((value) => value !== "All");

  const clearAll = () => {
    setQuery("");
    setFilters({ series: "All", speaker: "All", topic: "All" });
  };

  const groups: { key: FilterKey; label: string; options: string[] }[] = [
    { key: "series", label: "Series", options: ["All", ...seriesOptions] },
    { key: "topic", label: "Topic", options: ["All", ...topicOptions] },
  ];

  if (speakerOptions.length > 1) {
    groups.push({ key: "speaker", label: "Speaker", options: ["All", ...speakerOptions] });
  }

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-media border border-navy-900/[0.08] bg-white p-6 sm:p-5">
        <div className="relative">
          <label htmlFor="sermon-search" className="sr-only">
            Search messages
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-[1.125rem] -translate-y-1/2 text-navy-900/35"
          />
          <input
            id="sermon-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, series, topic or scripture…"
            className="h-12 w-full rounded-full border border-navy-900/15 bg-white pl-12 pr-11 text-[0.9375rem] text-navy-900 placeholder:text-navy-900/35 transition-colors hover:border-navy-900/25 focus:border-gold-500 focus:outline-none focus:ring-4 focus:ring-gold-500/15"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-navy-900/65 transition-colors hover:bg-navy-900/[0.05] hover:text-navy-900"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          ) : null}
        </div>

        {groups.map((group) => (
          <div key={group.key} className="flex flex-wrap items-center gap-2">
            <span className="mr-1 eyebrow text-navy-900/65">{group.label}</span>
            {group.options.map((option) => {
              const active = filters[group.key] === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilters((prev) => ({ ...prev, [group.key]: option }))}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-300",
                    active
                      ? "border-navy-900 bg-navy-900 text-white"
                      : "border-navy-900/12 text-navy-900/65 hover:border-gold-500/50 hover:bg-gold-100/50 hover:text-navy-900",
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-[0.875rem] text-navy-900/65">
          {results.length} {results.length === 1 ? "message" : "messages"}
          {isFiltered ? " match your search" : " in the library"}
        </p>
        {isFiltered ? (
          <button
            type="button"
            onClick={clearAll}
            className="text-[0.875rem] font-semibold text-navy-900 underline decoration-gold-500/50 underline-offset-4 hover:decoration-gold-500"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {results.length > 0 ? (
        <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((sermon) => (
            <StaggerItem key={sermon.id} className="h-full">
              <SermonCard sermon={sermon} className="h-full" />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <EmptyState
          className="mt-6"
          icon="mic"
          title="No messages match that"
          description="Try a different word, or clear the filters to see the whole library."
        />
      )}
    </div>
  );
}
