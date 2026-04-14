import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, Sparkles, Calendar, DollarSign, Clock, MessageCircle, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Direct Primary Care Is the Future of Health | Colorado Springs Health Collective",
  description: "Discover how Direct Primary Care in Colorado Springs is redefining healthcare: no insurance hoops, no rushed visits, just real care when you need it.",
};

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

export default function BlogWhyDirectPrimaryCare() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen" style={{ background: "transparent" }}>
        <div className="container mx-auto px-5 lg:px-8 py-20">
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap pt-20">
            {["/direct-primary-care|Direct Primary Care", "/about|About Us", "/faq|FAQ", "/blog|Blog"].map((item) => {
              const [href, label] = item.split("|");
              return <Link key={href} href={href} className="hover:opacity-80 text-sm" style={{ color: "hsl(177, 70%, 59%)" }}>{label}</Link>;
            })}
          </div>
          <Link href="/blog" className="inline-flex items-center gap-2 mb-8 hover:opacity-80" style={{ color: "hsl(177, 70%, 59%)" }}>
            <ArrowLeft className="w-4 h-4" /> Back to All Articles
          </Link>

          <article className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(45, 90%, 60%), hsl(35, 90%, 55%))" }}>
                  <Sparkles className="w-10 h-10" style={{ color: "hsl(210, 32%, 12%)" }} />
                </div>
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "hsl(45, 90%, 60%)", color: "hsl(210, 32%, 12%)" }}>Popular</span>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight" style={{ color: "hsl(0, 0%, 100%)" }}>
                Why Direct Primary Care Is the Future of Health (And Why It Matters for You)
              </h1>
              <p style={{ color: "hsl(0, 0%, 60%)" }}>August 5, 2025</p>
            </div>

            <div className="rounded-3xl p-8 lg:p-10 mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <div className="rounded-2xl p-6 mb-8 text-center italic" style={{ background: "hsla(177, 70%, 59%, 0.1)", borderLeft: "4px solid hsl(177, 70%, 59%)" }}>
                <p className="text-lg" style={{ color: "hsl(0, 0%, 92%)" }}>
                  Imagine this: You wake up feeling run down. You text your provider—and they actually respond. Same day. No waiting rooms. No five-minute rushed visit followed by a surprise bill.
                </p>
              </div>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "hsl(0, 0%, 92%)" }}>
                This isn&apos;t a fantasy—it&apos;s <strong>Direct Primary Care (DPC)</strong>. And it&apos;s changing lives across Colorado Springs.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>What Is Direct Primary Care?</h2>
              <p className="leading-relaxed mb-6" style={{ color: "hsl(0, 0%, 85%)" }}>
                Direct Primary Care is a membership-based healthcare model that cuts out insurance middlemen so you can finally have a real relationship with your provider. For a flat monthly fee—typically less than your phone bill—you get unlimited access to your primary care team.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Calendar, title: "Same-Day Access", desc: "No more waiting weeks for appointments. Get seen when you need care." },
                  { icon: DollarSign, title: "No Surprise Bills", desc: "Transparent monthly fee covers all primary care visits and basic services." },
                  { icon: Clock, title: "Unrushed Visits", desc: "30-60 minute appointments mean your provider actually has time to listen." },
                  { icon: MessageCircle, title: "Direct Communication", desc: "Text, call, or video chat with your provider when questions arise." },
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

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>Who Is DPC For?</h2>
              <ul className="space-y-2 mb-6">
                {[
                  "Busy parents who want fast answers without dragging kids into a clinic",
                  "Adults tired of reactive, pill-first medicine seeking whole-person care",
                  "Those with chronic conditions who want real support and partnership",
                  "High-deductible plan holders seeking affordable access to quality care",
                  "People craving a provider who sees the whole human—not just your chart",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: "hsl(0, 0%, 85%)" }}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(177, 70%, 59%)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>What You Get With Your Membership</h2>
              <ul className="space-y-2 mb-8">
                {["Unlimited visits (in person or virtual)", "Routine labs twice a year", "Health coaching support", "Root-cause analysis & wellness planning", "Chronic care management", "Discounts on advanced labs, imaging, and more"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: "hsl(0, 0%, 85%)" }}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(177, 70%, 59%)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl p-6 text-center" style={{ background: "hsla(177, 70%, 59%, 0.1)" }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: "hsl(0, 0%, 100%)" }}>Let&apos;s reshape healthcare—together.</h3>
                <p style={{ color: "hsl(0, 0%, 85%)" }}>
                  The future of healthcare isn&apos;t about more technology or bigger systems. It&apos;s about getting back to basics: authentic relationships, quality time, and care that actually makes you feel better.
                </p>
              </div>
            </div>

            <div className="rounded-3xl p-8 text-center mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>Ready to Join the Health Movement?</h3>
              <a href={MEET_GREET_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}>
                Schedule a Free Meet and Greet
              </a>
            </div>

            <div className="rounded-3xl p-6 mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h4 className="font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>Related Reading</h4>
              <div className="space-y-2">
                <Link href="/blog/dpc-vs-concierge" className="block hover:opacity-80" style={{ color: "hsl(177, 70%, 59%)" }}>→ Direct Primary Care vs. Concierge Medicine</Link>
                <Link href="/blog/flu-shot-guide" className="block hover:opacity-80" style={{ color: "hsl(177, 70%, 59%)" }}>→ How the Flu Shot Works</Link>
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
