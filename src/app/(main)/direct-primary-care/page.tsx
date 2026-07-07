"use client";

import { useState, useEffect, useRef } from "react";
import { submitDpcInquiry } from "@/lib/api";
import { clinicFacts, usd } from "@/lib/clinicFacts";
import { ACCENTS } from "@/lib/accents";
import { ServiceHero, gradientTextStyle } from "@/components/ServiceHero";
import { GlassCard } from "@/components/GlassCard";
import { Accordion } from "@/components/Accordion";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import {
  CheckCircle, Heart, Video, Clock, MessageCircle,
  Users, Shield, Droplets, Sparkles, Dumbbell, Scissors, Pill, FlaskConical,
  AlertTriangle
} from "lucide-react";
import { bookingUrl, hintLink } from "@/lib/bookingLinks";

const ACCENT = ACCENTS.dpc;

const MEET_GREET_URL = bookingUrl("meetGreet", "direct-primary-care");
const SIGNUP_URL = hintLink("dpcMembershipSignup", "direct-primary-care");

const includedBenefits = [
  { icon: Heart, title: "Unlimited Office Visits", description: "As many in-person appointments as you need with no copays, surprise bills, or limits. Your health, your schedule." },
  { icon: Video, title: "Telehealth Access", description: "Text, call, or video chat with your provider. Get care when you need it, not when insurance approves it." },
  { icon: Clock, title: "Urgent Care Services", description: "Same-day or next-day appointments for urgent concerns. No ER bills, no waiting rooms." },
  { icon: MessageCircle, title: "Direct Provider Communication", description: "Text Sarah or Logan directly with questions or concerns. Real relationships, not phone trees." },
  { icon: Users, title: "Comprehensive Care Coordination", description: "We manage your referrals, specialist communication, and ensure seamless care across all providers." },
  { icon: Shield, title: "Preventive & Wellness Care", description: "Annual physicals, health screenings, preventive counseling, and proactive wellness planning." },
];

const discountedServices = [
  { icon: Droplets, title: "Mobile IV Therapy", description: "Hydration and recovery treatments delivered to your location at member pricing." },
  { icon: Sparkles, title: "Prescription Skin Care", description: "Medical-grade skin treatments including tretinoin, custom anti-aging formulas, and acne management." },
  { icon: Dumbbell, title: "Health & Wellness Coaching", description: "Personalized nutrition guidance, fitness planning, stress management, and sustainable lifestyle changes." },
  { icon: Scissors, title: "Office Procedures", description: "Minor procedures, laceration repair, abscess I&D, wound care, and other in-office treatments at transparent, reduced rates." },
  { icon: Pill, title: "Prescription Medications", description: "Many common medications available at wholesale cost, often cheaper than insurance copays." },
  { icon: FlaskConical, title: "Precision Medicine & Labs", description: "Advanced testing, pharmacogenomic testing, and comprehensive diagnostics at member rates." },
];

const comparisonData = [
  { feature: "Appointment Length", dpc: "30+ minute focused visits", traditional: "Rushed 7-10 minute visits" },
  { feature: "Same-Day Access", dpc: "Same or next-day appointments", traditional: "Weeks of waiting for openings" },
  { feature: "Transparent Pricing", dpc: "Fixed monthly fee, no hidden costs", traditional: "Unpredictable bills and copays" },
  { feature: "Provider Relationship", dpc: "Consistent care from your dedicated team", traditional: "Different provider at each visit" },
  { feature: "Direct Communication", dpc: "Unlimited phone/text access to your provider", traditional: "Multiple gatekeepers and phone trees" },
];

