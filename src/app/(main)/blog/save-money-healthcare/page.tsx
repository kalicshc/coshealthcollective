import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Save Money on Healthcare: 7 Smart Strategies | Colorado Springs Health Collective",
  description: "Learn practical ways to save money on healthcare—from cash-pay options and discount pharmacies to imaging price shopping and avoiding surprise bills.",
};

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

export default function BlogSaveMoneyHealthcare() {
  return (
    <div className="min-h-screen">
      <section className="relative" style={{ background: "hsl(210, 32%, 8%)" }}>

        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <Image src="/blog/save-money-hero.jpg" alt="Healthcare savings strategies" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsla(210,32%,8%,0.65) 0%, hsla(210,32%,8%,0.93) 55%, hsl(210,32%,8%) 85%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-5 lg:px-8">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 mb-6 text-sm hover:opacity-80" style={{ color: "hsl(177, 70%, 65%)" }}>
                <ArrowLeft className="w-4 h-4" /> Back to All Articles
              </Link>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: "hsl(140, 70%, 55%)", color: "hsl(210, 32%, 10%)" }}>Smart Savings</span>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
                How to Save Money on Healthcare: 7 Smart Strategies Most People Don&apos;t Know
              </h1>
              <p className="text-sm" style={{ color: "hsl(0, 0%, 60%)" }}>February 2026 · 6 min read</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 lg:px-8 py-12">
          <article className="max-w-4xl mx-auto">

            <div className="rounded-2xl p-8 mb-10 text-center" style={{ background: "linear-gradient(135deg, hsla(140,70%,50%,0.12), hsla(177,70%,50%,0.12))", border: "1px solid hsla(140,70%,50%,0.3)" }}>
              <div className="text-5xl font-black mb-2" style={{ color: "hsl(140, 70%, 60%)" }}>2–5×</div>
              <div className="text-lg font-semibold mb-1" style={{ color: "hsl(0, 0%, 95%)" }}>Hospital vs. Independent Imaging Price Gap</div>
              <div className="text-sm" style={{ color: "hsl(0, 0%, 60%)" }}>Same scan. Same quality. Wildly different price — and most people never ask.</div>
            </div>

            <p className="text-lg leading-relaxed mb-10" style={{ color: "hsl(210, 25%, 85%)" }}>
              If you&apos;ve ever opened a medical bill and thought &ldquo;how is this possible?&rdquo; — you&apos;re not alone. Healthcare pricing in the U.S. is intentionally opaque. But the gaps are real, they&apos;re large, and knowing seven things can save your family thousands of dollars a year.
            </p>

            {[
              { num: "01", title: "Ask for Cash-Pay Prices", sub: "Even if you have insurance", stat: "Often 40–80% cheaper than billing insurance pre-deductible", body: "The cash price for a service is frequently lower than what you'd pay through insurance — especially before you've hit your deductible. Ask every provider: \"What's your cash price if you don't bill insurance?\" Clinics are often motivated to say yes — they skip the billing overhead entirely.", color: "hsl(140, 70%, 60%)" },
              { num: "02", title: "Use Prescription Discount Tools", sub: "GoodRx and Cost Plus Drugs", stat: "GoodRx regularly beats insurance copays by 30–70%", body: "Your insurance copay is not always the cheapest option — sometimes it's not even close. Before filling any prescription, check GoodRx (local pharmacy comparison) and Cost Plus Drugs (Mark Cuban's transparent-pricing pharmacy). It takes 60 seconds and is often worth real money.", color: "hsl(160, 70%, 55%)" },
              { num: "03", title: "Shop Imaging Prices", sub: "CT, MRI, Ultrasound", stat: "Independent centers are typically 2–5× cheaper than hospital systems", body: "Hospital-based imaging is dramatically more expensive than independent imaging centers — for the exact same scan, read by the same type of radiologist. You don't have to go where your doctor orders. Take the order to any credentialed facility. Call and ask for their cash price first.", color: "hsl(177, 70%, 59%)" },
              { num: "04", title: "Get Wholesale Lab Pricing", sub: "Skip the hospital lab", stat: "Direct-access labs can cost 10× less than hospital billing", body: "Hospital lab billing is one of the most egregious markups in healthcare. A basic metabolic panel that costs $12 at a direct-access lab can be $180+ at a hospital. Ask your provider for itemized lab pricing upfront, or ask if they offer wholesale direct pricing to patients.", color: "hsl(200, 70%, 60%)" },
              { num: "05", title: "Demand Upfront Transparency", sub: "CPT codes and written estimates", stat: "Up to 80% of medical bills contain errors — most go unchallenged", body: "Before any procedure, ask for the CPT code and a written cost estimate. Confirm who is billing you — a facility visit can generate separate bills from the hospital, anesthesiologist, radiologist, and surgeon. Get each itemized. Errors are common and providers expect some patients to push back.", color: "hsl(45, 90%, 60%)" },
              { num: "06", title: "Negotiate Every Bill", sub: "Your bill is not final", stat: "Most hospital bills are negotiable — few patients know this", body: "Call the billing department. Ask if there's a discount for paying in full, or request an interest-free payment plan. Audit every line of the itemized bill. Errors, duplicate charges, and billed-but-not-rendered services are shockingly common. The billing department has discretion and uses it for patients who ask.", color: "hsl(30, 85%, 62%)" },
              { num: "07", title: "Consider Direct Primary Care", sub: "The long-game savings move", stat: "$50–150/month — unlimited primary care, no copays, no surprises", body: "DPC eliminates the billing layer entirely for primary care. One flat monthly fee covers unlimited visits, same-day access, and direct communication with your provider. Members also get wholesale pricing on labs and medications. For most families, DPC + a high-deductible plan is significantly cheaper than traditional insurance-based primary care.", color: "hsl(177, 70%, 59%)" },
            ].map((s) => (
              <div key={s.num} className="rounded-2xl overflow-hidden mb-5" style={{ background: `${s.color}11`, border: `1px solid ${s.color}33` }}>
                <div className="flex items-start gap-4 p-6">
                  <div className="text-3xl font-black flex-shrink-0 leading-none mt-1" style={{ color: s.color }}>{s.num}</div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold" style={{ color: "hsl(0, 0%, 97%)" }}>{s.title}</h2>
                    <p className="text-sm mb-3" style={{ color: s.color }}>{s.sub}</p>
                    <div className="rounded-xl px-4 py-2 mb-4 text-sm font-semibold" style={{ background: `${s.color}22`, color: s.color }}>{s.stat}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(0, 0%, 80%)" }}>{s.body}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl p-6 mb-8" style={{ background: "hsla(210, 22%, 18%, 0.8)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "hsl(140, 70%, 65%)" }}>The Bottom Line</h2>
              <div className="space-y-2 mb-6">
                {["Ask for cash prices before any visit, lab, or procedure", "Compare medication costs with GoodRx before every fill", "Shop imaging — the same scan has wildly different prices", "Get CPT codes and written estimates upfront", "Partner with a provider not tied to insurance incentives"].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "hsl(140, 70%, 65%)" }} />
                    <span className="text-sm" style={{ color: "hsl(0, 0%, 85%)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(0, 0%, 75%)" }}>
                In Colorado Springs and want help navigating affordable care?{" "}
                <Link href="/direct-primary-care" className="underline font-semibold hover:opacity-80" style={{ color: "hsl(177, 70%, 65%)" }}>Our DPC memberships</Link>{" "}
                come with a free meet-and-greet so you can see if it&apos;s the right fit.
              </p>
            </div>

            <div className="rounded-3xl p-8 lg:p-10 mb-8 text-center" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>Want help navigating affordable healthcare?</h3>
              <p className="mb-6" style={{ color: "hsl(0, 0%, 85%)" }}>Book a free meet and greet to see if DPC is right for you.</p>
              <a href={MEET_GREET_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(140, 70%, 55%), hsl(177, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}>
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

