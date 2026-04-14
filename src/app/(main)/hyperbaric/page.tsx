"use client";

import Link from "next/link";
import { useState } from "react";
import { submitHbotEarlyAccess } from "@/lib/api";

const conditions = [
  {
    icon: "🩹",
    title: "Wound Healing & Surgical Recovery",
    body: "Post-mastectomy. Aesthetic surgery. Abdominal wounds. HBOT is FDA-approved for compromised tissue repair — delivering oxygenation that no other therapy can reach.",
    tags: ["Post-Mastectomy", "Aesthetic Surgery", "Skin Grafts"],
  },
  {
    icon: "⏳",
    title: "Anti-Aging & Longevity",
    body: "37% fewer senescent cells. 20%+ telomere lengthening. Real reversal of cellular aging — measured in human trials, not animals.",
    tags: ["Telomeres", "Senescent Cells", "Skin & Collagen"],
  },
  {
    icon: "🔥",
    title: "Autoimmune & Inflammation",
    body: "Systemic reduction of TNF-α and IL-6 — the inflammatory drivers behind UC, RA, psoriasis, and chronic disease. 50% clinical remission in a blinded UC trial vs. 0% in the control group.",
    tags: ["Ulcerative Colitis", "Rheumatoid Arthritis", "Psoriasis"],
  },
  {
    icon: "💪",
    title: "Muscle, Tendon & Athletic Recovery",
    body: "Accelerate biological repair of damaged muscle and connective tissue. Higher training density. Lower injury risk. Confirmed in a 2026 meta-analysis of 10 RCTs.",
    tags: ["Muscle Repair", "Tendon Healing", "Performance"],
  },
  {
    icon: "⚡",
    title: "Chronic Pain & Fibromyalgia",
    body: "Beat fibromyalgia medications head-to-head in a randomized trial. HBOT modifies the neurological root of pain — not just the symptoms. 87.5–100% pain relief rates documented.",
    tags: ["Fibromyalgia", "CRPS", "Nerve Pain"],
  },
  {
    icon: "💨",
    title: "Long COVID Recovery",
    body: "Microvascular damage. Neuroinflammation. Mitochondrial dysfunction. HBOT addresses all three — with durable improvements confirmed at 1-year follow-up.",
    tags: ["Brain Fog", "Fatigue", "Cardiac Function"],
  },
  {
    icon: "🧠",
    title: "Brain & Neurological Recovery",
    body: "Reawaken dormant neurons after stroke. Reverse TBI effects years — even decades — after injury. Confirmed by SPECT and fNIRS brain imaging in clinical trials.",
    tags: ["Stroke", "TBI / Concussion", "Cognitive Function"],
  },
  {
    icon: "👂",
    title: "Sudden Hearing Loss",
    body: "Guideline-endorsed. 2.61× higher recovery rate. Time is everything — the sooner you start, the better the outcome.",
    tags: ["SSNHL", "⏰ Time-Sensitive", "Guideline-Endorsed"],
  },
];

const mechanisms = [
  {
    stat: "New vessels grow",
    body: "Angiogenesis — formation of new blood vessels — restores circulation to tissue that was too damaged or irradiated to heal on its own.",
  },
  {
    stat: "Stem cells deploy",
    body: "Up to 8× more stem cells released from bone marrow into circulation — traveling to sites of injury to rebuild damaged tissue.",
  },
  {
    stat: "Inflammation quiets",
    body: "Pro-inflammatory cytokines (TNF-α, IL-6) measurably reduced. The chronic inflammatory cascade driving autoimmune disease, pain, and aging — interrupted.",
  },
  {
    stat: "Genes reset",
    body: "1,912 differentially expressed genes after a full HBOT course — aging-associated pathways downregulated, regenerative pathways activated.",
  },
];

function EarlyAccessForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;
    setStatus("loading");
    try {
      await submitHbotEarlyAccess({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: "hsla(177,60%,20%,0.4)", border: "1px solid hsla(177,70%,59%,0.35)" }}
      >
        <p className="text-lg font-bold mb-1" style={{ color: "hsl(177,70%,72%)" }}>
          You&apos;re on the list.
        </p>
        <p className="text-sm" style={{ color: "hsl(210,25%,65%)" }}>
          We&apos;ll contact you when we open with your 25% discount locked in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="flex-1 rounded-full px-5 py-3 text-sm outline-none"
          style={{
            background: "hsla(210,22%,18%,0.9)",
            border: "1px solid hsla(177,70%,59%,0.22)",
            color: "hsl(0,0%,92%)",
          }}
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="flex-1 rounded-full px-5 py-3 text-sm outline-none"
          style={{
            background: "hsla(210,22%,18%,0.9)",
            border: "1px solid hsla(177,70%,59%,0.22)",
            color: "hsl(0,0%,92%)",
          }}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 rounded-full px-5 py-3 text-sm outline-none"
          style={{
            background: "hsla(210,22%,18%,0.9)",
            border: "1px solid hsla(177,70%,59%,0.22)",
            color: "hsl(0,0%,92%)",
          }}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full px-8 py-3.5 text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, hsl(177,70%,59%), hsl(210,70%,55%))",
          color: "hsl(210,32%,10%)",
        }}
      >
        {status === "loading" ? "Saving your spot…" : "Lock In My 25% Discount →"}
      </button>
      {status === "error" && (
        <p className="text-center text-xs" style={{ color: "hsl(0,80%,70%)" }}>
          Something went wrong. Try again or call{" "}
          <a href="tel:7198244716" style={{ color: "hsl(177,70%,65%)" }}>719-824-4716</a>.
        </p>
      )}
      <p className="text-center text-xs" style={{ color: "hsl(210,25%,48%)" }}>
        No commitment required. No payment. We&apos;ll reach out when we open.
      </p>
    </form>
  );
}

