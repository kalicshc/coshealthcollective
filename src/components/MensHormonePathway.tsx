"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  evaluateMensHormonePathway,
  getVisibleMensHormoneQuestions,
  mensHormoneCtas,
  type MensHormoneQuestion,
  type MensPathwayAnswers,
  type ResultCategory,
} from "@/lib/mensHormonePathway";

// ─── Education moments ─────────────────────────────────────────────────────────

const educationMoments: Partial<Record<string, { title: string; text: string }>> = {
  main_symptoms: {
    title: "Symptoms can mislead",
    text: "Low libido, fatigue, and brain fog are often blamed on testosterone — but thyroid issues, sleep apnea, depression, and chronic stress produce nearly identical symptoms. Your specific pattern and history help us identify the real driver.",
  },
  fertility_priority: {
    title: "This changes the entire conversation",
    text: "Standard testosterone therapy shuts down sperm production within weeks. If fertility matters at all — now or later — that needs to be part of the plan from day one. There are excellent options that raise testosterone and preserve fertility simultaneously.",
  },
  sleep_quality: {
    title: "Testosterone is made during sleep",
    text: "Most testosterone production happens during deep REM sleep. Sleep apnea, chronic short sleep, and disrupted schedules can independently cause low testosterone — or significantly compound an existing deficiency.",
  },
  stress_level: {
    title: "Cortisol and testosterone compete",
    text: "Under prolonged stress, your body prioritizes the stress response — directly suppressing testosterone production at multiple points in the hormonal chain. Months of high cortisol can tank levels as effectively as structural disease.",
  },
  medications_substances: {
    title: "More substances affect hormones than you'd expect",
    text: "Opioids, corticosteroids, anabolic history, certain antidepressants, finasteride, and alcohol are among the most common and under-recognized causes of low testosterone. Identifying these before starting treatment is critical.",
  },
  medical_history: {
    title: "These conditions overlap with hormone symptoms",
    text: "Thyroid dysfunction, diabetes, and sleep apnea can each independently cause every symptom of low testosterone — and they frequently coexist with it. Treating just one without the others leads to incomplete results.",
  },
  primary_history: {
    title: "Some causes are structural",
    text: "Past testicular injury, infections, undescended testicles, or exposure to chemo or radiation can permanently affect the testes' ability to produce testosterone. LH and FSH levels in the lab tell this story clearly.",
  },
  therapy_response: {
    title: "More isn't always the answer",
    text: "Not feeling right on TRT doesn't mean you need a higher dose. Free testosterone vs. total, SHBG levels, estradiol balance, injection timing, and delivery method all determine how well therapy actually works.",
  },
};

// ─── Category styling ──────────────────────────────────────────────────────────

const categoryStyles: Record<
  string,
  { badge: string; border: string; glow: string; dot: string }
