"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import { submitDpcInquiry, submitHbotEarlyAccess, submitHormoneInquiry } from "@/lib/api";

type FormType = "dpc" | "hormone" | "hbot";

// ── DPC Hero Visual ────────────────────────────────────────────────────────────
// Feels like: data dashboard / clean clinical precision / gold+teal
function DpcHero({ isHovered }: { isHovered: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Base */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg, hsl(25,55%,7%) 0%, hsl(177,55%,7%) 100%)" }} />
      {/* Dot grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, hsla(177,70%,55%,0.09) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      {/* Center glow */}
      <div style={{ position: "absolute", top: "46%", left: "50%", transform: "translate(-50%,-50%)", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, hsla(45,90%,55%,0.16) 0%, hsla(177,70%,45%,0.07) 50%, transparent 70%)", opacity: isHovered ? 1 : 0.7, transition: "opacity 0.45s" }} />
      {/* Concentric rings */}
      {[130, 195, 265, 335].map((s, i) => (
        <div key={i} style={{ position: "absolute", top: "46%", left: "50%", transform: "translate(-50%,-50%)", width: `${s}px`, height: `${s}px`, borderRadius: "50%", border: `1px solid hsla(177,70%,55%,${isHovered ? 0.18 - i * 0.035 : 0.09 - i * 0.018})`, transition: "border-color 0.45s" }} />
      ))}
      {/* Tick marks on outermost ring */}
      {[0, 90, 180, 270].map((deg) => (
        <div key={deg} style={{ position: "absolute", top: "46%", left: "50%", width: "6px", height: "1px", background: `hsla(45,90%,60%,${isHovered ? 0.5 : 0.22})`, transform: `translate(-50%,-50%) rotate(${deg}deg) translateX(${335 / 2}px)`, transformOrigin: "0 50%", transition: "background 0.45s" }} />
      ))}
      {/* $100 anchor */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "-4%" }}>
        <div style={{ fontSize: "80px", fontWeight: 900, lineHeight: 1, background: "linear-gradient(135deg, hsl(45,90%,65%), hsl(177,70%,59%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          $100
        </div>
        <div style={{ fontSize: "11px", color: "hsl(0,0%,36%)", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "7px" }}>per month · per person</div>
      </div>
      {/* Corner brackets */}
      <div style={{ position: "absolute", top: "14px", left: "16px", width: "14px", height: "14px", borderTop: "1.5px solid hsla(45,90%,60%,0.45)", borderLeft: "1.5px solid hsla(45,90%,60%,0.45)" }} />
      <div style={{ position: "absolute", top: "14px", right: "16px", width: "14px", height: "14px", borderTop: "1.5px solid hsla(177,70%,55%,0.45)", borderRight: "1.5px solid hsla(177,70%,55%,0.45)" }} />
      <div style={{ position: "absolute", bottom: "14px", left: "16px", width: "14px", height: "14px", borderBottom: "1.5px solid hsla(177,70%,55%,0.3)", borderLeft: "1.5px solid hsla(177,70%,55%,0.3)" }} />
      <div style={{ position: "absolute", bottom: "14px", right: "16px", width: "14px", height: "14px", borderBottom: "1.5px solid hsla(45,90%,60%,0.3)", borderRight: "1.5px solid hsla(45,90%,60%,0.3)" }} />
    </div>
  );
}

// ── Hormone Hero Visual ────────────────────────────────────────────────────────
// Feels like: warm femininity / gradient editorial / pink+purple+cyan
function HormoneHero({ isHovered }: { isHovered: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg, hsl(290,50%,7%) 0%, hsl(320,50%,9%) 50%, hsl(189,45%,7%) 100%)" }} />
      {/* Floating orbs */}
      <div style={{ position: "absolute", top: "-25%", right: "-15%", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, hsla(340,90%,65%,0.24) 0%, transparent 65%)", opacity: isHovered ? 1 : 0.6, transition: "opacity 0.45s" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-15%", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, hsla(281,80%,65%,0.2) 0%, transparent 65%)", opacity: isHovered ? 1 : 0.5, transition: "opacity 0.45s" }} />
      <div style={{ position: "absolute", top: "25%", left: "55%", width: "90px", height: "90px", borderRadius: "50%", background: "radial-gradient(circle, hsla(189,100%,68%,0.16) 0%, transparent 65%)" }} />
      {/* Flowing curves */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 300 300" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d="M-20 155 C 60 115, 110 195, 190 145 C 240 112, 280 162, 340 130" stroke="hsla(340,90%,65%,0.18)" strokeWidth="1.2" />
        <path d="M-20 180 C 50 140, 100 220, 180 170 C 230 137, 270 187, 340 157" stroke="hsla(281,80%,65%,0.14)" strokeWidth="1" />
        <path d="M-20 205 C 40 165, 90 240, 170 190 C 220 157, 260 207, 340 177" stroke="hsla(189,100%,68%,0.1)" strokeWidth="0.8" />
      </svg>
      {/* Center text */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 18px", textAlign: "center", gap: "9px" }}>
        <p style={{ fontSize: "17px", fontWeight: 900, lineHeight: 1.28, background: "linear-gradient(135deg, hsl(340,100%,78%), hsl(281,86%,73%), hsl(189,100%,73%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          The clinic women have been waiting for.
        </p>
        <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, transparent, hsla(340,100%,65%,0.6), transparent)" }} />
        <p style={{ fontSize: "9px", color: "hsl(0,0%,42%)", letterSpacing: "0.17em", fontWeight: 600 }}>HRT · GLP-1 · PERIMENOPAUSE</p>
      </div>
    </div>
  );
}

// ── HBOT Hero Visual ───────────────────────────────────────────────────────────
// Feels like: clinical depth / pressure / oxygen / teal+blue
function HbotHero({ isHovered }: { isHovered: boolean }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(155deg, hsl(185,55%,5%) 0%, hsl(210,60%,8%) 100%)" }} />
      {/* Pressure wave ellipses */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {[42, 84, 126, 170, 215].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: `${s}px`, height: `${s * 0.47}px`, borderRadius: "50%", border: `1px solid hsla(177,70%,55%,${isHovered ? 0.3 - i * 0.05 : 0.14 - i * 0.024})`, transition: "border-color 0.45s" }} />
        ))}
      </div>
      {/* Center glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "150px", height: "150px", borderRadius: "50%", background: "radial-gradient(circle, hsla(177,70%,55%,0.2) 0%, transparent 65%)", opacity: isHovered ? 1 : 0.6, transition: "opacity 0.45s" }} />
      {/* Bubbles */}
      {[[22, 72, 3], [38, 57, 2.2], [62, 78, 2.8], [76, 54, 2], [14, 50, 1.8], [52, 68, 1.5], [83, 66, 2.3]].map(([l, t, s], i) => (
        <div key={i} style={{ position: "absolute", left: `${l}%`, top: `${t}%`, width: `${s * 2}px`, height: `${s * 2}px`, borderRadius: "50%", background: "hsla(177,70%,65%,0.32)", boxShadow: `0 0 ${s * 5}px hsla(177,70%,55%,0.45)`, opacity: isHovered ? 0.95 : 0.32, transition: "opacity 0.45s" }} />
      ))}
      {/* 2.0 ATA anchor */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px" }}>
        <div style={{ fontSize: "44px", fontWeight: 900, lineHeight: 1, background: "linear-gradient(135deg, hsl(177,70%,63%), hsl(210,70%,68%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          2.0 ATA
        </div>
        <div style={{ fontSize: "9px", color: "hsl(0,0%,40%)", fontWeight: 600, letterSpacing: "0.17em", textTransform: "uppercase" }}>Research-grade pressure</div>
      </div>
    </div>
  );
}

// ── Card definitions ───────────────────────────────────────────────────────────

const CARDS = [
  {
    id: "dpc",
    formType: "dpc" as FormType,
    href: "/direct-primary-care",
    external: false,
    badge: "Now Enrolling",
    name: "Direct Primary Care",
    tagline: "Unlimited visits. No copays. No surprises.",
    pills: ["Primary Care", "Telehealth", "Labs at Cost", "IV Therapy"],
    ctaLabel: "Explore DPC",
    formCta: "Ask a Question",
    gradient: "linear-gradient(135deg, hsl(45,90%,60%), hsl(22,90%,55%))",
    topBar: "linear-gradient(90deg, hsl(48,96%,60%), hsl(28,92%,56%), hsl(15,88%,53%))",
    accentColor: "hsl(45,96%,67%)",
    borderResting: "hsla(210,22%,22%,0.7)",
    borderHover: "hsla(28,90%,58%,0.4)",
    glowHover: "0 0 0 1px hsla(28,90%,55%,0.22), 0 20px 60px hsla(28,85%,40%,0.3), 0 0 100px hsla(15,80%,30%,0.14)",
    badgeStyle: { background: "linear-gradient(135deg, hsl(45,90%,55%), hsl(22,90%,52%))", color: "hsl(210,32%,10%)" } as React.CSSProperties,
    pillStyle: { background: "hsla(35,80%,55%,0.11)", border: "1px solid hsla(35,80%,55%,0.22)", color: "hsl(40,90%,74%)" } as React.CSSProperties,
    ctaStyle: { background: "linear-gradient(135deg, hsl(45,90%,60%), hsl(22,90%,55%))", color: "hsl(210,32%,12%)" } as React.CSSProperties,
    ctaSecondaryStyle: { border: "1px solid hsla(35,90%,60%,0.35)", color: "hsl(45,96%,67%)" } as React.CSSProperties,
    formBtnStyle: { background: "linear-gradient(135deg, hsl(45,90%,58%), hsl(22,90%,53%))", color: "hsl(210,32%,12%)" } as React.CSSProperties,
    dividerColor: "hsla(28,80%,52%,0.2)",
  },
  {
    id: "hormone",
    formType: "hormone" as FormType,
    href: "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266",
    external: true,
    badge: "Coming Soon",
    name: "Hormone + GLP Clinic",
    tagline: "Perimenopause, menopause, HRT, and GLP-1 weight loss — all in one practice.",
    pills: ["HRT", "GLP-1 / Semaglutide", "Menopause", "Weight Loss"],
    ctaLabel: "Book a Consult",
    formCta: "Ask a Question",
    gradient: "linear-gradient(135deg, hsl(340,100%,70%), hsl(281,86%,65%), hsl(189,100%,68%))",
    topBar: "linear-gradient(90deg, hsl(340,100%,65%), hsl(281,86%,60%), hsl(189,100%,65%))",
    accentColor: "hsl(340,100%,80%)",
    borderResting: "hsla(210,22%,22%,0.7)",
    borderHover: "hsla(340,90%,65%,0.38)",
    glowHover: "0 0 0 1px hsla(340,90%,65%,0.2), 0 20px 60px hsla(320,70%,38%,0.28), 0 0 100px hsla(281,70%,28%,0.14)",
    badgeStyle: { background: "linear-gradient(135deg, hsl(340,100%,58%), hsl(281,86%,53%))", color: "hsl(0,0%,100%)" } as React.CSSProperties,
    pillStyle: { background: "hsla(340,80%,65%,0.1)", border: "1px solid hsla(340,80%,65%,0.22)", color: "hsl(340,100%,82%)" } as React.CSSProperties,
    ctaStyle: { background: "linear-gradient(135deg, hsl(340,100%,62%), hsl(281,86%,57%))", color: "hsl(0,0%,100%)" } as React.CSSProperties,
    ctaSecondaryStyle: { border: "1px solid hsla(340,90%,65%,0.35)", color: "hsl(340,100%,80%)" } as React.CSSProperties,
    formBtnStyle: { background: "linear-gradient(135deg, hsl(340,100%,60%), hsl(281,86%,55%))", color: "hsl(0,0%,100%)" } as React.CSSProperties,
    dividerColor: "hsla(340,70%,55%,0.2)",
  },
  {
    id: "hbot",
    formType: "hbot" as FormType,
    href: "https://hbotwebsite.vercel.app",
    external: true,
    badge: "Opening Summer 2026",
    name: "Hyperbaric Oxygen Clinic",
    tagline: "Colorado Springs' only 2.0 ATA chamber. The pressure clinical research was actually done at.",
    pills: ["2.0 ATA", "Brain Recovery", "Sports Recovery", "Wound Healing"],
    ctaLabel: "Visit Clinic Site",
    formCta: "Register — Get 25% Off",
    gradient: "linear-gradient(135deg, hsl(177,70%,59%), hsl(210,70%,60%))",
    topBar: "linear-gradient(90deg, hsl(177,70%,59%), hsl(210,70%,60%))",
    accentColor: "hsl(177,70%,67%)",
    borderResting: "hsla(210,22%,22%,0.7)",
    borderHover: "hsla(177,70%,59%,0.38)",
    glowHover: "0 0 0 1px hsla(177,70%,55%,0.22), 0 20px 60px hsla(177,70%,33%,0.28), 0 0 100px hsla(210,65%,28%,0.14)",
    badgeStyle: { background: "linear-gradient(135deg, hsl(177,70%,48%), hsl(210,70%,50%))", color: "hsl(210,32%,10%)" } as React.CSSProperties,
    pillStyle: { background: "hsla(177,70%,55%,0.1)", border: "1px solid hsla(177,70%,55%,0.22)", color: "hsl(177,70%,72%)" } as React.CSSProperties,
    ctaStyle: { background: "linear-gradient(135deg, hsl(177,70%,53%), hsl(210,70%,55%))", color: "hsl(210,32%,12%)" } as React.CSSProperties,
    ctaSecondaryStyle: { border: "1px solid hsla(177,70%,55%,0.35)", color: "hsl(177,70%,67%)" } as React.CSSProperties,
    formBtnStyle: { background: "linear-gradient(135deg, hsl(177,70%,51%), hsl(210,70%,53%))", color: "hsl(210,32%,12%)" } as React.CSSProperties,
    dividerColor: "hsla(177,70%,50%,0.2)",
  },
];

// ── Main component ─────────────────────────────────────────────────────────────

export default function ClinicCards() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({});

  const handleChange = (id: string, field: string, value: string) =>
    setFormData(prev => ({ ...prev, [id]: { ...(prev[id] || {}), [field]: value } }));

  const handleSubmit = async (e: React.FormEvent, id: string, formType: FormType) => {
    e.preventDefault();
    e.stopPropagation();
    setSubmitting(prev => ({ ...prev, [id]: true }));
    const d = formData[id] || {};
    try {
      if (formType === "dpc") {
        const parts = (d.name || "").trim().split(" ");
        await submitDpcInquiry({ firstName: parts[0] || "", lastName: parts.slice(1).join(" ") || "", email: d.email || "", phone: "", responseType: "Email", notes: d.question || "Homepage inquiry", sourcePage: "/" });
      } else if (formType === "hbot") {
        await submitHbotEarlyAccess({ firstName: d.firstName || "", lastName: d.lastName || "", email: d.email || "" });
      } else {
        const parts = (d.name || "").trim().split(" ");
        await submitHormoneInquiry({ firstName: parts[0] || "", lastName: parts.slice(1).join(" ") || "", email: d.email || "", question: d.question || "Hormone clinic inquiry", sourcePage: "/" });
      }
    } catch { /* non-blocking */ }
    setSubmitting(prev => ({ ...prev, [id]: false }));
    setSubmitted(prev => ({ ...prev, [id]: true }));
    setTimeout(() => { setSubmitted(prev => ({ ...prev, [id]: false })); setOpenForm(null); }, 3500);
  };

  const navigateTo = (card: typeof CARDS[0]) => {
    if (card.external) window.open(card.href, "_blank", "noopener,noreferrer");
    else router.push(card.href);
  };

  const [dpc, hormone, hbot] = CARDS;

  return (
    // Bento grid: DPC takes full left column (2 rows), Hormone + HBOT stack on right
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5" style={{ gridTemplateRows: "auto" }}>

      {/* ── DPC — tall portrait ────────────────────────────────────────────── */}
      {(() => {
        const card = dpc;
        const isHovered = hoveredCard === card.id;
        const isFormOpen = openForm === card.id;
        const isSubmitted = submitted[card.id];
        const isSubmitting = submitting[card.id];
        return (
          <div
            key={card.id}
            className="relative rounded-2xl overflow-hidden flex flex-col md:row-span-2"
            style={{
              minHeight: "600px",
              cursor: "pointer",
              background: "hsla(210,22%,10%,0.99)",
              border: `1px solid ${isHovered ? card.borderHover : card.borderResting}`,
              boxShadow: isHovered ? card.glowHover : "none",
              transform: isHovered ? "translateY(-5px)" : "translateY(0)",
              transition: "border-color 0.32s ease, box-shadow 0.32s ease, transform 0.38s cubic-bezier(0.34,1.15,0.64,1)",
              zIndex: isHovered ? 2 : 1,
            }}
            onClick={() => navigateTo(card)}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Top bar */}
            <div style={{ height: "3px", background: card.topBar, opacity: isHovered ? 1 : 0.5, transition: "opacity 0.32s", flexShrink: 0 }} />

            {/* Hero visual — top 52% */}
            <div className="relative" style={{ flex: "0 0 52%", minHeight: "280px" }}>
              <DpcHero isHovered={isHovered} />
            </div>

            {/* Thin divider */}
            <div style={{ height: "1px", background: card.dividerColor, flexShrink: 0 }} />

            {/* Info section */}
            <div className="flex flex-col flex-1 p-6 gap-4" onClick={e => e.stopPropagation()}>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2" style={card.badgeStyle}>{card.badge}</span>
                <h2 className="text-xl font-black" style={{ color: "hsl(0,0%,97%)" }}>{card.name}</h2>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: "hsl(210,20%,56%)" }}>{card.tagline}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {card.pills.map(p => (
                  <span key={p} className="px-2.5 py-1 rounded-full text-xs font-semibold" style={card.pillStyle}>{p}</span>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-auto">
                {isSubmitted ? (
                  <div className="flex items-center gap-2 py-2.5 px-4 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: card.accentColor }} />
                    <span className="text-xs font-semibold" style={{ color: card.accentColor }}>Got it — we&apos;ll be in touch!</span>
                  </div>
                ) : isFormOpen ? (
                  <form onSubmit={e => handleSubmit(e, card.id, card.formType)} className="flex flex-col gap-2">
                    {card.formType === "hbot" ? (
                      <div className="flex gap-2">
                        <input type="text" placeholder="First name" required autoFocus value={formData[card.id]?.firstName || ""} onChange={e => handleChange(card.id, "firstName", e.target.value)} className="flex-1 min-w-0 px-3 py-2 rounded-lg text-sm bg-white/[0.06] border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30" />
                        <input type="text" placeholder="Last name" required value={formData[card.id]?.lastName || ""} onChange={e => handleChange(card.id, "lastName", e.target.value)} className="flex-1 min-w-0 px-3 py-2 rounded-lg text-sm bg-white/[0.06] border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30" />
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input type="text" placeholder="Your name" required autoFocus value={formData[card.id]?.name || ""} onChange={e => handleChange(card.id, "name", e.target.value)} className="flex-1 min-w-0 px-3 py-2 rounded-lg text-sm bg-white/[0.06] border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30" />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input type="email" placeholder="Email" required value={formData[card.id]?.email || ""} onChange={e => handleChange(card.id, "email", e.target.value)} className="flex-1 min-w-0 px-3 py-2 rounded-lg text-sm bg-white/[0.06] border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30" />
                    </div>
                    <textarea placeholder="Your question (optional)..." rows={2} value={formData[card.id]?.question || ""} onChange={e => handleChange(card.id, "question", e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm bg-white/[0.06] border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none" />
                    {card.formType === "hbot" && <p className="text-[10px]" style={{ color: "hsl(210,20%,50%)" }}>No commitment required.</p>}
                    <div className="flex gap-2">
                      <button type="submit" disabled={isSubmitting} className="flex-1 py-2.5 rounded-xl text-sm font-bold disabled:opacity-60" style={card.formBtnStyle}>{isSubmitting ? "Sending…" : "Submit"}</button>
                      <button type="button" onClick={() => setOpenForm(null)} className="px-3 py-2.5 rounded-xl text-sm border border-white/20 hover:bg-white/10" style={{ color: "hsl(0,0%,52%)" }}>✕</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <a href={card.href} onClick={e => e.stopPropagation()} className="w-full px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={card.ctaStyle}>
                      {card.ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <button onClick={e => { e.stopPropagation(); setOpenForm(card.id); }} className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/[0.06] transition-colors text-left" style={card.ctaSecondaryStyle}>
                      {card.formCta} →
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Hormone + HBOT — landscape cards stacked on right ─────────────── */}
      {[hormone, hbot].map((card) => {
        const isHovered = hoveredCard === card.id;
        const isFormOpen = openForm === card.id;
        const isSubmitted = submitted[card.id];
        const isSubmitting = submitting[card.id];

        return (
          <div
            key={card.id}
            className="relative rounded-2xl overflow-hidden flex flex-col sm:flex-row"
            style={{
              minHeight: "295px",
              cursor: "pointer",
              background: "hsla(210,22%,10%,0.99)",
              border: `1px solid ${isHovered ? card.borderHover : card.borderResting}`,
              boxShadow: isHovered ? card.glowHover : "none",
              transform: isHovered ? "translateY(-5px)" : "translateY(0)",
              transition: "border-color 0.32s ease, box-shadow 0.32s ease, transform 0.38s cubic-bezier(0.34,1.15,0.64,1)",
              zIndex: isHovered ? 2 : 1,
            }}
            onClick={() => navigateTo(card)}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Top bar (mobile only — hidden on sm+ since left bar takes over) */}
            <div className="sm:hidden" style={{ height: "3px", background: card.topBar, opacity: isHovered ? 1 : 0.5, transition: "opacity 0.32s", flexShrink: 0 }} />

            {/* Hero visual — left on desktop, top on mobile */}
            <div className="relative w-full h-44 sm:h-auto sm:w-5/12 flex-shrink-0">
              {/* Left bar on desktop */}
              <div className="hidden sm:block absolute top-0 left-0 bottom-0" style={{ width: "3px", background: card.topBar, opacity: isHovered ? 1 : 0.5, transition: "opacity 0.32s", zIndex: 20 }} />
              {card.id === "hormone" ? <HormoneHero isHovered={isHovered} /> : <HbotHero isHovered={isHovered} />}
            </div>

            {/* Vertical divider */}
            <div className="hidden sm:block w-px flex-shrink-0" style={{ background: `${card.dividerColor}` }} />
            {/* Horizontal divider (mobile) */}
            <div className="sm:hidden h-px flex-shrink-0" style={{ background: card.dividerColor }} />

            {/* Info section */}
            <div className="flex flex-col flex-1 p-4 gap-3" onClick={e => e.stopPropagation()}>
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5" style={card.badgeStyle}>{card.badge}</span>
                <h2 className="text-sm font-black leading-tight" style={{ color: "hsl(0,0%,97%)" }}>{card.name}</h2>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "hsl(210,20%,50%)" }}>{card.tagline}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {card.pills.slice(0, 3).map(p => (
                  <span key={p} className="px-2 py-0.5 rounded-full text-xs font-medium" style={card.pillStyle}>{p}</span>
                ))}
              </div>

              <div className="flex flex-col gap-1.5 mt-auto">
                {isSubmitted ? (
                  <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: card.accentColor }} />
                    <span className="text-xs font-semibold" style={{ color: card.accentColor }}>We&apos;ll be in touch!</span>
                  </div>
                ) : isFormOpen ? (
                  <form onSubmit={e => handleSubmit(e, card.id, card.formType)} className="flex flex-col gap-1.5">
                    {card.formType === "hbot" ? (
                      <div className="flex gap-1.5">
                        <input type="text" placeholder="First name" required autoFocus value={formData[card.id]?.firstName || ""} onChange={e => handleChange(card.id, "firstName", e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white/[0.06] border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30" />
                        <input type="text" placeholder="Last name" required value={formData[card.id]?.lastName || ""} onChange={e => handleChange(card.id, "lastName", e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white/[0.06] border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30" />
                      </div>
                    ) : (
                      <input type="text" placeholder="Your name" required autoFocus value={formData[card.id]?.name || ""} onChange={e => handleChange(card.id, "name", e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white/[0.06] border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30" />
                    )}
                    <input type="email" placeholder="Email address" required value={formData[card.id]?.email || ""} onChange={e => handleChange(card.id, "email", e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white/[0.06] border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30" />
                    {card.formType === "hormone" && (
                      <textarea placeholder="Your question (optional)..." rows={2} value={formData[card.id]?.question || ""} onChange={e => handleChange(card.id, "question", e.target.value)} className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-white/[0.06] border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none" />
                    )}
                    {card.formType === "hbot" && <p className="text-[10px]" style={{ color: "hsl(210,20%,50%)" }}>No commitment required.</p>}
                    <div className="flex gap-1.5">
                      <button type="submit" disabled={isSubmitting} className="flex-1 py-1.5 rounded-lg text-xs font-bold disabled:opacity-60" style={card.formBtnStyle}>{isSubmitting ? "Sending…" : "Submit"}</button>
                      <button type="button" onClick={() => setOpenForm(null)} className="px-2.5 py-1.5 rounded-lg text-xs border border-white/20 hover:bg-white/10" style={{ color: "hsl(0,0%,52%)" }}>✕</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <a href={card.href} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="w-full px-3 py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity" style={card.ctaStyle}>
                      {card.ctaLabel} <ExternalLink className="w-3 h-3" />
                    </a>
                    <button onClick={e => { e.stopPropagation(); setOpenForm(card.id); }} className="w-full px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-white/[0.06] transition-colors text-left" style={card.ctaSecondaryStyle}>
                      {card.formCta} →
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
