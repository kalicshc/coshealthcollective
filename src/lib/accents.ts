/**
 * Single source of truth for the per-service accent palettes.
 *
 * The palette extends the logo's hues: royal blue (DPC), magenta-violet
 * (hormone), electric cyan (hyperbaric), plus the gold used for general
 * brand moments (story/reviews/vision). Every surface that colors itself
 * by service — the home flythrough, the clinic accordion/spectrum on
 * /preview/clinics, and the shared page components (ServiceHero, GlassCard,
 * PageCtaFooter…) — imports from here so the hues can never drift apart.
 *
 * Two RGB variants exist on purpose:
 *  - `rgb`      brighter screen-tint used by the flythrough scenes and UI
 *               chrome (borders, dots, underlines) — "R,G,B" string form.
 *  - `waveRgb`  deeper variant tuned for ClinicSpectrum's additive wave,
 *               where the brighter values would wash out.
 *
 * Borrow rules — do NOT add new ServiceKeys for minor pages; pages without
 * their own key use the nearest fit:
 *  - non-clinic pages (about, faq, media, resources, community, toolkit) → `brand`
 *  - DPC-adjacent services (urgent care, allergy, precision medicine,
 *    remote monitoring, for-businesses, aesthetics via DPC membership) → `dpc`
 *  - blog posts → the accent of the service the post discusses, else `brand`
 */

export type ServiceKey = "brand" | "dpc" | "hormone" | "hyperbaric";

export type Accent = {
  /** "R,G,B" — use as `rgb(${accent.rgb})` or `rgba(${accent.rgb},a)` */
  rgb: string;
  /** [r,g,b] tuple for canvas/wave math (ClinicSpectrum) */
  waveRgb: [number, number, number];
  /** gradient stops for pills/buttons/headline clips */
  from: string;
  to: string;
  glow: string;
  chipBorder: string;
  statusDot: string;
};

export const ACCENTS: Record<ServiceKey, Accent> = {
  // gold — brand-wide moments (story, reviews, journey) and non-clinic pages
  brand: {
    rgb: "245,196,86",
    waveRgb: [245, 196, 86],
    from: "hsl(45, 90%, 60%)",
    to: "hsl(36, 90%, 52%)",
    glow: "hsla(45, 90%, 56%, 0.55)",
    chipBorder: "hsla(45, 90%, 60%, 0.38)",
    statusDot: "hsl(45, 90%, 60%)",
  },
  // deep royal blue — DPC (anchored cool midpoint)
  dpc: {
    rgb: "60,120,255",
    waveRgb: [36, 89, 249],
    from: "hsl(225, 95%, 56%)",
    to: "hsl(238, 90%, 48%)",
    glow: "hsla(225, 95%, 54%, 0.55)",
    chipBorder: "hsla(225, 95%, 56%, 0.38)",
    statusDot: "hsl(225, 95%, 56%)",
  },
  // magenta-violet — hormone (pushed warm so it clearly opposes the cyan)
  hormone: {
    rgb: "210,80,250",
    waveRgb: [218, 56, 250],
    from: "hsl(290, 95%, 60%)",
    to: "hsl(272, 90%, 52%)",
    glow: "hsla(290, 95%, 56%, 0.55)",
    chipBorder: "hsla(290, 95%, 60%, 0.38)",
    statusDot: "hsl(290, 95%, 60%)",
  },
  // pure cyan — hyperbaric (maxed for max contrast against the magenta)
  hyperbaric: {
    rgb: "20,225,235",
    waveRgb: [0, 247, 255],
    from: "hsl(182, 100%, 50%)",
    to: "hsl(198, 95%, 54%)",
    glow: "hsla(182, 100%, 48%, 0.55)",
    chipBorder: "hsla(182, 100%, 50%, 0.38)",
    statusDot: "hsl(182, 100%, 50%)",
  },
};
