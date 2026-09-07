import {
  ConnectHome,
  FinalCta,
  GiveHome,
  LocationHome,
  OurVisionHome,
  PlanVisitHome,
  WelcomeVideo,
  WhoWeAreHome,
  YouBelongHere,
} from "@/components/home/HomeStory";
import { EventsPreview } from "@/components/home/EventsPreview";
import { Hero } from "@/components/home/Hero";
import { ServiceInfo } from "@/components/home/ServiceInfo";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Royalhouse Baltimore: A Church in Baltimore, Maryland",
  description:
    "Royalhouse Baltimore is a Spirit-filled church in Baltimore, Maryland. Tuesdays at 7:00 PM and Sundays at 6:00 PM at 5411 Old Frederick Rd, Ste 11-12. You belong here.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceInfo />
      <YouBelongHere />
      <WhoWeAreHome />
      <OurVisionHome />
      <PlanVisitHome />
      <EventsPreview />
      <WelcomeVideo />
      <ConnectHome />
      <GiveHome />
      <LocationHome />
      <FinalCta />
    </>
  );
}
