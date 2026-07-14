import type { Metadata } from "next";
import { clinicFacts, usd } from "@/lib/clinicFacts";
import { ACCENTS } from "@/lib/accents";
import { SceneSection, Eyebrow, SCENE_H, SCENE_P } from "@/components/SceneSection";
import { CoPrimaryCtas } from "@/components/CoPrimaryCtas";
import { PricingColumns } from "@/components/PricingColumns";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { glassCardStyle } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { ReviewStrip, RatingChip } from "@/components/ReviewStrip";
import { bookingUrl } from "@/lib/bookingLinks";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

// The GLP-1 page on the epic-scene language (womens-health/hormone hub):
// cinematic hero → what makes this different → the medications → who it's
// not for → pricing → proof → action. Kept deliberately lean.

export const metadata: Metadata = {
  alternates: { canonical: "/hormone/glp1" },
  title: "GLP-1 Weight Loss",
  description: "Semaglutide and tirzepatide in Colorado Springs with a real metabolic review. GLP-1 care that fits your weight, hormones, and long-term goals.",
  openGraph: {
    images: [{ url: "/images/hormone/glp1-hero.webp", alt: "GLP-1 Weight Loss — Colorado Springs Health Collective" }],
  },
};

const glp1Schema = serviceSchema({
  type: "MedicalTherapy",
  name: "GLP-1 Weight Loss Therapy",
  description: "Semaglutide and tirzepatide in Colorado Springs with a real metabolic review. GLP-1 care that fits your weight, hormones, and long-term goals.",
  path: "/hormone/glp1",
  image: "/images/hormone/glp1-hero.webp",
  offers: [
    { name: "One-time enrollment fee", price: clinicFacts.enrollmentFee },
    { name: "GLP-1 metabolic care membership (per month)", price: clinicFacts.hormone.monthlyManagement },
    { name: "DPC + GLP-1 combo membership (per month)", price: clinicFacts.combo.monthly },
  ],
});

const glp1Breadcrumbs = breadcrumbSchema([
  { name: "Hormone + Metabolic Care", path: "/hormone" },
  { name: "GLP-1 Weight Loss", path: "/hormone/glp1" },
]);

const ACCENT = ACCENTS.hormone;
const PAGE = "glp1";

// Same gradient-clip stops as the women's page headlines.
const pinkLight = "hsl(340,100%,82%)";
const pinkDeep = "hsl(281,86%,67%)";

const whatMakesDifferent = [
  { title: "Metabolic review first", text: "Thyroid, insulin resistance, cortisol, and hormone status — the full picture before any prescription." },
  { title: "Hormone integration", text: "GLP-1s and hormones interact. HRT and testosterone get coordinated here, not treated in separate silos." },
  { title: "Body composition focus", text: "We track body composition and adjust — losing muscle instead of fat is not a win." },
  { title: "Long-term care plan", text: "Most patients eventually taper off. We build toward what comes next, not just the refill." },
];

const medications = [
  {
    name: "Semaglutide",
    brand: "Ozempic / Wegovy",
    body: "A GLP-1 receptor agonist that reduces appetite, slows gastric emptying, and improves insulin sensitivity. The most studied GLP-1 in long-term weight management trials.",
  },
  {
    name: "Tirzepatide",
    brand: "Mounjaro / Zepbound",
    body: "Dual GIP + GLP-1 agonist with stronger weight loss outcomes in head-to-head trials. More effective on average — but not the right fit for everyone.",
  },
];

const notForEveryone = [
  "Personal or family history of medullary thyroid cancer or MEN2",
  "Active pancreatitis",
  "Pregnancy or planning to become pregnant",
  "Severe kidney disease or certain GI conditions",
];

function Glp1Ctas({ source, size, align }: { source: string; size?: "md" | "lg"; align?: "center" | "left" }) {
  return (
    <CoPrimaryCtas
      service="hormone"
      source={source}
      primary={{ label: "Book a Free Consult", appt: "freeConsult" }}
      secondary={{ label: "See Pricing", href: "#pricing" }}
      size={size}
      align={align}
    />
  );
}

