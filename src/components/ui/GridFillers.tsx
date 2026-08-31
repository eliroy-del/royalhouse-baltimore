import { cn } from "@/lib/utils";

type Breakpoint = "sm" | "md" | "lg";

/** Column count per breakpoint, matching the grid's own responsive classes. */
export type GridColumns = Partial<Record<Breakpoint, number>>;

const order: Breakpoint[] = ["sm", "md", "lg"];

/* Written as literals so Tailwind's scanner generates them. */
const showAt: Record<Breakpoint, string> = {
  sm: "sm:block",
  md: "md:block",
  lg: "lg:block",
};
const hideAt: Record<Breakpoint, string> = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
};

/**
 * Our hairline grids draw their dividers by letting a tinted container show
 * through 1px gaps. When the last row is short, that tint shows through the
 * unused cells and reads as a hole in the block. These decorative cells fill
 * the row at whichever breakpoints need them, so the block always closes
 * cleanly however many items the church publishes.
 */
export function GridFillers({
  count,
  columns,
  tone = "light",
  as: Cell = "span",
}: {
  count: number;
  columns: GridColumns;
  tone?: "light" | "dark";
  /** Use `li` when the grid is a list, so the markup stays valid. */
  as?: "span" | "li";
}) {
  const active = order.filter((bp) => typeof columns[bp] === "number");
  const missing = new Map<Breakpoint, number>(
    active.map((bp) => {
      const cols = columns[bp] as number;
      return [bp, (cols - (count % cols)) % cols];
    }),
  );

  const total = Math.max(0, ...missing.values());
  if (total === 0) return null;

  return (
    <>
      {Array.from({ length: total }).map((_, index) => (
        <Cell
          key={index}
          aria-hidden="true"
          className={cn(
            "hidden",
            tone === "dark" ? "bg-navy-900" : "bg-white",
            active.map((bp) => (index < (missing.get(bp) ?? 0) ? showAt[bp] : hideAt[bp])),
          )}
        />
      ))}
    </>
  );
}
