import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { images, navyBlurDataURL } from "@/config/images";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  /** `floating` overlaps the section above it, used under the hero. */
  variant?: "floating" | "inline";
  className?: string;
}

/**
 * Floating Sunday invite: campaign line beside a thumbnail.
 * Narrower and taller than a thin strip so the statement can breathe.
 */
export function ServiceCard({ variant = "inline", className }: ServiceCardProps) {
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

          <div className="flex flex-1 flex-col justify-center px-4 py-5 sm:px-5 sm:py-6 lg:px-6">
            <p className="max-w-xl text-[0.875rem] font-bold uppercase leading-[1.4] tracking-[0.05em] text-navy-950 sm:text-[1rem] lg:text-[1.0625rem]">
              The King has been waiting for you, and so has your miracle. Worship with us. Each
              service is unique and packed with power, praise, prayer, presence and the prophetic.
            </p>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
