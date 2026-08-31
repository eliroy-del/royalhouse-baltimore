import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { churchConfig } from "@/config/church";
import { images, navyBlurDataURL } from "@/config/images";
import { churchStatus, directionsUrl, locationLine, serviceTimeSummary } from "@/lib/church";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types";

interface Detail {
  icon: IconName;
  label: string;
  value: string;
  muted?: boolean;
}

function details(): Detail[] {
  const parkingSupplied = churchConfig.visit.parking.trim().length > 0;

  return [
    {
      icon: "clock",
      label: "Service times",
      value: churchStatus.hasServiceTimes
        ? serviceTimeSummary()
        : "Sunday mornings, exact times confirmed weekly",
    },
    {
      icon: "map-pin",
      label: "Where we meet",
      value: locationLine(),
      muted: !churchStatus.hasAddress,
    },
    {
      icon: "car",
      label: "Parking",
      value: parkingSupplied ? churchConfig.visit.parking : "Ask us and we will guide you in",
      muted: !parkingSupplied,
    },
    {
      icon: "baby",
      label: "Children",
      value: "Safe, joyful kids ministry with secure check-in",
    },
  ];
}

interface ServiceCardProps {
  /** `floating` overlaps the section above it, used under the hero. */
  variant?: "floating" | "inline";
  className?: string;
}

/** Reusable "Join us this Sunday" card: the answer to when, where and what about my kids. */
export function ServiceCard({ variant = "inline", className }: ServiceCardProps) {
  const directions = directionsUrl();

  return (
    <Container
      className={cn(
        "relative w-full",
        variant === "floating" && "z-20 -mt-8 sm:-mt-10 lg:-mt-12",
        className,
      )}
    >
      <Reveal y={12}>
        <div className="overflow-hidden rounded-card border border-navy-900/[0.07] bg-white shadow-float">
          <div className="grid lg:grid-cols-[minmax(0,14rem)_1fr]">
            <div className="relative flex flex-col gap-2.5 overflow-hidden bg-navy-900 p-3 text-white sm:p-3.5">
              <div className="relative -mx-3 -mt-3 aspect-[2.4/1] overflow-hidden sm:-mx-3.5 sm:-mt-3.5">
                <Image
                  src={images.worshipTeam.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 14rem, 100vw"
                  placeholder="blur"
                  blurDataURL={navyBlurDataURL}
                  className="object-cover object-[50%_35%]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/45 to-navy-950/20"
                />
                <span className="absolute bottom-1.5 left-3">
                  <span className="eyebrow text-[0.5625rem] text-gold-300">This Sunday</span>
                </span>
              </div>

              <div className="relative">
                <p className="font-display text-[1.125rem] leading-tight sm:text-[1.25rem]">
                  Join us this Sunday.
                </p>
                <p className="mt-1 text-[0.6875rem] leading-snug text-white/65 sm:text-[0.75rem]">
                  Come as you are, arrive whenever you can, and let us take care of the rest.
                </p>
              </div>
              <div className="relative flex flex-wrap gap-1.5">
                <Button asChild variant="gold" size="sm">
                  <Link href="/plan-a-visit">
                    Plan Your Visit
                    <Icon name="arrow-right" className="size-3" />
                  </Link>
                </Button>
                {directions ? (
                  <Button asChild variant="outline-light" size="sm">
                    <a href={directions} target="_blank" rel="noreferrer noopener">
                      Get Directions
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="outline-light" size="sm">
                    <Link href="/watch-live">Watch Live</Link>
                  </Button>
                )}
              </div>
            </div>

            <dl className="grid gap-px bg-navy-900/[0.07] sm:grid-cols-2">
              {details().map((detail) => (
                <div key={detail.label} className="bg-white px-3 py-2.5 sm:px-3.5 sm:py-3">
                  <dt className="flex items-center gap-1.5 eyebrow text-[0.5625rem] text-navy-900/65">
                    <Icon name={detail.icon} className="size-3 text-gold-600" />
                    {detail.label}
                  </dt>
                  <dd
                    className={cn(
                      "mt-1 text-[0.75rem] leading-snug",
                      detail.muted ? "text-navy-900/65" : "text-navy-900/80",
                    )}
                  >
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
