"use client";

import { useState } from "react";
import { CheckCircle, Users, Heart, Shield, ExternalLink } from "lucide-react";
import { submitEmployerInquiry } from "@/lib/api";
import { clinicFacts } from "@/lib/clinicFacts";
import { trackEvent } from "@/lib/analytics";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ACCENTS } from "@/lib/accents";
import { SceneSection, Eyebrow, SCENE_H, SCENE_P } from "@/components/SceneSection";
import { CoPrimaryCtas } from "@/components/CoPrimaryCtas";
import { GlassCard } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { ReviewStrip, RatingChip } from "@/components/ReviewStrip";
import { gradientTextStyle } from "@/components/ServiceHero";

const ACCENT = ACCENTS.dpc;

// Lighter blues than ACCENT.from/to — hand-tuned for gradient-clipped
// headlines sitting on dark photos (same values as the DPC epic page).
const blueLight = "hsl(198,100%,76%)";
const blueDeep = "hsl(215,95%,66%)";

const EYEBROW = "hsla(205,95%,82%,0.85)";

const dpcBenefits = [
  "Tax-deductible business expense",
  "Improved employee retention and satisfaction",
  "Fewer sick days—employees get seen same-day, not weeks later",
  "No wasted money at urgent care for routine issues",
  "Direct access to your providers via call, text, or telehealth",
];

