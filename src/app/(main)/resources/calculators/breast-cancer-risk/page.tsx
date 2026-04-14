"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Step = "eligibility" | "form" | "results" | "ineligible";

interface FormData {
  age: string;
  race: string;
  sub_race: string;
  age_period: string;
  childbirth_age: string;
  biopsy: string;
  biopsy_result: string;
  biopsy_ah: string;
  relatives: string;
}

interface Results {
  risk: number;
  averageFiveRisk: number;
  lifetime_patient_risk: number;
  lifetime_average_risk: number;
  message: string;
  lifetime_message: string;
  patientColorPresented5Year: string;
  patientColorPresentedLifetime: string;
}

const initialForm: FormData = {
  age: "",
  race: "",
  sub_race: "",
  age_period: "",
  childbirth_age: "",
  biopsy: "",
  biopsy_result: "",
  biopsy_ah: "",
  relatives: "",
};

// The NCI API returns phrases like "presented in green since hers is lower than"
// Parse them to extract the risk tier
function parseRiskTier(phrase: string): "lower" | "slightly higher" | "higher" {
  const p = phrase.toLowerCase();
  if (p.includes("lower")) return "lower";
  if (p.includes("slightly")) return "slightly higher";
  return "higher";
}

function riskColor(tier: "lower" | "slightly higher" | "higher") {
  if (tier === "lower") return "hsl(140, 60%, 55%)";
  if (tier === "slightly higher") return "hsl(45, 90%, 60%)";
  return "hsl(331, 95%, 72%)";
}

function riskLabel(tier: "lower" | "slightly higher" | "higher") {
  if (tier === "lower") return "Below average";
  if (tier === "slightly higher") return "Slightly above average";
  return "Above average";
}