const dpcFaqs = [
  {
    id: "what-is-dpc",
    question: "What is Direct Primary Care (DPC)?",
    answer: "Direct Primary Care is a membership-based model for primary care. Instead of billing insurance for every visit, you pay a flat monthly fee and get unlimited access to your provider — with no copays, no surprise bills, and no prior authorizations. It's primary care the way it should work: built around you, not around billing codes.",
  },
  {
    id: "dpc-vs-insurance",
    question: "How is DPC different from traditional insurance?",
    answer: "Insurance is designed to cover catastrophic costs — hospitalizations, surgeries, specialist care. DPC covers the other 80%: your everyday primary care. You pay a predictable monthly fee and get unlimited access to your provider. Many members pair DPC with a high-deductible or catastrophic plan for the things DPC doesn't cover, resulting in significantly lower overall healthcare spending.",
  },
  {
    id: "whats-included",
    question: "What's included in my membership?",
    answer: "Your CSHC Direct Primary Care membership includes unlimited office visits with no copays, telehealth and direct provider messaging, same-day or next-day urgent care appointments, comprehensive care coordination and referrals, annual physicals and preventive screenings, and access to discounted labs, medications, and additional services like IV therapy, precision medicine testing, and wellness coaching.",
  },
  {
    id: "pricing",
    question: "How much does membership cost?",
    answer: `Individual membership is ${usd(clinicFacts.dpc.individualMonthly)}/month. Couples are ${usd(clinicFacts.dpc.couplesMonthly)}/month. Families add ${usd(clinicFacts.dpc.childAddOnMonthly)}/month per child over age ${clinicFacts.dpc.childAgeMin}. There is a one-time ${usd(clinicFacts.dpc.registrationFee)} registration fee per household for new members. No contracts — cancel anytime.`,
  },
  {
    id: "still-need-insurance",
    question: "Do I still need insurance if I join CSHC DPC?",
    answer: "DPC is not insurance — it's a membership for primary care services. For hospitalizations, ER visits, surgery, and specialist care, you'll want some form of coverage. Many DPC members pair their membership with a high-deductible health plan (HDHP), catastrophic plan, or health-sharing ministry to keep overall costs low. We're happy to talk through options during your meet and greet.",
  },
  {
    id: "how-to-reach",
    question: "How do I reach my provider?",
    answer: "You can text, call, or video chat with Logan or Sarah directly. No phone trees, no nurse triages, no hold music. If you have a quick question, send a text and you'll hear back promptly — often within minutes during business hours.",
  },
  {
    id: "appointment-speed",
    question: "How quickly can I get an appointment?",
    answer: "Same-day or next-day for most concerns. For urgent issues, we work to get you seen or connected that day. No waiting 3 weeks to be seen for something you need addressed now.",
  },
  {
    id: "telehealth",
    question: "Do you offer telehealth?",
    answer: "Yes. Video and phone visits are available for most concerns and are included in your membership at no additional cost. We also do in-home and in-person visits throughout Colorado Springs. Choose what works best for you.",
  },
  {
    id: "chronic-conditions",
    question: "Can you manage my chronic conditions?",
    answer: "Absolutely. Managing chronic conditions — diabetes, hypertension, thyroid disease, anxiety, ADHD, and more — is one of the most important things we do. You get longer visits, more time to talk through your situation, and a provider who actually knows your history. This is primary care the way it was meant to be practiced.",
  },
  {
    id: "labs-meds",
    question: "How do labs and medications work?",
    answer: "Members get labs and medications at or near cost — often dramatically cheaper than insurance copays. We have access to wholesale pricing through our DPC network, so many generics cost just a few dollars per month. Labs are drawn through our discounted cash-pay partners, and we'll tell you exactly what things cost before you decide.",
  },
  {
    id: "specialist-hospital",
    question: "What if I need a specialist or hospital care?",
    answer: "We handle all care coordination, referrals, and communication with specialists. While specialist and hospital care falls outside your DPC membership, we make sure you get to the right place efficiently, your records are in order, and nothing falls through the cracks. We stay involved so you're not navigating the system alone.",
  },
  {
    id: "how-to-join",
    question: "How do I become a member?",
    answer: `The easiest first step is a free Meet & Greet with Logan or Sarah — a no-commitment conversation to see if CSHC DPC is the right fit for you. From there, enrollment is simple and handled through our online portal. You can also call or text us at ${clinicFacts.contact.phone} or email ${clinicFacts.contact.email} with any questions.`,
  },
];

