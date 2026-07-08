import { clinicFacts, usd } from "@/lib/clinicFacts";
import { ACCENTS } from "@/lib/accents";
import { serviceSchema, faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { hintLink } from "@/lib/bookingLinks";
import { SceneSection, Eyebrow, SCENE_H, SCENE_P } from "@/components/SceneSection";
import { CoPrimaryCtas } from "@/components/CoPrimaryCtas";
import { StickyCtaBar } from "@/components/StickyCtaBar";
import { ReviewStrip, RatingChip } from "@/components/ReviewStrip";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { SectionView } from "@/components/analytics/SectionView";
import { Accordion } from "@/components/Accordion";
import { GlassCard } from "@/components/GlassCard";
import { DpcInquiryForm } from "@/components/DpcInquiryForm";
import {
  CheckCircle, Heart, Video, Clock, MessageCircle,
  Users, Shield, Droplets, Sparkles, Dumbbell, Scissors, Pill, FlaskConical,
  AlertTriangle
} from "lucide-react";

// The DPC "epic page" — conversion arc: the problem with primary care →
// what a membership actually is → proof → pricing → objections → action.
// Full-bleed photo scenes (womens-health language); accents from ACCENTS.dpc.

const PAGE = "direct-primary-care";
const ACCENT = ACCENTS.dpc;

// Lighter blues than ACCENT.from/to — hand-tuned for gradient-clipped
// headlines sitting on dark photos (same approach as the women's fuchsia).
const blueLight = "hsl(198,100%,76%)";
const blueDeep = "hsl(215,95%,66%)";

const EYEBROW = "hsla(205,95%,82%,0.85)";

const DPC_PRIMARY = { label: "Book a Free Meet & Greet", appt: "meetGreet" as const };
const DPC_SECONDARY = { label: "See Pricing", href: "#pricing" };

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

function DpcCtas({ source, size, align }: { source: string; size?: "md" | "lg"; align?: "center" | "left" }) {
  return (
    <CoPrimaryCtas
      service="dpc"
      source={source}
      primary={DPC_PRIMARY}
      secondary={DPC_SECONDARY}
      size={size}
      align={align}
    />
  );
}

const dpcSchema = serviceSchema({
  type: "Service",
  name: "Direct Primary Care Membership",
  description:
    "CSHC Direct Primary Care in Colorado Springs — $100/month for unlimited visits, same-day access, no copays, and labs at cost. Real primary care without insurance red tape.",
  path: "/direct-primary-care",
  image: "/images/dpc/dpc-hero.webp",
  offers: [
    { name: "Individual membership (per month)", price: clinicFacts.dpc.individualMonthly },
    { name: "Couples membership (per month)", price: clinicFacts.dpc.couplesMonthly },
    { name: `Child add-on, age ${clinicFacts.dpc.childAgeMin}+ (per month)`, price: clinicFacts.dpc.childAddOnMonthly },
    { name: "One-time registration fee (per household)", price: clinicFacts.dpc.registrationFee },
  ],
});

const dpcFaqSchema = faqSchema(dpcFaqs.map(({ question, answer }) => ({ question, answer })));

export default function DirectPrimaryCare() {
  return (
    <div className="pb-20 lg:pb-0">
      <JsonLd data={dpcSchema} />
      <JsonLd data={dpcFaqSchema} />
      <h1 className="sr-only">Direct Primary Care Colorado Springs — Unlimited Visits, No Copays, {usd(clinicFacts.dpc.individualMonthly)}/Month DPC Membership</h1>

      {/* ── 1. CINEMATIC HERO ─────────────────────────────────────────── */}
      <SceneSection image="/images/dpc/dpc-hero.webp" scrim="hero" minHeight="100svh" priority maxWidthClassName="max-w-7xl" scrollCue="#why">
        <div className="max-w-3xl pt-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]" style={{ border: `1px solid rgba(${ACCENT.rgb},0.3)`, background: `rgba(${ACCENT.rgb},0.12)`, color: "hsl(220,95%,88%)" }}>
              Direct Primary Care · Now Enrolling
            </span>
            <RatingChip service="dpc" source="dpc-hero" />
          </div>
          <p
            aria-hidden="true"
            className="mt-8 text-4xl font-bold text-white lg:text-6xl"
            style={{ textShadow: "0 10px 34px rgba(0,0,0,0.42)", lineHeight: 1.1 }}
          >
            Your own provider,
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
              {usd(clinicFacts.dpc.individualMonthly)}/month.
            </span>
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white" style={{ textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}>
            Flat monthly fee. Unlimited access. Providers who actually know you. No copays, no surprise
            bills, no insurance games.
          </p>
          <div className="mt-9">
            <DpcCtas source="dpc-hero" size="lg" align="left" />
          </div>
        </div>
      </SceneSection>

      {/* ── 2. VALIDATION — primary care is broken ────────────────────── */}
      <section id="why" className="scroll-mt-20 py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Eyebrow color={EYEBROW}>Sound familiar?</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
                Primary care is broken. You&apos;ve felt it.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                Seven-minute visits. Weeks of waiting. Phone trees, copays, and a different face every time.
                None of that is your provider&apos;s fault — it&apos;s the insurance-billing machine they work
                inside. Direct Primary Care removes the machine.
              </p>
            </div>
            <div className="service-card-transparent rounded-[28px] p-6 lg:p-8">
              <div className="grid grid-cols-2 gap-x-6 text-xs font-bold uppercase tracking-wider" style={{ color: `rgb(${ACCENT.rgb})` }}>
                <span>With CSHC DPC</span>
                <span>Traditional healthcare</span>
              </div>
              <div className="mt-3 divide-y divide-white/10">
                {comparisonData.map((row) => (
                  <div key={row.feature} className="py-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{row.feature}</p>
                    <div className="mt-1.5 grid grid-cols-2 gap-x-6 text-sm">
                      <span className="flex items-start gap-2 text-white">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: `rgb(${ACCENT.rgb})` }} />
                        {row.dpc}
                      </span>
                      <span className="flex items-start gap-2 text-slate-400">
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "hsl(0,0%,50%)" }} />
                        {row.traditional}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FULL-BLEED SCENE — what a membership actually is ───────── */}
      <SectionView analytics={{ page: PAGE, label: "membership", service: "dpc" }}>
        <SceneSection image="/images/dpc/dpc-membership.webp" scrim="side">
          <Eyebrow color={EYEBROW}>Your Membership</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
            One flat fee. Your whole primary care life, handled.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
            Integrative medicine combines evidence-based primary care with lifestyle, behavioral, and
            preventive strategies to address the whole person — not just isolated symptoms. We integrate
            traditional medical care with nutrition, movement, sleep, stress, and habit-based interventions
            when supported by evidence.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {includedBenefits.map((benefit) => (
              <div key={benefit.title} className="rounded-[20px] border border-white/10 bg-slate-950/70 p-5" style={{ backdropFilter: "blur(8px)" }}>
                <benefit.icon className="h-6 w-6" style={{ color: `rgb(${ACCENT.rgb})` }} />
                <h3 className="mt-3 text-lg font-bold text-white">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </SceneSection>
      </SectionView>

      {/* ── 4. MEMBER PERKS — discounted services ─────────────────────── */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="mb-10 text-center">
            <Eyebrow color={EYEBROW}>Beyond the basics</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Member pricing on the extras
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {discountedServices.map((service) => (
              <GlassCard key={service.title} service="dpc">
                <service.icon className="h-6 w-6" style={{ color: `rgb(${ACCENT.rgb})` }} />
                <h3 className="mt-3 text-lg font-bold text-white">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{service.description}</p>
              </GlassCard>
            ))}
          </div>
          <div className="mt-10">
            <DpcCtas source="dpc-perks" />
          </div>
        </div>
      </section>

      {/* ── 5. PRICING ────────────────────────────────────────────────── */}
      <section id="pricing" className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8"><div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <Eyebrow color={EYEBROW}>Pricing</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Transparent pricing. No contracts.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              One flat monthly fee covers your membership. Labs and medications are offered at or near cost.
              Cancel anytime.
            </p>
          </div>

          <div
            className="rounded-[34px] border p-8 lg:p-10"
            style={{
              borderColor: `rgba(${ACCENT.rgb},0.22)`,
              background: `linear-gradient(135deg, rgba(${ACCENT.rgb},0.14), hsla(238,90%,48%,0.16), hsla(210,22%,16%,0.72))`,
              boxShadow: "0 24px 80px rgba(7,10,18,0.32)",
            }}
          >
            <div className="h-0.5 w-16 rounded-full" style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }} />
            <h3 className="mt-6 text-2xl font-black text-white">CSHC Direct Primary Care</h3>
            <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-3">
              <div>
                <span className="text-4xl font-black text-white">{usd(clinicFacts.dpc.individualMonthly)}</span>
                <span className="ml-2 text-sm text-slate-400">/mo individual</span>
              </div>
              <div>
                <span className="text-4xl font-black text-white">{usd(clinicFacts.dpc.couplesMonthly)}</span>
                <span className="ml-2 text-sm text-slate-400">/mo couples</span>
              </div>
              <div>
                <span className="text-4xl font-black text-white">+{usd(clinicFacts.dpc.childAddOnMonthly)}</span>
                <span className="ml-2 text-sm text-slate-400">/mo per child over {clinicFacts.dpc.childAgeMin}</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              One-time {usd(clinicFacts.dpc.registrationFee)} registration fee per household for new members.
              Membership includes everything below — no copays, no per-visit charges, no surprises.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {includedBenefits.map((benefit) => (
                <p key={benefit.title} className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-sm text-slate-200">
                  {benefit.title}
                </p>
              ))}
            </div>
            <div className="mt-8 text-center">
              <TrackedLink
                href={hintLink("dpcMembershipSignup", "dpc-pricing")}
                analytics={{ page: PAGE, source: "dpc-pricing", service: "dpc", label: "Become a Member" }}
                className="inline-block rounded-full px-10 py-4 text-sm font-bold uppercase tracking-wide hover:opacity-85 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`, color: "#fff" }}
              >
                Become a Member
              </TrackedLink>
            </div>
          </div>

          <div className="mt-10">
            <DpcCtas source="dpc-pricing-ctas" />
          </div>
        </div>
      </div>
      </section>

      {/* ── 6. OBJECTIONS — the questions everyone actually has ───────── */}
      <section id="faq" className="py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 lg:px-8"><div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <Eyebrow color={EYEBROW}>DPC FAQ</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Everything you need to know
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              Straight answers about how membership works, what it costs, and whether it fits your situation.
            </p>
          </div>
          <Accordion service="dpc" items={dpcFaqs} />
        </div>
      </div>
      </section>

      {/* ── 7. FULL-BLEED SCENE — social proof ────────────────────────── */}
      <SceneSection image="/images/dpc/dpc-membership.webp" scrim="radial" contentClassName="text-center">
        <div className="mb-8">
          <Eyebrow color={EYEBROW}>What patients say</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
            Care from people who know your name
          </h2>
        </div>
        <ReviewStrip variant="grid" count={3} service="dpc" source="dpc-reviews" />
        <div className="mt-8">
          <DpcCtas source="dpc-reviews" />
        </div>
      </SceneSection>

      {/* ── 8. QUESTIONS FORM ─────────────────────────────────────────── */}
      <section id="contact" className="py-14 lg:py-20">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          <DpcInquiryForm source="dpc-inquiry" />
        </div>
      </section>

      {/* ── 9. FULL-BLEED SCENE — final action ────────────────────────── */}
      <SceneSection image="/images/dpc/dpc-final.webp" scrim="radial" minHeight="80vh" contentClassName="text-center">
        <Eyebrow color={EYEBROW}>Start Here</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl" style={{ textShadow: SCENE_H }}>
          Ready to meet your new care team?
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/95" style={{ textShadow: SCENE_P }}>
          Start with a free Meet &amp; Greet — no commitment, no paperwork, just a conversation about
          whether this is the right fit for you.
        </p>
        <div className="mt-8">
          <DpcCtas source="dpc-final" size="lg" />
        </div>
        <p className="mt-8 text-sm" style={{ color: "hsl(210,25%,70%)", textShadow: SCENE_P }}>
          Call or text{" "}
          <a href={`tel:${clinicFacts.contact.phoneTel}`} className="font-semibold" style={{ color: `rgb(${ACCENT.rgb})` }}>
            {clinicFacts.contact.phone}
          </a>{" "}
          · Email{" "}
          <a href={`mailto:${clinicFacts.contact.email}`} className="font-semibold" style={{ color: `rgb(${ACCENT.rgb})` }}>
            {clinicFacts.contact.email}
          </a>
        </p>
        <p className="mx-auto mt-6 max-w-xl text-xs leading-5" style={{ color: "hsl(210,20%,55%)", textShadow: SCENE_P }}>
          This website provides educational and informational content only. Nothing on this site constitutes
          medical advice, diagnosis, or treatment.
        </p>
      </SceneSection>

      <StickyCtaBar
        service="dpc"
        source="dpc"
        appt="meetGreet"
        bookLabel="Free Meet & Greet"
        secondaryHref="#pricing"
        secondaryLabel="Pricing"
      />
    </div>
  );
}
