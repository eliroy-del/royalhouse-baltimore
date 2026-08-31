import type { IconName } from "@/types";

export interface NavChild {
  label: string;
  href: string;
  description: string;
  icon: IconName;
}

export interface NavItem {
  label: string;
  href: string;
  /** Short line shown at the top of the desktop dropdown panel. */
  intro?: string;
  children?: NavChild[];
}

/**
 * Primary navigation. Six top-level destinations keep the mental model simple;
 * everything else lives one level down inside an animated panel.
 */
export const primaryNav: NavItem[] = [
  {
    label: "Plan a Visit",
    href: "/plan-a-visit",
    intro: "Everything you need before your first Sunday with us.",
    children: [
      {
        label: "Service Times",
        href: "/plan-a-visit#when",
        description: "When we gather and what the rhythm of a Sunday looks like.",
        icon: "clock",
      },
      {
        label: "What to Expect",
        href: "/plan-a-visit#expect",
        description: "Worship, teaching, prayer and people from start to finish.",
        icon: "compass",
      },
      {
        label: "Location & Parking",
        href: "/plan-a-visit#where",
        description: "How to find us and where to leave the car.",
        icon: "map-pin",
      },
      {
        label: "Children's Ministry",
        href: "/plan-a-visit#children",
        description: "Safe, joyful environments for every age.",
        icon: "baby",
      },
      {
        label: "Accessibility",
        href: "/plan-a-visit#accessibility",
        description: "Step-free access, seating and support.",
        icon: "accessibility",
      },
      {
        label: "Questions",
        href: "/plan-a-visit#faq",
        description: "The honest answers to what people ask us most.",
        icon: "message-circle",
      },
    ],
  },
  {
    label: "Connect",
    href: "/connect",
    intro: "Find your people and your next step.",
    children: [
      {
        label: "I'm New Here",
        href: "/connect#new",
        description: "Start here if this is your first time.",
        icon: "user-plus",
      },
      {
        label: "Ministries",
        href: "/ministries",
        description: "Where the life of the church actually happens.",
        icon: "users",
      },
      {
        label: "Groups",
        href: "/connect#groups",
        description: "Smaller circles across Baltimore, midweek.",
        icon: "home",
      },
      {
        label: "Request Prayer",
        href: "/prayer",
        description: "Our team will pray with you this week, in confidence.",
        icon: "hands-praying",
      },
      {
        label: "Testimonies",
        href: "/testimonies",
        description: "Look what God has done.",
        icon: "sparkles",
      },
      {
        label: "Serve",
        href: "/connect#serve",
        description: "Use your gifts on a team.",
        icon: "handshake",
      },
      {
        label: "Membership",
        href: "/connect#membership",
        description: "Put down roots and belong here on purpose.",
        icon: "church",
      },
      {
        label: "Get Baptized",
        href: "/connect#baptism",
        description: "Take the next step of obedience publicly.",
        icon: "sprout",
      },
    ],
  },
  {
    label: "Our Heart",
    href: "/our-heart",
    intro: "Who we are, what we believe and why we exist.",
    children: [
      {
        label: "Who We Are",
        href: "/our-heart#who",
        description: "The heartbeat of Royalhouse Baltimore.",
        icon: "heart",
      },
      {
        label: "Mission & Vision",
        href: "/our-heart#mission",
        description: "Where we are going and why.",
        icon: "compass",
      },
      {
        label: "Our Beliefs",
        href: "/our-heart#beliefs",
        description: "The convictions that shape everything we do.",
        icon: "book-open",
      },
      {
        label: "Our Story",
        href: "/our-heart#story",
        description: "How this church came to Baltimore.",
        icon: "sunrise",
      },
      {
        label: "Leadership",
        href: "/leadership",
        description: "Meet the people who serve and shepherd.",
        icon: "users",
      },
      {
        label: "Community Impact",
        href: "/our-heart#community",
        description: "Loving Baltimore in practical ways.",
        icon: "hand-heart",
      },
    ],
  },
  { label: "Give", href: "/give" },
  { label: "Contact", href: "/contact" },
];

/** Condensed list used by the mobile sheet and the footer's primary column. */
export const mobileNav = [
  { label: "Home", href: "/" },
  { label: "Plan a Visit", href: "/plan-a-visit" },
  { label: "Connect", href: "/connect" },
  { label: "Our Heart", href: "/our-heart" },
  { label: "Messages", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Give", href: "/give" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Visit",
    links: [
      { label: "Plan a Visit", href: "/plan-a-visit" },
      { label: "Children's Ministry", href: "/plan-a-visit#children" },
      { label: "What to Wear", href: "/plan-a-visit#wear" },
      { label: "Visiting Form", href: "/plan-a-visit#form" },
      { label: "Location", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "I'm New Here", href: "/connect#new" },
      { label: "Ministries", href: "/ministries" },
      { label: "Groups", href: "/connect#groups" },
      { label: "Serve", href: "/connect#serve" },
      { label: "Request Prayer", href: "/prayer" },
      { label: "Share a Testimony", href: "/testimonies#share" },
    ],
  },
  {
    title: "Our Heart",
    links: [
      { label: "Who We Are", href: "/our-heart#who" },
      { label: "Mission & Vision", href: "/our-heart#mission" },
      { label: "Our Beliefs", href: "/our-heart#beliefs" },
      { label: "Our Story", href: "/our-heart#story" },
      { label: "Leadership", href: "/leadership" },
      { label: "Community Impact", href: "/our-heart#community" },
    ],
  },
  {
    title: "Messages & Give",
    links: [
      { label: "Messages", href: "/sermons" },
      { label: "Events", href: "/events" },
      { label: "Give", href: "/give" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
] as const;
