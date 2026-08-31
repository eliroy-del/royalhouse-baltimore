import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import type { StoryMilestone } from "@/types";

/**
 * Renders the church's history when milestones have been supplied. We do not
 * invent founding dates, founders or events, so an unpopulated timeline shows a
 * considered invitation instead of fabricated history.
 */
export function StoryTimeline({
  milestones,
  className,
}: {
  milestones: StoryMilestone[];
  className?: string;
}) {
  if (milestones.length === 0) {
    return (
      <EmptyState
        className={className}
        icon="sunrise"
        title="Our story is still being written down"
        description="The dates, the first gathering, the people who prayed this church into being — our leadership is putting it all on record so we can tell it properly rather than approximately."
        action={
          <Button asChild variant="outline">
            <Link href="/contact">Ask us about our history</Link>
          </Button>
        }
      />
    );
  }

  return (
    <Stagger className={cn("relative flex flex-col", className)}>
      <span
        aria-hidden="true"
        className="absolute left-[0.4375rem] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold-500/60 via-navy-900/12 to-transparent"
      />
      {milestones.map((milestone) => (
        <StaggerItem key={milestone.id} className="relative flex gap-7 pb-12 last:pb-0">
          <span className="relative z-10 mt-2 size-3.5 shrink-0 rounded-full border-2 border-gold-500 bg-cream" />
          <div className="min-w-0">
            <p className="eyebrow text-gold-800">
              {milestone.year.trim().length > 0 ? milestone.year : "Date to be confirmed"}
            </p>
            <h3 className="mt-3 font-display text-[1.625rem] leading-tight text-navy-900">
              {milestone.title}
            </h3>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-navy-900/65">
              {milestone.description}
            </p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
