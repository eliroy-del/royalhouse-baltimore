import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { images, navyBlurDataURL } from "@/config/images";
import { directionsUrl } from "@/lib/church";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  /** `floating` overlaps the section above it, used under the hero. */
  variant?: "floating" | "inline";
  className?: string;
}

/**
 * Floating Sunday invite: campaign line, thumbnail, and visit actions.
 * Narrower and taller than a thin strip so the statement can breathe.
 */
export function ServiceCard({ variant = "inline", className }: ServiceCardProps) {
  const directions = directionsUrl();

  return (
    <Container
      width="narrow"
      className={cn(
        "relative w-full",
        variant === "floating" && "z-20 -mt-8 sm:-mt-10 lg:-mt-12",
        className,
      )}
    >
      <Reveal y={12}>
        <div className="flex min-h-[12rem] flex-col overflow-hidden rounded-card border border-navy-900/[0.07] bg-white shadow-float sm:min-h-[14rem] sm:flex-row sm:items-stretch">
          <div className="relative aspect-[16/10] w-full shrink-0 sm:aspect-auto sm:w-44 lg:w-52">
            <Image
              src={images.worshipTeam.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 13rem, (min-width: 640px) 11rem, 100vw"
              placeholder="blur"
              blurDataURL={navyBlurDataURL}
              className="object-cover object-[50%_35%]"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center gap-4 px-4 py-5 sm:gap-5 sm:px-5 sm:py-6 lg:px-6">
            <p className="max-w-xl text-[0.6875rem] font-bold uppercase leading-[1.45] tracking-[0.06em] text-navy-950 sm:text-[0.75rem] lg:text-[0.8125rem]">
              The King has been waiting for you,{" "}
              <span className="text-navy-700">
                and so has your miracle. Worship with us.
              </span>{" "}
              Each service is unique and packed with power, praise, prayer, presence and the
              prophetic.
            </p>

            <div className="flex flex-wrap items-center gap-3">
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
