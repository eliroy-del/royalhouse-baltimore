import type { GroupItem, NextStep } from "@/types";

/* ============================================================
   CONNECT — next steps, groups and serving
   ============================================================ */

export const nextSteps: NextStep[] = [
  {
    id: "new",
    title: "I'm New Here",
    description:
      "Start with a Sunday. We will save you a seat, walk you in and answer everything you want to ask.",
    href: "/plan-a-visit",
    cta: "Plan your visit",
    icon: "user-plus",
    featured: true,
  },
  {
    id: "groups",
    title: "Join a Group",
    description:
      "Midweek circles across Baltimore where the church stops being a crowd and starts being your people.",
    href: "/connect#groups",
    cta: "Find a group",
    icon: "home",
  },
  {
    id: "prayer",
    title: "Request Prayer",
    description:
      "Send it privately and our prayer team will carry it this week. Nothing is published, nothing is shared.",
    href: "/prayer",
    cta: "Send a request",
    icon: "hands-praying",
  },
  {
    id: "serve",
    title: "Serve on a Team",
    description:
      "Doors, kids, coffee, cameras, worship, outreach. Bring what you have; we will train the rest.",
    href: "/connect#serve",
    cta: "Explore teams",
    icon: "handshake",
  },
  {
    id: "baptism",
    title: "Get Baptized",
    description:
      "Ready to go public with your faith? We will talk it through with you first, then celebrate loudly.",
    href: "/connect#baptism",
    cta: "Take the step",
    icon: "sprout",
  },
  {
    id: "membership",
    title: "Become a Member",
    description:
      "Put down roots on purpose — a short journey through who we are, what we believe and where you fit.",
    href: "/connect#membership",
    cta: "Learn about membership",
    icon: "church",
  },
  {
    id: "team",
    title: "Meet the Team",
    description: "The people who serve, teach and shepherd this church family.",
    href: "/leadership",
    cta: "Meet our leaders",
    icon: "users",
  },
  {
    id: "testimony",
    title: "Share Your Testimony",
    description:
      "God did something. Tell us about it — and help somebody else believe He will do it for them too.",
    href: "/testimonies#share",
    cta: "Tell your story",
    icon: "sparkles",
  },
];

/**
 * ⚠️ Sample groups. Neighborhoods are indicative only — replace with the
 * church's actual group directory (or connect `getGroups()` to a CMS).
 */
export const groups: GroupItem[] = [
  {
    id: "midweek-bible",
    name: "Midweek Bible Study",
    focus: "Working through a book of the Bible together, slowly and honestly.",
    cadence: "Weekly, evenings",
    neighborhood: "Central Baltimore",
  },
  {
    id: "young-adults",
    name: "Young Adults Circle",
    focus: "Faith, work and figuring out your twenties without pretending.",
    cadence: "Every other week, evenings",
    neighborhood: "Downtown",
  },
  {
    id: "parents",
    name: "Parents' Table",
    focus: "Raising children in faith, with childcare and zero judgment.",
    cadence: "Monthly, weekends",
    neighborhood: "North Baltimore",
  },
  {
    id: "mens-breakfast",
    name: "Men's Breakfast",
    focus: "Early start, straight talk, real accountability.",
    cadence: "Every other week, mornings",
    neighborhood: "East Baltimore",
  },
  {
    id: "womens-study",
    name: "Women's Study",
    focus: "Scripture, mentoring and friendships across the generations.",
    cadence: "Weekly, mornings",
    neighborhood: "West Baltimore",
  },
  {
    id: "prayer-circle",
    name: "Prayer Circle",
    focus: "Intercession for the church, our families and the city.",
    cadence: "Weekly, early mornings",
    neighborhood: "Online & in person",
  },
];

export const serveTeams: { name: string; description: string }[] = [
  {
    name: "Welcome & Hospitality",
    description: "Doors, coffee, directions and warmth. The first face of the church.",
  },
  {
    name: "Kids Ministry",
    description: "Teaching, helping and playing. Screened and trained, always in pairs.",
  },
  { name: "Youth Team", description: "Mentoring teenagers and refusing to be boring about it." },
  { name: "Worship & Production", description: "Musicians, vocalists, sound, lighting and cameras." },
  { name: "Prayer Team", description: "Praying with people after services and through the week." },
  {
    name: "Community Outreach",
    description: "Serve days, meals, school partnerships and neighborhood care.",
  },
  { name: "Media & Communications", description: "Photography, editing, social and the livestream." },
  { name: "Facilities & Setup", description: "The people who make Sunday physically possible." },
];

export const membershipJourney: { step: string; title: string; description: string }[] = [
  {
    step: "01",
    title: "Come and see",
    description: "Attend a few Sundays. No commitment, no paperwork, no pressure.",
  },
  {
    step: "02",
    title: "Meet the team",
    description: "Join a New Here Lunch, meet a pastor and ask your real questions.",
  },
  {
    step: "03",
    title: "Belong somewhere smaller",
    description: "Join a group, so church becomes people rather than a place.",
  },
  {
    step: "04",
    title: "Say yes on purpose",
    description:
      "Walk through our membership conversation — what we believe, how we live and where you fit.",
  },
];
