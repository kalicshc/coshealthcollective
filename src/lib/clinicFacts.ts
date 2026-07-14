/**
 * Single source of truth for clinic-facing facts that show up on the website
 * AND in the chatbot prompt. When a price, phone number, hours, or key offer
 * changes, update it HERE — not in the individual page files.
 *
 * Both the public pages and `chatbotContext.ts` import from this file, so a
 * single edit + redeploy updates everywhere they're already wired in.
 *
 * If you add a new fact here, also wire it into the spots that need it.
 * If you change an existing fact, grep the codebase for any leftover
 * hardcoded copies (flyers, email templates, SEO metadata) and update those
 * by hand — those surfaces aren't wired to this file yet.
 */

export const clinicFacts = {
  contact: {
    phone: "(719) 824-4716",
    phoneTel: "+17198244716",
    phoneDashed: "719-824-4716",
    email: "dpc@coshealthcollective.com",
    domain: "coshealthcollective.com",
    siteUrl: "https://coshealthcollective.com",
  },
  /**
   * One-time enrollment fee — the SAME for every membership: DPC, hormone
   * (HRT/TRT/GLP-1), and the combo. Per household for DPC/family plans.
   * For hormone plans the first month includes the comprehensive consult,
   * lab ordering, and lab review — so "first month all-in" is
   * enrollmentFee + monthly, derived where displayed (never hardcoded).
   */
  enrollmentFee: 100,
  dpc: {
    individualMonthly: 100,
    couplesMonthly: 180,
    childAddOnMonthly: 60,
    childAgeMin: 2,
  },
  urgentCare: {
    telehealth: 85,
    inPerson: 115,
  },
  hormone: {
    monthlyManagement: 100,
    topicalEstrogenTelehealth: 89,
    topicalEstrogenDurationMonths: 3,
  },
  /**
   * Hormone/TRT/GLP-1 + DPC combo membership: one enrollmentFee (not two),
   * then this flat monthly for both memberships. The +$60 add-on framing and
   * $40/mo savings vs buying separately are computed where displayed.
   */
  combo: {
    monthly: 160,
  },
  hbot: {
    pressure: "2.0 ATA",
    openingDate: "Fall 2026",
    earlyAccessDiscountPercent: 25,
  },
} as const;

export const usd = (n: number) => `$${n}`;
