import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, CheckCircle, AlertTriangle, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "How the Flu Shot Works: Safety, Risks & Why You Should Get Vaccinated | Colorado Springs Health Collective",
  description: "Learn how the flu vaccine works to protect you, its proven safety profile, potential risks, and why getting vaccinated each flu season matters for you and your community.",
};

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

export default function BlogFluShotGuide() {
  return (
    <div className="min-h-screen">
      <section className="relative" style={{ background: "hsl(210, 32%, 8%)" }}>

        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <Image src="/blog/flu-shot-hero.jpg" alt="Flu vaccine preventive care" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsla(210,32%,8%,0.65) 0%, hsla(210,32%,8%,0.93) 55%, hsl(210,32%,8%) 85%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-5 lg:px-8">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 mb-6 text-sm hover:opacity-80" style={{ color: "hsl(177, 70%, 65%)" }}>
                <ArrowLeft className="w-4 h-4" /> Back to All Articles
              </Link>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: "hsl(280, 70%, 65%)", color: "hsl(210, 32%, 10%)" }}>Preventive Care</span>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
                How the Flu Shot Works: Safety, Risks &amp; Why You Should Get Vaccinated
              </h1>
              <p className="text-sm" style={{ color: "hsl(0, 0%, 60%)" }}>December 2025 · 8 min read</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 lg:px-8 py-12">
          <article className="max-w-4xl mx-auto">

            {/* Safety stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { stat: "80+", label: "Years of clinical use" },
                { stat: "Billions", label: "Doses given globally" },
                { stat: "1 in 1M", label: "Serious reaction rate" },
              ].map((item) => (
                <div key={item.stat} className="text-center p-5 rounded-2xl" style={{ background: "hsla(280, 70%, 60%, 0.1)", border: "1px solid hsla(280, 70%, 60%, 0.25)" }}>
                  <div className="text-2xl font-black mb-1" style={{ color: "hsl(280, 70%, 70%)" }}>{item.stat}</div>
                  <div className="text-xs" style={{ color: "hsl(0, 0%, 65%)" }}>{item.label}</div>
                </div>
              ))}
            </div>

            <p className="text-lg leading-relaxed mb-10" style={{ color: "hsl(210, 25%, 85%)" }}>
              Every fall in Colorado Springs, the same question comes up: should I actually get the flu shot? The short answer is yes — and the evidence behind it is stronger than most people realize. Here&apos;s how it works, what the risks actually are, and who benefits most.
            </p>

            <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: "hsl(177, 70%, 65%)" }}>How the Flu Shot Actually Works</h2>
            <p className="leading-relaxed mb-6" style={{ color: "hsl(210, 25%, 82%)" }}>
              The flu vaccine trains your immune system to recognize influenza proteins before the real virus arrives. It exposes your body to inactivated viral particles — enough to trigger an immune response, not enough to cause illness.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {[
                { step: "01", title: "Recognition", desc: "Immune cells detect the foreign viral proteins introduced by the vaccine.", color: "hsl(280, 70%, 65%)" },
                { step: "02", title: "Response", desc: "Your body manufactures antibodies specifically shaped to neutralize those proteins.", color: "hsl(300, 70%, 65%)" },
                { step: "03", title: "Memory", desc: "Specialized memory cells store the blueprint to reproduce antibodies rapidly.", color: "hsl(320, 70%, 65%)" },
                { step: "04", title: "Protection", desc: "When the real flu arrives, your immune system fires within hours — not days.", color: "hsl(340, 70%, 65%)" },
              ].map((s) => (
                <div key={s.step} className="rounded-2xl p-5" style={{ background: "hsla(280, 70%, 60%, 0.08)", borderLeft: `3px solid ${s.color}` }}>
                  <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: s.color }}>{s.step}</div>
                  <h3 className="font-bold mb-1" style={{ color: "hsl(0, 0%, 95%)" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(0, 0%, 75%)" }}>{s.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: "hsl(177, 70%, 65%)" }}>Safety: What the Data Shows</h2>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl p-6" style={{ background: "hsla(177, 70%, 50%, 0.08)", border: "1px solid hsla(177, 70%, 50%, 0.2)" }}>
                <h3 className="font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>Common Side Effects</h3>
                <div className="space-y-2">
                  {["Sore arm at injection site (~60%)", "Low-grade fever (uncommon)", "Muscle aches for 1–2 days", "Mild fatigue"].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(177, 70%, 59%)" }} />
                      <span className="text-sm" style={{ color: "hsl(0, 0%, 82%)" }}>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-3" style={{ color: "hsl(0, 0%, 55%)" }}>These are signs your immune system is responding — not illness.</p>
              </div>
              <div className="rounded-2xl p-6" style={{ background: "hsla(45, 90%, 55%, 0.08)", border: "1px solid hsla(45, 90%, 55%, 0.25)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4" style={{ color: "hsl(45, 90%, 60%)" }} />
                  <h3 className="font-bold" style={{ color: "hsl(45, 90%, 65%)" }}>Rare Reactions</h3>
                </div>
                <div className="text-3xl font-black mb-1" style={{ color: "hsl(45, 90%, 65%)" }}>1 in 1M</div>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(0, 0%, 75%)" }}>
                  Severe allergic reactions (anaphylaxis) occur in approximately 1 per million doses — all managed on-site. Guillain-Barré syndrome risk is 1–2 per million, comparable to the risk from influenza infection itself.
                </p>
              </div>
            </div>

            <div className="rounded-2xl p-7 mb-10 text-center" style={{ background: "linear-gradient(135deg, hsla(280,70%,55%,0.12), hsla(177,70%,50%,0.12))", border: "1px solid hsla(280,70%,55%,0.25)" }}>
              <p className="text-lg font-bold italic" style={{ color: "hsl(0, 0%, 95%)" }}>
                &ldquo;The flu shot doesn&apos;t give you the flu. The soreness means it&apos;s working.&rdquo;
              </p>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold mb-5" style={{ color: "hsl(177, 70%, 65%)" }}>Who Should Get Vaccinated?</h2>
            <div className="grid md:grid-cols-2 gap-3 mb-10">
              {["Adults 65 and older", "Pregnant women", "Children under 5", "People with chronic conditions", "Healthcare workers", "Caregivers of vulnerable individuals"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "hsla(280, 70%, 60%, 0.08)", border: "1px solid hsla(280, 70%, 60%, 0.15)" }}>
                  <Users className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(280, 70%, 65%)" }} />
                  <span className="text-sm font-medium" style={{ color: "hsl(0, 0%, 90%)" }}>{item}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-6 mb-8" style={{ background: "hsla(210, 22%, 18%, 0.8)" }}>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(177, 70%, 65%)" }}>The Bottom Line</h2>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(0, 0%, 82%)" }}>
                The flu vaccine is extraordinarily well-studied. Benefits overwhelmingly outweigh risks for nearly everyone. At Colorado Springs Health Collective, we take the time to discuss your individual situation — no rushed 7-minute visit, no pressure, just honest information.
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

