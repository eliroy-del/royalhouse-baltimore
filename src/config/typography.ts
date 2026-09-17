/**
 * Royalhouse Baltimore — global typography
 * ------------------------------------------------------------
 * Selected face: Montserrat (Google Fonts via next/font)
 *
 * Why this face:
 * - Update brief asked for a less “AI” face and a larger presence,
 *   closer to royalhousema.org network-site typography.
 * - Montserrat reads larger at the same size, stays one-family clean,
 *   and works for nav, headings, body, and UI.
 * - If a licensed Avenir Next file is supplied later, swap via
 *   next/font/local and keep these token names unchanged.
 */

export const typographyConfig = {
  family: "Montserrat",
  cssVariable: "--font-montserrat",
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  roles: {
    display: "Hero / campaign headlines",
    h1: "Page titles",
    h2: "Section titles",
    h3: "Card and subsection titles",
    h4: "Small section labels as titles",
    bodyLarge: "Lead paragraphs",
    body: "Default reading copy",
    bodySmall: "Supporting copy, footnotes",
    eyebrow: "Gold section labels",
    navigation: "Primary / mobile nav",
    button: "Button labels",
    caption: "Meta, timestamps",
    label: "Form labels",
  },
} as const;

export type TypographyRole = keyof typeof typographyConfig.roles;
