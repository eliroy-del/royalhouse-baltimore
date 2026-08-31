import { images } from "@/config/images";
import type { Sermon, SermonSeries } from "@/types";

/* ============================================================
   MESSAGES, SAMPLE CONTENT
   ------------------------------------------------------------
   `videoUrl` and `audioUrl` are intentionally empty: no invented
   media links ship. The player renders a considered
   "available shortly" state until real URLs are supplied.
   ============================================================ */

function weeksAgo(weeks: number): string {
  const now = new Date();
  const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12));
  const toSunday = date.getUTCDay();
  date.setUTCDate(date.getUTCDate() - toSunday - weeks * 7);
  return date.toISOString().slice(0, 10);
}

/** Speaker attribution is left generic until the church supplies its team. */
const SPEAKER = "Royalhouse Baltimore";

export const series: SermonSeries[] = [
  {
    id: "rooted",
    title: "Rooted",
    slug: "rooted",
    description:
      "Four weeks on the unglamorous, unshakeable work of putting your life down deep into God, so that weather does not decide your future.",
    image: images.sermonFeatured.src,
    current: true,
  },
  {
    id: "the-table",
    title: "The Table",
    slug: "the-table",
    description:
      "What Jesus does around food, and what it teaches us about welcome, honesty and belonging in a lonely city.",
    image: images.smallGroup.src,
    current: false,
  },
  {
    id: "kingdom-culture",
    title: "Kingdom Culture",
    slug: "kingdom-culture",
    description:
      "The Sermon on the Mount, taken at face value: how citizens of another kingdom actually live in this one.",
    image: images.baltimoreCity.src,
    current: false,
  },
];

