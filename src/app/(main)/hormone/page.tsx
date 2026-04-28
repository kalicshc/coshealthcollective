import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AskForm from "./AskForm";

export const metadata: Metadata = {
  title: "Hormone + Metabolic Care | Colorado Springs Health Collective",
  description: "Evidence-based hormone care for women and men in Colorado Springs. HRT, TRT, GLP-1, perimenopause, menopause, and metabolic health — all in one care pathway.",
};


const symptomChips = [
  "Brain fog",
  "Low libido",
  "Painful intercourse",
  "Mood changes",
  "Recurrent UTIs",
  "Fatigue",
  "Sleep disruption",
  "Vaginal dryness",
];

const BOOKING_URL =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266";

const careFlow = [
  {
    step: "01",
    title: "Free 15-minute consult",
    detail: "Start with a real conversation — no pressure, no commitment.",
    gradient: "linear-gradient(135deg, hsl(340,100%,82%), hsl(281,86%,67%))",
  },
  {
    step: "02",
    title: "Comprehensive review",
    detail: "Symptoms, history, and labs — your full picture, not just one number.",
    gradient: "linear-gradient(135deg, hsl(281,86%,67%), hsl(240,80%,65%))",
  },
  {
    step: "03",
    title: "Personalized treatment",
    detail: "A plan built around you, not a one-size-fits-all protocol.",
    gradient: "linear-gradient(135deg, hsl(240,80%,65%), hsl(189,100%,70%))",
  },
  {
    step: "04",
    title: "Ongoing support",
    detail: "A provider who stays in it with you — adjusting as you evolve.",
    gradient: "linear-gradient(135deg, hsl(189,100%,70%), hsl(188,88%,54%))",
  },
];

