import { Logo } from "@/components/brand/Logo";

/**
 * Route-level loading state: the logo settles in behind a thin gold progress
 * hairline. Deliberately quiet, no spinner, no layout shift.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[55svh] flex-col items-center justify-center gap-5 bg-navy-950 px-6"
    >
      <div className="rise">
        <Logo tone="dark" size="lg" />
      </div>
      <div
        aria-hidden="true"
        className="h-px w-40 overflow-hidden rounded-full bg-white/12 sm:w-56"
      >
        <span className="block h-full w-1/3 animate-loading-sweep bg-gold-400" />
      </div>
      <span className="sr-only">Loading Royalhouse Baltimore</span>
    </div>
  );
}
