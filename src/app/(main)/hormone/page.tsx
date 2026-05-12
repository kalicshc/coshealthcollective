import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { clinicFacts, usd } from "@/lib/clinicFacts";

export const metadata: Metadata = {
  title: "Hormone + Metabolic Care | Colorado Springs Health Collective",
  description: "Evidence-based hormone care for women and men in Colorado Springs. HRT, TRT, GLP-1, perimenopause, menopause, and metabolic health — all in one care pathway.",
};

const BOOKING_URL =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266";

const womensChips = ["Brain fog", "Low libido", "Mood changes", "Fatigue", "Sleep disruption"];
const mensChips = ["Low T", "Fatigue", "Low libido", "Recovery"];
const glpChips = ["Semaglutide", "Tirzepatide", "Metabolic review", "Body comp"];

const PriceStrip = () => (
  <p className="mt-3 text-xs lg:text-sm" style={{ color: "hsl(210,22%,72%)" }}>
    <span className="font-semibold text-white">
      {usd(clinicFacts.hormone.initialConsult)}
    </span>{" "}
    initial consult + first month
    <span aria-hidden="true" className="mx-2" style={{ color: "hsl(210,18%,42%)" }}>•</span>
    <span className="font-semibold text-white">
      {usd(clinicFacts.hormone.monthlyManagement)}/mo
    </span>{" "}
    ongoing
  </p>
);

