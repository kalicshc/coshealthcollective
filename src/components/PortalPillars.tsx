"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { submitHbotEarlyAccess, submitDpcInquiry } from "@/lib/api";

const MEET_GREET_URL =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";
const HORMONE_URL =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266";

type Pillar = {
  id: "dpc" | "hormone" | "hbot";
  href: string;
  eyebrow: string;
  clinic: string;
  headline: string;
  body: string;
  facts: string[];
  cta: string;
  mode: "link" | "waitlist";
  accent: string;
  line: string;
  glow: string;
  tint: string;
};

const PILLARS: Pillar[] = [
  {
    id: "dpc",
    href: "/direct-primary-care",
    eyebrow: "Now Enrolling",
    clinic: "CSHC Direct Primary Care",
    headline: "$100/month clarity.",
    body: "Direct access to providers who actually know you.",
    facts: ["Unlimited visits", "Same/next-day access", "No surprise bills", "Labs and meds at cost"],
    cta: "Book a Free Meet & Greet",
    mode: "link",
    accent: "hsl(190, 90%, 56%)",
    line: "linear-gradient(90deg, hsl(190, 90%, 52%) 60%, hsl(330, 55%, 66%) 100%)",
    glow: "0 26px 90px hsla(190, 90%, 44%, 0.34), 0 0 80px hsla(190, 90%, 44%, 0.18)",
    tint: "linear-gradient(145deg, hsla(190, 90%, 46%, 0.16), hsla(190, 88%, 44%, 0.1), hsla(190, 85%, 42%, 0.07))",
  },
  {
    id: "hormone",
    href: "/hormone",
    eyebrow: "Hormone + Metabolic",
    clinic: "CSHC Hormone Clinic",
    headline: "Dedicated to perimenopause & menopause care.",
    body: "A whole-person approach to women's health, men's health, and hormone replacement therapy.",
    facts: ["Perimenopause + menopause", "Men's health and TRT", "GLP-1 metabolic care", "Whole-person approach"],
    cta: "Book a Free Consult",
    mode: "link",
    accent: "hsl(330, 62%, 68%)",
    line: "linear-gradient(90deg, hsl(330, 62%, 62%) 30%, hsl(308, 58%, 60%) 70%, hsl(278, 60%, 60%) 100%)",
    glow: "0 26px 90px hsla(330, 62%, 50%, 0.28), 0 0 84px hsla(308, 58%, 48%, 0.15)",
    tint: "linear-gradient(145deg, hsla(330, 62%, 54%, 0.16), hsla(308, 58%, 50%, 0.1), hsla(278, 60%, 48%, 0.08))",
  },
  {
    id: "hbot",
    href: "/hyperbaric",
    eyebrow: "Opening Summer 2026",
    clinic: "CSHC Hyperbaric",
    headline: "2.0 ATA oxygen therapy is coming.",
    body: "A clinic-based chamber built around the pressure used in stronger HBOT research, with early access pricing locked in before launch.",
    facts: ["Fibromyalgia pain", "UC + Crohn's", "Long COVID", "Sports injury & recovery"],
    cta: "Join the Waitlist",
    mode: "waitlist",
    accent: "hsl(258, 72%, 64%)",
    line: "linear-gradient(90deg, hsl(278, 62%, 60%) 0%, hsl(258, 70%, 54%) 60%, hsl(234, 68%, 46%) 100%)",
    glow: "0 26px 90px hsla(258, 72%, 48%, 0.34), 0 0 84px hsla(234, 68%, 42%, 0.2)",
    tint: "linear-gradient(145deg, hsla(258, 72%, 52%, 0.18), hsla(244, 68%, 48%, 0.12), hsla(234, 68%, 44%, 0.1))",
  },
];

