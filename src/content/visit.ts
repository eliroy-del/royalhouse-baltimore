import { churchConfig } from "@/config/church";
import type { FaqItem, IconName } from "@/types";

/* ============================================================
   PLAN A VISIT — the answers that remove first-visit anxiety.
   Practical details that depend on the venue are pulled from
   churchConfig.visit so the church office edits them in one place.
   ============================================================ */

export interface VisitAnswer {
  id: string;
  icon: IconName;
  question: string;
  answer: string;
  /** Shown when the church has not supplied this detail yet. */
  fallback?: string;
}

export const visitAnswers: VisitAnswer[] = [
  {
    id: "when",
    icon: "clock",
    question: "When do you meet?",
    answer: "",
    fallback:
      "Our gatherings are on Sunday. Exact service times are confirmed by our team — send us a message and we will tell you precisely when to arrive, and what is happening that week.",
  },
  {
    id: "where",
    icon: "map-pin",
    question: "Where do I go?",
    answer: "",
    fallback:
      "We gather in Baltimore, Maryland. Our full street address and directions are being published shortly — contact us and we will send you the exact location and the easiest way in.",
  },
  {
    id: "parking",
    icon: "car",
    question: "Where do I park?",
    answer: churchConfig.visit.parking,
    fallback:
      "Parking details for our venue are being confirmed. Ask us before you come and we will tell you exactly where to leave the car — and where to walk in.",
  },
  {
    id: "arrive",
    icon: "compass",
    question: "Where should I go when I arrive?",
    answer: churchConfig.visit.arrival,
  },
  {
    id: "expect",
    icon: "music",
    question: "What actually happens in a service?",
    answer:
      "Worship you can join in with, prayer that expects God to answer, and clear teaching straight from the Bible. There is space to respond, and people ready to pray with you if you want that. No pressure, no spotlight.",
  },
  {
    id: "length",
    icon: "clock",
    question: "How long is the service?",
    answer: churchConfig.visit.serviceLength,
    fallback:
      "Plan for a morning that is unhurried rather than rushed. We will confirm exact timings with you before your visit, and there is always coffee and conversation afterwards if you can stay.",
  },
  {
    id: "wear",
    icon: "shirt",
    question: "What should I wear?",
    answer: churchConfig.visit.dressCode,
  },
  {
    id: "children",
    icon: "baby",
    question: "What about my children?",
    answer: churchConfig.visit.children,
  },
  {
    id: "accessibility",
    icon: "accessibility",
    question: "Is the building accessible?",
    answer: churchConfig.visit.accessibility,
  },
  {
    id: "alone",
    icon: "users",
    question: "Can I come on my own?",
    answer:
      "Absolutely, and many people do. Tell the welcome team it is your first Sunday and someone will sit with you if you would like the company — or leave you to it if you would rather just watch and listen.",
  },
];

export const faqs: FaqItem[] = [
  {
    id: "believe",
    group: "Faith",
    question: "Do I need to believe in God to come?",
    answer:
      "No. Plenty of people in the room are still deciding what they think, and questions are genuinely welcome here. Come and look for yourself — nobody will corner you.",
  },
  {
    id: "give",
    group: "Practical",
    question: "Will I be asked for money?",
    answer:
      "We take an offering as part of our worship, but it is for people who call this church home. As a guest, please let it pass you by with a clear conscience.",
  },
  {
    id: "kids-stay",
    group: "Kids",
    question: "Can my children stay with me in the service?",
    answer:
      "Yes. Children are welcome in the main gathering, and nobody minds the noise. If they would enjoy their own space, our kids team is ready for them.",
  },
  {
    id: "kids-safety",
    group: "Kids",
    question: "How do you keep children safe?",
    answer:
      "Every volunteer working with children is screened and background-checked, and we use a secure check-in and pick-up process so only you can collect your child.",
  },
  {
    id: "late",
    group: "Visit",
    question: "What if I arrive late?",
    answer:
      "Come in anyway. Life with children, buses and Baltimore traffic is real — someone will quietly help you find a seat.",
  },
  {
    id: "communion",
    group: "Faith",
    question: "Who can take communion?",
    answer:
      "Anyone who follows Jesus is welcome at the table. If you are not there yet, simply let it pass — you are still every bit as welcome in the room.",
  },
  {
    id: "prayer",
    group: "Faith",
    question: "Can someone pray with me?",
    answer:
      "Yes, and it would be our privilege. There are people available after every service, or you can send a request from our prayer page at any time.",
  },
  {
    id: "next",
    group: "Visit",
    question: "What happens after my first visit?",
    answer:
      "Nothing you have not asked for. If you fill in a visit form we will send one friendly message with practical details — and then leave the pace entirely up to you.",
  },
];

export const expectSteps: { step: string; title: string; description: string; icon: IconName }[] = [
  {
    step: "01",
    title: "You are greeted",
    description:
      "Someone from our welcome team meets you at the door, helps with kids check-in and answers anything before you sit down.",
    icon: "handshake",
  },
  {
    step: "02",
    title: "We worship",
    description:
      "Songs you can actually sing, led by a team that cares more about God's presence than a performance. Stand, sit, sing, or simply take it in.",
    icon: "music",
  },
  {
    step: "03",
    title: "We open the Bible",
    description:
      "Clear, practical teaching from Scripture — the kind you can carry into work, parenting and Baltimore on Monday morning.",
    icon: "book-open",
  },
  {
    step: "04",
    title: "We pray and respond",
    description:
      "Space to pray, to respond, and to be prayed for by name if you want it. Never a spotlight, never a spectacle.",
    icon: "hands-praying",
  },
  {
    step: "05",
    title: "We stay a while",
    description:
      "Coffee, conversation and introductions. Stay as long as you like, or slip out quietly — both are completely fine.",
    icon: "message-circle",
  },
];
