"use client";

import { FormEvent, useState } from "react";
import { ACCENTS } from "@/lib/accents";
import { trackEvent } from "@/lib/analytics";
import { submitWaitlist } from "@/lib/api";
import { clinicFacts } from "@/lib/clinicFacts";
import type { WaitlistInterest } from "@/lib/bookingLinks";

/**
 * The one new-patient waitlist form (see src/lib/bookingLinks.ts — every
 * gated booking CTA lands here). `interest` is pre-selected from the
 * ?interest= param the CTA carried, so a visitor who clicked a hormone CTA
 * doesn't have to re-state why they came.
 *
 * Copy rule: plain and unhurried. We're full, we'll call when we're not.
 * No countdowns, no "limited spots", no promised reopening date.
 */

const A = ACCENTS.brand;

const INTEREST_OPTIONS: { value: WaitlistInterest | "unsure"; label: string }[] = [
  { value: "dpc", label: "Direct Primary Care" },
  { value: "hormone", label: "Hormone & Weight Loss" },
  { value: "hyperbaric", label: "Hyperbaric Oxygen Therapy" },
  { value: "urgent-care", label: "Urgent Care" },
  { value: "aesthetics", label: "Aesthetics / Rx Skincare" },
  { value: "unsure", label: "Not sure yet" },
];

const fieldClass =
  "w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:bg-black/40";

export default function WaitlistForm({
  defaultInterest = "unsure",
  source,
}: {
  defaultInterest?: WaitlistInterest | "unsure";
  source?: string;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<string>(defaultInterest);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await submitWaitlist({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        interest,
        notes: notes.trim(),
        source: source ?? "waitlist",
      });
      trackEvent("form_submit", { page: "waitlist", source: source ?? "waitlist", label: "Waitlist signup" });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again, or call us at " + clinicFacts.contact.phone + ".");
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle = { borderColor: "rgba(255,255,255,0.08)" } as const;
  const focusOn = (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = `${A.from}66`;
  };
  const focusOff = (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl px-6 py-8 text-center"
        style={{ background: `rgba(${A.rgb},0.08)`, border: `1px solid rgba(${A.rgb},0.3)` }}
      >
        <p className="text-lg font-bold" style={{ color: `rgb(${A.rgb})` }}>
          You&apos;re on the waitlist.
        </p>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "hsl(210,25%,68%)" }}>
          We&apos;ll reach out as soon as we have availability. Nothing else to do in the meantime — a
          confirmation is on its way to your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-left">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          autoComplete="given-name"
          required
          className={fieldClass}
          style={inputStyle}
          onFocus={focusOn}
          onBlur={focusOff}
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          autoComplete="family-name"
          required
          className={fieldClass}
          style={inputStyle}
          onFocus={focusOn}
          onBlur={focusOff}
        />
      </div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        autoComplete="email"
        required
        className={fieldClass}
        style={inputStyle}
        onFocus={focusOn}
        onBlur={focusOff}
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone (optional)"
        autoComplete="tel"
        className={fieldClass}
        style={inputStyle}
        onFocus={focusOn}
        onBlur={focusOff}
      />
      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(210,25%,55%)" }}>
          What are you interested in?
        </span>
        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className={fieldClass}
          style={inputStyle}
          onFocus={focusOn}
          onBlur={focusOff}
        >
          {INTEREST_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} style={{ background: "hsl(210,32%,12%)" }}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Anything you'd like us to know (optional)"
        rows={3}
        className={fieldClass}
        style={inputStyle}
        onFocus={focusOn}
        onBlur={focusOff}
      />
      <p className="text-xs leading-relaxed" style={{ color: "hsl(210,20%,48%)" }}>
        Please don&apos;t include medical details — this is a public web form, not a patient portal.
      </p>
      {error !== "" && (
        <p className="text-sm font-semibold" style={{ color: "hsl(0,70%,70%)" }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full px-6 py-3.5 text-sm font-bold transition disabled:opacity-60"
        style={{
          background: `linear-gradient(135deg, ${A.from}, ${A.to})`,
          color: "hsl(210,32%,10%)",
          boxShadow: `0 10px 30px ${A.glow}`,
        }}
      >
        {submitting ? "Adding you…" : "Join the Waitlist"}
      </button>
    </form>
  );
}
