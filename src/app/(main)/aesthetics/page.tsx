import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Anti-Aging Skin Care Colorado Springs | Prescription Tretinoin & Compounds",
  description: "Medical-grade anti-aging skin care in Colorado Springs via Skin Medicinals. Prescription tretinoin, niacinamide, vitamin C/E, resveratrol & turmeric compounds. $45 consultation or FREE with DPC membership.",
};

const SKIN_CARE_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/signup/rxskincare";

const compounds = [
  { name: "Tretinoin", concentration: "0.025% to 0.1%", description: "Promotes collagen production and accelerates skin cell turnover to reduce wrinkles and improve skin texture.", color: "hsl(177,70%,65%)" },
  { name: "Niacinamide", concentration: "2% to 4%", description: "Improves skin barrier function, reduces inflammation, and evens skin tone. Helps reduce redness and irritation from other treatments.", color: "hsl(30,80%,60%)" },
  { name: "Vitamin C & E", concentration: "Antioxidant Complex", description: "Protect skin from oxidative damage caused by UV exposure and pollution. Brighten skin and improve pigmentation.", color: "hsl(260,70%,65%)" },
  { name: "Resveratrol & Turmeric", concentration: "Proprietary Blend", description: "Provide additional antioxidant protection and reduce inflammation, supporting overall skin health and anti-aging effects.", color: "hsl(45,90%,60%)" },
];

const steps = [
  { title: "Book your consultation", description: "$45 consultation or FREE with your DPC membership. We'll review your skin goals and create a personalized prescription." },
  { title: "Custom formulation", description: "Your prescription is compounded by Skin Medicinals pharmacy with the specific compounds and concentrations for your needs." },
  { title: "Direct delivery", description: "Your customized anti-aging treatment ships straight to your door from the compounding pharmacy." },
  { title: "Ongoing support", description: "We track your progress and adjust your prescription as needed to achieve the best results." },
];

const stepGradients = [
  "linear-gradient(135deg, hsl(177,70%,59%), hsl(220,70%,59%))",
  "linear-gradient(135deg, hsl(30,80%,60%), hsl(15,85%,55%))",
  "linear-gradient(135deg, hsl(260,70%,65%), hsl(290,70%,60%))",
  "linear-gradient(135deg, hsl(45,90%,60%), hsl(30,80%,60%))",
];

export default function Aesthetics() {
  return (
    <div className="min-h-screen" style={{ background: "hsl(210,32%,12%)" }}>
      {/* Hero */}
      <section className="py-20 lg:py-32" style={{ background: "transparent" }}>
        <div className="container mx-auto px-5 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(30,80%,60%), hsl(15,85%,55%))" }}>
              <Sparkles className="w-12 h-12 lg:w-16 lg:h-16" style={{ color: "hsl(210,32%,12%)" }} />
            </div>
          </div>
          <div className="mb-8">
            <span className="inline-block px-6 py-2 text-sm font-medium rounded-full" style={{ background: "linear-gradient(135deg, hsl(177,70%,59%), hsl(45,90%,60%))", color: "hsl(210,32%,12%)" }}>
              Medical-Grade Anti-Aging
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: "hsl(0,0%,100%)" }}>Skin Care</h1>
          <p className="text-xl lg:text-2xl font-light mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: "hsl(0,0%,95%)" }}>
            Anti-Aging Solutions at Colorado Springs Health Collective
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-5 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* Introduction */}
            <div className="rounded-3xl p-8 lg:p-10 mb-12" style={{ background: "hsla(210,22%,28%,0.75)" }}>
              <p className="text-lg leading-relaxed mb-4" style={{ color: "hsl(0,0%,95%)" }}>
                Through our partnership with <strong style={{ color: "hsl(177,70%,65%)" }}>Skin Medicinals</strong>, we offer prescription-strength anti-aging compounds customized for your unique skin needs.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "hsl(0,0%,92%)" }}>
                Each formula is compounded specifically for you and delivered directly to your home.
              </p>
            </div>

            {/* Compounds */}
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center" style={{ color: "hsl(0,0%,100%)" }}>Key Anti-Aging Compounds</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {compounds.map((c) => (
                <div key={c.name} className="rounded-2xl p-6" style={{ background: "hsla(210,22%,28%,0.75)" }}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ background: c.color }} />
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: c.color }}>{c.name}</h3>
                      <p className="text-sm mb-3" style={{ color: "hsl(0,0%,75%)" }}>{c.concentration}</p>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: "hsl(0,0%,90%)" }}>{c.description}</p>
                </div>
              ))}
            </div>

            {/* How It Works */}
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center" style={{ color: "hsl(0,0%,100%)" }}>How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {steps.map((step, i) => (
                <div key={step.title} className="rounded-2xl p-6" style={{ background: "hsla(210,22%,28%,0.75)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: stepGradients[i] }}>
                    <span className="text-xl font-bold" style={{ color: "hsl(210,32%,12%)" }}>{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "hsl(0,0%,98%)" }}>{step.title}</h3>
                  <p className="leading-relaxed" style={{ color: "hsl(0,0%,90%)" }}>{step.description}</p>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="rounded-3xl p-8 mb-12" style={{ background: "hsla(210,22%,28%,0.75)" }}>
              <p className="text-base leading-relaxed italic" style={{ color: "hsl(0,0%,85%)" }}>
                <strong style={{ color: "hsl(177,70%,65%)" }}>Please note:</strong> These are prescription-only treatments customized for individual use. Sun protection is essential when using tretinoin and other anti-aging compounds.
              </p>
            </div>

            {/* Booking */}
            <div className="rounded-3xl p-8 mb-12 text-center" style={{ background: "hsla(210,22%,28%,0.75)" }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "hsl(260,70%,65%)" }}>Ready to Get Started?</h3>
              <p className="text-lg mb-2" style={{ color: "hsl(0,0%,92%)" }}>Book your consultation today</p>
              <p className="text-sm mb-6 italic" style={{ color: "hsl(0,0%,75%)" }}>$45 consultation or FREE with DPC membership</p>
              <a
                href={SKIN_CARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, hsl(260,70%,65%), hsl(220,70%,59%))", color: "hsl(210,32%,12%)" }}
              >
                Book Now — $45 Consult
              </a>
            </div>

            {/* Back */}
            <div className="text-center pb-16">
              <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity" style={{ background: "linear-gradient(135deg, hsl(260,70%,65%), hsl(220,70%,59%))", color: "hsl(210,32%,12%)" }}>
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
