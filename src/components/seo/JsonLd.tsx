import type { Json } from "@/lib/schema";

/** Inline JSON-LD. Data comes from our own config, no user input is interpolated. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
