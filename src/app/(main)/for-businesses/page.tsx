"use client";

import { useState } from "react";
import { CheckCircle, Users, Heart, Shield, ExternalLink } from "lucide-react";
import { submitEmployerInquiry } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { ACCENTS } from "@/lib/accents";
import { ServiceHero, gradientTextStyle } from "@/components/ServiceHero";
import { GlassCard } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";

const ACCENT = ACCENTS.dpc;

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
      <ServiceHero
        service="dpc"
        eyebrow="For Employers"
        title="CSHC for Your Team"
        titleAccent="Better care. Better value."
        subhead="Colorado Springs Health Collective is building a full suite of health services — starting with Direct Primary Care and expanding to hormone optimization and hyperbaric recovery. Offer your employees access to one or all three."
        ctas={[{ label: "Get Started", href: "#contact-form", variant: "primary" }]}
      />

      <div className="section-divider" />

      {/* DPC for teams */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <GlassCard service="dpc" className="!p-8 lg:!p-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="w-7 h-7" style={{ color: `rgb(${ACCENT.rgb})` }} />
              <h2 className="text-2xl lg:text-3xl font-black text-white">
                DPC Membership <span style={gradientTextStyle("dpc")}>for Your Team</span>
              </h2>
            </div>
            <p className="text-base text-center mb-6" style={{ color: "hsl(210,25%,78%)" }}>
              Whether your employees already have their own high-deductible plan, health share coverage, or no insurance at all—DPC membership gives them direct access to quality primary care.
            </p>
            <div
              className="rounded-2xl p-6 mb-8 text-center"
              style={{ background: `linear-gradient(135deg, rgba(${ACCENT.rgb},0.14), hsla(45,90%,60%,0.12))`, border: `2px solid rgb(${ACCENT.rgb})` }}
            >
              <p className="text-2xl lg:text-3xl font-black mb-2" style={{ color: "hsl(45,90%,60%)" }}>15% Group Discount</p>
              <p style={{ color: "hsl(210,25%,80%)" }}>When you enroll all employees as a company benefit</p>
            </div>
            <h3 className="text-lg font-semibold mb-4 text-center text-white">Why offer DPC to your team?</h3>
            <div className="space-y-3">
              {dpcBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: `rgb(${ACCENT.rgb})` }} />
                  <span style={{ color: "hsl(210,25%,80%)" }}>{benefit}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Coverage partners */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">Need Coverage Too?</h2>
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

      {/* Contact form */}
      <section id="contact-form" className="py-16 lg:py-20">
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

      {/* Coming Soon for Teams */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <GlassCard service="brand" className="!p-8 lg:!p-10">
            <h2 className="text-2xl lg:text-3xl font-black mb-4 text-center text-white">
              More CSHC Benefits <span style={gradientTextStyle("brand")}>Coming for Teams</span>
            </h2>
            <p className="text-center mb-8" style={{ color: "hsl(210,25%,75%)" }}>
              As we expand, we&apos;re building employer options across all three CSHC divisions. Get on the early access list for:
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-2xl p-6" style={{ background: "hsla(280,22%,22%,0.6)", border: `1px solid rgba(${ACCENTS.hormone.rgb},0.25)` }}>
                <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: `rgb(${ACCENTS.hormone.rgb})` }}>Coming Soon</span>
                <h3 className="font-bold text-lg mb-2 text-white">CSHC Hormone &amp; Weight Loss Clinic</h3>
                <p className="text-sm" style={{ color: "hsl(210,25%,75%)" }}>
                  Group pricing for hormone optimization and GLP-1 weight loss programs for employees and their spouses.
                </p>
              </div>
              <div className="rounded-2xl p-6" style={{ background: "hsla(177,22%,22%,0.6)", border: `1px solid rgba(${ACCENTS.hyperbaric.rgb},0.25)` }}>
                <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: `rgb(${ACCENTS.hyperbaric.rgb})` }}>Opening Summer 2026</span>
                <h3 className="font-bold text-lg mb-2 text-white">CSHC Hyperbaric</h3>
                <p className="text-sm" style={{ color: "hsl(210,25%,75%)" }}>
                  Corporate packages for hyperbaric oxygen therapy at Colorado Springs&apos; only 2.0 ATA chamber outside UC Health. Early access members receive 25% off at launch.
                </p>
              </div>
            </div>
          </GlassCard>
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
