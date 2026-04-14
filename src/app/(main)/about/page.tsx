import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, CheckCircle } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Meet Your Healthcare Team | Colorado Springs Health Collective",
  description: "Meet Sarah Crist ARNP and Logan Crist PA-C, the founders behind Colorado Springs Health Collective — building CSHC Direct Primary Care, CSHC Hormone & Weight Loss Clinic, and CSHC Hyperbaric.",
  keywords: "Sarah Crist nurse practitioner, Logan Crist physician assistant, Colorado Springs DPC providers, healthcare team Colorado Springs",
};

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

export default function About() {
  return (
    <div className="min-h-screen">
      <section
        className="hero-overlay relative min-h-screen flex items-center justify-center"
        style={{ background: "transparent" }}
      >
        <div className="container mx-auto px-5 lg:px-8 z-10 py-32 pt-40">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span style={{ color: "hsl(0, 0%, 100%)" }}>Meet Your </span>
              <span style={{ color: "hsl(177, 70%, 65%)" }}>Healthcare Team</span>
            </h1>
            <p className="text-xl lg:text-2xl font-light mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: "hsl(210, 40%, 89%)" }}>
              Board-certified providers who believe healthcare should be personal, accessible, and focused on you.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Sarah */}
              <div className="rounded-3xl p-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto"
                  style={{ background: "linear-gradient(135deg, hsl(280, 70%, 65%), hsl(320, 70%, 65%))" }}
                >
                  <span className="text-3xl font-bold" style={{ color: "hsl(210, 32%, 12%)" }}>SC</span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: "hsl(177, 70%, 65%)" }}>
                  Sarah Crist, MSN, APRN, FNP-C, AGACNP-BC
                </h3>
                <p className="text-center font-semibold mb-6" style={{ color: "hsl(280, 70%, 75%)" }}>
                  Co-Owner | Family Nurse Practitioner
                </p>
                <p className="leading-relaxed text-center" style={{ color: "hsl(0, 0%, 85%)" }}>
                  Colorado State University Pueblo graduate with 9 years of nursing excellence and 5 years as a board-certified
                  family nurse practitioner specializing in internal medicine. She takes time to understand each patient&apos;s unique
                  circumstances and health goals, building strong provider-patient relationships that empower individuals to take
                  control of their health through evidence-based care and comprehensive wellness strategies.
                </p>
              </div>

              {/* Logan */}
              <div className="rounded-3xl p-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6">
                  <img
                    src="/logan-photo.png"
                    alt="Logan Crist, PA-C with the Colorado Springs Health Collective mobile care vehicle"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "55% 15%" }}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: "hsl(177, 70%, 65%)" }}>
                  Logan Crist, PA-C
                </h3>
                <p className="text-center font-semibold mb-6" style={{ color: "hsl(177, 70%, 75%)" }}>
                  Co-Owner | Physician Assistant
                </p>
                <p className="leading-relaxed text-center mb-6" style={{ color: "hsl(0, 0%, 85%)" }}>
                  University of Dayton graduate with 9 years of clinical experience in emergency medicine, internal medicine,
                  and urgent care. His approach combines targeted medication management to treat underlying conditions with
                  comprehensive wellness interventions, with the goal of optimizing health metrics and helping patients reduce
                  or eliminate medications while achieving their personal wellness goals.
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://www.linkedin.com/in/loganmcrist/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
                    style={{ background: "hsla(210, 90%, 40%, 0.12)", border: "1px solid hsla(210, 90%, 50%, 0.3)" }}
                  >
                    <div className="relative flex-shrink-0">
                      <FaLinkedin className="w-5 h-5" style={{ color: "#0A66C2" }} />
                      <CheckCircle
                        className="absolute -bottom-1 -right-1 w-3 h-3"
                        style={{ color: "hsl(177, 70%, 55%)", background: "hsl(210, 32%, 28%)", borderRadius: "50%" }}
                      />
                    </div>
                    <span className="text-sm font-semibold" style={{ color: "hsl(210, 80%, 75%)" }}>
                      Connect on LinkedIn
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: "hsl(177, 70%, 65%)" }}>
                Our Vision
              </h2>
              <p className="text-lg leading-relaxed mb-6 text-center" style={{ color: "hsl(0, 0%, 92%)" }}>
                We started with Direct Primary Care because it was the fastest way to make a difference — care that&apos;s built
                around people, not billing codes. Now we&apos;re building the rest of the campus. CSHC Hormone &amp; Weight Loss
                Clinic brings hormone optimization and GLP-1 therapy to patients who&apos;ve been dismissed or underserved.
                CSHC Hyperbaric is launching Summer 2026 as Colorado Springs&apos; only accessible 2.0 ATA hyperbaric chamber
                outside of UC Health.
              </p>
              <p className="text-lg leading-relaxed text-center" style={{ color: "hsl(0, 0%, 85%)" }}>
                Our goal is a full health campus where primary care, hormone optimization, and hyperbaric recovery work together
                under one roof — coordinated, affordable, and built for people who want to age well.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="rounded-3xl p-8 lg:p-10 text-center" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
                Ready to Experience Healthcare Differently?
              </h2>
              <p className="mb-6" style={{ color: "hsl(0, 0%, 85%)" }}>
                Start with a free Meet &amp; Greet with Logan or Sarah. No commitment, no paperwork — just a conversation to see if CSHC is the right fit for your goals.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={MEET_GREET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 rounded-full font-semibold text-lg"
                  style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}
                >
                  Book a Free Meet &amp; Greet
                </a>
                <Link
                  href="/services"
                  className="inline-block px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/5 transition-colors"
                  style={{ color: "hsl(210, 40%, 89%)" }}
                >
                  View All Services
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
              <a href="tel:+17198244716" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone className="w-5 h-5" style={{ color: "hsl(177, 70%, 59%)" }} />
                <span style={{ color: "hsl(0, 0%, 92%)" }}>(719) 824-4716</span>
              </a>
              <a href="mailto:dpc@coshealthcollective.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Mail className="w-5 h-5" style={{ color: "hsl(177, 70%, 59%)" }} />
                <span style={{ color: "hsl(0, 0%, 92%)" }}>dpc@coshealthcollective.com</span>
              </a>
            </div>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Link href="/direct-primary-care" className="hover:opacity-80 transition-opacity" style={{ color: "hsl(177, 70%, 59%)" }}>
                Direct Primary Care
              </Link>
              <span style={{ color: "hsl(0, 0%, 50%)" }}>|</span>
              <Link href="/faq" className="hover:opacity-80 transition-opacity" style={{ color: "hsl(177, 70%, 59%)" }}>
                FAQ
              </Link>
              <span style={{ color: "hsl(0, 0%, 50%)" }}>|</span>
              <Link href="/blog" className="hover:opacity-80 transition-opacity" style={{ color: "hsl(177, 70%, 59%)" }}>
                Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
