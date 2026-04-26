import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Men's Hormone Health + TRT | Colorado Springs Health Collective",
  description: "Comprehensive men's hormone care in Colorado Springs. Low testosterone, TRT optimization, fatigue, recovery, libido — a full evaluation before any treatment.",
};

const symptoms = ["fatigue", "low libido", "poor recovery", "brain fog", "strength loss", "weight gain", "low motivation", "mood changes"];

const whatWeEvaluate = [
  {
    title: "Full hormone panel",
    text: "Total and free testosterone, SHBG, estradiol, LH, FSH, DHEA-S, thyroid, and more — because treating testosterone in isolation misses most of the picture.",
  },
  {
    title: "Symptoms, history, and goals",
    text: "Labs alone don't tell the whole story. A comprehensive intake that includes your sleep, recovery, sexual health, and what's actually bothering you.",
  },
  {
    title: "Prior exposure and fertility",
    text: "If you've used testosterone before — or care about fertility — that shapes the conversation. We ask, and it matters.",
  },
  {
    title: "Lifestyle and metabolic context",
    text: "Sleep quality, training load, stress, and body composition all interact with hormone levels. We factor those in before deciding anything.",
  },
];

const trtFacts = [
  {
    value: "Not always TRT",
    detail: "Some men have treatable causes of low testosterone — elevated estradiol, high SHBG, sleep apnea, or thyroid dysfunction. These often respond without hormones.",
  },
  {
    value: "Range ≠ optimal",
    detail: "\"Normal range\" is a statistical bracket, not your target. Two men with the same number can feel completely different. Context matters more than the reference range.",
  },
  {
    value: "Fertility matters",
    detail: "Exogenous testosterone suppresses natural production. If you want to have children — now or later — that changes the treatment path entirely.",
  },
  {
    value: "Long-term thinking",
    detail: "TRT is not a short-term fix. We build a plan with the long view in mind: monitoring, adjustments, and follow-up that keeps you in range and feeling well.",
  },
  {
    value: "Sometimes the answer is metabolic",
    detail: "Excess body fat and insulin resistance directly suppress testosterone. For some men, GLP-1 therapy addresses the root cause more effectively than hormone replacement. If that fits your picture, we manage it here — not a separate referral.",
  },
];

const pricingFeatures = [
  "Symptoms, goals, risk factors, preferences, and special considerations",
  "Lab ordering and a follow-up visit to review your results with you",
  "Personalized treatment options and next-step recommendations",
  "Ongoing follow-up, medication management, and adjustments once established",
];

const BOOKING_URL =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266";