export default function GLP1Page() {
  return (
    <div className="pb-20 lg:pb-0">
      <JsonLd data={glp1Schema} />
      <JsonLd data={glp1Breadcrumbs} />
      <h1 className="sr-only">GLP-1 Weight Loss Colorado Springs — Semaglutide (Ozempic/Wegovy) and Tirzepatide (Mounjaro/Zepbound) with Metabolic Review</h1>

      {/* ── 1. CINEMATIC HERO ─────────────────────────────────────────── */}
      <SceneSection image="/images/hormone/glp1-hero.webp" scrim="hero" minHeight="100svh" priority maxWidthClassName="max-w-7xl" scrollCue="#different">
        <div className="max-w-3xl pt-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-100">
              Metabolic Care · GLP-1
            </span>
            <RatingChip service="hormone" source="glp1-hero" />
          </div>
          <p
            aria-hidden="true"
            className="mt-8 text-4xl font-bold text-white lg:text-6xl"
            style={{ textShadow: "0 10px 34px rgba(0,0,0,0.42)", lineHeight: 1.1 }}
          >
            GLP-1 weight loss,
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
              with a real plan.
            </span>
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white" style={{ textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}>
            Semaglutide and tirzepatide with a full metabolic review — care that fits your weight,
            hormones, and long-term goals, not just a refill.
          </p>
          <div className="mt-9">
            <Glp1Ctas source="glp1-hero" size="lg" align="left" />
          </div>
        </div>
      </SceneSection>

      {/* ── 2. FULL-BLEED SCENE — what makes this different ───────────── */}
      <SceneSection image="/images/hormone/window-backdrop-v2.webp" scrim="side" id="different">
        <Eyebrow>What Makes This Different</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
          More than a prescription.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
          The drug works. What happens around it — the evaluation, the monitoring, the plan — is what
          determines whether the results last.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {whatMakesDifferent.map((item) => (
            <div key={item.title} className="rounded-[20px] border border-white/10 bg-slate-950/70 p-5" style={{ backdropFilter: "blur(8px)" }}>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </SceneSection>

      {/* ── 3. THE MEDICATIONS ────────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-10 text-center">
            <Eyebrow>The Medications</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Semaglutide vs. tirzepatide
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              Both work — differently. We help you choose the right one for your biology.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {medications.map((med) => (
              <div key={med.name} className="rounded-[28px] p-7" style={glassCardStyle("hormone")}>
                <div className="h-0.5 w-14 rounded-full mb-4" style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }} />
                <h3 className="text-2xl font-black text-white">{med.name}</h3>
                <p className="text-sm mb-4" style={{ color: "hsl(210,20%,68%)" }}>{med.brand}</p>
                <p className="text-sm leading-7 text-slate-300">{med.body}</p>
              </div>
            ))}
          </div>

          {/* Not for everyone */}
          <div className="mt-10 rounded-[32px] p-8 lg:p-10" style={glassCardStyle("hormone")}>
            <Eyebrow>Not for everyone</Eyebrow>
            <h3 className="mt-3 text-2xl font-bold text-white mb-5">
              GLP-1s are not appropriate in every situation.
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {notForEveryone.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-slate-300"
                >
                  <span className="mt-0.5 text-xs" style={{ color: `rgb(${ACCENT.rgb})` }}>✗</span>
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              This is part of why the evaluation matters. Knowing what to rule out first is as important
              as knowing what to prescribe.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. PRICING ────────────────────────────────────────────────── */}
      <section id="pricing" className="scroll-mt-20 py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <div className="mb-10 text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Simple pricing. Three ways in.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              One-time {usd(clinicFacts.enrollmentFee)} enrollment, then a flat monthly rate. Pick GLP-1 care,
              primary care, or bundle both and save.
            </p>
          </div>

          <PricingColumns perspective="glp1" page={PAGE} source="glp1-pricing" />
        </div>
      </section>

      {/* ── 5. FULL-BLEED SCENE — proof + action ──────────────────────── */}
      <SceneSection image="/images/hormone/reviews-v2.webp" scrim="radial" contentClassName="text-center">
        <div className="mb-8">
          <Eyebrow>What patients say</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
            Find out if GLP-1 is right for you.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
            A free consult, no commitment — just a real conversation about whether this fits.
          </p>
        </div>
        <ReviewStrip variant="grid" count={3} service="hormone" source="glp1-reviews" />
        <div className="mt-8">
          <Glp1Ctas source="glp1-reviews" />
        </div>
      </SceneSection>

      <PageCtaFooter
        service="hormone"
        heading="Ready to talk GLP-1?"
        body="Book a free consult, or reach out — we'll help you decide if medically-managed weight loss fits your goals."
        primaryCta={{ label: "Book a Free Consult", href: bookingUrl("freeConsult", "glp1-footer"), external: true }}
        analytics={{ page: PAGE, source: "glp1-footer", service: "hormone", label: "Book a Free Consult", appt: "freeConsult" }}
      />

      <StickyCtaBar
        service="hormone"
        source="glp1"
        appt="freeConsult"
        bookLabel="Book a Free Consult"
        secondaryHref="#pricing"
        secondaryLabel="Pricing"
      />
    </div>
  );
}
