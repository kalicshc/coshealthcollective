"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  GREENE_ITEMS,
  GREENE_SECTIONS,
  HORMONE_INFO,
  SECTION_IDS,
  WOMENS_BOOKING_URL,
  scoreGreene,
  type GreeneResult,
  type GreeneScore,
  type GreeneScores,
  type HormoneType,
  type SectionKey,
} from "@/lib/womensHormonePathway";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step =
  | "intro"
  | "section1"
  | "section2"
  | "section3"
  | "analyzing"
  | "results"
  | "bothersome"
  | "lead"
  | "done";

type LeadForm = {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  question: string;
};

const STEP_PROGRESS: Record<Step, number> = {
  intro: 0,
  section1: 16,
  section2: 33,
  section3: 50,
  analyzing: 62,
  results: 75,
  bothersome: 87,
  lead: 94,
  done: 100,
};

const NEXT_SECTION: Partial<Record<SectionKey, Step>> = {
  section1: "section2",
  section2: "section3",
  section3: "analyzing",
};

// ─── Severity styling ─────────────────────────────────────────────────────────

const severityStyle: Record<string, { badge: string; dot: string }> = {
  low: { badge: "border-slate-400/25 bg-slate-400/10 text-slate-300", dot: "bg-slate-400" },
  moderate: { badge: "border-amber-400/25 bg-amber-400/10 text-amber-300", dot: "bg-amber-400" },
  significant: { badge: "border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-300", dot: "bg-fuchsia-400" },
  severe: { badge: "border-rose-400/30 bg-rose-400/12 text-rose-300", dot: "bg-rose-400" },
};

// ─── Hormone bar colors ───────────────────────────────────────────────────────

const hormoneBar: Record<HormoneType, { gradient: string; glow: string; label: string; dot: string }> = {
  progesterone: {
    gradient: "linear-gradient(90deg, hsl(331,95%,72%), hsl(311,80%,62%))",
    glow: "rgba(217,70,239,0.25)",
    label: "Progesterone",
    dot: "bg-fuchsia-400",
  },
  estrogen: {
    gradient: "linear-gradient(90deg, hsl(271,74%,65%), hsl(251,80%,70%))",
    glow: "rgba(139,92,246,0.25)",
    label: "Estrogen",
    dot: "bg-violet-400",
  },
  testosterone: {
    gradient: "linear-gradient(90deg, hsl(350,90%,68%), hsl(330,85%,60%))",
    glow: "rgba(251,113,133,0.25)",
    label: "Testosterone",
    dot: "bg-rose-400",
  },
};

// ─── Rating button ────────────────────────────────────────────────────────────

