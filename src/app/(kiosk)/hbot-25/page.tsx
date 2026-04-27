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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="flex-1 rounded-full px-4 py-2.5 text-base text-center outline-none"
          style={{
            background: "hsla(210,22%,18%,0.9)",
            border: "1px solid hsla(177,70%,59%,0.22)",
            color: "hsl(0,0%,92%)",
            textAlign: "center",
          }}
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="flex-1 rounded-full px-4 py-2.5 text-base text-center outline-none"
          style={{
            background: "hsla(210,22%,18%,0.9)",
            border: "1px solid hsla(177,70%,59%,0.22)",
            color: "hsl(0,0%,92%)",
            textAlign: "center",
          }}
        />
      </div>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="rounded-full px-4 py-2.5 text-base text-center outline-none"
        style={{
          background: "hsla(210,22%,18%,0.9)",
          border: "1px solid hsla(177,70%,59%,0.22)",
          color: "hsl(0,0%,92%)",
          textAlign: "center",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full px-6 py-3 text-base font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
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
      <p className="text-center text-[11px]" style={{ color: "hsl(210,25%,55%)" }}>
        No commitment, no payment. We&apos;ll reach out when we open.
      </p>
    </form>
  );
}

export default function HbotEarlyAccessLandingPage() {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center w-full"
      style={{
        background: "linear-gradient(180deg, hsl(210,32%,11%) 0%, hsl(210,32%,8%) 100%)",
        minHeight: "100dvh",
        height: "100dvh",
        paddingTop: "clamp(0.75rem, 2.5vh, 2rem)",
        paddingBottom: "clamp(0.75rem, 2.5vh, 2rem)",
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

      <div className="relative z-10 mx-auto max-w-md px-5 text-center w-full flex flex-col items-center gap-[clamp(0.5rem,2vh,1rem)]">
        {/* Logo */}
        <Image
          src="/logo-main.png"
          alt="Colorado Springs Health Collective"
          width={56}
          height={56}
          className="object-contain"
          style={{ filter: "drop-shadow(0 0 14px hsla(177,70%,59%,0.45))" }}
        />

        {/* Eyebrow */}
        <p
          className="font-bold uppercase"
          style={{
            color: "hsl(210,40%,75%)",
            letterSpacing: "0.18em",
            fontSize: "clamp(0.7rem, 1.6vw, 0.85rem)",
          }}
        >
          Early-Access Offer
        </p>

        {/* Headline */}
        <h1 style={{ color: "#fff", textShadow: "0 2px 24px rgba(0,0,0,0.5)", lineHeight: 1, margin: 0 }}>
          <span
            className="block font-black"
            style={{
              fontSize: "clamp(3.5rem, 13vw, 7rem)",
              fontWeight: 900,
              background: "linear-gradient(135deg, hsl(177,88%,62%), hsl(188,88%,54%), hsl(210,70%,58%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 36px hsla(177,80%,55%,0.35))",
              lineHeight: 0.95,
            }}
          >
            {clinicFacts.hbot.earlyAccessDiscountPercent}% OFF
          </span>
          <span
            className="block font-black"
            style={{
              fontSize: "clamp(1.05rem, 3vw, 1.6rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginTop: "0.4rem",
            }}
          >
            Your First HBOT Program<br />or Punch Card
          </span>
        </h1>

        {/* Coming summer line */}
        <p
          className="font-semibold"
          style={{
            color: "hsl(177,70%,65%)",
            fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)",
            margin: 0,
          }}
        >
          Coming {clinicFacts.hbot.openingDate}
        </p>

        <EarlyAccessForm />

        <Link
          href="/hyperbaric"
          className="rounded-full font-semibold hover:opacity-80 transition-opacity"
          style={{
            border: "1px solid hsla(177,70%,59%,0.45)",
            color: "hsl(177,70%,72%)",
            padding: "0.55rem 1.4rem",
            fontSize: "clamp(0.78rem, 1.5vw, 0.9rem)",
          }}
        >
          Learn more about HBOT →
        </Link>
      </div>
    </section>
  );
}
