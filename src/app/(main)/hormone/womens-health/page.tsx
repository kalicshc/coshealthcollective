import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Women's Hormone Health | Colorado Springs Health Collective",
  description: "Evidence-based perimenopause and menopause care in Colorado Springs. Hormone therapy, HRT, and whole-body care for women who are tired of being dismissed.",
};

const symptomGroups = [
  {
    title: "Brain + mood",
    items: ["brain fog", "sleep disruption", "anxiety", "feeling flat", "irritability", "new attention issues"],
  },
  {
    title: "Body",
    items: ["joint pain", "fatigue", "weight changes", "muscle loss", "slower recovery", "hot flashes"],
  },
  {
    title: "Sexual + urinary",
    items: ["low libido", "dryness", "pain with sex", "recurrent UTIs", "bladder irritation", "feeling shut down"],
  },
];

const journeySteps = [
  {
    phase: "Stable years",
    title: "More predictable hormone signaling",
    text: "Cycles can still be difficult, but hormone patterns are usually more consistent and easier to map.",
  },
  {
    phase: "Perimenopause",
    title: "The chaotic transition",
    text: "Hormones do not decline in a straight line. They swing, spike, and crash. That is why symptoms can feel random and intense.",
  },
  {
    phase: "Post-menopause",
    title: "A different baseline",
    text: "This is not just aging. Estradiol and progesterone are now profoundly lower, and the body feels that shift everywhere.",
  },
];

const whatWeDo = [
  {
    title: "Look at the full hormone picture",
    text: "Estradiol, progesterone, and testosterone are discussed together instead of pretending one hormone explains everything.",
  },
  {
    title: "Take symptoms seriously",
    text: "Brain, body, sexual health, urinary symptoms, and long-term risks all belong in the conversation.",
  },
  {
    title: "Build a personalized plan",
    text: "Treatment decisions should match your stage of life, goals, history, and actual symptoms rather than a generic protocol.",
  },
  {
    title: "GLP-1 when it fits",
    text: "Weight and metabolic changes during the hormone transition are real and common. If GLP-1 therapy is the right answer for what you're experiencing, management of that is part of your care here.",
  },
];

const pricingFeatures = [
  "Full symptom review — brain fog, sleep, mood, joint pain, sexual health, urinary symptoms, and more",
  "Your goals, preferences, and what feeling better actually means for you",
  "Personal and family risk factors — cardiovascular history, cancer history, bone health, and more",
  "Lab ordering and a dedicated visit to review results together",
  "Personalized treatment options matched to your stage of life",
  "Ongoing follow-up, medication management, and adjustments once established",
];

const BOOKING_URL =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266";

