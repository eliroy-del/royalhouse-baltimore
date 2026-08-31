import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** True when a config/content string has actually been supplied by the church. */
export function isSupplied(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Returns `value` when supplied, otherwise the graceful fallback. */
export function orFallback(value: string | null | undefined, fallback: string): string {
  return isSupplied(value) ? value : fallback;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function truncate(input: string, max: number): string {
  if (input.length <= max) return input;
  return `${input.slice(0, max).trimEnd()}…`;
}

/** Stable two-digit chapter number for the homepage narrative. */
export function chapter(index: number): string {
  return String(index).padStart(2, "0");
}
