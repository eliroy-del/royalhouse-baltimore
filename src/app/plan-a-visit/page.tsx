import Image from "next/image";
import Link from "next/link";
import { PlanVisitForm } from "@/components/forms/PlanVisitForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { churchConfig } from "@/config/church";
import { images, navyBlurDataURL } from "@/config/images";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plan a Visit",
  description:
    "We can't wait to see you at Royalhouse Baltimore. Find service times, location, what to expect for kids, what to wear, and tell us you're coming.",
  path: "/plan-a-visit",
  image: images.welcomeLobby.src,
});

export default function PlanAVisitPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Plan a Visit", path: "/plan-a-visit" },
        ])}
      />

      <PageHero
        title="New here? We'd love to meet you."
        lede="You don't need to know anyone. You don't need to dress a certain way. You don't need to have everything figured out. Just come. We'll take it from there."
        image={images.welcomeHome}
        objectPosition="50% 40%"
        breadcrumb={[{ label: "Plan a Visit" }]}
        size="lg"
        actions={
          <Button asChild variant="gold" size="lg">
            <a href="#form">Plan My Visit</a>
          </Button>
        }
      />

      <Section tone="cream" spacing="sm" id="when">
        <Container>
          <ul className="grid gap-3 lg:grid-cols-3">
            {churchConfig.serviceTimes.map((service) => (
              <li key={service.label} className="rounded-card border border-navy-900/10 bg-white p-4">
                <p className="font-display text-xl text-navy-900 sm:text-2xl">{service.day}</p>
                <p className="mt-1 text-navy-900/70">{service.time}</p>
                {service.note ? (
                  <p className="mt-2 text-[0.875rem] text-navy-900/60">{service.note}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white" spacing="sm" id="children">
        <Container>
          <div className="grid items-start gap-5 lg:grid-cols-2 lg:gap-8">
            <Reveal y={18}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-navy-900">
                <Image
                  src={images.ministryKids.src}
                  alt={images.ministryKids.alt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  placeholder="blur"
                  blurDataURL={navyBlurDataURL}
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.375rem)] font-semibold leading-tight text-navy-900">
                Children&rsquo;s Ministry
              </h2>
              <div className="mt-6 space-y-6">
                {churchConfig.visit.childrenPrograms.map((program) => (
                  <div key={program.name}>
                    <p className="text-[1.1875rem] font-semibold leading-snug text-navy-900 sm:text-[1.3125rem]">
                      {program.name}
                      {program.ages !== "12+" ? (
                        <span className="font-normal text-navy-900/65"> — Ages {program.ages}</span>
                      ) : null}
                    </p>
                    <p className="mt-2 text-[1.0625rem] leading-relaxed text-navy-900/70 sm:text-[1.125rem]">
                      {program.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="mist" spacing="sm" id="wear">
        <Container>
          <div className="grid items-center gap-5 lg:grid-cols-2 lg:gap-8">
            <Reveal delay={0.06} className="lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-navy-900">
                <Image
                  src={images.baptismBw.src}
                  alt={images.baptismBw.alt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  placeholder="blur"
                  blurDataURL={navyBlurDataURL}
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal className="lg:order-1">
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.375rem)] font-semibold leading-tight text-navy-900">
                What should I wear?
              </h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-navy-900/70 sm:text-[1.125rem]">
                {churchConfig.visit.dressCode}
              </p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-navy-900/70 sm:text-[1.125rem]">
                Your presence is what matters. Dress in whatever helps you feel at ease, and walk
                through the door.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="white" spacing="sm" id="form">
        <Container width="narrow">
          <div className="mb-4 text-center">
            <h2 className="font-display text-[clamp(1.375rem,2.4vw,1.75rem)] font-semibold leading-tight text-navy-900">
              Tell us you&rsquo;re coming.
            </h2>
          </div>
          <div className="relative rounded-card border border-navy-900/[0.08] bg-cream p-3.5 sm:p-4">
            <PlanVisitForm />
          </div>
          <p className="mt-6 text-center text-[0.9375rem] text-navy-900/65">
            Prefer to message us first?{" "}
            <Link href="/contact" className="font-medium text-navy-900 underline decoration-gold-500/60">
              Contact the team
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