function RatingButton({
  value,
  selected,
  onClick,
}: {
  value: 0 | 1 | 2 | 3;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 w-9 shrink-0 rounded-xl text-sm font-bold transition-all duration-150 border ${
        selected
          ? "border-transparent text-white shadow-[0_0_16px_rgba(217,70,239,0.35)]"
          : "border-white/10 bg-white/[0.04] text-slate-500 hover:border-fuchsia-300/30 hover:bg-fuchsia-400/[0.06] hover:text-white"
      }`}
      style={
        selected
          ? { background: "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))" }
          : undefined
      }
    >
      {value}
    </button>
  );
}

// ─── Symptom row ──────────────────────────────────────────────────────────────

function SymptomRow({
  itemId,
  label,
  score,
  onSelect,
}: {
  itemId: number;
  label: string;
  score: GreeneScore | undefined;
  onSelect: (v: GreeneScore) => void;
}) {
  const answered = score !== undefined;
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-150 ${
        answered
          ? "border-fuchsia-300/15 bg-fuchsia-400/[0.04]"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10"
      }`}
    >
      <span
        className={`flex-1 min-w-0 text-sm leading-6 transition-colors ${
          answered ? "text-white" : "text-slate-300"
        }`}
      >
        {label}
      </span>
      <div className="flex shrink-0 items-center gap-1.5">
        {([0, 1, 2, 3] as const).map((v) => (
          <RatingButton
            key={v}
            value={v}
            selected={score === v}
            onClick={() => onSelect(v)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Hormone result card ──────────────────────────────────────────────────────

function HormoneCard({
  hormone,
  pct,
  animated,
}: {
  hormone: HormoneType;
  pct: number;
  animated: boolean;
}) {
  const bar = hormoneBar[hormone];
  const info = HORMONE_INFO[hormone];
  const isSignificant = pct >= 33;

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 ${
        isSignificant ? "border-white/12 bg-white/[0.04]" : "border-white/[0.06] bg-white/[0.02]"
      }`}
      style={isSignificant ? { boxShadow: `0 0 40px ${bar.glow}` } : undefined}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 shrink-0 rounded-full ${bar.dot}`} />
          <p className="text-sm font-semibold text-white">{info.name}</p>
        </div>
        <span
          className={`text-lg font-black ${isSignificant ? "text-white" : "text-slate-400"}`}
        >
          {pct}%
        </span>
      </div>

      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animated ? `${pct}%` : "0%",
            background: bar.gradient,
            boxShadow: isSignificant ? `0 0 12px ${bar.glow}` : "none",
          }}
        />
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-xs leading-5 text-slate-400">{info.role}</p>
        <p className="text-xs leading-5 text-slate-300">{info.therapy}</p>
      </div>
    </div>
  );
}

// ─── Lead form input ──────────────────────────────────────────────────────────

function FormInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-2">
        {label}
        {required && <span className="ml-1 text-fuchsia-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-fuchsia-400/50 focus:bg-fuchsia-400/[0.06] focus:shadow-[0_0_0_3px_rgba(217,70,239,0.12)]"
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function WomensHormonePathway() {
  const [step, setStep] = useState<Step>("intro");
  const [scores, setScores] = useState<GreeneScores>({});
  const [mostBothersome, setMostBothersome] = useState("");
  const [customBothersome, setCustomBothersome] = useState("");
  const [leadForm, setLeadForm] = useState<LeadForm>({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    question: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [barsAnimated, setBarsAnimated] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Scroll to top on each step change
  useEffect(() => {
    const id = window.setTimeout(
      () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      40,
    );
    return () => window.clearTimeout(id);
  }, [step]);

  // Animate hormone bars on results screen
  useEffect(() => {
    if (step === "results") {
      const id = window.setTimeout(() => setBarsAnimated(true), 150);
      return () => window.clearTimeout(id);
    }
    setBarsAnimated(false);
  }, [step]);

  const result = useMemo<GreeneResult | null>(() => {
    const allDone = Object.keys(SECTION_IDS).every((sec) =>
      SECTION_IDS[sec as SectionKey].every((id) => scores[id] !== undefined),
    );
    return allDone ? scoreGreene(scores) : null;
  }, [scores]);

  function setScore(itemId: number, value: GreeneScore) {
    setScores((prev) => ({ ...prev, [itemId]: value }));
  }

  function isSectionComplete(sec: SectionKey) {
    return SECTION_IDS[sec].every((id) => scores[id] !== undefined);
  }

  function answeredCount(sec: SectionKey) {
    return SECTION_IDS[sec].filter((id) => scores[id] !== undefined).length;
  }

  function advanceSection(sec: SectionKey) {
    if (!isSectionComplete(sec)) return;
    const next = NEXT_SECTION[sec];
    if (next === "analyzing") {
      setStep("analyzing");
      window.setTimeout(() => setStep("results"), 1800);
    } else if (next) {
      setStep(next);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!leadForm.firstName || !leadForm.email) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/hormone/womens-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          mostBothersome: mostBothersome || customBothersome || "Not specified",
          totalScore: result?.totalScore,
          severity: result?.severity,
          progesteronePct: result?.progesteronePct,
          estrogenPct: result?.estrogenPct,
          testosteronePct: result?.testosteronePct,
          primaryHormone: result?.primaryHormone,
          scores: Object.fromEntries(
            Object.entries(scores).map(([k, v]) => [k, v]),
          ),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStep("done");
    } catch {
      setSubmitError("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep("intro");
    setScores({});
    setMostBothersome("");
    setCustomBothersome("");
    setLeadForm({ firstName: "", lastName: "", age: "", email: "", question: "" });
    setSubmitError("");
  }

  const progress = STEP_PROGRESS[step];
  const showProgress = step !== "intro" && step !== "done";

  // ── Analyzing overlay ─────────────────────────────────────────────────────
  if (step === "analyzing") {
    return (
      <div ref={topRef} className="mx-auto w-full max-w-4xl">
        <div className="content-glass overflow-hidden rounded-none border-x-0 border-b-0 p-0 shadow-[0_30px_80px_rgba(8,15,28,0.35)] md:rounded-[32px] md:border">
          <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 p-8 md:min-h-[460px]">
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-full border-2 border-white/10" />
              <div
                className="absolute inset-0 animate-spin rounded-full border-2 border-transparent"
                style={{ borderTopColor: "hsl(331,95%,72%)" }}
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                Analyzing your responses
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Generating your hormone assessment...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="mx-auto w-full max-w-4xl">
      <div className="content-glass overflow-hidden rounded-none border-x-0 border-b-0 p-0 shadow-[0_30px_80px_rgba(8,15,28,0.35)] md:rounded-[32px] md:border">

        {/* ── Header bar ── */}
        <div className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] px-6 py-5 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-purple-300/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              No email required
            </div>
          </div>
        </div>

        {/* ── Progress bar ── */}
        {showProgress && (
          <div className="px-6 pt-5 lg:px-8">
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))",
                }}
              />
            </div>
          </div>
        )}

        <div className="p-6 lg:p-8">

          {/* ── INTRO ─────────────────────────────────────────────────────── */}
          {step === "intro" && (
            <div className="pathway-step-enter">
              <div className="mb-1">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
                  Women&apos;s Hormone Assessment
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-bold leading-snug text-white lg:text-4xl">
                Your hormones are{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(331,95%,82%), hsl(271,74%,70%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  telling you something.
                </span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                This assessment uses the Greene Climacteric Scale — a validated clinical tool for
                identifying hormone deficiency patterns in perimenopause and menopause. It takes
                about 3 minutes and gives you a personalized breakdown.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Your total score",
                    desc: "Scored against a clinical threshold",
                  },
                  {
                    label: "Hormone breakdown",
                    desc: "Progesterone, estrogen, and testosterone",
                  },
                  {
                    label: "What it means",
                    desc: "Plain-language interpretation + next steps",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"
                  >
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="mt-1.5 text-xs leading-5 text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-fuchsia-300/10 bg-fuchsia-400/[0.04] px-4 py-3">
                <p className="text-xs text-slate-400">
                  Based on Greene, J. (1976).{" "}
                  <em>A factor analytic study of climacteric symptoms.</em>{" "}
                  Journal of Psychosomatic Research.
                </p>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setStep("section1")}
                  className="rounded-full px-8 py-4 text-sm font-semibold text-white transition hover:opacity-90 hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))",
                    boxShadow: "0 0 40px rgba(217,70,239,0.22)",
                  }}
                >
                  Start Assessment →
                </button>
              </div>
            </div>
          )}

          {/* ── SECTIONS 1, 2, 3 ──────────────────────────────────────────── */}
          {(step === "section1" || step === "section2" || step === "section3") && (() => {
            const sec = GREENE_SECTIONS.find((s) => s.key === step)!;
            const items = GREENE_ITEMS.filter((item) =>
              (sec.itemIds as readonly number[]).includes(item.id),
            );
            const complete = isSectionComplete(step as SectionKey);
            const answered = answeredCount(step as SectionKey);

            return (
              <div key={step} className="pathway-step-enter">
                {/* Section header */}
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-300">
                    {sec.eyebrow}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white lg:text-3xl">
                    {sec.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-400">{sec.description}</p>
                </div>

                {/* Rating legend */}
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                  {(["Not at all", "A little", "Quite a bit", "Extremely"] as const).map(
                    (l, i) => (
                      <span key={l} className="flex items-center gap-1.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[10px] font-bold text-slate-400">
                          {i}
                        </span>
                        {l}
                      </span>
                    ),
                  )}
                </div>

                {/* Symptom rows */}
                <div className="space-y-2">
                  {items.map((item) => (
                    <SymptomRow
                      key={item.id}
                      itemId={item.id}
                      label={item.label}
                      score={scores[item.id]}
                      onSelect={(v) => setScore(item.id, v)}
                    />
                  ))}
                </div>

                {/* Nav */}
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (step === "section1") setStep("intro");
                      else if (step === "section2") setStep("section1");
                      else setStep("section2");
                    }}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/[0.08] transition"
                  >
                    Back
                  </button>

                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">
                      {answered} / {sec.itemIds.length} rated
                    </span>
                    <button
                      type="button"
                      onClick={() => advanceSection(step as SectionKey)}
                      disabled={!complete}
                      className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-30 hover:opacity-90"
                      style={{
                        background: complete
                          ? "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))"
                          : undefined,
                        backgroundColor: complete ? undefined : "rgba(255,255,255,0.08)",
                      }}
                    >
                      {step === "section3" ? "See My Results" : "Next Section →"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── RESULTS ────────────────────────────────────────────────────── */}
          {step === "results" && result && (
            <div className="pathway-step-enter">

              {/* Score header */}
              <div
                className="relative overflow-hidden rounded-2xl border border-white/10 p-6"
                style={{
                  background:
                    "linear-gradient(135deg, hsla(331,95%,72%,0.1), hsla(271,74%,55%,0.14), hsla(210,22%,16%,0.6))",
                }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_top,rgba(217,70,239,0.18),transparent_70%)]" />
                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">
                    Your Hormone Assessment
                  </p>
                  <div className="mt-3 flex items-end gap-4 flex-wrap">
                    <div>
                      <span className="text-5xl font-black text-white">{result.totalScore}</span>
                      <span className="ml-2 text-xl text-slate-400">/ 63</span>
                    </div>
                    <span
                      className={`mb-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] ${
                        severityStyle[result.severity]?.badge ?? ""
                      }`}
                    >
                      <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${severityStyle[result.severity]?.dot ?? ""}`} />
                      {result.severityLabel}
                    </span>
                  </div>
                  {result.totalScore > 12 && (
                    <p className="mt-3 text-xs text-slate-400">
                      Scores above 12 typically indicate a hormone deficiency pattern worth evaluating.
                    </p>
                  )}
                </div>
              </div>

              {/* Hormone breakdown */}
              <div className="mt-6">
                <div className="flex items-baseline justify-between mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Hormone Pattern Breakdown
                  </p>
                  <p className="text-[10px] text-slate-600">
                    % of symptoms linked to each hormone
                  </p>
                </div>
                <div className="space-y-3">
                  {(["progesterone", "estrogen", "testosterone"] as HormoneType[]).map((h) => {
                    const pct =
                      h === "progesterone"
                        ? result.progesteronePct
                        : h === "estrogen"
                        ? result.estrogenPct
                        : result.testosteronePct;
                    return (
                      <HormoneCard
                        key={h}
                        hormone={h}
                        pct={pct}
                        animated={barsAnimated}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Interpretation */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  What This Pattern Suggests
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-200">{result.interpretation}</p>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep("bothersome")}
                  className="rounded-full px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))",
                    boxShadow: "0 0 30px rgba(217,70,239,0.2)",
                  }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── MOST BOTHERSOME ────────────────────────────────────────────── */}
          {step === "bothersome" && result && (
            <div className="pathway-step-enter">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">
                One More Thing
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white lg:text-3xl">
                What&apos;s been bothering you most?
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                This helps us make sure that symptom gets addressed first.
              </p>

              {/* Top symptoms as pills */}
              {result.topSymptoms.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {result.topSymptoms.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setMostBothersome(s.label);
                        setCustomBothersome("");
                      }}
                      className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-150 ${
                        mostBothersome === s.label
                          ? "border-fuchsia-300/60 text-white shadow-[0_0_20px_rgba(217,70,239,0.2)]"
                          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
                      }`}
                      style={
                        mostBothersome === s.label
                          ? {
                              background:
                                "linear-gradient(135deg, hsla(331,95%,72%,0.18), hsla(271,74%,55%,0.18))",
                            }
                          : undefined
                      }
                    >
                      {s.label}
                      {s.score === 3 && (
                        <span className="ml-1.5 text-[10px] text-fuchsia-400 font-bold">●</span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-400">
                  All symptoms were rated low. Describe what&apos;s been most on your mind:
                </p>
              )}

              {/* Custom input */}
              <div className="mt-5">
                <input
                  type="text"
                  value={customBothersome}
                  onChange={(e) => {
                    setCustomBothersome(e.target.value);
                    setMostBothersome("");
                  }}
                  placeholder="Or describe it in your own words…"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-fuchsia-400/50 focus:bg-fuchsia-400/[0.06] focus:shadow-[0_0_0_3px_rgba(217,70,239,0.12)]"
                />
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <button
                  type="button"
                  onClick={() => setStep("results")}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/[0.08] transition"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep("lead")}
                  disabled={!mostBothersome && !customBothersome}
                  className="rounded-full px-7 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-30 hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))",
                  }}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── LEAD FORM ──────────────────────────────────────────────────── */}
          {step === "lead" && result && (
            <div className="pathway-step-enter">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">
                Send Your Results
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white lg:text-3xl">
                Get your assessment to our team
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                We&apos;ll send your full results to you and to our hormone care team so we can
                reach out personally. No spam — just a real conversation about what you&apos;re
                experiencing.
              </p>

              {/* Score summary */}
              <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4">
                <span className="text-sm font-semibold text-white">
                  Score: {result.totalScore}/63
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-sm text-slate-300">{result.severityLabel}</span>
                <span className="text-slate-600">·</span>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                  P: {result.progesteronePct}%
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  E: {result.estrogenPct}%
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  T: {result.testosteronePct}%
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormInput
                    label="First Name"
                    value={leadForm.firstName}
                    onChange={(v) => setLeadForm((p) => ({ ...p, firstName: v }))}
                    placeholder="Jane"
                    required
                  />
                  <FormInput
                    label="Last Name"
                    value={leadForm.lastName}
                    onChange={(v) => setLeadForm((p) => ({ ...p, lastName: v }))}
                    placeholder="Smith"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormInput
                    label="Age"
                    value={leadForm.age}
                    onChange={(v) => setLeadForm((p) => ({ ...p, age: v }))}
                    type="number"
                    placeholder="42"
                  />
                  <FormInput
                    label="Email"
                    value={leadForm.email}
                    onChange={(v) => setLeadForm((p) => ({ ...p, email: v }))}
                    type="email"
                    placeholder="jane@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 mb-2">
                    Any questions for our team?
                  </label>
                  <textarea
                    rows={3}
                    value={leadForm.question}
                    onChange={(e) =>
                      setLeadForm((p) => ({ ...p, question: e.target.value }))
                    }
                    placeholder="Anything specific you want us to know or ask about…"
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition focus:border-fuchsia-400/50 focus:bg-fuchsia-400/[0.06] focus:shadow-[0_0_0_3px_rgba(217,70,239,0.12)]"
                  />
                </div>

                {submitError && (
                  <p className="rounded-xl border border-rose-400/20 bg-rose-400/[0.06] px-4 py-3 text-sm text-rose-300">
                    {submitError}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep("bothersome")}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/[0.08] transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !leadForm.firstName || !leadForm.email}
                    className="rounded-full px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-30"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))",
                      boxShadow: "0 0 36px rgba(217,70,239,0.22)",
                    }}
                  >
                    {submitting ? "Sending…" : "Send My Results →"}
                  </button>
                </div>
              </form>

              <p className="mt-5 text-xs leading-5 text-slate-600">
                By submitting, you consent to being contacted by Colorado Springs Health
                Collective about hormone health services. We do not sell your information.
              </p>
            </div>
          )}

          {/* ── DONE ───────────────────────────────────────────────────────── */}
          {step === "done" && result && (
            <div className="pathway-step-enter">
              <div
                className="relative overflow-hidden rounded-2xl border p-8 text-center"
                style={{
                  borderColor: "hsla(331,95%,72%,0.22)",
                  background:
                    "linear-gradient(135deg, hsla(331,95%,72%,0.14), hsla(271,74%,55%,0.18), hsla(210,22%,16%,0.6))",
                }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(217,70,239,0.2),transparent_70%)]" />
                <div className="relative">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-fuchsia-300/25 bg-fuchsia-400/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-7 w-7 text-fuchsia-300"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">
                    Results Sent
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-white">
                    {leadForm.firstName
                      ? `Thank you, ${leadForm.firstName}.`
                      : "Thank you."}
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-300">
                    Your assessment has been sent to our hormone care team. You&apos;ll also
                    receive a copy at {leadForm.email}. Someone will reach out personally.
                  </p>

                  <div className="mx-auto mt-6 max-w-sm rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs font-semibold text-slate-400 mb-2">Your score summary</p>
                    <div className="flex justify-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="text-2xl font-black text-white">{result.totalScore}</p>
                        <p className="text-xs text-slate-500">/ 63</p>
                      </div>
                      <div className="flex flex-col justify-center gap-1 text-xs text-slate-400">
                        <span><span className="inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-400 mr-1" />P: {result.progesteronePct}%</span>
                        <span><span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400 mr-1" />E: {result.estrogenPct}%</span>
                        <span><span className="inline-block h-1.5 w-1.5 rounded-full bg-rose-400 mr-1" />T: {result.testosteronePct}%</span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 text-sm text-slate-300">
                    Want to move faster?
                  </p>
                  <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Link
                      href={WOMENS_BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:opacity-90"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))",
                      }}
                    >
                      Book a Free Consult
                    </Link>
                    <Link
                      href="/hormone/womens-health"
                      className="text-sm font-medium text-slate-400 hover:text-white transition"
                    >
                      Learn more about our approach →
                    </Link>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-xs leading-5 text-slate-600">
                This assessment is educational and does not constitute medical advice or a
                diagnosis. Results are based on self-reported symptoms and should not replace a
                clinical evaluation.
              </p>

              <button
                type="button"
                onClick={reset}
                className="mt-4 text-xs font-medium text-slate-500 transition hover:text-slate-300"
              >
                Start over
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
