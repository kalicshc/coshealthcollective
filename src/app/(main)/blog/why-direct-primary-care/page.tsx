import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ArrowLeft, Calendar, DollarSign, Clock, MessageCircle, CheckCircle } from "lucide-react";
import { clinicFacts } from "@/lib/clinicFacts";
import { ACCENTS } from "@/lib/accents";
import { BlogCtaBlock } from "@/components/BlogCtaBlock";
import { breadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

const A = ACCENTS.dpc;

export const metadata: Metadata = {
  title: "Why Direct Primary Care Is the Future of Health",
  description: "Discover how Direct Primary Care in Colorado Springs is redefining healthcare: no insurance hoops, no rushed visits, just real care when you need it.",
  alternates: { canonical: "/blog/why-direct-primary-care" },
  openGraph: {
    title: "Why Direct Primary Care Is the Future of Health",
    description: "No insurance hoops, no rushed visits — how DPC is redefining healthcare in Colorado Springs.",
    url: "https://coshealthcollective.com/blog/why-direct-primary-care",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Direct Primary Care Is the Future of Health (And Why It Matters for You)",
  description: "No insurance hoops, no rushed visits — how DPC is redefining healthcare in Colorado Springs.",
  datePublished: "2025-08-15",
  dateModified: "2025-08-15",
  author: { "@type": "Organization", name: "Colorado Springs Health Collective" },
  publisher: { "@type": "Organization", name: "Colorado Springs Health Collective", url: "https://coshealthcollective.com", logo: { "@type": "ImageObject", url: "https://coshealthcollective.com/logo-main.png" } },
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://coshealthcollective.com/blog/why-direct-primary-care" },
  image: "https://coshealthcollective.com/blog/why-dpc-hero.jpg",
};

const breadcrumbs = breadcrumbSchema([
  { name: "Blog", path: "/blog" },
  { name: "Why Direct Primary Care Is the Future of Health", path: "/blog/why-direct-primary-care" },
]);

export default function BlogWhyDirectPrimaryCare() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <JsonLd data={breadcrumbs} />
      <section className="relative" style={{ background: "hsl(210, 32%, 8%)" }}>

        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <Image src="/blog/why-dpc-hero.jpg" alt="Wellness and primary care in Colorado Springs" fill className="object-cover" priority />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsla(210,32%,8%,0.65) 0%, hsla(210,32%,8%,0.93) 55%, hsl(210,32%,8%) 85%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-5 lg:px-8">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 mb-6 text-sm hover:opacity-80" style={{ color: `rgb(${A.rgb})` }}>
                <ArrowLeft className="w-4 h-4" /> Back to All Articles
              </Link>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: "hsl(45, 90%, 60%)", color: "hsl(210, 32%, 10%)" }}>DPC</span>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
                Why Direct Primary Care Is the Future of Health (And Why It Matters for You)
              </h1>
              <p className="text-sm" style={{ color: "hsl(0, 0%, 60%)" }}>August 2025 · 6 min read</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 lg:px-8 py-12">
          <article className="max-w-4xl mx-auto">

            {/* Opening pull quote */}
            <div className="rounded-2xl p-8 mb-10" style={{ background: `linear-gradient(135deg, rgba(${A.rgb},0.12), hsla(45,90%,55%,0.08))`, border: `1px solid rgba(${A.rgb},0.3)` }}>
              <p className="text-xl lg:text-2xl font-medium italic leading-relaxed mb-0" style={{ color: "hsl(0, 0%, 95%)" }}>
                &ldquo;You wake up feeling run down. You text your provider — and they actually respond. Same day. No waiting rooms. No five-minute rushed visit. No surprise bill.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold" style={{ color: `rgb(${A.rgb})` }}>This isn&apos;t a fantasy. It&apos;s Direct Primary Care.</p>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { num: "$50–150", unit: "/month", label: "Flat membership fee" },
                { num: "30–60", unit: "min visits", label: "Unrushed appointments" },
                { num: "Same", unit: "day access", label: "When you need care" },
              ].map((s) => (
                <div key={s.num} className="rounded-2xl p-5 text-center" style={{ background: `rgba(${A.rgb},0.1)`, border: `1px solid rgba(${A.rgb},0.2)` }}>
                  <div className="text-2xl font-black leading-none" style={{ color: `rgb(${A.rgb})` }}>{s.num}</div>
                  <div className="text-xs font-bold mb-1" style={{ color: `rgb(${A.rgb})` }}>{s.unit}</div>
                  <div className="text-xs" style={{ color: "hsl(0, 0%, 60%)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <p className="text-lg leading-relaxed mb-10" style={{ color: "hsl(210, 25%, 85%)" }}>
              Direct Primary Care is a membership-based model that cuts out insurance middlemen entirely. One flat monthly fee — typically less than your phone bill — covers unlimited primary care. No copays. No billing surprises. Just a real relationship with a provider who actually knows you.
            </p>

            <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: `rgb(${A.rgb})` }}>What DPC Actually Gives You</h2>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {[
                { icon: Calendar, title: "Same-Day Access", stat: "No 3-week wait", desc: "Appointments when you actually need them — not when the schedule opens up." },
                { icon: DollarSign, title: "No Surprise Bills", stat: "One flat fee", desc: "Every primary care visit, call, and message is covered. Nothing hidden." },
                { icon: Clock, title: "Unrushed Visits", stat: "30–60 minutes", desc: "Your provider has time to listen. The average traditional visit is 7 minutes." },
                { icon: MessageCircle, title: "Direct Line", stat: "Text anytime", desc: "Text, call, or video chat your provider directly. They respond." },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl p-6" style={{ background: `rgba(${A.rgb},0.08)`, border: `1px solid rgba(${A.rgb},0.2)` }}>
                  <div className="flex items-center gap-3 mb-1">
                    <item.icon className="w-5 h-5" style={{ color: `rgb(${A.rgb})` }} />
                    <h4 className="font-bold" style={{ color: "hsl(0, 0%, 100%)" }}>{item.title}</h4>
                  </div>
                  <div className="text-lg font-black mb-2" style={{ color: `rgb(${A.rgb})` }}>{item.stat}</div>
                  <p className="text-sm" style={{ color: "hsl(0, 0%, 75%)" }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Contrast callout */}
            <div className="rounded-2xl p-6 mb-10 flex flex-col sm:flex-row gap-6" style={{ background: "hsla(210, 22%, 18%, 0.8)" }}>
              <div className="flex-1 text-center p-4 rounded-xl" style={{ background: "hsla(0,70%,55%,0.1)", border: "1px solid hsla(0,70%,55%,0.25)" }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "hsl(0, 70%, 65%)" }}>Traditional Care</div>
                <div className="text-3xl font-black mb-1" style={{ color: "hsl(0, 70%, 65%)" }}>7 min</div>
                <div className="text-sm" style={{ color: "hsl(0, 0%, 65%)" }}>Average appointment time</div>
              </div>
              <div className="flex items-center justify-center text-2xl font-bold" style={{ color: "hsl(0, 0%, 40%)" }}>vs</div>
              <div className="flex-1 text-center p-4 rounded-xl" style={{ background: `rgba(${A.rgb},0.1)`, border: `1px solid rgba(${A.rgb},0.25)` }}>
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: `rgb(${A.rgb})` }}>Direct Primary Care</div>
                <div className="text-3xl font-black mb-1" style={{ color: `rgb(${A.rgb})` }}>45 min</div>
                <div className="text-sm" style={{ color: "hsl(0, 0%, 65%)" }}>Average appointment time</div>
              </div>
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold mb-5" style={{ color: `rgb(${A.rgb})` }}>Who Is DPC For?</h2>
            <div className="space-y-3 mb-10">
              {[
                "Busy parents who want fast answers without dragging kids into a clinic",
                "Adults tired of reactive, pill-first medicine seeking whole-person care",
                "People with chronic conditions who want real support — not a 7-minute visit every 3 months",
                "High-deductible plan holders who want actual access to quality primary care",
                "Anyone who wants a provider who sees the whole human, not just the chart",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl p-4" style={{ background: "hsla(210, 22%, 18%, 0.6)" }}>
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: `rgb(${A.rgb})` }} />
                  <span style={{ color: "hsl(0, 0%, 85%)" }}>{item}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl lg:text-3xl font-bold mb-5" style={{ color: `rgb(${A.rgb})` }}>What Your Membership Includes</h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {["Unlimited visits — in person or virtual", "Routine labs twice a year", "Health coaching support", "Root-cause analysis & wellness planning", "Chronic care management", "Wholesale pricing on labs, imaging & meds"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl p-4" style={{ background: `rgba(${A.rgb},0.08)`, border: `1px solid rgba(${A.rgb},0.15)` }}>
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: `rgb(${A.rgb})` }} />
                  <span className="text-sm font-medium" style={{ color: "hsl(0, 0%, 88%)" }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Closing pull quote */}
            <div className="rounded-2xl p-8 mb-8 text-center" style={{ background: `linear-gradient(135deg, hsla(45,90%,55%,0.12), rgba(${A.rgb},0.12))`, border: "1px solid hsla(45,90%,55%,0.25)" }}>
              <p className="text-xl font-bold italic" style={{ color: "hsl(0, 0%, 95%)" }}>
                &ldquo;The future of healthcare isn&apos;t about bigger systems or more tech. It&apos;s about getting back to basics — a provider who knows your name, your goals, and picks up when you call.&rdquo;
              </p>
            </div>

            <div className="mb-8">
              <BlogCtaBlock service="dpc" source="blog-why-direct-primary-care" appt="meetGreet" heading="Ready to Join the Health Movement?" />
            </div>

            <div className="rounded-3xl p-6 mb-8" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h4 className="font-bold mb-4" style={{ color: `rgb(${A.rgb})` }}>Related Reading</h4>
              <div className="space-y-2">
                <Link href="/blog/dpc-vs-concierge" className="block hover:opacity-80" style={{ color: `rgb(${A.rgb})` }}>→ Direct Primary Care vs. Concierge Medicine</Link>
                <Link href="/blog/flu-shot-guide" className="block hover:opacity-80" style={{ color: `rgb(${A.rgb})` }}>→ How the Flu Shot Works</Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
