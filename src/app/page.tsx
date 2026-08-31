import { BaltimoreSection } from "@/components/home/BaltimoreSection";
import { BelongSection } from "@/components/home/BelongSection";
import { EventsPreview } from "@/components/home/EventsPreview";
import { GivingInvite } from "@/components/home/GivingInvite";
import { Hero } from "@/components/home/Hero";
import { LatestMessage } from "@/components/home/LatestMessage";
import { MinistriesPreview } from "@/components/home/MinistriesPreview";
import { OurHeartSection } from "@/components/home/OurHeartSection";
import { PlanVisitInvite } from "@/components/home/PlanVisitInvite";
import { PrayerInvite } from "@/components/home/PrayerInvite";
import { TestimoniesPreview } from "@/components/home/TestimoniesPreview";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Royalhouse Baltimore — A Church in Baltimore, Maryland",
  description:
    "A Spirit-filled church family in Baltimore, Maryland. Come as you are to worship Jesus, grow in faith and find your people. Plan your visit, watch live or request prayer.",
  path: "/",
});

/**
 * The homepage is written as a twelve-chapter journey: welcome, gather,
 * belong, believe, happen, hear, connect, city, witness, pray, give, visit.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCard variant="floating" />
      <BelongSection />
      <OurHeartSection />
      <EventsPreview />
      <LatestMessage />
      <MinistriesPreview />
      <BaltimoreSection />
      <TestimoniesPreview />
      <PrayerInvite />
      <GivingInvite />
      <PlanVisitInvite />
    </>
  );
}
