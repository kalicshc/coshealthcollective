import type { Metadata } from "next";
import { clinicFacts, usd } from "@/lib/clinicFacts";
import { ACCENTS } from "@/lib/accents";
import { SceneSection, Eyebrow, SCENE_H, SCENE_P } from "@/components/SceneSection";
import { CoPrimaryCtas } from "@/components/CoPrimaryCtas";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { ReviewStrip, RatingChip } from "@/components/ReviewStrip";
import { bookingUrl } from "@/lib/bookingLinks";

// The men's hormone page on the epic-scene language (womens-health/hormone
// hub): cinematic hero → symptoms → the evaluation → the honest version of
// TRT → pricing → proof → action. Kept deliberately lean.

export const metadata: Metadata = {
  alternates: { canonical: "/hormone/mens-health" },
  title: "Men's Hormone Health + TRT | Colorado Springs Health Collective",
  description: "Comprehensive men's hormone care in Colorado Springs. Low testosterone, TRT optimization, fatigue, recovery, libido — a full evaluation before any treatment.",
};

const ACCENT = ACCENTS.hormone;
const PAGE = "mens-health";

// Same gradient-clip stops as the women's page headlines.
const pinkLight = "hsl(340,100%,82%)";
const pinkDeep = "hsl(281,86%,67%)";

const symptoms = ["fatigue", "low libido", "poor recovery", "brain fog", "strength loss", "weight gain", "low motivation", "mood changes"];

const whatWeEvaluate = [
  { title: "Full hormone panel", text: "Total and free testosterone, SHBG, estradiol, LH, FSH, DHEA-S, thyroid — testosterone in isolation misses most of the picture." },
  { title: "Symptoms, history, and goals", text: "Labs alone don't tell the story. Sleep, recovery, sexual health, and what's actually bothering you." },
  { title: "Prior exposure and fertility", text: "Past testosterone use — or wanting kids — changes the conversation. We ask, because it matters." },
  { title: "Lifestyle and metabolic context", text: "Sleep, training load, stress, and body composition all move hormone levels. We factor them in first." },
];

const trtFacts = [
  { value: "Not always TRT", detail: "Elevated estradiol, high SHBG, sleep apnea, thyroid dysfunction — some causes of low testosterone respond without hormones." },
  { value: "Range ≠ optimal", detail: "\"Normal range\" is a statistical bracket, not your target. Two men with the same number can feel completely different." },
  { value: "Fertility matters", detail: "Exogenous testosterone suppresses natural production. Wanting children — now or later — changes the treatment path entirely." },
  { value: "Long-term thinking", detail: "TRT is not a short-term fix. Monitoring, adjustments, and follow-up keep you in range and feeling well." },
  { value: "Sometimes the answer is metabolic", detail: "Excess body fat and insulin resistance suppress testosterone. When GLP-1 therapy addresses the root cause, we manage it here — not a separate referral." },
];

const pricingFeatures = [
  "Symptoms, goals, risk factors, preferences, and special considerations",
  "Lab ordering and a follow-up visit to review your results with you",
  "Personalized treatment options and next-step recommendations",
  "Ongoing follow-up, medication management, and adjustments once established",
];

function MensCtas({ source, size, align }: { source: string; size?: "md" | "lg"; align?: "center" | "left" }) {
  return (
    <CoPrimaryCtas
      service="hormone"
      source={source}
      primary={{ label: "Book a Free Consult", appt: "freeConsult" }}
      secondary={{ label: "Take the Symptom Quiz", href: "/hormone/mens-health/quiz", analyticsLabel: "Take the quiz" }}
      size={size}
      align={align}
    />
  );
}

