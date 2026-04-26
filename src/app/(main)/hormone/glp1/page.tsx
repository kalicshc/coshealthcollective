import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GLP-1 Weight Loss | Colorado Springs Health Collective",
  description: "Semaglutide and tirzepatide in Colorado Springs with a real metabolic review. GLP-1 care that fits your weight, hormones, and long-term goals.",
};

const medications = [
  {
    name: "Semaglutide",
    brand: "Ozempic / Wegovy",
    body: "A GLP-1 receptor agonist that reduces appetite, slows gastric emptying, and improves insulin sensitivity. The most studied GLP-1 in long-term weight management trials.",
    gradient: "linear-gradient(135deg, hsl(188,88%,54%), hsl(216,79%,46%))",
    border: "hsla(188,88%,54%,0.25)",
  },
  {
    name: "Tirzepatide",
    brand: "Mounjaro / Zepbound",
    body: "Dual GIP + GLP-1 agonist with stronger weight loss outcomes in head-to-head trials. More effective on average — but not the right fit for everyone.",
    gradient: "linear-gradient(135deg, hsl(271,74%,55%), hsl(188,88%,54%))",
    border: "hsla(271,74%,55%,0.25)",
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

const BOOKING_URL =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266";

export default function GLP1Page() {
  return (
    <div className="page-bg pt-28">
      <section className="hero-overlay relative overflow-hidden py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 14% 14%, hsla(188,88%,54%,0.12), transparent 22%), radial-gradient(circle at 88% 14%, hsla(271,74%,55%,0.12), transparent 22%), linear-gradient(180deg, rgba(10,18,28,0.1), rgba(10,18,28,0.5))",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.7), transparent 90%)",
          }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative z-10 max-w-3xl">
              <span
                className="rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]"
                style={{ borderColor: "hsla(188,88%,54%,0.2)", background: "hsla(188,88%,54%,0.08)", color: "hsl(188,88%,78%)" }}
              >
                Metabolic Care
              </span>
              <h1
                className="mt-6 text-4xl font-bold text-white lg:text-6xl"
                style={{ textShadow: "0 10px 34px rgba(0,0,0,0.42)" }}
              >
                GLP-1 Weight Loss Colorado Springs
                <span className="sr-only"> — Semaglutide (Ozempic/Wegovy) and Tirzepatide (Mounjaro/Zepbound) with Metabolic Review</span>
                <span
                  className="mt-2 block"
                  style={{
                    background: "linear-gradient(135deg, hsl(188,88%,62%), hsl(271,74%,62%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.28))",
                  }}
                >
                  with a deeper metabolic review.
                </span>
              </h1>
              <p
                className="mt-6 max-w-2xl text-lg leading-8 text-white"
                style={{ textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}
              >
                Semaglutide and tirzepatide care that fits your weight, hormones, and long-term goals — not just a prescription and a refill.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-7 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(271,74%,55%))",
                    color: "hsl(210,32%,10%)",
                    boxShadow: "0 0 40px hsla(188,80%,50%,0.22)",
                  }}
                >
                  Book a Free Consult
                </Link>
              </div>
            </div>

            <div
              className="rounded-[34px] border p-6 backdrop-blur-xl lg:p-8"
              style={{
                background: "linear-gradient(180deg, hsla(210,36%,13%,0.92), hsla(240,28%,12%,0.9), hsla(210,24%,10%,0.88))",
                borderColor: "hsla(188,88%,54%,0.18)",
                boxShadow: "0 24px 80px rgba(7,10,18,0.42)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(188,88%,72%)" }}>
                What We Offer
              </p>
              <h2 className="text-xl font-bold mb-6 text-white">Medications + a real plan.</h2>
              <div className="flex flex-col gap-3">
                {["Semaglutide (Ozempic/Wegovy)", "Tirzepatide (Mounjaro/Zepbound)", "Metabolic health review", "Body composition tracking", "Hormone integration", "Long-term care planning"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border px-4 py-3 text-sm text-slate-200"
                    style={{ background: "rgba(0,0,0,0.28)", borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-6xl" />

      {/* Pricing */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(188,88%,62%)" }}>
              Pricing
            </p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              Transparent GLP-1 care pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              The initial consult includes a comprehensive review, lab ordering, and lab review with you. Labs and medications are billed separately.
            </p>
          </div>

          <div
            className="rounded-[34px] border p-8 lg:p-10"
            style={{
              borderColor: "hsla(188,88%,54%,0.22)",
              background: "linear-gradient(135deg, hsla(188,88%,54%,0.12), hsla(271,74%,55%,0.16), hsla(210,22%,16%,0.72))",
              boxShadow: "0 24px 80px rgba(7,10,18,0.32)",
            }}
          >
            <div className="h-0.5 w-16 rounded-full" style={{ background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(271,74%,55%))" }} />
            <h3 className="mt-6 text-2xl font-black text-white">GLP-1 Metabolic Care</h3>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              <div>
                <span className="text-4xl font-black text-white">$249</span>
                <span className="ml-2 text-sm text-slate-400">initial consult</span>
              </div>
              <div>
                <span className="text-3xl font-black text-white">$149</span>
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
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(188,88%,62%)" }}>
              The Medications
            </p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              Semaglutide vs. tirzepatide
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Both work. They work differently, with different efficacy profiles and side effect patterns. We help you choose the right one for your biology.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {medications.map((med) => (
              <div
                key={med.name}
                className="rounded-[28px] border p-7"
                style={{
                  background: "hsla(210,22%,18%,0.8)",
                  borderColor: med.border,
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 16px 48px rgba(2,6,23,0.28)",
                }}
              >
                <div className="h-0.5 w-14 rounded-full mb-4" style={{ background: med.gradient }} />
                <h3 className="text-2xl font-black text-white">{med.name}</h3>
                <p className="text-sm mb-4" style={{ color: "hsl(210,20%,68%)" }}>{med.brand}</p>
                <p className="text-sm leading-7 text-slate-300">{med.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(188,88%,62%)" }}>
              What Makes This Different
            </p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              More than a prescription.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              The drug works. What happens around it — the evaluation, the monitoring, the plan — is what determines whether the results last.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {whatMakesDifferent.map((item) => (
              <div key={item.title} className="service-card-transparent rounded-[28px] p-7">
                <div className="h-0.5 w-14 rounded-full mb-4" style={{ background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(271,74%,55%))" }} />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not for everyone */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div
            className="rounded-[32px] border p-8 lg:p-10"
            style={{
              background: "hsla(210,22%,15%,0.9)",
              borderColor: "hsla(188,88%,54%,0.15)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(188,88%,62%)" }}>
              Not for everyone
            </p>
            <h3 className="text-2xl font-bold text-white mb-5">
              GLP-1s are not appropriate in every situation.
            </h3>
            <div className="flex flex-col gap-3">
              {notForEveryone.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm text-slate-300"
                  style={{ background: "rgba(0,0,0,0.25)", borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <span className="mt-0.5 text-xs" style={{ color: "hsl(188,88%,60%)" }}>✗</span>
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
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div
            className="rounded-[36px] border p-8 text-center lg:p-12"
            style={{
              borderColor: "hsla(188,88%,54%,0.2)",
              background: "linear-gradient(135deg, hsla(188,88%,54%,0.12), hsla(271,74%,55%,0.16), hsla(210,22%,22%,0.52))",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(188,88%,72%)" }}>
              Start the Conversation
            </p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              Find out if GLP-1 is right for you.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">
              Book a free consult. No commitment — just a real conversation about whether this fits.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-7 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(271,74%,55%))",
                  color: "hsl(210,32%,10%)",
                }}
              >
                Book a Free Consult
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
