"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Calendar, FlaskConical, ChevronDown, CheckCircle, Activity, Calculator } from "lucide-react";

const HINT_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/login/request?redirectTo=%2Faccount%2Fbooking";
const GUAVA_URL = "https://guavahealth.com/login/coshealthcollective";

const portals = [
  {
    id: "appointments-billing",
    title: "Appointments and Billing Portal",
    description: "Book appointments, manage your membership, and handle billing through your secure member account.",
    gradient: "linear-gradient(135deg, hsl(177, 70%, 55%), hsl(210, 70%, 60%))",
    icon: Calendar,
    bullets: ["Schedule appointments", "Manage billing & membership"],
    buttonLabel: "Open Portal",
    url: HINT_URL,
    internalLink: null as null | string,
  },
  {
    id: "health-records",
    title: "Health Records Portal",
    description: "Access your health records, lab results, and complete health history — securely stored and easy to share with any provider.",
    gradient: "linear-gradient(135deg, hsl(280, 70%, 55%), hsl(330, 70%, 55%))",
    icon: FlaskConical,
    bullets: ["View lab results", "Complete health history"],
    buttonLabel: "Open Portal",
    url: GUAVA_URL,
    internalLink: null as null | string,
  },
  {
    id: "remote-monitoring",
    title: "AI-Integrated Remote Monitoring",
    description: "Connect clinician-recommended home health devices to your care. Your readings sync directly to Guava Health so your provider can monitor trends between visits.",
    gradient: "linear-gradient(135deg, hsl(140, 70%, 55%), hsl(177, 70%, 55%))",
    icon: Activity,
    bullets: ["Blood pressure, oxygen, weight & more", "Data syncs to your Guava Health record"],
    buttonLabel: "Browse Recommended Devices",
    url: null as null | string,
    internalLink: "/remote-monitoring",
  },
];

export default function ResourcesPage() {
  const [openPortals, setOpenPortals] = useState<Record<string, boolean>>({});

  const togglePortal = (id: string) => {
    setOpenPortals((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-5 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
            Resources
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "hsl(0, 0%, 65%)" }}>
            Everything you need to manage your care — all in one place.
          </p>
        </div>

        {/* Member portals */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          {portals.map((portal) => {
            const IconComponent = portal.icon;
            const isOpen = !!openPortals[portal.id];

            return (
              <div
                key={portal.id}
                className="relative rounded-2xl overflow-hidden"
                style={{ background: "hsla(210, 22%, 18%, 0.9)", border: "1px solid hsla(0, 0%, 100%, 0.08)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: portal.gradient }} />
                <button
                  className="w-full text-left"
                  onClick={() => togglePortal(portal.id)}
                  aria-expanded={isOpen}
                >
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: portal.gradient }}>
                        <IconComponent className="w-7 h-7" style={{ color: "hsl(210, 32%, 12%)" }} />
                      </div>
                      <h2 className="text-xl lg:text-2xl font-bold" style={{ color: "hsl(0, 0%, 100%)" }}>
                        {portal.title}
                      </h2>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      style={{ color: "hsl(177, 70%, 59%)" }}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pl-6 lg:pl-[5.5rem]">
                    <p className="text-base leading-relaxed mb-5" style={{ color: "hsl(210, 40%, 89%)" }}>
                      {portal.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {portal.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(177, 70%, 59%)" }} />
                          <span className="text-sm" style={{ color: "hsl(0, 0%, 80%)" }}>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    {portal.internalLink ? (
                      <Link
                        href={portal.internalLink}
                        className="inline-flex items-center gap-2 py-3 px-7 rounded-full font-semibold text-base transition-opacity hover:opacity-85"
                        style={{ background: portal.gradient, color: "hsl(210, 32%, 12%)" }}
                      >
                        {portal.buttonLabel}
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a
                        href={portal.url!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 py-3 px-7 rounded-full font-semibold text-base transition-opacity hover:opacity-85"
                        style={{ background: portal.gradient, color: "hsl(210, 32%, 12%)" }}
                      >
                        {portal.buttonLabel}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Clinical Calculators */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(177, 70%, 59%)" }}>
              Clinical Tools
            </p>
            <h2 className="text-2xl font-bold text-white">Calculators</h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "hsl(0, 0%, 55%)" }}>
              Evidence-based risk calculators that run securely on this site — no external links, no data sharing.
            </p>
          </div>

          <Link
            href="/resources/calculators"
            className="group flex items-center gap-5 rounded-2xl p-6 transition-all hover:-translate-y-0.5"
            style={{
              background: "hsla(210, 22%, 18%, 0.9)",
              border: "1px solid hsla(177, 70%, 59%, 0.18)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(177, 70%, 55%), hsl(271, 74%, 55%))" }}
            >
              <Calculator className="w-7 h-7" style={{ color: "hsl(210, 32%, 12%)" }} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">Risk Calculators</h3>
              <p className="text-sm mt-1" style={{ color: "hsl(0, 0%, 60%)" }}>
                Breast cancer risk, ASCVD, diabetes risk, and more
              </p>
            </div>
            <ChevronDown
              className="w-5 h-5 -rotate-90 transition-transform group-hover:translate-x-1"
              style={{ color: "hsl(177, 70%, 59%)" }}
            />
          </Link>
        </div>

        <p className="text-center text-sm" style={{ color: "hsl(0, 0%, 45%)" }}>
          Questions? Call us at{" "}
          <a href="tel:+17198244716" className="hover:opacity-80 transition-opacity" style={{ color: "hsl(177, 70%, 59%)" }}>
            (719) 824-4716
          </a>{" "}
          or email{" "}
          <a href="mailto:dpc@coshealthcollective.com" className="hover:opacity-80 transition-opacity" style={{ color: "hsl(177, 70%, 59%)" }}>
            dpc@coshealthcollective.com
          </a>
        </p>
      </div>
    </div>
  );
}
