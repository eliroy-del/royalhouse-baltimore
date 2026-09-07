import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { churchConfig } from "@/config/church";
import { directionsUrl, locationLine } from "@/lib/church";

export function ServiceInfo() {
  const directions = directionsUrl();

  return (
    <section className="relative z-10 -mt-10 px-4 sm:-mt-12">
      <Container>
        <div className="grid gap-4 rounded-card bg-white p-5 shadow-float sm:grid-cols-3 sm:p-6">
          {churchConfig.serviceTimes.map((service) => (
            <div key={service.day} className="text-center sm:text-left">
              <p className="eyebrow text-gold-700">{service.day}s</p>
              <p className="mt-2 font-display text-2xl text-navy-900">{service.time}</p>
            </div>
          ))}
          <div className="text-center sm:text-left">
            <p className="eyebrow text-gold-700">Location</p>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-900">{locationLine()}</p>
            {directions ? (
              <Link
                href={directions}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-navy-700 underline decoration-gold-400 underline-offset-4"
              >
                Get Directions
                <Icon name="arrow-right" className="size-3.5" />
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
