import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A La Carte Services | Colorado Springs Health Collective",
  description: "Transparent cash-pay services from Colorado Springs Health Collective. No membership required for individual visits and select services.",
};

const MEET_GREET_URL =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

const services = [
  {
    name: "Telehealth Visit",
    price: "$85",
    note: "Video or phone visit for acute concerns, medication questions, follow-ups, and care guidance.",
    tag: "No membership required",
  },
  {
    name: "In-Home / In-Person Visit",
    price: "$115",
    note: "A provider comes to you for an acute concern, minor procedure, or focused medical visit.",
    tag: "Mobile option",
  },
  {
    name: "Prescription Skin Care Consult",
    price: "$45",
    note: "Tretinoin, acne support, custom anti-aging formulas, and medical-grade prescription skin care.",
    tag: "Custom formulas",
  },
  {
    name: "Precision Medicine Consult",
    price: "Contact us",
    note: "Advanced testing and pharmacogenomics when it would meaningfully change your care plan.",
    tag: "Pricing varies",
  },
  {
    name: "Allergy Evaluation + SLIT",
    price: "Contact us",
    note: "Environmental allergy evaluation and sublingual immunotherapy drops as an alternative to shots.",
    tag: "At-home therapy",
  },
  {
    name: "Strength + Wellness Coaching",
    price: "Contact us",
    note: "Movement assessment, fitness programming, recovery strategy, and accountability support.",
    tag: "Per session",
  },
  {
    name: "Health + Lifestyle Coaching",
    price: "Contact us",
    note: "Nutrition, stress, habits, sleep, and care navigation support for people who want a plan.",
    tag: "Per session",
  },
  {
    name: "Mobile IV Therapy",
    price: "Contact us",
    note: "Hydration, vitamin, and recovery infusions delivered to your location when available.",
    tag: "Mobile option",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <section className="hero-overlay relative min-h-screen flex items-center justify-center" style={{ background: "transparent" }}>
        <div className="container mx-auto px-5 lg:px-8 z-10 py-32 pt-40">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase mb-4" style={{ color: "hsl(177, 70%, 65%)", letterSpacing: 0 }}>
              A la carte care
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span style={{ color: "hsl(0, 0%, 100%)" }}>Simple cash-pay </span>
              <span style={{ color: "hsl(177, 70%, 65%)" }}>services.</span>
            </h1>
            <p className="text-xl lg:text-2xl font-light mb-4 max-w-3xl mx-auto leading-relaxed" style={{ color: "hsl(210, 40%, 89%)" }}>
              Individual visits and select services without a membership.
            </p>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "hsl(210, 25%, 65%)" }}>
              DPC members receive many of these included, at cost, or significantly discounted. This page is for non-members who want one specific service.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-14">
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="rounded-lg p-6"
                  style={{
                    background: "linear-gradient(145deg, hsla(210, 22%, 24%, 0.86), hsla(210, 28%, 10%, 0.94))",
                    border: "1px solid hsla(177, 70%, 59%, 0.16)",
                    boxShadow: "0 16px 44px rgba(0,0,0,0.28)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span
                        className="inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-3"
                        style={{ background: "hsla(177, 70%, 59%, 0.12)", color: "hsl(177, 70%, 70%)" }}
                      >
                        {service.tag}
                      </span>
                      <h2 className="text-xl font-bold leading-snug" style={{ color: "hsl(0, 0%, 100%)" }}>
                        {service.name}
                      </h2>
                    </div>
                    <strong className="text-lg whitespace-nowrap" style={{ color: "hsl(45, 90%, 67%)" }}>
                      {service.price}
                    </strong>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 24%, 76%)" }}>
                    {service.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="section-divider mb-14" />

          <div className="max-w-4xl mx-auto">
            <div
              className="rounded-lg p-8 lg:p-10 text-center"
              style={{
                background: "linear-gradient(135deg, hsla(45, 90%, 60%, 0.12), hsla(177, 70%, 59%, 0.14), hsla(333, 96%, 66%, 0.08))",
                border: "1px solid hsla(177, 70%, 59%, 0.24)",
              }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: "hsl(0, 0%, 100%)" }}>
                Need more than one-off care?
              </h2>
              <p className="mb-6 text-lg" style={{ color: "hsl(210, 40%, 85%)" }}>
                Direct Primary Care covers unlimited visits, urgent care access, telehealth, care coordination, and discounted a la carte services for $100/month.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/direct-primary-care"
                  className="inline-block px-8 py-4 rounded-lg font-semibold text-lg"
                  style={{ background: "linear-gradient(135deg, hsl(45, 90%, 60%), hsl(177, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}
                >
                  View DPC Membership
                </Link>
                <a
                  href={MEET_GREET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 rounded-lg font-semibold text-lg border border-white/20 hover:bg-white/5 transition-colors"
                  style={{ color: "hsl(210, 40%, 89%)" }}
                >
                  Book a Free Meet &amp; Greet
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p style={{ color: "hsl(210, 25%, 65%)" }}>
              Questions about pricing or availability?{" "}
              <a href="tel:+17198244716" className="underline hover:opacity-80" style={{ color: "hsl(177, 70%, 59%)" }}>
                Call or text (719) 824-4716
              </a>{" "}
              or{" "}
              <a href="mailto:dpc@coshealthcollective.com" className="underline hover:opacity-80" style={{ color: "hsl(177, 70%, 59%)" }}>
                email us
              </a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
