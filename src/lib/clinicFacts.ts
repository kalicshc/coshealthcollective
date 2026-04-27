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
  dpc: {
    individualMonthly: 100,
    couplesMonthly: 180,
    childAddOnMonthly: 60,
    childAgeMin: 2,
    registrationFee: 50,
  },
  urgentCare: {
    telehealth: 85,
    inPerson: 115,
  },
  hormone: {
    initialConsult: 249,
    monthlyManagement: 149,
  },
  hbot: {
    pressure: "2.0 ATA",
    openingDate: "Summer 2026",
    earlyAccessDiscountPercent: 25,
  },
} as const;

export const usd = (n: number) => `$${n}`;
