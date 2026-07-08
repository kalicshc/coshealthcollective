import { ACCENTS, type ServiceKey } from "@/lib/accents";
import { clinicFacts } from "@/lib/clinicFacts";
import { bookingUrl } from "@/lib/bookingLinks";
import { TrackedLink } from "@/components/analytics/TrackedLink";

/**
 * Compact end-of-article CTA + contact strip for blog posts. Replaces the
 * hand-rolled "Ready to…?" panels each post used to duplicate. Mirrors the
 * dark-glass language of PageCtaFooter but is scoped to blog attribution:
 * the booking link and the analytics event share the same `source` string
 * (bookingUrl uses it as ?source= and TrackedLink reports it) so a click and
 * its booking always agree. Contact details come from clinicFacts. Server
 * component (TrackedLink is the only client leaf).
 */

type Props = {
  service: ServiceKey;
  /** ?source= for bookingUrl AND the analytics source — must match, e.g. "blog-flu-shot-guide" */
  source: string;
  heading?: string;
  body?: string;
  appt?: "meetGreet" | "freeConsult";
};

export function BlogCtaBlock({
  service,
  source,
  heading = "Questions? Let's talk.",
  body,
  appt = "meetGreet",
}: Props) {
  const a = ACCENTS[service];
  const label = appt === "freeConsult" ? "Book a Free Consult" : "Book a Free Meet & Greet";
  const href = bookingUrl(appt, source);

  return (
    <div
      className="rounded-3xl p-8 lg:p-10 text-center"
      style={{
        background: `linear-gradient(135deg, rgba(${a.rgb},0.14), rgba(${a.rgb},0.06))`,
        border: `1px solid rgba(${a.rgb},0.3)`,
        backdropFilter: "blur(12px)",
        boxShadow: "0 16px 48px rgba(2,6,23,0.28)",
      }}
    >
      <h3 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: "hsl(0, 0%, 100%)" }}>
        {heading}
      </h3>
      {body != null && (
        <p className="mb-6 max-w-lg mx-auto" style={{ color: "hsl(210, 30%, 80%)" }}>
          {body}
        </p>
      )}
      <TrackedLink
        href={href}
        analytics={{ page: "blog", source, service, appt, label }}
        className="inline-block px-8 py-4 rounded-full font-semibold text-lg hover:opacity-85 transition-opacity"
        style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})`, color: "hsl(210, 32%, 10%)" }}
      >
        {label}
      </TrackedLink>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
        <a href={`tel:${clinicFacts.contact.phoneTel}`} className="flex items-center gap-2 hover:opacity-80">
          <span className="text-sm font-semibold" style={{ color: `rgb(${a.rgb})` }}>
            {clinicFacts.contact.phone}
          </span>
        </a>
        <a href={`mailto:${clinicFacts.contact.email}`} className="flex items-center gap-2 hover:opacity-80">
          <span className="text-sm font-semibold" style={{ color: `rgb(${a.rgb})` }}>
            {clinicFacts.contact.email}
          </span>
        </a>
      </div>
    </div>
  );
}
