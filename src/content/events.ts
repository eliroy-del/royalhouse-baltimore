import { images } from "@/config/images";
import type { ChurchEvent } from "@/types";

export const events: ChurchEvent[] = [
  {
    id: "thanksgiving-social",
    title: "Thanksgiving Social",
    slug: "thanksgiving-social",
    summary:
      "Food. Fun. Faith. Fellowship. Free and open to everyone—registration required by November 15.",
    description: [
      "Thanksgiving is better with good food, good people, and good vibes.",
      "Come hang out, meet new people, enjoy a Thanksgiving dinner, play some games, take some pictures, listen to some music, and experience the kind of community where you can actually feel at home.",
      "Bring your friends. Bring your family. Come solo. Either way, come ready to have a good time.",
      "What's happening: Thanksgiving dinner, music, meet new people, games, photo moments, a short moment of prayer, and community connection.",
      "Free and open to everyone. Whether you're a Baltimore local, a college student, new to the area, or just looking for something different to do that night, you've got a seat at the table.",
      "Come for the food. Stay for the people.",
    ],
    image: images.thanksgivingSocial2026.src,
    imageAlt: images.thanksgivingSocial2026.alt,
    heroImage: images.eventBlueTexture.src,
    heroImageAlt: images.eventBlueTexture.alt,
    date: "2026-11-24",
    startTime: "7:00 PM",
    location: "5411 Old Frederick Rd, Ste 11-12, Baltimore, MD 21229",
    category: "Community",
    featured: true,
    registrationUrl: "https://forms.gle/M7gmj55QXwYk1U9z7",
  },
  {
    id: "power-sundays-2026",
    title: "Power Sundays",
    slug: "power-sundays",
    summary:
      "Sunday, November 22 at 6:00 PM with Pastor RichieO and Apostle Emmanuel Agormeda.",
    description: [
      "Join us for Power Sundays on Sunday, November 22 at 6:00 PM.",
      "Pastor RichieO, Lead Pastor of RCI Baltimore, and Apostle Emmanuel Agormeda, Head of Missions, North America.",
      "5411 Old Frederick Rd, Ste 11, Baltimore, MD 21229. Contact: (443) 313-9442.",
    ],
    image: images.powerSundays2026.src,
    imageAlt: images.powerSundays2026.alt,
    heroImage: images.eventBlueTexture.src,
    heroImageAlt: images.eventBlueTexture.alt,
    date: "2026-11-22",
    startTime: "6:00 PM",
    location: "5411 Old Frederick Rd, Ste 11, Baltimore, MD 21229",
    category: "Special",
    speaker: "Pastor RichieO and Apostle Emmanuel Agormeda",
    featured: false,
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
