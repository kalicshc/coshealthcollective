import type { Metadata } from "next";
import { CheckCircle, Users, Heart, Activity } from "lucide-react";
import { ACCENTS } from "@/lib/accents";
import { ServiceHero, gradientTextStyle } from "@/components/ServiceHero";
import { GlassCard } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { bookingUrl } from "@/lib/bookingLinks";

export const metadata: Metadata = {
  alternates: { canonical: "/partner-network" },
  title: "Cash Pay Partner Network | Colorado Springs Health Collective",
  description: "Trusted healthcare providers in Colorado Springs offering transparent cash-pay pricing. Physical therapy, occupational therapy, injury recovery, cardiac testing. No insurance surprises.",
  keywords: "cash pay healthcare Colorado Springs, transparent pricing medical, physical therapy cash pay, occupational therapy, cardiac testing Colorado Springs, injury recovery",
};

const MEET_GREET_URL = bookingUrl("meetGreet", "partner-network");
const ACCENT = ACCENTS.brand;

const partnerCategories = [
  { id: "physical-therapy", title: "Physical Therapy", icon: Activity, description: "Hands-on rehabilitation for injury recovery, post-surgical care, chronic pain, and mobility improvement." },
  { id: "occupational-therapy", title: "Occupational Therapy", icon: Users, description: "Specialized therapy to help you regain independence in daily activities after injury, illness, or surgery." },
  { id: "injury-recovery", title: "Injury Recovery & Sports Rehab", icon: Heart, description: "Specialized personal training focused on recovering from injuries and returning to peak performance safely." },
  { id: "cardiac-testing", title: "Advanced Cardiac Testing", icon: Activity, description: "Comprehensive cardiac evaluation including stress testing, advanced imaging, and risk assessment beyond standard labs." },
];

const whyNetwork = [
  { label: "Personally Vetted", desc: "We know these providers and trust their quality of care" },
  { label: "Transparent Pricing", desc: "Know the cost before you commit—no surprise bills" },
  { label: "Coordinated Care", desc: "We help connect you and follow up on your care" },
];

export default function PartnerNetwork() {
  return (
    <div>
      <ServiceHero
        service="brand"
        eyebrow="Vetted · Transparent · Coordinated"
        title="Cash Pay"
        titleAccent="Partner Network"
        subhead="Trusted providers we've personally vetted who offer fair, transparent pricing. No insurance surprises — know exactly what you'll pay before your visit."
        ctas={[
          { label: "Book a Free Meet & Greet", href: MEET_GREET_URL, external: true, variant: "primary" },
          { label: "Learn About DPC Membership", href: "/direct-primary-care", variant: "ghost" },
        ]}
      />

      <div className="section-divider" />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <GlassCard service="brand" className="!p-8 lg:!p-10">
            <h2 className="text-2xl lg:text-3xl font-black mb-6 text-center text-white">
              Why a <span style={gradientTextStyle("brand")}>Partner Network?</span>
            </h2>
            <p className="text-base leading-relaxed mb-8 text-center" style={{ color: "hsl(210,25%,78%)" }}>
              Healthcare shouldn&apos;t be a mystery. Too often, patients are surprised by bills they didn&apos;t
              expect—even with insurance. Our partner network connects you with providers who share our commitment
              to <strong style={{ color: `rgb(${ACCENT.rgb})` }}>transparent, upfront pricing</strong>.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {whyNetwork.map((item) => (
                <div key={item.label} className="text-center">
                  <CheckCircle className="w-7 h-7 mx-auto mb-3" style={{ color: `rgb(${ACCENT.rgb})` }} />
                  <h3 className="font-semibold mb-2 text-white">{item.label}</h3>
                  <p className="text-sm" style={{ color: "hsl(210,25%,72%)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-black mb-8 text-center text-white">
            Partner <span style={gradientTextStyle("brand")}>Categories</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {partnerCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <GlassCard key={cat.id} service="brand">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: "hsl(210,32%,10%)" }} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold mb-2 text-white">{cat.title}</h3>
                      <p className="text-sm" style={{ color: "hsl(210,25%,72%)" }}>{cat.description}</p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
          <div
            className="mt-8 rounded-2xl p-6 text-center"
            style={{ background: `rgba(${ACCENT.rgb},0.08)`, border: `1px dashed rgba(${ACCENT.rgb},0.4)` }}
          >
            <p className="text-base" style={{ color: `rgb(${ACCENT.rgb})` }}>We&apos;re always growing our network of trusted partners.</p>
            <p className="text-sm mt-2" style={{ color: "hsl(210,25%,70%)" }}>Know a great provider who offers transparent pricing? Let us know.</p>
          </div>
        </div>
      </section>

      <PageCtaFooter
        service="brand"
        heading="Want a referral?"
        body="Learn more about our partner network or get connected — schedule a free meet and greet."
        primaryCta={{ label: "Book a Free Meet & Greet", href: MEET_GREET_URL, external: true }}
      />
    </div>
  );
}
