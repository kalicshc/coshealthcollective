import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { ACCENTS } from "@/lib/accents";
import { ServiceHero, gradientTextStyle } from "@/components/ServiceHero";
import { GlassCard } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { ReviewStrip } from "@/components/ReviewStrip";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { bookingUrl } from "@/lib/bookingLinks";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "Meet Your Healthcare Team | Colorado Springs Health Collective",
  description: "Meet Sarah Crist ARNP and Logan Crist PA-C, the founders behind Colorado Springs Health Collective — building CSHC Direct Primary Care, CSHC Hormone & Weight Loss Clinic, and CSHC Hyperbaric.",
  keywords: "Sarah Crist nurse practitioner, Logan Crist physician assistant, Colorado Springs DPC providers, healthcare team Colorado Springs",
};

const ACCENT = ACCENTS.brand;

// Both founder cards share this identical frame so the pair reads as a set.
// TODO(Logan): supply a photo of Sarah (same rough crop as logan-photo) and
// swap the initials tile below for an <Image> matching Logan's.
function PortraitFrame({ children }: { children: React.ReactNode }) {
  return <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6">{children}</div>;
}

export default function About() {
  return (
    <div>
      <ServiceHero
        service="brand"
        eyebrow="The Founders"
        title="Meet Your"
        titleAccent="Healthcare Team"
        subhead="Board-certified providers who believe healthcare should be personal, accessible, and focused on you."
      />

      <div className="section-divider" />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sarah */}
            <GlassCard service="brand" className="!p-8">
              <PortraitFrame>
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{ background: "linear-gradient(135deg, hsl(280,70%,45%), hsl(320,70%,45%))" }}
                >
                  <span className="text-7xl font-black" style={{ color: "hsla(0,0%,100%,0.9)" }}>SC</span>
                </div>
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

      <div className="section-divider" />

      {/* Vision */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `rgb(${ACCENT.rgb})` }}>
            Our Vision
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">
            A full health campus, <span style={gradientTextStyle("brand")}>built for aging well.</span>
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "hsl(210,25%,72%)" }}>
            We started with Direct Primary Care because it was the fastest way to make a difference — care that&apos;s built
            around people, not billing codes. Now we&apos;re building the rest of the campus. CSHC Hormone &amp; Weight Loss
            Clinic brings hormone optimization and GLP-1 therapy to patients who&apos;ve been dismissed or underserved.
            CSHC Hyperbaric is launching Summer 2026 as Colorado Springs&apos; only accessible 2.0 ATA hyperbaric chamber
            outside of UC Health.
          </p>
          <p className="text-base leading-relaxed" style={{ color: "hsl(210,25%,72%)" }}>
            Our goal is a full health campus where primary care, hormone optimization, and hyperbaric recovery work together
            under one roof — coordinated, affordable, and built for people who want to age well.
          </p>
        </div>
      </section>

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
