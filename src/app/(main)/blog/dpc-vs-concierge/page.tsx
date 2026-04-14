import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, Stethoscope, CheckCircle, Users, Briefcase, Heart, Mountain } from "lucide-react";

export const metadata: Metadata = {
  title: "Direct Primary Care vs. Concierge Medicine: Colorado Springs Guide | Colorado Springs Health Collective",
  description: "Understanding the differences between Direct Primary Care and concierge medicine in Colorado Springs. Compare costs, services, and which model best fits your healthcare needs.",
};

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

const comparisonData = [
  { feature: "Cost Structure", dpc: "$50-150/month flat fee", concierge: "$1,500-$10,000+ annual retainer" },
  { feature: "Insurance Billing", dpc: "No insurance billing", concierge: "Still bills insurance for services" },
  { feature: "Total Annual Cost", dpc: "$600-1,800/year", concierge: "$1,500-$10,000+ plus insurance costs" },
  { feature: "Appointment Length", dpc: "30-60 minutes", concierge: "30-60 minutes" },
  { feature: "Provider Access", dpc: "24/7 phone/text/email", concierge: "Enhanced phone/email access" },
  { feature: "Labs & Testing", dpc: "Wholesale pricing, often included", concierge: "Usually billed through insurance" },
  { feature: "Target Audience", dpc: "Middle class, families, small business owners", concierge: "High-income individuals, executives" },
  { feature: "Provider Types", dpc: "Family physicians, nurse practitioners, PAs", concierge: "Typically physicians (MDs/DOs)" },
];

