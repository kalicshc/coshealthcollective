import type { ReactNode } from "react";
import { ACCENTS, type ServiceKey } from "@/lib/accents";
import { GOOGLE_REVIEWS, GOOGLE_REVIEWS_URL, GOOGLE_RATING } from "@/lib/reviews";
import { TrackedLink } from "@/components/analytics/TrackedLink";

/**
 * Social proof next to CTAs, site-wide. Two variants:
 *  - "strip": a single compact row — 5.0 ★ chip + one short quote
 *  - "grid":  2-3 full review cards
 * `extraSlot` is reserved for future consented patient stories (e.g. HRT
 * dismissal-reversal testimonials) — drop them in without touching layout.
 */

type Props = {
  variant?: "strip" | "grid";
  count?: number;
  service?: ServiceKey;
  /** analytics placement id, e.g. "womens-reviews" */
  source: string;
  extraSlot?: ReactNode;
};

export function RatingChip({ service = "brand", source }: { service?: ServiceKey; source: string }) {
  const a = ACCENTS[service];
  return (
    <TrackedLink
      href={GOOGLE_REVIEWS_URL}
      event="cta_click"
      analytics={{ source, label: "google-rating-chip", service }}
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold hover:opacity-85 transition-opacity"
      style={{ border: `1px solid rgba(${a.rgb},0.4)`, color: "#fff", background: "hsla(210,22%,22%,0.5)" }}
    >
      <span style={{ color: "hsl(45,90%,60%)" }}>★★★★★</span>
      {GOOGLE_RATING} on Google
    </TrackedLink>
  );
}

export function ReviewStrip({ variant = "strip", count = 3, service = "brand", source, extraSlot }: Props) {
  const a = ACCENTS[service];
  const reviews = GOOGLE_REVIEWS.slice(0, variant === "strip" ? 1 : count);

  if (variant === "strip") {
    const r = reviews[0];
    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
        <RatingChip service={service} source={source} />
        <p className="max-w-xl text-sm italic leading-relaxed" style={{ color: "hsl(210,25%,72%)" }}>
          &ldquo;{r.quote.length > 140 ? r.quote.slice(0, 137).trimEnd() + "…" : r.quote}&rdquo;
          <span className="not-italic font-semibold" style={{ color: `rgb(${a.rgb})` }}> — {r.name}</span>
        </p>
        {extraSlot}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center mb-8">
        <RatingChip service={service} source={source} />
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {reviews.map((r) => (
          <figure
            key={r.name}
            className="rounded-2xl p-6"
            style={{
              background: "hsla(210,22%,22%,0.5)",
              border: `1px solid rgba(${a.rgb},0.18)`,
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="mb-3 text-sm" style={{ color: "hsl(45,90%,60%)" }}>★★★★★</div>
            <blockquote className="text-sm leading-relaxed" style={{ color: "hsl(210,25%,78%)" }}>
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold" style={{ color: `rgb(${a.rgb})` }}>
              {r.name} · Google review
            </figcaption>
          </figure>
        ))}
        {extraSlot}
      </div>
    </div>
  );
}
