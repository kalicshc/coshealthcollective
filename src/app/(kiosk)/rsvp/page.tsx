"use client";

import Image from "next/image";
import { useState } from "react";
import { submitCriticalWindowRsvp } from "@/lib/api";

/**
 * /rsvp — Critical Window talk RSVP landing page (the "link in bio" target).
 * Visual language matches the IG carousel (cw-social-post): aurora photo,
 * light frosted glass, deep-ink type, deep-teal accent. Mobile-first — nearly
 * all traffic arrives from Instagram on a phone.
 */

const INK = "#1F2A2E";
const TEAL = "#2C5F5D";
const GLASS = "rgba(250,247,242,0.72)";

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.75)",
  border: "1px solid rgba(31,42,46,0.18)",
  color: INK,
  textAlign: "center",
  borderRadius: 999,
  padding: "0.7rem 1.1rem",
  fontSize: "1rem",
  outline: "none",
  width: "100%",
};

function RsvpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;
    setStatus("loading");
    try {
      await submitCriticalWindowRsvp({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center" style={{ padding: "0.5rem 0 0.25rem" }}>
        <p style={{ color: TEAL, fontSize: "1.5rem", fontWeight: 800, margin: 0 }}>
          You&rsquo;re on the list! 🎟️
        </p>
        <p style={{ color: INK, fontSize: "0.95rem", lineHeight: 1.5, margin: "0.6rem 0 0" }}>
          Check your email for the details.
          <br />
          <strong>Fri · July 24 · 5:30 pm · The Lincoln Center</strong>
        </p>
        <p style={{ color: INK, opacity: 0.75, fontSize: "0.85rem", lineHeight: 1.5, margin: "0.7rem 0 0" }}>
          Bring a friend who needs to hear this — no separate RSVP needed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        autoComplete="given-name"
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        autoComplete="family-name"
        style={inputStyle}
      />
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
        style={inputStyle}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{
          background: TEAL,
          color: "#FAF7F2",
          borderRadius: 999,
          padding: "0.85rem 1.5rem",
          fontSize: "1.05rem",
          fontWeight: 800,
          letterSpacing: "0.02em",
          border: "none",
          cursor: "pointer",
          marginTop: "0.25rem",
        }}
      >
        {status === "loading" ? "Saving your seat…" : "Save my seat →"}
      </button>
      {status === "error" && (
        <p className="text-center" style={{ color: "#a33", fontSize: "0.85rem", margin: 0 }}>
          Something went wrong. Please try again.
        </p>
      )}
      <p className="text-center" style={{ color: INK, opacity: 0.65, fontSize: "0.72rem", margin: 0 }}>
        Free to attend. We&rsquo;ll only email you about this event.
      </p>
    </form>
  );
}

export default function CriticalWindowRsvpPage() {
  return (
    <section
      className="relative overflow-hidden flex flex-col items-center justify-between w-full"
      style={{ minHeight: "100dvh", padding: "clamp(1rem, 3vh, 2rem) 1.25rem" }}
    >
      {/* Aurora background — same photo as the IG carousel hook slide */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/social/cw/post-a.webp"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,8,13,0.45) 0%, rgba(5,8,13,0.05) 22%, rgba(5,8,13,0.05) 72%, rgba(5,8,13,0.5) 100%)",
        }}
        aria-hidden
      />

      {/* Wordmark */}
      <div className="relative z-10 flex items-center gap-2.5">
        <Image
          src="/logo-main.png"
          alt=""
          width={30}
          height={30}
          className="object-contain"
          style={{ filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.5))" }}
        />
        <span
          style={{
            color: "#fff",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            textShadow: "0 1px 8px rgba(0,0,0,0.55)",
          }}
        >
          Colorado Springs Health Collective
        </span>
      </div>

      {/* Glass card */}
      <div
        className="relative z-10 w-full text-center"
        style={{
          maxWidth: 420,
          borderRadius: 20,
          background: GLASS,
          backdropFilter: "blur(28px) saturate(140%)",
          WebkitBackdropFilter: "blur(28px) saturate(140%)",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          padding: "1.6rem 1.4rem 1.4rem",
        }}
      >
        <p
          style={{
            color: TEAL,
            fontSize: "0.78rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            margin: "0 0 0.5rem",
          }}
        >
          A free live talk · For women &amp; partners
        </p>
        <h1
          style={{
            color: INK,
            fontSize: "clamp(1.9rem, 8vw, 2.4rem)",
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-0.015em",
            margin: "0 0 0.6rem",
          }}
        >
          The Critical Window
        </h1>
        <p style={{ color: INK, fontSize: "0.95rem", fontWeight: 600, margin: 0 }}>
          Fri · July 24 · 5:30 pm
        </p>
        <p style={{ color: INK, opacity: 0.8, fontSize: "0.85rem", lineHeight: 1.45, margin: "0.15rem 0 1rem" }}>
          The Lincoln Center · 2727 N Cascade Ave, Ste 170
          <br />
          Presented by Logan Crist, PA-C
        </p>
        <RsvpForm />
      </div>

      {/* Partner credit */}
      <div className="relative z-10 flex items-center gap-2.5">
        <span
          style={{
            color: "#fff",
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.85,
            textShadow: "0 1px 8px rgba(0,0,0,0.6)",
          }}
        >
          In partnership with
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/social/cw/onward-logo.png"
          alt="Onward Physical Therapy"
          style={{ height: 22, width: "auto", filter: "drop-shadow(0 1px 8px rgba(0,0,0,0.6))" }}
        />
      </div>
    </section>
  );
}
