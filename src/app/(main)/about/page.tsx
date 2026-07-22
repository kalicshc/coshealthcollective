import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { ACCENTS } from "@/lib/accents";
import { clinicFacts } from "@/lib/clinicFacts";
import { SceneSection, Eyebrow, SCENE_H, SCENE_P } from "@/components/SceneSection";
import { CoPrimaryCtas } from "@/components/CoPrimaryCtas";
import { GlassCard } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { ReviewStrip, RatingChip } from "@/components/ReviewStrip";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { bookingUrl } from "@/lib/bookingLinks";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "Meet Your Healthcare Team",
  description: "Meet Sarah Crist ARNP and Logan Crist PA-C, the founders behind Colorado Springs Health Collective — building CSHC Direct Primary Care, CSHC Hormone & Weight Loss Clinic, and CSHC Hyperbaric.",
  keywords: "Sarah Crist nurse practitioner, Logan Crist physician assistant, Colorado Springs DPC providers, healthcare team Colorado Springs",
};

const ACCENT = ACCENTS.brand;

// Lighter golds than ACCENT.from/to — hand-tuned for gradient-clipped
// headlines sitting on dark photos (same approach as the DPC blues).
const goldLight = "hsl(48, 96%, 72%)";
const goldDeep = "hsl(38, 92%, 56%)";

const EYEBROW = "hsla(45,90%,78%,0.9)";

// Both founder cards share this identical frame so the pair reads as a set.
function PortraitFrame({ children }: { children: React.ReactNode }) {
  return <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6">{children}</div>;
}

