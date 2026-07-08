import Image from "next/image";
import { Bandage, Hourglass, Flame, Dumbbell, Zap, Wind, Brain, Ear } from "lucide-react";
import { clinicFacts } from "@/lib/clinicFacts";
import { ACCENTS } from "@/lib/accents";
import { SceneSection, Eyebrow, SCENE_H, SCENE_P } from "@/components/SceneSection";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { SectionView } from "@/components/analytics/SectionView";
import { GlassCard } from "@/components/GlassCard";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

// The hyperbaric "epic page" — pre-launch conversion arc: the 2.0 ATA claim →
// the science → the differentiator → what it treats → evidence philosophy →
// early-access capture. Full-bleed photo scenes (womens-health language);
// accents from ACCENTS.hyperbaric. The science copy is vetted — don't reword.

const PAGE = "hyperbaric";
const A = ACCENTS.hyperbaric;

// Lighter cyans than A.from/to — hand-tuned for gradient-clipped headlines
// on dark photos (same approach as the women's fuchsia / DPC blues).
const cyanLight = "hsl(182,100%,68%)";
const cyanDeep = "hsl(198,95%,62%)";

const EYEBROW = "hsla(185,95%,80%,0.85)";

const gradientClip = {
  background: `linear-gradient(135deg, ${cyanLight}, ${cyanDeep})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const conditions = [
  {
    icon: Bandage,
    title: "Wound Healing & Surgical Recovery",
    body: "Post-mastectomy. Aesthetic surgery. Abdominal wounds. HBOT is FDA-approved for compromised tissue repair — delivering oxygenation that no other therapy can reach.",
    tags: ["Post-Mastectomy", "Aesthetic Surgery", "Skin Grafts"],
  },
  {
    icon: Hourglass,
    title: "Anti-Aging & Longevity",
    body: "37% fewer senescent cells. 20%+ telomere lengthening. Real reversal of cellular aging — measured in human trials, not animals.",
    tags: ["Telomeres", "Senescent Cells", "Skin & Collagen"],
  },
  {
    icon: Flame,
    title: "Autoimmune & Inflammation",
    body: "Systemic reduction of TNF-α and IL-6 — the inflammatory drivers behind UC, RA, psoriasis, and chronic disease. 50% clinical remission in a blinded UC trial vs. 0% in the control group.",
    tags: ["Ulcerative Colitis", "Rheumatoid Arthritis", "Psoriasis"],
  },
  {
    icon: Dumbbell,
    title: "Muscle, Tendon & Athletic Recovery",
    body: "Accelerate biological repair of damaged muscle and connective tissue. Higher training density. Lower injury risk. Confirmed in a 2026 meta-analysis of 10 RCTs.",
    tags: ["Muscle Repair", "Tendon Healing", "Performance"],
  },
  {
    icon: Zap,
    title: "Chronic Pain & Fibromyalgia",
    body: "Beat fibromyalgia medications head-to-head in a randomized trial. HBOT modifies the neurological root of pain — not just the symptoms. 87.5–100% pain relief rates documented.",
    tags: ["Fibromyalgia", "CRPS", "Nerve Pain"],
  },
  {
    icon: Wind,
    title: "Long COVID Recovery",
    body: "Microvascular damage. Neuroinflammation. Mitochondrial dysfunction. HBOT addresses all three — with durable improvements confirmed at 1-year follow-up.",
    tags: ["Brain Fog", "Fatigue", "Cardiac Function"],
  },
  {
    icon: Brain,
    title: "Brain & Neurological Recovery",
    body: "Reactivate dormant neurons after stroke. Improve TBI-related deficits years — even decades — after injury. Documented with SPECT and fNIRS brain imaging in clinical trials.",
    tags: ["Stroke", "TBI / Concussion", "Cognitive Function"],
  },
  {
    icon: Ear,
    title: "Sudden Hearing Loss",
    body: "Guideline-endorsed. 2.61× higher recovery rate. Time is everything — the sooner you start, the better the outcome.",
    tags: ["SSNHL", "Time-Sensitive", "Guideline-Endorsed"],
  },
];

const mechanisms = [
  {
    stat: "New vessels grow",
    body: "Angiogenesis — formation of new blood vessels — restores circulation to tissue that was too damaged or irradiated to heal on its own.",
  },
  {
    stat: "Stem cells deploy",
    body: "Up to 8× more stem cells released from bone marrow into circulation — traveling to sites of injury to rebuild damaged tissue.",
  },
  {
    stat: "Inflammation quiets",
    body: "Pro-inflammatory cytokines (TNF-α, IL-6) measurably reduced. The chronic inflammatory cascade driving autoimmune disease, pain, and aging — interrupted.",
  },
  {
    stat: "Genes reset",
    body: "1,912 differentially expressed genes after a full HBOT course — aging-associated pathways downregulated, regenerative pathways activated.",
  },
];

// Pre-launch: the chamber opens in Fall 2026, so the offer is marked PreOrder
// (waitlist) — nothing here may imply the service currently operates.
const hyperbaricSchema = serviceSchema({
  type: "MedicalTherapy",
  name: "Hyperbaric Oxygen Therapy (HBOT)",
  description: `Colorado Springs' only accessible ${clinicFacts.hbot.pressure} hyperbaric oxygen chamber — opening ${clinicFacts.hbot.openingDate}. HBOT for fibromyalgia, Long COVID, wound healing, anti-aging, and athletic recovery. Join the waitlist.`,
  path: "/hyperbaric",
  image: "/images/hyperbaric/hbot-hero.webp",
  offers: [
    {
      name: "Early-access waitlist",
      description: `Opening ${clinicFacts.hbot.openingDate} — waitlist members receive a ${clinicFacts.hbot.earlyAccessDiscountPercent}% early-access discount.`,
      availability: "https://schema.org/PreOrder",
    },
  ],
});

