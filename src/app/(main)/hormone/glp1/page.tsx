import type { Metadata } from "next";
import { clinicFacts, usd } from "@/lib/clinicFacts";
import { ACCENTS } from "@/lib/accents";
import { ServiceHero } from "@/components/ServiceHero";
import { glassCardStyle } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { ReviewStrip } from "@/components/ReviewStrip";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { bookingUrl } from "@/lib/bookingLinks";

export const metadata: Metadata = {
  alternates: { canonical: "/hormone/glp1" },
  title: "GLP-1 Weight Loss | Colorado Springs Health Collective",
  description: "Semaglutide and tirzepatide in Colorado Springs with a real metabolic review. GLP-1 care that fits your weight, hormones, and long-term goals.",
};

const ACCENT = ACCENTS.hormone;

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

const whatMakesDifferent = [
  {
    title: "Metabolic review first",
    text: "We look at your full metabolic picture — thyroid, insulin resistance, cortisol patterns, and hormone status — before writing a prescription.",
  },
  {
    title: "Hormone integration",
    text: "GLP-1s and hormones interact. Women on HRT and men managing testosterone should have those pieces coordinated, not treated in separate silos.",
  },
  {
    title: "Body composition focus",
    text: "Weight loss on GLP-1 is not always muscle-sparing. We track body composition and adjust accordingly — because losing the wrong weight is not a win.",
  },
  {
    title: "Long-term care plan",
    text: "Most patients eventually taper off GLP-1s. What happens next matters. We build toward a sustainable plan — not just a prescription and a refill.",
  },
];

const notForEveryone = [
  "Active pancreatitis or personal/family history of MEN2 or medullary thyroid cancer",
  "Pregnancy or planning to become pregnant",
  "Severe kidney disease or certain GI conditions",
  "Primarily seeking weight loss without lifestyle engagement",
];

const pricingFeatures = [
  "Symptoms, goals, risk factors, preferences, and special considerations",
  "Lab ordering and a follow-up visit to review your results with you",
  "Personalized treatment options and next-step recommendations",
  "Ongoing follow-up, medication management, and adjustments once established",
];

const PAGE = "glp1";

export default function GLP1Page() {
  return (
    <div>
      <ServiceHero
        service="hormone"
        eyebrow="Metabolic Care"
        title={
          <>
            GLP-1 Weight Loss Colorado Springs
            <span className="sr-only"> — Semaglutide (Ozempic/Wegovy) and Tirzepatide (Mounjaro/Zepbound) with Metabolic Review</span>
          </>
        }
        titleAccent="with a deeper metabolic review."
        subhead="Semaglutide and tirzepatide care that fits your weight, hormones, and long-term goals — not just a prescription and a refill."
        ctas={[
          { label: "Book a Free Consult", href: bookingUrl("freeConsult", "glp1-hero"), external: true },
        ]}
      >
        <div className="rounded-[28px] p-6 text-left lg:p-8" style={glassCardStyle("hormone")}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: `rgb(${ACCENT.rgb})` }}>
            What We Offer
          </p>
          <h2 className="text-xl font-bold mb-6 text-white">Medications + a real plan.</h2>
          <div className="flex flex-col gap-3">
            {["Semaglutide (Ozempic/Wegovy)", "Tirzepatide (Mounjaro/Zepbound)", "Metabolic health review", "Body composition tracking", "Hormone integration", "Long-term care planning"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </ServiceHero>

      <div className="section-divider" />

      {/* Pricing */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `rgb(${ACCENT.rgb})` }}>
              Pricing
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              Transparent GLP-1 care pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl" style={{ color: "hsl(210,25%,68%)", fontSize: "17px", lineHeight: "1.65" }}>
              The initial consult includes a comprehensive review, lab ordering, and lab review with you. Labs and medications are billed separately.
            </p>
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
            <h3 className="mt-6 text-2xl font-black text-white">GLP-1 Metabolic Care</h3>
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
              Includes review of symptoms, goals, risk factors, preferences, and special considerations, plus lab ordering and a visit to review the results together. Does not include lab costs or medications.
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

      {/* Medications */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `rgb(${ACCENT.rgb})` }}>
              The Medications
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              Semaglutide vs. tirzepatide
            </h2>
            <p className="mt-4" style={{ color: "hsl(210,25%,68%)", fontSize: "17px", lineHeight: "1.65" }}>
              Both work. They work differently, with different efficacy profiles and side effect patterns. We help you choose the right one for your biology.
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
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `rgb(${ACCENT.rgb})` }}>
              What Makes This Different
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              More than a prescription.
            </h2>
            <p className="mt-4" style={{ color: "hsl(210,25%,68%)", fontSize: "17px", lineHeight: "1.65" }}>
              The drug works. What happens around it — the evaluation, the monitoring, the plan — is what determines whether the results last.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {whatMakesDifferent.map((item) => (
              <div key={item.title} className="service-card-transparent rounded-[28px] p-7">
                <div className="h-0.5 w-14 rounded-full mb-4" style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }} />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not for everyone */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="rounded-[32px] p-8 lg:p-10" style={glassCardStyle("hormone")}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `rgb(${ACCENT.rgb})` }}>
              Not for everyone
            </p>
            <h3 className="text-2xl font-bold text-white mb-5">
              GLP-1s are not appropriate in every situation.
            </h3>
            <div className="flex flex-col gap-3">
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
              This is part of why the evaluation matters. Knowing what to rule out first is as important as knowing what to prescribe.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div
            className="rounded-[36px] border p-8 text-center lg:p-12"
            style={{
              borderColor: `rgba(${ACCENT.rgb},0.2)`,
              background: `linear-gradient(135deg, rgba(${ACCENT.rgb},0.14), hsla(272,90%,52%,0.18), hsla(210,22%,22%,0.52))`,
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: `rgb(${ACCENT.rgb})` }}>
              Start the Conversation
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              Find out if GLP-1 is right for you.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl" style={{ color: "hsl(210,25%,72%)", fontSize: "17px", lineHeight: "1.65" }}>
              Book a free consult. No commitment — just a real conversation about whether this fits.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <TrackedLink
                href={bookingUrl("freeConsult", "glp1-cta")}
                analytics={{ page: PAGE, source: "glp1-cta", service: "hormone", label: "Book a Free Consult", appt: "freeConsult" }}
                className="rounded-full px-8 py-3.5 text-sm font-bold hover:opacity-85 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`, color: "hsl(210,32%,10%)" }}
              >
                Book a Free Consult
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <ReviewStrip variant="strip" service="hormone" source="glp1-reviews" />
        </div>
      </section>

      <PageCtaFooter
        service="hormone"
        heading="Ready to talk GLP-1?"
        body="Book a free consult, or reach out — we'll help you decide if medically-managed weight loss fits your goals."
        primaryCta={{ label: "Book a Free Consult", href: bookingUrl("freeConsult", "glp1-footer"), external: true }}
        analytics={{ page: PAGE, source: "glp1-footer", service: "hormone", label: "Book a Free Consult", appt: "freeConsult" }}
      />
    </div>
  );
}
