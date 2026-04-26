"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "done";

const inputClass = "w-full px-4 py-2.5 rounded-xl text-sm text-white bg-white/[0.07] border border-white/15 placeholder:text-white/35 focus:outline-none focus:border-white/30";

export default function AskForm() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", question: "" });
  const [error, setError] = useState("");

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.question) {
      setError("Please fill in your name, email, and question.");
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      await fetch("/api/hormone/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          question: form.question,
          sourcePage: "/hormone",
        }),
      });
      setStatus("done");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div
        className="px-7 py-4 rounded-full text-sm font-semibold"
        style={{ border: "1px solid hsla(331,80%,65%,0.4)", color: "hsl(331,95%,84%)" }}
      >
        Got it — we&apos;ll be in touch.
      </div>
    );
  }

  if (open) {
    return (
      <form onSubmit={submit} noValidate className="flex flex-col gap-2 w-full max-w-sm">
        <div className="flex gap-2">
          <input
            name="firstName"
            value={form.firstName}
            onChange={change}
            placeholder="First name"
            autoFocus
            className={inputClass}
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={change}
            placeholder="Last name"
            className={inputClass}
          />
        </div>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={change}
          placeholder="Email address"
          className={inputClass}
        />
        <textarea
          name="question"
          value={form.question}
          onChange={change}
          placeholder="Your question..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
        {error && <p className="text-xs" style={{ color: "hsl(331,95%,80%)" }}>{error}</p>}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="flex-1 py-2.5 rounded-full text-sm font-semibold disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, hsl(331,95%,65%), hsl(271,74%,52%))", color: "#fff" }}
          >
            {status === "submitting" ? "Sending…" : "Send Question"}
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); setError(""); }}
            className="px-4 py-2.5 rounded-full text-sm border border-white/20 hover:bg-white/10 transition-colors"
            style={{ color: "hsl(0,0%,60%)" }}
          >
            ✕
          </button>
        </div>
      </form>
    );
  }

  return (
    <button
      onClick={() => setOpen(true)}
      className="px-7 py-4 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors lg:px-6 lg:py-3 xl:px-7 xl:py-4"
      style={{ border: "1px solid rgba(255,255,255,0.15)", color: "hsl(0,0%,88%)" }}
    >
      Ask Questions
    </button>
  );
}
