import type { Address, ServiceTime, SocialLinks } from "@/types";

/* ============================================================
   ROYALHOUSE BALTIMORE, CHURCH CONFIGURATION
   ------------------------------------------------------------
   Single source of truth for factual church information.
   Nothing here is invented. Empty strings stay empty until
   the church supplies the missing detail.
   ============================================================ */

const PENDING = "" as const;

export interface VisionPillar {
  title: string;
  intro: string;
  points: string[];
}

export interface ServeTeam {
  id: string;
  name: string;
  areas: string[];
}

export interface ChurchConfig {
  name: string;
  shortName: string;
  domain: string;
  network: string;
  campusOf: string;
  headquarters: string;
  city: string;
  region: string;
  regionCode: string;
  tagline: string;
  statement: string;
  belongingLine: string;
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
    zelleEmail: string;
    onlineUrl: string;
    textToGiveNumber: string;
    mailingInstructions: string;
  };
  visit: {
    parking: string;
    arrival: string;
    dressCode: string;
    serviceLength: string;
    accessibility: string;
    children: string;
    childrenAges: string;
    serviceIncludes: string[];
  };
  identity: string[];
  vision: VisionPillar[];
  livestream: {
    enabled: boolean;
    youtubeUrl: string;
  };
  welcomeVideoUrl: string;
  forms: {
    connectUrl: string;
    serveUrl: string;
  };
  serveTeams: ServeTeam[];
}

export const churchConfig: ChurchConfig = {
  name: "Royalhouse Baltimore",
  shortName: "Royalhouse",
  domain: "royalhousebaltimore.org",
  network: "Royalhouse Chapel International",
  campusOf: "Royalhouse Chapel Maryland Mission",
  headquarters: "Accra, Ghana",
  city: "Baltimore",
  region: "Maryland",
  regionCode: "MD",
  tagline: "Touching Our Generation With the Power of God",
  belongingLine: "You belong here.",
  statement:
    "Royalhouse Baltimore is a passionate, Spirit-filled community devoted to prayer and fasting, praise and worship, study and confession of God's Word, and genuine fellowship.",

  address: {
    line1: "5411 Old Frederick Rd",
    line2: "Ste 11-12",
    city: "Baltimore",
    region: "Maryland",
    postalCode: "21229",
    country: "United States",
    mapQuery: "5411 Old Frederick Rd, Ste 11-12, Baltimore, MD 21229",
  },

  serviceTimes: [
    { label: "Tuesday Gathering", day: "Tuesday", time: "7:00 PM" },
    { label: "Sunday Gathering", day: "Sunday", time: "6:00 PM" },
  ],

  contact: {
    phone: "(301) 437-9441",
    email: "baltimore@royalhousemd.org",
    prayerEmail: PENDING,
    officeHours: [],
  },

  social: {
    instagram: "https://www.instagram.com/royalhousebaltimore",
    facebook: PENDING,
    youtube: PENDING,
    tiktok: "https://www.tiktok.com/@royalhousebaltimore",
    whatsapp: PENDING,
  },

  giving: {
    zelleEmail: "royalhousebal@gmail.com",
    onlineUrl: PENDING,
    textToGiveNumber: PENDING,
    mailingInstructions: PENDING,
  },

  visit: {
    parking: PENDING,
    arrival: PENDING,
    dressCode:
      "Some people dress casually while others prefer dressing up a little. Everyone is welcome.",
    serviceLength: "Approximately 90 minutes.",
    accessibility: PENDING,
    children: "Kids Church is available for ages 2–11.",
    childrenAges: "2–11",
    serviceIncludes: [
      "Praise and worship",
      "Bible-based message",
      "Prayer and reflection",
      "Fellowship before and after the service",
    ],
  },

  identity: [
    "Prayer and fasting",
    "Praise and worship",
    "Study and confession of God's Word",
    "Genuine fellowship",
  ],

  vision: [
    {
      title: "Bring people into God's presence",
      intro: "Through",
      points: ["Prayer", "Praise", "Worship"],
    },
    {
      title: "Preach messages of hope",
      intro: "Relevant to people's",
      points: ["Physical needs", "Spiritual needs"],
    },
    {
      title: "Create an atmosphere of love",
      intro: "Through",
      points: ["Sharing", "Caring", "Fellowship"],
    },
  ],

  livestream: {
    enabled: false,
    youtubeUrl: PENDING,
  },

  welcomeVideoUrl: PENDING,

  forms: {
    connectUrl:
      process.env.NEXT_PUBLIC_CONNECT_FORM_URL?.trim() ||
      "https://docs.google.com/forms/d/1nkMQQOOzXHjToZYofo8MfkJoLGC2_cfE5MDBmdPQyRo/viewform",
    serveUrl:
      process.env.NEXT_PUBLIC_SERVE_FORM_URL?.trim() ||
      "https://docs.google.com/forms/d/1nkMQQOOzXHjToZYofo8MfkJoLGC2_cfE5MDBmdPQyRo/viewform",
  },

  serveTeams: [
    { id: "worship", name: "Worship Team", areas: ["Musicians"] },
    { id: "kids", name: "Kids Church", areas: [] },
    {
      id: "connection",
      name: "Connection Team",
      areas: [],
    },
    {
      id: "media",
      name: "Media Team",
      areas: ["Video", "Photography", "Sound", "Projection", "Web", "Social Media"],
    },
    { id: "pillars", name: "Pillars For Christ", areas: ["Intercessory Prayer"] },
    {
      id: "hospitality",
      name: "Hospitality",
      areas: ["Guest Services", "Ushers"],
    },
    { id: "watch-tower", name: "Watch Tower / Security", areas: [] },
    {
      id: "facilities",
      name: "Facilities Management",
      areas: ["Maintenance", "Cleaning"],
    },
  ],
};

export const churchStatus = {
  hasAddress: churchConfig.address.line1.trim().length > 0,
  hasServiceTimes: churchConfig.serviceTimes.length > 0,
  hasPhone: churchConfig.contact.phone.trim().length > 0,
  hasEmail: churchConfig.contact.email.trim().length > 0,
  hasGiving: churchConfig.giving.zelleEmail.trim().length > 0,
  hasZelle: churchConfig.giving.zelleEmail.trim().length > 0,
  hasSocial: Object.values(churchConfig.social).some((url) => (url ?? "").trim().length > 0),
  hasWelcomeVideo: churchConfig.welcomeVideoUrl.trim().length > 0,
  hasLivestream: churchConfig.livestream.enabled && churchConfig.livestream.youtubeUrl.trim().length > 0,
} as const;
