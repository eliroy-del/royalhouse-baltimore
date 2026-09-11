import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { churchConfig } from "@/config/church";
import { addressLines, directionsUrl } from "@/lib/church";

export function ServiceInfo() {
  const directions = directionsUrl();
  const address = addressLines();

  return (
    <section className="relative z-10 -mt-10 px-4 sm:-mt-14">
      <Container>
        <h2 className="sr-only">Gathering times and location</h2>
        <div className="overflow-hidden rounded-media shadow-float lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.85fr)]">
          <div className="bg-navy-950 px-6 py-8 sm:px-8 sm:py-9">
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
              {churchConfig.serviceTimes.map((service, index) => (
                <div
                  key={service.day}
                  className={
                    index > 0
                      ? "border-t border-white/15 pt-8 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0"
                      : undefined
                  }
                >
                  <p className="text-[0.8125rem] font-medium text-white/70">{service.day}s</p>
                  <p className="mt-2 font-display text-[clamp(2.25rem,4.5vw,3.25rem)] leading-none tracking-[-0.03em] text-white">
                    {service.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center bg-gold-400 px-6 py-8 sm:px-8 sm:py-9">
            <address className="not-italic">
              {address.map((line) => (
                <p
                  key={line}
                  className="font-display text-[1.15rem] leading-snug text-navy-950 sm:text-[1.25rem]"
                >
                  {line}
                </p>
              ))}
            </address>
            {directions ? (
              <Button
                asChild
                variant="primary"
                size="md"
                className="mt-6 w-fit hover:bg-white hover:text-navy-950"
              >
                <Link href={directions} target="_blank" rel="noreferrer noopener">
                  Get Directions
                  <Icon
                    name="arrow-right"
                    className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
