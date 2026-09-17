import { images } from "@/config/images";
import type { Leader } from "@/types";

export const leaders: Leader[] = [
  {
    id: "pastor-richieo",
    name: "Pastor RichieO",
    role: "Lead Pastor",
    photo: images.pastorRichieO.src,
    bio: "Pastor RichieO grew up in London, UK, Ghana and Maryland. He has nearly two decades of Young Adults ministry leadership and served as Teens Pastor at Grace2Grace Center, Royalhouse Chapel International in Laurel, Maryland. Professionally he has a background in Cybersecurity and is an Afrogospel artist. He has a passion for serving God, is committed to preaching the Word, raising disciples, equipping believers, and leading Royalhouse Chapel Baltimore. He is committed to touching this generation and the Baltimore area with the power of God. Pastor RichieO has been married to Lady Trisha for 14 years and is blessed with 4 sons.",
    responsibility: "Lead Pastor of Royalhouse Baltimore",
    email: "",
    socialLinks: {
      instagram: "https://www.instagram.com/_richieo/",
    },
    group: "Lead",
  },
  {
    id: "apostle-agormeda",
    name: "Apostle Emmanuel Agormeda",
    role: "Apostle, North American Missions",
    photo: images.apostleAgormeda.src,
    bio: "Rev. Emmanuel T. Agormeda is Senior Pastor of Royalhouse Chapel International, Maryland, and Apostle over Royalhouse Chapel churches across North America. He carries Apostolic, Pastoral and Prophetic ministry as a church planter and church-strengthening leader, a conference preacher, and a trainer of church staff, lay leaders, deacons, ministers and pastors. He holds a Bachelor's degree in Political Science and a Master's of Divinity with Pastoral Studies emphasis, and is a doctoral candidate at Oral Roberts School of Theology. He is married to Rev. Mrs. Willhemina Agormeda and they have three children.",
    responsibility: "Apostle over Royalhouse Chapel churches across North America",
    email: "",
    socialLinks: {},
    group: "Lead",
  },
];

export interface LeadershipSlot {
  id: string;
  role: string;
  group: Leader["group"];
  responsibility: string;
}

export const leadershipSlots: LeadershipSlot[] = [];

export const leadershipGroups: {
  id: Leader["group"];
  eyebrow: string;
  title: string;
  description: string;
}[] = [
  {
    id: "Lead",
    eyebrow: "Leadership",
    title: "Leaders",
    description: "The people the church has named to shepherd and serve Royalhouse Baltimore.",
  },
];
