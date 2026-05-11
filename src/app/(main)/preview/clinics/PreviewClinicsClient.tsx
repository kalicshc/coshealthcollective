"use client";

import { useState } from "react";
import ClinicAccordion from "@/components/ClinicAccordion";
import ClinicSpectrum from "@/components/ClinicSpectrum";

type ClinicKey = "dpc" | "hormone" | "hyperbaric";

export default function PreviewClinicsClient() {
  const [activeKey, setActiveKey] = useState<ClinicKey>("hormone");

  return (
    <div className="min-h-screen pt-28 pb-24 lg:pt-36">
      <div className="container mx-auto px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border"
            style={{
              background: "hsla(210, 22%, 12%, 0.8)",
              borderColor: "hsla(0,0%,100%,0.12)",
              color: "hsl(210, 25%, 75%)",
            }}
          >
            Draft preview · not indexed
          </span>
          <h1
            className="mt-5 text-3xl lg:text-5xl font-black leading-tight"
            style={{ color: "hsl(0,0%,100%)" }}
          >
            Clinic{" "}
            <span
              style={{
                background:
                  "linear-gradient(110deg, hsl(45, 90%, 62%), hsl(331, 95%, 72%), hsl(177, 70%, 60%))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Spectrum
            </span>
          </h1>
          <p className="mt-3 text-base lg:text-lg" style={{ color: "hsl(210, 25%, 68%)" }}>
            Hover or tap a clinic. The wave peaks where you point — click to lock it in.
            The detail panel below stays in sync.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="hidden lg:block">
            <ClinicSpectrum activeKey={activeKey} onSelect={setActiveKey} />
          </div>
          <div className="lg:-mt-2 relative z-[1]">
            <ClinicAccordion
              externalActiveKey={activeKey}
              onActiveChange={setActiveKey}
            />
          </div>
        </div>

        <div className="mx-auto max-w-5xl mt-20 pt-10 border-t border-white/10">
          <p
            className="text-center text-[11px] font-bold uppercase tracking-[0.22em] mb-6"
            style={{ color: "hsl(210, 22%, 55%)" }}
          >
            Current live version (for comparison)
          </p>
          <ClinicAccordion />
        </div>
      </div>
    </div>
  );
}