function BenefitGrid({ items }: { items: { title: string; description: string }[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 pt-1">
      {items.map((benefit) => (
        <div
          key={benefit.title}
          className="rounded-lg p-4"
          style={{ background: "hsla(210,22%,25%,0.6)", borderLeft: `3px solid rgb(${ACCENT.rgb})` }}
        >
          <h4 className="font-semibold mb-1 text-base" style={{ color: `rgb(${ACCENT.rgb})` }}>{benefit.title}</h4>
          <p className="text-sm leading-relaxed" style={{ color: "hsl(210,25%,75%)" }}>{benefit.description}</p>
        </div>
      ))}
    </div>
  );
}

const inputStyle = { background: "hsla(210,22%,35%,0.6)", border: "1px solid hsla(255,255,255,0.2)" } as const;

export default function DirectPrimaryCare() {
  const [responseType, setResponseType] = useState("Email");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const datetimeRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (datetimeRef.current) {
      datetimeRef.current.value = new Date().toLocaleString();
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await submitDpcInquiry({
        firstName: String(formData.get("First Name") ?? ""),
        lastName: String(formData.get("Last Name") ?? ""),
        email: String(formData.get("Email") ?? ""),
        phone: String(formData.get("Phone Number") ?? ""),
        responseType,
        notes: String(formData.get("Notes") ?? ""),
        sourcePage: "/direct-primary-care",
      });
      setFormSubmitted(true);
      formRef.current?.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="sr-only">Direct Primary Care Colorado Springs — Unlimited Visits, No Copays, {usd(clinicFacts.dpc.individualMonthly)}/Month DPC Membership</h1>
      <ServiceHero
        service="dpc"
        eyebrow="Direct Primary Care · Now Enrolling"
        title="Your own doctor,"
        titleAccent={`${usd(clinicFacts.dpc.individualMonthly)}/month.`}
        subhead="Flat monthly fee. Unlimited access. Providers who actually know you. No copays, no surprise bills, no insurance games."
        ctas={[
          { label: "Schedule Your Free Meet & Greet", href: MEET_GREET_URL, external: true, variant: "primary" },
          { label: "See Pricing", href: "#pricing", variant: "ghost" },
        ]}
      />

      <div className="section-divider" />

      {/* Integrative Approach */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <GlassCard service="dpc" className="!p-8 lg:!p-10 text-center">
            <h2 className="text-2xl lg:text-3xl font-black mb-5 text-white">
              Our <span style={gradientTextStyle("dpc")}>Integrative Approach</span>
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "hsl(210,25%,78%)" }}>
              Integrative medicine combines evidence-based primary care with lifestyle, behavioral, and preventive strategies to address the whole person—not just isolated symptoms.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "hsl(210,25%,68%)" }}>
              We integrate traditional medical care with nutrition, movement, sleep, stress, and habit-based interventions when supported by evidence, always prioritizing safety, simplicity, and long-term health.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `rgb(${ACCENT.rgb})` }}>
              Your Membership
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              Comprehensive care, <span style={gradientTextStyle("dpc")}>no insurance hassles.</span>
            </h2>
          </div>
          <Accordion
            service="dpc"
            allowMultiple
            items={[
              { id: "included", question: "What's Included in Your Membership", answer: <BenefitGrid items={includedBenefits} /> },
              { id: "discounted", question: "Discounted Member Services", answer: <BenefitGrid items={discountedServices} /> },
            ]}
          />
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-black mb-10 text-center text-white">How We Compare</h2>
          <div
            className="rounded-3xl overflow-hidden"
            style={{ background: "hsla(210,22%,18%,0.9)", border: `1px solid rgba(${ACCENT.rgb},0.18)` }}
          >
            <div className="hidden md:grid grid-cols-3 p-5" style={{ background: "hsla(210,22%,25%,0.8)" }}>
              <div />
              <div className="text-center font-bold text-lg" style={{ color: `rgb(${ACCENT.rgb})` }}>Colorado Springs Health Collective</div>
              <div className="text-center font-bold text-lg" style={{ color: "hsl(0,0%,70%)" }}>Traditional Healthcare</div>
            </div>
            {comparisonData.map((row, index) => (
              <div
                key={row.feature}
                className="grid md:grid-cols-3 border-b"
                style={{ background: index % 2 === 0 ? "hsla(210,22%,22%,0.6)" : "hsla(210,22%,18%,0.6)", borderColor: "hsla(210,22%,30%,0.5)" }}
              >
                <div className="p-4 font-semibold" style={{ color: "hsl(0,0%,95%)" }}>{row.feature}</div>
                <div className="p-4 flex items-center gap-2" style={{ color: "hsl(210,40%,80%)" }}>
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: `rgb(${ACCENT.rgb})` }} />
                  {row.dpc}
                </div>
                <div className="p-4 flex items-center gap-2" style={{ color: "hsl(0,0%,55%)" }}>
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(0,0%,50%)" }} />
                  {row.traditional}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-black mb-10 text-center text-white">
            Transparent <span style={gradientTextStyle("dpc")}>Pricing</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Individual", desc: "Single member", price: usd(clinicFacts.dpc.individualMonthly), suffix: "/month", extra: null },
              { title: "Couples", desc: "2 individuals under the same household", price: usd(clinicFacts.dpc.couplesMonthly), suffix: "/month", extra: null },
              { title: "Family", desc: "Up to 6 members", price: `+${usd(clinicFacts.dpc.childAddOnMonthly)}`, suffix: "/child", extra: `over age ${clinicFacts.dpc.childAgeMin}` },
            ].map((plan) => (
              <GlassCard key={plan.title} service="dpc" className="text-center">
                <h3 className="text-lg font-bold mb-2" style={{ color: `rgb(${ACCENT.rgb})` }}>{plan.title}</h3>
                <p className="text-sm mb-4" style={{ color: "hsl(210,25%,70%)" }}>{plan.desc}</p>
                <div className="text-4xl font-black mb-1 text-white">
                  {plan.price}<span className="text-lg font-normal">{plan.suffix}</span>
                </div>
                {plan.extra && <p className="text-sm" style={{ color: "hsl(210,25%,65%)" }}>{plan.extra}</p>}
              </GlassCard>
            ))}
          </div>
          <p className="text-center text-sm mt-6" style={{ color: "hsl(210,25%,60%)" }}>
            One-time {usd(clinicFacts.dpc.registrationFee)} registration fee per household for new members.
          </p>
          <div className="text-center mt-8">
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wide hover:opacity-85 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`, color: "hsl(210,32%,10%)" }}
            >
              Become a Member
            </a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQ */}
      <section id="faq" className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `rgb(${ACCENT.rgb})` }}>
              DPC FAQ
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              Everything you need to know about <span style={gradientTextStyle("dpc")}>CSHC Direct Primary Care</span>
            </h2>
          </div>
          <Accordion service="dpc" items={dpcFaqs} />
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-8 lg:py-12">
        <div className="mx-auto max-w-2xl px-5 lg:px-8">
          <GlassCard service="dpc" className="!p-8 lg:!p-10">
            <h2 className="text-2xl font-black mb-2 text-center text-white">Have Questions First?</h2>
            <p className="text-center mb-6 text-sm" style={{ color: "hsl(210,25%,70%)" }}>
              Get answers about Direct Primary Care, our services, pricing, or anything else you&apos;d like to know.
            </p>
            {formSubmitted ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }}
                >
                  <CheckCircle className="w-8 h-8" style={{ color: "hsl(210,32%,10%)" }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: `rgb(${ACCENT.rgb})` }}>Message Sent Successfully!</h3>
                <p style={{ color: "hsl(210,25%,75%)" }}>We&apos;ll get back to you soon. Thank you for reaching out!</p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-6 px-6 py-2 rounded-full"
                  style={{ background: "hsla(210,22%,28%,0.75)", color: `rgb(${ACCENT.rgb})`, border: `1px solid rgba(${ACCENT.rgb},0.3)` }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
                <input type="hidden" name="Date and Time" ref={datetimeRef} />
                <input type="hidden" name="Status" value="DPC Page Inquiry" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>First Name *</label>
                    <input type="text" name="First Name" required className="w-full px-3 py-2 rounded-lg text-white" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>Last Name *</label>
                    <input type="text" name="Last Name" required className="w-full px-3 py-2 rounded-lg text-white" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>Email *</label>
                  <input type="email" name="Email" required className="w-full px-3 py-2 rounded-lg text-white" style={inputStyle} />
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>Phone Number (Optional)</label>
                  <input type="tel" name="Phone Number" className="w-full px-3 py-2 rounded-lg text-white" style={inputStyle} />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: "hsl(0,0%,92%)" }}>How would you prefer we respond?</label>
                  <div className="flex gap-6">
                    {["Email", "Phone"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="Response Type"
                          value={opt}
                          checked={responseType === opt}
                          onChange={() => setResponseType(opt)}
                          className="accent-blue-400"
                        />
                        <span style={{ color: "hsl(0,0%,85%)" }}>{opt === "Phone" ? "Phone Call" : opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>Your Questions</label>
                  <textarea name="Notes" rows={4} className="w-full px-3 py-2 rounded-lg text-white resize-none" style={inputStyle} />
                </div>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-4 rounded-full font-bold text-lg mt-6 disabled:opacity-50 hover:opacity-85 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`, color: "hsl(210,32%,10%)" }}
                >
                  {formSubmitting ? "Sending..." : "Send My Questions"}
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </section>

      <PageCtaFooter
        service="dpc"
        heading="Ready to meet your new care team?"
        body="Start with a free Meet & Greet — no commitment, no paperwork, just a conversation."
        primaryCta={{ label: "Schedule Your Free Meet & Greet", href: MEET_GREET_URL, external: true }}
        disclaimer="This website provides educational and informational content only. Nothing on this site constitutes medical advice, diagnosis, or treatment."
      />
    </div>
  );
}
