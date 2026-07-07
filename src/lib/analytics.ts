import { track } from "@vercel/analytics";

/**
 * Typed wrapper around Vercel Analytics custom events so event names and
 * properties stay consistent site-wide. Client-side only (Vercel's track()
 * is a no-op during SSR) — call from client components or event handlers.
 *
 * The 90-day funnel metrics map to:
 *  - hormone consults booked → book_redirect { appt: "freeConsult" }
 *  - DPC memberships/meet-greets → book_redirect { appt: "meetGreet" }
 *  - HBOT waitlist signups → form_submit { service: "hyperbaric" }
 *  - quiz pipeline → quiz_complete
 *
 * `source` strings match the ?source= param on Hint links (bookingLinks.ts)
 * so a click event and its booking attribution always agree.
 */

export type AnalyticsEvent =
  | "cta_click" // internal CTA (quiz link, learn-more, teaser)
  | "book_redirect" // outbound click to Hint booking/signup
  | "form_submit" // any lead form submitted successfully
  | "quiz_start"
  | "quiz_step"
  | "quiz_complete"
  | "review_nav" // review carousel interaction
  | "section_view"; // cinematic section entered viewport

export type AnalyticsProps = {
  /** route slug, e.g. "womens-health" */
  page?: string;
  /** placement id, e.g. "womens-hero" — mirrors bookingUrl() source */
  source?: string;
  service?: "hormone" | "dpc" | "hyperbaric" | "brand";
  /** human-readable CTA text */
  label?: string;
  appt?: "meetGreet" | "freeConsult";
  step?: string | number;
};

export function trackEvent(name: AnalyticsEvent, props: AnalyticsProps = {}) {
  // Vercel accepts flat string/number/boolean values; strip undefined.
  const flat: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(props)) {
    if (v !== undefined) flat[k] = v;
  }
  track(name, flat);
}
