import { ACCENTS } from "@/lib/accents";
import { clinicFacts } from "@/lib/clinicFacts";
import { ServiceHero } from "@/components/ServiceHero";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import WaitlistForm from "@/components/WaitlistForm";
import type { WaitlistInterest } from "@/lib/bookingLinks";

/**
 * The new-patient waitlist — where every booking CTA on the site lands while
 * ACCEPTING_NEW_PATIENTS is false (src/lib/bookingLinks.ts).
 *
 * Tone, per Logan: state plainly that we're not taking new patients and that
 * we'll reach out when we have room. No scarcity, no urgency, no date.
 */

const A = ACCENTS.brand;

const VALID_INTERESTS: readonly string[] = [
  "dpc",
  "hormone",
  "hyperbaric",
  "urgent-care",
  "aesthetics",
  "unsure",
];

export default async function WaitlistPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string; source?: string }>;
}) {
  const { interest, source } = await searchParams;
  const defaultInterest = (
    interest && VALID_INTERESTS.includes(interest) ? interest : "unsure"
  ) as WaitlistInterest | "unsure";

  return (
    <div>
      <ServiceHero
        service="brand"
        eyebrow="Waitlist"
        title={<>We&apos;re not accepting </>}
        titleAccent="new patients right now."
        subhead="Join the waitlist and we'll reach out as soon as we have availability."
        compact
      >
        <div className="mx-auto w-full max-w-lg">
          <div
            className="rounded-3xl px-6 py-7 lg:px-8"
            style={{
              background: "hsla(210,22%,22%,0.5)",
              border: `1px solid rgba(${A.rgb},0.2)`,
              backdropFilter: "blur(12px)",
              boxShadow: "0 16px 48px rgba(2,6,23,0.28)",
            }}
          >
            <WaitlistForm defaultInterest={defaultInterest} source={source ?? "waitlist"} />
          </div>
        </div>
      </ServiceHero>

      <div className="section-divider" />

      {/* ── What this means for you ───────────────────────────────────── */}
      <section className="py-14 lg:py-18">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                heading: "Already a member?",
                body: "Nothing changes. Your care, visits, and portal access continue exactly as they are.",
              },
              {
                heading: "On the waitlist?",
                body: "We'll email or call you when a spot opens. There's nothing you need to do in the meantime.",
              },
              {
                heading: "Need care sooner?",
                body: `Call or text ${clinicFacts.contact.phone} and we'll point you toward a good option.`,
              },
            ].map((card) => (
              <div
                key={card.heading}
                className="rounded-2xl px-5 py-6"
                style={{
                  background: "hsla(210,22%,20%,0.4)",
                  border: `1px solid rgba(${A.rgb},0.14)`,
                }}
              >
                <h2 className="text-sm font-bold text-white">{card.heading}</h2>
                <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "hsl(210,25%,66%)" }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <PageCtaFooter
        service="brand"
        heading="Questions in the meantime?"
        body="Call, text, or email us — we're happy to answer questions even while the waitlist is how we're taking new names."
      />
    </div>
  );
}
