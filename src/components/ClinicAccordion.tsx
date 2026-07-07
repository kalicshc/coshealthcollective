"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { submitHbotEarlyAccess } from "@/lib/api";
import ClinicQuestionForm from "@/components/ClinicQuestionForm";
import { ACCENTS } from "@/lib/accents";
import { bookingUrl } from "@/lib/bookingLinks";

type ClinicKey = "dpc" | "hormone" | "hyperbaric";

const STORAGE_KEY = "coshc.activeClinic";
const isClinicKey = (v: unknown): v is ClinicKey =>
  v === "dpc" || v === "hormone" || v === "hyperbaric";

type LinkCta = { label: string; href: string; external?: boolean };

type ClinicCta =
  | { type: "single"; primary: LinkCta }
  | { type: "multi"; primary: LinkCta; secondary: LinkCta[] }
  | { type: "form" };

type Clinic = {
  key: ClinicKey;
  name: string;
  shortName: string;
  status: string;
  statusKind: "live" | "open" | "soon";
  tagline: string;
  body: string;
  featuredQuote?: string;
  services: string[];
  cta: ClinicCta;
  learnMoreHref: string;
  accent: {
    from: string;
    to: string;
    glow: string;
    chipBorder: string;
    statusDot: string;
  };
};

const MEET_GREET_URL =
  bookingUrl("meetGreet", "clinic-accordion");
const HORMONE_CONSULT_URL =
  bookingUrl("freeConsult", "clinic-accordion");

// Per-service palettes live in src/lib/accents.ts (shared with the home
// flythrough, ClinicSpectrum, and the shared page components).
const ACCENT = {
  blue: ACCENTS.dpc,
  purple: ACCENTS.hormone,
  teal: ACCENTS.hyperbaric,
};

const CLINICS: Clinic[] = [
  {
    key: "dpc",
    name: "Direct Primary Care",
    shortName: "DPC",
    status: "Now Enrolling",
    statusKind: "live",
    tagline: "$100/month. A provider who actually knows you.",
    body:
      "Membership-based primary care without the insurance maze — unlimited visits, same or next-day appointments, no surprise bills, and labs at cost. The foundation of great health is a provider who answers your call.",
    services: ["Unlimited visits", "Same/next-day care", "No surprise bills", "Labs at cost"],
    cta: { type: "single", primary: { label: "Book a Free Meet & Greet", href: MEET_GREET_URL, external: true } },
    learnMoreHref: "/direct-primary-care",
    accent: ACCENT.blue,
  },
  {
    key: "hormone",
    name: "Hormone & Metabolic Clinic",
    shortName: "Hormone",
    status: "Now Open",
    statusKind: "open",
    tagline: "Hormone care that addresses the whole picture.",
    body:
      "Perimenopause, menopause, low T, GLP-1 weight loss — for women, men, and metabolic patients. Personalized, evidence-based care that finally takes the full hormonal system seriously.",
    featuredQuote:
      "A whole-person approach — addressing inflammation, nutrition, genetics, and lifestyle alongside hormones — is not just good medicine. It's the difference between hormones that heal and hormones that may inadvertently cause harm.",
    services: ["Perimenopause + menopause", "Men's health & TRT", "GLP-1 weight loss", "Personalized plans"],
    cta: {
      type: "multi",
      primary: { label: "Book a Free Consult", href: HORMONE_CONSULT_URL, external: true },
      secondary: [
        { label: "Men's Hormone Quiz", href: "/hormone/mens-health/quiz" },
        { label: "Women's Hormone Quiz", href: "/hormone/womens-health/quiz" },
      ],
    },
    learnMoreHref: "/hormone",
    accent: ACCENT.purple,
  },
  {
    key: "hyperbaric",
    name: "Hyperbaric Oxygen",
    shortName: "Hyperbaric",
    status: "Opening Summer 2026",
    statusKind: "soon",
    tagline: "2.0 ATA oxygen therapy is coming.",
    body:
      "The only accessible 2.0 ATA hyperbaric chamber in Colorado Springs — research-grade pressure used to reduce inflammation, support recovery, and treat conditions that respond to oxygen at depth.",
    services: ["Fibromyalgia", "UC + Crohn's", "Long COVID", "Sports recovery"],
    cta: { type: "form" },
    learnMoreHref: "/hyperbaric",
    accent: ACCENT.teal,
  },
];