export default function HyperbaricPage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="hero-overlay relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-32 flex items-center"
        style={{ background: "linear-gradient(180deg, hsla(210,32%,11%,0.8), hsla(210,32%,12%,0.6))", minHeight: "92vh" }}
      >
        {/* Radial glows */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% -10%, hsla(177,70%,59%,0.14) 0%, transparent 52%), radial-gradient(ellipse at 90% 100%, hsla(210,70%,55%,0.08) 0%, transparent 45%), radial-gradient(ellipse at 10% 80%, hsla(271,74%,55%,0.06) 0%, transparent 38%)",
          }}
          aria-hidden="true"
        />
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.8), transparent 95%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-5 lg:px-8 text-center w-full">
          {/* Brand badge */}
          <div className="flex justify-center mb-10">
            <div
              className="inline-flex items-center gap-3 rounded-2xl border px-5 py-3"
              style={{
                borderColor: "hsla(177,70%,59%,0.2)",
                background: "linear-gradient(180deg, hsla(215,30%,16%,0.92), hsla(215,28%,13%,0.88))",
                backdropFilter: "blur(16px)",
              }}
            >
              <img src="/logo-main.png" alt="CSHC" className="h-9 w-9 object-contain" />
              <div className="text-left">
                <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "hsl(210,25%,62%)" }}>
                  Colorado Springs Health Collective
                </p>
                <p
                  className="text-sm font-semibold leading-tight mt-0.5"
                  style={{
                    background: "linear-gradient(135deg, hsl(177,70%,65%), hsl(210,70%,62%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Hyperbaric Clinic — Opening Summer 2026
                </p>
              </div>
            </div>
          </div>

          {/* Hero headline */}
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "hsl(210,40%,75%)", letterSpacing: "0.06em" }}
          >
            Clinical Grade
          </p>
          <h1 style={{ color: "#fff", textShadow: "0 2px 24px rgba(0,0,0,0.5)", lineHeight: 1 }}>
            <span
              className="block font-black"
              style={{
                fontSize: "clamp(4rem, 14vw, 9rem)",
                fontWeight: 900,
                background: "linear-gradient(135deg, hsl(177,88%,62%), hsl(188,88%,54%), hsl(210,70%,58%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 40px hsla(177,80%,55%,0.35))",
              }}
            >
              2.0 ATA
            </span>
            <span
              className="block font-black mt-2"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.75rem)", fontWeight: 900 }}
            >
              Hyperbaric Oxygen Therapy
            </span>
          </h1>

          <p className="mt-6 mb-2 font-semibold" style={{ color: "hsl(177,70%,65%)", fontSize: "clamp(1rem, 2vw, 1.2rem)" }}>
            Coming Summer 2026 — Lock In Your 25% Discount Today.
          </p>

          <p className="mb-10 max-w-xl mx-auto" style={{ color: "hsl(210,25%,60%)", fontSize: "17px", lineHeight: "1.65" }}>
            Most local providers operate at 1.3–1.6 ATA. We&apos;re opening a clinical-grade chamber at{" "}
            <strong style={{ color: "#fff" }}>2.0 ATA</strong> — the pressure the clinical evidence was built on.
          </p>

          <div className="flex flex-col items-center gap-5">
            <Link
              href="/hyperbaric/why-2ata"
              className="rounded-full px-8 py-3.5 text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ border: "1px solid hsla(177,70%,59%,0.45)", color: "hsl(177,70%,72%)" }}
            >
              Why 2.0 ATA Matters →
            </Link>
            <EarlyAccessForm />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── MECHANISM ── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(177,70%,62%)" }}>
              The Science
            </p>
            <h2 className="text-3xl lg:text-4xl font-black mb-4" style={{ color: "#fff" }}>
              At 2.0 ATA, Your Body Unlocks{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(177,88%,62%), hsl(210,70%,58%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Capabilities It Can&apos;t Access Normally.
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto" style={{ color: "hsl(210,25%,62%)", fontSize: "17px", lineHeight: "1.65" }}>
              Oxygen dissolves directly into plasma — reaching 10–15× normal levels in tissue standard circulation can&apos;t supply. What follows is a cascade of healing your body was always designed to do.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mechanisms.map((m) => (
              <div
                key={m.stat}
                className="rounded-2xl p-7 text-center"
                style={{
                  background: "hsla(210,22%,22%,0.5)",
                  border: "1px solid hsla(177,70%,59%,0.18)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 16px 48px rgba(2,6,23,0.28)",
                }}
              >
                <div
                  className="text-xl font-black mb-3"
                  style={{
                    background: "linear-gradient(135deg, hsl(177,88%,62%), hsl(210,70%,58%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {m.stat}
                </div>
                <p style={{ color: "hsl(210,25%,62%)", fontSize: "15px", lineHeight: "1.6" }}>{m.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/hyperbaric/why-2ata"
              className="rounded-full px-8 py-3.5 text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ border: "1px solid hsla(177,70%,59%,0.4)", color: "hsl(177,70%,72%)" }}
            >
              Why 2.0 ATA Changes Everything →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONDITIONS ── */}
      <section
        className="py-20 lg:py-28"
        style={{ background: "hsla(210,22%,14%,0.7)", borderTop: "1px solid hsla(177,70%,59%,0.1)" }}
      >
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(177,70%,62%)" }}>
              What We Treat
            </p>
            <h2 className="text-3xl lg:text-4xl font-black" style={{ color: "#fff" }}>
              One Therapy.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(177,88%,62%), hsl(210,70%,58%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Extraordinary Reach.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {conditions.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl p-6"
                style={{
                  background: "hsla(210,22%,22%,0.5)",
                  border: "1px solid hsla(177,70%,59%,0.18)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: "#fff", fontSize: "17px" }}>
                  {c.title}
                </h3>
                <p className="mb-4" style={{ color: "hsl(210,25%,62%)", fontSize: "14px", lineHeight: "1.65" }}>
                  {c.body}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2.5 py-1 text-xs font-medium"
                      style={{
                        background: "hsla(177,70%,59%,0.12)",
                        border: "1px solid hsla(177,70%,59%,0.28)",
                        color: "hsl(177,70%,72%)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/hyperbaric/evidence"
              className="rounded-full px-8 py-3.5 text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ border: "1px solid hsla(177,70%,59%,0.4)", color: "hsl(177,70%,72%)" }}
            >
              See the Full Research →
            </Link>
          </div>
        </div>
      </section>

      {/* ── EVIDENCE TEASER ── */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div
            className="rounded-3xl p-10 lg:p-14 text-center"
            style={{
              background: "linear-gradient(155deg, hsla(177,40%,10%,0.95), hsla(210,40%,10%,0.95))",
              border: "1px solid hsla(177,70%,59%,0.28)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 0 80px hsla(177,70%,55%,0.1), 0 32px 80px rgba(2,6,23,0.42)",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(177,70%,62%)" }}>
              Our Philosophy
            </p>
            <h2 className="text-3xl lg:text-4xl font-black mb-5" style={{ color: "#fff" }}>
              We Show You{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(177,88%,62%), hsl(210,70%,58%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                the Real Research.
              </span>
            </h2>
            <p style={{ color: "hsl(210,25%,65%)", fontSize: "17px", lineHeight: "1.7" }}>
              Fourteen conditions. Four tiers of evidence. Honest clinical perspective on every one — including what the studies show and where the science is still building. Because informed patients make the best decisions.
            </p>
            <Link
              href="/hyperbaric/evidence"
              className="inline-block rounded-full px-10 py-4 font-bold mt-8 text-sm hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(135deg, hsl(177,70%,59%), hsl(210,70%,55%))",
                color: "hsl(210,32%,10%)",
                boxShadow: "0 8px 32px hsla(177,70%,50%,0.3)",
              }}
            >
              View the Evidence
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="py-20 lg:py-24"
        style={{ borderTop: "1px solid hsla(177,70%,59%,0.1)" }}
      >
        <div className="mx-auto max-w-2xl px-5 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(177,70%,62%)" }}>
            Limited Pre-Launch Spots
          </p>
          <h2 className="text-3xl lg:text-4xl font-black mb-4" style={{ color: "#fff" }}>
            Be First.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, hsl(177,88%,62%), hsl(210,70%,58%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Save 25%.
            </span>
          </h2>
          <p className="mb-10" style={{ color: "hsl(210,25%,60%)", fontSize: "17px" }}>
            No commitment required. No payment. Register and we&apos;ll contact you when we open with your discount locked in.
          </p>
          <EarlyAccessForm />
          <p className="mt-8" style={{ color: "hsl(210,25%,48%)", fontSize: "15px" }}>
            Questions?{" "}
            <a
              href="tel:7198244716"
              className="font-semibold hover:opacity-80 transition-opacity"
              style={{ color: "hsl(177,70%,65%)" }}
            >
              Call or text 719-824-4716
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
