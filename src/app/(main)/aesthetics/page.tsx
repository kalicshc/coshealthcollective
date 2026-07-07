import type { Metadata } from "next";
import { ACCENTS } from "@/lib/accents";
import { ServiceHero, gradientTextStyle } from "@/components/ServiceHero";
import { GlassCard } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { hintLink } from "@/lib/bookingLinks";

export const metadata: Metadata = {
  alternates: { canonical: "/aesthetics" },
  title: "Anti-Aging Skin Care Colorado Springs | Prescription Tretinoin & Compounds",
  description: "Medical-grade anti-aging skin care in Colorado Springs via Skin Medicinals. Prescription tretinoin, niacinamide, vitamin C/E, resveratrol & turmeric compounds. $45 consultation or FREE with DPC membership.",
};

const SKIN_CARE_URL = hintLink("rxSkincare", "aesthetics");
const ACCENT = ACCENTS.brand;

const compounds = [
  { name: "Tretinoin", concentration: "0.025% to 0.1%", description: "Promotes collagen production and accelerates skin cell turnover to reduce wrinkles and improve skin texture." },
  { name: "Niacinamide", concentration: "2% to 4%", description: "Improves skin barrier function, reduces inflammation, and evens skin tone. Helps reduce redness and irritation from other treatments." },
  { name: "Vitamin C & E", concentration: "Antioxidant Complex", description: "Protect skin from oxidative damage caused by UV exposure and pollution. Brighten skin and improve pigmentation." },
  { name: "Resveratrol & Turmeric", concentration: "Proprietary Blend", description: "Provide additional antioxidant protection and reduce inflammation, supporting overall skin health and anti-aging effects." },
];

const steps = [
  { title: "Book your consultation", description: "$45 consultation or FREE with your DPC membership. We'll review your skin goals and create a personalized prescription." },
  { title: "Custom formulation", description: "Your prescription is compounded by Skin Medicinals pharmacy with the specific compounds and concentrations for your needs." },
  { title: "Direct delivery", description: "Your customized anti-aging treatment ships straight to your door from the compounding pharmacy." },
  { title: "Ongoing support", description: "We track your progress and adjust your prescription as needed to achieve the best results." },
];

export default function Aesthetics() {
  return (
    <div>
      <ServiceHero
        service="brand"
        eyebrow="Medical-Grade Anti-Aging"
        title="Prescription"
        titleAccent="Skin Care"
        subhead={
          <>
            Through our partnership with <strong style={{ color: "hsl(0,0%,100%)" }}>Skin Medicinals</strong>, we
            offer prescription-strength anti-aging compounds customized for your unique skin needs — compounded
            specifically for you and delivered directly to your home.
          </>
        }
        ctas={[{ label: "Book Now — $45 Consult", href: SKIN_CARE_URL, external: true, variant: "primary" }]}
      />

      <div className="section-divider" />

      {/* Compounds */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `rgb(${ACCENT.rgb})` }}>
              What&apos;s Inside
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              Key <span style={gradientTextStyle("brand")}>Anti-Aging Compounds</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {compounds.map((c) => (
              <GlassCard key={c.name} service="brand">
                <h3 className="text-lg font-bold mb-1" style={{ color: `rgb(${ACCENT.rgb})` }}>{c.name}</h3>
                <p className="text-xs mb-3 uppercase tracking-widest" style={{ color: "hsl(210,25%,60%)" }}>{c.concentration}</p>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(210,25%,75%)" }}>{c.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-black mb-10 text-center text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((step, i) => (
              <GlassCard key={step.title} service="brand">
                <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4" style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }}>
                  <span className="text-lg font-bold" style={{ color: "hsl(210,32%,10%)" }}>{i + 1}</span>
                </div>
                <h3 className="text-base font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(210,25%,75%)" }}>{step.description}</p>
              </GlassCard>
            ))}
          </div>
          <p className="mt-10 text-sm leading-relaxed italic text-center max-w-2xl mx-auto" style={{ color: "hsl(210,25%,65%)" }}>
            <strong style={{ color: `rgb(${ACCENT.rgb})` }}>Please note:</strong> These are prescription-only
            treatments customized for individual use. Sun protection is essential when using tretinoin and other
            anti-aging compounds.
          </p>
        </div>
      </section>

      <PageCtaFooter
        service="brand"
        heading="Ready to get started?"
        body="$45 consultation — or FREE with your DPC membership."
        primaryCta={{ label: "Book Your Consultation", href: SKIN_CARE_URL, external: true }}
      />
    </div>
  );
}
