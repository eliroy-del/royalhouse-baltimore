/* ============================================================
   BRAND ASSETS
   ------------------------------------------------------------
   The official Royalhouse Chapel mark lives at
   /public/logo/royalhouse-chapel.png — copied from the supplied
   artwork without redesign, colour change, crop or effect.

   The mark already carries the words "Royalhouse Chapel". On this
   site it is always paired with the local identifier "Baltimore",
   so the church is presented as a Baltimore assembly of the
   Royalhouse family rather than as the international organisation.

   Sizing is CSS-only. The artwork's intrinsic 1:1 ratio is locked.
   ============================================================ */

export interface LogoAsset {
  src: string;
  /** Intrinsic dimensions of the artwork — used only to lock the aspect ratio. */
  width: number;
  height: number;
}

export const brandConfig = {
  /** Accessible name for the logo, used as alt text / aria-label. */
  name: "Royalhouse Baltimore",
  /** The local identifier shown beside the official mark. */
  localName: "Baltimore",

  logo: {
    /**
     * Official mark. White field is native to the artwork (the dove is white),
     * so we never punch the background out. On navy surfaces the mark sits
     * in a white rounded badge — a container, not an edit of the logo.
     */
    official: {
      src: "/logo/royalhouse-chapel.png",
      width: 225,
      height: 225,
    } satisfies LogoAsset,
  },

  /**
   * Minimum clear space around the logo, expressed as a Tailwind class.
   * Applied by the Logo component so the mark always breathes.
   */
  clearSpace: "p-1",
} as const;
