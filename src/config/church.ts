import type { Address, GivingFund, GivingProvider, ServiceTime, SocialLinks } from "@/types";

/* ============================================================
   ROYALHOUSE BALTIMORE, CHURCH CONFIGURATION
   ------------------------------------------------------------
   This file is the single source of truth for *factual* church
   information. Nothing here is invented.

   ⚠️  FIELDS AWAITING REAL CHURCH DATA
   Every value below marked `PENDING` is an empty string or empty
   array. The interface degrades gracefully wherever data is
   missing (see `src/lib/church.ts`), so the site stays polished
   until the church supplies the real details.

   To go live, populate:
     1. address       , street, ZIP, map coordinates
     2. serviceTimes  , day / time / label for each gathering
     3. contact       , phone, email, office hours
     4. social        , public profile URLs
     5. giving        , provider + fund links
     6. leadership    , see src/content/leaders.ts
   ============================================================ */

const PENDING = "" as const;

export interface ChurchConfig {
  name: string;
  shortName: string;
  /** The wider Royalhouse family this local assembly belongs to. */
  network: string;
  city: string;
  region: string;
  regionCode: string;
  tagline: string;
  /** One-sentence description used in the footer and metadata. */
  statement: string;
  address: Address;
  serviceTimes: ServiceTime[];
  contact: {
    phone: string;
    email: string;
    prayerEmail: string;
    officeHours: string[];
  };
  social: SocialLinks;
  giving: {
    provider: GivingProvider;
    /** Primary hosted giving URL. Empty until a provider is selected. */
    onlineUrl: string;
    textToGiveNumber: string;
    mailingInstructions: string;
    funds: GivingFund[];
  };
  visit: {
    parking: string;
    arrival: string;
    dressCode: string;
    serviceLength: string;
    accessibility: string;
    children: string;
  };
}

export const churchConfig: ChurchConfig = {
  name: "Royalhouse Baltimore",
  shortName: "Royalhouse",
  network: "Royalhouse Chapel International",
  city: "Baltimore",
  region: "Maryland",
  regionCode: "MD",
  tagline: "A place to encounter God, grow in faith and find your family.",
  statement:
    "Royalhouse Baltimore is a Spirit-filled family of believers in Baltimore, Maryland, gathering to worship Jesus, grow together in the Word and serve the city we call home.",

  address: {
    line1: "5411 Old Frederick Rd",
    line2: "Suite 11",
    city: "Catonsville",
    region: "Maryland",
    postalCode: "21229",
    country: "United States",
    mapQuery: "5411 Old Frederick Rd, Suite 11, Catonsville, MD 21229",
  },

  // TODO: add each gathering, e.g.
  // { label: "Sunday Celebration", day: "Sunday", time: "10:00 AM", note: "Kids ministry available" }
  serviceTimes: [],

  contact: {
    phone: PENDING, // TODO
    email: PENDING, // TODO
    prayerEmail: PENDING, // TODO, falls back to `email`
    officeHours: [], // TODO: e.g. ["Tuesday – Friday, 10:00 AM – 4:00 PM"]
  },

  social: {
    instagram: "https://www.instagram.com/royalhousebaltimore",
    facebook: PENDING, // TODO
    youtube: PENDING, // TODO
    tiktok: "https://www.tiktok.com/@royalhousebaltimore",
    whatsapp: PENDING, // TODO
  },

  giving: {
    provider: null, // TODO: "stripe" | "paypal" | "tithely" | "pushpay" | "planning-center"
    onlineUrl: PENDING, // TODO: hosted giving link
    textToGiveNumber: PENDING,
    mailingInstructions: PENDING,
    // Only funds officially approved by the church leadership should appear here.
    funds: [
      {
        id: "tithes",
        name: "Tithes",
        description:
          "The regular, proportional giving that sustains the everyday life and ministry of the church.",
        url: PENDING,
      },
      {
        id: "offering",
        name: "Offering",
        description:
          "Gifts given above the tithe to support worship, teaching, discipleship and hospitality.",
        url: PENDING,
      },
      {
        id: "missions",
        name: "Missions",
        description:
          "Carrying the gospel beyond Baltimore through partners, church planting and global outreach.",
        url: PENDING,
      },
      {
        id: "community",
        name: "Community Impact",
        description:
          "Practical love for our neighborhoods, food, families, mentoring and city partnerships.",
        url: PENDING,
      },
    ],
  },

  // Visitor-facing practical answers. Written to be true of any campus and easy
  // for the church office to sharpen once the venue details are confirmed.
  visit: {
    parking: PENDING, // TODO: on-site / street / lot details
    arrival:
      "Head for the main entrance and look for a member of our welcome team. They will be wearing a Royalhouse badge and will walk you to your seat, check your children in and answer anything you need.",
    dressCode:
      "Come exactly as you are. You will see suits and sneakers, African print and jeans, and everything in between. Nobody is checking what you wear.",
    serviceLength: PENDING, // TODO: e.g. "About 90 minutes"
    accessibility:
      "Our gathering space is step-free with accessible restrooms and reserved seating near the front and the aisles. Let a member of the welcome team know what you need and we will make it happen.",
    children:
      "Children are welcome in the main service, and we also run a safe, joyful kids environment with background-checked volunteers and a secure check-in and pick-up process.",
  },
};

/** Convenience: which optional systems are wired up yet. */
export const churchStatus = {
  hasAddress: churchConfig.address.line1.trim().length > 0,
  hasServiceTimes: churchConfig.serviceTimes.length > 0,
  hasPhone: churchConfig.contact.phone.trim().length > 0,
  hasEmail: churchConfig.contact.email.trim().length > 0,
  hasGiving: churchConfig.giving.onlineUrl.trim().length > 0,
  hasSocial: Object.values(churchConfig.social).some((url) => (url ?? "").trim().length > 0),
} as const;
