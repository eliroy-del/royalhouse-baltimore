/* ============================================================
   IMAGE REGISTRY
   ------------------------------------------------------------
   Every photograph on the site is referenced through this map,
   so the church can swap in its own photography by replacing the
   files in /public/images (or by pointing `src` at a CMS URL)
   without touching a single component.

   The current set is placeholder art direction: warm, editorial,
   multigenerational, Baltimore-aware. Replace with real
   Royalhouse Baltimore photography before launch.
   ============================================================ */

export interface ImageAsset {
  src: string;
  alt: string;
}

export const images = {
  heroWorship: {
    src: "/images/hero-worship.jpg",
    alt: "A multigenerational congregation standing with hands raised in worship as warm stage light streams over them",
  },
  welcomeLobby: {
    src: "/images/welcome-lobby.jpg",
    alt: "A member of the welcome team smiling as she hands a welcome card to a young family in the church foyer",
  },
  prayerCircle: {
    src: "/images/prayer-circle.jpg",
    alt: "A small group of adults standing in a circle with hands on one another's shoulders, praying together",
  },
  sermonFeatured: {
    src: "/images/sermon-featured.jpg",
    alt: "A pastor preaching from an open Bible under warm stage lighting",
  },
  baltimoreCity: {
    src: "/images/baltimore-city.jpg",
    alt: "Baltimore rowhouses with marble steps at golden hour, the downtown skyline and Inner Harbor in the distance",
  },
  worshipTeam: {
    src: "/images/worship-team.jpg",
    alt: "A worship leader singing with her eyes closed while the band plays behind her",
  },
  ministryYouth: {
    src: "/images/ministry-youth.jpg",
    alt: "Teenagers and young adults laughing together in a bright church youth space, one holding an open Bible",
  },
  ministryKids: {
    src: "/images/ministry-kids.jpg",
    alt: "A volunteer reading an illustrated storybook to a circle of young children in a colorful kids ministry room",
  },
  ministryOutreach: {
    src: "/images/ministry-outreach.jpg",
    alt: "Church volunteers handing out groceries and hot meals to neighbours on a Baltimore street",
  },
  ministryWomen: {
    src: "/images/ministry-women.jpg",
    alt: "Women of different ages sitting in a circle, talking and laughing together over coffee",
  },
  ministryMen: {
    src: "/images/ministry-men.jpg",
    alt: "Men of different ages talking and laughing together over coffee in a bright church hall",
  },
  smallGroup: {
    src: "/images/small-group.jpg",
    alt: "Six adults gathered around a dining table at home with open Bibles and coffee mugs",
  },
  baptism: {
    src: "/images/baptism.jpg",
    alt: "A young woman laughing with joy as she is lifted out of the baptism pool by two pastors",
  },
  churchExteriorDusk: {
    src: "/images/church-exterior-dusk.jpg",
    alt: "A modern church building glowing warmly at dusk as people walk in and greet one another on the steps",
  },
  eventConference: {
    src: "/images/event-conference.jpg",
    alt: "A packed conference auditorium seen from the balcony, warm light washing over the crowd",
  },
  eventWorshipNight: {
    src: "/images/event-worship-night.jpg",
    alt: "Silhouettes of a congregation with hands raised during an evening worship night lit by hundreds of small lights",
  },
  generosity: {
    src: "/images/generosity.jpg",
    alt: "Two pairs of hands passing a simple wooden offering bowl between them",
  },
  portrait1: {
    src: "/images/portrait-1.jpg",
    alt: "Portrait of a smiling woman in a mustard blouse inside a church",
  },
  portrait2: {
    src: "/images/portrait-2.jpg",
    alt: "Portrait of a smiling young man in a denim shirt on a city street at dusk",
  },
  portrait3: {
    src: "/images/portrait-3.jpg",
    alt: "Portrait of a smiling older woman in a teal cardigan seated in a church foyer",
  },
} as const satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;

/**
 * A 12×8 navy JPEG used as the blur-up placeholder for photography on
 * dark sections, so images resolve out of brand color rather than gray.
 */
export const navyBlurDataURL =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8"><rect width="12" height="8" fill="#0b2038"/><ellipse cx="6" cy="4" rx="6" ry="3" fill="#123253" opacity="0.85"/></svg>`,
  ).toString("base64");
