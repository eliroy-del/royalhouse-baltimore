import { images } from "@/config/images";
import type { Testimony } from "@/types";

/* ============================================================
   TESTIMONIES, SAMPLE CONTENT
   ------------------------------------------------------------
   ⚠️ These are illustrative placeholders written to show the
   design and tone, using stock portraits. They are NOT real
   accounts from real members. Delete this array and replace it
   with moderated, permission-granted testimonies before launch.

   Nothing renders unless `approved` is true, see
   `getTestimonies()` in src/lib/content.ts. Submissions from the
   public form are never published automatically.
   ============================================================ */

function monthsAgo(months: number): string {
  const now = new Date();
  const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - months, 12, 12));
  return date.toISOString().slice(0, 10);
}

export const testimonies: Testimony[] = [
  {
    id: "sample-1",
    name: "Sample Testimony",
    photo: images.portrait1.src,
    quote:
      "I came in on a Sunday intending to sit at the back and leave early. Someone learned my name before I got to my seat, and I have not felt like a visitor since.",
    content: [
      "I had moved to Baltimore for work and had not spoken to anyone outside my job for weeks. Church was the last thing on my list.",
      "What I found was not a performance. It was people who asked how I actually was, and then remembered the answer the following week. That is where my faith came back to life.",
    ],
    category: "Community",
    date: monthsAgo(2),
    location: "Baltimore, MD",
    approved: true,
    featured: true,
  },
  {
    id: "sample-2",
    name: "Sample Testimony",
    photo: images.portrait2.src,
    quote:
      "I asked for prayer on a Wednesday night, expecting nothing. By the end of the month the thing I was terrified of had been dealt with, and I had a church.",
    content: [
      "I was carrying something I had never said out loud. Writing it in a prayer request felt safer than saying it to a person.",
      "Somebody prayed. Somebody followed up. Nobody gossiped. That combination changed what I believed about God and about church.",
    ],
    category: "Freedom",
    date: monthsAgo(4),
    location: "Baltimore, MD",
    approved: true,
    featured: true,
  },
  {
    id: "sample-3",
    name: "Sample Testimony",
    photo: images.portrait3.src,
    quote:
      "At seventy-one I assumed my serving days were behind me. I now help run the welcome team, and it is the best part of my week.",
    content: [
      "After my husband died I stopped expecting to be useful to anybody. I came for the singing and stayed because someone asked me to help with the coffee.",
      "This church treats every generation as though it still has something to give. Because we do.",
    ],
    category: "Community",
    date: monthsAgo(7),
    location: "Baltimore, MD",
    approved: true,
    featured: true,
  },
  {
    id: "sample-4",
    name: "Sample Testimony",
    photo: "",
    quote:
      "Our family walked in broken and got put back together slowly, by people who never once made us feel like a project.",
    content: [
      "We had tried church before and left feeling judged. Here, nobody flinched at our story.",
      "Two years on, our children love coming. That still surprises me.",
    ],
    category: "Family",
    date: monthsAgo(9),
    approved: true,
    featured: false,
    anonymous: true,
  },
  {
    id: "sample-5",
    name: "Sample Testimony",
    photo: "",
    quote:
      "I got baptized at forty-four. I had believed for years but never gone public. This was the church that made it feel possible.",
    content: [
      "I grew up around faith and knew all the words. What I did not have was a decision of my own.",
      "Standing in that water in front of a room full of people who knew my actual life was the most honest thing I have ever done.",
    ],
    category: "Salvation",
    date: monthsAgo(11),
    approved: true,
    featured: false,
  },
  {
    id: "sample-6",
    name: "Sample Testimony",
    photo: "",
    quote:
      "We were three weeks from losing our apartment. This church stepped in without a single lecture attached.",
    content: [
      "I do not know who paid it. I know that a pastor knocked on our door with groceries and told us we were not a burden.",
      "We are on our feet again now, and we give to the same fund every month.",
    ],
    category: "Provision",
    date: monthsAgo(14),
    approved: true,
    featured: false,
    anonymous: true,
  },
];

export const testimonyCategories = [
  "All",
  "Salvation",
  "Healing",
  "Provision",
  "Family",
  "Freedom",
  "Community",
] as const;
