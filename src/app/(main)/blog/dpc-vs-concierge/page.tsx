import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, CheckCircle, Users, Briefcase, Heart, Mountain } from "lucide-react";

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
      <section className="relative" style={{ background: "hsl(210, 32%, 8%)" }}>

        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <Image src="/blog/dpc-hero.jpg" alt="Doctor and patient conversation in Colorado Springs" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsla(210,32%,8%,0.65) 0%, hsla(210,32%,8%,0.93) 55%, hsl(210,32%,8%) 85%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-5 lg:px-8">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 mb-6 text-sm hover:opacity-80" style={{ color: "hsl(177, 70%, 65%)" }}>
                <ArrowLeft className="w-4 h-4" /> Back to All Articles
              </Link>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: "hsl(177, 70%, 59%)", color: "hsl(210, 32%, 10%)" }}>DPC</span>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
                Direct Primary Care vs. Concierge Medicine: Colorado Springs Guide
              </h1>
              <p className="text-sm" style={{ color: "hsl(0, 0%, 60%)" }}>January 2025 · 7 min read</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 lg:px-8 py-12">
          <article className="max-w-4xl mx-auto">

            {/* Big cost comparison callout */}
            <div className="rounded-2xl overflow-hidden mb-10 flex flex-col sm:flex-row" style={{ border: "1px solid hsla(177, 70%, 50%, 0.3)" }}>
              <div className="flex-1 p-8 text-center" style={{ background: "hsla(177, 70%, 50%, 0.12)" }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(177, 70%, 65%)" }}>DPC + HDHP</div>
                <div className="text-5xl font-black mb-1" style={{ color: "hsl(177, 70%, 65%)" }}>$8,400</div>
                <div className="text-sm" style={{ color: "hsl(0, 0%, 65%)" }}>estimated annual cost / family</div>
              </div>
              <div className="flex items-center justify-center px-6 py-4 text-xl font-bold" style={{ color: "hsl(0, 0%, 40%)" }}>vs</div>
              <div className="flex-1 p-8 text-center" style={{ background: "hsla(0, 0%, 40%, 0.08)" }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(0, 0%, 55%)" }}>Concierge + Insurance</div>
                <div className="text-5xl font-black mb-1" style={{ color: "hsl(0, 0%, 60%)" }}>$34,400</div>
                <div className="text-sm" style={{ color: "hsl(0, 0%, 55%)" }}>estimated annual cost / family</div>
              </div>
            </div>

            <p className="text-lg leading-relaxed mb-10" style={{ color: "hsl(210, 25%, 85%)" }}>
              Both Direct Primary Care and concierge medicine promise more time with your provider and better access than traditional insurance-based care. But they differ enormously in cost, accessibility, and who they&apos;re actually designed for. Here&apos;s the honest breakdown.
            </p>

            <h2 className="text-2xl lg:text-3xl font-bold mb-5" style={{ color: "hsl(177, 70%, 65%)" }}>What Is Direct Primary Care?</h2>
            <p className="leading-relaxed mb-5" style={{ color: "hsl(210, 25%, 82%)" }}>
              DPC is a membership-based model where patients pay a flat monthly fee covering unlimited primary care — no insurance billing, no copays, no per-visit charges. For $50–150/month you get same-day access, extended visits, and direct communication with your provider.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {["Monthly fee of $50–150 covers everything primary", "No insurance billing or copays", "Same-day or next-day appointments", "30–60 minute visits — not 7 minutes", "Text, call, or video your provider directly", "Wholesale pricing on labs and medications"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl p-3" style={{ background: "hsla(177, 70%, 50%, 0.08)", border: "1px solid hsla(177, 70%, 50%, 0.15)" }}>
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(177, 70%, 59%)" }} />
                  <span className="text-sm" style={{ color: "hsl(0, 0%, 85%)" }}>{item}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold mb-5" style={{ color: "hsl(177, 70%, 65%)" }}>Side-by-Side Comparison</h2>
            <div className="rounded-2xl overflow-hidden mb-10" style={{ border: "1px solid hsla(177, 70%, 50%, 0.2)" }}>
              <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-wider px-4 py-3" style={{ background: "hsla(210, 22%, 15%, 0.9)", borderBottom: "1px solid hsla(177, 70%, 50%, 0.2)" }}>
                <div style={{ color: "hsl(0, 0%, 60%)" }}>Feature</div>
                <div className="text-center" style={{ color: "hsl(177, 70%, 65%)" }}>Direct Primary Care</div>
                <div className="text-center" style={{ color: "hsl(0, 0%, 50%)" }}>Concierge</div>
              </div>
              {comparisonData.map((row, i) => (
                <div key={i} className="grid grid-cols-3 px-4 py-3 text-sm" style={{ background: i % 2 === 0 ? "transparent" : "hsla(210, 22%, 15%, 0.4)", borderTop: "1px solid hsla(210, 22%, 30%, 0.3)" }}>
                  <div className="font-medium" style={{ color: "hsl(0, 0%, 88%)" }}>{row.feature}</div>
                  <div className="text-center" style={{ color: "hsl(177, 70%, 72%)" }}>{row.dpc}</div>
                  <div className="text-center" style={{ color: "hsl(0, 0%, 55%)" }}>{row.concierge}</div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold mb-5" style={{ color: "hsl(177, 70%, 65%)" }}>Who Benefits Most from DPC?</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                { icon: Users, title: "Families", desc: "Flat predictable cost — no surprise bills when kids get sick.", stat: "Most common DPC members" },
                { icon: Briefcase, title: "Self-Employed & Small Business", desc: "Real healthcare access without the complexity or cost of group plans.", stat: "No employer coverage needed" },
                { icon: Heart, title: "Chronic Conditions", desc: "Frequent check-ins, real monitoring, actual relationship with your provider.", stat: "Unlimited visits included" },
                { icon: Mountain, title: "Active Colorado Lifestyle", desc: "A provider who knows your body, your goals, and picks up when you call.", stat: "Same-day injury response" },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl p-5" style={{ background: "hsla(177, 70%, 59%, 0.08)", border: "1px solid hsla(177, 70%, 59%, 0.18)" }}>
                  <div className="flex items-center gap-3 mb-1">
                    <item.icon className="w-5 h-5" style={{ color: "hsl(177, 70%, 59%)" }} />
                    <h4 className="font-bold" style={{ color: "hsl(0, 0%, 100%)" }}>{item.title}</h4>
                  </div>
                  <div className="text-xs font-semibold mb-2" style={{ color: "hsl(177, 70%, 60%)" }}>{item.stat}</div>
                  <p className="text-sm" style={{ color: "hsl(0, 0%, 78%)" }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <div className="rounded-2xl p-7 mb-8 text-center" style={{ background: "linear-gradient(135deg, hsla(177,70%,50%,0.12), hsla(200,70%,50%,0.12))", border: "1px solid hsla(177,70%,50%,0.3)" }}>
              <p className="text-xl font-bold italic" style={{ color: "hsl(0, 0%, 95%)" }}>
                &ldquo;For most Colorado Springs families, DPC delivers concierge-level access at a fraction of the price.&rdquo;
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

          <div className="text-center mt-8 mb-4">
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
