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
  intro?: string;
  children?: NavChild[];
}

export const primaryNav: NavItem[] = [
  {
    label: "About",
    href: "/about/who-we-are",
    intro: "Who we are, who leads us, and how we belong to the Royalhouse family.",
    children: [
      {
        label: "Who We Are",
        href: "/about/who-we-are",
        description: "Our identity, vision and place in Royalhouse Chapel International.",
        icon: "heart",
      },
      {
        label: "Our Senior Pastor",
        href: "/about/our-senior-pastor",
        description: "Meet Pastor RichieO, Lead Pastor of Royalhouse Baltimore.",
        icon: "users",
      },
      {
        label: "Our North American Missions Lead",
        href: "/about/our-north-american-missions-lead",
        description: "Meet Apostle Emmanuel Agormeda.",
        icon: "globe",
      },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export const mobileNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/who-we-are" },
  { label: "Plan a Visit", href: "/plan-a-visit" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "Serve", href: "/serve" },
  { label: "Prayer", href: "/prayer" },
] as const;

export const footerNav: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "/about/who-we-are" },
      { label: "Events", href: "/events" },
      { label: "Contact", href: "/contact" },
      { label: "Plan a Visit", href: "/plan-a-visit" },
      { label: "Serve", href: "/serve" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Connect", href: "/contact" },
      { label: "Instagram", href: "https://www.instagram.com/royalhousebaltimore" },
      { label: "TikTok", href: "https://www.tiktok.com/@royalhousebaltimore" },
      { label: "Request Prayer", href: "/prayer" },
    ],
  },
  {
    title: "Give",
    links: [
      { label: "Give", href: "/give" },
      { label: "Zelle", href: "/give" },
    ],
  },
];

export const legalNav = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
] as const;
