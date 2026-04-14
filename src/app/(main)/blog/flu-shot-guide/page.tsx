import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, Syringe, CheckCircle, AlertTriangle, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "How the Flu Shot Works: Safety, Risks & Why You Should Get Vaccinated | Colorado Springs Health Collective",
  description: "Learn how the flu vaccine works to protect you, its proven safety profile, potential risks, and why getting vaccinated each flu season matters for you and your community.",
};

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

export default function BlogFluShotGuide() {
  return (
    <div className="min-h-screen">
      <section
        className="relative min-h-screen"
        style={{ background: "transparent" }}
      >
        <div className="container mx-auto px-5 lg:px-8 py-20">
          <div className="flex items-center justify-center gap-4 mb-8 flex-wrap pt-20">
            {[
              { href: "/direct-primary-care", label: "Direct Primary Care" },
              { href: "/about", label: "About Us" },
              { href: "/faq", label: "FAQ" },
              { href: "/blog", label: "Blog" },
            ].map((link, i, arr) => (
              <span key={link.href} className="flex items-center gap-4">
                <Link href={link.href} className="hover:opacity-80 transition-opacity text-sm" style={{ color: "hsl(177, 70%, 59%)" }}>
                  {link.label}
                </Link>
                {i < arr.length - 1 && <span style={{ color: "hsl(0, 0%, 50%)" }}>|</span>}
              </span>
            ))}
          </div>

          <Link href="/blog" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity" style={{ color: "hsl(177, 70%, 59%)" }}>
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>

          <article className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(280, 70%, 65%), hsl(320, 70%, 65%))" }}>
                  <Syringe className="w-10 h-10" style={{ color: "hsl(210, 32%, 12%)" }} />
                </div>
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "hsl(280, 70%, 65%)", color: "hsl(210, 32%, 12%)" }}>
                Preventive Care
              </span>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight" style={{ color: "hsl(0, 0%, 100%)" }}>
                How the Flu Shot Works: Safety, Risks &amp; Why You Should Get Vaccinated
              </h1>
              <p style={{ color: "hsl(0, 0%, 60%)" }}>December 7, 2025 | 8 min read</p>
            </div>

            <div className="rounded-3xl p-8 lg:p-10 mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "hsl(0, 0%, 92%)" }}>
                Every year as temperatures drop and cold and flu season arrives in Colorado Springs, one question comes up repeatedly: &ldquo;Should I get a flu shot?&rdquo; At Colorado Springs Health Collective, we believe in empowering our members with knowledge so you can make informed decisions about your health.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>
                How Does the Flu Shot Actually Work?
              </h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 85%)" }}>
                The flu vaccine works by training your immune system to recognize and fight influenza viruses before they can make you seriously ill. Think of it as a practice drill for your body&apos;s defense system.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 85%)" }}>
                When you receive a flu shot, your body is exposed to either inactivated (killed) virus particles or specific proteins from the flu virus surface. These cannot cause the flu because they&apos;re not complete, living viruses. However, your immune system doesn&apos;t know the difference and responds as if facing a real threat.
              </p>

              <div className="rounded-2xl p-6 mb-6" style={{ background: "hsla(177, 70%, 59%, 0.1)" }}>
                <h3 className="font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>Here&apos;s what happens inside your body:</h3>
                <ol className="space-y-3">
                  {[
                    ["Recognition", "Your immune cells detect the foreign viral proteins"],
                    ["Response", "Your body produces antibodies specifically designed to target those proteins"],
                    ["Memory", "Special memory cells \"remember\" how to make these antibodies quickly"],
                    ["Protection", "If you encounter the real flu virus later, your immune system can respond rapidly"],
                  ].map(([term, desc], i) => (
                    <li key={i} className="flex gap-3" style={{ color: "hsl(0, 0%, 85%)" }}>
                      <span className="font-bold" style={{ color: "hsl(177, 70%, 59%)" }}>{i + 1}.</span>
                      <span><strong>{term}:</strong> {desc}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>
                Flu Vaccine Safety: What the Evidence Shows
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: "hsl(0, 0%, 85%)" }}>
                The flu vaccine is one of the most studied vaccines in existence, with decades of safety data from hundreds of millions of doses administered worldwide.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {[
                  { stat: "80+", label: "Years of flu vaccine use" },
                  { stat: "Billions", label: "Doses administered globally" },
                  { stat: "0.001%", label: "Serious reaction rate" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 rounded-2xl" style={{ background: "hsla(177, 70%, 59%, 0.1)" }}>
                    <div className="text-3xl font-bold" style={{ color: "hsl(177, 70%, 59%)" }}>{item.stat}</div>
                    <div style={{ color: "hsl(0, 0%, 75%)" }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>
                Common Side Effects (Mild and Temporary)
              </h2>
              <ul className="space-y-2 mb-6">
                {["Soreness at injection site (most common, ~60% of recipients)", "Low-grade fever", "Muscle aches", "Fatigue for a day or two", "Mild headaches"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: "hsl(0, 0%, 85%)" }}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(177, 70%, 59%)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-2xl p-6 mb-6" style={{ background: "hsla(45, 90%, 60%, 0.1)", borderLeft: "4px solid hsl(45, 90%, 60%)" }}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 flex-shrink-0" style={{ color: "hsl(45, 90%, 60%)" }} />
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: "hsl(45, 90%, 60%)" }}>Rare but Serious Reactions</h4>
                    <p style={{ color: "hsl(0, 0%, 85%)" }}>
                      Severe allergic reactions (anaphylaxis) can occur but are extremely rare, happening in approximately 1 in 1 million doses.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>
                Who Should Get Vaccinated?
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {["Adults 65 and older", "Pregnant women", "Children under 5", "People with chronic conditions", "Healthcare workers", "Caregivers of vulnerable individuals"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "hsla(177, 70%, 59%, 0.1)" }}>
                    <Users className="w-5 h-5" style={{ color: "hsl(177, 70%, 59%)" }} />
                    <span style={{ color: "hsl(0, 0%, 92%)" }}>{item}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>The Bottom Line</h2>
              <p className="mb-6" style={{ color: "hsl(0, 0%, 85%)" }}>
                The flu vaccine is a safe, well-studied tool for protecting yourself and your community from a potentially serious illness. The evidence overwhelmingly supports that the benefits outweigh the risks for most people.
              </p>
              <p className="mb-8" style={{ color: "hsl(0, 0%, 85%)" }}>
                At Colorado Springs Health Collective, we take the time to discuss your individual health situation and answer any questions you have about vaccination.
              </p>
            </div>

            <div className="rounded-3xl p-8 text-center mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
                Ready to Protect Yourself This Flu Season?
              </h3>
              <p className="mb-6" style={{ color: "hsl(0, 0%, 85%)" }}>
                As a Colorado Springs Health Collective member, you have direct access to your providers for questions about flu vaccination and other preventive care.
              </p>
              <a
                href={MEET_GREET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-full font-semibold text-lg"
                style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}
              >
                Schedule Your Free Meet &amp; Greet
              </a>
            </div>

            <div className="rounded-3xl p-6 mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h4 className="font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>Related Reading</h4>
              <div className="space-y-2">
                <Link href="/blog/dpc-vs-concierge" className="block hover:opacity-80" style={{ color: "hsl(177, 70%, 59%)" }}>
                  → Direct Primary Care vs. Concierge Medicine: Colorado Springs Guide
                </Link>
                <Link href="/blog/why-direct-primary-care" className="block hover:opacity-80" style={{ color: "hsl(177, 70%, 59%)" }}>
                  → Why Direct Primary Care Is the Future of Health
                </Link>
              </div>
            </div>
          </article>

          <div className="text-center mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <a href="tel:+17198244716" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone className="w-5 h-5" style={{ color: "hsl(177, 70%, 59%)" }} />
                <span style={{ color: "hsl(0, 0%, 92%)" }}>(719) 824-4716</span>
              </a>
              <a href="mailto:dpc@coshealthcollective.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
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
