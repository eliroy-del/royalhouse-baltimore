import type { Leader } from "@/types";

/* ============================================================
   LEADERSHIP
   ------------------------------------------------------------
   ⚠️ NO PEOPLE ARE INVENTED HERE.

   We do not publish names, portraits or biographies that the
   church has not supplied. `leaders` is therefore empty, and the
   leadership page renders the role slots below as elegant
   monogram placeholders instead.

   TO PUBLISH THE REAL TEAM
   Add entries to `leaders` (see the Leader type) and they replace
   the placeholders automatically:

     {
       id: "lead-pastor",
       name: "…",
       role: "Lead Pastor",
       photo: "/images/leaders/….jpg",
       bio: "…",
       responsibility: "…",
       email: "…",
       socialLinks: {},
       group: "Lead",
     }
   ============================================================ */

export const leaders: Leader[] = [];

export interface LeadershipSlot {
  id: string;
  role: string;
  group: Leader["group"];
  responsibility: string;
}

/** Structural role slots — titles only, no fabricated people. */
export const leadershipSlots: LeadershipSlot[] = [
  {
    id: "lead-pastor",
    role: "Lead Pastor",
    group: "Lead",
    responsibility: "Vision, teaching and the spiritual care of the whole church.",
  },
  {
    id: "associate-pastor",
    role: "Associate Pastor",
    group: "Pastoral",
    responsibility: "Pastoral care, discipleship pathways and membership.",
  },
  {
    id: "worship-director",
    role: "Worship Director",
    group: "Ministry",
    responsibility: "Leading our worship ministry, musicians and production teams.",
  },
  {
    id: "next-gen-lead",
    role: "Next Generation Lead",
    group: "Ministry",
    responsibility: "Kids and youth ministry, safeguarding and volunteer training.",
  },
  {
    id: "prayer-lead",
    role: "Prayer Lead",
    group: "Ministry",
    responsibility: "Midweek prayer, intercession teams and confidential prayer requests.",
  },
  {
    id: "outreach-lead",
    role: "Community Outreach Lead",
    group: "Ministry",
    responsibility: "Neighborhood care, city partnerships and serve days.",
  },
  {
    id: "administrator",
    role: "Church Administrator",
    group: "Staff",
    responsibility: "Operations, communications, facilities and giving records.",
  },
];

export const leadershipGroups: {
  id: Leader["group"];
  eyebrow: string;
  title: string;
  description: string;
}[] = [
  {
    id: "Lead",
    eyebrow: "Teaching & Vision",
    title: "Lead Pastor",
    description: "The primary teaching and shepherding responsibility for Royalhouse Baltimore.",
  },
  {
    id: "Pastoral",
    eyebrow: "Care & Discipleship",
    title: "Pastoral Team",
    description: "The people who carry the day-to-day care of this church family.",
  },
  {
    id: "Ministry",
    eyebrow: "Teams & Training",
    title: "Ministry Leaders",
    description: "Those who lead and equip our teams across every area of church life.",
  },
  {
    id: "Staff",
    eyebrow: "Behind The Scenes",
    title: "Staff & Operations",
    description: "The team who keep everything running behind the scenes.",
  },
];
