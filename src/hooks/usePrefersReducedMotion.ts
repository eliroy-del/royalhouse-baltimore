"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * The user's motion preference, kept in sync with the media query.
 *
 * The server snapshot is `false`: every animated component renders its content
 * in the finished, visible state on the server, so there is nothing to flash
 * and no hydration mismatch when the real preference resolves.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
