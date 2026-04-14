import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why 2.0 ATA | Colorado Springs Health Collective — Hyperbaric",
  description: "The clinical case for 2.0 ATA hyperbaric oxygen therapy. Pressure-specific outcomes, research by indication, and why soft chambers don't replicate real HBOT.",
};

const pressureData = [
  {
    indication: "Stroke Recovery",
    optimal: "2.0–2.4 ATA",
    finding: "SPECT imaging confirms dormant neuron reactivation. Aviv et al. (2022): significant improvements in neurological function at 2.0 ATA. Lower pressures show no equivalent imaging-confirmed neural response.",
  },
  {
    indication: "TBI / Post-Concussion",
    optimal: "1.5–2.0 ATA",
    finding: "The one nuanced case. Mild TBI: 1.5 ATA shows benefit in some trials. Moderate-to-severe TBI and chronic TBI: 2.0 ATA produces superior outcomes. Wolf et al. (2012) military TBI: 1.5 ATA showed functional gains.",
  },
  {
    indication: "Wound Healing",
    optimal: "2.0–2.4 ATA",
    finding: "UHMS guidelines specify 2.0–2.5 ATA for compromised wounds. Below 1.5 ATA: insufficient oxygen tension for fibroblast proliferation, collagen synthesis, and bactericidal effect against anaerobes.",
  },
  {
    indication: "Anti-Aging / Longevity",
    optimal: "2.0 ATA",
    finding: "Hachmo et al. (2020) Tel Aviv — the landmark telomere/senescent cell study — used 2.0 ATA exclusively. The 20%+ telomere lengthening and 37% senescent cell reduction are specific to this pressure.",
  },
  {
    indication: "Long COVID",
    optimal: "2.0 ATA",
    finding: "Zilberman-Itskovich et al. (2022): 2.0 ATA produced significant cognitive, fatigue, and cardiac improvements confirmed at 1-year follow-up. No comparable controlled data exists for sub-1.5 ATA in Long COVID.",
  },
  {
    indication: "Fibromyalgia / Chronic Pain",
    optimal: "2.0 ATA",
    finding: "Efrati et al. (2015) randomized trial used 2.0 ATA. Outperformed pregabalin head-to-head. The neurological pain modulation mechanism requires oxygen partial pressures only achievable at this level.",
  },
  {
    indication: "Angiogenesis",
    optimal: "≥2.0 ATA",
    finding: "New blood vessel formation requires repeated hyperoxia-hypoxia cycling. The hyperoxia phase demands ≥2.0 ATA to create the oxygen gradient that stimulates VEGF upregulation and endothelial sprouting.",
  },
  {
    indication: "Stem Cell Mobilization",
    optimal: "≥2.0 ATA",
    finding: "Thom et al. (2006): 8× stem cell increase from bone marrow requires 2.0 ATA for 20 sessions minimum. This mechanism does not activate meaningfully at 1.3–1.5 ATA.",
  },
];

const softChamberProblems = [
  {
    title: "Physics Problem",
    body: "At 1.3 ATA breathing 21% ambient air (not 100% O₂), the oxygen partial pressure is roughly 0.27 atm — barely above normal atmospheric levels. You cannot achieve therapeutic hyperoxia without both pressure AND concentrated oxygen.",
  },
  {
    title: "No Angiogenesis",
    body: "New blood vessel formation requires a steep oxygen gradient. The mild pressure elevation from a soft chamber is insufficient to create the hyperoxic environment that stimulates VEGF and triggers angiogenesis.",
  },
  {
    title: "No Bactericidal Effect",
    body: "HBOT kills anaerobic bacteria by flooding tissue with oxygen. This requires oxygen partial pressures above 1.5 atm absolute — unachievable in soft chambers operating at 1.3 ATA with ambient air.",
  },
  {
    title: "No Meaningful Stem Cell Release",
    body: "The 8× stem cell mobilization documented in peer-reviewed research occurs at 2.0 ATA with 100% oxygen. Soft chambers cannot replicate this response.",
  },
  {
    title: "No Fibroblast Enhancement",
    body: "Wound healing depends on fibroblast proliferation and collagen synthesis — both oxygen-dependent processes. The oxygen levels in soft chambers are not sufficient to drive these responses.",
  },
  {
    title: "Not Recognized as HBOT",
    body: "The Undersea and Hyperbaric Medical Society (UHMS) and Cochrane reviews define therapeutic HBOT as breathing ≥95% oxygen at >1.5 ATA. Soft chambers are legally and clinically categorized as a different modality.",
  },
];

const refs = [
  "Hachmo Y, et al. Hyperbaric oxygen therapy increases telomere length and decreases immunosenescence in isolated blood cells. Aging (Albany NY). 2020.",
  "Zilberman-Itskovich S, et al. Hyperbaric oxygen therapy for long post-COVID-19 syndrome. Scientific Reports. 2022.",
  "Efrati S, et al. Hyperbaric oxygen therapy can diminish fibromyalgia syndrome. PLoS ONE. 2015.",
  "Aviv JE, et al. Hyperbaric oxygen therapy for mild cognitive impairment. Aging (Albany NY). 2022.",
  "Wolf G, et al. Hyperbaric side effects on the injured brain. Am J Phys Med Rehabil. 2012.",
  "Thom SR, et al. Stem cell mobilization by hyperbaric oxygen. Am J Physiology. 2006.",
  "Undersea and Hyperbaric Medical Society. HBOT Indications. 14th edition.",
  "Cochrane Reviews on Hyperbaric Oxygen Therapy (multiple, 2005–2023).",
];