export default function PortalPillars() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [dpcSubmitted, setDpcSubmitted] = useState(false);
  const [dpcSubmitting, setDpcSubmitting] = useState(false);

  function toggleMobile(e: React.MouseEvent, id: string) {
    // only intercept on mobile-width screens
    if (window.innerWidth >= 980) return;
    e.stopPropagation();
    setMobileOpen(prev => prev === id ? null : id);
  }

  const handleCardClick = (href: string) => {
    router.push(href);
  };

  const handleDpcQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDpcSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("Name") ?? "").trim();
    const parts = name.split(" ");
    const firstName = parts[0] ?? name;
    const lastName = parts.slice(1).join(" ") || "-";
    const email = String(formData.get("Email") ?? "").trim();
    const question = String(formData.get("Question") ?? "").trim();
    try {
      await submitDpcInquiry({ firstName, lastName, email, phone: "", responseType: "email", notes: question, sourcePage: "Homepage Pillar" });
      setDpcSubmitted(true);
      event.currentTarget.reset();
    } catch (err) {
      console.error("DPC question error:", err);
    } finally {
      setDpcSubmitting(false);
    }
  };

  const handleWaitlist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("First Name") ?? "").trim();
    const lastName = String(formData.get("Last Name") ?? "").trim();
    const email = String(formData.get("Email") ?? "").trim();

    try {
      await submitHbotEarlyAccess({ firstName, lastName, email });
      setSubmitted(true);
      event.currentTarget.reset();
    } catch (error) {
      console.error("HBOT waitlist error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="clinic-pillars">
      <div className="clinic-pillars__grid">
        {PILLARS.map((pillar) => {
          const isOpen = mobileOpen === pillar.id;
          return (
          <article
            key={pillar.id}
            className={`clinic-pillars__card${isOpen ? " is-mobile-open" : ""}`}
            onClick={() => handleCardClick(pillar.href)}
            style={
              {
                "--pillar-accent": pillar.accent,
                "--pillar-line": pillar.line,
                "--pillar-glow": pillar.glow,
                "--pillar-tint": pillar.tint,
              } as React.CSSProperties
            }
          >
            <div className="clinic-pillars__topline" />

            {/* Mobile accordion header — always visible */}
            <button
              className="clinic-pillars__mobile-header"
              onClick={(e) => toggleMobile(e, pillar.id)}
              aria-expanded={isOpen}
            >
              <div>
                <p className="clinic-pillars__eyebrow" style={{ margin: 0 }}>{pillar.eyebrow}</p>
                <h2 style={{ margin: "4px 0 0" }}>{pillar.clinic}</h2>
                <p className="clinic-pillars__mobile-tagline">{pillar.headline}</p>
              </div>
              <span className={`clinic-pillars__chevron${isOpen ? " is-open" : ""}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            {/* Expandable body */}
            <div className="clinic-pillars__body">
              <p className="clinic-pillars__eyebrow clinic-pillars__desktop-only">{pillar.eyebrow}</p>
              <h2 className="clinic-pillars__desktop-only">{pillar.clinic}</h2>
              <h3>{pillar.headline}</h3>
              <p className="clinic-pillars__copy">{pillar.body}</p>

              <div className="clinic-pillars__facts">
                {pillar.facts.map((fact) => (
                  <span key={fact}>{fact}</span>
                ))}
              </div>
            </div>

            {pillar.id === "dpc" && (
              <form className="clinic-pillars__dpc-question" onSubmit={handleDpcQuestion} onClick={(e) => e.stopPropagation()}>
                <div>
                  <strong>{dpcSubmitted ? "We got your question." : "Ask us anything"}</strong>
                  <p>{dpcSubmitted ? "We'll be in touch shortly." : "Name, email, and your question. We'll get back to you."}</p>
                </div>
                {!dpcSubmitted && (
                  <>
                    <div className="clinic-pillars__field-row">
                      <input name="Name" type="text" required placeholder="Your name" />
                      <input name="Email" type="email" required placeholder="Email address" />
                    </div>
                    <textarea name="Question" required placeholder="What's your question?" rows={3} />
                    <button type="submit" disabled={dpcSubmitting}>
                      {dpcSubmitting ? "Sending..." : "Ask a Question"}
                    </button>
                  </>
                )}
              </form>
            )}

            {pillar.mode === "waitlist" ? (
              <form className="clinic-pillars__waitlist" onSubmit={handleWaitlist} onClick={(event) => event.stopPropagation()}>
                <div>
                  <strong>{submitted ? "You're on the list." : "Join the waitlist"}</strong>
                  <p>{submitted ? "We locked in your early access request." : "First, last, email. Secure 25% off at launch. No commitment required."}</p>
                </div>
                {!submitted ? (
                  <>
                    <div className="clinic-pillars__field-row">
                      <input name="First Name" type="text" required placeholder="First name" />
                      <input name="Last Name" type="text" required placeholder="Last name" />
                    </div>
                    <input name="Email" type="email" required placeholder="Email address" />
                    <button type="submit" disabled={submitting}>
                      {submitting ? "Sending..." : "Secure 25% Off"}
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => router.push(pillar.href)}>
                    Visit Hyperbaric
                  </button>
                )}
              </form>
            ) : (
              <div className="clinic-pillars__action">
                {pillar.id === "hormone" ? (
                  <>
                    <div className="clinic-pillars__cert-card">
                      <Image src="/perry-academy-perimenopause-certificate.svg" alt="Perry Academy Perimenopause Certificate" width={64} height={64} />
                      <div>
                        <strong>Perry Academy</strong>
                        <p>Perimenopause Certificate</p>
                        <span>Pending</span>
                      </div>
                    </div>
                    <div className="clinic-pillars__quiz-row" onClick={(e) => e.stopPropagation()}>
                      <a href="/hormone/mens-health/quiz" className="clinic-pillars__quiz-btn clinic-pillars__quiz-btn--mens" onClick={(e) => e.stopPropagation()}>
                        <span>Do I need TRT?</span>
                        <em>Men&apos;s hormone quiz →</em>
                      </a>
                      <a href="/hormone/womens-health/quiz" className="clinic-pillars__quiz-btn clinic-pillars__quiz-btn--womens" onClick={(e) => e.stopPropagation()}>
                        <span>Do I need HRT?</span>
                        <em>Women&apos;s hormone quiz →</em>
                      </a>
                    </div>
                  </>
                ) : null}
                <a
                  className="clinic-pillars__cta"
                  href={pillar.id === "hormone" ? HORMONE_URL : MEET_GREET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  {pillar.cta}
                </a>
              </div>
            )}

            <a
              href={pillar.href}
              className="clinic-pillars__learn-more"
              onClick={(e) => e.stopPropagation()}
            >
              Learn more →
            </a>
          </article>
          );
        })}
      </div>

      <style>{`
        .clinic-pillars {
          position: relative;
          margin-top: 0;
          padding-top: 0;
        }

        .clinic-pillars__grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .clinic-pillars__card {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid color-mix(in srgb, var(--pillar-accent) 28%, rgba(255,255,255,0.08));
          border-radius: 8px;
          background:
            radial-gradient(ellipse at 50% 112%, color-mix(in srgb, var(--pillar-accent) 22%, transparent), transparent 44%),
            var(--pillar-tint),
            linear-gradient(180deg, rgba(15, 22, 35, 0.96), rgba(5, 9, 16, 0.99));
          box-shadow: 0 18px 46px rgba(0,0,0,0.34);
          cursor: pointer;
          isolation: isolate;
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease, filter 380ms ease, opacity 380ms ease;
        }

        .clinic-pillars__card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            linear-gradient(120deg, transparent, color-mix(in srgb, var(--pillar-accent) 18%, transparent), transparent),
            radial-gradient(ellipse at 28% 18%, color-mix(in srgb, var(--pillar-accent) 18%, transparent), transparent 38%);
          opacity: 0.42;
          transition: opacity 220ms ease;
        }

        /* Subtle side color bleed between cards */
        .clinic-pillars__card:nth-child(1) {
          box-shadow: 0 18px 46px rgba(0,0,0,0.34), 16px 0 36px hsla(190, 90%, 44%, 0.14);
        }
        .clinic-pillars__card:nth-child(2) {
          box-shadow: 0 18px 46px rgba(0,0,0,0.34), -16px 0 36px hsla(330, 62%, 50%, 0.12), 16px 0 36px hsla(258, 70%, 48%, 0.12);
        }
        .clinic-pillars__card:nth-child(3) {
          box-shadow: 0 18px 46px rgba(0,0,0,0.34), -16px 0 36px hsla(278, 62%, 52%, 0.14);
        }

        .clinic-pillars__card:hover {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--pillar-accent) 68%, white);
          box-shadow: var(--pillar-glow);
          filter: saturate(1.12);
        }

        .clinic-pillars__card:hover::before {
          opacity: 0.86;
        }

        .clinic-pillars__grid:has(.clinic-pillars__card:hover) .clinic-pillars__card:not(:hover) {
          opacity: 0.45;
          filter: saturate(0.5) brightness(0.8);
        }

        .clinic-pillars__topline {
          height: 4px;
          flex: 0 0 auto;
          background: var(--pillar-line);
        }

        .clinic-pillars__body {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 18px 20px 14px;
        }

        .clinic-pillars__eyebrow {
          margin: 0 0 12px;
          color: var(--pillar-accent);
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .clinic-pillars__card h2 {
          margin: 0 0 12px;
          color: white;
          font-size: clamp(1.55rem, 2.1vw, 2rem);
          font-weight: 950;
          line-height: 1.04;
          letter-spacing: 0;
          text-shadow: 0 16px 40px rgba(0,0,0,0.5);
        }

        .clinic-pillars__card h3 {
          margin: 0 0 12px;
          background: var(--pillar-line);
          background-clip: text;
          color: transparent;
          font-size: 1.12rem;
          font-weight: 900;
          line-height: 1.18;
          letter-spacing: 0;
        }

        .clinic-pillars__copy {
          margin: 0;
          color: hsl(210, 18%, 72%);
          font-size: 0.92rem;
          line-height: 1.62;
          letter-spacing: 0;
        }

        .clinic-pillars__facts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 16px;
        }

        .clinic-pillars__facts span {
          border: 1px solid color-mix(in srgb, var(--pillar-accent) 24%, rgba(255,255,255,0.1));
          border-radius: 8px;
          background: rgba(2, 6, 14, 0.32);
          color: hsl(210, 25%, 84%);
          padding: 9px 11px;
          font-size: 0.82rem;
          font-weight: 750;
          letter-spacing: 0;
        }

        .clinic-pillars__quiz-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .clinic-pillars__quiz-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          min-height: 64px;
          border-radius: 10px;
          text-decoration: none;
          text-align: center;
          padding: 12px 10px;
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
        }

        .clinic-pillars__quiz-btn span {
          font-size: 0.85rem;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: 0;
        }

        .clinic-pillars__quiz-btn em {
          font-style: normal;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0;
          opacity: 0.82;
        }

        .clinic-pillars__quiz-btn:hover {
          transform: translateY(-2px);
          opacity: 0.92;
        }

        .clinic-pillars__quiz-btn--mens {
          border: 1px solid hsla(210, 85%, 60%, 0.5);
          background: linear-gradient(135deg, hsla(210, 85%, 52%, 0.28), hsla(220, 80%, 46%, 0.22));
          color: hsl(210, 90%, 80%);
          box-shadow: 0 6px 20px hsla(210, 85%, 44%, 0.22);
        }

        .clinic-pillars__quiz-btn--mens em {
          color: hsla(210, 80%, 78%, 0.85);
        }

        .clinic-pillars__quiz-btn--mens:hover {
          box-shadow: 0 8px 28px hsla(210, 85%, 44%, 0.38);
        }

        .clinic-pillars__quiz-btn--womens {
          border: 1px solid hsla(330, 80%, 65%, 0.55);
          background: linear-gradient(135deg, hsla(330, 85%, 58%, 0.32), hsla(308, 75%, 52%, 0.26));
          color: hsl(330, 90%, 85%);
          box-shadow: 0 6px 20px hsla(330, 80%, 50%, 0.25);
        }

        .clinic-pillars__quiz-btn--womens em {
          color: hsla(330, 80%, 82%, 0.85);
        }

        .clinic-pillars__quiz-btn--womens:hover {
          box-shadow: 0 8px 28px hsla(330, 80%, 50%, 0.42);
        }

        .clinic-pillars__cta,
        .clinic-pillars__waitlist button {
          display: flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 8px;
          background: var(--pillar-line);
          box-shadow: 0 14px 42px color-mix(in srgb, var(--pillar-accent) 34%, transparent);
          color: hsl(215, 42%, 8%);
          font-size: 0.9rem;
          font-weight: 950;
          letter-spacing: 0;
          text-decoration: none;
          cursor: pointer;
          transition: transform 180ms ease, opacity 180ms ease;
        }

        .clinic-pillars__action {
          display: grid;
          gap: 10px;
          margin: 0 20px 20px;
        }

        .clinic-pillars__cta {
          width: 100%;
        }

        .clinic-pillars__cta:hover,
        .clinic-pillars__waitlist button:hover {
          transform: translateY(-1px);
          opacity: 0.92;
        }

        .clinic-pillars__cert-card {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 0;
          border: 1px solid color-mix(in srgb, var(--pillar-accent) 30%, rgba(255,255,255,0.08));
          border-radius: 8px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.05), transparent),
            rgba(2, 6, 14, 0.42);
          padding: 13px 14px;
        }

        .clinic-pillars__cert-card img {
          width: 64px;
          height: 64px;
          flex: 0 0 auto;
          object-fit: contain;
          filter: drop-shadow(0 10px 22px rgba(0,0,0,0.36));
        }

        .clinic-pillars__cert-card strong {
          display: block;
          color: white;
          font-size: 0.92rem;
          font-weight: 950;
          letter-spacing: 0;
        }

        .clinic-pillars__cert-card p {
          margin: 4px 0 8px;
          color: hsl(210, 18%, 68%);
          font-size: 0.76rem;
          line-height: 1.35;
          letter-spacing: 0;
        }

        .clinic-pillars__cert-card span {
          display: inline-flex;
          border: 1px solid color-mix(in srgb, var(--pillar-accent) 34%, rgba(255,255,255,0.08));
          border-radius: 999px;
          background: color-mix(in srgb, var(--pillar-accent) 12%, rgba(2,6,14,0.42));
          color: color-mix(in srgb, var(--pillar-accent) 84%, white);
          padding: 4px 8px;
          font-size: 0.66rem;
          font-weight: 900;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .clinic-pillars__dpc-question {
          display: grid;
          gap: 10px;
          margin: 0 20px 20px;
          border: 1px solid color-mix(in srgb, var(--pillar-accent) 30%, rgba(255,255,255,0.08));
          border-radius: 8px;
          background: rgba(2, 6, 14, 0.42);
          padding: 14px;
          cursor: default;
        }

        .clinic-pillars__dpc-question strong {
          display: block;
          color: white;
          font-size: 0.92rem;
          font-weight: 950;
          letter-spacing: 0;
        }

        .clinic-pillars__dpc-question p {
          margin: 4px 0 0;
          color: hsl(210, 18%, 68%);
          font-size: 0.76rem;
          line-height: 1.35;
          letter-spacing: 0;
        }

        .clinic-pillars__dpc-question input,
        .clinic-pillars__dpc-question textarea {
          min-width: 0;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          color: white;
          padding: 10px 11px;
          font-size: 0.82rem;
          letter-spacing: 0;
          outline: none;
          resize: none;
          font-family: inherit;
        }

        .clinic-pillars__dpc-question input:focus,
        .clinic-pillars__dpc-question textarea:focus {
          border-color: color-mix(in srgb, var(--pillar-accent) 70%, white);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--pillar-accent) 18%, transparent);
        }

        .clinic-pillars__dpc-question input::placeholder,
        .clinic-pillars__dpc-question textarea::placeholder {
          color: rgba(255,255,255,0.38);
        }

        .clinic-pillars__dpc-question button {
          display: flex;
          min-height: 48px;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 8px;
          background: var(--pillar-line);
          box-shadow: 0 14px 42px color-mix(in srgb, var(--pillar-accent) 34%, transparent);
          color: hsl(215, 42%, 8%);
          font-size: 0.9rem;
          font-weight: 950;
          cursor: pointer;
          transition: transform 180ms ease, opacity 180ms ease;
        }

        .clinic-pillars__dpc-question button:hover {
          transform: translateY(-1px);
          opacity: 0.92;
        }

        .clinic-pillars__waitlist {
          display: grid;
          gap: 10px;
          margin: 0 20px 20px;
          border: 1px solid color-mix(in srgb, var(--pillar-accent) 30%, rgba(255,255,255,0.08));
          border-radius: 8px;
          background: rgba(2, 6, 14, 0.42);
          padding: 14px;
          cursor: default;
        }

        .clinic-pillars__waitlist strong {
          display: block;
          color: white;
          font-size: 0.92rem;
          font-weight: 950;
          letter-spacing: 0;
        }

        .clinic-pillars__waitlist p {
          margin: 4px 0 0;
          color: hsl(210, 18%, 68%);
          font-size: 0.76rem;
          line-height: 1.35;
          letter-spacing: 0;
        }

        .clinic-pillars__field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .clinic-pillars__waitlist input {
          min-width: 0;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          color: white;
          padding: 10px 11px;
          font-size: 0.82rem;
          letter-spacing: 0;
          outline: none;
        }

        .clinic-pillars__waitlist input:focus {
          border-color: color-mix(in srgb, var(--pillar-accent) 70%, white);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--pillar-accent) 18%, transparent);
        }

        .clinic-pillars__waitlist input::placeholder {
          color: rgba(255,255,255,0.38);
        }

        @media (max-width: 980px) {
          .clinic-pillars {
            position: relative;
          }

          .clinic-pillars__grid {
            grid-template-columns: 1fr;
          }

          .clinic-pillars__card {
            min-height: 0;
          }

          /* Mobile accordion */
          .clinic-pillars__mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            width: 100%;
            padding: 18px 20px;
            background: transparent;
            border: 0;
            color: inherit;
            text-align: left;
            cursor: pointer;
          }

          .clinic-pillars__mobile-tagline {
            margin: 4px 0 0;
            font-size: 0.82rem;
            font-weight: 600;
            background: var(--pillar-line);
            background-clip: text;
            color: transparent;
            line-height: 1.3;
          }

          .clinic-pillars__chevron {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1.5px solid color-mix(in srgb, var(--pillar-accent) 50%, transparent);
            background: color-mix(in srgb, var(--pillar-accent) 12%, transparent);
            color: var(--pillar-accent);
            flex-shrink: 0;
            transition: transform 0.3s ease, background 0.2s ease;
            animation: chevron-bounce 2s ease-in-out infinite;
          }

          .clinic-pillars__chevron.is-open {
            transform: rotate(180deg);
            background: color-mix(in srgb, var(--pillar-accent) 22%, transparent);
            animation: none;
          }

          @keyframes chevron-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(3px); }
          }

          .clinic-pillars__learn-more {
            display: none;
          }

          /* Hide desktop body + action by default on mobile */
          .clinic-pillars__body,
          .clinic-pillars__action,
          .clinic-pillars__waitlist,
          .clinic-pillars__dpc-question {
            display: none;
          }

          /* Show when open */
          .clinic-pillars__card.is-mobile-open .clinic-pillars__body {
            display: flex;
            flex-direction: column;
            padding-top: 0;
          }

          .clinic-pillars__card.is-mobile-open .clinic-pillars__action,
          .clinic-pillars__card.is-mobile-open .clinic-pillars__waitlist,
          .clinic-pillars__card.is-mobile-open .clinic-pillars__dpc-question {
            display: grid;
          }

          .clinic-pillars__card.is-mobile-open .clinic-pillars__learn-more {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 24px 24px;
            padding: 14px 20px;
            border-radius: 10px;
            border: none;
            background: var(--pillar-line);
            color: hsl(215, 42%, 8%);
            font-size: 0.95rem;
            font-weight: 900;
            text-decoration: none;
            box-shadow: 0 8px 28px color-mix(in srgb, var(--pillar-accent) 34%, transparent);
          }

          /* Hide the repeated heading/eyebrow in expanded body on mobile */
          .clinic-pillars__desktop-only {
            display: none;
          }
        }

        @media (min-width: 981px) {
          /* Hide accordion header on desktop */
          .clinic-pillars__mobile-header {
            display: none;
          }

          /* Hide learn more on desktop — card is clickable */
          .clinic-pillars__learn-more {
            display: none;
          }
        }

        @media (max-width: 520px) {
          .clinic-pillars__body {
            padding: 22px 20px 16px;
          }

          .clinic-pillars__action,
          .clinic-pillars__waitlist {
            margin-right: 20px;
            margin-left: 20px;
          }
        }
      `}</style>
    </div>
  );
}
