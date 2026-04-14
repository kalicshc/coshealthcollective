import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, Mountain, CheckCircle, Dumbbell, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Skiing Into Your 70s: A Colorado Springs Guide to Longevity on the Slopes | Colorado Springs Health Collective",
  description: "Learn how to keep skiing for decades with proper strength training, nutrition, sleep, and recovery. Colorado Springs longevity tips for lifelong skiers.",
};

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

export default function BlogSkiingLongevity() {
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
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(200, 70%, 60%), hsl(177, 70%, 59%))" }}>
                  <Mountain className="w-10 h-10" style={{ color: "hsl(210, 32%, 12%)" }} />
                </div>
              </div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: "hsl(200, 70%, 60%)", color: "hsl(210, 32%, 12%)" }}>Longevity &amp; Wellness</span>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight" style={{ color: "hsl(0, 0%, 100%)" }}>
                Skiing Into Your 70s: A Colorado Springs Guide to Longevity on the Slopes
              </h1>
              <p style={{ color: "hsl(0, 0%, 60%)" }}>January 14, 2026 | 10 min read</p>
            </div>

            <div className="rounded-3xl p-8 lg:p-10 mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "hsl(0, 0%, 92%)" }}>
                Living in Colorado Springs means having world-class skiing just a couple hours away. The question isn&apos;t whether you <em>can</em> ski into your 70s—it&apos;s whether you&apos;re setting yourself up for it now.
              </p>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>The Five Pillars of Ski Longevity</h2>

              {/* Sleep */}
              <div className="rounded-2xl p-6 mb-6" style={{ background: "hsla(260, 70%, 60%, 0.15)" }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: "hsl(260, 70%, 75%)" }}>1. Sleep: Your Secret Weapon for Recovery</h3>
                <p className="leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 85%)" }}>
                  Sleep is when your body repairs the micro-damage from a hard day on the mountain. Plan for 7-9 hours on ski trip nights, and consider arriving a day early for multi-day trips to acclimate to altitude.
                </p>
                <ul className="space-y-2">
                  {["Consistent bedtime, even on ski weekends", "Cool, dark room (blackout curtains in mountain rentals)", "Limit alcohol—it disrupts deep sleep phases", "Hydrate well, but taper fluids before bed"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ color: "hsl(0, 0%, 85%)" }}>
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(260, 70%, 65%)" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nutrition */}
              <div className="rounded-2xl p-6 mb-6" style={{ background: "hsla(350, 70%, 60%, 0.15)" }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: "hsl(350, 70%, 75%)" }}>2. Nutrition: Fuel for Cold Weather Performance</h3>
                <p className="leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 85%)" }}>
                  Skiing burns 500-700 calories per hour. Skiers over 50 should aim for 1.0-1.2g of protein per pound of body weight daily. Prioritize protein-rich breakfasts, steady snacking, anti-inflammatory foods, and hydration.
                </p>
              </div>

              {/* Strength */}
              <div className="rounded-2xl p-6 mb-6" style={{ background: "hsla(177, 70%, 50%, 0.15)" }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: "hsl(177, 70%, 65%)" }}>3. Strength: The Foundation of Injury Prevention</h3>
                <p className="leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 85%)" }}>
                  Strong quads protect your knees. Start pre-season conditioning 8-12 weeks before ski season with squats, lunges, single-leg exercises, and core work.
                </p>
                <ul className="space-y-2">
                  {["Squats and lunges (2-3x per week minimum)", "Single-leg exercises for balance and stability", "Core work—planks, rotational exercises", "Start 8-12 weeks before ski season"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2" style={{ color: "hsl(0, 0%, 85%)" }}>
                      <Dumbbell className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "hsl(177, 70%, 55%)" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Muscle Maintenance */}
              <div className="rounded-2xl p-6 mb-6" style={{ background: "hsla(30, 80%, 55%, 0.15)" }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: "hsl(30, 80%, 70%)" }}>4. Muscle Maintenance: Fighting Sarcopenia</h3>
                <p className="leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 85%)" }}>
                  Starting around age 30, we lose 3-5% of muscle mass per decade. Resistance training 2-4 days per week year-round can reverse this at any age.
                </p>
              </div>

              {/* Mental */}
              <div className="rounded-2xl p-6 mb-6" style={{ background: "hsla(0, 70%, 60%, 0.15)" }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: "hsl(0, 70%, 75%)" }}>5. Mental Game: Fear, Wisdom, and Joy</h3>
                <p className="leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 85%)" }}>
                  Longevity skiing isn&apos;t about skiing harder—it&apos;s about skiing smarter. Know when to call it a day, choose runs that match your current condition, and find joy in the experience rather than the adrenaline. The goal is to ski next season, too.
                </p>
              </div>

              <h2 className="text-2xl font-bold mb-4 mt-8" style={{ color: "hsl(177, 70%, 65%)" }}>Having a Provider Who Gets It</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 85%)" }}>
                With Direct Primary Care, you have a healthcare provider who actually knows you—your goals, your activities, your body. When you tweak something on the mountain, you can text your provider that same day.
              </p>

              <div className="rounded-2xl p-6 mb-6 text-center" style={{ background: "linear-gradient(135deg, hsla(177, 70%, 50%, 0.2), hsla(200, 70%, 50%, 0.2))", border: "1px solid hsla(177, 70%, 50%, 0.3)" }}>
                <h3 className="text-xl font-bold mb-2" style={{ color: "hsl(0, 0%, 100%)" }}>Want the Complete Framework?</h3>
                <p className="mb-4" style={{ color: "hsl(0, 0%, 85%)" }}>
                  Download our free <strong>Longevity 101 Toolkit</strong>—a printable guide covering sleep, nutrition, exercise, muscle maintenance, and emotional wellness.
                </p>
                <Link href="/longevity-toolkit-download" className="inline-block px-8 py-3 rounded-full font-semibold" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(200, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}>
                  Get Your Free Toolkit
                </Link>
              </div>

              <p className="leading-relaxed mb-6" style={{ color: "hsl(0, 0%, 85%)" }}>
                The best time to start building ski longevity was 20 years ago. The second best time is today. Colorado skiing is special. We&apos;ll see you on the slopes.
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
