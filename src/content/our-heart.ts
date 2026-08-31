import type { Belief, Pillar, StoryMilestone } from "@/types";

/* ============================================================
   OUR HEART — pillars, mission, vision, values, beliefs, story
   ------------------------------------------------------------
   Editable content. The pillars and beliefs below are written in
   the historic language of the Christian faith and are intended
   as a starting point for the Royalhouse Baltimore leadership to
   review, sharpen and ratify — not as a final theological
   statement of this local church.
   ============================================================ */

export const pillars: Pillar[] = [
  {
    id: "know-god",
    eyebrow: "Pillar One",
    title: "Know God",
    description:
      "Everything begins with encounter. We gather to worship Jesus honestly, to pray with expectation and to sit under the Word until it changes how we live on Monday.",
    icon: "sunrise",
  },
  {
    id: "grow-together",
    eyebrow: "Pillar Two",
    title: "Grow Together",
    description:
      "Nobody matures alone. Around tables and in groups across the city, we build friendships honest enough to tell the truth and steady enough to carry each other.",
    icon: "users",
  },
  {
    id: "serve-others",
    eyebrow: "Pillar Three",
    title: "Serve Others",
    description:
      "You were given gifts on purpose. Whether you are holding a door, a microphone or a toddler, serving is where faith stops being theory.",
    icon: "handshake",
  },
  {
    id: "impact-the-world",
    eyebrow: "Pillar Four",
    title: "Impact the World",
    description:
      "We take the love of Christ past our own doors — into Baltimore neighborhoods first, and to the nations alongside the wider Royalhouse family.",
    icon: "globe",
  },
];

export const mission = {
  eyebrow: "Our Mission",
  statement:
    "To know God, love people and transform lives — one Baltimore neighborhood at a time.",
  body: [
    "We are not trying to build a crowd. We are trying to build people: men, women and children who know they are loved by God, rooted in Scripture, held by a real community and sent into the city with something to give.",
    "That means our Sundays are unhurried enough for the Spirit to work, our teaching is plain enough to apply this week, and our doors are wide enough for anyone to walk through — whatever they believe when they arrive.",
  ],
};

export const vision = {
  eyebrow: "Our Vision",
  statement:
    "A Spirit-filled family in Baltimore where every generation belongs, every gift is used and every neighbour hears good news.",
  body: [
    "We are praying for a church where a grandmother, a graduate student and a nine-year-old all leave on Sunday knowing they were seen. Where the sound of worship carries into the street. Where a first-time visitor becomes a friend, then a disciple, then someone who leads.",
    "And we are praying for a city that is measurably better because this church is in it.",
  ],
};

export const values: { title: string; description: string }[] = [
  {
    title: "Presence over performance",
    description:
      "We would rather host the presence of God than produce a show. Excellence serves worship; it never replaces it.",
  },
  {
    title: "Scripture over opinion",
    description:
      "The Bible sets the agenda — even when it costs us comfort, convenience or culture points.",
  },
  {
    title: "People over programs",
    description:
      "Every calendar item exists to serve a human being. If it stops doing that, we stop doing it.",
  },
  {
    title: "Honesty over image",
    description:
      "This is a safe place to be unfinished. You will not be asked to perform your way into belonging.",
  },
  {
    title: "Generations together",
    description:
      "Children are not the church of tomorrow, they are part of it today. We keep the ages in the same room on purpose.",
  },
  {
    title: "The city on purpose",
    description:
      "Baltimore is not our backdrop, it is our assignment. We stay, serve and love for the long haul.",
  },
];

// Reviewed against the historic creeds; awaiting ratification by the
// Royalhouse Baltimore leadership team.
export const beliefs: Belief[] = [
  {
    id: "god",
    title: "One God",
    summary:
      "We believe in one eternal God who exists as Father, Son and Holy Spirit — perfect in love, holiness and power, and personally involved with the people He made.",
    scripture: "Deuteronomy 6:4; Matthew 28:19",
  },
  {
    id: "scripture",
    title: "The Scriptures",
    summary:
      "We believe the Bible is God-breathed, trustworthy and sufficient — our final authority for what we believe and how we live.",
    scripture: "2 Timothy 3:16–17",
  },
  {
    id: "jesus",
    title: "Jesus Christ",
    summary:
      "We believe Jesus is fully God and fully human: born of a virgin, crucified in our place, raised bodily from the dead, reigning now and returning again.",
    scripture: "John 1:1–14; 1 Corinthians 15:3–4",
  },
  {
    id: "salvation",
    title: "Salvation by Grace",
    summary:
      "We believe salvation is God's gift, received through repentance and faith in Christ alone — never earned, never deserved, always transforming.",
    scripture: "Ephesians 2:8–9",
  },
  {
    id: "holy-spirit",
    title: "The Holy Spirit",
    summary:
      "We believe the Holy Spirit indwells, empowers and gifts every believer for holy living, bold witness and the building up of the church.",
    scripture: "Acts 1:8; 1 Corinthians 12",
  },
  {
    id: "church",
    title: "The Church",
    summary:
      "We believe the church is God's family and His plan — a local, visible, committed community, not an optional extra to personal faith.",
    scripture: "Ephesians 4:11–16; Hebrews 10:24–25",
  },
  {
    id: "baptism",
    title: "Baptism & Communion",
    summary:
      "We practice baptism by immersion as a public declaration of a changed life, and we share communion together in remembrance of Jesus.",
    scripture: "Matthew 28:19; 1 Corinthians 11:23–26",
  },
  {
    id: "hope",
    title: "The Hope to Come",
    summary:
      "We believe Christ will return to make all things new — and that this hope shapes how we live, love and give today.",
    scripture: "Revelation 21:1–5",
  },
];

/**
 * ⚠️ AWAITING CHURCH INPUT — our history.
 * No founding dates, founders or milestones are invented here. Populate this
 * array and the timeline on /our-heart renders automatically; until then the
 * page shows an honest, well-designed invitation in its place.
 *
 * Example shape:
 *   { id: "first-gathering", year: "2018", title: "The first gathering",
 *     description: "Twelve people, one living room, one prayer." }
 */
export const storyMilestones: StoryMilestone[] = [];

export const communityImpact: { title: string; description: string }[] = [
  {
    title: "Neighborhood care",
    description:
      "Practical help for families on our doorstep — groceries, school supplies and a warm meal shared without a sermon attached.",
  },
  {
    title: "Mentoring the next generation",
    description:
      "Walking with young people in Baltimore through tutoring, mentoring and simply showing up consistently.",
  },
  {
    title: "City partnerships",
    description:
      "Serving alongside schools, shelters and community organizations already doing good work here, rather than duplicating it.",
  },
];