export default function HyperbaricPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <JsonLd data={hyperbaricSchema} />
      {/* ── 1. CINEMATIC HERO — the 2.0 ATA claim + early access ──────── */}
      <SceneSection image="/images/hyperbaric/hbot-hero.webp" scrim="radial" minHeight="100svh" priority contentClassName="text-center" scrollCue="#science">
        <div className="pt-12">
          {/* Brand badge */}
          <div className="flex justify-center mb-5">
            <div
              className="inline-flex items-center gap-3 rounded-2xl border px-5 py-3"
              style={{
                borderColor: `rgba(${A.rgb},0.2)`,
                background: "linear-gradient(180deg, hsla(215,30%,16%,0.92), hsla(215,28%,13%,0.88))",
                backdropFilter: "blur(16px)",
              }}
            >
              <Image src="/logo-main.png" alt="CSHC" width={36} height={36} className="object-contain" />
              <div className="text-left">
                <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "hsl(210,25%,62%)" }}>
                  Colorado Springs Health Collective
                </p>
                <p className="text-sm font-semibold leading-tight mt-0.5" style={gradientClip}>
                  Hyperbaric Clinic — Opening {clinicFacts.hbot.openingDate}
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(210,40%,80%)", letterSpacing: "0.06em", textShadow: SCENE_P }}>
            Clinical Grade
          </p>
          <h1 style={{ color: "#fff", textShadow: "0 2px 24px rgba(0,0,0,0.5)", lineHeight: 1 }}>
            <span
              className="block font-black"
              style={{
                fontSize: "clamp(3.6rem, 12vw, 7.5rem)",
                fontWeight: 900,
                ...gradientClip,
                filter: `drop-shadow(0 0 40px rgba(${A.rgb},0.35)) drop-shadow(0 6px 20px rgba(0,0,0,0.5))`,
              }}
            >
              2.0 ATA
            </span>
            <span className="block font-black mt-2" style={{ fontSize: "clamp(1.5rem, 4vw, 2.75rem)", fontWeight: 900, textShadow: SCENE_H }}>
              Hyperbaric Oxygen Therapy
              <span className="sr-only"> Colorado Springs — 2.0 ATA HBOT for Fibromyalgia, Long COVID, Wound Healing &amp; Anti-Aging</span>
            </span>
          </h1>

          <p className="mt-5 mb-2 font-semibold" style={{ color: `rgb(${A.rgb})`, fontSize: "clamp(1rem, 2vw, 1.2rem)", textShadow: SCENE_P }}>
            Coming {clinicFacts.hbot.openingDate} — Lock In Your {clinicFacts.hbot.earlyAccessDiscountPercent}% Discount Today.
          </p>

          <p className="mb-7 max-w-xl mx-auto text-white/95" style={{ fontSize: "17px", lineHeight: "1.65", textShadow: SCENE_P }}>
            Most local providers operate at 1.3–1.6 ATA. We&apos;re opening a clinical-grade chamber at{" "}
            <strong style={{ color: "#fff" }}>2.0 ATA</strong> — the pressure the clinical evidence was built on.
          </p>

          <div className="flex flex-col items-center gap-4">
            <TrackedLink
              href="/hyperbaric/why-2ata"
              event="cta_click"
              analytics={{ page: PAGE, source: "hbot-hero", service: "hyperbaric", label: "Why 2.0 ATA" }}
              className="rounded-full px-8 py-3.5 text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ border: `1px solid rgba(${A.rgb},0.45)`, color: `rgb(${A.rgb})`, background: "hsla(210,22%,14%,0.6)", backdropFilter: "blur(8px)" }}
            >
              Why 2.0 ATA Matters →
            </TrackedLink>
            <EarlyAccessForm source="hbot-hero" />
          </div>
        </div>
      </SceneSection>

      {/* ── 2. THE SCIENCE — four mechanisms ──────────────────────────── */}
      <SectionView analytics={{ page: PAGE, label: "mechanisms", service: "hyperbaric" }}>
        <section id="science" className="scroll-mt-20 py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="text-center mb-14">
              <Eyebrow color={EYEBROW}>The Science</Eyebrow>
              <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-white">
                At 2.0 ATA, your body unlocks{" "}
                <span style={gradientClip}>capabilities it can&apos;t access normally.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
                Oxygen dissolves directly into plasma — reaching 10–15× normal levels in tissue standard
                circulation can&apos;t supply. What follows is a cascade of healing your body was always
                designed to do.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {mechanisms.map((m) => (
                <GlassCard key={m.stat} service="hyperbaric" className="text-center">
                  <div className="text-xl font-black mb-3" style={gradientClip}>{m.stat}</div>
                  <p className="text-sm leading-6 text-slate-300">{m.body}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </SectionView>

      {/* ── 3. FULL-BLEED SCENE — the 2.0 ATA differentiator ──────────── */}
      <SectionView analytics={{ page: PAGE, label: "why-2ata", service: "hyperbaric" }}>
        <SceneSection image="/images/hyperbaric/hbot-depth.webp" scrim="side">
          <Eyebrow color={EYEBROW}>The 2.0 ATA Difference</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
            Pressure is the therapy. Most chambers don&apos;t have enough of it.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
            The landmark trials — fibromyalgia, Long COVID, stroke, anti-aging — were run at 2.0 ATA. Soft-shell
            &quot;mild HBOT&quot; chambers at 1.3–1.6 ATA simply cannot reproduce those oxygen levels. If the
            pressure is different, it&apos;s a different treatment.
          </p>
          <div className="mt-8">
            <TrackedLink
              href="/hyperbaric/why-2ata"
              event="cta_click"
              analytics={{ page: PAGE, source: "hbot-depth", service: "hyperbaric", label: "Why 2.0 ATA" }}
              className="inline-block rounded-full px-8 py-3.5 text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ border: `1px solid rgba(${A.rgb},0.45)`, color: `rgb(${A.rgb})`, background: "hsla(210,22%,14%,0.6)", backdropFilter: "blur(8px)" }}
            >
              Why 2.0 ATA Changes Everything →
            </TrackedLink>
          </div>
        </SceneSection>
      </SectionView>

      {/* ── 4. WHAT WE TREAT — eight conditions ───────────────────────── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="text-center mb-14">
            <Eyebrow color={EYEBROW}>What We Treat</Eyebrow>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-white">
              One therapy. <span style={gradientClip}>Extraordinary reach.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {conditions.map((c) => (
              <GlassCard key={c.title} service="hyperbaric" className="!p-6">
                <div className="mb-3">
                  <c.icon className="w-8 h-8" strokeWidth={1.75} style={{ color: `rgb(${A.rgb})` }} aria-hidden />
                </div>
                <h3 className="font-bold mb-2 text-white" style={{ fontSize: "17px" }}>{c.title}</h3>
                <p className="mb-4 text-sm leading-6 text-slate-300">{c.body}</p>
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2.5 py-1 text-xs font-medium"
                      style={{ background: `rgba(${A.rgb},0.1)`, border: `1px solid ${A.chipBorder}`, color: `rgb(${A.rgb})` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <TrackedLink
              href="/hyperbaric/evidence"
              event="cta_click"
              analytics={{ page: PAGE, source: "hbot-conditions", service: "hyperbaric", label: "Full research" }}
              className="inline-block rounded-full px-8 py-3.5 text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ border: `1px solid rgba(${A.rgb},0.4)`, color: `rgb(${A.rgb})` }}
            >
              See the Full Research →
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ── 5. EVIDENCE PHILOSOPHY ────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <div
            className="rounded-[34px] p-10 lg:p-14 text-center"
            style={{
              background: "linear-gradient(155deg, hsla(185,40%,10%,0.95), hsla(210,40%,10%,0.95))",
              border: `1px solid rgba(${A.rgb},0.28)`,
              backdropFilter: "blur(16px)",
              boxShadow: `0 0 80px rgba(${A.rgb},0.1), 0 32px 80px rgba(2,6,23,0.42)`,
            }}
          >
            <Eyebrow color={EYEBROW}>Our Philosophy</Eyebrow>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold mb-5 text-white">
              We show you <span style={gradientClip}>the real research.</span>
            </h2>
            <p className="text-lg leading-relaxed text-slate-300">
              Fourteen conditions. Four tiers of evidence. Honest clinical perspective on every one — including
              what the studies show and where the science is still building. Because informed patients make the
              best decisions.
            </p>
            <TrackedLink
              href="/hyperbaric/evidence"
              event="cta_click"
              analytics={{ page: PAGE, source: "hbot-philosophy", service: "hyperbaric", label: "View evidence" }}
              className="inline-block rounded-full px-10 py-4 font-bold mt-8 text-sm hover:opacity-90 transition-opacity"
              style={{
                background: `linear-gradient(135deg, ${A.from}, ${A.to})`,
                color: "hsl(210,32%,10%)",
                boxShadow: `0 8px 32px rgba(${A.rgb},0.3)`,
              }}
            >
              View the Evidence
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ── 6. FULL-BLEED SCENE — final early-access capture ──────────── */}
      <SceneSection image="/images/hyperbaric/hbot-final.webp" scrim="radial" minHeight="80vh" id="early-access" contentClassName="text-center">
        <Eyebrow color={EYEBROW}>Limited Pre-Launch Spots</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
          Be first. <span style={gradientClip}>Save {clinicFacts.hbot.earlyAccessDiscountPercent}%.</span>
        </h2>
        <p className="mx-auto mt-5 mb-10 max-w-2xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
          No commitment required. No payment. Register and we&apos;ll contact you when we open with your
          discount locked in.
        </p>
        <EarlyAccessForm source="hbot-final" />
        <p className="mt-8 text-sm" style={{ color: "hsl(210,25%,70%)", textShadow: SCENE_P }}>
          Questions?{" "}
          <a
            href={`tel:${clinicFacts.contact.phoneTel}`}
            className="font-semibold hover:opacity-80 transition-opacity"
            style={{ color: `rgb(${A.rgb})` }}
          >
            Call or text {clinicFacts.contact.phoneDashed}
          </a>
        </p>
      </SceneSection>

      <StickyCtaBar
        service="hyperbaric"
        source="hbot"
        primaryHref="#early-access"
        bookLabel={`Lock in ${clinicFacts.hbot.earlyAccessDiscountPercent}% off`}
        secondaryHref="/hyperbaric/evidence"
        secondaryLabel="Evidence"
      />
    </div>
  );
}
