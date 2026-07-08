"use client";

import { useState } from "react";
import { submitLongevityToolkit } from "@/lib/api";
import { Download, Sparkles, CheckCircle, Heart, Moon, Apple, Dumbbell, Brain } from "lucide-react";
import { bookingUrl } from "@/lib/bookingLinks";
import { ACCENTS } from "@/lib/accents";
import { ServiceHero } from "@/components/ServiceHero";
import { GlassCard } from "@/components/GlassCard";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { trackEvent } from "@/lib/analytics";

const A = ACCENTS.brand;
const GOLD_GRADIENT = `linear-gradient(135deg, ${A.from}, ${A.to})`;
const MEET_GREET_URL = bookingUrl("meetGreet", "longevity-toolkit-download");

const pillars = [
  { icon: Moon, label: "Sleep" },
  { icon: Apple, label: "Nutrition" },
  { icon: Dumbbell, label: "Exercise" },
  { icon: Heart, label: "Muscle" },
  { icon: Brain, label: "Emotional" },
];

const insideItems = ["Sleep optimization", "Nutrition basics", "Exercise guide", "Muscle building", "Stress reduction"];

export default function LongevityToolkitDownload() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !firstName) { setError("Please fill in all fields"); return; }
    setIsSubmitting(true);
    try {
      await submitLongevityToolkit({
        firstName,
        email,
        sourcePage: "/longevity-toolkit-download",
      });
      trackEvent("form_submit", { page: "longevity-toolkit-download", service: "brand", source: "toolkit-form" });
      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-6 pt-32 pb-8 flex justify-center">
          <div className="w-full max-w-md text-center">
            <GlassCard service="brand" className="p-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: GOLD_GRADIENT }}>
                <CheckCircle className="w-8 h-8" style={{ color: "hsl(210,32%,10%)" }} />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#fff" }}>You&apos;re all set, {firstName}!</h2>
              <p className="mb-8" style={{ color: "hsl(210,25%,72%)" }}>Click below to download your free Longevity 101 Toolkit</p>

              <a
                href="/longevity-toolkit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:opacity-90"
                style={{ background: GOLD_GRADIENT, color: "hsl(210,32%,10%)" }}
              >
                <Download className="w-5 h-5" />
                Download Toolkit (PDF)
              </a>

              <p className="text-sm mt-6" style={{ color: "hsl(210,25%,62%)" }}>Tip: Use &quot;Save as PDF&quot; from the print menu to save your copy</p>
            </GlassCard>
          </div>
        </div>

        <PageCtaFooter
          service="brand"
          heading="Ready to take the next step?"
          primaryCta={{ label: "Book a Free Meet & Greet", href: MEET_GREET_URL, external: true }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ServiceHero
        service="brand"
        compact
        eyebrow="Free Download"
        title="Longevity 101"
        titleAccent="Toolkit"
        subhead="A basic guide to living longer and healthier."
      >
        <div className="flex justify-center gap-3">
          {pillars.map((pillar) => (
            <div key={pillar.label} className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: GOLD_GRADIENT }}>
                <pillar.icon className="w-4.5 h-4.5" style={{ color: "hsl(210,32%,10%)" }} />
              </div>
              <span className="text-xs" style={{ color: "hsl(210,25%,68%)" }}>{pillar.label}</span>
            </div>
          ))}
        </div>
      </ServiceHero>

      <div className="container mx-auto px-6 pt-12 pb-20 flex justify-center">
        <div className="w-full max-w-md">
          <GlassCard service="brand">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4" style={{ color: `rgb(${A.rgb})` }} />
              <span className="text-sm font-medium" style={{ color: `rgb(${A.rgb})` }}>Get Your Free Copy</span>
            </div>
            <p className="text-sm text-center mb-6" style={{ color: "hsl(210,25%,68%)" }}>Enter your details to access the download</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(210,25%,80%)" }}>First Name</label>
                <input
                  type="text"
                  placeholder="Your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2"
                  style={{ background: "hsla(210,22%,16%,0.7)", border: `1px solid rgba(${A.rgb},0.2)` }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(210,25%,80%)" }}>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2"
                  style={{ background: "hsla(210,22%,16%,0.7)", border: `1px solid rgba(${A.rgb},0.2)` }}
                />
              </div>
              {error && <p className="text-sm text-center" style={{ color: "#fc8181" }}>{error}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-semibold text-lg transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: GOLD_GRADIENT, color: "hsl(210,32%,10%)" }}
              >
                {isSubmitting ? "Sending..." : "Get My Free Toolkit"}
              </button>
            </form>

            <p className="text-xs text-center mt-4" style={{ color: "hsl(210,25%,55%)" }}>We respect your privacy. No spam, ever.</p>
          </GlassCard>

          <div className="mt-8 text-center">
            <p className="text-sm mb-3" style={{ color: "hsl(210,25%,68%)" }}>What&apos;s inside:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {insideItems.map((item) => (
                <span key={item} className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs" style={{ background: `rgba(${A.rgb},0.08)`, border: `1px solid rgba(${A.rgb},0.2)`, color: "hsl(210,25%,78%)" }}>
                  <CheckCircle className="w-3 h-3" style={{ color: `rgb(${A.rgb})` }} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
