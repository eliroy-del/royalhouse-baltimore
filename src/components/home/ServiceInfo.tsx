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
        <div className="overflow-hidden rounded-media shadow-float lg:grid lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)]">
          <div className="bg-navy-950 px-6 py-8 sm:px-8 sm:py-9">
            <div className="grid gap-7 sm:grid-cols-3 sm:gap-0">
              {churchConfig.serviceTimes.map((service, index) => (
                <div
                  key={service.label}
                  className={
                    index > 0
                      ? "min-w-0 border-t border-white/25 pt-7 sm:border-l sm:border-t-0 sm:px-6 sm:pt-0 lg:px-7"
                      : "min-w-0 sm:pr-6 lg:pr-7"
                  }
                >
                  {service.phase ? (
                    <p className="text-[0.875rem] font-semibold uppercase tracking-[0.06em] text-gold-300 sm:text-[0.9375rem]">
                      {service.phase}
                    </p>
                  ) : null}
                  <p className="mt-2 font-display text-[clamp(1.125rem,2vw,1.375rem)] font-semibold leading-snug text-white">
                    {service.day}
                  </p>
                  <p className="mt-1 text-[1.0625rem] font-medium text-white/85">{service.time}</p>
                  {service.note ? (
                    <p className="mt-2 text-[0.8125rem] leading-snug text-white/60">{service.note}</p>
                  ) : null}
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
