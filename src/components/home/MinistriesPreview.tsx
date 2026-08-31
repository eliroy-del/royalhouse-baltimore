import Link from "next/link";
import { MinistryCard } from "@/components/cards/MinistryCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GridFillers } from "@/components/ui/GridFillers";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedMinistries, getGroups } from "@/lib/content";

export async function MinistriesPreview() {
  const ministries = await getFeaturedMinistries(4);
  const groups = (await getGroups()).slice(0, 4);

  return (
    <Section tone="cream" spacing="md" id="ministries">
      <Container>
        <SectionHeading
          chapter="07"
          eyebrow="Find Your People"
          title="A church this size is only ever as warm as its smaller rooms."
          lede="Sunday is where we gather. Ministries and groups are where you are actually known — by name, by story, by the thing you are praying about this week."
          actions={
            <Button asChild size="lg">
              <Link href="/ministries">
                Explore Ministries
                <Icon
                  name="arrow-right"
                  className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Link>
            </Button>
          }
        />

        <Stagger className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {ministries.map((ministry, index) => (
            <StaggerItem key={ministry.id}>
              <MinistryCard
                ministry={ministry}
                variant={index === 0 ? "tall" : "default"}
                className={index === 0 ? "sm:min-h-[14rem] xl:min-h-[15rem]" : "xl:min-h-[15rem]"}
              />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Groups: the honest, unglamorous engine of belonging */}
        <Reveal y={24}>
          <div className="mt-6 overflow-hidden rounded-media border border-navy-900/[0.08] bg-white">
            <div className="grid lg:grid-cols-[minmax(0,20rem)_1fr]">
              <div className="flex flex-col justify-center gap-4 border-b border-navy-900/[0.07] p-5 lg:border-b-0 lg:border-r lg:p-6">
                <p className="eyebrow text-gold-800">Groups Across Baltimore</p>
                <h3 className="font-display text-[1.75rem] leading-tight text-navy-900">
                  Midweek, in homes, around real tables.
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-navy-900/65">
                  Six to twelve people, one open Bible, and the kind of honesty that only happens
                  away from a stage.
                </p>
                <Button asChild variant="outline" size="md" className="mt-1 self-start">
                  <Link href="/connect#groups">Find a group</Link>
                </Button>
              </div>

              <ul className="grid gap-px bg-navy-900/[0.07] sm:grid-cols-2">
                {groups.map((group) => (
                  <li key={group.id} className="bg-white p-5">
                    <p className="text-[0.9375rem] font-semibold text-navy-900">{group.name}</p>
                    <p className="mt-1.5 text-[0.875rem] leading-relaxed text-navy-900/65">
                      {group.focus}
                    </p>
                    <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.75rem] text-navy-900/65">
                      <span className="flex items-center gap-1.5">
                        <Icon name="clock" className="size-3.5 text-gold-600" />
                        {group.cadence}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Icon name="map-pin" className="size-3.5 text-gold-600" />
                        {group.neighborhood}
                      </span>
                    </p>
                  </li>
                ))}
                <GridFillers count={groups.length} columns={{ sm: 2 }} as="li" />
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