export default function MensHealthPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <h1 className="sr-only">Men&apos;s Hormone Therapy &amp; TRT Colorado Springs — Testosterone Replacement, Low T Treatment</h1>

      {/* ── 1. CINEMATIC HERO ─────────────────────────────────────────── */}
      <SceneSection image="/images/hormone/mens-hero.webp" scrim="hero" minHeight="100svh" priority maxWidthClassName="max-w-7xl" scrollCue="#symptoms">
        <div className="max-w-3xl pt-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-100">
              Men&apos;s Hormone Health · TRT
            </span>
            <RatingChip service="hormone" source="mens-health-hero" />
          </div>
          <p
            aria-hidden="true"
            className="mt-8 text-4xl font-bold text-white lg:text-6xl"
            style={{ textShadow: "0 10px 34px rgba(0,0,0,0.42)", lineHeight: 1.1 }}
          >
            Modern men&apos;s health,
            <span
              className="mt-2 block"
              style={{
                background: `linear-gradient(135deg, ${pinkLight}, ${pinkDeep})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.28))",
              }}
            >
              with a deeper look.
            </span>
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white" style={{ textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}>
            Low energy, poor recovery, low libido — not just part of getting older. We run full labs and
            history before deciding whether TRT or another path makes sense.
          </p>
          <div className="mt-9">
            <MensCtas source="mens-health-hero" size="lg" align="left" />
          </div>
        </div>
      </SceneSection>

      {/* ── 2. FULL-BLEED SCENE — the symptoms ────────────────────────── */}
      <SceneSection image="/images/hormone/window-backdrop-v2.webp" scrim="side" id="symptoms">
        <Eyebrow>Common Reasons Men Start Here</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
          The symptoms rarely come alone.
        </h2>
        <div className="mt-8 flex max-w-2xl flex-wrap gap-3">
          {symptoms.map((s) => (
            <span key={s} className="rounded-full border border-white/15 bg-slate-950/60 px-4 py-2 text-sm text-slate-100" style={{ backdropFilter: "blur(8px)" }}>
              {s}
            </span>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
          We don&apos;t start with a prescription. We start with understanding what&apos;s actually going
          on — take the quiz to see where you stand, no email required.
        </p>
      </SceneSection>

      {/* ── 3. THE EVALUATION ─────────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-10 text-center">
            <Eyebrow>The Evaluation</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              What we actually look at
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              Most testosterone workups are incomplete. We run the full picture first.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {whatWeEvaluate.map((item) => (
              <div key={item.title} className="service-card-transparent rounded-[28px] p-7">
                <div className="mb-4 h-0.5 w-14 rounded-full" style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }} />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. ABOUT TRT — the honest version ─────────────────────────── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-10 text-center">
            <Eyebrow>About TRT</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Things most clinics won&apos;t tell you upfront
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {trtFacts.map((fact) => (
              <div key={fact.value} className="service-card-transparent rounded-[28px] p-7">
                <h3 className="text-lg font-black mb-3" style={{ color: `rgb(${ACCENT.rgb})` }}>
                  {fact.value}
                </h3>
                <p className="text-sm leading-7 text-slate-300">{fact.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PRICING ────────────────────────────────────────────────── */}
      <section id="pricing" className="scroll-mt-20 py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="mb-10 text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Transparent pricing
            </h2>
          </div>
          <div
            className="rounded-[34px] border p-8 lg:p-10"
            style={{
              borderColor: `rgba(${ACCENT.rgb},0.22)`,
              background: `linear-gradient(135deg, rgba(${ACCENT.rgb},0.14), hsla(272,90%,52%,0.16), hsla(210,22%,16%,0.72))`,
              boxShadow: "0 24px 80px rgba(7,10,18,0.32)",
            }}
          >
            <div className="h-0.5 w-16 rounded-full" style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }} />
            <h3 className="mt-6 text-2xl font-black text-white">Men&apos;s Hormone + TRT Care</h3>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              <div>
                <span className="text-4xl font-black text-white">{usd(clinicFacts.hormone.initialConsult)}</span>
                <span className="ml-2 text-sm text-slate-400">initial consult + first month</span>
              </div>
              <div>
                <span className="text-3xl font-black text-white">{usd(clinicFacts.hormone.monthlyManagement)}</span>
                <span className="ml-2 text-sm text-slate-400">/ month ongoing management</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Includes review of symptoms, goals, risk factors, preferences, and special considerations,
              plus lab ordering and a visit to review the results together. Does not include lab costs or medications.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {pricingFeatures.map((feature) => (
                <p key={feature} className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-slate-200">
                  {feature}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FULL-BLEED SCENE — proof + action ──────────────────────── */}
      <SceneSection image="/images/hormone/reviews-v2.webp" scrim="radial" contentClassName="text-center">
        <div className="mb-8">
          <Eyebrow>What patients say</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
            A deeper look is where it starts.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
            Book a free consult and get your questions answered before committing to anything.
          </p>
        </div>
        <ReviewStrip variant="grid" count={3} service="hormone" source="mens-reviews" />
        <div className="mt-8">
          <MensCtas source="mens-reviews" />
        </div>
      </SceneSection>

      <PageCtaFooter
        service="hormone"
        heading="Wondering if it's your hormones?"
        body="Book a free consult, or reach out — we'll help you figure out whether testosterone or metabolic care is the right next step."
        primaryCta={{ label: "Book a Free Consult", href: bookingUrl("freeConsult", "mens-health-footer"), external: true }}
        analytics={{ page: PAGE, source: "mens-health-footer", service: "hormone", label: "Book a Free Consult", appt: "freeConsult" }}
      />

      <StickyCtaBar
        service="hormone"
        source="mens-health"
        appt="freeConsult"
        bookLabel="Book a Free Consult"
        secondaryHref="/hormone/mens-health/quiz"
        secondaryLabel="Symptom Quiz"
      />
    </div>
  );
}
