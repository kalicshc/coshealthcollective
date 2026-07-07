import { ACCENTS } from "@/lib/accents";
import { bookingUrl } from "@/lib/bookingLinks";
import { TrackedLink } from "@/components/analytics/TrackedLink";

/**
 * The women's-hormone conversion pair, repeated down the page so wording,
 * destinations, and tracking never drift:
 *   primary  — "Book a Free Consult"        (ready-now visitors)
 *   partner  — "Take the 3-Minute Symptom Quiz" (not-ready-yet visitors;
 *              the quiz captures a warm lead at the end)
 *
 * `source` is both the analytics placement id and the ?source= on the Hint
 * link, so click events and bookings attribute identically.
 */

type Props = {
  source: string;
  quizHref?: string;
  align?: "center" | "left";
  size?: "md" | "lg";
};

export function CoPrimaryCtas({ source, quizHref = "/hormone/womens-health/quiz", align = "center", size = "md" }: Props) {
  const a = ACCENTS.hormone;
  const pad = size === "lg" ? "px-9 py-4 text-base" : "px-7 py-3.5 text-sm";
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 ${align === "center" ? "justify-center" : "justify-start"}`}>
      <TrackedLink
        href={bookingUrl("freeConsult", source)}
        analytics={{ source, service: "hormone", appt: "freeConsult", label: "Book a Free Consult" }}
        className={`rounded-full font-bold hover:opacity-85 transition-opacity ${pad}`}
        style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})`, color: "#fff", boxShadow: `0 12px 36px rgba(${a.rgb},0.35)` }}
      >
        Book a Free Consult
      </TrackedLink>
      <TrackedLink
        href={quizHref}
        event="cta_click"
        analytics={{ source, service: "hormone", label: "Take the Quiz" }}
        className={`rounded-full font-semibold hover:opacity-85 transition-opacity ${pad}`}
        style={{ border: `1px solid rgba(${a.rgb},0.45)`, color: `rgb(${a.rgb})` }}
      >
        Take the 3-Minute Symptom Quiz
      </TrackedLink>
    </div>
  );
}
