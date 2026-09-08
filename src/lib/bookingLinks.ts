/**
 * Single source of truth for Hint booking links.
 *
 * Two distinct appointment types exist ON PURPOSE (confirmed by Logan):
 *  - meetGreet   — "Free Meet & Greet" (DPC + the global navbar Book button)
 *  - freeConsult — "Free Consult" (all hormone pages)
 *
 * Always build links through bookingUrl() and pass a `source` so bookings
 * are attributable to the page/section that sent them (Hint ignores unknown
 * query params, so ?source= is safe). The Vercel analytics `book_redirect`
 * event should carry the same source string — see src/lib/analytics.ts.
 */

const BOOKING_BASE =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=";

export const APPT = {
  meetGreet: "appty-d2b5ee660e1e0207",
  freeConsult: "appty-5688330a3b52e266",
  telehealth: "appty-ec8b65946e958f69",
} as const;

export type ApptKey = keyof typeof APPT;

export function bookingUrl(key: ApptKey, source?: string): string {
  const u = new URL(BOOKING_BASE + APPT[key]);
  if (source) u.searchParams.set("source", source);
  return u.toString();
}

/** Non-booking Hint destinations (signup flows, member login). */
const HINT_ROOT = "https://colorado-springs-health-collective-direct-primary-care.hint.com";

export const HINT_LINKS = {
  dpcMembershipSignup: `${HINT_ROOT}/signup/membership/contacts`,
  urgentCareInPerson: `${HINT_ROOT}/signup/urgentcarevisit`,
  rxSkincare: `${HINT_ROOT}/signup/rxskincare`,
  memberLogin: `${HINT_ROOT}/login/request?redirectTo=%2Faccount%2Fbooking`,
} as const;

/**
 * Telehealth sign-up. Every telehealth booking CTA on the site must use
 * this (via bookingUrl("telehealth", source)) — confirmed by Logan 2026-09-08.
 * Old destination was HINT_LINKS.urgentCareTelehealth (/signup/telehealth).
 */

export function hintLink(key: keyof typeof HINT_LINKS, source?: string): string {
  const u = new URL(HINT_LINKS[key]);
  if (source) u.searchParams.set("source", source);
  return u.toString();
}
