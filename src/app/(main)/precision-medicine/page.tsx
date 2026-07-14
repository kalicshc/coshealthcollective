import type { Metadata } from "next";
import { Pill, Activity, CheckCircle } from "lucide-react";
import { ACCENTS } from "@/lib/accents";
import { ServiceHero, gradientTextStyle } from "@/components/ServiceHero";
import { GlassCard } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { bookingUrl } from "@/lib/bookingLinks";

export const metadata: Metadata = {
  alternates: { canonical: "/precision-medicine" },
  title: "Precision Medicine & Advanced Testing",
  description: "Clinician-guided precision medicine in Colorado Springs. Pharmacogenomics, metabolic panels, cardiometabolic testing, and allergy evaluation. Evidence-based, personalized care.",
  keywords: "precision medicine Colorado Springs, pharmacogenomics testing, metabolic health panels, cardiometabolic testing, advanced diagnostics Colorado Springs",
};

const MEET_GREET_URL = bookingUrl("meetGreet", "precision-medicine");
const ACCENT = ACCENTS.dpc;

const services = [
  {
    icon: Pill,
    title: "Precision Medicine & Pharmacogenomics",
    body: "We use pharmacogenomic testing to understand how your body processes medications—helping guide safer, more effective prescribing for mental health, cardiovascular care, and more.",
    bullets: [
      "Personalized medication recommendations based on your genetic profile",
      "Reduce trial-and-error prescribing for antidepressants, blood thinners, and more",
      "One-time test with lifelong value for medication decisions",
    ],
  },
  {
    icon: Activity,
    title: "Metabolic & Cardiometabolic Health Panels",
    body: "Comprehensive blood-based assessments focused on insulin resistance, cardiovascular risk, inflammation, iron balance, thyroid function, and nutrient status—designed for longitudinal tracking, not one-time snapshots.",
    bullets: [
      "Advanced lipid panels beyond standard cholesterol testing",
      "Insulin resistance markers and metabolic health assessment",
      "Inflammatory markers, nutrient levels, and thyroid optimization",
      "Trend tracking over time to measure real progress",
    ],
  },
];

export default function PrecisionMedicine() {
  return (
    <div>
      <ServiceHero
        service="dpc"
        eyebrow="Clinician-Guided · Evidence-Aware"
        title="Precision Medicine &"
        titleAccent="Advanced Testing"
        subhead={
          <>
            We offer access to advanced diagnostic testing when it meaningfully informs care. Not every test
            improves outcomes—and more data isn&apos;t always better care. Available as a standalone consult or
            included with CSHC Direct Primary Care membership.
          </>
        }
        ctas={[
          { label: "Book a Free Meet & Greet", href: MEET_GREET_URL, external: true, variant: "primary" },
          { label: "Learn About DPC Membership", href: "/direct-primary-care", variant: "ghost" },
        ]}
      />

      <div className="section-divider" />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-5 lg:px-8 space-y-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <GlassCard key={s.title} service="dpc" className="!p-8 lg:!p-10">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: "hsl(210,32%,10%)" }} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl lg:text-3xl font-black mb-4 text-white">
                      <span style={gradientTextStyle("dpc")}>{s.title}</span>
                    </h2>
                    <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(210,25%,78%)" }}>{s.body}</p>
                    <div className="space-y-3">
                      {s.bullets.map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: `rgb(${ACCENT.rgb})` }} />
                          <span className="text-sm" style={{ color: "hsl(210,25%,78%)" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <PageCtaFooter
        service="dpc"
        heading="Ready to learn more?"
        body="Schedule a free meet and greet to discuss how precision medicine can support your health journey."
        primaryCta={{ label: "Book a Free Meet & Greet", href: bookingUrl("meetGreet", "precision-medicine-footer"), external: true }}
        analytics={{ page: "precision-medicine", source: "precision-medicine-footer", service: "dpc", label: "Book a Free Meet & Greet", appt: "meetGreet" }}
      />
    </div>
  );
}