export default function BreastCancerRiskPage() {
  const [step, setStep] = useState<Step>("eligibility");
  const [cancerHistory, setCancerHistory] = useState<string>("");
  const [brcaStatus, setBrcaStatus] = useState<string>("");
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [results, setResults] = useState<Results | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === "results") {
      // Wait for the results DOM node to paint, then scroll it into view
      const id = setTimeout(() => {
        const el = resultsRef.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + el.offsetHeight / 2;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }, 120);
      return () => clearTimeout(id);
    }
  }, [step]);

  function handleEligibility() {
    if (cancerHistory === "yes" || brcaStatus === "yes") {
      setStep("ineligible");
    } else {
      setStep("form");
    }
  }

  function setField(field: keyof FormData, value: string) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      // Reset sub_race when race changes
      if (field === "race") next.sub_race = "";
      // Reset biopsy-dependent fields when biopsy changes
      if (field === "biopsy" && value !== "1") {
        next.biopsy_result = "";
        next.biopsy_ah = "";
      }
      return next;
    });
  }

  const needsSubRace = form.race === "Hispanic" || form.race === "Asian";
  const needsBiopsyDetail = form.biopsy === "1";

  const isFormComplete =
    form.age &&
    parseInt(form.age) >= 35 &&
    parseInt(form.age) <= 85 &&
    form.race &&
    (!needsSubRace || form.sub_race) &&
    form.age_period &&
    form.childbirth_age &&
    form.biopsy &&
    (!needsBiopsyDetail || (form.biopsy_result && form.biopsy_ah)) &&
    form.relatives;

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const payload = {
        age: parseInt(form.age),
        race: form.race,
        sub_race: form.sub_race || undefined,
        age_period: parseInt(form.age_period),
        childbirth_age: parseInt(form.childbirth_age),
        biopsy: parseInt(form.biopsy),
        biopsy_result: form.biopsy_result ? parseInt(form.biopsy_result) : undefined,
        biopsy_ah: form.biopsy_ah ? parseFloat(form.biopsy_ah) : undefined,
        relatives: parseInt(form.relatives),
      };

      const res = await fetch("/api/bcrat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResults(data.results);
      setStep("results");
    } catch {
      setError("Could not connect. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function restart() {
    setStep("eligibility");
    setCancerHistory("");
    setBrcaStatus("");
    setForm(initialForm);
    setResults(null);
    setError("");
  }

  return (
    <div className="page-bg pt-28 min-h-screen">
      <div className="mx-auto max-w-2xl px-5 lg:px-8 py-16">
        {/* Breadcrumb */}
        <Link
          href="/resources/calculators"
          className="inline-flex items-center gap-2 text-sm mb-10 hover:opacity-70 transition-opacity"
          style={{ color: "hsl(177, 70%, 59%)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Calculators
        </Link>

        <div className="mb-8">
          <span
            className="rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ borderColor: "hsla(331,95%,72%,0.22)", background: "hsla(331,95%,72%,0.08)", color: "hsl(331,95%,82%)" }}
          >
            Breast Cancer Risk
          </span>
          <h1 className="mt-5 text-3xl font-bold text-white lg:text-4xl">Gail Model Risk Calculator</h1>
          <p className="mt-3 text-base leading-7" style={{ color: "hsl(0, 0%, 60%)" }}>
            Estimates your 5-year and lifetime breast cancer risk based on validated NCI data. Takes about 2 minutes.
          </p>
        </div>

        {/* ── ELIGIBILITY ── */}
        {step === "eligibility" && (
          <div
            className="rounded-[28px] border p-7 lg:p-9"
            style={{ background: "hsla(210,22%,16%,0.9)", borderColor: "hsla(331,95%,72%,0.18)" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "hsl(331,95%,72%)" }}>
              Step 1 of 2 — Eligibility
            </p>
            <p className="text-sm leading-7 text-slate-300 mb-8">
              The Gail model is validated for women ages 35–85 without a prior breast cancer diagnosis or known BRCA mutation. Two quick questions before we begin.
            </p>

            <div className="space-y-8">
              <div>
                <p className="text-base font-semibold text-white mb-4">
                  Have you been diagnosed with breast cancer, or had chest radiation therapy before age 30?
                </p>
                <div className="flex flex-col gap-3">
                  {[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setCancerHistory(opt.value)}
                      className="flex items-center gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all"
                      style={{
                        borderColor: cancerHistory === opt.value ? "hsla(331,95%,72%,0.5)" : "hsla(0,0%,100%,0.1)",
                        background: cancerHistory === opt.value ? "hsla(331,95%,72%,0.12)" : "hsla(0,0%,100%,0.03)",
                        color: cancerHistory === opt.value ? "hsl(331,95%,82%)" : "hsl(0,0%,75%)",
                      }}
                    >
                      <span
                        className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor: cancerHistory === opt.value ? "hsl(331,95%,72%)" : "hsl(0,0%,40%)" }}
                      >
                        {cancerHistory === opt.value && (
                          <span className="w-2 h-2 rounded-full" style={{ background: "hsl(331,95%,72%)" }} />
                        )}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-base font-semibold text-white mb-4">
                  Do you have a known BRCA1 or BRCA2 gene mutation?
                </p>
                <div className="flex flex-col gap-3">
                  {[{ label: "Yes", value: "yes" }, { label: "No", value: "no" }, { label: "Unknown", value: "unknown" }].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setBrcaStatus(opt.value)}
                      className="flex items-center gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all"
                      style={{
                        borderColor: brcaStatus === opt.value ? "hsla(331,95%,72%,0.5)" : "hsla(0,0%,100%,0.1)",
                        background: brcaStatus === opt.value ? "hsla(331,95%,72%,0.12)" : "hsla(0,0%,100%,0.03)",
                        color: brcaStatus === opt.value ? "hsl(331,95%,82%)" : "hsl(0,0%,75%)",
                      }}
                    >
                      <span
                        className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor: brcaStatus === opt.value ? "hsl(331,95%,72%)" : "hsl(0,0%,40%)" }}
                      >
                        {brcaStatus === opt.value && (
                          <span className="w-2 h-2 rounded-full" style={{ background: "hsl(331,95%,72%)" }} />
                        )}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleEligibility}
              disabled={!cancerHistory || !brcaStatus}
              className="mt-8 w-full rounded-full py-4 text-sm font-semibold transition-opacity disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))",
                color: "hsl(210,32%,10%)",
              }}
            >
              Continue
            </button>
          </div>
        )}

        {/* ── INELIGIBLE ── */}
        {step === "ineligible" && (
          <div
            className="rounded-[28px] border p-7 lg:p-9"
            style={{ background: "hsla(210,22%,16%,0.9)", borderColor: "hsla(331,95%,72%,0.18)" }}
          >
            <h2 className="text-xl font-bold text-white mb-4">This calculator isn&apos;t a fit for your situation</h2>
            <p className="text-sm leading-7 text-slate-300 mb-4">
              The Gail model is not validated for women with a prior breast cancer diagnosis, prior chest radiation before age 30, or a known BRCA1/BRCA2 mutation. A different risk assessment approach applies in those cases.
            </p>
            <p className="text-sm leading-7 text-slate-300 mb-8">
              We&apos;re happy to discuss your individual risk and screening plan at your next visit.
            </p>
            <button
              onClick={restart}
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white hover:opacity-80 transition-opacity"
            >
              Start over
            </button>
          </div>
        )}

        {/* ── FORM ── */}
        {step === "form" && (
          <div
            className="rounded-[28px] border p-7 lg:p-9"
            style={{ background: "hsla(210,22%,16%,0.9)", borderColor: "hsla(331,95%,72%,0.18)" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "hsl(331,95%,72%)" }}>
              Step 2 of 2 — Your Information
            </p>

            <div className="space-y-7">
              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Current age <span className="font-normal text-slate-400">(35–85)</span>
                </label>
                <input
                  type="number"
                  min={35}
                  max={85}
                  value={form.age}
                  onChange={(e) => setField("age", e.target.value)}
                  placeholder="e.g. 52"
                  className="w-full rounded-2xl border px-4 py-3 text-sm text-white bg-transparent outline-none focus:border-fuchsia-400/50 transition-colors"
                  style={{ borderColor: "hsla(0,0%,100%,0.12)", background: "hsla(0,0%,0%,0.2)" }}
                />
              </div>

              {/* Race */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Race / Ethnicity</label>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "White", value: "White" },
                    { label: "Black or African American", value: "Black" },
                    { label: "Hispanic or Latina", value: "Hispanic" },
                    { label: "Asian", value: "Asian" },
                    { label: "Other / American Indian / Alaskan Native / Unknown", value: "Other" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setField("race", opt.value)}
                      className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all"
                      style={{
                        borderColor: form.race === opt.value ? "hsla(331,95%,72%,0.5)" : "hsla(0,0%,100%,0.08)",
                        background: form.race === opt.value ? "hsla(331,95%,72%,0.1)" : "transparent",
                        color: form.race === opt.value ? "hsl(331,95%,82%)" : "hsl(0,0%,70%)",
                      }}
                    >
                      <span
                        className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor: form.race === opt.value ? "hsl(331,95%,72%)" : "hsl(0,0%,40%)" }}
                      >
                        {form.race === opt.value && <span className="w-2 h-2 rounded-full" style={{ background: "hsl(331,95%,72%)" }} />}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-race (Hispanic) */}
              {form.race === "Hispanic" && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Hispanic / Latina background</label>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "US Hispanic / Latina", value: "US Hispanic" },
                      { label: "Foreign-born Hispanic / Latina", value: "Foreign Hispanic" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setField("sub_race", opt.value)}
                        className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all"
                        style={{
                          borderColor: form.sub_race === opt.value ? "hsla(331,95%,72%,0.5)" : "hsla(0,0%,100%,0.08)",
                          background: form.sub_race === opt.value ? "hsla(331,95%,72%,0.1)" : "transparent",
                          color: form.sub_race === opt.value ? "hsl(331,95%,82%)" : "hsl(0,0%,70%)",
                        }}
                      >
                        <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                          style={{ borderColor: form.sub_race === opt.value ? "hsl(331,95%,72%)" : "hsl(0,0%,40%)" }}>
                          {form.sub_race === opt.value && <span className="w-2 h-2 rounded-full" style={{ background: "hsl(331,95%,72%)" }} />}
                        </span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-race (Asian) */}
              {form.race === "Asian" && (
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Asian background</label>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: "Chinese", value: "Chinese" },
                      { label: "Japanese", value: "Japanese" },
                      { label: "Filipino", value: "Filipino" },
                      { label: "Hawaiian", value: "Hawaiian" },
                      { label: "Other Pacific Islander", value: "Islander" },
                      { label: "Other Asian", value: "Asian" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setField("sub_race", opt.value)}
                        className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all"
                        style={{
                          borderColor: form.sub_race === opt.value ? "hsla(331,95%,72%,0.5)" : "hsla(0,0%,100%,0.08)",
                          background: form.sub_race === opt.value ? "hsla(331,95%,72%,0.1)" : "transparent",
                          color: form.sub_race === opt.value ? "hsl(331,95%,82%)" : "hsl(0,0%,70%)",
                        }}
                      >
                        <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                          style={{ borderColor: form.sub_race === opt.value ? "hsl(331,95%,72%)" : "hsl(0,0%,40%)" }}>
                          {form.sub_race === opt.value && <span className="w-2 h-2 rounded-full" style={{ background: "hsl(331,95%,72%)" }} />}
                        </span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Age at first period */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Age at first menstrual period</label>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "14 or older", value: "0" },
                    { label: "12–13", value: "1" },
                    { label: "7–11", value: "2" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setField("age_period", opt.value)}
                      className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all"
                      style={{
                        borderColor: form.age_period === opt.value ? "hsla(331,95%,72%,0.5)" : "hsla(0,0%,100%,0.08)",
                        background: form.age_period === opt.value ? "hsla(331,95%,72%,0.1)" : "transparent",
                        color: form.age_period === opt.value ? "hsl(331,95%,82%)" : "hsl(0,0%,70%)",
                      }}
                    >
                      <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor: form.age_period === opt.value ? "hsl(331,95%,72%)" : "hsl(0,0%,40%)" }}>
                        {form.age_period === opt.value && <span className="w-2 h-2 rounded-full" style={{ background: "hsl(331,95%,72%)" }} />}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age at first live birth */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Age at first live birth</label>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "No births", value: "98" },
                    { label: "Younger than 20, or unknown", value: "0" },
                    { label: "20–24", value: "1" },
                    { label: "25–29", value: "2" },
                    { label: "30 or older", value: "3" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setField("childbirth_age", opt.value)}
                      className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all"
                      style={{
                        borderColor: form.childbirth_age === opt.value ? "hsla(331,95%,72%,0.5)" : "hsla(0,0%,100%,0.08)",
                        background: form.childbirth_age === opt.value ? "hsla(331,95%,72%,0.1)" : "transparent",
                        color: form.childbirth_age === opt.value ? "hsl(331,95%,82%)" : "hsl(0,0%,70%)",
                      }}
                    >
                      <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor: form.childbirth_age === opt.value ? "hsl(331,95%,72%)" : "hsl(0,0%,40%)" }}>
                        {form.childbirth_age === opt.value && <span className="w-2 h-2 rounded-full" style={{ background: "hsl(331,95%,72%)" }} />}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* First-degree relatives */}
              <div>
                <label className="block text-sm font-semibold text-white mb-1">
                  First-degree relatives with breast cancer
                </label>
                <p className="text-xs text-slate-400 mb-3">Mother, sisters, or daughters only</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "None, or unknown", value: "0" },
                    { label: "One", value: "1" },
                    { label: "Two or more", value: "2" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setField("relatives", opt.value)}
                      className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all"
                      style={{
                        borderColor: form.relatives === opt.value ? "hsla(331,95%,72%,0.5)" : "hsla(0,0%,100%,0.08)",
                        background: form.relatives === opt.value ? "hsla(331,95%,72%,0.1)" : "transparent",
                        color: form.relatives === opt.value ? "hsl(331,95%,82%)" : "hsl(0,0%,70%)",
                      }}
                    >
                      <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor: form.relatives === opt.value ? "hsl(331,95%,72%)" : "hsl(0,0%,40%)" }}>
                        {form.relatives === opt.value && <span className="w-2 h-2 rounded-full" style={{ background: "hsl(331,95%,72%)" }} />}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Biopsy */}
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Have you ever had a breast biopsy?</label>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                    { label: "Unknown", value: "99" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setField("biopsy", opt.value)}
                      className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all"
                      style={{
                        borderColor: form.biopsy === opt.value ? "hsla(331,95%,72%,0.5)" : "hsla(0,0%,100%,0.08)",
                        background: form.biopsy === opt.value ? "hsla(331,95%,72%,0.1)" : "transparent",
                        color: form.biopsy === opt.value ? "hsl(331,95%,82%)" : "hsl(0,0%,70%)",
                      }}
                    >
                      <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                        style={{ borderColor: form.biopsy === opt.value ? "hsl(331,95%,72%)" : "hsl(0,0%,40%)" }}>
                        {form.biopsy === opt.value && <span className="w-2 h-2 rounded-full" style={{ background: "hsl(331,95%,72%)" }} />}
                      </span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Biopsy detail — shown only if biopsy = Yes */}
              {needsBiopsyDetail && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">How many breast biopsies have you had?</label>
                    <div className="flex flex-col gap-2">
                      {[
                        { label: "One", value: "1" },
                        { label: "Two or more", value: "2" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setField("biopsy_result", opt.value)}
                          className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all"
                          style={{
                            borderColor: form.biopsy_result === opt.value ? "hsla(331,95%,72%,0.5)" : "hsla(0,0%,100%,0.08)",
                            background: form.biopsy_result === opt.value ? "hsla(331,95%,72%,0.1)" : "transparent",
                            color: form.biopsy_result === opt.value ? "hsl(331,95%,82%)" : "hsl(0,0%,70%)",
                          }}
                        >
                          <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                            style={{ borderColor: form.biopsy_result === opt.value ? "hsl(331,95%,72%)" : "hsl(0,0%,40%)" }}>
                            {form.biopsy_result === opt.value && <span className="w-2 h-2 rounded-full" style={{ background: "hsl(331,95%,72%)" }} />}
                          </span>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-white mb-1">
                      Did any biopsy show atypical hyperplasia?
                    </label>
                    <p className="text-xs text-slate-400 mb-3">Atypical ductal or lobular hyperplasia</p>
                    <div className="flex flex-col gap-2">
                      {[
                        { label: "Yes", value: "1.82" },
                        { label: "No", value: "0.93" },
                        { label: "Unknown", value: "1.0" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setField("biopsy_ah", opt.value)}
                          className="flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all"
                          style={{
                            borderColor: form.biopsy_ah === opt.value ? "hsla(331,95%,72%,0.5)" : "hsla(0,0%,100%,0.08)",
                            background: form.biopsy_ah === opt.value ? "hsla(331,95%,72%,0.1)" : "transparent",
                            color: form.biopsy_ah === opt.value ? "hsl(331,95%,82%)" : "hsl(0,0%,70%)",
                          }}
                        >
                          <span className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                            style={{ borderColor: form.biopsy_ah === opt.value ? "hsl(331,95%,72%)" : "hsl(0,0%,40%)" }}>
                            {form.biopsy_ah === opt.value && <span className="w-2 h-2 rounded-full" style={{ background: "hsl(331,95%,72%)" }} />}
                          </span>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {error && (
              <p className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={!isFormComplete || loading}
              className="mt-8 w-full rounded-full py-4 text-sm font-semibold transition-opacity disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))",
                color: "hsl(210,32%,10%)",
              }}
            >
              {loading ? "Calculating…" : "Calculate my risk"}
            </button>

            {loading && (
              <div className="mt-5 flex flex-col items-center gap-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full animate-bounce"
                      style={{
                        background: "hsl(331,95%,72%)",
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs" style={{ color: "hsl(0,0%,50%)" }}>
                  Calculating your risk — this takes a few seconds…
                </p>
              </div>
            )}

            <p className="mt-4 text-xs text-center leading-6" style={{ color: "hsl(0,0%,38%)" }}>
              No data is stored. Results appear only on your screen.
            </p>
          </div>
        )}

        {/* ── RESULTS ── */}
        {step === "results" && results && (() => {
          const tier5 = parseRiskTier(results.patientColorPresented5Year);
          const tierLife = parseRiskTier(results.patientColorPresentedLifetime);
          const color5 = riskColor(tier5);
          const colorLife = riskColor(tierLife);
          return (
            <div ref={resultsRef} className="space-y-4">
              {/* Main result card */}
              <div
                className="rounded-[28px] p-7 lg:p-10"
                style={{
                  background: "linear-gradient(160deg, hsla(294,34%,10%,0.98), hsla(244,28%,10%,0.98))",
                  border: "1px solid hsla(331,95%,72%,0.35)",
                  boxShadow: "0 0 60px hsla(331,95%,72%,0.12), 0 32px 80px rgba(0,0,0,0.5)",
                }}
              >
                <div className="flex items-center gap-3 mb-7">
                  <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, hsla(331,95%,72%,0.5), transparent)" }} />
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(331,95%,72%)" }}>
                    Your Results
                  </p>
                  <div className="h-px flex-1" style={{ background: "linear-gradient(270deg, hsla(331,95%,72%,0.5), transparent)" }} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mb-7">
                  {/* 5-year */}
                  <div
                    className="rounded-[20px] p-6"
                    style={{
                      background: "hsla(0,0%,0%,0.35)",
                      border: `1px solid ${color5}33`,
                      boxShadow: `0 0 24px ${color5}18`,
                    }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "hsl(0,0%,45%)" }}>
                      5-Year Risk
                    </p>
                    <p className="text-5xl font-black text-white leading-none">{results.risk}<span className="text-2xl">%</span></p>
                    <p className="text-xs mt-3" style={{ color: "hsl(0,0%,48%)" }}>
                      Average for your age &amp; race: {results.averageFiveRisk}%
                    </p>
                    <span
                      className="mt-4 inline-block rounded-full px-3 py-1.5 text-xs font-bold"
                      style={{
                        background: `${color5}1a`,
                        color: color5,
                        border: `1px solid ${color5}44`,
                      }}
                    >
                      {riskLabel(tier5)}
                    </span>
                  </div>

                  {/* Lifetime */}
                  <div
                    className="rounded-[20px] p-6"
                    style={{
                      background: "hsla(0,0%,0%,0.35)",
                      border: `1px solid ${colorLife}33`,
                      boxShadow: `0 0 24px ${colorLife}18`,
                    }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "hsl(0,0%,45%)" }}>
                      Lifetime Risk
                    </p>
                    <p className="text-5xl font-black text-white leading-none">{results.lifetime_patient_risk}<span className="text-2xl">%</span></p>
                    <p className="text-xs mt-3" style={{ color: "hsl(0,0%,48%)" }}>
                      Average for your age &amp; race: {results.lifetime_average_risk}%
                    </p>
                    <span
                      className="mt-4 inline-block rounded-full px-3 py-1.5 text-xs font-bold"
                      style={{
                        background: `${colorLife}1a`,
                        color: colorLife,
                        border: `1px solid ${colorLife}44`,
                      }}
                    >
                      {riskLabel(tierLife)}
                    </span>
                  </div>
                </div>

                {/* Disclaimer */}
                <div
                  className="rounded-2xl p-5"
                  style={{ borderColor: "hsla(331,95%,72%,0.12)", background: "hsla(331,95%,72%,0.05)", border: "1px solid hsla(331,95%,72%,0.12)" }}
                >
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(331,95%,72%)" }}>
                    Important
                  </p>
                  <p className="text-xs leading-6 text-slate-400">
                    Based on the NCI Gail Model — for informational purposes only. Does not account for BRCA status, paternal family history, or prior chest radiation. Discuss with your provider before making screening or treatment decisions.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={restart}
                  className="flex-1 rounded-full border border-white/15 bg-white/5 py-3.5 text-sm font-semibold text-white hover:opacity-80 transition-opacity"
                >
                  Start over
                </button>
                <Link
                  href="https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full py-3.5 text-center text-sm font-semibold transition-opacity hover:opacity-85"
                  style={{
                    background: "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))",
                    color: "hsl(210,32%,10%)",
                  }}
                >
                  Discuss with your provider
                </Link>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