export default function ForBusinesses() {
  const [responseType, setResponseType] = useState("Email");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/10";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    try {
      await submitEmployerInquiry({
        firstName: String(formData.get("First Name") ?? ""),
        lastName: String(formData.get("Last Name") ?? ""),
        email: String(formData.get("Email") ?? ""),
        phone: String(formData.get("Phone Number") ?? ""),
        responseType,
        notes: String(formData.get("Notes") ?? ""),
        sourcePage: "/for-businesses",
      });
      setSubmitted(true);
      trackEvent("form_submit", { page: "for-businesses", service: "dpc", source: "for-businesses-interest" });
      e.currentTarget.reset();
      setResponseType("Email");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* ── 1. CINEMATIC HERO ─────────────────────────────────────────── */}
      <SceneSection image="/images/dpc/business-hero.webp" scrim="hero" minHeight="100svh" priority maxWidthClassName="max-w-7xl" scrollCue="#team-benefit">
        <div className="max-w-3xl pt-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]" style={{ border: `1px solid rgba(${ACCENT.rgb},0.3)`, background: `rgba(${ACCENT.rgb},0.12)`, color: "hsl(220,95%,88%)" }}>
              For Employers · Group Benefit
            </span>
            <RatingChip service="dpc" source="for-businesses-hero" />
          </div>
          <h1
            className="mt-8 text-4xl font-bold text-white lg:text-6xl"
            style={{ textShadow: "0 10px 34px rgba(0,0,0,0.42)", lineHeight: 1.1 }}
          >
            Your team&apos;s provider,
            <span
              className="mt-2 block"
              style={{
                background: `linear-gradient(135deg, ${blueLight}, ${blueDeep})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.28))",
              }}
            >
              one flat fee.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white" style={{ textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}>
            Colorado Springs Health Collective is building a full suite of health services — starting
            with Direct Primary Care and expanding to hormone optimization and hyperbaric recovery.
            Offer your employees access to one or all three.
          </p>
          <div className="mt-9">
            <CoPrimaryCtas
              service="dpc"
              source="for-businesses-hero"
              primary={{ label: "Get Started", href: "#contact-form" }}
              secondary={{ label: "Why DPC for Teams", href: "#team-benefit" }}
              size="lg"
              align="left"
            />
          </div>
        </div>
      </SceneSection>

      {/* ── 2. FULL-BLEED SCENE — the team benefit ────────────────────── */}
      <SceneSection image="/images/dpc/dpc-membership.webp" scrim="side" id="team-benefit">
        <Eyebrow color={EYEBROW}>The Benefit</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
          DPC membership for your team
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
          Whether your employees already have their own high-deductible plan, health share coverage, or
          no insurance at all — DPC membership gives them direct access to quality primary care.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div
            className="rounded-[24px] p-6 text-center"
            style={{ background: `linear-gradient(135deg, rgba(${ACCENT.rgb},0.16), hsla(45,90%,60%,0.12), hsla(222,45%,8%,0.75))`, border: `1px solid rgba(${ACCENT.rgb},0.45)`, backdropFilter: "blur(8px)" }}
          >
            <Users className="mx-auto h-7 w-7" style={{ color: `rgb(${ACCENT.rgb})` }} />
            <p className="mt-3 text-3xl font-black" style={{ color: "hsl(45,90%,60%)" }}>15% Group Discount</p>
            <p className="mt-2 text-sm" style={{ color: "hsl(210,25%,80%)" }}>When you enroll all employees as a company benefit</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-6" style={{ backdropFilter: "blur(8px)" }}>
            <h3 className="text-lg font-semibold text-white">Why offer DPC to your team?</h3>
            <div className="mt-4 space-y-3">
              {dpcBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: `rgb(${ACCENT.rgb})` }} />
                  <span className="text-sm leading-6" style={{ color: "hsl(210,25%,82%)" }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SceneSection>

      {/* ── 3. COVERAGE PARTNERS ──────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="mb-8 text-center">
            <Eyebrow color={EYEBROW}>Coverage Partners</Eyebrow>
            <h2 className="mt-4 text-3xl lg:text-4xl font-black text-white mb-4">Need Coverage Too?</h2>
            <p className="text-base max-w-3xl mx-auto" style={{ color: "hsl(210,25%,70%)" }}>
              We recommend everyone carry some type of catastrophic coverage for major events. Here are two options we can help coordinate:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <GlassCard service="hormone" className="!p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-7 h-7" style={{ color: `rgb(${ACCENTS.brand.rgb})` }} />
                <h3 className="text-xl font-bold" style={{ color: `rgb(${ACCENTS.brand.rgb})` }}>Zion Health Share</h3>
              </div>
              <p className="text-sm font-medium mb-4" style={{ color: "hsl(45,90%,60%)" }}>Plans starting at $84/month</p>
              <p className="mb-6 text-sm leading-relaxed flex-grow" style={{ color: "hsl(210,25%,75%)" }}>
                A health share is a community of members who share medical expenses together. It&apos;s not insurance, but provides affordable catastrophic coverage for hospital visits, surgeries, and major medical events.
              </p>
              <TrackedLink
                href="https://zionhealthshare.org/"
                event="cta_click"
                analytics={{ page: "for-businesses", source: "for-businesses-partners", service: "dpc", label: "Zion Health Share" }}
                className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                style={{ color: `rgb(${ACCENTS.brand.rgb})` }}
              >
                Learn more about Zion Health Share <ExternalLink className="w-4 h-4" />
              </TrackedLink>
            </GlassCard>
            <GlassCard service="dpc" className="!p-8 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-7 h-7" style={{ color: `rgb(${ACCENTS.dpc.rgb})` }} />
                <h3 className="text-xl font-bold" style={{ color: `rgb(${ACCENTS.dpc.rgb})` }}>Virtuous Benefits</h3>
              </div>
              <p className="text-sm font-medium mb-4" style={{ color: "hsl(45,90%,60%)" }}>ACA-Compliant Group Coverage</p>
              <p className="mb-6 text-sm leading-relaxed flex-grow" style={{ color: "hsl(210,25%,75%)" }}>
                Full ACA-compliant health insurance bundled with DPC membership. Virtuous negotiates transparent pricing on labs, imaging, specialists, and hospital care—giving your team comprehensive coverage with cost predictability.
              </p>
              <TrackedLink
                href="https://virtuousbenefits.care/"
                event="cta_click"
                analytics={{ page: "for-businesses", source: "for-businesses-partners", service: "dpc", label: "Virtuous Benefits" }}
                className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                style={{ color: `rgb(${ACCENTS.dpc.rgb})` }}
              >
                Learn more about Virtuous Benefits <ExternalLink className="w-4 h-4" />
              </TrackedLink>
            </GlassCard>
          </div>
          <p className="mt-8 text-center text-sm italic max-w-3xl mx-auto" style={{ color: "hsl(210,25%,62%)" }}>
            Note: DPC is not insurance. It covers your everyday primary care needs. For hospital stays, emergencies, and specialty care, we recommend pairing DPC with one of the coverage options above.
          </p>
        </div>
      </section>

      {/* ── 4. CONTACT FORM ───────────────────────────────────────────── */}
      <section id="contact-form" className="scroll-mt-20 py-14 lg:py-20">
        <div className="mx-auto max-w-2xl px-5 lg:px-8">
          <GlassCard service="dpc" className="!p-8 lg:!p-10">
            <h2 className="text-2xl lg:text-3xl font-black mb-6 text-center text-white">
              Request <span style={gradientTextStyle("dpc")}>More Information</span>
            </h2>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }}>
                  <CheckCircle className="w-8 h-8" style={{ color: "hsl(210,32%,10%)" }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: `rgb(${ACCENT.rgb})` }}>Message Sent Successfully!</h3>
                <p style={{ color: "hsl(210,25%,75%)" }}>We&apos;ll get back to you soon. Thank you for reaching out!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>First Name *</label>
                    <input type="text" name="First Name" required placeholder="John" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>Last Name *</label>
                    <input type="text" name="Last Name" required placeholder="Smith" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>Email *</label>
                  <input type="email" name="Email" required placeholder="john@company.com" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>Phone Number (Optional)</label>
                  <input type="tel" name="Phone Number" placeholder="(719) 555-1234" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "hsl(0,0%,92%)" }}>How would you prefer we respond?</label>
                  <div className="flex gap-6">
                    {["Email", "Phone"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer" style={{ color: "hsl(0,0%,85%)" }}>
                        <input type="radio" name="response" value={opt} checked={responseType === opt} onChange={() => setResponseType(opt)} className="accent-blue-400" />
                        {opt === "Phone" ? "Phone Call" : opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>Your Questions</label>
                  <textarea name="Notes" rows={4} placeholder="Tell us about your business and what you're looking for..." className={`${inputClass} resize-none`} />
                </div>
                {error && <p className="text-sm text-red-300">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full font-bold text-lg mt-6 disabled:opacity-60 hover:opacity-85 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`, color: "hsl(210,32%,10%)" }}
                >
                  {submitting ? "Sending..." : "Send My Questions"}
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </section>

      {/* ── 5. COMING SOON FOR TEAMS ──────────────────────────────────── */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <GlassCard service="brand" className="!p-8 lg:!p-10">
            <h2 className="text-2xl lg:text-3xl font-black mb-4 text-center text-white">
              More CSHC Benefits <span style={gradientTextStyle("brand")}>for Teams</span>
            </h2>
            <p className="text-center mb-8" style={{ color: "hsl(210,25%,75%)" }}>
              Employer options extend across all three CSHC divisions:
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-2xl p-6" style={{ background: "hsla(280,22%,22%,0.6)", border: `1px solid rgba(${ACCENTS.hormone.rgb},0.25)` }}>
                <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: `rgb(${ACCENTS.hormone.rgb})` }}>Available</span>
                <h3 className="font-bold text-lg mb-2 text-white">CSHC Hormone &amp; Weight Loss Clinic</h3>
                <p className="text-sm" style={{ color: "hsl(210,25%,75%)" }}>
                  Group pricing for hormone optimization and GLP-1 weight loss programs for employees and their spouses. Ask us for team rates.
                </p>
              </div>
              <div className="rounded-2xl p-6" style={{ background: "hsla(177,22%,22%,0.6)", border: `1px solid rgba(${ACCENTS.hyperbaric.rgb},0.25)` }}>
                <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: `rgb(${ACCENTS.hyperbaric.rgb})` }}>Opening {clinicFacts.hbot.openingDate}</span>
                <h3 className="font-bold text-lg mb-2 text-white">CSHC Hyperbaric</h3>
                <p className="text-sm" style={{ color: "hsl(210,25%,75%)" }}>
                  Corporate packages for hyperbaric oxygen therapy at Colorado Springs&apos; only 2.0 ATA chamber outside UC Health. Early access members receive 25% off at launch.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="pt-12 pb-4">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <ReviewStrip variant="strip" service="dpc" source="for-businesses-reviews" />
        </div>
      </section>

      <PageCtaFooter
        service="dpc"
        heading="Let's build your team's benefit."
        body="Tell us about your business and we'll put together options that fit your team and budget."
      />
    </div>
  );
}
