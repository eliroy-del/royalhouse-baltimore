import { GivePageClient } from "@/components/giving/GivePageClient";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { churchConfig } from "@/config/church";
import { images } from "@/config/images";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Give",
  description:
    "Give to Royalhouse Baltimore. Send gifts via Zelle to royalhousebal@gmail.com.",
  path: "/give",
});

export default function GivePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Give", path: "/give" },
        ])}
      />
      <PageHero
        title="Give"
        lede="Your generosity helps us worship, disciple, serve families and invest in the Baltimore community."
        image={images.prayerKneeling}
        breadcrumb={[{ label: "Give" }]}
      />
      <GivePageClient email={churchConfig.giving.zelleEmail} />
    </>
  );
}