export const sermons: Sermon[] = [
  {
    id: "rooted-4",
    title: "Fruit in the Dry Season",
    slug: "fruit-in-the-dry-season",
    speaker: SPEAKER,
    series: "Rooted",
    summary:
      "Everyone bears fruit in the rain. Roots are what decide who is still standing, and still generous, when the rain stops.",
    description: [
      "Jeremiah promises that the person rooted in God does not fear drought. Not because the drought never comes, but because their water source is somewhere else entirely.",
      "This message is for anyone in a season that has gone quiet: unanswered prayer, a hard diagnosis, a job that ended, a faith that feels thinner than it used to. There is a way to keep bearing fruit here.",
    ],
    thumbnail: images.sermonFeatured.src,
    thumbnailAlt: images.sermonFeatured.alt,
    videoUrl: "",
    date: weeksAgo(0),
    duration: 41,
    scripture: "Jeremiah 17:7–8",
    featured: true,
    topics: ["Faith", "Endurance", "Prayer"],
  },
  {
    id: "rooted-3",
    title: "What Grows in the Dark",
    slug: "what-grows-in-the-dark",
    speaker: SPEAKER,
    series: "Rooted",
    summary:
      "The most important growth in your life is happening where nobody is applauding. Here is how to tend it.",
    description: [
      "Roots grow in the dark, in silence, with no audience. So does character. So does prayer. So does the kind of faith that holds a family together.",
      "A message about the hidden years, and why God is never wasting them.",
    ],
    thumbnail: images.prayerCircle.src,
    thumbnailAlt: images.prayerCircle.alt,
    videoUrl: "",
    date: weeksAgo(1),
    duration: 38,
    scripture: "Colossians 2:6–7",
    topics: ["Discipleship", "Character"],
  },
  {
    id: "rooted-2",
    title: "Transplanted on Purpose",
    slug: "transplanted-on-purpose",
    speaker: SPEAKER,
    series: "Rooted",
    summary:
      "You did not end up in this city, this season or this church by accident. God plants people deliberately.",
    description: [
      "Scripture is full of people who were moved, sometimes willingly, often not, and then discovered they had been planted rather than displaced.",
      "For anyone who feels far from home, this one is for you.",
    ],
    thumbnail: images.baltimoreCity.src,
    thumbnailAlt: images.baltimoreCity.alt,
    videoUrl: "",
    date: weeksAgo(2),
    duration: 44,
    scripture: "Psalm 1:1–3",
    topics: ["Purpose", "Belonging", "City"],
  },
  {
    id: "rooted-1",
    title: "Deeper Than the Storm",
    slug: "deeper-than-the-storm",
    speaker: SPEAKER,
    series: "Rooted",
    summary:
      "Jesus never promised the wind would miss your house. He told us exactly what to build on before it arrives.",
    description: [
      "Two builders, one storm, two completely different outcomes, and the only variable Jesus mentions is the foundation.",
      "We open the series by asking a straight question: what is your life actually resting on?",
    ],
    thumbnail: images.heroWorship.src,
    thumbnailAlt: images.heroWorship.alt,
    videoUrl: "",
    date: weeksAgo(3),
    duration: 39,
    scripture: "Matthew 7:24–27",
    topics: ["Foundations", "Faith"],
  },
  {
    id: "table-3",
    title: "Room for One More",
    slug: "room-for-one-more",
    speaker: SPEAKER,
    series: "The Table",
    summary:
      "The early church grew around meals, not marketing. Radical welcome is still the most persuasive thing we own.",
    description: [
      "Luke keeps putting Jesus at dinner with the wrong people. That is not incidental detail, it is the strategy.",
      "A message about widening the table in a city where a lot of people eat alone.",
    ],
    thumbnail: images.smallGroup.src,
    thumbnailAlt: images.smallGroup.alt,
    videoUrl: "",
    date: weeksAgo(4),
    duration: 36,
    scripture: "Luke 14:12–14",
    topics: ["Hospitality", "Community"],
  },
  {
    id: "table-2",
    title: "The Meal That Remembers",
    slug: "the-meal-that-remembers",
    speaker: SPEAKER,
    series: "The Table",
    summary: "Why communion is not a ritual to endure but a memory that reorders your whole week.",
    description: [
      "Bread, a cup, and a command to remember. We look at what Jesus was doing on the night before He died, and why He chose a meal to carry it.",
    ],
    thumbnail: images.generosity.src,
    thumbnailAlt: images.generosity.alt,
    videoUrl: "",
    date: weeksAgo(5),
    duration: 33,
    scripture: "1 Corinthians 11:23–26",
    topics: ["Communion", "Worship"],
  },
  {
    id: "kingdom-2",
    title: "Salt, Light and Baltimore",
    slug: "salt-light-and-baltimore",
    speaker: SPEAKER,
    series: "Kingdom Culture",
    summary:
      "Jesus assumed His followers would be visible and useful in a real place. Ours is called Baltimore.",
    description: [
      "Salt is no use in the shaker and light is no use under a bowl. Jesus expects His church to be tasted and seen by its neighbours.",
      "A practical message about what faithful presence looks like on our streets.",
    ],
    thumbnail: images.ministryOutreach.src,
    thumbnailAlt: images.ministryOutreach.alt,
    videoUrl: "",
    date: weeksAgo(6),
    duration: 42,
    scripture: "Matthew 5:13–16",
    topics: ["Mission", "City", "Service"],
  },
  {
    id: "kingdom-1",
    title: "Blessed Are the Overlooked",
    slug: "blessed-are-the-overlooked",
    speaker: SPEAKER,
    series: "Kingdom Culture",
    summary:
      "The Beatitudes are not a personality test. They are Jesus announcing who is actually in on His kingdom.",
    description: [
      "Poor in spirit. Mourning. Meek. Hungry. Jesus opens His greatest sermon by blessing everyone the world walks past.",
    ],
    thumbnail: images.worshipTeam.src,
    thumbnailAlt: images.worshipTeam.alt,
    videoUrl: "",
    date: weeksAgo(7),
    duration: 40,
    scripture: "Matthew 5:1–12",
    topics: ["Kingdom", "Hope"],
  },
];

export const sermonTopics = Array.from(new Set(sermons.flatMap((s) => s.topics))).sort();
