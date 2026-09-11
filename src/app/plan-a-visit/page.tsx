import Image from "next/image";
import { PlanVisitForm } from "@/components/forms/PlanVisitForm";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
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

/**
 * Warm, simple first-visit page modeled on a clear welcome flow:
 * invitation → kids → dress → form.
 * @see https://www.livingdestiny.org/plan-a-visit
 */
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
        title="Planning your first visit? Here's what you need to know."
        image={images.welcomeHome}
        objectPosition="50% 40%"
        breadcrumb={[{ label: "Plan a Visit" }]}
        size="lg"
      />

      <Section tone="cream" spacing="sm" id="when">
        <Container>
          <p className="eyebrow text-gold-800">Service Times</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {churchConfig.serviceTimes.map((service) => (
              <li key={service.day} className="rounded-card border border-navy-900/10 bg-white p-4">
                <p className="font-display text-2xl text-navy-900">{service.day}</p>
                <p className="mt-1 text-navy-900/70">{service.time}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.9375rem] text-navy-900/70">
            {churchConfig.address.line1}, {churchConfig.address.line2}, {churchConfig.address.city},{" "}
            {churchConfig.regionCode} {churchConfig.address.postalCode}
          </p>
          <p className="mt-2 text-[0.9375rem] text-navy-900/70">
            Service length: {churchConfig.visit.serviceLength}
          </p>
          <ul className="mt-3 flex flex-col gap-1 text-[0.9375rem] text-navy-900/70">
            {churchConfig.visit.serviceIncludes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Children */}
      <Section tone="white" spacing="sm" id="children">
        <Container>
          <div className="grid items-center gap-5 lg:grid-cols-2 lg:gap-8">
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
              <p className="eyebrow text-gold-800">For Families</p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-light leading-tight text-navy-900">
                Are there services for my children?
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/70">
                {churchConfig.visit.children}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What to wear */}
      <Section tone="mist" spacing="sm" id="wear">
        <Container>
          <div className="grid items-center gap-5 lg:grid-cols-2 lg:gap-8">
            <Reveal delay={0.06} className="lg:order-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-navy-900">
                <Image
                  src={images.baptism.src}
                  alt={images.baptism.alt}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  placeholder="blur"
                  blurDataURL={navyBlurDataURL}
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal className="lg:order-1">
              <p className="eyebrow text-gold-800">Come As You Are</p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,2.8vw,2rem)] font-light leading-tight text-navy-900">
                What should I wear?
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/70">
                {churchConfig.visit.dressCode}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-900/70">
                Your presence is what matters. Dress in whatever helps you feel at ease, and walk
                through the door.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Visiting form */}
      <Section tone="white" spacing="sm" id="form">
        <Container width="narrow">
          <div className="mb-4 text-center">
            <p className="eyebrow text-gold-800">Visiting Form</p>
            <h2 className="mt-1.5 font-display text-[clamp(1.375rem,2.4vw,1.75rem)] font-light leading-tight text-navy-900">
              Tell us you&rsquo;re coming.
            </h2>
          </div>
          <div className="rounded-card border border-navy-900/[0.08] bg-cream p-3.5 sm:p-4">
            <PlanVisitForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
