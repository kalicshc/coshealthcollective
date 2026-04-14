import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, BookOpen, Syringe, Stethoscope, Sparkles, Mountain, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Healthcare Blog | Colorado Springs Health Collective",
  description: "Discover how Direct Primary Care is transforming healthcare in Colorado Springs. Get insights on whole-person wellness, preventive care, and building authentic relationships with your healthcare provider.",
};

const articles = [
  {
    slug: "save-money-healthcare",
    title: "How to Save Money on Healthcare: 7 Smart Strategies Most People Don't Know",
    description: "Learn practical ways to save money on healthcare—from cash-pay options and discount pharmacies to imaging price shopping and avoiding surprise bills.",
    date: "February 9, 2026",
    category: "Smart Savings",
    icon: DollarSign,
    color: "hsl(140, 70%, 55%)",
  },
  {
    slug: "flu-shot-guide",
    title: "How the Flu Shot Works: Safety, Risks & Why You Should Get Vaccinated",
    description: "Learn how the flu vaccine works to protect you, its proven safety profile, potential risks, and why getting vaccinated each flu season matters for you and your community.",
    date: "December 7, 2025",
    category: "Preventive Care",
    icon: Syringe,
    color: "hsl(280, 70%, 65%)",
  },
  {
    slug: "dpc-vs-concierge",
    title: "Direct Primary Care vs. Concierge Medicine: Colorado Springs Guide",
    description: "Understanding the differences between Direct Primary Care and concierge medicine in Colorado Springs. Compare costs, services, and which model best fits your healthcare needs.",
    date: "January 14, 2025",
    category: "Featured",
    icon: Stethoscope,
    color: "hsl(177, 70%, 59%)",
  },
  {
    slug: "why-direct-primary-care",
    title: "Why Direct Primary Care Is the Future of Health (And Why It Matters for You)",
    description: "Discover how Direct Primary Care in Colorado Springs is redefining healthcare: no insurance hoops, no rushed visits, just real care when you need it.",
    date: "August 5, 2025",
    category: "Popular",
    icon: Sparkles,
    color: "hsl(45, 90%, 60%)",
  },
  {
    slug: "skiing-longevity",
    title: "Skiing Into Your 70s: A Colorado Springs Guide to Longevity on the Slopes",
    description: "Learn how to keep skiing for decades with proper strength training, nutrition, sleep, and recovery. Colorado Springs longevity tips for lifelong skiers.",
    date: "January 14, 2026",
    category: "Longevity",
    icon: Mountain,
    color: "hsl(200, 70%, 60%)",
  },
];

const comingSoon = [
  "Getting Off Medications Naturally",
  "Root Cause Medicine Approach",
  "Mental Wellbeing in Primary Care",
  "Preventive Care That Works",
  "Colorado Springs Wellness Guide",
];

export default function Blog() {
  return (
    <div className="min-h-screen">
      <section
        className="hero-overlay relative min-h-screen flex items-center justify-center"
        style={{ background: "transparent" }}
      >
        <div className="container mx-auto px-5 lg:px-8 z-10 py-32 pt-40">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span style={{ color: "hsl(0, 0%, 100%)" }}>Healthcare </span>
              <span style={{ color: "hsl(177, 70%, 65%)" }}>Insights &amp; Wellness</span>
            </h1>
            <p className="text-xl lg:text-2xl font-light mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: "hsl(210, 40%, 89%)" }}>
              Discover how Direct Primary Care is transforming healthcare in Colorado Springs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="space-y-6">
              {articles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="block">
                  <div
                    className="rounded-3xl p-6 lg:p-8 hover:scale-[1.02] transition-transform cursor-pointer"
                    style={{ background: "hsla(210, 22%, 28%, 0.75)" }}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${article.color}, hsl(200, 70%, 59%))` }}
                      >
                        <article.icon className="w-8 h-8" style={{ color: "hsl(210, 32%, 12%)" }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{ background: article.color, color: "hsl(210, 32%, 12%)" }}
                          >
                            {article.category}
                          </span>
                          <span className="text-sm" style={{ color: "hsl(0, 0%, 60%)" }}>
                            {article.date}
                          </span>
                        </div>
                        <h2 className="text-xl lg:text-2xl font-bold mb-2" style={{ color: "hsl(0, 0%, 100%)" }}>
                          {article.title}
                        </h2>
                        <p className="leading-relaxed" style={{ color: "hsl(0, 0%, 75%)" }}>
                          {article.description}
                        </p>
                        <span className="inline-block mt-4 font-medium" style={{ color: "hsl(177, 70%, 59%)" }}>
                          Read Full Article →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="rounded-3xl p-8 lg:p-10" style={{ background: "hsla(210, 22%, 28%, 0.75)" }}>
              <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "hsl(177, 70%, 65%)" }}>
                More Articles Coming Soon
              </h2>
              <p className="text-center mb-6" style={{ color: "hsl(0, 0%, 85%)" }}>
                We&apos;re working on comprehensive guides covering:
              </p>
              <ul className="space-y-2 max-w-md mx-auto">
                {comingSoon.map((topic, index) => (
                  <li key={index} className="flex items-center gap-2" style={{ color: "hsl(0, 0%, 75%)" }}>
                    <span style={{ color: "hsl(177, 70%, 59%)" }}>•</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
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
