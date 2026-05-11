"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const REFERRAL_SOURCE = "Natalie Keefe — Active Core PT";

export function InterestForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        className="rounded-3xl p-8 sm:p-10 text-center"
        style={{
          background: "hsla(177, 70%, 40%, 0.08)",
          border: "1px solid hsla(177, 70%, 59%, 0.3)",
        }}
      >
        <CheckCircle2
          className="w-12 h-12 mx-auto mb-4"
          style={{ color: "hsl(177, 70%, 65%)" }}
        />
        <h3 className="text-xl sm:text-2xl font-semibold mb-2" style={{ color: "hsl(0, 0%, 100%)" }}>
          Thanks — we&rsquo;ll reach out within 1 business day.
        </h3>
        <p className="text-sm" style={{ color: "hsl(210, 40%, 78%)" }}>
          We&rsquo;ll loop in your team at Active Core with your permission.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-3xl p-6 sm:p-10"
      style={{
        background: "hsla(210, 22%, 22%, 0.55)",
        backdropFilter: "blur(12px)",
        border: "1px solid hsla(177, 70%, 59%, 0.18)",
      }}
    >
      <h3
        className="text-2xl sm:text-3xl font-semibold mb-2"
        style={{ color: "hsl(0, 0%, 100%)" }}
      >
        Not ready to book? Just say hi.
      </h3>
      <p className="text-base mb-6" style={{ color: "hsl(210, 40%, 80%)" }}>
        Leave us a note and we&rsquo;ll reach out — no pressure, no pitch.
      </p>

      <div
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs sm:text-sm font-medium"
        style={{
          background:
            "linear-gradient(90deg, hsla(177,70%,40%,0.18), hsla(215,60%,55%,0.18))",
          border: "1px solid hsla(177, 70%, 59%, 0.35)",
          color: "hsl(177, 70%, 78%)",
        }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: "hsl(215, 60%, 70%)" }}
          aria-hidden="true"
        />
        Referral source: <strong style={{ color: "hsl(0, 0%, 100%)" }}>Natalie Keefe, Active Core Physical Therapy</strong>
      </div>

      <input type="hidden" name="referralSource" value={REFERRAL_SOURCE} readOnly />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" name="firstName" required autoComplete="given-name" />
        <Field label="Last name" name="lastName" autoComplete="family-name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
      </div>

      <div className="mt-4">
        <label
          className="block text-xs font-medium uppercase tracking-wider mb-2"
          style={{ color: "hsl(210, 40%, 75%)" }}
        >
          What&rsquo;s on your mind? <span style={{ color: "hsl(210, 30%, 55%)" }}>(optional)</span>
        </label>
        <textarea
          name="note"
          rows={3}
          className="w-full rounded-xl px-4 py-3 text-base outline-none transition-colors"
          style={{
            background: "hsla(210, 32%, 12%, 0.6)",
            border: "1px solid hsla(177, 70%, 59%, 0.18)",
            color: "hsl(0, 0%, 95%)",
          }}
          placeholder="Anything you'd like us to know before reaching out…"
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-base transition-transform hover:scale-[1.01]"
        style={{
          background:
            "linear-gradient(135deg, hsl(177, 70%, 50%), hsl(215, 60%, 55%))",
          color: "hsl(210, 32%, 12%)",
        }}
      >
        Send a note
      </button>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
};

function Field({ label, name, type = "text", required, autoComplete }: FieldProps) {
  return (
    <label className="block">
      <span
        className="block text-xs font-medium uppercase tracking-wider mb-2"
        style={{ color: "hsl(210, 40%, 75%)" }}
      >
        {label}
        {required && <span style={{ color: "hsl(331, 80%, 70%)" }}> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl px-4 py-3 text-base outline-none transition-colors"
        style={{
          background: "hsla(210, 32%, 12%, 0.6)",
          border: "1px solid hsla(177, 70%, 59%, 0.18)",
          color: "hsl(0, 0%, 95%)",
        }}
      />
    </label>
  );
}