> = {
  primary_hypogonadism: {
    badge: "bg-amber-400/15 text-amber-300 border border-amber-400/20",
    border: "border-amber-400/20",
    glow: "shadow-[0_0_40px_rgba(251,191,36,0.06)]",
    dot: "bg-amber-400",
  },
  secondary_hypogonadism: {
    badge: "bg-cyan-400/15 text-cyan-300 border border-cyan-400/20",
    border: "border-cyan-400/20",
    glow: "shadow-[0_0_40px_rgba(34,211,238,0.06)]",
    dot: "bg-cyan-400",
  },
  non_hormonal: {
    badge: "bg-fuchsia-400/15 text-fuchsia-300 border border-fuchsia-400/20",
    border: "border-fuchsia-400/20",
    glow: "shadow-[0_0_40px_rgba(232,121,249,0.06)]",
    dot: "bg-fuchsia-400",
  },
  trt_optimization: {
    badge: "bg-blue-400/15 text-blue-300 border border-blue-400/20",
    border: "border-blue-400/20",
    glow: "shadow-[0_0_40px_rgba(96,165,250,0.06)]",
    dot: "bg-blue-400",
  },
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

function isAnswered(question: MensHormoneQuestion, answers: MensPathwayAnswers): boolean {
  const value = answers[question.id];
  if (question.type === "multi") return Array.isArray(value) && value.length > 0;
  if (question.type === "number") return typeof value === "number" && !Number.isNaN(value);
  return typeof value === "string" && value.length > 0;
}

const starterAnswers: MensPathwayAnswers = {
  main_symptoms: [],
  medications_substances: [],
  therapy_type: [],
  therapy_response: [],
  therapy_side_effects: [],
  prior_androgen_exposure: [],
  primary_history: [],
  medical_history: [],
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function CategorySection({ category }: { category: ResultCategory }) {
  const styles = categoryStyles[category.id] ?? categoryStyles.secondary_hypogonadism;
  return (
    <div className={`rounded-2xl border bg-white/[0.03] p-5 lg:p-6 ${styles.border} ${styles.glow}`}>
      <div className="flex items-center gap-2.5">
        <span className={`h-2 w-2 shrink-0 rounded-full ${styles.dot}`} />
        <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${styles.badge}`}>
          {category.label}
        </span>
      </div>
      <p className="mt-2 text-xs text-slate-400">{category.tagline}</p>
      <div className="mt-4 space-y-4 border-t border-white/[0.06] pt-4">
        {category.causes.map((cause) => (
          <div key={cause.id}>
            <div className="flex items-start gap-2">
              <span className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${styles.dot}`} />
              <p className="text-sm font-medium text-white">{cause.triggerText}</p>
            </div>
            <p className="mt-1.5 pl-3.5 text-sm leading-6 text-slate-400">{cause.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function MensHormonePathway() {
  const [answers, setAnswers] = useState<MensPathwayAnswers>(starterAnswers);
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const visibleQuestions = useMemo(() => getVisibleMensHormoneQuestions(answers), [answers]);
  const currentQuestion = visibleQuestions[index];
  const educationMoment = currentQuestion ? educationMoments[currentQuestion.id] : null;

  const progress = visibleQuestions.length
    ? Math.round(((index + (complete ? 1 : 0)) / visibleQuestions.length) * 100)
    : 0;

  const result = complete ? evaluateMensHormonePathway(answers) : null;

  useEffect(() => {
    if (index > visibleQuestions.length - 1) {
      setIndex(Math.max(visibleQuestions.length - 1, 0));
    }
  }, [index, visibleQuestions.length]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
    return () => window.clearTimeout(id);
  }, [index, complete]);

  function setSingleValue(id: string, value: string | number) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function selectSingleOption(id: string, value: string) {
    setSingleValue(id, value);
    window.setTimeout(() => {
      if (index === visibleQuestions.length - 1) {
        setAnalyzing(true);
        window.setTimeout(() => {
          setAnalyzing(false);
          setComplete(true);
        }, 1800);
        return;
      }
      setIndex((i) => i + 1);
    }, 180);
  }

  function toggleMultiValue(id: string, value: string) {
    setAnswers((prev) => {
      const existing = Array.isArray(prev[id]) ? [...(prev[id] as string[])] : [];
      const next = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      const sanitized =
        next.includes("none") && next.length > 1 ? next.filter((v) => v !== "none") : next;
      return {
        ...prev,
        [id]: value === "none" && !existing.includes("none") ? ["none"] : sanitized,
      };
    });
  }

  function goNext() {
    if (!currentQuestion || !isAnswered(currentQuestion, answers)) return;
    if (index === visibleQuestions.length - 1) {
      setAnalyzing(true);
      window.setTimeout(() => {
        setAnalyzing(false);
        setComplete(true);
      }, 1800);
      return;
    }
    setIndex((i) => i + 1);
  }

  function goBack() {
    if (complete) { setComplete(false); return; }
    setIndex((i) => Math.max(i - 1, 0));
  }

  function reset() {
    setComplete(false);
    setIndex(0);
    setAnswers(starterAnswers);
  }

  // ── Analyzing overlay ────────────────────────────────────────────────────────
  if (analyzing) {
    return (
      <div ref={topRef} className="mx-auto w-full max-w-4xl">
        <div className="content-glass overflow-hidden rounded-none border-x-0 border-b-0 p-0 shadow-[0_30px_80px_rgba(8,15,28,0.35)] md:rounded-[32px] md:border">
          <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 p-8 md:min-h-[400px]">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-full border-2 border-white/10" />
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cyan-300" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
                Analyzing your responses
              </p>
              <p className="mt-2 text-sm text-slate-400">Building your personalized summary...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="mx-auto w-full max-w-4xl">
      <div className="content-glass overflow-hidden rounded-none border-x-0 border-b-0 p-0 shadow-[0_30px_80px_rgba(8,15,28,0.35)] md:rounded-[32px] md:border">

        {/* Header bar */}
        <div className="border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))] px-6 py-5 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300/90" />
              <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-300/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              No email required
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8">

          {/* ── Question view ────────────────────────────────────────────────── */}
          {!complete && currentQuestion ? (
            <>
              {/* Progress */}
              <div className="mb-8">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(135deg,#00D4FF,#8B2FE8)] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500">
                  <span>{index + 1} of {visibleQuestions.length}</span>
                  <span>Adapts to your answers</span>
                </div>
              </div>

              <div
                key={currentQuestion.id}
                className="pathway-step-enter flex min-h-[calc(100dvh-280px)] flex-col justify-between md:min-h-0"
              >
                <div>
                  <h3 className="text-2xl font-bold leading-snug text-white lg:text-3xl">
                    {currentQuestion.prompt}
                  </h3>

                  {currentQuestion.description && (
                    <p className="mt-2 text-sm text-slate-400">{currentQuestion.description}</p>
                  )}

                  {educationMoment && (
                    <div className="mt-5 rounded-2xl border border-cyan-300/10 bg-cyan-400/[0.07] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                        {educationMoment.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-6 text-slate-300">{educationMoment.text}</p>
                    </div>
                  )}

                  <div className="mt-7">
                    {/* Single select */}
                    {currentQuestion.type === "single" && currentQuestion.options && (
                      <div className="grid gap-2.5">
                        {currentQuestion.options.map((option) => {
                          const selected = answers[currentQuestion.id] === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => selectSingleOption(currentQuestion.id, option.value)}
                              className={`group rounded-2xl border px-5 py-4 text-left transition duration-150 ${
                                selected
                                  ? "border-cyan-300/50 bg-cyan-400/10 shadow-[0_0_28px_rgba(0,212,255,0.1)]"
                                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-4">
                                <div>
                                  <p className="text-[15px] font-semibold text-white">{option.label}</p>
                                  {option.helper && (
                                    <p className="mt-0.5 text-xs text-slate-500">{option.helper}</p>
                                  )}
                                </div>
                                <div
                                  className={`h-4 w-4 shrink-0 rounded-full border transition ${
                                    selected
                                      ? "border-cyan-300 bg-cyan-300"
                                      : "border-white/20 group-hover:border-white/40"
                                  }`}
                                />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Multi select */}
                    {currentQuestion.type === "multi" && currentQuestion.options && (
                      <div className="grid gap-2.5">
                        {currentQuestion.options.map((option) => {
                          const selected =
                            Array.isArray(answers[currentQuestion.id]) &&
                            (answers[currentQuestion.id] as string[]).includes(option.value);
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => toggleMultiValue(currentQuestion.id, option.value)}
                              className={`group rounded-2xl border px-5 py-4 text-left transition duration-150 ${
                                selected
                                  ? "border-cyan-300/40 bg-cyan-400/[0.08] shadow-[0_0_24px_rgba(0,212,255,0.08)]"
                                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-4">
                                <div>
                                  <p className="text-[15px] font-medium text-white">{option.label}</p>
                                  {option.helper && (
                                    <p className="mt-0.5 text-xs text-slate-500">{option.helper}</p>
                                  )}
                                </div>
                                <div
                                  className={`h-4 w-4 shrink-0 rounded border transition ${
                                    selected
                                      ? "border-cyan-300 bg-cyan-300"
                                      : "border-white/20 group-hover:border-white/40"
                                  }`}
                                />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Nav */}
                <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={goBack}
                      disabled={index === 0}
                      className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Back
                    </button>
                    {currentQuestion.type !== "single" && (
                      <button
                        type="button"
                        onClick={goNext}
                        disabled={!isAnswered(currentQuestion, answers)}
                        className="rounded-full bg-[linear-gradient(135deg,#00D4FF,#8B2FE8)] px-6 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        {index === visibleQuestions.length - 1 ? "See My Results" : "Next"}
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    {currentQuestion.type === "single" ? "Tap to continue" : "Select all that apply"}
                  </p>
                </div>
              </div>
            </>
          ) : null}

          {/* ── Results view ─────────────────────────────────────────────────── */}
          {complete && result ? (
            <div className="pathway-step-enter">

              {/* Results header */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(0,212,255,0.08),rgba(139,47,232,0.12))] p-6">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.18),transparent_70%)]" />
                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                    Your Personalized Summary
                  </p>
                  <h3 className="mt-3 text-2xl font-bold leading-tight text-white lg:text-3xl">
                    Here&apos;s what may be driving your symptoms
                  </h3>

                  {result.symptomLabels.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {result.symptomLabels.map((label) => (
                        <span
                          key={label}
                          className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs text-slate-200"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Cause categories */}
              <div className="mt-6">
                {result.categories.length > 0 ? (
                  <div className="space-y-8">
                    {result.categories.map((category) => (
                      <div key={category.id}>
                        <div className="mb-3 flex items-start gap-3">
                          <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${categoryStyles[category.id]?.dot ?? "bg-cyan-400"}`} />
                          <div>
                            <p className="text-sm font-semibold text-white">{category.label}</p>
                            <p className="text-xs text-slate-400">{category.tagline}</p>
                          </div>
                        </div>
                        <CategorySection category={category} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                    <p className="text-sm leading-7 text-slate-300">
                      Your symptoms are real and worth a proper evaluation. A complete lab panel will give us the full picture — one number rarely tells the whole story.
                    </p>
                  </div>
                )}
              </div>

              {/* How we tell these apart */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  How we tell these apart
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  These labs differentiate the patterns flagged above and rule out non-hormonal mimics before any treatment decision is made.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {result.recommendedLabs.map((lab) => (
                    <span
                      key={lab}
                      className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-slate-200"
                    >
                      {lab}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(0,212,255,0.14),rgba(139,47,232,0.18))] p-6 shadow-[0_0_60px_rgba(0,212,255,0.1)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200">
                  Next Step
                </p>
                <p className="mt-3 text-xl font-bold text-white">
                  {result.symptomLabels.length >= 3
                    ? "You've been dealing with this long enough — let's do something about it."
                    : "Ready to find out what's actually going on?"}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  During your consult we review your history, run the right labs, and build a plan
                  specific to your pattern — not a one-size-fits-all protocol. No unnecessary
                  prescriptions. Just clear, evidence-based answers.
                </p>

                {result.treatmentDiscussionAreas.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {result.treatmentDiscussionAreas.map((area) => (
                      <li key={area} className="flex items-start gap-2.5 text-sm text-slate-100">
                        <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                        {area}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href={mensHormoneCtas.scheduleConsult.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_8px_30px_rgba(255,255,255,0.18)] transition hover:scale-[1.02]"
                  >
                    Schedule a Consult
                  </Link>
                  <Link
                    href="/hormone/mens-health"
                    className="text-sm font-medium text-slate-300 transition hover:text-white"
                  >
                    Have questions first? Learn more →
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="mt-6 text-xs leading-5 text-slate-600">
                This tool is educational and does not constitute medical advice or a diagnosis. Results are based on self-reported patterns and should not replace a clinical evaluation. If you are experiencing severe symptoms or a medical emergency, seek immediate care.
              </p>

              <button
                type="button"
                onClick={reset}
                className="mt-5 text-xs font-medium text-slate-500 transition hover:text-slate-300"
              >
                Start over
              </button>
            </div>
          ) : null}

        </div>
      </div>
    </div>
  );
}
