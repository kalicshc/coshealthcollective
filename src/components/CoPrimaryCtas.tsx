import { ACCENTS, type ServiceKey } from "@/lib/accents";
import { bookingUrl, type ApptKey } from "@/lib/bookingLinks";
import { TrackedLink } from "@/components/analytics/TrackedLink";

/**
 * A service page's conversion pair, repeated down the page so wording,
 * destinations, and tracking never drift:
 *   primary   — the booking action (ready-now visitors)
 *   secondary — the softer on-ramp (not-ready-yet visitors; a quiz,
 *               pricing anchor, or evidence link that keeps them moving)
 *
 * Defaults are the women's-hormone pair ("Book a Free Consult" + symptom
 * quiz) so existing hormone call sites render unchanged. Other services
 * pass `service` + `primary`/`secondary` overrides.
 *
 * `source` is both the analytics placement id and the ?source= on the Hint
 * link, so click events and bookings attribute identically.
 */

type CtaSpec = {
  label: string;
  /** Direct destination (internal anchor or route). Ignored when `appt` is set. */
  href?: string;
  /** Hint appointment type — builds the booking URL and fires book_redirect. */
  appt?: ApptKey;
  /** Shorter label for analytics events when the display label is long. */
  analyticsLabel?: string;
};

type Props = {
  source: string;
  service?: ServiceKey;
  primary?: CtaSpec;
  secondary?: CtaSpec;
  align?: "center" | "left";
  size?: "md" | "lg";
};

const DEFAULT_PRIMARY: CtaSpec = { label: "Book a Free Consult", appt: "freeConsult" };
const DEFAULT_SECONDARY: CtaSpec = { label: "Take the 3-Minute Symptom Quiz", href: "/hormone/womens-health/quiz", analyticsLabel: "Take the Quiz" };

export function CoPrimaryCtas({
  source,
  service = "hormone",
  primary = DEFAULT_PRIMARY,
  secondary = DEFAULT_SECONDARY,
  align = "center",
  size = "md",
}: Props) {
  const a = ACCENTS[service];
  const pad = size === "lg" ? "px-9 py-4 text-base" : "px-7 py-3.5 text-sm";
  const primaryHref = primary.appt ? bookingUrl(primary.appt, source) : primary.href ?? "#";
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 ${align === "center" ? "justify-center" : "justify-start"}`}>
      <TrackedLink
        href={primaryHref}
        event={primary.appt ? "book_redirect" : "cta_click"}
        analytics={{ source, service, appt: primary.appt, label: primary.analyticsLabel ?? primary.label }}
        className={`rounded-full font-bold hover:opacity-85 transition-opacity ${pad}`}
        style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})`, color: "#fff", boxShadow: `0 12px 36px rgba(${a.rgb},0.35)` }}
      >
        {primary.label}
      </TrackedLink>
      <TrackedLink
        href={secondary.href ?? "#"}
        event="cta_click"
        analytics={{ source, service, label: secondary.analyticsLabel ?? secondary.label }}
        className={`rounded-full font-semibold hover:opacity-85 transition-opacity ${pad}`}
        style={{ border: `1px solid rgba(${a.rgb},0.45)`, color: `rgb(${a.rgb})` }}
      >
        {secondary.label}
      </TrackedLink>
    </div>
  );
}