const glassCard = {
  background: "hsla(210,22%,22%,0.5)",
  border: "1px solid hsla(177,70%,59%,0.18)",
  backdropFilter: "blur(12px)",
} as React.CSSProperties;

const glassBubble = {
  background: "linear-gradient(155deg, hsla(177,40%,10%,0.95), hsla(210,40%,10%,0.95))",
  border: "1px solid hsla(177,70%,59%,0.28)",
  backdropFilter: "blur(16px)",
  boxShadow: "0 0 80px hsla(177,70%,55%,0.08), 0 32px 80px rgba(2,6,23,0.42)",
} as React.CSSProperties;

const gradientText = {
  background: "linear-gradient(135deg, hsl(177,88%,62%), hsl(210,70%,58%))",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

export default function Why2ATAPage() {
  return (
    <div className="page-bg pt-28">
      {/* Header */}
      <section className="relative py-20 lg:py-24 text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(177,70%,59%,0.1) 0%, transparent 60%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-5">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(177,70%,62%)" }}>
            The Pressure Evidence
          </p>
          <h1 className="text-4xl font-black text-white lg:text-6xl mb-5" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}>
            Why{" "}
            <span style={gradientText}>2.0 ATA</span>{" "}
            Is Not<br />
            Just a Number.
          </h1>
          <p style={{ color: "hsl(210,25%,65%)", fontSize: "17px", lineHeight: "1.7" }}>
            Most providers in Colorado Springs operate at 1.3–1.6 ATA. There is a clinical reason that every major research trial, every FDA-approved indication, and every UHMS guideline specifies 2.0 ATA or higher. Here is what the evidence actually says.
          </p>
        </div>
      </section>

      {/* Medical definition */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="rounded-3xl p-8 lg:p-12" style={glassBubble}>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(177,70%,62%)" }}>
              The Medical Definition
            </p>
            <h2 className="text-3xl font-black text-white mb-6">
              What{" "}
              <span style={gradientText}>Real HBOT</span>{" "}
              Requires
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: "hsl(210,25%,65%)", fontSize: "16px" }}>
              The Undersea and Hyperbaric Medical Society (UHMS) — the governing body for clinical hyperbaric medicine — defines therapeutic hyperbaric oxygen therapy as breathing{" "}
              <strong style={{ color: "#fff" }}>≥95% oxygen at pressures greater than 1.5 atmospheres absolute (ATA)</strong>.
            </p>
            <p className="leading-relaxed mb-5" style={{ color: "hsl(210,25%,65%)", fontSize: "16px" }}>
              Cochrane systematic reviews, which set the gold standard for evidence-based medicine, use the same threshold. Any protocol operating below 1.5 ATA is not classified as HBOT by these bodies — regardless of what it is called commercially.
            </p>
            <p className="leading-relaxed" style={{ color: "hsl(210,25%,65%)", fontSize: "16px" }}>
              The physics explains why. Oxygen dissolves into plasma in direct proportion to pressure (Henry&apos;s Law). At 2.0 ATA breathing 100% O₂, dissolved oxygen in plasma rises to{" "}
              <strong style={{ color: "#fff" }}>10–15× normal levels</strong> — enough to sustain life without red blood cells. At 1.3 ATA breathing ambient air, the increase is negligible.
            </p>
          </div>
        </div>
      </section>

      {/* Soft chamber problems */}
      <section
        className="py-16 lg:py-20"
        style={{ background: "hsla(210,22%,14%,0.7)", borderTop: "1px solid hsla(177,70%,59%,0.1)" }}
      >
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(177,70%,62%)" }}>
              The 1.3–1.6 ATA Problem
            </p>
            <h2 className="text-3xl font-black text-white lg:text-4xl">
              Why Lower Pressures{" "}
              <span style={gradientText}>Don&apos;t Work.</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto" style={{ color: "hsl(210,25%,62%)", fontSize: "16px" }}>
              Soft chambers and mild-pressure clinics are not a more affordable version of HBOT. They are a different modality — one that cannot replicate the biological mechanisms that produce clinical results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {softChamberProblems.map((p) => (
              <div key={p.title} className="rounded-2xl p-6" style={glassCard}>
                <h3 className="font-bold mb-2 text-sm" style={{ color: "hsl(177,70%,65%)" }}>{p.title}</h3>
                <p style={{ color: "hsl(210,25%,62%)", fontSize: "14px", lineHeight: "1.65" }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1.5 ATA exception */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="rounded-3xl p-8 lg:p-12" style={glassBubble}>
            <div className="flex items-start gap-4 mb-5">
              <div className="text-2xl mt-1">⚠️</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(177,70%,62%)" }}>
                  The One Exception
                </p>
                <h2 className="font-black text-white" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                  Mild TBI at 1.5 ATA —{" "}
                  <span style={gradientText}>What the Research Shows</span>
                </h2>
              </div>
            </div>
            <p className="leading-relaxed mb-4" style={{ color: "hsl(210,25%,65%)", fontSize: "16px" }}>
              Wolf et al. (2012) conducted a randomized controlled trial in military personnel with mild TBI. The 1.5 ATA group showed statistically significant improvements in post-concussion symptoms, while the 2.4 ATA group did not outperform it on that specific measure.
            </p>
            <p className="leading-relaxed mb-4" style={{ color: "hsl(210,25%,65%)", fontSize: "16px" }}>
              This is a real finding and we cite it honestly. For{" "}
              <strong style={{ color: "#fff" }}>mild TBI specifically</strong>, 1.5 ATA may be appropriate — and in some cases, higher pressures may not be better for this indication.
            </p>
            <p className="leading-relaxed" style={{ color: "hsl(210,25%,65%)", fontSize: "16px" }}>
              However: this single exception does not validate 1.3 ATA soft chambers, does not apply to moderate-to-severe TBI, and does not generalize to stroke, wound healing, anti-aging, autoimmune disease, Long COVID, or any other indication. For every other condition with strong evidence, 2.0 ATA is the studied dose.
            </p>
          </div>
        </div>
      </section>

      {/* Pressure by indication table */}
      <section
        className="py-16 lg:py-20"
        style={{ background: "hsla(210,22%,14%,0.7)", borderTop: "1px solid hsla(177,70%,59%,0.1)" }}
      >
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(177,70%,62%)" }}>
              Pressure-Specific Outcomes
            </p>
            <h2 className="text-3xl font-black text-white lg:text-4xl">
              What the Research Used.{" "}
              <span style={gradientText}>By Indication.</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "hsl(210,25%,62%)", fontSize: "16px" }}>
              Every landmark trial cited in HBOT evidence used a specific pressure. Here is what was studied — and what produced results.
            </p>
          </div>

          <div className="space-y-4">
            {pressureData.map((row) => (
              <div key={row.indication} className="rounded-2xl p-6" style={glassCard}>
                <div className="flex flex-wrap items-start gap-4">
                  <div className="min-w-[180px]">
                    <div className="font-black text-sm mb-2" style={{ color: "#fff" }}>{row.indication}</div>
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                      style={gradientText}
                    >
                      {row.optimal}
                    </div>
                  </div>
                  <p className="flex-1" style={{ color: "hsl(210,25%,62%)", fontSize: "14px", lineHeight: "1.65" }}>{row.finding}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom line */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="rounded-3xl p-8 lg:p-12 text-center" style={glassBubble}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(177,70%,62%)" }}>
              The Bottom Line
            </p>
            <h2 className="text-3xl font-black text-white mb-6 lg:text-4xl">
              Dose Is Everything in{" "}
              <span style={gradientText}>Oxygen Therapy.</span>
            </h2>
            <p className="max-w-2xl mx-auto mb-5" style={{ color: "hsl(210,25%,65%)", fontSize: "17px", lineHeight: "1.7" }}>
              In medicine, a half-dose of a drug is not the same as the full dose — and this is not an exception. The clinical trials that demonstrate real outcomes used 2.0–2.4 ATA with 100% oxygen. That is the dose. That is what we deliver.
            </p>
            <p className="max-w-2xl mx-auto mb-8" style={{ color: "hsl(210,25%,65%)", fontSize: "17px", lineHeight: "1.7" }}>
              Most local providers operate below this threshold. We built this clinic specifically because the clinical evidence demanded it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/hyperbaric/evidence"
                className="rounded-full px-8 py-3.5 text-sm font-semibold hover:opacity-80 transition-opacity"
                style={{ border: "1px solid hsla(177,70%,59%,0.4)", color: "hsl(177,70%,72%)" }}
              >
                See Full Evidence Library →
              </Link>
              <Link
                href="/hyperbaric"
                className="rounded-full px-8 py-3.5 text-sm font-bold hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, hsl(177,70%,59%), hsl(210,70%,55%))",
                  color: "hsl(210,32%,10%)",
                  boxShadow: "0 8px 32px hsla(177,70%,50%,0.25)",
                }}
              >
                Register — 25% Off at Launch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* References */}
      <section className="pb-16">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <details className="rounded-2xl p-6" style={glassCard}>
            <summary className="text-xs font-bold uppercase tracking-widest cursor-pointer select-none" style={{ color: "hsl(177,70%,59%)" }}>
              References ({refs.length})
            </summary>
            <ol className="mt-4 space-y-2 list-decimal list-inside">
              {refs.map((r) => (
                <li key={r} style={{ color: "hsl(210,25%,52%)", fontSize: "13px", lineHeight: "1.6" }}>{r}</li>
              ))}
            </ol>
          </details>
        </div>
      </section>
    </div>
  );
}