export default function MensHealthPage() {
  return (
    <div className="page-bg pt-28">
      <section className="hero-overlay relative overflow-hidden py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 14% 14%, hsla(188,88%,54%,0.14), transparent 22%), radial-gradient(circle at 88% 14%, hsla(216,79%,46%,0.12), transparent 22%), linear-gradient(180deg, rgba(10,18,32,0.1), rgba(10,18,32,0.5))",
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
                style={{ borderColor: "hsla(188,88%,54%,0.22)", background: "hsla(188,88%,54%,0.08)", color: "hsl(188,88%,78%)" }}
              >
                Men&apos;s Hormone Health
              </span>
              <h1
                className="mt-6 text-4xl font-bold text-white lg:text-6xl"
                style={{ textShadow: "0 10px 34px rgba(0,0,0,0.42)" }}
              >
                <span className="sr-only">Men's Hormone Therapy &amp; TRT Colorado Springs — Testosterone Replacement, Low T Treatment. </span>
                Modern men&apos;s health
                <span
                  className="mt-2 block"
                  style={{
                    background: "linear-gradient(135deg, hsl(188,88%,62%), hsl(216,79%,55%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.28))",
                  }}
                >
                  with a deeper look.
                </span>
              </h1>
              <p
                className="mt-6 max-w-2xl text-lg leading-8 text-white"
                style={{ textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}
              >
                Low energy, poor recovery, low libido — not just part of getting older. We do a comprehensive review of symptoms, history, prior hormone exposure, and labs before deciding whether TRT or another path makes sense.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-7 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(216,79%,46%))",
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
                background: "linear-gradient(180deg, hsla(210,40%,14%,0.92), hsla(220,36%,12%,0.9), hsla(210,24%,10%,0.88))",
                borderColor: "hsla(188,88%,54%,0.18)",
                boxShadow: "0 24px 80px rgba(7,10,18,0.42)",
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: "hsl(188,88%,72%)" }}
              >
                Common Reasons Men Start Here
              </p>
              <h2 className="text-xl font-bold mb-6 text-white">
                The symptoms rarely come alone.
              </h2>
              <div className="flex flex-wrap gap-3">
                {symptoms.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-4 py-2 text-sm font-medium"
                    style={{
                      background: "hsla(188,88%,54%,0.1)",
                      border: "1px solid hsla(188,88%,54%,0.22)",
                      color: "hsl(188,88%,78%)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-7 text-slate-300">
                We do not start with a prescription. We start with understanding what is actually going on.
              </p>
              <div className="mt-6 border-t pt-6" style={{ borderColor: "hsla(188,88%,54%,0.18)" }}>
                <p className="text-sm font-bold text-white">See what&apos;s really going on.</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">Take our quiz — no email or commitment required.</p>
                <Link
                  href="/hormone/mens-health/quiz"
                  className="mt-4 inline-block rounded-full px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
                  style={{
                    background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(271,74%,55%))",
                    color: "hsl(210,32%,10%)",
                  }}
                >
                  Take the quiz
                </Link>
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
              Transparent men&apos;s hormone care pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              The initial consult includes a comprehensive review, lab ordering, and lab review with you. Labs and medications are billed separately.
            </p>
          </div>

          <div
            className="rounded-[34px] border p-8 lg:p-10"
            style={{
              borderColor: "hsla(188,88%,54%,0.22)",
              background: "linear-gradient(135deg, hsla(188,88%,54%,0.14), hsla(216,79%,46%,0.16), hsla(210,22%,16%,0.72))",
              boxShadow: "0 24px 80px rgba(7,10,18,0.32)",
            }}
          >
            <div className="h-0.5 w-16 rounded-full" style={{ background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(216,79%,46%))" }} />
            <h3 className="mt-6 text-2xl font-black text-white">Men&apos;s Hormone + TRT Care</h3>
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


      {/* What we evaluate */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(188,88%,62%)" }}>
              The Evaluation
            </p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              What we actually look at
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Most testosterone workups are incomplete. We run a full picture before deciding whether treatment makes sense.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {whatWeEvaluate.map((item) => (
              <div key={item.title} className="service-card-transparent rounded-[28px] p-7">
                <div
                  className="mb-4 h-0.5 w-14 rounded-full"
                  style={{ background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(216,79%,46%))" }}
                />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRT nuance */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(188,88%,62%)" }}>
              About TRT
            </p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              Things most clinics won&apos;t tell you upfront
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Testosterone replacement therapy can be the right answer — and it can also be the wrong one. Here is the honest version.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {trtFacts.map((fact) => (
              <div key={fact.value} className="service-card-transparent rounded-[28px] p-7">
                <h3
                  className="text-lg font-black mb-3"
                  style={{ color: "hsl(188,88%,72%)" }}
                >
                  {fact.value}
                </h3>
                <p className="text-sm leading-7 text-slate-300">{fact.detail}</p>
              </div>
            ))}
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
              background: "linear-gradient(135deg, hsla(188,88%,54%,0.14), hsla(216,79%,46%,0.18), hsla(210,22%,22%,0.52))",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(188,88%,72%)" }}>
              Get Started
            </p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              A deeper look is where it starts.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">
              Book a free consult. Get your questions answered before committing to anything.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-7 py-4 text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(216,79%,46%))",
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