export default function About() {
  return (
    <div>
      {/* ── 1. CINEMATIC HERO ─────────────────────────────────────────── */}
      <SceneSection image="/images/brand/about-hero.webp" scrim="hero" minHeight="100svh" priority maxWidthClassName="max-w-7xl" scrollCue="#team">
        <div className="max-w-3xl pt-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]" style={{ border: `1px solid rgba(${ACCENT.rgb},0.3)`, background: `rgba(${ACCENT.rgb},0.12)`, color: "hsl(45,90%,86%)" }}>
              The Founders
            </span>
            <RatingChip service="brand" source="about-hero" />
          </div>
          <h1
            className="mt-8 text-4xl font-bold text-white lg:text-6xl"
            style={{ textShadow: "0 10px 34px rgba(0,0,0,0.42)", lineHeight: 1.1 }}
          >
            Meet your
            <span
              className="mt-2 block"
              style={{
                background: `linear-gradient(135deg, ${goldLight}, ${goldDeep})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.28))",
              }}
            >
              healthcare team.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white" style={{ textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}>
            Board-certified providers who believe healthcare should be personal, accessible, and
            focused on you.
          </p>
          <div className="mt-9">
            <CoPrimaryCtas
              service="brand"
              source="about-hero"
              primary={{ label: "Book a Free Meet & Greet", appt: "meetGreet" }}
              secondary={{ label: "Our Vision", href: "#vision" }}
              size="lg"
              align="left"
            />
          </div>
        </div>
      </SceneSection>

      {/* ── 2. THE FOUNDERS ───────────────────────────────────────────── */}
      <section id="team" className="scroll-mt-20 py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sarah */}
            <GlassCard service="brand" className="!p-8">
              <PortraitFrame>
                <Image
                  src="/sarah-photo.jpg"
                  alt="Sarah Crist, MSN, APRN, FNP-C, family nurse practitioner at Colorado Springs Health Collective"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </PortraitFrame>
              <h3 className="text-xl font-bold mb-1 text-center text-white">
                Sarah Crist, MSN, APRN, FNP-C, AGACNP-BC
              </h3>
              <p className="text-center text-sm font-semibold mb-5" style={{ color: `rgb(${ACCENT.rgb})` }}>
                Co-Owner | Family Nurse Practitioner
              </p>
              <p className="text-sm leading-relaxed text-center" style={{ color: "hsl(210,25%,72%)" }}>
                Colorado State University Pueblo graduate with 9 years of nursing excellence and 5 years as a board-certified
                family nurse practitioner specializing in internal medicine. She takes time to understand each patient&apos;s unique
                circumstances and health goals, building strong provider-patient relationships that empower individuals to take
                control of their health through evidence-based care and comprehensive wellness strategies.
              </p>
            </GlassCard>

            {/* Logan */}
            <GlassCard service="brand" className="!p-8">
              <PortraitFrame>
                <Image
                  src="/logan-photo.png"
                  alt="Logan Crist, PA-C with the Colorado Springs Health Collective mobile care vehicle"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "55% 15%" }}
                />
              </PortraitFrame>
              <h3 className="text-xl font-bold mb-1 text-center text-white">
                Logan Crist, PA-C
              </h3>
              <p className="text-center text-sm font-semibold mb-5" style={{ color: `rgb(${ACCENT.rgb})` }}>
                Co-Owner | Physician Assistant
              </p>
              <p className="text-sm leading-relaxed text-center mb-6" style={{ color: "hsl(210,25%,72%)" }}>
                University of Dayton graduate with 9 years of clinical experience in emergency medicine, internal medicine,
                and urgent care. His approach combines targeted medication management to treat underlying conditions with
                comprehensive wellness interventions, with the goal of optimizing health metrics and helping patients reduce
                or eliminate medications while achieving their personal wellness goals.
              </p>
              <div className="flex justify-center">
                <TrackedLink
                  href="https://www.linkedin.com/in/loganmcrist/"
                  event="cta_click"
                  analytics={{ page: "about", source: "about-linkedin", service: "brand", label: "Connect on LinkedIn" }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
                  style={{ background: "hsla(210,90%,40%,0.12)", border: "1px solid hsla(210,90%,50%,0.3)" }}
                >
                  <div className="relative flex-shrink-0">
                    <FaLinkedin className="w-5 h-5" style={{ color: "#0A66C2" }} />
                    <CheckCircle
                      className="absolute -bottom-1 -right-1 w-3 h-3"
                      style={{ color: "hsl(45,90%,60%)", background: "hsl(210,32%,28%)", borderRadius: "50%" }}
                    />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "hsl(210,80%,75%)" }}>
                    Connect on LinkedIn
                  </span>
                </TrackedLink>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── 3. FULL-BLEED SCENE — the vision ──────────────────────────── */}
      <SceneSection image="/images/brand/about-vision.webp" scrim="radial" contentClassName="text-center" maxWidthClassName="max-w-4xl" id="vision">
        <Eyebrow color={EYEBROW}>Our Vision</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
          A full health campus,{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${goldLight}, ${goldDeep})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.28))",
            }}
          >
            built for aging well.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
          We started with Direct Primary Care because it was the fastest way to make a difference — care that&apos;s built
          around people, not billing codes. Now we&apos;re building the rest of the campus. CSHC Hormone &amp; Weight Loss
          Clinic brings hormone optimization and GLP-1 therapy to patients who&apos;ve been dismissed or underserved.
          CSHC Hyperbaric is launching {clinicFacts.hbot.openingDate} as Colorado Springs&apos; only accessible 2.0 ATA hyperbaric chamber
          outside of UC Health.
        </p>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
          Our goal is a full health campus where primary care, hormone optimization, and hyperbaric recovery work together
          under one roof — coordinated, affordable, and built for people who want to age well.
        </p>
      </SceneSection>

      <section className="pt-12 pb-4">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <ReviewStrip variant="strip" service="brand" source="about-reviews" />
        </div>
      </section>

      <PageCtaFooter
        service="brand"
        heading="Ready to experience healthcare differently?"
        body="Start with a free Meet & Greet with Logan or Sarah. No commitment, no paperwork — just a conversation to see if CSHC is the right fit for your goals."
        primaryCta={{ label: "Book a Free Meet & Greet", href: bookingUrl("meetGreet", "about-footer"), external: true }}
        analytics={{ page: "about", source: "about-footer", service: "brand", label: "Book a Free Meet & Greet", appt: "meetGreet" }}
      />
    </div>
  );
}
