import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "A La Carte Services | Colorado Springs Health Collective",
  description: "No membership required. Access individual CSHC services at transparent, upfront pricing. DPC members receive these at cost or significantly discounted.",
};

const aLaCarteServices = [
  {
    name: "Telehealth Visit",
    description: "Video or phone consultation with a CSHC provider for acute illness, medication questions, follow-ups, and more.",
    price: "$85",
    badge: null,
  },
  {
    name: "In-Home / In-Person Visit",
    description: "A provider comes to you — home, office, or wherever works. Ideal for acute illness, minor procedures, or when you can't make it in.",
    price: "$115",
    badge: null,
  },
  {
    name: "Prescription Skin Care Consult",
    description: "Medical consultation for tretinoin, custom anti-aging formulas, acne management, or other prescription skin treatments.",
    price: "$45",
    badge: null,
  },
  {
    name: "Precision Medicine Consult",
    description: "Advanced diagnostic consultation including pharmacogenomic testing to personalize your medications and treatment plan.",
    price: "Contact us",
    badge: "Pricing varies",
  },
  {
    name: "Allergy Evaluation & SLIT Therapy",
    description: "Environmental allergy testing and sublingual immunotherapy — an alternative to allergy shots.",
    price: "Contact us",
    badge: "Pricing varies",
  },
  {
    name: "Strength & Wellness Coaching",
    description: "Personalized fitness programming, movement assessment, and ongoing accountability coaching.",
    price: "Contact us",
    badge: "Per session",
  },
  {
    name: "Health & Lifestyle Coaching",
    description: "Nutrition guidance, stress management, habit building, and care navigation support.",
    price: "Contact us",
    badge: "Per session",
  },
  {
    name: "Mobile IV Therapy",
    description: "Hydration, vitamin, and recovery infusions delivered to your location.",
    price: "Contact us",
    badge: "Pricing varies",
  },
];

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

export default function ALaCarte() {
  return (
    <div className="min-h-screen">
      <section className="hero-overlay relative min-h-screen flex items-center justify-center" style={{ background: "transparent" }}>
        <div className="container mx-auto px-5 lg:px-8 z-10 py-32 pt-40">

          {/* Page header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span style={{ color: "hsl(0, 0%, 100%)" }}>A La </span>
              <span style={{ color: "hsl(177, 70%, 65%)" }}>Carte</span>
            </h1>
            <p className="text-xl lg:text-2xl font-light mb-4 max-w-3xl mx-auto leading-relaxed" style={{ color: "hsl(210, 40%, 89%)" }}>
              No membership required. Individual services at transparent, upfront pricing.
            </p>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "hsl(210, 25%, 65%)" }}>
              DPC members receive these services at cost or significantly discounted. A la carte pricing is for non-members who need access to specific services without a full membership.
            </p>
          </div>

          <div className="section-divider my-12" />

          {/* Services grid */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-4">
              {aLaCarteServices.map((service) => (
                <div
                  key={service.name}
                  className="rounded-2xl p-6 flex flex-col gap-2"
                  style={{ background: "hsla(210, 22%, 28%, 0.75)", border: "1px solid hsla(177, 70%, 59%, 0.15)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-lg leading-snug" style={{ color: "hsl(0, 0%, 100%)" }}>
                      {service.name}
                    </h3>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="font-bold text-lg" style={{ color: "hsl(177, 70%, 65%)" }}>
                        {service.price}
                      </span>
                      {service.badge && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsla(177, 70%, 59%, 0.15)", color: "hsl(177, 70%, 70%)" }}>
                          {service.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(0, 0%, 78%)" }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="section-divider mb-16" />

          {/* DPC upsell */}
          <div className="max-w-4xl mx-auto mb-16">
            <div
              className="rounded-3xl p-8 lg:p-10 text-center"
              style={{ background: "linear-gradient(135deg, hsla(45, 90%, 60%, 0.12), hsla(177, 70%, 59%, 0.12))", border: "1px solid hsla(177, 70%, 59%, 0.25)" }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: "hsl(0, 0%, 100%)" }}>
                Want all of this included for a flat monthly fee?
              </h2>
              <p className="mb-6 text-lg" style={{ color: "hsl(210, 40%, 85%)" }}>
                A CSHC Direct Primary Care membership covers unlimited visits, telehealth, urgent care, care coordination, and discounted access to everything on this page — starting at $100/month.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/direct-primary-care"
                  className="inline-block px-8 py-4 rounded-full font-semibold text-lg"
                  style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(45, 90%, 60%))", color: "hsl(210, 32%, 12%)" }}
                >
                  View DPC Membership →
                </Link>
                <a
                  href={MEET_GREET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/5 transition-colors"
                  style={{ color: "hsl(210, 40%, 89%)" }}
                >
                  Book a Free Meet &amp; Greet
                </a>
              </div>
            </div>
          </div>

          {/* Contact note */}
          <div className="text-center">
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
