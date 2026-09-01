import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { images, navyBlurDataURL } from "@/config/images";
import { churchStatus, directionsUrl, locationLine, serviceTimeSummary } from "@/lib/church";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  /** `floating` overlaps the section above it, used under the hero. */
  variant?: "floating" | "inline";
  className?: string;
}

/**
 * Compact Sunday invite bar: thumbnail, message, and actions.
 * Modeled on a floating hero CTA strip rather than a tall info card.
 */
export function ServiceCard({ variant = "inline", className }: ServiceCardProps) {
  const directions = directionsUrl();
  const schedule = churchStatus.hasServiceTimes
    ? serviceTimeSummary()
    : "Sunday mornings";
  const place = locationLine();

  return (
    <Container
      className={cn(
        "relative w-full",
        variant === "floating" && "z-20 -mt-8 sm:-mt-10 lg:-mt-12",
        className,
      )}
    >
      <Reveal y={12}>
        <div className="flex flex-col overflow-hidden rounded-card border border-navy-900/[0.07] bg-white shadow-float sm:flex-row sm:items-stretch">
          <div className="relative aspect-[16/10] w-full shrink-0 sm:aspect-auto sm:w-40 lg:w-48">
            <Image
              src={images.worshipTeam.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 12rem, (min-width: 640px) 10rem, 100vw"
              placeholder="blur"
              blurDataURL={navyBlurDataURL}
              className="object-cover object-[50%_35%]"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5 sm:py-4 lg:px-6">
            <div className="min-w-0">
              <p className="text-[1.0625rem] font-semibold leading-snug text-navy-900 sm:text-[1.125rem]">
                Join us this Sunday
              </p>
              <p className="mt-1 text-[0.8125rem] leading-snug text-navy-900/65 sm:text-[0.875rem]">
                {schedule}
                {place ? ` · ${place}` : null}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Button asChild variant="gold" size="md">
                <Link href="/plan-a-visit">
                  Plan Your Visit
                  <Icon name="arrow-right" className="size-3.5" />
                </Link>
              </Button>
              {directions ? (
                <Link
                  href={directions}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[0.875rem] font-semibold text-navy-900/70 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-navy-900 hover:decoration-gold-500"
                >
                  Get Directions
                </Link>
              ) : (
                <Link
                  href="/sermons"
                  className="text-[0.875rem] font-semibold text-navy-900/70 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-navy-900 hover:decoration-gold-500"
                >
                  Messages
                </Link>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
