import { images } from "@/config/images";
import type { ChurchEvent } from "@/types";

/* ============================================================
   EVENTS — SAMPLE CONTENT
   ------------------------------------------------------------
   Realistic sample events so the site looks finished during
   development. Replace with the real church calendar (or wire
   `getEvents()` in src/lib/content.ts to a CMS).

   Dates are generated relative to today, so the calendar never
   looks stale while the church is still populating it.
   ============================================================ */

/** ISO date for the next occurrence of `weekday`, `weeksAhead` weeks out. */
function nextWeekday(weekday: number, weeksAhead = 0): string {
  const now = new Date();
  const base = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12));
  const delta = (weekday - base.getUTCDay() + 7) % 7 || 7;
  base.setUTCDate(base.getUTCDate() + delta + weeksAhead * 7);
  return base.toISOString().slice(0, 10);
}

const SUN = 0;
const WED = 3;
const FRI = 5;
const SAT = 6;

export const events: ChurchEvent[] = [
  {
    id: "night-of-worship",
    title: "Night of Worship",
    slug: "night-of-worship",
    summary:
      "One evening. No agenda but worship, Scripture and prayer — with room to stay as long as you need.",
    description: [
      "Some evenings are not for programs. This one is for presence. Our worship team leads for the whole night, we read Scripture together, and we make space for prayer without hurrying anybody along.",
      "Bring a friend, bring your questions, bring whatever you are carrying. Come for twenty minutes or stay to the end — both are welcome.",
    ],
    image: images.eventWorshipNight.src,
    imageAlt: images.eventWorshipNight.alt,
    date: nextWeekday(FRI, 1),
    startTime: "7:00 PM",
    endTime: "9:30 PM",
    location: "Royalhouse Baltimore",
    category: "Worship",
    featured: true,
  },
  {
    id: "new-here-lunch",
    title: "New Here Lunch",
    slug: "new-here-lunch",
    summary:
      "A relaxed lunch for anyone new. Meet a pastor, ask anything, and leave with a clear next step.",
    description: [
      "If you have been coming for one week or six months and still feel like a visitor, this is for you. Lunch is on us. You will meet some of our team, hear the short version of who we are, and get honest answers to whatever you want to ask.",
      "No commitment, no pressure, and absolutely no standing up to introduce yourself in front of a room.",
    ],
    image: images.welcomeLobby.src,
    imageAlt: images.welcomeLobby.alt,
    date: nextWeekday(SUN, 1),
    startTime: "After the service",
    location: "Royalhouse Baltimore",
    category: "Community",
    featured: false,
  },
  {
    id: "midweek-prayer",
    title: "Midweek Prayer",
    slug: "midweek-prayer",
    summary:
      "The engine room of the church. We pray for our families, our city and the requests you have sent us.",
    description: [
      "Every week we gather to pray — for Baltimore, for our schools and streets, for the sick, and through every request that comes into our prayer team.",
      "You do not need to pray out loud. Come and add your amen.",
    ],
    image: images.prayerCircle.src,
    imageAlt: images.prayerCircle.alt,
    date: nextWeekday(WED),
    startTime: "7:00 PM",
    endTime: "8:15 PM",
    location: "Royalhouse Baltimore",
    category: "Worship",
    recurring: "Every week",
    featured: false,
  },
  {
    id: "community-serve-day",
    title: "Community Serve Day",
    slug: "community-serve-day",
    summary:
      "Boots on the ground in our neighborhood — meals, clean-up, school supplies and doors knocked with kindness.",
    description: [
      "We put on the t-shirts, take the tables out and go looking for practical ways to love our neighbours. Families welcome, no skills required, every pair of hands useful.",
      "If you have been wanting to serve but did not know where to start, start here.",
    ],
    image: images.ministryOutreach.src,
    imageAlt: images.ministryOutreach.alt,
    date: nextWeekday(SAT, 2),
    startTime: "9:00 AM",
    endTime: "1:00 PM",
    location: "Baltimore, Maryland",
    category: "Outreach",
    featured: false,
  },
  {
    id: "youth-friday",
    title: "Youth Friday",
    slug: "youth-friday",
    summary:
      "Middle and high schoolers: games, worship, real conversation and pizza that disappears fast.",
    description: [
      "A night built entirely for our young people. Loud in the right places, honest in the important ones, and led by adults who genuinely like teenagers.",
      "Bring your friends. First time is free — every time is free.",
    ],
    image: images.ministryYouth.src,
    imageAlt: images.ministryYouth.alt,
    date: nextWeekday(FRI),
    startTime: "6:30 PM",
    endTime: "9:00 PM",
    location: "Royalhouse Baltimore",
    category: "Youth",
    recurring: "Every Friday during the school year",
    featured: false,
  },
  {
    id: "women-brunch",
    title: "Women's Brunch",
    slug: "womens-brunch",
    summary:
      "Good food, real conversation and teaching for women in every season — students to grandmothers.",
    description: [
      "A morning to breathe. We eat well, we talk properly, and we open the Bible together around tables rather than rows.",
      "Come alone or bring your daughter, your neighbour and your mother.",
    ],
    image: images.ministryWomen.src,
    imageAlt: images.ministryWomen.alt,
    date: nextWeekday(SAT, 4),
    startTime: "10:00 AM",
    endTime: "12:30 PM",
    location: "Royalhouse Baltimore",
    category: "Women",
    featured: false,
  },
  {
    id: "kingdom-conference",
    title: "Kingdom Conference",
    slug: "kingdom-conference",
    summary:
      "Three days of worship and teaching with the wider Royalhouse family and invited guests.",
    description: [
      "Our annual gathering: extended worship, sustained teaching and prayer for the city. Sessions morning and evening, with dedicated environments for children and youth.",
      "Registration details and the full program are released closer to the date.",
    ],
    image: images.eventConference.src,
    imageAlt: images.eventConference.alt,
    date: nextWeekday(FRI, 7),
    endDate: nextWeekday(SUN, 8),
    startTime: "Evening sessions",
    location: "Royalhouse Baltimore",
    category: "Conference",
    featured: false,
  },
  {
    id: "baptism-sunday",
    title: "Baptism Sunday",
    slug: "baptism-sunday",
    summary:
      "Going public with a changed life. If you are ready to be baptized, this is your Sunday.",
    description: [
      "Baptism is how followers of Jesus have always gone public. We will celebrate loudly, take photographs, and make a fuss of every single person who steps into the water.",
      "Talk to any member of our team, or let us know through the connect page, and we will walk you through it beforehand.",
    ],
    image: images.baptism.src,
    imageAlt: images.baptism.alt,
    date: nextWeekday(SUN, 5),
    startTime: "During the service",
    location: "Royalhouse Baltimore",
    category: "Special",
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
