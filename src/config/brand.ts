/* ============================================================
   BRAND ASSETS
   ------------------------------------------------------------
   The official Royalhouse Chapel Baltimore lockup lives at
   /public/logo/royalhouse-baltimore.png, copied from the supplied
   artwork without redesign, colour change, or effect.

   Empty export canvas was trimmed so the mark can size in the
   header. The 1:1 source field is kept for app icons.

   Sizing is CSS-only. The artwork's intrinsic ratio is locked.
   ============================================================ */

export interface LogoAsset {
  src: string;
  /** Intrinsic dimensions of the artwork, used only to lock the aspect ratio. */
  width: number;
  height: number;
}

export const brandConfig = {
  /** Accessible name for the logo, used as alt text / aria-label. */
  name: "Royalhouse Chapel Baltimore",
  /** The local identifier, retained for copy that names the assembly. */
  localName: "Baltimore",

  logo: {
    /**
     * Official Baltimore lockup. White dove, crown, chapel wordmark and
     * BALTIMORE sit on the native black field. We never recolour or
     * punch the background out.
     */
    official: {
      src: "/logo/royalhouse-baltimore.png",
      width: 794,
      height: 650,
    } satisfies LogoAsset,
  },

  /**
   * Minimum clear space around the logo, expressed as a Tailwind class.
   * Applied by the Logo component so the mark always breathes.
   */
  clearSpace: "p-0.5",
} as const;