export default function WomensHealthPage() {
  return (
    <div className="page-bg pt-28">
      <section className="hero-overlay relative overflow-hidden py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 14% 14%, hsla(331,95%,72%,0.16), transparent 20%), radial-gradient(circle at 88% 14%, hsla(271,74%,55%,0.14), transparent 20%), linear-gradient(180deg, rgba(20,14,28,0.1), rgba(20,14,28,0.5))",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.7), transparent 90%)",
          }}
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative z-10 max-w-3xl">
              <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-100">
                Women&apos;s Hormone Health
              </span>
              <h1
                className="mt-6 text-4xl font-bold text-white lg:text-6xl"
                style={{ textShadow: "0 10px 34px rgba(0,0,0,0.42)" }}
              >
                <span className="sr-only">Women's Hormone Therapy Colorado Springs — Perimenopause, Menopause &amp; HRT Care. </span>
                You&apos;re not imagining it.
                <span
                  className="mt-2 block"
                  style={{
                    background: "linear-gradient(135deg, hsl(340,100%,82%), hsl(281,86%,67%))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.28))",
                  }}
                >
                  You were failed.
                </span>
              </h1>
              <p
                className="mt-6 max-w-2xl text-lg leading-8 text-white"
                style={{ textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}
              >
                Women have spent years being told their symptoms are normal, stress-related, or just part of getting older. We take the opposite approach: listen closely, explain what is happening, and build a real treatment plan around it.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/hormone/womens-health/quiz"
                  className="rounded-full px-7 py-4 text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))",
                    boxShadow: "0 0 40px rgba(217,70,239,0.22)",
                  }}
                >
                  Take the Quiz
                </Link>
                <Link
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur"
                >
                  Book a Free Consult
                </Link>
              </div>
            </div>

            <div
              className="rounded-[34px] border p-6 backdrop-blur-xl lg:p-8"
              style={{
                background: "linear-gradient(180deg, hsla(294,34%,14%,0.92), hsla(244,28%,13%,0.9), hsla(210,24%,11%,0.88))",
                borderColor: "hsla(320,80%,72%,0.16)",
                boxShadow: "0 24px 80px rgba(7,10,18,0.42)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-100">
                    The Reality
                  </p>
                  <h2
                    className="mt-3 text-2xl font-bold text-white"
                    style={{ textShadow: "0 8px 24px rgba(0,0,0,0.32)" }}
                  >
                    It is rarely just one symptom
                  </h2>
                </div>
                <div className="h-14 w-14 rounded-full border border-fuchsia-300/25 bg-fuchsia-400/10" />
              </div>

              <div className="mt-8 space-y-4">
                {[
                  "Your brain can feel different before anyone mentions hormones.",
                  "Your joints, sleep, libido, urinary health, and mood can all shift together.",
                  "If nobody ever explained that, the problem was not you.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/12 bg-black/28 px-4 py-4 text-sm leading-7 text-slate-100"
                    style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div
                className="mt-8 rounded-[28px] border border-fuchsia-300/14 bg-black/24 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-100">
                  Why this feels different
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-100">
                  Because women deserve education, context, and options — not vague reassurance.
                </p>
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-100/80">
              Pricing
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Transparent women&apos;s hormone care pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              The initial consult includes a comprehensive review, lab ordering, and lab review with you. Labs and medications are billed separately.
            </p>
          </div>

          <div
            className="rounded-[34px] border p-8 lg:p-10"
            style={{
              borderColor: "hsla(331,95%,72%,0.22)",
              background: "linear-gradient(135deg, hsla(331,95%,72%,0.14), hsla(271,74%,55%,0.16), hsla(210,22%,16%,0.72))",
              boxShadow: "0 24px 80px rgba(7,10,18,0.32)",
            }}
          >
            <div className="h-0.5 w-16 rounded-full" style={{ background: "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))" }} />
            <h3 className="mt-6 text-2xl font-black text-white">Women&apos;s Hormone Care</h3>
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
              Includes a comprehensive review of symptoms across every system — brain, body, sexual health, and more — plus your goals, risk factors, preferences, and special considerations. Labs are ordered and reviewed with you. Does not include lab costs or medications.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {pricingFeatures.map((feature) => (
                <p key={feature} className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-slate-200">
                  {feature}
                </p>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <a
                href="#what-we-cover"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold transition-colors hover:bg-fuchsia-400/15"
                style={{
                  borderColor: "hsla(331,95%,72%,0.3)",
                  background: "hsla(331,95%,72%,0.08)",
                  color: "hsl(331,95%,82%)",
                  boxShadow: "0 0 18px hsla(331,95%,72%,0.15)",
                }}
              >
                Learn more
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 2v8M2.5 6.5l3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Hormone journey */}
      <section id="what-we-cover" className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-100/80">
              The Hormone Journey
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Hormones do not change the same way throughout life
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              A simple way to think about it: hormones are more predictable for years, then perimenopause becomes the chaotic transition, and menopause creates a new lower baseline. That shift is real. It affects far more than temperature regulation.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="service-card-transparent rounded-[34px] p-6 lg:p-8">
              <div
                className="relative overflow-hidden rounded-[28px] border border-white/10 p-5"
                style={{
                  height: "280px",
                  background: "linear-gradient(180deg, rgba(15,23,42,0.56), rgba(76,29,149,0.18))",
                }}
              >
                <div className="absolute inset-x-5 top-8 h-px bg-white/10" />
                <div className="absolute inset-x-5 top-1/2 h-px bg-white/10" />
                <div className="absolute inset-x-5 bottom-10 h-px bg-white/10" />

                <svg viewBox="0 0 600 220" className="absolute inset-0 h-full w-full">
                  <path
                    d="M20 120 C60 84, 96 82, 130 110 S200 154, 238 116 S304 78, 340 112"
                    fill="none"
                    stroke="hsla(188,88%,54%,0.9)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M340 112 C360 48, 380 180, 402 82 S450 190, 470 60 S520 176, 548 118"
                    fill="none"
                    stroke="hsla(331,95%,72%,0.95)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M548 118 C564 146, 578 154, 590 156"
                    fill="none"
                    stroke="hsla(271,74%,55%,0.9)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute bottom-5 left-5 right-5 grid gap-3 text-sm sm:grid-cols-3">
                  <div className="rounded-2xl border border-cyan-300/15 bg-slate-950/35 p-3">
                    <p className="font-semibold text-cyan-200">Stable</p>
                    <p className="mt-1 leading-6 text-slate-300">More consistent signaling</p>
                  </div>
                  <div className="rounded-2xl border border-fuchsia-300/15 bg-slate-950/35 p-3">
                    <p className="font-semibold text-fuchsia-100">Chaos</p>
                    <p className="mt-1 leading-6 text-slate-300">Sharp swings and crashes</p>
                  </div>
                  <div className="rounded-2xl border border-purple-300/15 bg-slate-950/35 p-3">
                    <p className="font-semibold text-purple-200">Lower baseline</p>
                    <p className="mt-1 leading-6 text-slate-300">A real physiologic shift</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {journeySteps.map((step) => (
                <div key={step.phase} className="service-card-transparent rounded-[28px] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-100/75">{step.phase}</p>
                  <h3 className="mt-3 text-2xl font-bold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Symptom groups */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-100/80">
                It&apos;s Not Just Hot Flashes
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
                The full-body picture is why so many women feel missed
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                Most women were never told how many symptoms can connect back to changing hormones. Seeing the whole pattern can be validating on its own.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {symptomGroups.map((group) => (
                <div key={group.title} className="service-card-transparent rounded-[28px] p-6">
                  <h3 className="text-xl font-bold text-white">{group.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                      >
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

      {/* Testosterone in women */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="service-card-transparent rounded-[34px] p-8 lg:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-100/80">
                The Forgotten Hormone
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
                Testosterone matters in women too
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                This is one of the biggest gaps in women&apos;s care. Testosterone affects libido, motivation, energy, and sexual function, yet many women are never told it belongs in the conversation at all.
              </p>
            </div>

            <div
              className="rounded-[34px] border p-8 lg:p-10"
              style={{
                borderColor: "hsla(331,95%,72%,0.2)",
                background: "linear-gradient(135deg, hsla(331,95%,72%,0.15), hsla(271,74%,55%,0.18), hsla(188,88%,54%,0.12))",
              }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-100/90">
                Key Point
              </p>
              <div className="mt-6 text-5xl font-bold leading-none text-white lg:text-6xl">10x</div>
              <p className="mt-4 max-w-xl text-xl font-semibold text-white">
                Women produce far more testosterone than estradiol when measured on the same scale.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">
                That does not mean every woman needs testosterone therapy. It means the hormone should not be ignored or treated like it only matters in men.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-100/80">
                What We Do Differently
              </p>
              <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
                Education first. Personalization second. No minimizing.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                A good plan starts with clarity. That means explaining where symptoms may fit, where they may not, and which options make sense for your stage of life and goals.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {whatWeDo.map((item) => (
                <div key={item.title} className="service-card-transparent rounded-[28px] p-6">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div
            className="rounded-[36px] border p-8 text-center lg:p-12"
            style={{
              borderColor: "hsla(331,95%,72%,0.2)",
              background: "linear-gradient(135deg, hsla(331,95%,72%,0.16), hsla(271,74%,55%,0.16), hsla(210,22%,22%,0.52))",
            }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-100/80">
              Start Here
            </p>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Women deserve a clinic that takes this seriously
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">
              If you feel like something has shifted and nobody has put the pieces together clearly, that is exactly where this conversation should begin.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/hormone/womens-health/quiz"
                className="rounded-full px-7 py-4 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))" }}
              >
                Take the Free Quiz
              </Link>
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
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
