import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Healthcare Blog | Colorado Springs Health Collective",
  description: "Discover how Direct Primary Care is transforming healthcare in Colorado Springs. Get insights on whole-person wellness, preventive care, and building authentic relationships with your healthcare provider.",
};

const articles = [
  {
    slug: "hyperbaric-oxygen-therapy-colorado-springs",
    title: "Hyperbaric Oxygen Therapy in Colorado Springs: What the Clinical Evidence Shows",
    description: "How HBOT delivers 15× normal oxygen levels to accelerate healing, reduce inflammation, and reverse cellular aging — backed by peer-reviewed research.",
    date: "April 2026",
    category: "HBOT",
    categoryColor: "hsl(177, 70%, 59%)",
    image: "/blog/hbot-hero.jpg",
    featured: true,
  },
  {
    slug: "skiing-longevity",
    title: "Skiing Into Your 70s: A Colorado Springs Guide to Longevity on the Slopes",
    description: "Learn how to keep skiing for decades with proper strength training, nutrition, sleep, and recovery.",
    date: "January 2026",
    category: "Longevity",
    categoryColor: "hsl(200, 70%, 60%)",
    image: "/blog/skiing-hero.jpg",
    featured: false,
  },
  {
    slug: "save-money-healthcare",
    title: "How to Save Money on Healthcare: 7 Smart Strategies Most People Don't Know",
    description: "Cash-pay options, discount pharmacies, imaging price shopping, and how to avoid surprise bills.",
    date: "February 2026",
    category: "Smart Savings",
    categoryColor: "hsl(140, 70%, 55%)",
    image: "/blog/save-money-hero.jpg",
    featured: false,
  },
  {
    slug: "dpc-vs-concierge",
    title: "Direct Primary Care vs. Concierge Medicine: Colorado Springs Guide",
    description: "Compare costs, services, and which healthcare model best fits your life.",
    date: "January 2025",
    category: "DPC",
    categoryColor: "hsl(177, 70%, 59%)",
    image: "/blog/dpc-hero.jpg",
    featured: false,
  },
  {
    slug: "why-direct-primary-care",
    title: "Why Direct Primary Care Is the Future of Health (And Why It Matters for You)",
    description: "No insurance hoops, no rushed visits — how DPC is redefining healthcare in Colorado Springs.",
    date: "August 2025",
    category: "DPC",
    categoryColor: "hsl(45, 90%, 60%)",
    image: "/blog/why-dpc-hero.jpg",
    featured: false,
  },
  {
    slug: "flu-shot-guide",
    title: "How the Flu Shot Works: Safety, Risks & Why You Should Get Vaccinated",
    description: "The proven safety profile, potential risks, and why vaccination matters every flu season.",
    date: "December 2025",
    category: "Preventive Care",
    categoryColor: "hsl(280, 70%, 65%)",
    image: "/blog/flu-shot-hero.jpg",
    featured: false,
  },
];

const featured = articles[0];
const grid = articles.slice(1);

export default function Blog() {
  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen" style={{ background: "hsl(210, 32%, 8%)" }}>
        <div className="container mx-auto px-5 lg:px-8 py-32 pt-40">

          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              <span style={{ color: "hsl(0, 0%, 100%)" }}>Healthcare </span>
              <span style={{ color: "hsl(177, 70%, 65%)" }}>Insights &amp; Wellness</span>
            </h1>
            <p className="text-xl font-light max-w-2xl mx-auto" style={{ color: "hsl(210, 40%, 75%)" }}>
              Evidence-based guides from Colorado Springs Health Collective.
            </p>
          </div>

          {/* Featured article */}
          <Link href={`/blog/${featured.slug}`} className="block max-w-6xl mx-auto mb-12 group">
            <div className="relative rounded-3xl overflow-hidden" style={{ minHeight: "420px" }}>
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsla(210, 32%, 8%, 0.95) 40%, hsla(210, 32%, 8%, 0.3) 100%)" }} />
              <div className="absolute inset-0 flex items-center p-10 lg:p-16">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: featured.categoryColor, color: "hsl(210, 32%, 10%)" }}>
                      {featured.category}
                    </span>
                    <span className="text-sm" style={{ color: "hsl(0, 0%, 60%)" }}>{featured.date}</span>
                  </div>
                  <h2 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight" style={{ color: "hsl(0, 0%, 100%)" }}>
                    {featured.title}
                  </h2>
                  <p className="text-lg mb-6 leading-relaxed" style={{ color: "hsl(210, 30%, 80%)" }}>
                    {featured.description}
                  </p>
                  <span className="inline-flex items-center gap-2 font-semibold" style={{ color: featured.categoryColor }}>
                    Read Full Article →
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Article grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {grid.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
                <div className="rounded-2xl overflow-hidden h-full flex flex-col" style={{ background: "hsla(210, 22%, 18%, 0.8)" }}>
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, hsla(210, 22%, 18%, 0.9) 100%)" }} />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: article.categoryColor, color: "hsl(210, 32%, 10%)" }}>
                        {article.category}
                      </span>
                      <span className="text-xs" style={{ color: "hsl(0, 0%, 55%)" }}>{article.date}</span>
                    </div>
                    <h2 className="text-lg font-bold mb-2 leading-snug flex-1" style={{ color: "hsl(0, 0%, 100%)" }}>
                      {article.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(0, 0%, 68%)" }}>
                      {article.description}
                    </p>
                    <span className="text-sm font-semibold" style={{ color: article.categoryColor }}>
                      Read Article →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
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