function GradientButton({
  href,
  external,
  children,
  accent,
  className = "",
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  accent: Clinic["accent"];
  className?: string;
}) {
  return (
    <span className="clinic-cta-breathe block w-full">
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`block w-full rounded-full px-6 py-3.5 text-center text-sm font-bold transition-all duration-200 hover:scale-[1.02] hover:brightness-110 ${className}`}
        style={{
          background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
          color: "hsl(210, 32%, 10%)",
          boxShadow: `0 14px 30px -10px ${accent.glow}`,
        }}
      >
        {children}
      </Link>
    </span>
  );
}

function GhostButton({ href, children, accent }: { href: string; children: React.ReactNode; accent: Clinic["accent"] }) {
  return (
    <span className="clinic-cta-breathe block w-full">
      <Link
        href={href}
        className="block w-full rounded-full border px-5 py-2.5 text-center text-[13px] font-semibold transition-all duration-200 hover:bg-white/[0.05] hover:scale-[1.02]"
        style={{
          borderColor: `${accent.from}40`,
          color: "#fff",
          background: "rgba(255,255,255,0.025)",
        }}
      >
        {children}
      </Link>
    </span>
  );
}

function HbotWaitlistForm({ accent }: { accent: Clinic["accent"] }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await submitHbotEarlyAccess({
        firstName: firstName.trim(),
        lastName: lastName.trim() || "-",
        email: email.trim(),
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
        <p className="text-sm font-bold text-white">You&apos;re on the list.</p>
        <p className="mt-1 text-xs text-slate-400">25% off locked in. We&apos;ll email you at launch.</p>
      </div>
    );
  }

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
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = `${accent.from}66`)}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          className="rounded-xl border bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:bg-black/40"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = `${accent.from}66`)}
          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
        />
      </div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        required
        className="w-full rounded-xl border bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:bg-black/40"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = `${accent.from}66`)}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
      />
      <span className="clinic-cta-breathe block w-full">
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
          {submitting ? "Sending…" : "Secure 25% Off"}
        </button>
      </span>
      {error ? <p className="text-xs text-rose-400 text-center">{error}</p> : null}
      <p className="pt-1 text-center text-[11px] text-slate-500">
        Lock in 25% off at launch. No commitment required.
      </p>
    </form>
  );
}

function PanelHeader({ clinic, layout }: { clinic: Clinic; layout: "desktop" | "mobile" }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{
          color: clinic.accent.from,
          borderColor: `${clinic.accent.from}40`,
          background: `${clinic.accent.from}10`,
        }}
      >
        <span
          className={`clinic-status-dot inline-block h-1.5 w-1.5 rounded-full ${
            clinic.statusKind === "soon" ? "" : "is-live"
          }`}
          style={{ background: clinic.accent.statusDot, color: clinic.accent.statusDot }}
        />
        {clinic.status}
      </span>
      {layout === "desktop" ? (
        <span className="text-xs uppercase tracking-[0.16em] text-slate-500">{clinic.shortName}</span>
      ) : null}
    </div>
  );
}

