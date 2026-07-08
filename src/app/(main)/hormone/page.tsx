import type { Metadata } from "next";
import Link from "next/link";
import { clinicFacts, usd } from "@/lib/clinicFacts";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { bookingUrl } from "@/lib/bookingLinks";
import { CredentialHero } from "@/components/CredentialHero";
import { ReviewStrip } from "@/components/ReviewStrip";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { SceneSection, SCENE_H, SCENE_P } from "@/components/SceneSection";
import { RatingChip } from "@/components/ReviewStrip";
import { JourneyCurve } from "@/components/JourneyCurve";
import { CriticalWindowTimeline } from "@/components/CriticalWindowTimeline";

export const metadata: Metadata = {
  alternates: { canonical: "/hormone" },
  title: "Hormone + Metabolic Care | Colorado Springs Health Collective",
  description: "Evidence-based hormone care for women and men in Colorado Springs. HRT, TRT, GLP-1, perimenopause, menopause, and metabolic health — all in one care pathway.",
};

const BOOKING_URL =
  bookingUrl("freeConsult", "hormone");

const womensChips = ["Brain fog", "Low libido", "Mood changes", "Fatigue", "Sleep disruption"];
const mensChips = ["Low T", "Fatigue", "Low libido", "Recovery"];
const glpChips = ["Semaglutide", "Tirzepatide", "Metabolic review", "Body comp"];

// Education content — originally designed for the standalone women's health
// education page; lives here as the hub's lower half.
const journeySteps = [
  { phase: "Stable years", title: "More predictable hormone signaling", text: "Cycles can still be difficult, but hormone patterns are usually more consistent and easier to map." },
  { phase: "Perimenopause", title: "The chaotic transition", text: "Hormones do not decline in a straight line. They swing, spike, and crash. That is why symptoms can feel random and intense." },
  { phase: "Post-menopause", title: "A different baseline", text: "This is not just aging. Estradiol and progesterone are now profoundly lower, and the body feels that shift everywhere." },
];

const symptomGroups = [
  { title: "Brain + mood", items: ["brain fog", "sleep disruption", "anxiety", "feeling flat", "irritability", "new attention issues"] },
  { title: "Body", items: ["joint pain", "fatigue", "weight changes", "muscle loss", "slower recovery", "hot flashes"] },
  { title: "Sexual + urinary", items: ["low libido", "dryness", "pain with sex", "recurrent UTIs", "bladder irritation", "feeling shut down"] },
];

