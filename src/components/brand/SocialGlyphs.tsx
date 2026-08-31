import type { ComponentType, SVGProps } from "react";

/**
 * Brand glyphs are shipped locally rather than pulled from an icon library,
 * because platform marks are trademarked artwork with their own usage terms , 
 * and because it keeps the bundle small.
 */
type GlyphProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true as const,
  focusable: "false" as const,
};

export function InstagramGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.25 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.36.47 2.43C21.99 8.94 22 9.28 22 12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43-.25.66-.6 1.22-1.15 1.77-.55.55-1.11.9-1.77 1.15-.64.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.25-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45 2.53c.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.82.04-1.27.17-1.56.29-.4.15-.68.34-.98.64-.3.3-.49.58-.64.98-.12.29-.25.74-.29 1.56-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.82.17 1.27.29 1.56.15.4.34.68.64.98.3.3.58.49.98.64.29.12.74.25 1.56.29 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.82-.04 1.27-.17 1.56-.29.4-.15.68-.34.98-.64.3-.3.49-.58.64-.98.12-.29.25-.74.29-1.56.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.82-.17-1.27-.29-1.56a2.6 2.6 0 0 0-.64-.98 2.6 2.6 0 0 0-.98-.64c-.29-.12-.74-.25-1.56-.29-1.05-.05-1.37-.06-4.04-.06Zm0 3.07a5.13 5.13 0 1 1 0 10.26 5.13 5.13 0 0 1 0-10.26Zm0 1.8a3.33 3.33 0 1 0 0 6.66 3.33 3.33 0 0 0 0-6.66Zm5.34-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
    </svg>
  );
}

export function FacebookGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.02H7.9v-2.92h2.54v-2.22c0-2.52 1.49-3.91 3.77-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.92h-2.33V22C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  );
}

export function YouTubeGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21.58 7.19a2.51 2.51 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42A2.51 2.51 0 0 0 2.42 7.2C2 8.75 2 12 2 12s0 3.25.42 4.81a2.51 2.51 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

export function TikTokGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.85-2.48V9.78a5.68 5.68 0 1 0 4.94 5.62V8.99a7.31 7.31 0 0 0 4.28 1.38V7.28a4.28 4.28 0 0 1-3.22-1.46Z" />
    </svg>
  );
}

export function WhatsAppGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 19.07 4.9 9.85 9.85 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.19-.31a8.19 8.19 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.23-8.24Zm-4.5 4.44c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.62s1.13 3.04 1.29 3.25c.16.21 2.19 3.5 5.36 4.77 2.63 1.04 3.17.83 3.74.78.57-.05 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.36-.31-.16-1.84-.91-2.13-1.01-.29-.11-.5-.16-.71.15-.21.32-.81 1.04-1 1.25-.18.21-.37.24-.68.08-.31-.16-1.31-.48-2.5-1.54-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.13-.64.14-.14.31-.37.47-.55.16-.19.21-.32.31-.53.11-.21.05-.39-.03-.55-.08-.16-.7-1.7-.96-2.32-.25-.61-.5-.62-.7-.63h-.61Z" />
    </svg>
  );
}

export function XGlyph(props: GlyphProps) {
  return (
    <svg {...base} {...props}>
      <path d="M17.53 3h3.2l-6.99 7.99L22 21h-6.36l-4.4-5.75L6.2 21H3l7.28-8.32L2.4 3h6.52l4.13 5.46L17.53 3Zm-1.12 16h1.77L7.68 4.87H5.78L16.41 19Z" />
    </svg>
  );
}

/** Platform metadata shared by every place we render a social link. */
export const socialGlyphs: Record<
  string,
  { label: string; icon: ComponentType<SVGProps<SVGSVGElement>> }
> = {
  instagram: { label: "Instagram", icon: InstagramGlyph },
  facebook: { label: "Facebook", icon: FacebookGlyph },
  youtube: { label: "YouTube", icon: YouTubeGlyph },
  tiktok: { label: "TikTok", icon: TikTokGlyph },
  whatsapp: { label: "WhatsApp", icon: WhatsAppGlyph },
  x: { label: "X", icon: XGlyph },
};

export function SocialGlyph({ platform, className }: { platform: string; className?: string }) {
  const entry = socialGlyphs[platform];
  if (!entry) return null;
  const Glyph = entry.icon;
  return <Glyph className={className} />;
}