export default function HormonePage() {
  return (
    <div
      className="relative"
      style={{ background: "linear-gradient(180deg, hsla(210,32%,11%,0.7), hsla(210,32%,12%,0.56))" }}
    >
      {/* ── FIRST VIEWPORT: panes + chevron, fills exactly one screen ── */}
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl min-h-screen flex flex-col pt-24 pb-6 md:pt-40 lg:pt-44 xl:pt-32 lg:pb-8">

        {/* ── WOMEN'S HEALTH PANE (top, slightly smaller) ── */}
        <section
          className="relative overflow-hidden rounded-3xl border p-5 lg:p-7"
          style={{
            background: "linear-gradient(135deg, hsla(331,95%,65%,0.16), hsla(271,74%,55%,0.18), hsla(210,32%,14%,0.94))",
            borderColor: "hsla(331,80%,72%,0.28)",
            boxShadow: "0 24px 80px rgba(2,6,23,0.45)",
          }}
        >
          <Link
            href="/hormone/womens-health"
            aria-label="Women's Health"
            className="absolute inset-0 z-0"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, hsla(331,95%,72%,0.22), transparent 45%), radial-gradient(circle at 86% 80%, hsla(188,88%,54%,0.10), transparent 35%)",
            }}
            aria-hidden="true"
          />

          <div className="pointer-events-none relative z-10 text-center">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{
                borderColor: "hsla(331,80%,72%,0.32)",
                background: "hsla(294,34%,14%,0.55)",
                color: "hsl(331,95%,84%)",
                backdropFilter: "blur(8px)",
              }}
            >
              Women&apos;s Hormone Health
            </span>

            <h1
              className="mt-2 text-2xl font-bold leading-[1.05] lg:text-4xl"
              style={{ color: "hsl(0,0%,100%)", textShadow: "0 10px 34px rgba(0,0,0,0.42)" }}
            >
              <span className="sr-only">Hormone Therapy Colorado Springs — HRT, Perimenopause, Menopause, TRT &amp; GLP-1 Weight Loss. </span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, hsl(340,100%,82%), hsl(281,86%,67%), hsl(189,100%,70%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.28))",
                }}
              >
                Women&apos;s Health
              </span>
            </h1>

            <p
              className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed"
              style={{ color: "hsl(210,22%,82%)" }}
            >
              The physiologic changes in midlife are real — and the time to act is now. We look at hormones, metabolic health, and lifestyle together.
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {womensChips.map((s) => (
                <span
                  key={s}
                  className="rounded-full border px-2.5 py-1 text-[11px] font-medium"
                  style={{
                    borderColor: "hsla(320,80%,72%,0.28)",
                    background: "hsla(294,34%,14%,0.55)",
                    color: "hsl(0,0%,90%)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row sm:flex-wrap">
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto relative z-10 px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "hsl(0,0%,100%)", color: "hsl(294,40%,12%)" }}
              >
                Free Consult
              </Link>
              <Link
                href="/hormone/womens-health"
                className="pointer-events-auto relative z-10 px-5 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, hsl(331,95%,65%), hsl(271,74%,52%))" }}
              >
                Learn More
              </Link>
              <Link
                href="/hormone/womens-health/quiz"
                className="pointer-events-auto relative z-10 px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                Take the Quiz
              </Link>
            </div>

            <PriceStrip />

            <div className="mt-4">
              <div
                className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em]"
                style={{ color: "hsl(210,18%,62%)" }}
              >
                <Image
                  src="/perry-academy-perimenopause-certificate.svg"
                  alt=""
                  width={18}
                  height={18}
                  aria-hidden="true"
                  className="object-contain opacity-80"
                />
                Perry Academy · Perimenopause Certification
              </div>
            </div>
          </div>
        </section>

        {/* ── TRT + GLP-1 PANES (matching design, side by side) ── */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">

          {/* GLP-1 (left) */}
          <section
            className="relative overflow-hidden rounded-3xl border p-6 lg:p-7"
            style={{
              background: "linear-gradient(135deg, hsla(271,74%,55%,0.18), hsla(188,88%,54%,0.14), hsla(210,32%,14%,0.94))",
              borderColor: "hsla(271,74%,55%,0.28)",
              boxShadow: "0 20px 60px rgba(2,6,23,0.35)",
            }}
          >
            <Link
              href="/hormone/glp1"
              aria-label="GLP-1 Weight Loss"
              className="absolute inset-0 z-0"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(circle at 80% 0%, hsla(271,74%,55%,0.18), transparent 50%)" }}
              aria-hidden="true"
            />
            <div className="pointer-events-none relative z-10 text-center">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{
                  borderColor: "hsla(271,74%,65%,0.32)",
                  background: "hsla(244,28%,13%,0.6)",
                  color: "hsl(271,74%,82%)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Metabolic Care
              </span>

              <h2
                className="mt-3 text-2xl font-bold leading-[1.05] lg:text-3xl"
                style={{ color: "hsl(0,0%,100%)" }}
              >
                <span
                  className="block"
                  style={{
                    background: "linear-gradient(135deg, hsl(188,88%,72%), hsl(271,74%,75%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  GLP-1 Weight Loss
                </span>
              </h2>

              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {glpChips.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium"
                    style={{
                      borderColor: "hsla(271,70%,65%,0.3)",
                      background: "hsla(244,28%,13%,0.55)",
                      color: "hsl(271,74%,85%)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <Link
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto relative z-10 px-4 py-2 rounded-full text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "hsl(0,0%,100%)", color: "hsl(244,40%,12%)" }}
                >
                  Free Consult
                </Link>
                <Link
                  href="/hormone/glp1"
                  className="pointer-events-auto relative z-10 px-4 py-2 rounded-full text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, hsl(271,74%,55%), hsl(188,88%,54%))" }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </section>

          {/* Men's TRT (right) */}
          <section
            className="relative overflow-hidden rounded-3xl border p-6 lg:p-7"
            style={{
              background: "linear-gradient(135deg, hsla(188,88%,54%,0.16), hsla(216,79%,46%,0.2), hsla(210,32%,14%,0.94))",
              borderColor: "hsla(188,88%,54%,0.28)",
              boxShadow: "0 20px 60px rgba(2,6,23,0.35)",
            }}
          >
            <Link
              href="/hormone/mens-health"
              aria-label="Men's Health + TRT"
              className="absolute inset-0 z-0"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(circle at 20% 0%, hsla(188,88%,54%,0.18), transparent 50%)" }}
              aria-hidden="true"
            />
            <div className="pointer-events-none relative z-10 text-center">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{
                  borderColor: "hsla(188,80%,65%,0.32)",
                  background: "hsla(210,32%,12%,0.6)",
                  color: "hsl(188,88%,82%)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Men&apos;s Hormone Health
              </span>

              <h2
                className="mt-3 text-2xl font-bold leading-[1.05] lg:text-3xl"
                style={{ color: "hsl(0,0%,100%)" }}
              >
                <span
                  className="block"
                  style={{
                    background: "linear-gradient(135deg, hsl(188,88%,72%), hsl(216,79%,72%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Men&apos;s Health + TRT
                </span>
              </h2>

              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {mensChips.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium"
                    style={{
                      borderColor: "hsla(188,80%,65%,0.3)",
                      background: "hsla(210,32%,12%,0.55)",
                      color: "hsl(188,88%,85%)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <Link
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto relative z-10 px-4 py-2 rounded-full text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "hsl(0,0%,100%)", color: "hsl(210,32%,10%)" }}
                >
                  Free Consult
                </Link>
                <Link
                  href="/hormone/mens-health"
                  className="pointer-events-auto relative z-10 px-4 py-2 rounded-full text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(216,79%,46%))" }}
                >
                  Learn More
                </Link>
                <Link
                  href="/hormone/mens-health/quiz"
                  className="pointer-events-auto relative z-10 px-4 py-2 rounded-full text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)" }}
                >
                  Take the Quiz
                </Link>
              </div>
            </div>
          </section>

        </div>

        {/* ── Bouncing scroll cue (pinned to bottom of first viewport) ── */}
        <a
          href="#whole-person"
          aria-label="Scroll for more"
          className="mt-auto pt-6 flex justify-center"
        >
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border animate-bounce"
            style={{
              borderColor: "hsla(331,80%,72%,0.32)",
              background: "hsla(294,34%,14%,0.55)",
              color: "hsl(331,95%,82%)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </a>

      </div>

      {/* ── SECOND VIEWPORT: a whole-person approach (zig-zag with imagery) ── */}
      <div className="relative overflow-hidden">
        {/* Keyframes for ambient animations */}
        <style>{`
          @keyframes wp-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
          @keyframes wp-glow { 0%,100% { filter: drop-shadow(0 12px 36px hsla(331,95%,60%,0.30)); } 50% { filter: drop-shadow(0 18px 48px hsla(331,95%,60%,0.55)); } }
          @keyframes wp-glow-v { 0%,100% { filter: drop-shadow(0 12px 36px hsla(271,74%,60%,0.30)); } 50% { filter: drop-shadow(0 18px 48px hsla(271,74%,60%,0.55)); } }
          @keyframes wp-glow-c { 0%,100% { filter: drop-shadow(0 12px 36px hsla(188,88%,54%,0.28)); } 50% { filter: drop-shadow(0 18px 48px hsla(188,88%,54%,0.50)); } }
          @keyframes wp-spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
        {/* Ambient color wash */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 10%, hsla(331,95%,72%,0.10), transparent 45%), radial-gradient(circle at 85% 90%, hsla(188,88%,54%,0.08), transparent 45%)",
          }}
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-4 lg:px-6 max-w-6xl py-20 lg:py-28">
          <section id="whole-person" className="scroll-mt-24">

            {/* Header */}
            <div className="text-center mb-16 lg:mb-24">
              <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: "hsl(331,95%,72%)" }}>
                Beyond the prescription
              </p>
              <h2
                className="mt-4 text-4xl font-bold leading-[1.05] lg:text-6xl xl:text-7xl"
                style={{ color: "hsl(0,0%,100%)", textShadow: "0 10px 34px rgba(0,0,0,0.4)" }}
              >
                <span
                  className="block"
                  style={{
                    background: "linear-gradient(135deg, hsl(340,100%,82%), hsl(281,86%,67%), hsl(189,100%,70%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.28))",
                  }}
                >
                  A whole-person approach
                </span>
              </h2>
              <p
                className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed lg:text-xl"
                style={{ color: "hsl(210,22%,85%)" }}
              >
                Hormone therapy can be transformative — but hormones don&apos;t act in isolation. They flow into a system of enzymes, receptors, and metabolic pathways that decide whether those hormones help or harm. That system is your metabolic health.
              </p>
            </div>

            {/* Zig-zag rows */}
            <div className="space-y-20 lg:space-y-28">

              {/* 01 — image LEFT, content RIGHT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
                <div className="relative order-1 md:order-1">
                  <div
                    className="relative aspect-square rounded-3xl overflow-hidden"
                    style={{ animation: "wp-float 9s ease-in-out infinite, wp-glow 7s ease-in-out infinite" }}
                  >
                    <Image
                      src="/hormone/whole-person/01-metabolic.png"
                      alt="Glowing cell with orbiting enzymes — metabolic foundation of hormone therapy"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    {/* Soft rotating ring overlay */}
                    <div
                      className="pointer-events-none absolute inset-6 rounded-full border"
                      style={{
                        borderColor: "hsla(331,95%,72%,0.18)",
                        animation: "wp-spin-slow 40s linear infinite",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="order-2 md:order-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-5xl lg:text-6xl font-black leading-none"
                      style={{
                        background: "linear-gradient(135deg, hsl(331,95%,72%), hsl(340,100%,82%))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                      aria-hidden="true"
                    >
                      01
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "hsl(331,95%,78%)" }}>
                      The terrain
                    </p>
                  </div>
                  <h3 className="text-2xl font-bold text-white lg:text-3xl">
                    Metabolic health is the foundation
                  </h3>
                  <p className="mt-4 text-lg italic" style={{ color: "hsl(210,22%,88%)" }}>
                    Same hormone, different body — different outcome.
                  </p>
                  <p className="mt-4 text-base leading-8" style={{ color: "hsl(210,22%,80%)" }}>
                    Your body doesn&apos;t just receive hormones — it processes them. Chronic inflammation, insulin resistance, and excess belly fat throw that processing off, so byproducts that should be cleared safely instead build up where they shouldn&apos;t — including in brain tissue. The result: the same dose can help one person and quietly burden another. Fixing the terrain first — the inflammation, the metabolic load — is what lets hormone therapy work <em>with</em> your body instead of against it.
                  </p>
                </div>
              </div>

              {/* 02 — content LEFT, image RIGHT (zig) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
                <div className="order-2 md:order-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-5xl lg:text-6xl font-black leading-none"
                      style={{
                        background: "linear-gradient(135deg, hsl(271,74%,68%), hsl(281,86%,75%))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                      aria-hidden="true"
                    >
                      02
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "hsl(271,74%,82%)" }}>
                      The personal piece
                    </p>
                  </div>
                  <h3 className="text-2xl font-bold text-white lg:text-3xl">
                    Two genes change the math
                  </h3>
                  <p className="mt-4 text-lg italic" style={{ color: "hsl(210,22%,88%)" }}>
                    Your genome decides how your body handles estrogen — and how your brain ages.
                  </p>
                  <p className="mt-4 text-base leading-8" style={{ color: "hsl(210,22%,80%)" }}>
                    COMT (Val158Met) governs how quickly you clear estrogen byproducts. ApoE shapes how your brain handles lipids and amyloid. Both interact with what researchers call the &quot;healthy cell bias&quot; — estrogen is deeply neuroprotective when neurons are healthy, and surprisingly burdensome when they&apos;re not. The same therapy can preserve memory in one body and accelerate decline in another. Knowing your genotype can help guide treatment decisions and other work that needs to be done.
                  </p>
                </div>
                <div className="relative order-1 md:order-2">
                  <div
                    className="relative aspect-square rounded-3xl overflow-hidden"
                    style={{ animation: "wp-float 11s ease-in-out infinite reverse, wp-glow-v 8s ease-in-out infinite" }}
                  >
                    <Image
                      src="/hormone/whole-person/02-brain-dna.png"
                      alt="Glowing brain interwoven with DNA double helix — genetics and brain timing"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div
                      className="pointer-events-none absolute inset-6 rounded-full border"
                      style={{
                        borderColor: "hsla(271,74%,68%,0.18)",
                        animation: "wp-spin-slow 50s linear infinite reverse",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {/* 03 — image LEFT, content RIGHT (zag) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
                <div className="relative order-1 md:order-1">
                  <div
                    className="relative aspect-square rounded-3xl overflow-hidden"
                    style={{ animation: "wp-float 10s ease-in-out infinite, wp-glow-c 9s ease-in-out infinite" }}
                  >
                    <Image
                      src="/hormone/whole-person/03-loop.png"
                      alt="Two arrows forming a circular loop — vicious cycle of low testosterone and metabolism"
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div
                      className="pointer-events-none absolute inset-6 rounded-full border"
                      style={{
                        borderColor: "hsla(188,88%,62%,0.18)",
                        animation: "wp-spin-slow 60s linear infinite",
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="order-2 md:order-2">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-5xl lg:text-6xl font-black leading-none"
                      style={{
                        background: "linear-gradient(135deg, hsl(188,88%,62%), hsl(189,100%,75%))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                      aria-hidden="true"
                    >
                      03
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "hsl(188,88%,78%)" }}>
                      Same biology
                    </p>
                  </div>
                  <h3 className="text-2xl font-bold text-white lg:text-3xl">
                    Men live in the same loop
                  </h3>
                  <p className="mt-4 text-lg italic" style={{ color: "hsl(210,22%,88%)" }}>
                    Low T and metabolism reinforce each other.
                  </p>
                  <p className="mt-4 text-base leading-8" style={{ color: "hsl(210,22%,80%)" }}>
                    Visceral fat raises aromatase, which converts testosterone into estrogen — which deepens metabolic dysfunction, which lowers testosterone further. The cycle feeds itself. Many men labeled &quot;low T&quot; actually have a metabolic problem in disguise — and fixing that problem can restore testosterone without lifelong replacement. We optimize the system first, then decide what, if anything, you actually need from the prescription pad.
                  </p>
                </div>
              </div>

            </div>

            {/* Read the full article CTA */}
            <div className="mt-20 lg:mt-24 flex justify-center">
              <Link
                href="/blog/metabolic-health-hormone-therapy-colorado-springs"
                className="px-8 py-4 rounded-full text-base font-semibold text-white hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, hsl(331,95%,65%), hsl(271,74%,52%))",
                  boxShadow: "0 16px 40px hsla(331,80%,55%,0.4)",
                }}
              >
                Read the full article →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
