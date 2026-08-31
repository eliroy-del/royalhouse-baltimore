"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Loader2, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { SearchGroup, SearchResult } from "@/lib/search";

const quickLinks = [
  { label: "Plan a visit", href: "/plan-a-visit" },
  { label: "Service times", href: "/plan-a-visit#when" },
  { label: "Latest message", href: "/sermons" },
  { label: "Watch live", href: "/watch-live" },
  { label: "Request prayer", href: "/prayer" },
  { label: "Give", href: "/give" },
];

const groupOrder: SearchGroup[] = ["Pages", "Messages", "Events", "Ministries", "Testimonies"];

/**
 * Site-wide search. Querying happens on the server (`/api/search`) so no index
 * is shipped to the browser and content stays behind the adapter layer.
 */
export function SearchOverlay({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-60 bg-navy-950/70 backdrop-blur-sm" />
        {/* The panel mounts only while open, so its query state resets every time. */}
        <SearchPanel onClose={() => onOpenChange(false)} />
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const onQueryChange = (value: string) => {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      setStatus("idle");
    } else {
      setStatus("loading");
    }
  };

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return;

    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as { results: SearchResult[] };
        setResults(data.results ?? []);
        setStatus("done");
      } catch {
        if (!controller.signal.aborted) {
          setResults([]);
          setStatus("done");
        }
      }
    }, 220);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const grouped = groupOrder
    .map((group) => ({ group, items: results.filter((result) => result.group === group) }))
    .filter((entry) => entry.items.length > 0);

  const isSearching = query.trim().length >= 2;

  return (
    <Dialog.Content
      onOpenAutoFocus={(event) => {
        event.preventDefault();
        inputRef.current?.focus();
      }}
      className="fixed left-1/2 top-[12vh] z-70 w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-media border border-navy-900/10 bg-white shadow-float"
    >
      <Dialog.Title className="sr-only">Search Royalhouse Baltimore</Dialog.Title>
      <Dialog.Description className="sr-only">
        Search messages, events, ministries and pages.
      </Dialog.Description>

      <div className="relative border-b border-navy-900/[0.08]">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-navy-900/35"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search messages, events, ministries…"
          aria-label="Search"
          className="h-16 w-full bg-transparent pl-14 pr-24 text-[1.0625rem] text-navy-900 placeholder:text-navy-900/35 focus:outline-none"
        />
        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {status === "loading" ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin text-navy-900/35" />
          ) : null}
          <Dialog.Close
            aria-label="Close search"
            className="flex size-9 items-center justify-center rounded-full text-navy-900/65 transition-colors hover:bg-navy-900/[0.05] hover:text-navy-900"
          >
            <X aria-hidden="true" className="size-4" />
          </Dialog.Close>
        </div>
      </div>

      <div className="max-h-[60vh] overflow-y-auto p-3">
        {!isSearching ? (
          <div className="p-4">
            <p className="eyebrow text-navy-900/65">Popular</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="inline-flex rounded-full border border-navy-900/12 px-3.5 py-2 text-[0.8125rem] text-navy-900/70 transition-colors hover:border-gold-500/50 hover:bg-gold-100/50 hover:text-navy-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.8125rem] text-navy-900/65">
              Type at least two characters to search messages, events, ministries and pages.
            </p>
          </div>
        ) : grouped.length > 0 ? (
          <div aria-live="polite">
            {grouped.map((entry) => (
              <div key={entry.group} className="mb-2 last:mb-0">
                <p className="px-4 py-2 eyebrow text-navy-900/65">{entry.group}</p>
                <ul>
                  {entry.items.map((result) => (
                    <li key={result.id}>
                      <Link
                        href={result.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-start gap-3.5 rounded-card px-4 py-3 transition-colors",
                          "hover:bg-gold-100/50 focus-visible:bg-gold-100/60",
                        )}
                      >
                        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-900/[0.05] text-navy-800">
                          <Icon name={result.icon} className="size-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.9375rem] font-semibold text-navy-900">
                            {result.title}
                          </span>
                          <span className="mt-0.5 line-clamp-1 block text-[0.8125rem] text-navy-900/65">
                            {result.description}
                          </span>
                        </span>
                        <Icon
                          name="arrow-right"
                          className="ml-auto mt-2 size-4 shrink-0 text-navy-900/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-gold-600"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : status === "loading" ? (
          <p className="p-6 text-[0.9375rem] text-navy-900/65">Searching…</p>
        ) : (
          <div className="p-6" aria-live="polite">
            <p className="font-display text-xl text-navy-900">
              Nothing matched &ldquo;{query.trim()}&rdquo;
            </p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-900/65">
              Try a different word, or{" "}
              <Link
                href="/contact"
                onClick={onClose}
                className="font-semibold text-navy-900 underline decoration-gold-500/50 underline-offset-4 hover:decoration-gold-500"
              >
                ask us directly
              </Link>{" "}
             , a real person will reply.
            </p>
          </div>
        )}
      </div>
    </Dialog.Content>
  );
}

/** Icon trigger used in the header, wired to ⌘K / Ctrl+K. */
export function SearchTrigger({
  tone = "dark",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search this site"
        className={cn(
          "inline-flex size-10 items-center justify-center rounded-full border transition-colors duration-300",
          tone === "dark"
            ? "border-white/20 text-white/75 hover:border-white/45 hover:bg-white/10 hover:text-white"
            : "border-navy-900/15 text-navy-900/65 hover:border-gold-500/50 hover:bg-gold-100/50 hover:text-navy-900",
          className,
        )}
      >
        <Search aria-hidden="true" className="size-[1.0625rem]" />
      </button>
      <SearchOverlay open={open} onOpenChange={setOpen} />
    </>
  );
}
