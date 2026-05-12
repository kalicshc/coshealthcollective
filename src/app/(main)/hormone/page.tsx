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
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl min-h-screen flex flex-col pt-20 pb-6 lg:pt-32 lg:pb-8">

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

      {/* ── SECOND VIEWPORT: a whole-person approach ── */}
      <div className="container mx-auto px-4 lg:px-6 max-w-6xl py-16 lg:py-20">
        <section id="whole-person" className="scroll-mt-24">
          <div className="text-center mb-7">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(331,95%,72%)" }}>
              Beyond the prescription
            </p>
            <h2 className="mt-2 text-2xl lg:text-3xl font-bold text-white">
              A whole-person approach
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm lg:text-base" style={{ color: "hsl(210,22%,82%)" }}>
              Hormones don&apos;t act in isolation. Metabolic health and lifestyle shape how they&apos;re made, used, and cleared — in both women and men.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div
              className="rounded-2xl border p-5"
              style={{
                background: "linear-gradient(135deg, hsla(331,95%,65%,0.10), hsla(210,32%,14%,0.85))",
                borderColor: "rgba(255,255,255,0.10)",
              }}
            >
              <h3 className="text-base font-bold text-white">Metabolic health</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "hsl(210,22%,78%)" }}>
                Insulin resistance, body composition, and inflammation can change how hormones behave more than the hormones themselves.
              </p>
            </div>
            <div
              className="rounded-2xl border p-5"
              style={{
                background: "linear-gradient(135deg, hsla(271,74%,55%,0.10), hsla(210,32%,14%,0.85))",
                borderColor: "rgba(255,255,255,0.10)",
              }}
            >
              <h3 className="text-base font-bold text-white">Lifestyle is upstream</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "hsl(210,22%,78%)" }}>
                Sleep, training, food, and stress sit upstream of nearly every hormone we measure. We address them alongside any treatment.
              </p>
            </div>
            <div
              className="rounded-2xl border p-5"
              style={{
                background: "linear-gradient(135deg, hsla(188,88%,54%,0.10), hsla(210,32%,14%,0.85))",
                borderColor: "rgba(255,255,255,0.10)",
              }}
            >
              <h3 className="text-base font-bold text-white">For women &amp; men</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "hsl(210,22%,78%)" }}>
                In women, insulin resistance can worsen perimenopause symptoms. In men, visceral fat lowers testosterone. The pathway rhymes.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
