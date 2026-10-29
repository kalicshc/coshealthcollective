import { clinicFacts } from "@/lib/clinicFacts";

/**
 * Single source of truth for Hint booking links — AND the site-wide
 * new-patient kill switch.
 *
 * ── THE SWITCH ──────────────────────────────────────────────────────────
 * `ACCEPTING_NEW_PATIENTS = false` (Logan, 2026-10-29): the collective is
 * holding off on new meet & greets, consults, and visits. While it is false,
 * bookingUrl() and the enrollment hintLink()s return the on-site /waitlist
 * page instead of Hint, so EVERY booking CTA on the site — pages, shared
 * components, blog CTA blocks, chatbot replies, quiz emails, flyer QR codes —
 * lands on the waitlist without having to be edited one by one.
 *
 * Flipping it back to `true` restores live Hint booking everywhere. The
 * visible CTA labels are a separate concern: they're centralized in the
 * shared components (Navbar, PricingColumns, PortalPillars, ClinicAccordion,
 * BlogCtaBlock, CoPrimaryCtas, StickyCtaBar) and in `WAITLIST_CTA` below —
 * grep for WAITLIST_CTA to find the copy that has to change back with it.
 *
 * Member login is NEVER gated — existing members must always get in.
 *
 * ── THE LINKS ───────────────────────────────────────────────────────────
 * Two distinct appointment types exist ON PURPOSE (confirmed by Logan):
 *  - meetGreet   — "Free Meet & Greet" (DPC + the global navbar Book button)
 *  - freeConsult — "Free Consult" (all hormone pages)
 *
 * Always build links through bookingUrl() and pass a `source` so bookings
 * are attributable to the page/section that sent them (Hint ignores unknown
 * query params, so ?source= is safe). The Vercel analytics `book_redirect`
 * event should carry the same source string — see src/lib/analytics.ts.
 */

export const ACCEPTING_NEW_PATIENTS = false;

/** The one label every former booking CTA uses while the switch is off. */
export const WAITLIST_CTA = "Join the Waitlist";

export const WAITLIST_PATH = "/waitlist";

const BOOKING_BASE =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=";

export const APPT = {
  meetGreet: "appty-d2b5ee660e1e0207",
  freeConsult: "appty-5688330a3b52e266",
  telehealth: "appty-ec8b65946e958f69",
  urgentCareInPerson: "appty-c127397b6906edd2",
} as const;

export type ApptKey = keyof typeof APPT;

/** Which waitlist interest a gated CTA pre-selects on /waitlist. */
export type WaitlistInterest = "dpc" | "hormone" | "hyperbaric" | "urgent-care" | "aesthetics";

const INTEREST_FOR_APPT: Record<ApptKey, WaitlistInterest> = {
  meetGreet: "dpc",
  freeConsult: "hormone",
  telehealth: "urgent-care",
  urgentCareInPerson: "urgent-care",
};

/**
 * Link to the waitlist, carrying the same ?source= attribution a booking
 * link would have. `absolute: true` is required inside emails (the quiz
 * follow-ups) where a root-relative path has nothing to resolve against.
 */
export function waitlistUrl(
  source?: string,
  interest?: WaitlistInterest,
  opts?: { absolute?: boolean }
): string {
  const base = opts?.absolute ? `${clinicFacts.contact.siteUrl}${WAITLIST_PATH}` : WAITLIST_PATH;
  const params = new URLSearchParams();
  if (interest) params.set("interest", interest);
  if (source) params.set("source", source);
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

export function bookingUrl(key: ApptKey, source?: string): string {
  if (!ACCEPTING_NEW_PATIENTS) return waitlistUrl(source, INTEREST_FOR_APPT[key]);
  const u = new URL(BOOKING_BASE + APPT[key]);
  if (source) u.searchParams.set("source", source);
  return u.toString();
}

/** Non-booking Hint destinations (signup flows, member login). */
const HINT_ROOT = "https://colorado-springs-health-collective-direct-primary-care.hint.com";

export const HINT_LINKS = {
  dpcMembershipSignup: `${HINT_ROOT}/signup/membership/contacts`,
  rxSkincare: `${HINT_ROOT}/signup/rxskincare`,
  memberLogin: `${HINT_ROOT}/login/request?redirectTo=%2Faccount%2Fbooking`,
} as const;

/**
 * Enrollment flows that take on a NEW patient, so they ride the same switch
 * as bookingUrl(). `memberLogin` is deliberately absent — existing members
 * keep their portal no matter what.
 */
const GATED_HINT_LINKS: Partial<Record<keyof typeof HINT_LINKS, WaitlistInterest>> = {
  dpcMembershipSignup: "dpc",
  rxSkincare: "aesthetics",
};

/**
 * Urgent care telehealth and in-person sign-up. Every such booking CTA on
 * the site must use these (via bookingUrl("telehealth"/"urgentCareInPerson",
 * source)) — confirmed by Logan 2026-09-08. Old destinations were
 * HINT_LINKS.urgentCareTelehealth (/signup/telehealth) and
 * HINT_LINKS.urgentCareInPerson (/signup/urgentcarevisit).
 */

export function hintLink(key: keyof typeof HINT_LINKS, source?: string): string {
  const gated = GATED_HINT_LINKS[key];
  if (gated && !ACCEPTING_NEW_PATIENTS) return waitlistUrl(source, gated);
  const u = new URL(HINT_LINKS[key]);
  if (source) u.searchParams.set("source", source);
  return u.toString();
}