export default function HormonePage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section
        className="hero-overlay relative overflow-hidden pt-28 pb-24 lg:pt-32 lg:pb-28"
        style={{ background: "linear-gradient(180deg, hsla(210,32%,11%,0.7), hsla(210,32%,12%,0.56))" }}
      >
        {/* Radial color glows */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, hsla(331,95%,72%,0.18), transparent 40%), radial-gradient(circle at 14% 80%, hsla(271,74%,55%,0.14), transparent 30%), radial-gradient(circle at 86% 80%, hsla(188,88%,54%,0.10), transparent 30%)",
          }}
          aria-hidden="true"
        />
        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.7), transparent 92%)",
          }}
          aria-hidden="true"
        />

        <div className="container relative z-10 mx-auto px-5 lg:px-8 max-w-4xl">
          <div className="text-center">
            {/* Eyebrow */}
            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]"
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
              className="mt-7 text-4xl font-bold leading-[1.08] lg:text-[3.6rem] lg:leading-[1.05] xl:text-[4.2rem]"
              style={{ color: "hsl(0,0%,100%)", textShadow: "0 10px 34px rgba(0,0,0,0.42)" }}
            >
              Dedicated to
              <span className="sr-only"> Hormone Therapy Colorado Springs — HRT, Perimenopause, Menopause, TRT &amp; GLP-1 Weight Loss. </span>
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
                perimenopause &amp; menopause care.
              </span>
            </h1>

            <p
              className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed lg:text-xl"
              style={{ color: "hsl(210,25%,82%)", textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}
            >
              You&apos;ve been told to live with it. You don&apos;t have to.
            </p>

            <p
              className="mx-auto mt-4 max-w-2xl text-base leading-relaxed"
              style={{ color: "hsl(210,22%,72%)", textShadow: "0 4px 16px rgba(0,0,0,0.32)" }}
            >
              Evidence-informed hormone care for women who are tired of being dismissed, told everything is normal, or treated like hot flashes are the whole story.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {symptomChips.map((symptom) => (
                <span
                  key={symptom}
                  className="rounded-full border px-3.5 py-1.5 text-xs font-medium"
                  style={{
                    borderColor: "hsla(320,80%,72%,0.28)",
                    background: "hsla(294,34%,14%,0.55)",
                    color: "hsl(0,0%,90%)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {symptom}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  background: "hsl(0,0%,100%)",
                  color: "hsl(294,40%,12%)",
                  boxShadow: "0 0 40px hsla(0,0%,100%,0.18)",
                }}
              >
                Book a Consult
              </Link>
              <Link
                href="/hormone/womens-health"
                className="px-7 py-4 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, hsl(331,95%,65%), hsl(271,74%,52%))",
                  boxShadow: "0 0 40px hsla(331,80%,60%,0.3)",
                }}
              >
                See How We Can Help
              </Link>
              <AskForm />
            </div>

            <Link
              href="/hormone/womens-health/quiz"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
              style={{ color: "hsl(331,95%,82%)" }}
            >
              Not sure if this is you? Take the 2-minute hormone quiz <span aria-hidden="true">→</span>
            </Link>

            {/* Subtle credential trust line — anchored at the bottom of the hero */}
            <div
              className="mt-20 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ color: "hsl(210,18%,62%)" }}
            >
              <Image
                src="/perry-academy-perimenopause-certificate.svg"
                alt=""
                width={22}
                height={22}
                aria-hidden="true"
                className="object-contain opacity-80"
              />
              Perry Academy · Perimenopause Certification
            </div>
          </div>
        </div>
      </section>

      {/* ── YOUR PATH FORWARD ── */}
      <section className="relative py-20 lg:py-24">
        <div className="container mx-auto px-5 lg:px-8 max-w-6xl">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(331,95%,72%)" }}>
              Your Path Forward
            </p>
            <h2 className="mt-3 text-3xl font-bold lg:text-4xl" style={{ color: "hsl(0,0%,100%)" }}>
              Care that actually moves.
            </h2>
          </div>

          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Connector line on desktop */}
            <div
              className="pointer-events-none absolute left-12 right-12 top-5 hidden h-px lg:block"
              style={{
                background:
                  "linear-gradient(90deg, hsla(331,80%,70%,0.42), hsla(271,74%,55%,0.42), hsla(189,100%,70%,0.42), hsla(188,88%,54%,0.42))",
              }}
              aria-hidden="true"
            />

            {careFlow.map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center">
                <div
                  className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-xs font-black"
                  style={{
                    background: item.gradient,
                    color: "hsl(210,32%,10%)",
                    boxShadow: "0 0 28px hsla(331,80%,60%,0.22)",
                  }}
                >
                  {item.step}
                </div>
                <div
                  className="mt-5 w-full rounded-2xl border p-5"
                  style={{
                    background: "linear-gradient(180deg, hsla(294,34%,14%,0.55), hsla(244,28%,13%,0.5))",
                    borderColor: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 10px 40px rgba(7,10,18,0.28)",
                  }}
                >
                  <h3 className="text-base font-bold" style={{ color: "hsl(0,0%,96%)" }}>{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "hsl(210,18%,72%)" }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed" style={{ color: "hsl(210,18%,72%)" }}>
            Clear next steps, thoughtful follow-up, and care that adjusts with you.
          </p>
        </div>
      </section>

      {/* Hormone-palette divider */}
      <div className="relative py-8">
        <div
          className="mx-auto h-px max-w-4xl"
          style={{
            background: "linear-gradient(to right, transparent 0%, hsl(331,95%,72%) 25%, hsl(271,74%,55%) 50%, hsl(188,88%,54%) 75%, transparent 100%)",
            boxShadow: "0 0 24px 2px hsla(301,80%,60%,0.25)",
          }}
        />
      </div>

      {/* ── PATHWAYS ── */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-5 lg:px-8 max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(331,95%,72%)" }}>
              Additional Therapies
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Men's Health */}
            <div
              className="group relative overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, hsla(188,88%,54%,0.16), hsla(216,79%,46%,0.2), hsla(210,32%,14%,0.92))",
                borderColor: "hsla(188,88%,54%,0.28)",
                boxShadow: "0 24px 80px rgba(2,6,23,0.28)",
              }}
            >
              {/* Stretched link — whole card routes to mens-health */}
              <Link
                href="/hormone/mens-health"
                aria-label="Men's Health + TRT"
                className="absolute inset-0 z-0"
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                style={{ background: "radial-gradient(circle at top right, rgba(255,255,255,0.07), transparent 30%)" }} aria-hidden="true" />

              <p className="relative text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(188,88%,72%)", opacity: 0.8 }}>Men&apos;s Hormone Health</p>
              <div className="relative h-0.5 w-14 rounded-full mb-4" style={{ background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(216,79%,46%))" }} />
              <h3 className="relative text-xl font-black mb-3 text-white">Men&apos;s Health + TRT</h3>
              <p className="relative text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
                Low testosterone, fatigue, poor recovery, low libido — a full evaluation before deciding whether TRT or another path makes sense.
              </p>
              <div className="relative flex flex-wrap gap-2 mb-6">
                {["Low T", "Fatigue", "Low libido", "Recovery", "Brain fog"].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: "hsla(188,80%,55%,0.14)", border: "1px solid hsla(188,80%,55%,0.28)", color: "hsl(188,88%,78%)" }}>{t}</span>
                ))}
              </div>
              <div className="relative flex flex-col gap-3">
                <div className="border-t pt-5" style={{ borderColor: "hsla(188,88%,54%,0.18)" }}>
                  <p className="text-sm font-bold text-white mb-1">See what&apos;s really going on.</p>
                  <p className="text-xs leading-5 mb-4" style={{ color: "hsl(0,0%,55%)" }}>No email or commitment required.</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/hormone/mens-health/quiz"
                      className="relative z-10 rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85"
                      style={{ background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(271,74%,55%))", color: "hsl(210,32%,10%)" }}
                    >
                      Take the quiz
                    </Link>
                    <Link
                      href="/hormone/mens-health"
                      className="relative z-10 rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.14)" }}
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* GLP-1 */}
            <Link
              href="/hormone/glp1"
              className="group relative overflow-hidden rounded-3xl border p-7 hover:-translate-y-1 transition-all duration-300 block"
              style={{
                background: "linear-gradient(135deg, hsla(188,88%,54%,0.12), hsla(271,74%,55%,0.18), hsla(210,32%,14%,0.92))",
                borderColor: "hsla(271,74%,55%,0.25)",
                boxShadow: "0 24px 80px rgba(2,6,23,0.28)",
              }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                style={{ background: "radial-gradient(circle at top right, rgba(255,255,255,0.07), transparent 30%)" }} aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(271,74%,75%)", opacity: 0.8 }}>Metabolic Care</p>
              <div className="h-0.5 w-14 rounded-full mb-4" style={{ background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(271,74%,55%))" }} />
              <h3 className="text-xl font-black mb-3 text-white">GLP-1 Weight Loss</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
                Semaglutide and tirzepatide with a full metabolic review, hormone integration, and a long-term plan — not just a prescription and a refill.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Semaglutide", "Tirzepatide", "Metabolic review", "Body composition"].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: "hsla(271,70%,60%,0.14)", border: "1px solid hsla(271,70%,60%,0.28)", color: "hsl(271,74%,82%)" }}>{t}</span>
                ))}
              </div>
              <div className="inline-flex rounded-full px-5 py-2.5 text-sm font-semibold group-hover:opacity-90 transition-opacity"
                style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.16)" }}>
                Learn more →
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