// What's at stake in the critical window (mirrors the women's story page)
const stakes = [
  { label: "Bone", text: "Estrogen guards your skeleton — once it's gone, bone loss accelerates and fractures climb." },
  { label: "Muscle", text: "It helps you hold onto muscle and strength — the foundation of staying independent." },
  { label: "Heart", text: "Heart disease is the #1 killer of postmenopausal women — more than every cancer combined." },
  { label: "Brain", text: "It fuels focus, memory, and mood." },
  { label: "Metabolism", text: "It holds the line on blood sugar and visceral fat." },
];


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
      {/* ── 1. CINEMATIC HERO — one clean screen, then sections ──────── */}
      <SceneSection
        image="/images/hormone/journey-backdrop.webp"
        scrim="radial"
        minHeight="100svh"
        priority
        contentClassName="text-center"
        scrollCue="#clinics"
      >
        <div className="pt-16">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span
              className="rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ borderColor: "hsla(331,80%,72%,0.32)", background: "hsla(294,34%,14%,0.55)", color: "hsl(331,95%,84%)", backdropFilter: "blur(8px)" }}
            >
              Hormone &amp; Metabolic Care
            </span>
            <RatingChip service="hormone" source="hormone-hub-hero" />
          </div>
          <h1
            className="mt-8 text-4xl font-bold text-white lg:text-6xl"
            style={{ textShadow: "0 10px 34px rgba(0,0,0,0.42)", lineHeight: 1.1 }}
          >
            <span className="sr-only">Hormone Therapy Colorado Springs — HRT, Perimenopause, Menopause, TRT &amp; GLP-1 Weight Loss. </span>
            <span aria-hidden="true">One clinic.</span>
            <span
              aria-hidden="true"
              className="mt-2 block"
              style={{
                background: "linear-gradient(135deg, hsl(340,100%,82%), hsl(281,86%,67%), hsl(189,100%,70%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.28))",
              }}
            >
              Your whole hormonal picture.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/95" style={{ textShadow: "0 2px 14px rgba(0,0,0,0.8)" }}>
            Women&apos;s hormone care, men&apos;s TRT, and GLP-1 weight loss — hormones, metabolic health,
            and lifestyle treated together, not in silos.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <TrackedLink
              href={bookingUrl("freeConsult", "hormone-hub-hero")}
              analytics={{ page: "hormone", source: "hormone-hub-hero", service: "hormone", appt: "freeConsult", label: "Book a Free Consult" }}
              className="rounded-full px-9 py-4 text-base font-bold text-white hover:opacity-85 transition-opacity"
              style={{ background: "linear-gradient(135deg, hsl(331,95%,65%), hsl(271,74%,52%))", boxShadow: "0 12px 36px hsla(331,80%,55%,0.35)" }}
            >
              Book a Free Consult
            </TrackedLink>
            <TrackedLink
              href="#clinics"
              event="cta_click"
              analytics={{ page: "hormone", source: "hormone-hub-hero", service: "hormone", label: "Explore the clinics" }}
              className="rounded-full px-9 py-4 text-base font-semibold hover:opacity-85 transition-opacity"
              style={{ border: "1px solid hsla(331,80%,72%,0.45)", color: "hsl(331,95%,82%)", background: "hsla(222,45%,8%,0.5)", backdropFilter: "blur(8px)" }}
            >
              Explore the clinics ↓
            </TrackedLink>
          </div>
          <div className="mt-9 flex justify-center">
            <CredentialHero size="chip" />
          </div>
        </div>
      </SceneSection>

      {/* ── 2. THE THREE CLINICS — full panes, each its own moment ───── */}
      <div id="clinics" className="container mx-auto px-4 lg:px-6 max-w-6xl scroll-mt-20 py-14 lg:py-20">

        {/* ── WOMEN'S HEALTH PANE (top, slightly smaller) ── */}
        <section
          className="relative overflow-hidden rounded-3xl border p-5 lg:p-7"
          style={{
            background: "hsla(222,45%,8%,0.72)",
            backdropFilter: "blur(10px)",
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

            <h2
              className="mt-2 text-2xl font-bold leading-[1.05] lg:text-4xl"
              style={{ color: "hsl(0,0%,100%)", textShadow: "0 10px 34px rgba(0,0,0,0.42)" }}
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
                Women&apos;s Health
              </span>
            </h2>

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
              <TrackedLink
                href={bookingUrl("freeConsult", "hormone-hub-womens")}
                analytics={{ page: "hormone", source: "hormone-hub-womens", service: "hormone", appt: "freeConsult", label: "Free Consult" }}
                className="pointer-events-auto relative z-10 px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "hsl(0,0%,100%)", color: "hsl(294,40%,12%)" }}
              >
                Free Consult
              </TrackedLink>
              <TrackedLink
                href="/hormone/womens-health"
                event="cta_click"
                analytics={{ page: "hormone", source: "hormone-hub-womens", service: "hormone", label: "Learn More" }}
                className="pointer-events-auto relative z-10 px-5 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, hsl(331,95%,65%), hsl(271,74%,52%))" }}
              >
                Learn More
              </TrackedLink>
              <TrackedLink
                href="/hormone/womens-health/quiz"
                event="cta_click"
                analytics={{ page: "hormone", source: "hormone-hub-womens", service: "hormone", label: "Take the Quiz" }}
                className="pointer-events-auto relative z-10 px-5 py-2.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                Take the Quiz
              </TrackedLink>
            </div>

            <PriceStrip />

            <div className="mt-5 flex justify-center">
              <CredentialHero size="chip" />
            </div>
          </div>
        </section>

        {/* ── TRT + GLP-1 PANES (matching design, side by side) ── */}
        <div className="mt-5 grid gap-5 md:grid-cols-2">

          {/* GLP-1 (left) */}
          <section
            className="relative overflow-hidden rounded-3xl border p-6 lg:p-7"
            style={{
              background: "hsla(222,45%,8%,0.72)",
              backdropFilter: "blur(10px)",
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
                <TrackedLink
                  href={bookingUrl("freeConsult", "hormone-hub-glp1")}
                  analytics={{ page: "hormone", source: "hormone-hub-glp1", service: "hormone", appt: "freeConsult", label: "Free Consult" }}
                  className="pointer-events-auto relative z-10 px-4 py-2 rounded-full text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "hsl(0,0%,100%)", color: "hsl(244,40%,12%)" }}
                >
                  Free Consult
                </TrackedLink>
                <TrackedLink
                  href="/hormone/glp1"
                  event="cta_click"
                  analytics={{ page: "hormone", source: "hormone-hub-glp1", service: "hormone", label: "Learn More" }}
                  className="pointer-events-auto relative z-10 px-4 py-2 rounded-full text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, hsl(271,74%,55%), hsl(188,88%,54%))" }}
                >
                  Learn More
                </TrackedLink>
              </div>
            </div>
          </section>

          {/* Men's TRT (right) */}
          <section
            className="relative overflow-hidden rounded-3xl border p-6 lg:p-7"
            style={{
              background: "hsla(222,45%,8%,0.72)",
              backdropFilter: "blur(10px)",
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
                <TrackedLink
                  href={bookingUrl("freeConsult", "hormone-hub-mens")}
                  analytics={{ page: "hormone", source: "hormone-hub-mens", service: "hormone", appt: "freeConsult", label: "Free Consult" }}
                  className="pointer-events-auto relative z-10 px-4 py-2 rounded-full text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "hsl(0,0%,100%)", color: "hsl(210,32%,10%)" }}
                >
                  Free Consult
                </TrackedLink>
                <TrackedLink
                  href="/hormone/mens-health"
                  event="cta_click"
                  analytics={{ page: "hormone", source: "hormone-hub-mens", service: "hormone", label: "Learn More" }}
                  className="pointer-events-auto relative z-10 px-4 py-2 rounded-full text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ background: "linear-gradient(135deg, hsl(188,88%,54%), hsl(216,79%,46%))" }}
                >
                  Learn More
                </TrackedLink>
                <TrackedLink
                  href="/hormone/mens-health/quiz"
                  event="cta_click"
                  analytics={{ page: "hormone", source: "hormone-hub-mens", service: "hormone", label: "Take the Quiz" }}
                  className="pointer-events-auto relative z-10 px-4 py-2 rounded-full text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)" }}
                >
                  Take the Quiz
                </TrackedLink>
              </div>
            </div>
          </section>

        </div>

      </div>

      {/* ── 3. THE EDUCATION — journey, symptoms, testosterone, WHI ──── */}

      {/* The Hormone Journey — photo scene with the animated curve */}
      <SceneSection image="/images/hormone/journey-v2.webp" scrim="side" minHeight="88vh">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-100/80">The Hormone Journey</p>
        <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
          Your hormones don&apos;t fade quietly. They lurch.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
          Your ovaries wind down unevenly. Progesterone — your calm, sleep hormone — usually drops first. So
          the first sign often isn&apos;t a hot flash. It&apos;s anxiety and 2 a.m. wake-ups.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <JourneyCurve />
          </div>
          <div className="space-y-4">
            {journeySteps.map((step) => (
              <div key={step.phase} className="rounded-[20px] border border-white/10 bg-slate-950/70 p-5" style={{ backdropFilter: "blur(8px)" }}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-100/75">{step.phase}</p>
                <h3 className="mt-2 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </SceneSection>

      {/* It's Not Just Hot Flashes — symptom grid */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-100/80">
                It&apos;s Not Just Hot Flashes
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
                The full-body picture is why so many women feel missed
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                Most women were never told how many symptoms can connect back to changing hormones. Seeing the
                whole pattern can be validating on its own, because it finally gives the experience a structure.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {symptomGroups.map((group) => (
                <div key={group.title} className="service-card-transparent rounded-[28px] p-6">
                  <h3 className="text-xl font-bold text-white">{group.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Critical Window — timeline + what's at stake (from the women's story) */}
      <SceneSection image="/images/hormone/window-backdrop-v2.webp" scrim="side" minHeight="88vh">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-100/80">The whole idea in one line</p>
        <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
          There&apos;s a critical window — and it closes sooner than you think.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
          From your 40s to roughly 5–10 years after your last period, your body is still responsive to
          estrogen — bones stay healthy, arteries stay flexible, the brain still uses estrogen the way
          it&apos;s meant to. <strong className="text-white">This is the window where you shape the next 30
          years.</strong>
        </p>
        <div className="mt-10">
          <CriticalWindowTimeline />
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stakes.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4" style={{ backdropFilter: "blur(8px)" }}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-100/75">{s.label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{s.text}</p>
            </div>
          ))}
        </div>
      </SceneSection>

      {/* ── 4. Social proof ───────────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <ReviewStrip variant="strip" service="hormone" source="hormone-hub-reviews" />
        </div>
      </section>
      <PageCtaFooter
        service="hormone"
        heading="Not sure which path fits?"
        body="Book a free consult, or reach out — we'll point you to the right starting place."
        primaryCta={{ label: "Book a Free Consult", href: BOOKING_URL, external: true }}
      />
    </div>
  );
}
