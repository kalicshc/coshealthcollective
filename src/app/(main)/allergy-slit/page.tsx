import type { Metadata } from "next";
import { Flower2, CheckCircle } from "lucide-react";
import { ACCENTS } from "@/lib/accents";
import { ServiceHero, gradientTextStyle } from "@/components/ServiceHero";
import { GlassCard } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { bookingUrl } from "@/lib/bookingLinks";
import { serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/allergy-slit" },
  title: "Allergy Testing & SLIT Therapy | Colorado Springs Health Collective",
  description: "Evidence-based allergy testing and sublingual immunotherapy (SLIT) in Colorado Springs. At-home allergy treatment without injections. Seasonal and environmental allergy relief.",
  keywords: "allergy testing Colorado Springs, SLIT therapy, sublingual immunotherapy, seasonal allergies, environmental allergies, allergy drops, allergy treatment without shots",
};

const MEET_GREET_URL = bookingUrl("meetGreet", "allergy-slit");
const ACCENT = ACCENTS.dpc;

const steps = [
  { step: "1", title: "Comprehensive Testing", desc: "We identify your specific environmental and seasonal allergens through evidence-based testing" },
  { step: "2", title: "Custom Formulation", desc: "Your SLIT drops are custom-made based on your specific allergy profile" },
  { step: "3", title: "At-Home Treatment", desc: "Take your drops daily at home—no weekly office visits for injections" },
];

const whySlit = [
  "No weekly injection visits—take drops at home",
  "Treats the root cause, not just symptoms",
  "Covers environmental and seasonal allergens",
  "Long-term relief that can last years after treatment",
  "Safe and well-tolerated for most patients",
  "Integrated with your primary care relationship",
];

const allergenGroups = [
  { title: "Seasonal Allergens", items: ["Tree pollens (cottonwood, juniper, oak)", "Grass pollens", "Weed pollens (ragweed, sagebrush)"] },
  { title: "Environmental Allergens", items: ["Dust mites", "Mold spores", "Pet dander (cats, dogs)"] },
];

const allergySlitSchema = serviceSchema({
  type: "MedicalTherapy",
  name: "Allergy Testing & Sublingual Immunotherapy (SLIT)",
  description: "Evidence-based allergy testing and sublingual immunotherapy (SLIT) in Colorado Springs. At-home allergy treatment without injections. Seasonal and environmental allergy relief.",
  path: "/allergy-slit",
});

export default function AllergySlit() {
  return (
    <div>
      <JsonLd data={allergySlitSchema} />
      <ServiceHero
        service="dpc"
        eyebrow="No Weekly Shots · At-Home Drops"
        title="Allergy Evaluation &"
        titleAccent="SLIT Therapy"
        subhead="Long-term allergy relief without weekly injection visits. Available as a standalone consult or included with CSHC Direct Primary Care membership."
        ctas={[
          { label: "Book a Free Meet & Greet", href: MEET_GREET_URL, external: true, variant: "primary" },
          { label: "Learn About DPC Membership", href: "/direct-primary-care", variant: "ghost" },
        ]}
      />

      <div className="section-divider" />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 space-y-6">
          <GlassCard service="dpc" className="!p-8 lg:!p-10 text-center">
            <h2 className="text-2xl lg:text-3xl font-black mb-6 text-white">
              What is <span style={gradientTextStyle("dpc")}>SLIT Therapy?</span>
            </h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: "hsl(210,25%,78%)" }}>
              Sublingual immunotherapy (SLIT) is an evidence-based approach to treating allergies at the source. Instead of just masking symptoms, SLIT gradually trains your immune system to tolerate allergens—providing long-term relief.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "hsl(210,25%,72%)" }}>
              Unlike traditional allergy shots that require weekly office visits, SLIT uses custom-formulated drops that you take at home. It&apos;s convenient, effective, and integrates seamlessly with your primary care.
            </p>
          </GlassCard>

          <GlassCard service="dpc" className="!p-8 lg:!p-10">
            <h2 className="text-2xl lg:text-3xl font-black mb-8 text-center text-white">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto" style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }}>
                    <span className="text-lg font-bold" style={{ color: "hsl(210,32%,10%)" }}>{item.step}</span>
                  </div>
                  <h3 className="text-base font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-sm" style={{ color: "hsl(210,25%,72%)" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard service="dpc" className="!p-8 lg:!p-10">
            <h2 className="text-2xl lg:text-3xl font-black mb-6 text-white">
              Why Choose <span style={gradientTextStyle("dpc")}>SLIT?</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {whySlit.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: `rgb(${ACCENT.rgb})` }} />
                  <span className="text-sm" style={{ color: "hsl(210,25%,78%)" }}>{item}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard service="dpc" className="!p-8 lg:!p-10">
            <h2 className="text-2xl lg:text-3xl font-black mb-6 text-white">Common Allergens We Test For</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {allergenGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-base font-semibold mb-3 text-white">{group.title}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "hsl(210,25%,75%)" }}>
                        <Flower2 className="w-4 h-4" style={{ color: `rgb(${ACCENT.rgb})` }} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <PageCtaFooter
        service="dpc"
        heading="Ready to find relief?"
        body="Schedule a free meet and greet to discuss whether allergy testing and SLIT therapy is right for you."
        primaryCta={{ label: "Book a Free Meet & Greet", href: bookingUrl("meetGreet", "allergy-slit-footer"), external: true }}
        analytics={{ page: "allergy-slit", source: "allergy-slit-footer", service: "dpc", label: "Book a Free Meet & Greet", appt: "meetGreet" }}
      />
    </div>
  );
}
