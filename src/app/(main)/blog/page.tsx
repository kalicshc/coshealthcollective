import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { clinicFacts } from "@/lib/clinicFacts";
import { ACCENTS } from "@/lib/accents";
import { SceneSection } from "@/components/SceneSection";

const ACCENT = ACCENTS.brand;

// Lighter golds than ACCENT.from/to — hand-tuned for gradient-clipped
// headlines sitting on dark photos (same approach as the DPC blues).
const goldLight = "hsl(48, 96%, 72%)";
const goldDeep = "hsl(38, 92%, 56%)";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Healthcare Blog",
  description: "Discover how Direct Primary Care is transforming healthcare in Colorado Springs. Get insights on whole-person wellness, preventive care, and building authentic relationships with your healthcare provider.",
};

const articles = [
  {
    slug: "why-menopause-evolution-colorado-springs",
    title: "Why Do Women Go Through Menopause? The Evolutionary Answer",
    description: "The grandmother hypothesis, killer whales, the selection wall — why menopause exists, why the symptoms persist, and why evolution never fixed it.",
    date: "May 2026",
    category: "Women's Health",
    categoryColor: ACCENTS.hormone.statusDot,
    image: "/blog/menopause-evolution-hero.jpg",
    featured: true,
  },
  {
    slug: "hrt-critical-window-colorado-springs",
    title: "The Critical Window Hypothesis for HRT: What the Research Actually Shows",
    description: "An evidence-based look at the timing hypothesis for hormone therapy — what the WHI, ELITE, DOPS, and KEEPS trials found, and where the science remains unsettled.",
    date: "May 2026",
    category: "Women's Health",
    categoryColor: ACCENTS.hormone.statusDot,
    image: "/blog/hrt-critical-window-hero.jpg",
    featured: false,
  },
  {
    slug: "metabolic-health-hormone-therapy-colorado-springs",
    title: "Why Metabolic Health Is the Foundation of Safe, Effective Hormone Therapy",
    description: "Hormones don't act in isolation. Inflammation, COMT and ApoE genetics, the brain–amyloid loop, and why men live in the same cycle — what we test and treat before we prescribe.",
    date: "May 2026",
    category: "Hormone Therapy",
    categoryColor: ACCENTS.hormone.statusDot,
    image: "/blog/metabolic-health-hero.jpg",
    featured: false,
  },
  {
    slug: "hyperbaric-oxygen-therapy-colorado-springs",
    title: "Hyperbaric Oxygen Therapy in Colorado Springs: What the Clinical Evidence Shows",
    description: "How HBOT delivers 15× normal oxygen levels to accelerate healing, reduce inflammation, and target markers of cellular aging — backed by peer-reviewed research.",
    date: "April 2026",
    category: "HBOT",
    categoryColor: ACCENTS.hyperbaric.statusDot,
    image: "/blog/hbot-hero.jpg",
    featured: false,
  },
  {
    slug: "skiing-longevity",
    title: "Skiing Into Your 70s: A Colorado Springs Guide to Longevity on the Slopes",
    description: "Learn how to keep skiing for decades with proper strength training, nutrition, sleep, and recovery.",
    date: "January 2026",
    category: "Longevity",
    categoryColor: ACCENTS.brand.statusDot,
    image: "/blog/skiing-hero.jpg",
    featured: false,
  },
  {
    slug: "save-money-healthcare",
    title: "How to Save Money on Healthcare: 7 Smart Strategies Most People Don't Know",
    description: "Cash-pay options, discount pharmacies, imaging price shopping, and how to avoid surprise bills.",
    date: "February 2026",
    category: "Smart Savings",
    categoryColor: ACCENTS.dpc.statusDot,
    image: "/blog/save-money-hero.jpg",
    featured: false,
  },
  {
    slug: "dpc-vs-concierge",
    title: "Direct Primary Care vs. Concierge Medicine: Colorado Springs Guide",
    description: "Compare costs, services, and which healthcare model best fits your life.",
    date: "Updated July 2026",
    category: "DPC",
    categoryColor: ACCENTS.dpc.statusDot,
    image: "/blog/dpc-hero.jpg",
    featured: false,
  },
  {
    slug: "why-direct-primary-care",
    title: "Why Direct Primary Care Is the Future of Health (And Why It Matters for You)",
    description: "No insurance hoops, no rushed visits — how DPC is redefining healthcare in Colorado Springs.",
    date: "August 2025",
    category: "DPC",
    categoryColor: ACCENTS.dpc.statusDot,
    image: "/blog/why-dpc-hero.jpg",
    featured: false,
  },
  {
    slug: "flu-shot-guide",
    title: "How the Flu Shot Works: Safety, Risks & Why You Should Get Vaccinated",
    description: "The proven safety profile, potential risks, and why vaccination matters every flu season.",
    date: "December 2025",
    category: "Preventive Care",
    categoryColor: ACCENTS.brand.statusDot,
    image: "/blog/flu-shot-hero.jpg",
    featured: false,
  },
];

const featured = articles[0];
const grid = articles.slice(1);

export default function Blog() {
  return (
    <div>
      {/* ── 1. CINEMATIC HERO ─────────────────────────────────────────── */}
      <SceneSection image="/images/brand/blog-hero.webp" scrim="hero" minHeight="100svh" priority maxWidthClassName="max-w-7xl" scrollCue="#articles">
        <div className="max-w-3xl pt-20">
          <span className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]" style={{ border: `1px solid rgba(${ACCENT.rgb},0.3)`, background: `rgba(${ACCENT.rgb},0.12)`, color: "hsl(45,90%,86%)" }}>
            The CSHC Journal · Evidence-Based
          </span>
          <h1
            className="mt-8 text-4xl font-bold text-white lg:text-6xl"
            style={{ textShadow: "0 10px 34px rgba(0,0,0,0.42)", lineHeight: 1.1 }}
          >
            Healthcare insights
            <span
              className="mt-2 block"
              style={{
                background: `linear-gradient(135deg, ${goldLight}, ${goldDeep})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.28))",
              }}
            >
              &amp; wellness.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white" style={{ textShadow: "0 4px 16px rgba(0,0,0,0.35)" }}>
            Evidence-based guides from Colorado Springs Health Collective — hormones, longevity,
            hyperbaric medicine, and getting more from your healthcare dollar.
          </p>
        </div>
      </SceneSection>

      {/* ── 2. ARTICLES ───────────────────────────────────────────────── */}
      <section id="articles" className="scroll-mt-20 py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">

          {/* Featured article */}
          <Link href={`/blog/${featured.slug}`} className="block mb-12 group">
            <div className="relative rounded-3xl overflow-hidden" style={{ minHeight: "420px" }}>
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
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
              <a href={`tel:${clinicFacts.contact.phoneTel}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone className="w-5 h-5" style={{ color: `rgb(${ACCENT.rgb})` }} />
                <span style={{ color: "hsl(0, 0%, 92%)" }}>{clinicFacts.contact.phone}</span>
              </a>
              <a href={`mailto:${clinicFacts.contact.email}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Mail className="w-5 h-5" style={{ color: `rgb(${ACCENT.rgb})` }} />
                <span style={{ color: "hsl(0, 0%, 92%)" }}>{clinicFacts.contact.email}</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
