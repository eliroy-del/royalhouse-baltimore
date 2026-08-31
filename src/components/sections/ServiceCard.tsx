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
        : "Sunday mornings — exact times confirmed weekly",
      muted: !churchStatus.hasServiceTimes,
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
  /** `floating` overlaps the section above it — used under the hero. */
  variant?: "floating" | "inline";
  className?: string;
}

/** Reusable "Join us this Sunday" card: the answer to when, where and what about my kids. */
export function ServiceCard({ variant = "inline", className }: ServiceCardProps) {
  const directions = directionsUrl();

  return (
    <Container
      className={cn(
        "relative",
        variant === "floating" && "z-20 -mt-10 lg:-mt-16",
        className,
      )}
    >
      <Reveal y={24}>
        <div className="overflow-hidden rounded-media border border-navy-900/[0.07] bg-white shadow-float">
          <div className="grid lg:grid-cols-[minmax(0,24rem)_1fr]">
            <div className="relative flex flex-col justify-between gap-5 overflow-hidden bg-navy-900 p-6 text-white lg:p-8">
              <div className="relative -mx-6 -mt-6 mb-1 aspect-[16/9] overflow-hidden lg:-mx-8 lg:-mt-8">
                <Image
                  src={images.worshipTeam.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  placeholder="blur"
                  blurDataURL={navyBlurDataURL}
                  className="object-cover object-[50%_35%]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/45 to-navy-950/20"
                />
                <span className="absolute bottom-4 left-8 lg:left-10">
                  <span className="eyebrow text-gold-300">This Sunday</span>
                </span>
              </div>

              <div className="relative">
                <p className="font-display text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight">
                  Join us this Sunday.
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/65">
                  Come as you are, arrive whenever you can, and let us take care of the rest.
                </p>
              </div>
              <div className="relative flex flex-wrap gap-3">
                <Button asChild variant="gold" size="md">
                  <Link href="/plan-a-visit">
                    Plan Your Visit
                    <Icon name="arrow-right" className="size-3.5" />
                  </Link>
                </Button>
                {directions ? (
                  <Button asChild variant="outline-light" size="md">
                    <a href={directions} target="_blank" rel="noreferrer noopener">
                      Get Directions
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="outline-light" size="md">
                    <Link href="/watch-live">Watch Live</Link>
                  </Button>
                )}
              </div>
            </div>

            <dl className="grid gap-px bg-navy-900/[0.07] sm:grid-cols-2">
              {details().map((detail) => (
                <div key={detail.label} className="bg-white p-7 lg:p-8">
                  <dt className="flex items-center gap-2.5 eyebrow text-navy-900/65">
                    <Icon name={detail.icon} className="size-4 text-gold-600" />
                    {detail.label}
                  </dt>
                  <dd
                    className={cn(
                      "mt-3 text-[0.9375rem] leading-relaxed",
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
