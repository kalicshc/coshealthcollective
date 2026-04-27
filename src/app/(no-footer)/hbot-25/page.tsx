"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { submitHbotEarlyAccess } from "@/lib/api";
import { clinicFacts } from "@/lib/clinicFacts";

function EarlyAccessForm() {
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
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-2xl p-7 text-center w-full max-w-md mx-auto"
        style={{ background: "hsla(177,60%,20%,0.4)", border: "1px solid hsla(177,70%,59%,0.35)" }}
      >
        <p className="text-2xl font-bold mb-2" style={{ color: "hsl(177,70%,72%)" }}>
          You&apos;re on the list.
        </p>
        <p className="text-base" style={{ color: "hsl(210,25%,72%)" }}>
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
          className="flex-1 rounded-full px-5 py-3 text-base outline-none"
          style={{
            background: "hsla(210,22%,18%,0.9)",
            border: "1px solid hsla(177,70%,59%,0.22)",
            color: "hsl(0,0%,92%)",
          }}
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="flex-1 rounded-full px-5 py-3 text-base outline-none"
          style={{
            background: "hsla(210,22%,18%,0.9)",
            border: "1px solid hsla(177,70%,59%,0.22)",
            color: "hsl(0,0%,92%)",
          }}
        />
      </div>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="rounded-full px-5 py-3 text-base outline-none"
        style={{
          background: "hsla(210,22%,18%,0.9)",
          border: "1px solid hsla(177,70%,59%,0.22)",
          color: "hsl(0,0%,92%)",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full px-8 py-4 text-base font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, hsl(177,70%,59%), hsl(210,70%,55%))",
          color: "hsl(210,32%,10%)",
        }}
      >
        {status === "loading" ? "Saving your spot…" : `Lock In My ${clinicFacts.hbot.earlyAccessDiscountPercent}% Discount →`}
      </button>
      {status === "error" && (
        <p className="text-center text-sm" style={{ color: "hsl(0,80%,70%)" }}>
          Something went wrong. Try again or call{" "}
          <a href={`tel:${clinicFacts.contact.phoneTel}`} style={{ color: "hsl(177,70%,65%)" }}>{clinicFacts.contact.phoneDashed}</a>.
        </p>
      )}
      <p className="text-center text-xs mt-1" style={{ color: "hsl(210,25%,55%)" }}>
        No commitment required. No payment. We&apos;ll reach out when we open.
      </p>
    </form>
  );
}

export default function HbotEarlyAccessLandingPage() {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center"
      style={{
        background: "linear-gradient(180deg, hsla(210,32%,11%,0.95), hsla(210,32%,12%,0.85))",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      {/* Radial glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, hsla(177,70%,59%,0.16) 0%, transparent 52%), radial-gradient(ellipse at 90% 100%, hsla(210,70%,55%,0.10) 0%, transparent 45%), radial-gradient(ellipse at 10% 80%, hsla(271,74%,55%,0.08) 0%, transparent 38%)",
        }}
        aria-hidden="true"
      />
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "linear-gradient(180deg, rgba(0,0,0,0.8), transparent 95%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 lg:px-8 text-center w-full">
        {/* Brand badge */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-3 rounded-2xl border px-5 py-3"
            style={{
              borderColor: "hsla(177,70%,59%,0.2)",
              background: "linear-gradient(180deg, hsla(215,30%,16%,0.92), hsla(215,28%,13%,0.88))",
              backdropFilter: "blur(16px)",
            }}
          >
            <Image src="/logo-main.png" alt="CSHC" width={36} height={36} className="object-contain" />
            <div className="text-left">
              <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "hsl(210,25%,62%)" }}>
                Colorado Springs Health Collective
              </p>
              <p
                className="text-sm font-semibold leading-tight mt-0.5"
                style={{
                  background: "linear-gradient(135deg, hsl(177,70%,65%), hsl(210,70%,62%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Hyperbaric Clinic — Opening {clinicFacts.hbot.openingDate}
              </p>
            </div>
          </div>
        </div>

        {/* Headline */}
        <p
          className="text-sm font-bold uppercase tracking-widest mb-3"
          style={{ color: "hsl(210,40%,75%)", letterSpacing: "0.06em" }}
        >
          Early-Access Offer
        </p>
        <h1 style={{ color: "#fff", textShadow: "0 2px 24px rgba(0,0,0,0.5)", lineHeight: 1 }}>
          <span
            className="block font-black"
            style={{
              fontSize: "clamp(4rem, 14vw, 9rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, hsl(177,88%,62%), hsl(188,88%,54%), hsl(210,70%,58%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 40px hsla(177,80%,55%,0.35))",
            }}
          >
            {clinicFacts.hbot.earlyAccessDiscountPercent}% OFF
          </span>
          <span
            className="block font-black mt-2"
            style={{ fontSize: "clamp(1.4rem, 3.6vw, 2.5rem)", fontWeight: 900 }}
          >
            Your First HBOT Program or Punch Card
          </span>
        </h1>

        <p className="mt-6 mb-2 font-semibold" style={{ color: "hsl(177,70%,65%)", fontSize: "clamp(1rem, 2vw, 1.2rem)" }}>
          Coming {clinicFacts.hbot.openingDate} — Lock In Your {clinicFacts.hbot.earlyAccessDiscountPercent}% Discount Today.
        </p>

        <p className="mb-8 max-w-xl mx-auto" style={{ color: "hsl(210,25%,62%)", fontSize: "17px", lineHeight: "1.65" }}>
          We&apos;re opening a clinical-grade <strong style={{ color: "#fff" }}>{clinicFacts.hbot.pressure}</strong> hyperbaric chamber in Colorado Springs.
          Drop your info to lock in your founding-member discount — no payment, no commitment.
        </p>

        <div className="flex flex-col items-center gap-6">
          <EarlyAccessForm />

          <Link
            href="/hyperbaric"
            className="rounded-full px-7 py-3 text-sm font-semibold hover:opacity-80 transition-opacity mt-2"
            style={{ border: "1px solid hsla(177,70%,59%,0.45)", color: "hsl(177,70%,72%)" }}
          >
            Learn more about HBOT →
          </Link>
        </div>
      </div>
    </section>
  );
}