export default function BlogDpcVsConcierge() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen" style={{ background: "transparent" }}>
        <div className="container mx-auto px-5 lg:px-8 py-20">
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap pt-20">
            {["/direct-primary-care|Direct Primary Care", "/about|About Us", "/faq|FAQ", "/blog|Blog"].map((item) => {
              const [href, label] = item.split("|");
              return (
                <span key={href} className="flex items-center gap-4">
                  <Link href={href} className="hover:opacity-80 text-sm" style={{ color: "hsl(177, 70%, 59%)" }}>{label}</Link>
                </span>
              );
            })}
          </div>

          <Link href="/blog" className="inline-flex items-center gap-2 mb-8 hover:opacity-80" style={{ color: "hsl(177, 70%, 59%)" }}>
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>

          <article className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))" }}>
                  <Stethoscope className="w-10 h-10" style={{ color: "hsl(210, 32%, 12%)" }} />
                </div>
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "hsl(177, 70%, 59%)", color: "hsl(210, 32%, 12%)" }}>Featured</span>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight" style={{ color: "hsl(0, 0%, 100%)" }}>
                Direct Primary Care vs. Concierge Medicine: Colorado Springs Guide
              </h1>
              <p style={{ color: "hsl(0, 0%, 60%)" }}>January 14, 2025 | By Colorado Springs Health Collective</p>
            </div>

            <div className="rounded-3xl p-8 lg:p-10 mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "hsl(0, 0%, 92%)" }}>
                Choosing the right healthcare model in Colorado Springs can feel overwhelming. Two increasingly popular alternatives to traditional insurance-based care are <strong>Direct Primary Care (DPC)</strong> and <strong>concierge medicine</strong>. While both offer more personalized attention, they differ significantly in cost, services, and accessibility.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>What is Direct Primary Care?</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 85%)" }}>
                Direct Primary Care is a membership-based model where patients pay a flat monthly fee ($50-150) covering unlimited primary care visits, basic lab work, minor procedures, and 24/7 provider access.
              </p>
              <ul className="space-y-2 mb-6">
                {["Monthly membership fee (typically $50-150)", "No insurance billing or copays", "Same-day or next-day appointments", "Extended visit times (30-60 minutes)", "Direct access via phone, text, or email", "Wholesale pricing on labs and medications"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: "hsl(0, 0%, 85%)" }}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(177, 70%, 59%)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>Side-by-Side Comparison</h2>
              <div className="overflow-x-auto mb-8">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: "2px solid hsla(177, 70%, 59%, 0.3)" }}>
                      <th className="p-3 text-left" style={{ color: "hsl(0, 0%, 85%)" }}>Feature</th>
                      <th className="p-3 text-center" style={{ color: "hsl(177, 70%, 65%)" }}>Direct Primary Care</th>
                      <th className="p-3 text-center" style={{ color: "hsl(0, 0%, 70%)" }}>Concierge Medicine</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid hsla(210, 22%, 40%, 0.5)" }}>
                        <td className="p-3 font-medium" style={{ color: "hsl(0, 0%, 92%)" }}>{row.feature}</td>
                        <td className="p-3 text-center" style={{ color: "hsl(177, 70%, 75%)" }}>{row.dpc}</td>
                        <td className="p-3 text-center" style={{ color: "hsl(0, 0%, 60%)" }}>{row.concierge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>Cost Analysis</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="rounded-2xl p-6" style={{ background: "hsla(177, 70%, 59%, 0.1)", border: "2px solid hsl(177, 70%, 59%)" }}>
                  <h4 className="font-bold mb-3" style={{ color: "hsl(177, 70%, 65%)" }}>Direct Primary Care Option</h4>
                  <p className="text-sm mb-2" style={{ color: "hsl(0, 0%, 85%)" }}>Family DPC membership: $3,600-4,800/year</p>
                  <p className="text-sm mb-2" style={{ color: "hsl(0, 0%, 85%)" }}>High-deductible health plan: $4,800-7,200/year</p>
                  <p className="font-bold mt-3" style={{ color: "hsl(177, 70%, 59%)" }}>Total: $8,400-12,000/year</p>
                </div>
                <div className="rounded-2xl p-6" style={{ background: "hsla(0, 0%, 50%, 0.1)" }}>
                  <h4 className="font-bold mb-3" style={{ color: "hsl(0, 0%, 75%)" }}>Concierge Medicine Option</h4>
                  <p className="text-sm mb-2" style={{ color: "hsl(0, 0%, 70%)" }}>Family retainer: $8,000-20,000/year</p>
                  <p className="text-sm mb-2" style={{ color: "hsl(0, 0%, 70%)" }}>Traditional insurance: $9,600-14,400/year</p>
                  <p className="font-bold mt-3" style={{ color: "hsl(0, 0%, 60%)" }}>Total: $17,600-34,400/year</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>Who Benefits Most from DPC?</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Users, title: "Families", desc: "Affordable, accessible healthcare without insurance barriers." },
                  { icon: Briefcase, title: "Small Business Owners", desc: "Self-employed individuals who need reliable healthcare without complexity." },
                  { icon: Heart, title: "Chronic Conditions", desc: "Patients needing frequent monitoring and ongoing support." },
                  { icon: Mountain, title: "Active Colorado Lifestyle", desc: "Health-conscious individuals who want a preventive care focus." },
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl p-5" style={{ background: "hsla(177, 70%, 59%, 0.1)" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="w-6 h-6" style={{ color: "hsl(177, 70%, 59%)" }} />
                      <h4 className="font-bold" style={{ color: "hsl(0, 0%, 100%)" }}>{item.title}</h4>
                    </div>
                    <p className="text-sm" style={{ color: "hsl(0, 0%, 80%)" }}>{item.desc}</p>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>Conclusion</h2>
              <p className="mb-6" style={{ color: "hsl(0, 0%, 85%)" }}>
                For most Colorado Springs families, <strong>Direct Primary Care provides the best value</strong>—offering concierge-level access and attention at a fraction of the cost. The most important step is moving toward a model that prioritizes your time, health, and peace of mind.
              </p>
            </div>

            <div className="rounded-3xl p-8 text-center mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
                Ready to Experience DPC in Colorado Springs?
              </h3>
              <a href={MEET_GREET_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}>
                Schedule a Free Meet and Greet
              </a>
            </div>

            <div className="rounded-3xl p-6 mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h4 className="font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>Related Reading</h4>
              <div className="space-y-2">
                <Link href="/blog/flu-shot-guide" className="block hover:opacity-80" style={{ color: "hsl(177, 70%, 59%)" }}>→ How the Flu Shot Works: Safety, Risks &amp; Why You Should Get Vaccinated</Link>
                <Link href="/blog/why-direct-primary-care" className="block hover:opacity-80" style={{ color: "hsl(177, 70%, 59%)" }}>→ Why Direct Primary Care Is the Future of Health</Link>
              </div>
            </div>
          </article>

          <div className="text-center mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href="tel:+17198244716" className="flex items-center gap-2 hover:opacity-80">
                <Phone className="w-5 h-5" style={{ color: "hsl(177, 70%, 59%)" }} />
                <span style={{ color: "hsl(0, 0%, 92%)" }}>(719) 824-4716</span>
              </a>
              <a href="mailto:dpc@coshealthcollective.com" className="flex items-center gap-2 hover:opacity-80">
                <Mail className="w-5 h-5" style={{ color: "hsl(177, 70%, 59%)" }} />
                <span style={{ color: "hsl(0, 0%, 92%)" }}>dpc@coshealthcollective.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
