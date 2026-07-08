import type { Metadata } from "next";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { clinicFacts, usd } from "@/lib/clinicFacts";
import { ACCENTS } from "@/lib/accents";
import { ServiceHero, gradientTextStyle } from "@/components/ServiceHero";
import { GlassCard } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { ReviewStrip } from "@/components/ReviewStrip";
import { hintLink } from "@/lib/bookingLinks";
import { serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

const { telehealth, inPerson } = clinicFacts.urgentCare;
const ACCENT = ACCENTS.dpc;

export const metadata: Metadata = {
  alternates: { canonical: "/urgent-care" },
  title: `Urgent Care Colorado Springs | Telehealth ${usd(telehealth)}, In-Person ${usd(inPerson)}`,
  description: `Skip the ER. Urgent care and telehealth visits in Colorado Springs for UTIs, strep, flu, COVID, lacerations, infections, and minor injuries. Flat rate pricing: ${usd(telehealth)} telehealth, ${usd(inPerson)} in-person or in-home. Same-day appointments available.`,
  keywords: "urgent care Colorado Springs, telehealth Colorado Springs, virtual urgent care visit, urgent care near me, same day appointments Colorado Springs, in-home provider visits",
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

const urgentCareSchema = serviceSchema({
  type: "Service",
  name: "Urgent Care & Telehealth",
  description: `Skip the ER. Urgent care and telehealth visits in Colorado Springs for UTIs, strep, flu, COVID, lacerations, infections, and minor injuries. Flat rate pricing: ${usd(telehealth)} telehealth, ${usd(inPerson)} in-person or in-home. Same-day appointments available.`,
  path: "/urgent-care",
  offers: [
    { name: "Telehealth visit", price: telehealth },
    { name: "In-person or in-home visit", price: inPerson },
  ],
});

export default function UrgentCare() {
  return (
    <div>
      <JsonLd data={urgentCareSchema} />
      <ServiceHero
        service="dpc"
        eyebrow="Simple · Transparent · Local"
        title={
          <>
            Urgent Care Colorado Springs
            <span className="sr-only"> — Same-Day Telehealth, In-Home Visits &amp; Mobile Urgent Care</span>
          </>
        }
        titleAccent="Life happens."
        subhead={
          <>
            From weekend cuts to sudden infections, we make it easy to get fast, reliable care —
            in-home, in-office, or by telehealth. No waiting rooms. No surprise bills. No insurance games.
          </>
        }
        ctas={[
          { label: `Book In Person · ${usd(inPerson)}`, href: hintLink("urgentCareInPerson", "urgent-care"), external: true, variant: "primary" },
          { label: `Book Telehealth · ${usd(telehealth)}`, href: hintLink("urgentCareTelehealth", "urgent-care"), external: true, variant: "ghost" },
        ]}
      />

      <div className="section-divider" />

      {/* What We Treat */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `rgb(${ACCENT.rgb})` }}>
              What We Treat
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              Most common issues,{" "}
              <span style={gradientTextStyle("dpc")}>handled same-day.</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto" style={{ color: "hsl(210,25%,62%)", fontSize: "17px", lineHeight: "1.65" }}>
              We handle most common, non-emergency issues for adults, including:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {treatmentCategories.map((cat) => (
              <GlassCard key={cat.category} service="dpc">
                <h3 className="text-lg font-bold mb-4" style={{ color: `rgb(${ACCENT.rgb})` }}>{cat.category}</h3>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: `rgb(${ACCENT.rgb})` }} />
                      <span className="text-sm" style={{ color: "hsl(210,25%,72%)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: `rgb(${ACCENT.rgb})` }}>
              How It Works
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">
              Four steps. <span style={gradientTextStyle("dpc")}>Zero runaround.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <GlassCard key={step.title} service="dpc">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                  style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }}
                >
                  <span className="text-lg font-bold" style={{ color: "hsl(210,32%,10%)" }}>{i + 1}</span>
                </div>
                <h3 className="text-base font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(210,25%,68%)" }}>{step.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ER Warning — intentionally red, not the service accent: safety-critical */}
      <section className="py-4">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="rounded-3xl p-8" style={{ background: "hsla(15,70%,45%,0.15)", border: "2px solid hsl(15,85%,55%)" }}>
            <div className="flex items-center gap-3 mb-6 justify-center">
              <AlertTriangle className="w-7 h-7" style={{ color: "hsl(15,85%,55%)" }} />
              <h2 className="text-2xl lg:text-3xl font-bold" style={{ color: "hsl(15,85%,55%)" }}>When to Go to the ER</h2>
            </div>
            <p className="text-base font-semibold mb-4 text-center" style={{ color: "hsl(0,0%,95%)" }}>
              Call 911 or go to the nearest emergency department for:
            </p>
            <ul className="space-y-3 max-w-2xl mx-auto">
              {erWarnings.map((w) => (
                <li key={w} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(15,85%,55%)" }} />
                  <span style={{ color: "hsl(210,25%,80%)" }}>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pt-12 pb-4">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <ReviewStrip variant="strip" service="dpc" source="urgent-care-reviews" />
        </div>
      </section>

      <PageCtaFooter
        service="dpc"
        heading="Ready to book your visit?"
        body="Schedule online in minutes, or reach out and we'll help you pick the right visit type."
        primaryCta={{
          label: "Book Your Visit",
          href: hintLink("urgentCareInPerson", "urgent-care-footer"),
          external: true,
        }}
        analytics={{ page: "urgent-care", source: "urgent-care-footer", service: "dpc", label: "Book Your Visit" }}
      />
    </div>
  );
}
