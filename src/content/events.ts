import { images } from "@/config/images";
import type { ChurchEvent } from "@/types";

export const events: ChurchEvent[] = [
  {
    id: "thanksgiving-social",
    title: "Thanksgiving Social",
    slug: "thanksgiving-social",
    summary: "Join Royalhouse Baltimore for our Thanksgiving Social.",
    description: [
      "Join us for the Thanksgiving Social on Tuesday, November 24th at 7:00 PM.",
      "A flyer will be shared here when it is available.",
    ],
    image: images.welcomeHome.src,
    imageAlt: images.welcomeHome.alt,
    date: "2026-11-24",
    startTime: "7:00 PM",
    location: "5411 Old Frederick Rd, Ste 11-12, Baltimore, MD 21229",
    category: "Community",
    featured: true,
  },
];

export const eventCategories = [
  "All",
  "Worship",
  "Youth",
  "Children",
  "Men",
  "Women",
  "Community",
  "Outreach",
  "Conference",
  "Special",
] as const;
