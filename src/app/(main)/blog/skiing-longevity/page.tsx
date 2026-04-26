import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, CheckCircle, Dumbbell } from "lucide-react";

export const metadata: Metadata = {
  title: "Skiing Into Your 70s: A Colorado Springs Guide to Longevity on the Slopes | Colorado Springs Health Collective",
  description: "Learn how to keep skiing for decades with proper strength training, nutrition, sleep, and recovery. Colorado Springs longevity tips for lifelong skiers.",
};

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

export default function BlogSkiingLongevity() {
  return (
    <div className="min-h-screen">
      <section className="relative" style={{ background: "hsl(210, 32%, 8%)" }}>

        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <Image src="/blog/skiing-hero.jpg" alt="Colorado skiing longevity" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsla(210,32%,8%,0.4) 0%, hsla(210,32%,8%,0.85) 70%, hsl(210,32%,8%) 100%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-5 lg:px-8">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 mb-6 text-sm hover:opacity-80" style={{ color: "hsl(177, 70%, 65%)" }}>
                <ArrowLeft className="w-4 h-4" /> Back to All Articles
              </Link>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: "hsl(200, 70%, 60%)", color: "hsl(210, 32%, 10%)" }}>Longevity</span>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
                Skiing Into Your 70s: A Colorado Springs Guide to Longevity on the Slopes
              </h1>
              <p className="text-sm" style={{ color: "hsl(0, 0%, 60%)" }}>January 2026 · 10 min read</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 lg:px-8 py-12">
          <article className="max-w-4xl mx-auto">

            {/* Key stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { num: "500–700", unit: "cal/hr", label: "Burned skiing" },
                { num: "1.0–1.2g", unit: "/lb/day", label: "Protein target 50+" },
                { num: "8–12", unit: "weeks", label: "Pre-season prep" },
                { num: "3–5%", unit: "/decade", label: "Muscle lost after 30" },
              ].map((s) => (
                <div key={s.num} className="rounded-2xl p-5 text-center" style={{ background: "hsla(200, 70%, 50%, 0.12)", border: "1px solid hsla(200, 70%, 50%, 0.25)" }}>
                  <div className="text-2xl font-black leading-none" style={{ color: "hsl(200, 70%, 65%)" }}>{s.num}</div>
                  <div className="text-xs font-bold mb-1" style={{ color: "hsl(200, 70%, 55%)" }}>{s.unit}</div>
                  <div className="text-xs" style={{ color: "hsl(0, 0%, 60%)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <p className="text-lg leading-relaxed mb-10" style={{ color: "hsl(210, 25%, 85%)" }}>
              Living in Colorado Springs means having world-class skiing just a couple hours away. The question isn&apos;t whether you <em>can</em> ski into your 70s — it&apos;s whether you&apos;re setting yourself up for it now. The five pillars below are what separates skiers who are still ripping groomers at 72 from those who quit at 55.
            </p>

            <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: "hsl(177, 70%, 65%)" }}>The Five Pillars of Ski Longevity</h2>

            {/* Sleep */}
            <div className="rounded-2xl overflow-hidden mb-5" style={{ background: "hsla(260, 70%, 60%, 0.1)", border: "1px solid hsla(260, 70%, 60%, 0.2)" }}>
              <div className="flex items-center gap-4 px-6 pt-6 pb-4">
                <div className="text-4xl font-black" style={{ color: "hsl(260, 70%, 65%)" }}>7–9</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "hsl(260, 70%, 65%)" }}>hours/night</div>
                  <h3 className="text-xl font-bold" style={{ color: "hsl(0, 0%, 95%)" }}>Sleep: Your Secret Recovery Weapon</h3>
                </div>
              </div>
              <div className="px-6 pb-6">
                <p className="leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 82%)" }}>
                  Sleep is when your body repairs micro-damage from a hard day on the mountain. Arrive a day early for multi-day trips to acclimate to altitude — even one night of poor sleep at elevation increases injury risk the next day.
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {["Consistent bedtime, even on ski weekends", "Cool, dark room — blackout curtains in rentals", "Limit alcohol — it wrecks deep sleep phases", "Hydrate hard during the day, taper before bed"].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(260, 70%, 65%)" }} />
                      <span className="text-sm" style={{ color: "hsl(0, 0%, 82%)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Nutrition */}
            <div className="rounded-2xl overflow-hidden mb-5" style={{ background: "hsla(350, 70%, 60%, 0.1)", border: "1px solid hsla(350, 70%, 60%, 0.2)" }}>
              <div className="flex items-center gap-4 px-6 pt-6 pb-4">
                <div className="text-4xl font-black" style={{ color: "hsl(350, 70%, 70%)" }}>1.2g</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "hsl(350, 70%, 70%)" }}>protein per lb/day</div>
                  <h3 className="text-xl font-bold" style={{ color: "hsl(0, 0%, 95%)" }}>Nutrition: Fuel for Cold-Weather Output</h3>
                </div>
              </div>
              <div className="px-6 pb-6">
                <p className="leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 82%)" }}>
                  Skiing burns 500–700 calories per hour — more than most people realize. At altitude your appetite suppresses even as your caloric need spikes. Skiers over 50 need more protein than younger athletes to maintain muscle, not less.
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {["Protein-first breakfast before first run", "Snack every 2 hours on the mountain", "Anti-inflammatory foods: salmon, berries, olive oil", "Electrolytes — not just water — for hydration at altitude"].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(350, 70%, 65%)" }} />
                      <span className="text-sm" style={{ color: "hsl(0, 0%, 82%)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strength */}
            <div className="rounded-2xl overflow-hidden mb-5" style={{ background: "hsla(177, 70%, 50%, 0.1)", border: "1px solid hsla(177, 70%, 50%, 0.2)" }}>
              <div className="flex items-center gap-4 px-6 pt-6 pb-4">
                <div className="text-4xl font-black" style={{ color: "hsl(177, 70%, 65%)" }}>8–12</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "hsl(177, 70%, 65%)" }}>weeks pre-season</div>
                  <h3 className="text-xl font-bold" style={{ color: "hsl(0, 0%, 95%)" }}>Strength: The Foundation of Injury Prevention</h3>
                </div>
              </div>
              <div className="px-6 pb-6">
                <p className="leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 82%)" }}>
                  Strong quads are the single most important factor in knee protection on skis. ACL tears, the most common serious ski injury, are dramatically reduced in skiers with strong lower body and core. Don&apos;t wait until December.
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {["Squats and lunges 2–3× per week", "Single-leg exercises for balance and stability", "Core — planks, rotational work, dead bugs", "Bulgarian split squats for ski-specific strength"].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Dumbbell className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(177, 70%, 55%)" }} />
                      <span className="text-sm" style={{ color: "hsl(0, 0%, 82%)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sarcopenia */}
            <div className="rounded-2xl overflow-hidden mb-5" style={{ background: "hsla(30, 80%, 55%, 0.1)", border: "1px solid hsla(30, 80%, 55%, 0.2)" }}>
              <div className="flex items-center gap-4 px-6 pt-6 pb-4">
                <div className="text-4xl font-black" style={{ color: "hsl(30, 80%, 70%)" }}>3–5%</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "hsl(30, 80%, 70%)" }}>muscle lost per decade</div>
                  <h3 className="text-xl font-bold" style={{ color: "hsl(0, 0%, 95%)" }}>Muscle Maintenance: Fighting Sarcopenia</h3>
                </div>
              </div>
              <div className="px-6 pb-6">
                <p className="leading-relaxed" style={{ color: "hsl(0, 0%, 82%)" }}>
                  Starting around age 30, we lose 3–5% of muscle mass per decade without deliberate resistance training. By 70 that&apos;s potentially 20% less muscle than your peak — which explains why unfit 70-year-olds struggle on terrain that fit ones handle easily. Resistance training 2–4 days per week year-round reverses this at any age. The research is unambiguous on this point.
                </p>
              </div>
            </div>

            {/* Mental */}
            <div className="rounded-2xl overflow-hidden mb-10" style={{ background: "hsla(0, 70%, 60%, 0.1)", border: "1px solid hsla(0, 70%, 60%, 0.2)" }}>
              <div className="px-6 pt-6 pb-2">
                <h3 className="text-xl font-bold mb-3" style={{ color: "hsl(0, 70%, 75%)" }}>5. Mental Game: Ski Smarter, Not Harder</h3>
              </div>
              <div className="px-6 pb-6">
                <p className="leading-relaxed" style={{ color: "hsl(0, 0%, 82%)" }}>
                  Longevity skiing isn&apos;t about skiing harder — it&apos;s about skiing smarter. The skiers who last into their 70s know when to call it a day, choose terrain that matches their current condition, and find joy in the experience rather than the adrenaline. The goal isn&apos;t today&apos;s run. It&apos;s next season&apos;s run too.
                </p>
              </div>
            </div>

            {/* Pull quote */}
            <div className="rounded-2xl p-8 mb-10 text-center" style={{ background: "linear-gradient(135deg, hsla(200, 70%, 50%, 0.15), hsla(177, 70%, 50%, 0.15))", border: "1px solid hsla(200, 70%, 50%, 0.3)" }}>
              <p className="text-xl lg:text-2xl font-bold italic leading-snug" style={{ color: "hsl(0, 0%, 95%)" }}>
                &ldquo;The best time to start building ski longevity was 20 years ago. The second best time is today.&rdquo;
              </p>
            </div>

            {/* Provider section */}
            <div className="rounded-2xl p-6 mb-8" style={{ background: "hsla(210, 22%, 18%, 0.8)" }}>
              <h2 className="text-2xl font-bold mb-3" style={{ color: "hsl(177, 70%, 65%)" }}>Having a Provider Who Gets It</h2>
              <p className="leading-relaxed" style={{ color: "hsl(0, 0%, 82%)" }}>
                With Direct Primary Care, you have a healthcare provider who actually knows you — your goals, your activities, your body. When you tweak something on the mountain, you can text your provider that same day. No appointment required, no waiting room, no surprise bill. That kind of relationship is what makes proactive longevity medicine possible.
              </p>
            </div>

            <div className="rounded-3xl p-8 lg:p-10 text-center" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>Ready to build your longevity plan?</h3>
              <p className="mb-6" style={{ color: "hsl(0, 0%, 85%)" }}>Book a free meet and greet to see if DPC is right for you.</p>
              <a href={MEET_GREET_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(45, 90%, 60%), hsl(30, 85%, 58%))", color: "hsl(210, 32%, 12%)" }}>
                Book Free Meet &amp; Greet
              </a>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
                <a href="tel:+17198244716" className="flex items-center gap-3 hover:opacity-80">
                  <Phone className="w-5 h-5" style={{ color: "hsl(177, 70%, 65%)" }} />
                  <span style={{ color: "hsl(0, 0%, 85%)" }}>(719) 824-4716</span>
                </a>
                <a href="mailto:dpc@coshealthcollective.com" className="flex items-center gap-3 hover:opacity-80">
                  <Mail className="w-5 h-5" style={{ color: "hsl(177, 70%, 65%)" }} />
                  <span style={{ color: "hsl(0, 0%, 85%)" }}>dpc@coshealthcollective.com</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

