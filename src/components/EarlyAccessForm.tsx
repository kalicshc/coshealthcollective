"use client";

import { useState } from "react";
import { submitHbotEarlyAccess } from "@/lib/api";
import { clinicFacts } from "@/lib/clinicFacts";
import { ACCENTS } from "@/lib/accents";
import { trackEvent } from "@/lib/analytics";

/**
 * HBOT early-access capture — the pre-launch lead pipeline. Extracted from
 * the hyperbaric page so the page can be a server component. The
 * submitHbotEarlyAccess payload must stay exactly {firstName, lastName,
 * email}: it feeds the dashboard HBOT inquiries pipeline.
 */

const A = ACCENTS.hyperbaric;

const inputStyle = {
  background: "hsla(210,22%,18%,0.9)",
  border: `1px solid rgba(${A.rgb},0.22)`,
  color: "hsl(0,0%,92%)",
} as const;

export function EarlyAccessForm({ source = "hbot" }: { source?: string }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;
    setStatus("loading");
    try {
      await submitHbotEarlyAccess({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() });
      trackEvent("form_submit", { page: "hyperbaric", service: "hyperbaric", source, label: "HBOT early access" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: `rgba(${A.rgb},0.1)`, border: `1px solid rgba(${A.rgb},0.35)` }}
      >
        <p className="text-lg font-bold mb-1" style={{ color: `rgb(${A.rgb})` }}>
          You&apos;re on the list.
        </p>
        <p className="text-sm" style={{ color: "hsl(210,25%,65%)" }}>
          We&apos;ll contact you when we open with your {clinicFacts.hbot.earlyAccessDiscountPercent}% discount locked in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="flex-1 rounded-full px-5 py-3 text-sm outline-none"
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="flex-1 rounded-full px-5 py-3 text-sm outline-none"
          style={inputStyle}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 rounded-full px-5 py-3 text-sm outline-none"
          style={inputStyle}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full px-8 py-3.5 text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{
          background: `linear-gradient(135deg, ${A.from}, ${A.to})`,
          color: "hsl(210,32%,10%)",
        }}
      >
        {status === "loading" ? "Saving your spot…" : `Lock In My ${clinicFacts.hbot.earlyAccessDiscountPercent}% Discount →`}
      </button>
      {status === "error" && (
        <p className="text-center text-xs" style={{ color: "hsl(0,80%,70%)" }}>
          Something went wrong. Try again or call{" "}
          <a href={`tel:${clinicFacts.contact.phoneTel}`} style={{ color: `rgb(${A.rgb})` }}>{clinicFacts.contact.phoneDashed}</a>.
        </p>
      )}
      <p className="text-center text-xs" style={{ color: "hsl(210,25%,48%)" }}>
        No commitment required. No payment. We&apos;ll reach out when we open.
      </p>
    </form>
  );
}
