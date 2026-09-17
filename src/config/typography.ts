/**
 * Royalhouse Baltimore — global typography
 * ------------------------------------------------------------
 * Selected face: Plus Jakarta Sans (Google Fonts via next/font)
 *
 * Why this face (vs the reference and candidates):
 * - Reference character matches Avenir / Avenir Next: geometric
 *   construction, open counters, high x-height, calm authority.
 * - Avenir Next is not freely licensed for web; Plus Jakarta Sans
 *   is the closest free match among evaluated options.
 * - Manrope: slightly more condensed; less spacious at display sizes.
 * - DM Sans: cooler / more tech; less rounded warmth.
 * - Nunito Sans: friendlier but softer authority.
 * - Inter: neo-grotesque (Helvetica lineage), not Avenir geometry.
 *
 * One family for all UI. Hierarchy is weight + size + tracking only.
 * If a licensed Avenir Next file is supplied later, swap via next/font/local
 * and keep the CSS token names below unchanged.
 */

export const typographyConfig = {
  family: "Plus Jakarta Sans",
  cssVariable: "--font-plus-jakarta",
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  /** Fluid roles — implemented as `.type-*` utilities in globals.css */
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