function PanelBody({ clinic, taglineSize }: { clinic: Clinic; taglineSize: "lg" | "md" }) {
  return (
    <>
      <h3
        className={`font-black leading-[1.06] tracking-tight ${
          taglineSize === "lg"
            ? "text-3xl sm:text-4xl lg:text-[2.6rem]"
            : "text-2xl sm:text-3xl"
        }`}
        style={{
          background: `linear-gradient(135deg, #fff 0%, #fff 55%, ${clinic.accent.from} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {clinic.tagline}
      </h3>
      {clinic.featuredQuote ? (
        <blockquote
          className="border-l-2 pl-4 italic text-[14px] leading-6 text-slate-200 max-w-2xl"
          style={{ borderColor: clinic.accent.from }}
        >
          {clinic.featuredQuote}
        </blockquote>
      ) : (
        <p className="text-[15px] leading-7 text-slate-300 max-w-2xl">{clinic.body}</p>
      )}
      <div className="flex flex-wrap gap-2 pt-1">
        {clinic.services.map((service) => (
          <span
            key={service}
            className="rounded-full border px-3 py-1.5 text-xs font-medium text-slate-100"
            style={{
              borderColor: clinic.accent.chipBorder,
              background: "rgba(255,255,255,0.035)",
            }}
          >
            {service}
          </span>
        ))}
      </div>
    </>
  );
}

function PanelCta({ clinic }: { clinic: Clinic }) {
  return (
    <div
      className="rounded-2xl border p-5 sm:p-6 backdrop-blur-sm"
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        background: "linear-gradient(180deg, hsla(210, 22%, 8%, 0.7), hsla(210, 22%, 6%, 0.7))",
      }}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
        {clinic.cta.type === "form" ? "Join the Waitlist" : "Next steps"}
      </p>

      {clinic.cta.type === "single" ? (
        <GradientButton href={clinic.cta.primary.href} external={clinic.cta.primary.external} accent={clinic.accent}>
          {clinic.cta.primary.label}
        </GradientButton>
      ) : null}

      {clinic.cta.type === "multi" ? (
        <div className="space-y-2.5">
          <GradientButton href={clinic.cta.primary.href} external={clinic.cta.primary.external} accent={clinic.accent}>
            {clinic.cta.primary.label}
          </GradientButton>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {clinic.cta.secondary.map((sec) => (
              <GhostButton key={sec.href} href={sec.href} accent={clinic.accent}>
                {sec.label}
              </GhostButton>
            ))}
          </div>
        </div>
      ) : null}

      {clinic.cta.type === "form" ? <HbotWaitlistForm accent={clinic.accent} /> : null}
    </div>
  );
}

function ExploreButton({ clinic }: { clinic: Clinic }) {
  return (
    <span className="clinic-cta-breathe mt-4 block w-full">
    <Link
      href={clinic.learnMoreHref}
      className="clinic-explore-cta group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl px-5 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:brightness-110"
      style={{
        background: `linear-gradient(135deg, ${clinic.accent.from}38, ${clinic.accent.to}22), hsla(210, 22%, 8%, 0.78)`,
        boxShadow: `0 0 0 1.5px ${clinic.accent.from}aa inset, 0 8px 24px -6px ${clinic.accent.glow}`,
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative">
        Explore <span style={{ color: clinic.accent.from }}>{clinic.shortName}</span>
      </span>
      <span
        aria-hidden
        className="relative inline-flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-1"
        style={{
          background: `linear-gradient(135deg, ${clinic.accent.from}, ${clinic.accent.to})`,
          color: "hsl(210, 32%, 10%)",
          boxShadow: `0 0 16px -2px ${clinic.accent.glow}`,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
    </span>
  );
}

function AskCard({ clinic, onClose }: { clinic: Clinic; onClose: () => void }) {
  return (
    <div
      className="rounded-2xl border p-5 sm:p-6 backdrop-blur-sm"
      style={{
        borderColor: `${clinic.accent.from}33`,
        background: "linear-gradient(180deg, hsla(210, 22%, 8%, 0.7), hsla(210, 22%, 6%, 0.7))",
        boxShadow: `0 0 0 1px ${clinic.accent.from}1f, 0 18px 50px -20px ${clinic.accent.glow}`,
      }}
    >
      <p
        className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
        style={{ color: clinic.accent.from }}
      >
        Ask {clinic.shortName}
      </p>
      <ClinicQuestionForm
        clinicKey={clinic.key}
        accent={clinic.accent}
        sourcePage={clinic.learnMoreHref}
        onClose={onClose}
      />
    </div>
  );
}

function AskTrigger({ clinic, onClick }: { clinic: Clinic; onClick: () => void }) {
  return (
    <div className="mt-3 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className="group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:scale-[1.02] hover:bg-white/[0.04]"
        style={{
          borderColor: `${clinic.accent.from}55`,
          color: "#fff",
          background: "rgba(255,255,255,0.025)",
        }}
      >
        <span
          aria-hidden
          className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-black"
          style={{
            background: `linear-gradient(135deg, ${clinic.accent.from}, ${clinic.accent.to})`,
            color: "hsl(210, 32%, 10%)",
          }}
        >
          ?
        </span>
        Ask a Question
      </button>
    </div>
  );
}

function ClinicTile({
  clinic,
  isActive,
  onClick,
  onMouseEnter,
  layout,
}: {
  clinic: Clinic;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  layout: "desktop" | "mobile";
}) {
  const isMobile = layout === "mobile";
  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      onFocus={onMouseEnter}
      onClick={onClick}
      aria-pressed={isActive}
      aria-expanded={isMobile ? isActive : undefined}
      className={`group relative overflow-hidden rounded-2xl border text-left transition-[transform,border-color,box-shadow,background] duration-300 hover:scale-[1.005] ${
        isMobile ? "w-full" : ""
      }`}
      style={{
        padding: isMobile ? "18px 18px 16px" : "18px 18px 26px",
        borderWidth: 0,
        background: isActive
          ? `linear-gradient(135deg, ${clinic.accent.from}26, ${clinic.accent.to}14), hsla(210, 24%, 9%, 0.82)`
          : `linear-gradient(135deg, ${clinic.accent.from}10, ${clinic.accent.to}06), hsla(210, 24%, 9%, 0.6)`,
        boxShadow: isActive
          ? `0 0 60px -14px ${clinic.accent.glow}, 0 12px 30px -16px rgba(0,0,0,0.55)`
          : `0 0 28px -16px ${clinic.accent.glow}, 0 6px 18px rgba(0,0,0,0.28)`,
      }}
    >
      <span
        className="pointer-events-none absolute top-0 left-0 right-0 transition-all duration-300"
        style={{
          height: isActive ? "3px" : "2px",
          background: `linear-gradient(90deg, transparent, ${clinic.accent.from}, ${clinic.accent.to}, transparent)`,
          opacity: isActive ? 1 : 0.55,
          boxShadow: isActive ? `0 0 14px ${clinic.accent.from}` : "none",
        }}
      />

      <div className={`flex items-center gap-2 ${isMobile ? "mb-1" : "mb-1.5"}`}>
        <span
          className={`clinic-status-dot inline-block h-1.5 w-1.5 rounded-full ${
            clinic.statusKind === "soon" ? "" : "is-live"
          }`}
          style={{ background: clinic.accent.statusDot, color: clinic.accent.statusDot }}
        />
        <span
          className={`font-bold uppercase tracking-[0.16em] truncate ${
            isMobile ? "text-[10px]" : "text-[9px] sm:text-[10px]"
          }`}
          style={{ color: isActive ? clinic.accent.from : "hsl(210, 22%, 60%)" }}
        >
          {clinic.status}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <h3
          className={`clinic-tile-title bg-clip-text text-transparent font-black leading-[1.05] tracking-tight ${
            isMobile ? "text-xl" : "text-lg sm:text-xl"
          } ${isActive ? "is-active" : ""}`}
          style={{
            backgroundImage: isActive
              ? `linear-gradient(110deg, #fff 0%, #fff 18%, ${clinic.accent.from} 78%, ${clinic.accent.to} 100%)`
              : `linear-gradient(110deg, #fff 0%, #fff 28%, ${clinic.accent.from} 100%)`,
          }}
        >
          {clinic.name}
        </h3>

        {isMobile ? (
          <span
            aria-hidden
            className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-300"
            style={{
              transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
              background: isActive
                ? `linear-gradient(135deg, ${clinic.accent.from}, ${clinic.accent.to})`
                : "rgba(255,255,255,0.06)",
              color: isActive ? "hsl(210, 32%, 10%)" : "hsl(210, 22%, 70%)",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : null}
      </div>

      {/* Desktop "more below" hint — small bouncing chevron in clinic's accent color */}
      {!isMobile ? (
        <span
          aria-hidden
          className="clinic-hint-bounce pointer-events-none absolute bottom-2 left-1/2"
          style={{
            color: clinic.accent.from,
            opacity: isActive ? 0 : undefined,
            transition: "opacity 320ms ease",
            filter: `drop-shadow(0 0 6px ${clinic.accent.from}88)`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ) : null}
    </button>
  );
}

function panelDecor(clinic: Clinic): React.CSSProperties {
  return {
    borderColor: `${clinic.accent.from}33`,
    background: `linear-gradient(135deg, ${clinic.accent.from}0c, ${clinic.accent.to}05), hsla(210, 30%, 4%, 0.94)`,
    boxShadow: `0 0 90px -28px ${clinic.accent.glow}, 0 22px 44px -28px rgba(0,0,0,0.7)`,
  };
}

export default function ClinicAccordion({
  externalActiveKey,
  onActiveChange,
  defaultActiveKey = "dpc",
  hideTiles = false,
  hidePanel = false,
  hideMobile = false,
}: {
  externalActiveKey?: ClinicKey;
  onActiveChange?: (key: ClinicKey) => void;
  defaultActiveKey?: ClinicKey;
  /** Desktop only: hide the three-tile picker row (use when the spectrum replaces it). */
  hideTiles?: boolean;
  /** Desktop only: hide the open detail panel below the tiles (when panel lives elsewhere). */
  hidePanel?: boolean;
  /** Hide the entire mobile (lg:hidden) block — use when a sibling instance handles mobile. */
  hideMobile?: boolean;
} = {}) {
  const isControlled = externalActiveKey !== undefined;
  const [internalKey, setInternalKey] = useState<ClinicKey>(defaultActiveKey);
  const activeKey: ClinicKey = isControlled ? externalActiveKey! : internalKey;
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (isControlled) {
      setHydrated(true);
      return;
    }
    try {
      const saved = window.sessionStorage.getItem(STORAGE_KEY);
      if (isClinicKey(saved)) setInternalKey(saved);
    } catch {}
    setHydrated(true);
  }, [isControlled]);

  useEffect(() => {
    if (isControlled || !hydrated) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, internalKey);
    } catch {}
  }, [internalKey, hydrated, isControlled]);

  const setActiveKey = (k: ClinicKey) => {
    if (!isControlled) setInternalKey(k);
    onActiveChange?.(k);
  };

  const router = useRouter();
  const [asking, setAsking] = useState(false);
  // Mobile starts fully closed; clicking a tile toggles it open/closed independently
  // of desktop activeKey (which always has one clinic focused for the spectrum/panel).
  const [mobileOpenKey, setMobileOpenKey] = useState<ClinicKey | null>(null);

  useEffect(() => {
    // collapse the ask form whenever the focused clinic changes on either layout
    setAsking(false);
  }, [activeKey, mobileOpenKey]);

  const handleDesktopTileClick = (k: ClinicKey, href: string) => {
    if (isControlled) {
      router.push(href);
    } else {
      setActiveKey(k);
    }
  };

  // Mobile tap toggles: tap an open tile to close it, tap a closed one to open it.
  const handleMobileTileClick = (k: ClinicKey) => {
    setMobileOpenKey((prev) => (prev === k ? null : k));
  };

  const active = CLINICS.find((c) => c.key === activeKey)!;

  return (
    <div className="w-full">
      <style>{`
        @keyframes clinic-panel-in {
          0%   { opacity: 0; transform: translateY(10px); filter: blur(2px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .clinic-panel-fade > * { animation: clinic-panel-in 480ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        .clinic-panel-fade > *:nth-child(2) { animation-delay: 60ms; }
        .clinic-panel-fade > *:nth-child(3) { animation-delay: 120ms; }
        @keyframes clinic-mobile-in {
          0%   { opacity: 0; max-height: 0; transform: translateY(-4px); }
          100% { opacity: 1; max-height: 1600px; transform: translateY(0); }
        }
        .clinic-mobile-expand { animation: clinic-mobile-in 360ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes clinic-pulse {
          0%, 100% { box-shadow: 0 0 0 0 currentColor; }
          50%      { box-shadow: 0 0 0 4px transparent; }
        }
        .clinic-status-dot.is-live { animation: clinic-pulse 2.4s ease-in-out infinite; }

        @keyframes clinic-title-breathe {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.82; }
        }
        .clinic-tile-title.is-active { animation: clinic-title-breathe 3.2s ease-in-out infinite; }

        @keyframes clinic-cta-breathe {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50%      { transform: scale(1.028); filter: brightness(1.08); }
        }
        .clinic-cta-breathe {
          animation: clinic-cta-breathe 3s ease-in-out infinite;
          transform-origin: center;
          display: block;
          will-change: transform, filter;
        }
        .clinic-cta-breathe:hover { animation-play-state: paused; }

        @keyframes clinic-hint-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0);    opacity: 0.55; }
          50%      { transform: translateX(-50%) translateY(4px);  opacity: 1; }
        }
        .clinic-hint-bounce {
          animation: clinic-hint-bounce 1.8s ease-in-out infinite;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .clinic-tile-title.is-active,
          .clinic-cta-breathe,
          .clinic-hint-bounce { animation: none !important; }
        }
      `}</style>

      {/* ─── Desktop: tile row + single detail panel ─────────────────── */}
      <div className="hidden lg:block">
        {hideTiles ? null : (
          <div className="grid grid-cols-3 gap-3">
            {CLINICS.map((clinic) => (
              <ClinicTile
                key={clinic.key}
                clinic={clinic}
                isActive={clinic.key === activeKey}
                onClick={() => handleDesktopTileClick(clinic.key, clinic.learnMoreHref)}
                onMouseEnter={
                  isControlled ? () => setActiveKey(clinic.key) : undefined
                }
                layout="desktop"
              />
            ))}
          </div>
        )}

        {hidePanel ? null : <div
          key={`desktop-${active.key}`}
          className={`relative ${hideTiles ? "" : "mt-4"} overflow-hidden rounded-3xl border transition-all duration-500 lg:min-h-[460px]`}
          style={{ padding: "clamp(24px, 4vw, 44px)", ...panelDecor(active) }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full opacity-25 blur-3xl"
            style={{ background: `radial-gradient(circle, ${active.accent.from}, transparent 70%)` }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full opacity-15 blur-3xl"
            style={{ background: `radial-gradient(circle, ${active.accent.to}, transparent 72%)` }}
          />

          <div className="relative grid lg:grid-cols-12 gap-12 items-start clinic-panel-fade">
            <Link
              href={active.learnMoreHref}
              className="lg:col-span-7 space-y-5 block cursor-pointer transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-2xl -m-2 p-2"
            >
              <PanelHeader clinic={active} layout="desktop" />
              <PanelBody clinic={active} taglineSize="lg" />
            </Link>
            <div className="lg:col-span-5">
              {asking ? (
                <AskCard clinic={active} onClose={() => setAsking(false)} />
              ) : (
                <PanelCta clinic={active} />
              )}
              <ExploreButton clinic={active} />
              {asking ? null : <AskTrigger clinic={active} onClick={() => setAsking(true)} />}
            </div>
          </div>
        </div>}
      </div>

      {/* ─── Mobile: vertical accordion, each clinic expands inline ────── */}
      <div className={`lg:hidden space-y-3 ${hideMobile ? "hidden" : ""}`}>
        {CLINICS.map((clinic) => {
          const isOpen = clinic.key === mobileOpenKey;
          return (
            <div key={clinic.key}>
              <ClinicTile
                clinic={clinic}
                isActive={isOpen}
                onClick={() => handleMobileTileClick(clinic.key)}
                layout="mobile"
              />

              {isOpen ? (
                <div
                  key={`mobile-${clinic.key}`}
                  className="clinic-mobile-expand relative mt-2 overflow-hidden rounded-3xl border"
                  style={{ padding: "clamp(20px, 5vw, 28px)", ...panelDecor(clinic) }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full opacity-25 blur-3xl"
                    style={{ background: `radial-gradient(circle, ${clinic.accent.from}, transparent 70%)` }}
                  />

                  <div className="relative space-y-5 clinic-panel-fade">
                    <Link
                      href={clinic.learnMoreHref}
                      className="block cursor-pointer transition hover:opacity-95 rounded-2xl"
                    >
                      <PanelBody clinic={clinic} taglineSize="md" />
                    </Link>
                    {asking && clinic.key === mobileOpenKey ? (
                      <AskCard clinic={clinic} onClose={() => setAsking(false)} />
                    ) : (
                      <PanelCta clinic={clinic} />
                    )}
                    <ExploreButton clinic={clinic} />
                    {asking && clinic.key === mobileOpenKey ? null : (
                      <AskTrigger clinic={clinic} onClick={() => setAsking(true)} />
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
