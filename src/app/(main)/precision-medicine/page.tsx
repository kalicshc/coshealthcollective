import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, ArrowRight, FlaskConical, Pill, Activity, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Precision Medicine & Advanced Testing | Colorado Springs Health Collective",
  description: "Clinician-guided precision medicine in Colorado Springs. Pharmacogenomics, metabolic panels, cardiometabolic testing, and allergy evaluation. Evidence-based, personalized care.",
  keywords: "precision medicine Colorado Springs, pharmacogenomics testing, metabolic health panels, cardiometabolic testing, advanced diagnostics Colorado Springs",
};

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

export default function PrecisionMedicine() {
  return (
    <div className="page-bg">
      <div className="container mx-auto px-5 lg:px-8 py-32">

        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 60%))" }}>
            <FlaskConical className="w-10 h-10" style={{ color: "hsl(210, 32%, 12%)" }} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            <span style={{ color: "hsl(0, 0%, 100%)" }}>Precision Medicine & </span>
            <span style={{ color: "hsl(177, 70%, 65%)" }}>Advanced Testing</span>
          </h1>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-3xl p-8 lg:p-10 text-center" style={{ background: "hsla(210, 22%, 28%, 0.6)" }}>
            <p className="text-xl lg:text-2xl font-light mb-6 leading-relaxed" style={{ color: "hsl(210, 40%, 89%)" }}>
              We offer access to advanced diagnostic testing when it <strong style={{ color: "hsl(177, 70%, 65%)" }}>meaningfully informs care</strong>.
            </p>
            <p className="text-lg leading-relaxed mb-4" style={{ color: "hsl(210, 40%, 82%)" }}>Not every test improves outcomes—and more data isn't always better care.</p>
            <p className="text-xl font-semibold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>Our approach is clinician-guided, evidence-aware, and personalized.</p>
            <p className="text-base" style={{ color: "hsl(210, 40%, 75%)" }}>Available as a standalone consult or included with CSHC Direct Primary Care membership.</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.5)" }}>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, hsl(280, 70%, 60%), hsl(320, 70%, 60%))" }}>
                <Pill className="w-8 h-8" style={{ color: "hsl(210, 32%, 12%)" }} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>Precision Medicine & Pharmacogenomics</h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: "hsl(210, 40%, 89%)" }}>
                  We use pharmacogenomic testing to understand how your body processes medications—helping guide safer, more effective prescribing for mental health, cardiovascular care, and more.
                </p>
                <div className="space-y-3">
                  {["Personalized medication recommendations based on your genetic profile", "Reduce trial-and-error prescribing for antidepressants, blood thinners, and more", "One-time test with lifelong value for medication decisions"].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(177, 70%, 59%)" }} />
                      <span style={{ color: "hsl(210, 40%, 82%)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.5)" }}>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, hsl(45, 90%, 60%), hsl(30, 85%, 58%))" }}>
                <Activity className="w-8 h-8" style={{ color: "hsl(210, 32%, 12%)" }} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>Metabolic & Cardiometabolic Health Panels</h2>
                <p className="text-lg leading-relaxed mb-6" style={{ color: "hsl(210, 40%, 89%)" }}>
                  Comprehensive blood-based assessments focused on insulin resistance, cardiovascular risk, inflammation, iron balance, thyroid function, and nutrient status—designed for longitudinal tracking, not one-time snapshots.
                </p>
                <div className="space-y-3">
                  {["Advanced lipid panels beyond standard cholesterol testing", "Insulin resistance markers and metabolic health assessment", "Inflammatory markers, nutrient levels, and thyroid optimization", "Trend tracking over time to measure real progress"].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(177, 70%, 59%)" }} />
                      <span style={{ color: "hsl(210, 40%, 82%)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-16 text-center">
          <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.6)" }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>Ready to Learn More?</h2>
            <p className="text-lg mb-8" style={{ color: "hsl(210, 40%, 89%)" }}>Schedule a free meet and greet to discuss how precision medicine can support your health journey.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a href={MEET_GREET_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 60%))", color: "hsl(210, 32%, 12%)" }}>
                Book a Free Meet &amp; Greet <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/direct-primary-care" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg border-2" style={{ borderColor: "hsl(177, 70%, 59%)", color: "hsl(177, 70%, 65%)", background: "transparent" }}>
                Learn About DPC Membership <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="rounded-3xl p-8" style={{ background: "hsla(210, 22%, 28%, 0.4)" }}>
            <p className="text-lg mb-6" style={{ color: "hsl(210, 40%, 89%)" }}>Questions? Reach out anytime.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href="tel:+17198244716" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))" }}>
                  <Phone className="w-6 h-6" style={{ color: "hsl(210, 32%, 12%)" }} />
                </div>
                <span className="text-lg font-medium" style={{ color: "hsl(0, 0%, 100%)" }}>(719) 824-4716</span>
              </a>
              <a href="mailto:dpc@coshealthcollective.com" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))" }}>
                  <Mail className="w-6 h-6" style={{ color: "hsl(210, 32%, 12%)" }} />
                </div>
                <span className="text-lg font-medium" style={{ color: "hsl(0, 0%, 100%)" }}>dpc@coshealthcollective.com</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
