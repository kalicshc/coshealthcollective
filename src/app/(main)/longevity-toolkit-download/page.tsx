"use client";

import { useState } from "react";
import { submitLongevityToolkit } from "@/lib/api";
import { Download, Sparkles, CheckCircle, Heart, Moon, Apple, Dumbbell, Brain } from "lucide-react";

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

const pillars = [
  { icon: Moon, label: "Sleep", color: "#667eea" },
  { icon: Apple, label: "Nutrition", color: "#f5576c" },
  { icon: Dumbbell, label: "Exercise", color: "#4fd1c7" },
  { icon: Heart, label: "Muscle", color: "#f6ad55" },
  { icon: Brain, label: "Emotional", color: "#fc8181" },
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
      setIsSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#1a202c" }}>
      {/* Mountain background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80')" }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,32,44,0.8), transparent, rgba(26,32,44,0.9))" }} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {!isSubmitted ? (
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4" style={{ background: "linear-gradient(to right, rgba(79,209,199,0.2), rgba(99,179,237,0.2))", border: "1px solid rgba(79,209,199,0.3)" }}>
                <Sparkles className="w-4 h-4" style={{ color: "#4fd1c7" }} />
                <span className="text-sm font-medium" style={{ color: "#81e6d9" }}>Free Download</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#fff" }}>Longevity 101 Toolkit</h1>
              <p className="text-lg" style={{ color: "#cbd5e0" }}>A basic guide to living longer and healthier</p>
            </div>

            {/* Pillars preview */}
            <div className="flex justify-center gap-3 mb-8">
              {pillars.map((pillar) => (
                <div key={pillar.label} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${pillar.color}, ${pillar.color}dd)` }}>
                    <pillar.icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <span className="text-xs" style={{ color: "#a0aec0" }}>{pillar.label}</span>
                </div>
              ))}
            </div>

            {/* Form card */}
            <div className="rounded-2xl p-6 shadow-2xl" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <h2 className="text-xl font-semibold text-center mb-2" style={{ color: "#fff" }}>Get Your Free Copy</h2>
              <p className="text-sm text-center mb-6" style={{ color: "#a0aec0" }}>Enter your details to access the download</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "#e2e8f0" }}>First Name</label>
                  <input
                    type="text"
                    placeholder="Your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg text-white placeholder-gray-400 outline-none focus:ring-2"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", focusRingColor: "#4fd1c7" } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "#e2e8f0" }}>Email Address</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg text-white placeholder-gray-400 outline-none"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
                  />
                </div>
                {error && <p className="text-sm text-center" style={{ color: "#fc8181" }}>{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-semibold text-lg transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #4fd1c7, #63b3ed)", color: "#1a202c" }}
                >
                  {isSubmitting ? "Sending..." : "Get My Free Toolkit"}
                </button>
              </form>

              <p className="text-xs text-center mt-4" style={{ color: "#718096" }}>We respect your privacy. No spam, ever.</p>
            </div>

            {/* What's inside */}
            <div className="mt-8 text-center">
              <p className="text-sm mb-3" style={{ color: "#a0aec0" }}>What's inside:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {insideItems.map((item) => (
                  <span key={item} className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#cbd5e0" }}>
                    <CheckCircle className="w-3 h-3" style={{ color: "#4fd1c7" }} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Success state */
          <div className="w-full max-w-md text-center">
            <div className="rounded-2xl p-8 shadow-2xl" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "linear-gradient(135deg, #4fd1c7, #63b3ed)" }}>
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#fff" }}>You're all set, {firstName}!</h2>
              <p className="mb-8" style={{ color: "#cbd5e0" }}>Click below to download your free Longevity 101 Toolkit</p>

              <a
                href="/longevity-toolkit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #4fd1c7, #63b3ed)", color: "#1a202c" }}
              >
                <Download className="w-5 h-5" />
                Download Toolkit (PDF)
              </a>

              <p className="text-sm mt-6" style={{ color: "#a0aec0" }}>Tip: Use "Save as PDF" from the print menu to save your copy</p>

              <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p className="text-sm mb-3" style={{ color: "#a0aec0" }}>Ready to take the next step?</p>
                <a
                  href={MEET_GREET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-2 hover:opacity-80 transition-opacity"
                  style={{ color: "#4fd1c7" }}
                >
                  Book a Free Meet &amp; Greet →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
