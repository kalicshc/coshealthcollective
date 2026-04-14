"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitHbotEarlyAccess } from "@/lib/api";

const MEET_GREET_URL =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

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
    body: "Unlimited visits, no copays, at-cost labs and direct access to a provider who actually knows your story.",
    facts: ["Unlimited visits", "Same/next-day access", "No surprise bills", "Labs and meds at cost"],
    cta: "Book a Free Meet & Greet",
    mode: "link",
    accent: "hsl(51, 96%, 67%)",
    line: "linear-gradient(135deg, hsl(51, 96%, 63%), hsl(137, 62%, 58%), hsl(178, 76%, 62%))",
    glow: "0 26px 90px hsla(51, 96%, 50%, 0.28), 0 0 80px hsla(178, 76%, 48%, 0.18)",
    tint: "linear-gradient(145deg, hsla(51, 96%, 55%, 0.18), hsla(137, 62%, 48%, 0.08), hsla(178, 76%, 50%, 0.12))",
  },
  {
    id: "hormone",
    href: "/hormone",
    eyebrow: "Hormone + Metabolic",
    clinic: "CSHC Hormone Clinic",
    headline: "Dedicated to perimenopause & menopause care.",
    body: "You have been told to live with it. You do not have to. Hormone care for women who want the full picture, with men's TRT and GLP-1 support too.",
    facts: ["Perimenopause + menopause", "Men's TRT quiz", "GLP-1 metabolic care", "Whole-pattern review"],
    cta: "Book a Free Consult",
    mode: "link",
    accent: "hsl(333, 96%, 76%)",
    line: "linear-gradient(135deg, hsl(333, 96%, 66%), hsl(282, 82%, 62%), hsl(188, 92%, 62%))",
    glow: "0 26px 90px hsla(333, 96%, 56%, 0.3), 0 0 84px hsla(188, 92%, 50%, 0.18)",
    tint: "linear-gradient(145deg, hsla(333, 96%, 58%, 0.18), hsla(282, 82%, 58%, 0.12), hsla(188, 92%, 52%, 0.1))",
  },
  {
    id: "hbot",
    href: "/hyperbaric",
    eyebrow: "Opening Summer 2026",
    clinic: "CSHC Hyperbaric",
    headline: "2.0 ATA oxygen therapy is coming.",
    body: "A clinic-based chamber built around the pressure used in stronger HBOT research, with early access pricing locked in before launch.",
    facts: ["Fibromyalgia pain", "UC + Crohn's", "Long COVID", "Wound healing"],
    cta: "Join the Waitlist",
    mode: "waitlist",
    accent: "hsl(177, 82%, 64%)",
    line: "linear-gradient(135deg, hsl(177, 82%, 58%), hsl(204, 88%, 60%), hsl(228, 74%, 66%))",
    glow: "0 26px 90px hsla(177, 82%, 48%, 0.32), 0 0 84px hsla(204, 88%, 52%, 0.2)",
    tint: "linear-gradient(145deg, hsla(177, 82%, 50%, 0.18), hsla(204, 88%, 52%, 0.12), hsla(228, 74%, 56%, 0.1))",
  },
];

export default function PortalPillars() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCardClick = (href: string) => {
    router.push(href);
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
        {PILLARS.map((pillar) => (
          <article
            key={pillar.id}
            className="clinic-pillars__card"
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
            <div className="clinic-pillars__body">
              <p className="clinic-pillars__eyebrow">{pillar.eyebrow}</p>
              <h2>{pillar.clinic}</h2>
              <h3>{pillar.headline}</h3>
              <p className="clinic-pillars__copy">{pillar.body}</p>

              <div className="clinic-pillars__facts">
                {pillar.facts.map((fact) => (
                  <span key={fact}>{fact}</span>
                ))}
              </div>
            </div>

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
                  <div className="clinic-pillars__cert-card">
                    <img src="/perry-academy-perimenopause-certificate.svg" alt="Perry Academy Perimenopause Certificate" />
                    <div>
                      <strong>Perry Academy</strong>
                      <p>Perimenopause Certificate</p>
                      <span>Pending</span>
                    </div>
                  </div>
                ) : null}
                <a
                  className="clinic-pillars__cta"
                  href={MEET_GREET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  {pillar.cta}
                </a>
              </div>
            )}
          </article>
        ))}
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
          min-height: 520px;
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
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease, filter 220ms ease;
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

        .clinic-pillars__card:hover {
          transform: translateY(-6px);
          border-color: color-mix(in srgb, var(--pillar-accent) 68%, white);
          box-shadow: var(--pillar-glow);
          filter: saturate(1.12);
        }

        .clinic-pillars__card:hover::before {
          opacity: 0.86;
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
          padding: 24px 24px 18px;
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
          gap: 8px;
          margin-top: 22px;
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
          gap: 14px;
          margin: 0 24px 24px;
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

        .clinic-pillars__waitlist {
          display: grid;
          gap: 10px;
          margin: 0 24px 24px;
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

          .clinic-pillars__field-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
