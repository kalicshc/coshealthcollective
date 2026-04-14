"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle, Mail, Building2, Users, Heart, Shield, ExternalLink, ArrowLeft } from "lucide-react";
import { submitEmployerInquiry } from "@/lib/api";

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

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/10";

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
      e.currentTarget.reset();
      setResponseType("Email");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-bg">
      <div className="container mx-auto px-5 lg:px-8 py-32">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))" }}>
              <Building2 className="w-12 h-12 lg:w-16 lg:h-16" style={{ color: "hsl(210, 32%, 12%)" }} />
            </div>
          </div>
          <span className="inline-block px-6 py-2 text-sm font-medium rounded-full mb-8" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}>
            For Employers
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "hsl(0, 0%, 100%)" }}>
            CSHC for Your Team
          </h1>
          <p className="text-xl lg:text-2xl font-light mb-4 max-w-3xl mx-auto" style={{ color: "hsl(210, 40%, 89%)" }}>
            Better healthcare access for your team. Better value for your business.
          </p>
          <p className="text-base mb-12 max-w-2xl mx-auto" style={{ color: "hsl(210, 25%, 65%)" }}>
            Colorado Springs Health Collective is building a full suite of health services — starting with Direct Primary Care and expanding to hormone optimization and hyperbaric recovery. Offer your employees access to one or all three.
          </p>
          <button
            onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg"
            style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(45, 90%, 60%))", color: "hsl(210, 32%, 12%)" }}
          >
            <Mail className="w-5 h-5" /> Get Started
          </button>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="w-8 h-8" style={{ color: "hsl(177, 70%, 65%)" }} />
              <h2 className="text-3xl font-bold" style={{ color: "hsl(177, 70%, 65%)" }}>DPC Membership for Your Team</h2>
            </div>
            <p className="text-lg text-center mb-6" style={{ color: "hsl(0, 0%, 92%)" }}>
              Whether your employees already have their own high-deductible plan, health share coverage, or no insurance at all—DPC membership gives them direct access to quality primary care.
            </p>
            <div className="rounded-2xl p-6 mb-8 text-center" style={{ background: "linear-gradient(135deg, hsla(177, 70%, 59%, 0.15), hsla(45, 90%, 60%, 0.15))", border: "2px solid hsl(177, 70%, 59%)" }}>
              <p className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: "hsl(45, 90%, 60%)" }}>15% Group Discount</p>
              <p style={{ color: "hsl(0, 0%, 85%)" }}>When you enroll all employees as a company benefit</p>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: "hsl(0, 0%, 100%)" }}>Why offer DPC to your team?</h3>
            <div className="space-y-3">
              {dpcBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(177, 70%, 65%)" }} />
                  <span style={{ color: "hsl(0, 0%, 92%)" }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>Need Coverage Too?</h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: "hsl(210, 40%, 89%)" }}>
            We recommend everyone carry some type of catastrophic coverage for major events. Here are two options we can help coordinate:
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-16 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl p-8 flex flex-col" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8" style={{ color: "hsl(330, 70%, 65%)" }} />
              <h3 className="text-2xl font-bold" style={{ color: "hsl(330, 70%, 65%)" }}>Zion Health Share</h3>
            </div>
            <p className="text-sm font-medium mb-4" style={{ color: "hsl(45, 90%, 60%)" }}>Plans starting at $84/month</p>
            <p className="mb-6 leading-relaxed flex-grow" style={{ color: "hsl(0, 0%, 85%)" }}>
              A health share is a community of members who share medical expenses together. It&apos;s not insurance, but provides affordable catastrophic coverage for hospital visits, surgeries, and major medical events.
            </p>
            <a href="https://zionhealthshare.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity" style={{ color: "hsl(330, 70%, 65%)" }}>
              Learn more about Zion Health Share <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="rounded-3xl p-8 flex flex-col" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8" style={{ color: "hsl(200, 70%, 65%)" }} />
              <h3 className="text-2xl font-bold" style={{ color: "hsl(200, 70%, 65%)" }}>Virtuous Benefits</h3>
            </div>
            <p className="text-sm font-medium mb-4" style={{ color: "hsl(45, 90%, 60%)" }}>ACA-Compliant Group Coverage</p>
            <p className="mb-6 leading-relaxed flex-grow" style={{ color: "hsl(0, 0%, 85%)" }}>
              Full ACA-compliant health insurance bundled with DPC membership. Virtuous negotiates transparent pricing on labs, imaging, specialists, and hospital care—giving your team comprehensive coverage with cost predictability.
            </p>
            <a href="https://virtuousbenefits.care/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity" style={{ color: "hsl(200, 70%, 65%)" }}>
              Learn more about Virtuous Benefits <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-16 text-center">
          <p className="text-sm italic" style={{ color: "hsl(210, 25%, 69%)" }}>
            Note: DPC is not insurance. It covers your everyday primary care needs. For hospital stays, emergencies, and specialty care, we recommend pairing DPC with one of the coverage options above.
          </p>
        </div>

        <div id="contact-form" className="max-w-2xl mx-auto mb-16">
          <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
            <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: "hsl(177, 70%, 65%)" }}>Request More Information</h2>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(140, 60%, 55%))" }}>
                  <CheckCircle className="w-8 h-8" style={{ color: "hsl(210, 32%, 12%)" }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "hsl(177, 70%, 65%)" }}>Message Sent Successfully!</h3>
                <p style={{ color: "hsl(0, 0%, 85%)" }}>We&apos;ll get back to you soon. Thank you for reaching out!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1" style={{ color: "hsl(0, 0%, 92%)" }}>First Name *</label>
                    <input type="text" name="First Name" required placeholder="John" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: "hsl(0, 0%, 92%)" }}>Last Name *</label>
                    <input type="text" name="Last Name" required placeholder="Smith" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: "hsl(0, 0%, 92%)" }}>Email *</label>
                  <input type="email" name="Email" required placeholder="john@company.com" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: "hsl(0, 0%, 92%)" }}>Phone Number (Optional)</label>
                  <input type="tel" name="Phone Number" placeholder="(719) 555-1234" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "hsl(0, 0%, 92%)" }}>How would you prefer we respond?</label>
                  <div className="flex gap-6">
                    {["Email", "Phone"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer" style={{ color: "hsl(0, 0%, 85%)" }}>
                        <input type="radio" name="response" value={opt} checked={responseType === opt} onChange={() => setResponseType(opt)} className="accent-teal-500" />
                        {opt === "Phone" ? "Phone Call" : opt}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: "hsl(0, 0%, 92%)" }}>Your Questions</label>
                  <textarea name="Notes" rows={4} placeholder="Tell us about your business and what you're looking for..." className={`${inputClass} resize-none`} />
                </div>
                {error && <p className="text-sm text-red-300">{error}</p>}
                <button type="submit" disabled={submitting} className="w-full py-4 rounded-full font-semibold text-lg mt-6 disabled:opacity-60" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}>
                  {submitting ? "Sending..." : "Send My Questions"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Coming Soon for Teams */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.75)", border: "1px solid hsla(177, 70%, 59%, 0.2)" }}>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center" style={{ color: "hsl(177, 70%, 65%)" }}>
              More CSHC Benefits Coming for Teams
            </h2>
            <p className="text-center mb-8" style={{ color: "hsl(0, 0%, 85%)" }}>
              As we expand, we&apos;re building employer options across all three CSHC divisions. Get on the early access list for:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6" style={{ background: "hsla(280, 22%, 22%, 0.6)", border: "1px solid hsla(280, 70%, 65%, 0.2)" }}>
                <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: "hsl(280, 70%, 70%)" }}>Coming Soon</span>
                <h3 className="font-bold text-lg mb-2" style={{ color: "hsl(280, 70%, 80%)" }}>CSHC Hormone &amp; Weight Loss Clinic</h3>
                <p className="text-sm" style={{ color: "hsl(0, 0%, 75%)" }}>
                  Group pricing for hormone optimization and GLP-1 weight loss programs for employees and their spouses.
                </p>
              </div>
              <div className="rounded-2xl p-6" style={{ background: "hsla(177, 22%, 22%, 0.6)", border: "1px solid hsla(177, 70%, 59%, 0.2)" }}>
                <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: "hsl(177, 70%, 65%)" }}>Opening Summer 2026</span>
                <h3 className="font-bold text-lg mb-2" style={{ color: "hsl(177, 70%, 75%)" }}>CSHC Hyperbaric</h3>
                <p className="text-sm" style={{ color: "hsl(0, 0%, 75%)" }}>
                  Corporate packages for hyperbaric oxygen therapy at Colorado Springs&apos; only 2.0 ATA chamber outside UC Health. Early access members receive 25% off at launch.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider mb-16" />

        <div className="text-center pb-16">
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}>
            <ArrowLeft className="w-5 h-5" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
