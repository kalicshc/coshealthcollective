"use client";

import { FormEvent, useState } from "react";
import { submitClinicQuestion } from "@/lib/api";

type ClinicKey = "dpc" | "hormone" | "hyperbaric";

type Accent = {
  from: string;
  to: string;
  glow: string;
  chipBorder: string;
  statusDot: string;
};

export default function ClinicQuestionForm({
  clinicKey,
  accent,
  sourcePage,
  onClose,
}: {
  clinicKey: ClinicKey;
  accent: Accent;
  sourcePage: string;
  onClose: () => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !question.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await submitClinicQuestion(clinicKey, {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        question: question.trim(),
        sourcePage,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-2">
        <div
          className="inline-flex items-center justify-center h-10 w-10 rounded-full mb-3"
          style={{ background: `linear-gradient(135deg, ${accent.from}, ${accent.to})` }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" style={{ color: "hsl(210, 32%, 10%)" }} fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-sm font-bold text-white">Thanks — we got your question.</p>
        <p className="mt-1 text-xs text-slate-400">A real person will follow up soon.</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          Close
        </button>
      </div>
    );
  }

  const inputStyle = { borderColor: "rgba(255,255,255,0.08)" } as const;
  const focusOn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = `${accent.from}66`;
  };
  const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          required
          className="rounded-xl border bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:bg-black/40"
          style={inputStyle}
          onFocus={focusOn}
          onBlur={focusOff}
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          className="rounded-xl border bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:bg-black/40"
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
        required
        className="w-full rounded-xl border bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:bg-black/40"
        style={inputStyle}
        onFocus={focusOn}
        onBlur={focusOff}
      />
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="What's your question?"
        required
        rows={3}
        className="w-full rounded-xl border bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:bg-black/40 resize-none"
        style={inputStyle}
        onFocus={focusOn}
        onBlur={focusOff}
      />
      <div className="flex items-center gap-2 pt-1">
        <span className="clinic-cta-breathe block flex-1">
          <button
            type="submit"
            disabled={submitting}
            className="block w-full rounded-full px-6 py-3 text-center text-sm font-bold transition-all duration-200 hover:scale-[1.02] hover:brightness-110 disabled:opacity-60"
            style={{
              background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              color: "hsl(210, 32%, 10%)",
              boxShadow: `0 14px 30px -10px ${accent.glow}`,
            }}
          >
            {submitting ? "Sending…" : "Send"}
          </button>
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border px-4 py-3 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
          style={{ borderColor: "rgba(255,255,255,0.10)" }}
        >
          Cancel
        </button>
      </div>
      {error ? <p className="text-xs text-rose-400 text-center">{error}</p> : null}
      <p className="pt-1 text-center text-[11px] text-slate-500">
        Goes straight to a real person. No spam, no funnels.
      </p>
    </form>
  );
}
