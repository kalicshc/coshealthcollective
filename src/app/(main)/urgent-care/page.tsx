import type { Metadata } from "next";
import Link from "next/link";
import { Stethoscope, CheckCircle, AlertTriangle, Phone, Mail, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Urgent Care Colorado Springs | Telehealth $85, In-Person $115",
  description: "Skip the ER. Urgent care and telehealth visits in Colorado Springs for UTIs, strep, flu, COVID, lacerations, infections, and minor injuries. Flat rate pricing: $85 telehealth, $115 in-person or in-home. Same-day appointments available.",
  keywords: "urgent care Colorado Springs, telehealth Colorado Springs, virtual doctor visit, urgent care near me, same day appointments Colorado Springs, in-home doctor visits",
};

const treatmentCategories = [
  {
    category: "Skin & Wound Care",
    items: ["Lacerations (stitches, glue, or dressing)", "Minor burns or rashes", "Abscesses or infected cuts", "Tick bites, insect stings, mild allergic reactions"],
  },
  {
    category: "Infections",
    items: ["Urinary tract infections (UTIs)", "Sinus infections", "Ear or throat infections", "Respiratory illnesses (cold, flu, COVID, RSV)", "Pink eye"],
  },
  {
    category: "Pain & Inflammation",
    items: ["Sprains and minor joint injuries", "Muscle strain", "Migraine or tension headache", "Back pain"],
  },
  {
    category: "Other Common Concerns",
    items: ["Cough, congestion, fever", "Nausea, vomiting, diarrhea", "Mild dehydration (IV fluids available)", "Medication refills (non-controlled)", "Work notes or simple physicals"],
  },
];

const steps = [
  { title: "Book your visit", description: "Choose telehealth, in-office, or in-home." },
  { title: "Transparent pricing", description: "Flat, cash pay. You'll know the cost before we start." },
  { title: "Personalized care", description: "Your provider treats you directly and handles follow-up." },
  { title: "Next-step coordination", description: "If you need imaging, labs, or a specialist, we'll arrange it." },
];

const erWarnings = [
  "Chest pain, severe shortness of breath, or stroke symptoms",
  "Heavy bleeding, deep or gaping wounds",
  "Major trauma or broken bones",
  "Severe allergic reactions or anaphylaxis",
  "Loss of consciousness",
];

const categoryColors = ["hsl(177, 70%, 65%)", "hsl(30, 80%, 60%)", "hsl(260, 70%, 65%)", "hsl(45, 90%, 60%)"];

const stepGradients = [
  "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(220, 70%, 59%))",
  "linear-gradient(135deg, hsl(30, 80%, 60%), hsl(15, 85%, 55%))",
  "linear-gradient(135deg, hsl(260, 70%, 65%), hsl(290, 70%, 60%))",
  "linear-gradient(135deg, hsl(45, 90%, 60%), hsl(30, 80%, 60%))",
];

export default function UrgentCare() {
  return (
    <div className="page-bg">
      {/* Hero */}
      <section className="py-20 lg:py-32 text-center px-5">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(30, 75%, 60%))" }}>
            <Stethoscope className="w-12 h-12 lg:w-16 lg:h-16" style={{ color: "hsl(210, 32%, 12%)" }} />
          </div>
        </div>
        <span className="inline-block px-6 py-2 text-sm font-medium rounded-full mb-8" style={{ background: "linear-gradient(135deg, hsl(30, 80%, 60%), hsl(177, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}>
          Simple, Transparent, Local
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: "hsl(0, 0%, 100%)" }}>Urgent Care</h1>
        <p className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(0, 0%, 98%)" }}>Life happens.</p>
        <p className="text-xl lg:text-2xl font-light mb-4 max-w-3xl mx-auto" style={{ color: "hsl(0, 0%, 95%)" }}>
          From weekend cuts to sudden infections, we make it easy to get fast, reliable care — in-home, in-office, or by telehealth.
        </p>
        <p className="text-lg lg:text-xl font-light max-w-2xl mx-auto" style={{ color: "hsl(0, 0%, 90%)" }}>
          No waiting rooms. No surprise bills. No insurance games.
        </p>
      </section>

      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-5 lg:px-8 max-w-5xl">

          {/* What We Treat */}
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center" style={{ color: "hsl(0, 0%, 100%)" }}>What We Treat</h2>
          <p className="text-lg text-center mb-8 max-w-3xl mx-auto" style={{ color: "hsl(0, 0%, 90%)" }}>We handle most common, non-emergency issues for adults, including:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {treatmentCategories.map((cat, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: categoryColors[i] }}>{cat.category}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: categoryColors[i] }} />
                      <span className="text-sm" style={{ color: "hsl(0, 0%, 90%)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center" style={{ color: "hsl(0, 0%, 100%)" }}>How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {steps.map((step, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: stepGradients[i] }}>
                  <span className="text-xl font-bold" style={{ color: "hsl(210, 32%, 12%)" }}>{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "hsl(0, 0%, 98%)" }}>{step.title}</h3>
                <p style={{ color: "hsl(0, 0%, 90%)" }}>{step.description}</p>
              </div>
            ))}
          </div>

          {/* Book CTA */}
          <div className="rounded-3xl p-8 mb-12 text-center" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>Ready to Book Your Visit?</h3>
            <p className="text-lg mb-6" style={{ color: "hsl(0, 0%, 92%)" }}>Schedule your appointment online</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-4">
              <a href="https://colorado-springs-health-collective-direct-primary-care.hint.com/signup/urgentcarevisit" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full font-semibold" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(220, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}>
                Book Now (In Person) $115
              </a>
              <a href="https://colorado-springs-health-collective-direct-primary-care.hint.com/signup/telehealth" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full font-semibold" style={{ background: "linear-gradient(135deg, hsl(30, 80%, 60%), hsl(15, 85%, 55%))", color: "hsl(210, 32%, 12%)" }}>
                Book Now (Telehealth) $85
              </a>
            </div>
            <p className="mb-4" style={{ color: "hsl(0, 0%, 85%)" }}>Or contact us directly</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="tel:719-824-4716" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(220, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}>
                <Phone className="w-5 h-5" /> (719) 824-4716
              </a>
              <a href="mailto:dpc@coshealthcollective.com" className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold" style={{ background: "linear-gradient(135deg, hsl(30, 80%, 60%), hsl(15, 85%, 55%))", color: "hsl(210, 32%, 12%)" }}>
                <Mail className="w-5 h-5" /> Email Us
              </a>
            </div>
          </div>

          {/* ER Warning */}
          <div className="rounded-3xl p-8 mb-12" style={{ background: "hsla(15, 70%, 45%, 0.15)", border: "2px solid hsl(15, 85%, 55%)" }}>
            <div className="flex items-center gap-3 mb-6 justify-center">
              <AlertTriangle className="w-8 h-8" style={{ color: "hsl(15, 85%, 55%)" }} />
              <h2 className="text-2xl lg:text-3xl font-bold" style={{ color: "hsl(15, 85%, 55%)" }}>When to Go to the ER</h2>
            </div>
            <p className="text-lg font-semibold mb-4 text-center" style={{ color: "hsl(0, 0%, 95%)" }}>Call 911 or go to the nearest emergency department for:</p>
            <ul className="space-y-3 max-w-2xl mx-auto">
              {erWarnings.map((w, i) => (
                <li key={i} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(15, 85%, 55%)" }} />
                  <span style={{ color: "hsl(0, 0%, 90%)" }}>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center pb-16">
            <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(30, 75%, 60%))", color: "hsl(210, 32%, 12%)" }}>
              <ArrowLeft className="w-5 h-5" /> Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
