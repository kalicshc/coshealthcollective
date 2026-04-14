import type { Metadata } from "next";
import Link from "next/link";

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
        className="hero-overlay relative overflow-hidden pt-28 pb-16 lg:pt-24 lg:pb-12 xl:pt-28 xl:pb-14"
        style={{ background: "linear-gradient(180deg, hsla(210,32%,11%,0.7), hsla(210,32%,12%,0.56))" }}
      >
        {/* Radial color glows */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 14% 14%, hsla(331,95%,72%,0.16), transparent 22%), radial-gradient(circle at 88% 14%, hsla(271,74%,55%,0.14), transparent 22%), radial-gradient(circle at 50% 110%, hsla(188,88%,54%,0.08), transparent 28%)",
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

        <div className="container mx-auto px-5 lg:px-8 max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
            {/* Left: headline + CTAs */}
            <div className="relative z-10">
              {/* Brand badge */}
              <div
                className="relative mb-6 max-w-sm overflow-hidden rounded-2xl border px-5 py-4 lg:mb-5 lg:max-w-xs lg:px-4 lg:py-3 xl:max-w-sm xl:px-5 xl:py-4"
                style={{
                  borderColor: "hsla(255,255%,255%,0.1)",
                  background: "linear-gradient(180deg, hsla(215,30%,16%,0.92), hsla(215,28%,13%,0.88))",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="flex items-center gap-4 lg:gap-3 xl:gap-4">
                  <div
                    className="relative flex h-16 w-16 items-center justify-center rounded-xl border flex-shrink-0 lg:h-12 lg:w-12 xl:h-16 xl:w-16"
                    style={{
                      borderColor: "hsla(331,80%,65%,0.2)",
                      background: "radial-gradient(circle at 30% 25%, hsla(331,80%,72%,0.14), transparent 40%), linear-gradient(180deg, hsla(215,30%,20%,0.95), hsla(220,28%,14%,0.9))",
                    }}
                  >
                    <img src="/logo-main.png" alt="CSHC" className="h-10 w-10 object-contain lg:h-8 lg:w-8 xl:h-10 xl:w-10" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest lg:text-[10px] xl:text-xs" style={{ color: "hsl(210,25%,68%)", letterSpacing: 0 }}>
                      Colorado Springs Health Collective
                    </p>
                    <p
                      className="mt-1 text-xl font-semibold leading-none lg:text-lg xl:text-xl"
                      style={{
                        background: "linear-gradient(135deg, hsl(331,100%,78%), hsl(271,86%,70%))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Hormone Clinic
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <img
                        src="/perry-academy-perimenopause-certificate.svg"
                        alt="Perry Academy Perimenopause Certificate"
                        className="h-14 w-14 object-contain lg:h-10 lg:w-10 xl:h-14 xl:w-14"
                        style={{ filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.32))" }}
                      />
                      <div>
                        <p className="text-sm font-semibold leading-none lg:text-xs xl:text-sm" style={{ color: "hsl(0,0%,92%)" }}>
                          Perry Academy
                        </p>
                        <p className="mt-1 text-xs font-bold uppercase lg:text-[10px] xl:text-xs" style={{ color: "hsl(331,95%,84%)", letterSpacing: 0 }}>
                          Pending
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h1
                className="max-w-4xl text-4xl font-bold leading-tight lg:text-[3.15rem] lg:leading-[1.08] xl:text-[3.8rem]"
                style={{ color: "hsl(0,0%,100%)", textShadow: "0 10px 34px rgba(0,0,0,0.42)" }}
              >
                Dedicated to
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

              <p className="mt-6 max-w-xl text-lg leading-relaxed lg:mt-4 lg:text-base xl:mt-5 xl:text-lg" style={{ color: "hsl(210,25%,75%)", textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}>
                You&apos;ve been told to live with it. You don&apos;t have to.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-relaxed lg:mt-3 lg:max-w-xl lg:text-sm lg:leading-6 xl:max-w-2xl xl:text-base xl:leading-relaxed" style={{ color: "hsl(210,22%,68%)", textShadow: "0 4px 16px rgba(0,0,0,0.32)" }}>
                Evidence-informed hormone care for women who are tired of being dismissed, told everything is normal, or treated like hot flashes are the whole story. Men&apos;s TRT and GLP-1 support too.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 lg:mt-4 lg:gap-1.5 xl:mt-5 xl:gap-2">
                {symptomChips.map((symptom) => (
                  <span
                    key={symptom}
                    className="rounded-full border px-4 py-2 text-xs font-medium lg:px-3 lg:py-1.5 xl:px-4 xl:py-2"
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

              <div className="mt-10 flex flex-col gap-4 sm:flex-row lg:mt-6 lg:gap-3 xl:mt-8">
                <Link
                  href="/hormone/womens-health"
                  className="px-7 py-4 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity lg:px-6 lg:py-3 xl:px-7 xl:py-4"
                  style={{
                    background: "linear-gradient(135deg, hsl(331,95%,65%), hsl(271,74%,52%))",
                    boxShadow: "0 0 40px hsla(331,80%,60%,0.3)",
                  }}
                >
                  See How We Can Help
                </Link>
                <a
                  href="https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-4 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors lg:px-6 lg:py-3 xl:px-7 xl:py-4"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", color: "hsl(0,0%,88%)" }}
                >
                  Ask Questions
                </a>
              </div>
            </div>

            {/* Right: care flow */}
            <div
              className="rounded-3xl border p-6 lg:p-5 xl:p-7"
              style={{
                background: "linear-gradient(180deg, hsla(294,34%,14%,0.92), hsla(244,28%,13%,0.9), hsla(210,24%,11%,0.88))",
                borderColor: "hsla(320,80%,72%,0.16)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 24px 80px rgba(7,10,18,0.42)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(331,95%,78%)" }}>
                Your Path Forward
              </p>
              <h2 className="text-xl font-bold mb-6 lg:mb-4" style={{ color: "hsl(0,0%,100%)" }}>
                Care that actually moves.
              </h2>

              <div className="flex flex-col gap-4 lg:gap-3">
                {careFlow.map((item, index) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-black lg:h-8 lg:w-8 xl:h-10 xl:w-10"
                        style={{
                          background: item.gradient,
                          color: "hsl(210,32%,10%)",
                          boxShadow: "0 0 28px hsla(331,80%,60%,0.22)",
                        }}
                      >
                        {item.step}
                      </div>
                      {index < careFlow.length - 1 ? (
                        <div
                          className="mt-2 w-px flex-1"
                          style={{ minHeight: "20px", background: "linear-gradient(180deg, hsla(331,80%,70%,0.42), hsla(188,88%,60%,0.18))" }}
                        />
                      ) : null}
                    </div>
                    <div
                      className="flex-1 rounded-2xl border p-4 lg:p-3 xl:p-4"
                      style={{ background: "rgba(0,0,0,0.26)", borderColor: "rgba(255,255,255,0.1)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
                    >
                      <h3 className="text-sm font-bold" style={{ color: "hsl(0,0%,96%)" }}>{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed lg:text-xs lg:leading-5 xl:text-sm xl:leading-relaxed" style={{ color: "hsl(210,18%,72%)" }}>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm leading-relaxed lg:mt-4 lg:text-xs xl:text-sm" style={{ color: "hsl(0,0%,82%)" }}>
                Clear next steps, thoughtful follow-up, and care that adjusts with you.
              </p>
            </div>
          </div>
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
          <div className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Men's Health */}
            <div
              className="relative overflow-hidden rounded-3xl border p-7"
              style={{
                background: "linear-gradient(135deg, hsla(188,88%,54%,0.16), hsla(216,79%,46%,0.2), hsla(210,32%,14%,0.92))",
                borderColor: "hsla(188,88%,54%,0.28)",
                boxShadow: "0 24px 80px rgba(2,6,23,0.28)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(188,88%,72%)", opacity: 0.8 }}>Men&apos;s Hormone Health</p>
              <div className="h-0.5 w-14 rounded-full mb-4" style={{ background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(216,79%,46%))" }} />
              <h3 className="text-xl font-black mb-3 text-white">Men&apos;s Health + TRT</h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.75)" }}>
                Low testosterone, fatigue, poor recovery, low libido — a full evaluation before deciding whether TRT or another path makes sense.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Low T", "Fatigue", "Low libido", "Recovery", "Brain fog"].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: "hsla(188,80%,55%,0.14)", border: "1px solid hsla(188,80%,55%,0.28)", color: "hsl(188,88%,78%)" }}>{t}</span>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <div className="border-t pt-5" style={{ borderColor: "hsla(188,88%,54%,0.18)" }}>
                  <p className="text-sm font-bold text-white mb-1">See what&apos;s really going on.</p>
                  <p className="text-xs leading-5 mb-4" style={{ color: "hsl(0,0%,55%)" }}>No email or commitment required.</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/hormone/mens-health/quiz"
                      className="rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85"
                      style={{ background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(271,74%,55%))", color: "hsl(210,32%,10%)" }}
                    >
                      Take the quiz
                    </Link>
                    <Link
                      href="/hormone/mens-health"
                      className="rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-80"
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
