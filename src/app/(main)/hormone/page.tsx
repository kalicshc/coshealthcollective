import type { Metadata } from "next";
import Image from "next/image";
import { clinicFacts, usd } from "@/lib/clinicFacts";
import { CredentialHero } from "@/components/CredentialHero";
import { ReviewStrip, RatingChip } from "@/components/ReviewStrip";
import { CoPrimaryCtas } from "@/components/CoPrimaryCtas";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { JourneyCurve } from "@/components/JourneyCurve";
import { CriticalWindowTimeline } from "@/components/CriticalWindowTimeline";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { SectionView } from "@/components/analytics/SectionView";
import { Accordion } from "@/components/Accordion";
import { SimplePricing } from "@/components/SimplePricing";
import { serviceSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

// THE hormone page. Women's hormone health is the flagship and IS this page —
// the full "epic page" conversion arc (validation → proof → objection-killing
// → action) lives here at /hormone. Men's TRT and GLP-1 are separate
// sub-pages, offered as doors right after the hero (plus the hero's top-right
// pills) so those visitors self-select out early. The old standalone
// /hormone/womens-health page redirects here (see next.config.ts).
// Copy sources: the Critical Window deck ((kiosk)/critical-window/
// deckContent.ts) + clinic content. Accents from ACCENTS.hormone.

export const metadata: Metadata = {
  alternates: { canonical: "/hormone" },
  title: "Hormone Care — HRT, Menopause, TRT & GLP-1",
  description: "Evidence-based hormone care in Colorado Springs. Women's HRT for perimenopause and menopause is our flagship — plus men's TRT and GLP-1 weight loss, all in one clinic.",
  openGraph: {
    images: [{ url: "/images/hormone/womens-hero.webp", alt: "Hormone Care — Colorado Springs Health Collective" }],
  },
};

const hormoneSchema = serviceSchema({
  type: "MedicalTherapy",
  name: "Hormone & Metabolic Care — HRT, Menopause, TRT & GLP-1",
  description: "Evidence-based hormone care in Colorado Springs. Women's HRT for perimenopause and menopause is our flagship — plus men's TRT and GLP-1 weight loss, all in one clinic.",
  path: "/hormone",
  image: "/images/hormone/womens-hero.webp",
  offers: [
    { name: "One-time enrollment fee", price: clinicFacts.enrollmentFee },
    { name: "Hormone care membership (per month)", price: clinicFacts.hormone.monthlyManagement },
    { name: "DPC + hormone combo membership (per month)", price: clinicFacts.combo.monthly },
  ],
});

const PAGE = "hormone";

const symptomGroups = [
  { title: "Brain + mood", items: ["brain fog", "sleep disruption", "anxiety", "feeling flat", "irritability", "new attention issues"] },
  { title: "Body", items: ["joint pain", "fatigue", "weight changes", "muscle loss", "slower recovery", "hot flashes"] },
  { title: "Sexual + urinary", items: ["low libido", "dryness", "pain with sex", "recurrent UTIs", "bladder irritation", "feeling shut down"] },
];

// Deck s08 — the dismissal table
const dismissalRows: [string, string][] = [
  ["“I don’t feel like myself”", "Depression"],
  ["Can’t sleep, up at 2 a.m.", "Insomnia"],
  ["Brain fog, losing words", "Just getting older"],
  ["Weight creeping on, same habits", "“Eat less, move more”"],
  ["Libido’s gone", "Stress"],
];

// Deck s09 — what's actually at stake
const stakes = [
  { label: "Bone", text: "Estrogen guards your skeleton — once it's gone, bone loss accelerates and fractures climb." },
  { label: "Muscle", text: "It helps you hold onto muscle and strength — the foundation of staying independent." },
  { label: "Heart", text: "Heart disease is the #1 killer of postmenopausal women — more than every cancer combined." },
  { label: "Brain", text: "It fuels focus, memory, and mood." },
  { label: "Metabolism", text: "It holds the line on blood sugar and visceral fat." },
];

const journeySteps = [
  { phase: "Stable years", title: "More predictable hormone signaling", text: "Cycles can still be difficult, but hormone patterns are usually more consistent and easier to map." },
  { phase: "Perimenopause", title: "The chaotic transition", text: "Hormones do not decline in a straight line. They swing, spike, and crash. That is why symptoms can feel random and intense." },
  { phase: "Post-menopause", title: "A different baseline", text: "This is not just aging. Estradiol and progesterone are now profoundly lower, and the body feels that shift everywhere." },
];


// Objection-handling FAQ — sources: deck s02/s03 (WHI + ELITE), s20 (HRT in
// 2026), s13 (stepwise, per The Menopause Society & ACOG), s04 (the window).
const faqs = [
  {
    id: "hrt-dangerous",
    question: "Isn't HRT dangerous? I heard it causes breast cancer.",
    answer: (
      <div className="space-y-3">
        <p>
          That fear traces to one study — the Women&apos;s Health Initiative, 2002. The study wasn&apos;t wrong;
          how we interpreted it was. The average woman studied was <strong className="text-white">63 — over a decade
          past menopause</strong> — and she was given an older synthetic formulation, started too late, in a body
          where a fundamental physiologic shift had already occurred. Then that result was applied to every
          50-year-old in America.
        </p>
        <p>
          Flip the timing and the picture changes: a 2016 randomized trial (ELITE) found that starting estradiol{" "}
          <em>early</em> actually slowed artery disease. Same drug, opposite result — the only thing that changed
          was timing. In November 2025, the FDA removed the boxed warnings from menopausal hormone therapy.
        </p>
      </div>
    ),
  },
  {
    id: "options-2026",
    question: "What are my options in 2026 — and are they all equal?",
    answer: (
      <div className="space-y-3">
        <p>No. The differences matter, and we&apos;ll walk through them with you:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider" style={{ color: "hsl(331,95%,78%)" }}>
                <th className="py-2 pr-4 font-bold">Option</th>
                <th className="py-2 font-bold">What you should know</th>
              </tr>
            </thead>
            <tbody className="align-top">
              {[
                ["Transdermal estradiol (patch / gel)", "No demonstrated clot risk. The modern default."],
                ["Oral estradiol", "Higher clot risk than transdermal."],
                ["Micronized progesterone (bioidentical)", "Better safety profile than synthetics. Also aids sleep."],
                ["Synthetic progestins", "The old WHI formulation. Worse profile."],
                ["Pellets", "Can't titrate, can't reverse quickly. Be cautious."],
                ["Fezolinetant (Veozah)", "Non-hormonal. Targets the brain mechanism of hot flashes."],
              ].map(([opt, note]) => (
                <tr key={opt} className="border-t border-white/10">
                  <td className="py-2.5 pr-4 font-semibold text-white">{opt}</td>
                  <td className="py-2.5">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: "do-i-need-hrt",
    question: "Do I have to take hormones?",
    answer: (
      <div className="space-y-3">
        <p>
          No — and we won&apos;t push them. We follow the stepwise approach recommended by The Menopause Society
          and ACOG: <strong className="text-white">lifestyle is the foundation for every woman</strong>, with or
          without hormones. Mild symptoms often respond to lifestyle alone. For bothersome symptoms in the window
          (under 60, within 10 years of your last period), HRT is appropriate and effective — roughly 75% fewer
          hot flashes — paired with lifestyle, not instead of it.
        </p>
        <p>
          If HRT is contraindicated for you (breast cancer, clots, stroke history), there are real non-hormonal
          options, and vaginal estrogen is often still fine. HRT is a tool for symptoms, not a vitamin.
        </p>
      </div>
    ),
  },
  {
    id: "too-late",
    question: "Am I too late? My last period was years ago.",
    answer: (
      <p>
        It depends where you are — and that&apos;s exactly what the consult sorts out. Within roughly 10 years of
        your last period and under 60, systemic HRT generally remains on the table. Beyond that, starting systemic
        hormones carries more risk and lifestyle becomes the primary intervention — but symptoms like dryness,
        pain with sex, and recurrent UTIs can still be treated effectively (often with local vaginal estrogen) at
        nearly any age. Too late for one tool is not too late for help.
      </p>
    ),
  },
  {
    id: "testosterone-women",
    question: "Is testosterone really part of women's care?",
    answer: (
      <p>
        Yes — it&apos;s one of the biggest gaps in women&apos;s medicine. Measured on the same scale, women produce
        far more testosterone than estradiol, and it affects libido, motivation, energy, and sexual function. That
        doesn&apos;t mean every woman needs testosterone therapy — it means the hormone belongs in the conversation
        instead of being treated like it only matters in men.
      </p>
    ),
  },
  {
    id: "first-visit",
    question: "What actually happens at the free consult?",
    answer: (
      <p>
        A real conversation — no commitment, no pressure. We listen to your story, explain where your symptoms may
        fit (and where they may not), and lay out what a workup would look like: which labs, what they cost, and
        which treatment paths make sense for your stage of life. You leave with clarity either way.
      </p>
    ),
  },
];

// Plain-text mirror of the `faqs` accordion above for the FAQPage schema —
// the JSX answers can't be serialized, so keep these in sync with the copy.
const hormoneFaqSchema = faqSchema([
  {
    question: "Isn't HRT dangerous? I heard it causes breast cancer.",
    answer:
      "That fear traces to one study — the Women's Health Initiative, 2002. The average woman studied was 63, over a decade past menopause, given an older synthetic formulation started too late — and that result was applied to every 50-year-old in America. Flip the timing and the picture changes: a 2016 randomized trial (ELITE) found that starting estradiol early actually slowed artery disease. In November 2025, the FDA removed the boxed warnings from menopausal hormone therapy.",
  },
  {
    question: "What are my options in 2026 — and are they all equal?",
    answer:
      "No — the differences matter. Transdermal estradiol (patch or gel) has no demonstrated clot risk and is the modern default. Oral estradiol carries a higher clot risk than transdermal. Micronized (bioidentical) progesterone has a better safety profile than synthetic progestins and also aids sleep. Pellets can't be titrated or reversed quickly — be cautious. Fezolinetant (Veozah) is a non-hormonal option that targets the brain mechanism of hot flashes. We walk through the differences with you.",
  },
  {
    question: "Do I have to take hormones?",
    answer:
      "No — and we won't push them. We follow the stepwise approach recommended by The Menopause Society and ACOG: lifestyle is the foundation for every woman, with or without hormones. Mild symptoms often respond to lifestyle alone. For bothersome symptoms in the window (under 60, within 10 years of your last period), HRT is appropriate and effective — roughly 75% fewer hot flashes — paired with lifestyle, not instead of it. If HRT is contraindicated for you, there are real non-hormonal options, and vaginal estrogen is often still fine.",
  },
  {
    question: "Am I too late? My last period was years ago.",
    answer:
      "It depends where you are — and that's exactly what the consult sorts out. Within roughly 10 years of your last period and under 60, systemic HRT generally remains on the table. Beyond that, starting systemic hormones carries more risk and lifestyle becomes the primary intervention — but symptoms like dryness, pain with sex, and recurrent UTIs can still be treated effectively (often with local vaginal estrogen) at nearly any age. Too late for one tool is not too late for help.",
  },
  {
    question: "Is testosterone really part of women's care?",
    answer:
      "Yes — it's one of the biggest gaps in women's medicine. Measured on the same scale, women produce far more testosterone than estradiol, and it affects libido, motivation, energy, and sexual function. That doesn't mean every woman needs testosterone therapy — it means the hormone belongs in the conversation instead of being treated like it only matters in men.",
  },
  {
    question: "What actually happens at the free consult?",
    answer:
      "A real conversation — no commitment, no pressure. We listen to your story, explain where your symptoms may fit (and where they may not), and lay out what a workup would look like: which labs, what they cost, and which treatment paths make sense for your stage of life. You leave with clarity either way.",
  },
]);

const fuchsia = "hsl(331,95%,72%)";

// Homepage-grade text shadows for words sitting directly on photos
// (recipe from PhotoFlythrough.tsx).
const SCENE_H = "0 2px 6px rgba(0,0,0,0.6), 0 8px 40px rgba(0,0,0,0.7)";
const SCENE_P = "0 2px 14px rgba(0,0,0,0.8)";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-100/80">{children}</p>
  );
}

// The two secondary clinics — compact doors below the hero so men and GLP-1
// visitors find their page fast, without diluting the women-first story.
const doors = [
  {
    href: "/hormone/mens-health",
    chip: "Men's Hormone Health",
    title: "Men's Health + TRT",
    text: "Low energy, poor recovery, low libido — full labs and an honest evaluation before any prescription.",
    quizHref: "/hormone/mens-health/quiz",
    accentRgb: "20,225,235",
    grad: "linear-gradient(135deg, hsl(188,88%,54%), hsl(216,79%,46%))",
  },
  {
    href: "/hormone/glp1",
    chip: "Metabolic Care",
    title: "GLP-1 Weight Loss",
    text: "Semaglutide and tirzepatide with a real metabolic review first — and body composition tracked throughout.",
    quizHref: null,
    accentRgb: "210,80,250",
    grad: "linear-gradient(135deg, hsl(271,74%,55%), hsl(188,88%,54%))",
  },
] as const;

export default function HormonePage() {
  return (
    <div className="pb-20 lg:pb-0">
      <JsonLd data={hormoneSchema} />
      <JsonLd data={hormoneFaqSchema} />
      <h1 className="sr-only">
        Hormone Therapy Colorado Springs — Women&apos;s HRT, Perimenopause &amp; Menopause Care, Men&apos;s TRT
        &amp; GLP-1 Weight Loss
      </h1>

      {/* ── 1. CINEMATIC HERO ─────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <Image
          src="/images/hormone/womens-hero.webp"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(100deg, hsla(222,45%,6%,0.96) 0%, hsla(222,45%,6%,0.88) 35%, hsla(222,45%,6%,0.55) 62%, hsla(222,45%,6%,0.25) 100%), linear-gradient(0deg, hsl(210,32%,8%) 0%, transparent 128px)" }}
        />
        {/* Quiet top-right redirects for visitors here for TRT or GLP-1 */}
        <div className="absolute right-4 top-16 z-20 flex items-center gap-2 md:top-28 lg:right-8 lg:top-32">
          <TrackedLink
            href="/hormone/mens-health"
            event="cta_click"
            analytics={{ page: PAGE, source: "hormone-topnav-mens", service: "hormone", label: "Men's TRT" }}
            className="rounded-full px-7 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            style={{ border: "1px solid hsla(0,0%,100%,0.25)", background: "hsla(222,45%,8%,0.5)", backdropFilter: "blur(8px)" }}
          >
            Men&apos;s / TRT →
          </TrackedLink>
          <TrackedLink
            href="/hormone/glp1"
            event="cta_click"
            analytics={{ page: PAGE, source: "hormone-topnav-glp1", service: "hormone", label: "GLP-1" }}
            className="rounded-full px-7 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            style={{ border: "1px solid hsla(0,0%,100%,0.25)", background: "hsla(222,45%,8%,0.5)", backdropFilter: "blur(8px)" }}
          >
            GLP-1 →
          </TrackedLink>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-32 pb-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-fuchsia-300/20 bg-fuchsia-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-100">
                Women&apos;s Hormone Health
              </span>
              <RatingChip service="hormone" source="hormone-hero" />
            </div>
            <p
              aria-hidden="true"
              className="mt-8 text-4xl font-bold text-white lg:text-6xl"
              style={{ textShadow: "0 10px 34px rgba(0,0,0,0.42)", lineHeight: 1.1 }}
            >
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
                It&apos;s your hormones.
              </span>
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white" style={{ textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}>
              Women have spent years being told their symptoms are normal, stress-related, or just part of getting
              older. We take the opposite approach: listen closely, explain what is happening, and build a real
              treatment plan around it.
            </p>
            <div className="mt-9">
              <CoPrimaryCtas source="hormone-hero" size="lg" align="left" />
            </div>
            <div className="mt-9">
              <CredentialHero size="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 1b. THE OTHER DOORS — men's TRT + GLP-1 sub-clinics ───────── */}
      <section className="py-10 lg:py-12">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            {doors.map((door) => (
              <div
                key={door.href}
                className="relative overflow-hidden rounded-[28px] border p-6 lg:p-7"
                style={{
                  borderColor: `rgba(${door.accentRgb},0.28)`,
                  background: "hsla(222,45%,8%,0.72)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <TrackedLink
                  href={door.href}
                  event="cta_click"
                  analytics={{ page: PAGE, source: "hormone-doors", service: "hormone", label: door.title }}
                  className="absolute inset-0 z-0"
                  aria-label={door.title}
                >
                  <span className="sr-only">{door.title}</span>
                </TrackedLink>
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: `radial-gradient(circle at 15% 0%, rgba(${door.accentRgb},0.16), transparent 55%)` }}
                  aria-hidden="true"
                />
                <div className="pointer-events-none relative z-10">
                  <span
                    className="inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{
                      borderColor: `rgba(${door.accentRgb},0.32)`,
                      background: "hsla(210,32%,12%,0.6)",
                      color: `rgb(${door.accentRgb})`,
                    }}
                  >
                    {door.chip}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-white">{door.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{door.text}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <TrackedLink
                      href={door.href}
                      event="cta_click"
                      analytics={{ page: PAGE, source: "hormone-doors", service: "hormone", label: `${door.title} — Learn More` }}
                      className="pointer-events-auto relative z-10 rounded-full px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ background: door.grad }}
                    >
                      Learn More →
                    </TrackedLink>
                    {door.quizHref && (
                      <TrackedLink
                        href={door.quizHref}
                        event="cta_click"
                        analytics={{ page: PAGE, source: "hormone-doors", service: "hormone", label: `${door.title} — Quiz` }}
                        className="pointer-events-auto relative z-10 rounded-full px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}
                      >
                        Take the Quiz
                      </TrackedLink>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. VALIDATION — the dismissal table + full symptom picture ── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Eyebrow>Sound familiar?</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
                Why your symptoms get dismissed
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                Every one of these gets blamed on something separate — five different problems, five different dead
                ends. But it&apos;s not five problems. It&apos;s one hormone shift, and progesterone usually drops
                first. Fix the root, and the rest can follow.
              </p>
            </div>
            <div className="service-card-transparent rounded-[28px] p-6 lg:p-8">
              <div className="grid grid-cols-2 gap-x-6 text-xs font-bold uppercase tracking-wider" style={{ color: fuchsia }}>
                <span>What you feel</span>
                <span>What you&apos;re told it is</span>
              </div>
              <div className="mt-3 divide-y divide-white/10">
                {dismissalRows.map(([feel, told]) => (
                  <div key={feel} className="grid grid-cols-2 gap-x-6 py-3 text-sm">
                    <span className="text-white">{feel}</span>
                    <span className="text-slate-400">{told}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Eyebrow>It&apos;s Not Just Hot Flashes</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
                The full-body picture is why so many women feel missed
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                Most women were never told how many symptoms can connect back to changing hormones. Seeing the whole
                pattern can be validating on its own. If nobody ever explained that, the problem was not you.
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

      {/* ── 3. FULL-BLEED SCENE — the hormone lurch ───────────────────── */}
      <SectionView analytics={{ page: PAGE, label: "journey-curve", service: "hormone" }}>
        <section className="relative flex items-center overflow-hidden" style={{ minHeight: "88vh" }}>
          <Image src="/images/hormone/journey-v2.webp" alt="" fill className="object-cover" sizes="100vw" />
          <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(105deg, hsla(222,45%,6%,0.88) 0%, hsla(222,45%,6%,0.6) 45%, hsla(222,45%,6%,0.15) 80%, transparent 100%)" }} />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32" style={{ background: "linear-gradient(180deg, hsl(210,32%,8%), transparent)" }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(0deg, hsl(210,32%,8%), transparent)" }} />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 lg:px-8">
            <Eyebrow>The Hormone Journey</Eyebrow>
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
          </div>
        </section>
      </SectionView>

      {/* ── 4. FULL-BLEED SCENE — the critical window ─────────────────── */}
      <SectionView analytics={{ page: PAGE, label: "critical-window", service: "hormone" }}>
        <section className="relative flex items-center overflow-hidden" style={{ minHeight: "88vh" }}>
          <Image src="/images/hormone/window-backdrop-v2.webp" alt="" fill className="object-cover" sizes="100vw" />
          <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(105deg, hsla(222,45%,6%,0.88) 0%, hsla(222,45%,6%,0.6) 45%, hsla(222,45%,6%,0.15) 80%, transparent 100%)" }} />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32" style={{ background: "linear-gradient(180deg, hsl(210,32%,8%), transparent)" }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(0deg, hsl(210,32%,8%), transparent)" }} />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 lg:px-8">
            <Eyebrow>The whole idea in one line</Eyebrow>
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

            {/* What's at stake (deck s09) */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {stakes.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4" style={{ backdropFilter: "blur(8px)" }}>
                  <p className="text-sm font-bold" style={{ color: fuchsia }}>{s.label}</p>
                  <p className="mt-1.5 text-xs leading-5 text-slate-300">{s.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-white/85" style={{ textShadow: SCENE_P }}>
              The hot flashes fade. What estrogen was quietly protecting — your bones, your heart, your brain — is
              what&apos;s really on the line.
            </p>
          </div>
        </section>
      </SectionView>

      {/* ── 5. FULL-BLEED SCENE — social proof ────────────────────────── */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: "88vh" }}>
        <Image src="/images/hormone/reviews-v2.webp" alt="" fill className="object-cover" sizes="100vw" />
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 75% 70% at 50% 55%, hsla(222,45%,6%,0.82) 0%, hsla(222,45%,6%,0.5) 60%, transparent 100%)" }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32" style={{ background: "linear-gradient(180deg, hsl(210,32%,8%), transparent)" }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(0deg, hsl(210,32%,8%), transparent)" }} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 text-center lg:px-8">
          <div className="mb-8">
            <Eyebrow>What patients say</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
              Care that actually listens
            </h2>
          </div>
          <ReviewStrip variant="grid" count={3} service="hormone" source="hormone-reviews" />
          {/* extraSlot reserved: consented HRT patient stories go here */}
          <div className="mt-8">
            <CoPrimaryCtas source="hormone-reviews" />
          </div>
        </div>
      </section>

      {/* ── 6. OBJECTIONS — the questions everyone actually has ───────── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8"><div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <Eyebrow>Straight answers</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              The questions everyone actually has
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              Real studies, honest trade-offs, no sales pitch. This is the conversation most 15-minute visits never
              get to.
            </p>
          </div>
          <Accordion items={faqs} service="hormone" />
        </div>
      </div>
      </section>

      {/* ── 8. PRICING ────────────────────────────────────────────────── */}
      <section id="pricing" className="scroll-mt-20 py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8"><div className="mx-auto max-w-5xl">
          <SimplePricing
            service="hormone"
            page={PAGE}
            source="hormone-pricing"
            heading="Simple pricing. Every plan."
            monthly={clinicFacts.hormone.monthlyManagement}
            sub="Same price for HRT, TRT, and GLP-1. Your first month includes the comprehensive consult, lab ordering, and lab review. Labs and medications billed separately."
            note={`Just need topical estrogen cream? A ${usd(clinicFacts.hormone.topicalEstrogenTelehealth)} telehealth visit covers ${clinicFacts.hormone.topicalEstrogenDurationMonths} months — no membership needed.`}
          />

          <div className="mt-10">
            <CoPrimaryCtas source="hormone-pricing" />
          </div>
        </div>
      </div>
      </section>

      {/* ── 9. QUIZ TEASER ────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8"><div className="mx-auto max-w-4xl">
          <div
            className="rounded-[34px] border p-8 text-center lg:p-10"
            style={{
              borderColor: "hsla(331,95%,72%,0.25)",
              background: "linear-gradient(135deg, hsla(271,74%,55%,0.16), hsla(331,95%,72%,0.1), hsla(210,22%,16%,0.7))",
            }}
          >
            <Eyebrow>Not ready to talk to anyone yet?</Eyebrow>
            <h2 className="mt-4 text-2xl font-bold text-white lg:text-3xl">
              Start with the 3-minute symptom quiz
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
              Built on the Greene Climacteric Scale — a validated clinical instrument, not a personality quiz. You
              get your symptom score, which hormone is most likely driving your symptoms, and the labs worth
              discussing. No email required until the end.
            </p>
            <div className="mt-7">
              <CoPrimaryCtas source="hormone-quiz-teaser" />
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* ── 10. FULL-BLEED SCENE — final action (end on first light) ─── */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: "80vh" }}>
        <Image src="/images/hormone/final-v2.webp" alt="" fill className="object-cover" sizes="100vw" />
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 75% 70% at 50% 55%, hsla(222,45%,6%,0.82) 0%, hsla(222,45%,6%,0.5) 60%, transparent 100%)" }} />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32" style={{ background: "linear-gradient(180deg, hsl(210,32%,8%), transparent)" }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(0deg, hsl(210,32%,8%), transparent)" }} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 text-center lg:px-8">
          <Eyebrow>Start Here</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
            Women deserve a clinic that takes this seriously
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
            If you feel like something has shifted and nobody has put the pieces together clearly, that is exactly
            where this conversation should begin.
          </p>
          <div className="mt-8">
            <CoPrimaryCtas source="hormone-final" size="lg" />
          </div>
          <p className="mt-8 text-sm" style={{ color: "hsl(210,25%,70%)", textShadow: SCENE_P }}>
            Call or text{" "}
            <a href={`tel:${clinicFacts.contact.phoneTel}`} className="font-semibold" style={{ color: fuchsia }}>
              {clinicFacts.contact.phone}
            </a>{" "}
            · Email{" "}
            <a href={`mailto:${clinicFacts.contact.email}`} className="font-semibold" style={{ color: fuchsia }}>
              {clinicFacts.contact.email}
            </a>
          </p>
        </div>
      </section>


      <StickyCtaBar source="hormone" />
    </div>
  );
}
