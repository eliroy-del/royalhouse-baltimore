/** Escape and flatten user-supplied strings before they enter email bodies. */

export function sanitizeText(value: unknown, max = 4000): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, max);
}

export function sanitizeEmail(value: unknown): string {
  const email = sanitizeText(value, 160).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "";
  return email;
}

export function sanitizeLines(lines: Array<string | null | undefined>): string {
  return lines.filter(Boolean).join("\n");
}
