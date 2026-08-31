/* ============================================================
   CONTENT MODELS
   These interfaces are the contract between the UI and whatever
   supplies the content. Today that is `src/content/*`. Tomorrow
   it can be Sanity, Payload, Strapi, WordPress or Supabase , 
   as long as the adapters in `src/lib/content.ts` return these
   shapes, no component needs to change.
   ============================================================ */

export type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export interface ServiceTime {
  /** e.g. "Sunday Celebration" */
  label: string;
  day: Weekday;
  /** Human readable, e.g. "9:00 AM". Kept as a string so the church controls formatting. */
  time: string;
  /** Optional qualifier, e.g. "Kids ministry in all services" */
  note?: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  /** Free-text query used for the map embed and directions link. */
  mapQuery: string;
  latitude?: number;
  longitude?: number;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
  whatsapp: string;
  x?: string;
}

export type GivingProvider = "stripe" | "paypal" | "tithely" | "pushpay" | "planning-center" | null;

export interface GivingFund {
  id: string;
  name: string;
  description: string;
  /** Provider-specific deep link. Empty until a provider is chosen. */
  url: string;
}

export type EventCategory =
  | "Worship"
  | "Youth"
  | "Children"
  | "Men"
  | "Women"
  | "Community"
  | "Outreach"
  | "Conference"
  | "Special";

export interface ChurchEvent {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string[];
  image: string;
  imageAlt: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  /** Optional ISO end date for multi-day events. */
  endDate?: string;
  startTime: string;
  endTime?: string;
  location: string;
  category: EventCategory;
  speaker?: string;
  registrationUrl?: string;
  featured: boolean;
  recurring?: string;
}

export interface Sermon {
  id: string;
  title: string;
  slug: string;
  speaker: string;
  series: string;
  summary: string;
  description: string[];
  thumbnail: string;
  thumbnailAlt: string;
  /** YouTube/Vimeo watch URL. Empty renders an elegant "coming soon" player state. */
  videoUrl: string;
  audioUrl?: string;
  /** ISO date string. */
  date: string;
  /** Minutes. */
  duration: number;
  scripture?: string;
  featured?: boolean;
  topics: string[];
}

export interface SermonSeries {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  current: boolean;
}

export type MinistryCategory =
  | "Worship"
  | "Next Generation"
  | "Adults"
  | "Outreach"
  | "Prayer"
  | "Serving";

export interface Ministry {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string[];
  image: string;
  imageAlt: string;
  /** Leader name, left empty until the church supplies it. */
  leader: string;
  meetingTime: string;
  meetingLocation: string;
  category: MinistryCategory;
  audience: string;
  featured?: boolean;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  /** Empty string renders the monogram placeholder card. */
  photo: string;
  bio: string;
  responsibility: string;
  email: string;
  socialLinks: Partial<SocialLinks>;
  group: "Lead" | "Pastoral" | "Ministry" | "Staff";
}

export type TestimonyCategory =
  | "Salvation"
  | "Healing"
  | "Provision"
  | "Family"
  | "Freedom"
  | "Community";

export interface Testimony {
  id: string;
  name: string;
  photo: string;
  quote: string;
  content: string[];
  category: TestimonyCategory;
  /** ISO date string. */
  date: string;
  location?: string;
  videoUrl?: string;
  /** Nothing renders unless this is true, submissions are moderated. */
  approved: boolean;
  featured: boolean;
  anonymous?: boolean;
}

export interface Belief {
  id: string;
  title: string;
  summary: string;
  scripture: string;
}

export interface Pillar {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  group: "Visit" | "Kids" | "Practical" | "Faith";
}

export interface StoryMilestone {
  id: string;
  /** Left as an empty string when the church has not supplied a year. */
  year: string;
  title: string;
  description: string;
}

export interface NextStep {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: IconName;
  /** Highlights the primary next step in the grid. */
  featured?: boolean;
}

export interface GroupItem {
  id: string;
  name: string;
  focus: string;
  cadence: string;
  neighborhood: string;
}

/** Icon names resolved through `src/components/ui/Icon.tsx` so content files stay serialisable. */
export type IconName =
  | "arrow-right"
  | "baby"
  | "book-open"
  | "calendar"
  | "car"
  | "church"
  | "clock"
  | "compass"
  | "gift"
  | "globe"
  | "graduation-cap"
  | "hand-heart"
  | "handshake"
  | "heart"
  | "home"
  | "map-pin"
  | "megaphone"
  | "message-circle"
  | "mic"
  | "music"
  | "play"
  | "sparkles"
  | "sprout"
  | "sunrise"
  | "users"
  | "user-plus"
  | "accessibility"
  | "shirt"
  | "hands-praying"
  | "video";

export interface SubmissionResult {
  ok: boolean;
  message: string;
  /** Field-level errors keyed by input name. */
  errors?: Record<string, string[]>;
}
