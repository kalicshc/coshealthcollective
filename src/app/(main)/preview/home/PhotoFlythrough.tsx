"use client";

/**
 * Aurora photographic flythrough homepage — DRAFT preview only.
 *
 * A cinematic journey through northern-lights mountain valleys, one per clinic,
 * plus a Reviews scene, Our Story scene, and a closing "Our Journey" finale.
 * Each aurora is tinted to that clinic's wave color and carries a SUBTLE,
 * slowly-drifting synthetic aurora glow over the sky. Content reveals immersed
 * and alternates left / right / center, clearing the left nav rail on desktop.
 * Reviews + Our Story are MANUAL arrow carousels. Every word + photo is pulled
 * from the live site — nothing invented.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clinicFacts } from "@/lib/clinicFacts";

const MEET_GREET_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";
const HORMONE_CONSULT_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266";

type Side = "left" | "right" | "center";
type Scene = {
  type: "clinic" | "reviews" | "story" | "vision";
  side: Side; tint: string;
  status?: string; name?: string; tagline?: string; services?: string[];
  cta?: string; href?: string; external?: boolean; cta2?: string; href2?: string;
};

// Wave colors (ClinicSpectrum): DPC royal blue, Hormone violet, Hyperbaric teal; gold for the close.
const SCENES: Scene[] = [
  { type: "clinic", side: "left", tint: "60,120,255",
    status: "Now Enrolling", name: "Direct Primary Care", tagline: "$100/month. A provider who actually knows you.",
    services: ["Unlimited visits", "Same / next-day care", "No surprise bills", "Labs at cost"],
    cta: "Book a Free Meet & Greet", href: MEET_GREET_URL, external: true, cta2: "Learn more", href2: "/direct-primary-care" },
  { type: "clinic", side: "right", tint: "210,80,250",
    status: "Now Open", name: "Hormone & Metabolic Clinic", tagline: "Hormone care that addresses the whole picture.",
    services: ["Perimenopause + menopause", "Men's health & TRT", "GLP-1 weight loss", "Personalized plans"],
    cta: "Book a Free Consult", href: HORMONE_CONSULT_URL, external: true, cta2: "Learn more", href2: "/hormone" },
  { type: "clinic", side: "left", tint: "20,225,235",
    status: "Opening Summer 2026", name: "Hyperbaric Oxygen", tagline: "2.0 ATA oxygen therapy is coming.",
    services: ["Fibromyalgia", "UC + Crohn's", "Long COVID", "Sports recovery"],
    cta: "Join the Waitlist", href: "/hyperbaric", cta2: "Learn more", href2: "/hyperbaric" },
  { type: "story", side: "center", tint: "52,210,200" },
  { type: "reviews", side: "center", tint: "245,196,86" },
  { type: "vision", side: "center", tint: "245,196,86" },
];

const DEFAULT_IMAGES = ["/preview/scene1.png", "/preview/scene2.png", "/preview/scene3.png", "/preview/scene4.png", "/preview/scene5.png", "/preview/scene5.png"];

const REVIEWS: { quote: string; name: string }[] = [
  { quote: "We had such a great experience with Logan! Our toddler woke up in the middle of a Saturday night with croup. Logan came to our living room, conducted an exam, and got him rolling on meds quickly. Everything you hope for from a medical provider.", name: "Samuel S." },
  { quote: "When my daughter was sick, their concierge team came directly to our home and took such amazing care of her. They were prompt, professional, and incredibly thorough. They didn't rush, they explained everything, and they followed up afterward.", name: "Sheena S." },
  { quote: "Such a great primary care experience! Providers that truly take the time to ask in-depth questions and seem compassionate and invested. I never feel rushed, and I always leave feeling confident about my care plan. Highly recommend!", name: "Jozlyn G." },
  { quote: "Logan took his time, dove into my issue, ordered relevant labs, reviewed my medical history, nutrition, lifestyle, and goals, and built a treatment plan that has already given me positive results. Highly recommend!", name: "Michael R." },
  { quote: "The care feels genuinely personal, with unrushed visits, thoughtful follow-ups, and quick, easy communication. Logan truly listened and showed real professionalism. I always feel cared for like a human, not a time slot.", name: "Carley H." },
];

const STORY: { title: string; body: string; image: string }[] = [
  { title: "You're not a number here.", body: "We're a collective of providers building something different. Whether you're here for primary care, hormone optimization, or recovery — you're a whole human with strengths, stressors, habits, and goals. Our job is to help you move the needle.", image: "/images/story/01-who-we-are-opt.jpg" },
  { title: "We live for this.", body: "We mountain bike, hike, camp, and explore with Henry, Mila, our daughter, and each other. We care about the outdoors, wildlife, and building a life that stays strong as the years stack up.", image: "/images/story/02-colorado-life-opt.jpg" },
  { title: "For people who refuse to slow down.", body: "Our members want to age with strength, clarity, and energy. Parents who want more years for their kids. Athletes who want to recover smarter. Adults who know something feels off and want real answers — not dismissals.", image: "/images/story/03-best-fit-opt.jpg" },
  { title: "We got tired of rushed medicine.", body: "In the traditional model, the incentive is volume: more visits, less time. That means shorter conversations, slower access, and worse follow-through — while costs keep climbing.", image: "/images/story/04-rushed-medicine-opt.jpg" },
  { title: "The system fails people at every turn.", body: "Women dismissed during menopause — told their labs were 'normal' while their quality of life collapsed. Men written off when testosterone was 'in range' but off. Recovery tools locked behind hospital programs most people can't access or afford.", image: "/images/story/05-insurance-barriers-opt.jpg" },
  { title: "A collective built to fill the gaps.", body: "Direct primary care that puts your provider in your corner. Hormone optimization for the patients who've been dismissed. And hyperbaric oxygen therapy at 2.0 ATA, because no one else was bringing it here at a price people can actually access.", image: "/images/story/06-why-dpc-opt.jpg" },
  { title: "We're building the campus.", body: "We left careers in emergency medicine and hospital systems because we saw what's possible when care is built for people — not billing cycles. We started with direct primary care, and we're working toward a full health campus where all of it lives under one roof.", image: "/images/story/07-the-leap-opt.jpg" },
];

const NAV_LABELS = ["Welcome", "Direct Primary Care", "Hormone & Metabolic", "Hyperbaric", "Our Story", "Reviews", "Our Journey"];

const clamp = (n: number, lo = 0, hi = 1) => (n < lo ? lo : n > hi ? hi : n);
const smooth = (x: number) => { const t = clamp(x); return t * t * (3 - 2 * t); };
const N = SCENES.length;

// 3D extruded drop-shadow per letter — darkens right behind each glyph for
// readability (so we don't have to darken the whole photo) and reads as 3D.
const T3D = "0 1px 0 rgba(0,0,0,0.55), 0 2px 0 rgba(0,0,0,0.5), 0 3px 1px rgba(0,0,0,0.45), 0 5px 12px rgba(0,0,0,0.8), 0 2px 26px rgba(0,0,0,0.65)";
// Lighter version for supporting text.
const TSOFT = "0 1px 0 rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.85), 0 1px 18px rgba(0,0,0,0.7)";

function ArrowBtn({ dir, onClick, tint }: { dir: "l" | "r"; onClick: () => void; tint: string }) {
  return (
    <button onClick={onClick} aria-label={dir === "l" ? "Previous" : "Next"}
      style={{ pointerEvents: "auto", width: 46, height: 46, borderRadius: 999, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        background: "hsla(214,40%,8%,0.4)", border: `1px solid rgba(${tint},0.5)`, color: `rgb(${tint})`,
        backdropFilter: "blur(6px)", transition: "background .25s, transform .25s" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = `rgba(${tint},0.22)`; e.currentTarget.style.transform = "scale(1.08)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "hsla(214,40%,8%,0.4)"; e.currentTarget.style.transform = "scale(1)"; }}>
      {dir === "l" ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
    </button>
  );
}

function Dots({ count, idx, tint, onPick }: { count: number; idx: number; tint: string; onPick: (k: number) => void }) {
  return (
    <div style={{ display: "flex", gap: 7, marginTop: 16, justifyContent: "center" }}>
      {Array.from({ length: count }).map((_, k) => (
        <button key={k} aria-label={`Go to ${k + 1}`} onClick={() => onPick(k)}
          style={{ pointerEvents: "auto", cursor: "pointer", border: "none", padding: 0, width: idx === k ? 24 : 8, height: 8, borderRadius: 999,
            background: idx === k ? `rgb(${tint})` : "rgba(255,255,255,0.32)", transition: "all .4s ease" }} />
      ))}
    </div>
  );
}

function ReviewCarousel({ tint }: { tint: string }) {
  const [i, setI] = useState(0);
  const r = REVIEWS[i];
  return (
    <div className="cz-wrap" style={{ marginBottom: 26, width: "100%" }}>
      <div style={{ color: `rgb(${tint})`, fontSize: 17, letterSpacing: 3, marginBottom: 16, textAlign: "center" }}>★★★★★</div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, justifyContent: "center" }}>
        <ArrowBtn dir="l" tint={tint} onClick={() => setI((p) => (p - 1 + REVIEWS.length) % REVIEWS.length)} />
        <p className="rev-quote" style={{ flex: 1, maxWidth: 620, minHeight: 132, fontSize: "clamp(1.05rem,1.5vw,1.35rem)", lineHeight: 1.5, color: "#fff", fontStyle: "italic", textAlign: "center", textShadow: "0 2px 16px rgba(0,0,0,0.85)" }}>“{r.quote}”</p>
        <ArrowBtn dir="r" tint={tint} onClick={() => setI((p) => (p + 1) % REVIEWS.length)} />
      </div>
      <p style={{ marginTop: 14, fontSize: 13, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: `rgb(${tint})`, textAlign: "center" }}>— {r.name}</p>
      <Dots count={REVIEWS.length} idx={i} tint={tint} onPick={setI} />
    </div>
  );
}

function StoryCarousel({ tint }: { tint: string }) {
  const [i, setI] = useState(0);
  const s = STORY[i];
  return (
    <div className="cz-wrap" style={{ marginBottom: 26, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, justifyContent: "center" }}>
        <ArrowBtn dir="l" tint={tint} onClick={() => setI((p) => (p - 1 + STORY.length) % STORY.length)} />
        <div style={{ display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap", justifyContent: "center", maxWidth: 860 }}>
          {/* whole photo visible (no crop) */}
          <div className="stry-photo" style={{ width: "min(400px,78vw)", borderRadius: 18, overflow: "hidden", flexShrink: 0,
            border: `1px solid rgba(${tint},0.5)`, boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 50px rgba(${tint},0.22)` }}>
            <img src={s.image} alt={s.title} style={{ display: "block", width: "100%", height: "auto", objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1, minWidth: 250, maxWidth: 380, textAlign: "left" }}>
            <p style={{ fontSize: "clamp(1.3rem,2vw,1.7rem)", fontWeight: 800, color: "#fff", marginBottom: 12, lineHeight: 1.1, textShadow: "0 2px 16px rgba(0,0,0,0.85)" }}>{s.title}</p>
            <p style={{ fontSize: "clamp(0.96rem,1.3vw,1.1rem)", lineHeight: 1.55, color: "rgba(255,255,255,0.9)", textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}>{s.body}</p>
          </div>
        </div>
        <ArrowBtn dir="r" tint={tint} onClick={() => setI((p) => (p + 1) % STORY.length)} />
      </div>
      <Dots count={STORY.length} idx={i} tint={tint} onPick={setI} />
    </div>
  );
}

function LeftNav({ active, onJump }: { active: number; onJump: (k: number) => void }) {
  return (
    <div className="hidden lg:flex" style={{ position: "fixed", left: 22, top: "50%", transform: "translateY(-50%)", zIndex: 55, flexDirection: "column", gap: 16, pointerEvents: "auto" }}>
      {NAV_LABELS.map((label, k) => {
        const on = active === k;
        return (
          <button key={k} onClick={() => onJump(k)} style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <span style={{ height: 2, width: on ? 34 : 16, background: on ? "hsl(177,70%,62%)" : "rgba(255,255,255,0.4)", boxShadow: on ? "0 0 10px hsla(177,70%,59%,0.8)" : "none", transition: "all .4s ease" }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", whiteSpace: "nowrap", color: on ? "#fff" : "rgba(255,255,255,0.45)", textShadow: "0 1px 8px rgba(0,0,0,0.8)", transition: "color .4s ease" }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Continuous aurora COLOR journey — one hue flow over the whole scroll. Each
// keyframe is 3 gradient stops (so "mixes" like teal+blue / teal+purple appear).
const _T = "45,212,210", _B = "70,130,255", _P = "175,70,255", _G = "60,205,130", _M = "230,80,210";
// Each scene's aurora color (3 gradient stops). The tint lives INSIDE each scene,
// so when the photos crossfade the colors crossfade WITH them — perfectly synced:
// each scene is max its own color at its center, and only blends toward a neighbor
// during that photo's crossfade (so purple is only at the very start of Hyperbaric).
const SCENE_AURORA: ([string, string, string] | null)[] = [
  [_T, _B, _B],   // DPC — teal flowing into blue (also animated, see D0 below)
  [_M, _P, _P],   // Hormone — purple / magenta
  [_T, _B, _T],   // Hyperbaric — teal
  [_G, _T, _B],   // Our Story — green / teal / blue
  [_T, _B, _P],   // Reviews — brand spectrum: teal → blue → violet
  null,           // Our Journey — sunrise (no tint)
];
// DPC (scene 0) sits under BOTH the hero and the DPC content, so its aurora is
// animated: full teal on the hero, shifting to blue as you scroll into DPC. The
// stops read live CSS vars (set per frame in apply()); defaults are teal so the
// hero starts teal before the first frame runs.
const D0_STOPS: [string, string, string] = ["var(--d0a, 45,212,210)", "var(--d0b, 45,212,210)", "var(--d0c, 45,212,210)"];
function mixRGB(a: string, b: string, k: number): string {
  const A = a.split(",").map(Number), B = b.split(",").map(Number);
  return A.map((v, i) => Math.round(v + (B[i] - v) * k)).join(",");
}

// Aurora tint layer — recolors ONLY the aurora ribbons (clipped by the mask) to
// the current scroll color. `mix-blend: color` keeps the aurora's own luminance,
// so it flows through hues cleanly; the sky / mountains / snow are untouched.
function AuroraTint({ mask, stops }: { mask?: string; stops?: [string, string, string] | null }) {
  if (!mask || !stops) return null;
  const grad = `linear-gradient(90deg, rgb(${stops[0]}) 0%, rgb(${stops[1]}) 50%, rgb(${stops[2]}) 100%)`;
  const maskCSS: React.CSSProperties = {
    position: "absolute", inset: 0, pointerEvents: "none", background: grad,
    WebkitMaskImage: `url('${mask}')`, maskImage: `url('${mask}')`,
    WebkitMaskSize: "cover", maskSize: "cover",
    WebkitMaskPosition: "center 42%", maskPosition: "center 42%",
    WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
  };
  return (
    <>
      {/* recolor the aurora's hue (keeps its luminance) */}
      <div className="pv-tint" aria-hidden style={{ ...maskCSS, mixBlendMode: "color" }} />
      {/* faint glow in-hue for pop, kept low so bright ribbons don't wash out */}
      <div className="pv-tint" aria-hidden style={{ ...maskCSS, mixBlendMode: "screen", opacity: 0.28 }} />
    </>
  );
}

export default function PhotoFlythrough({ images, masks }: { images?: string[]; masks?: string[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [navIdx, setNavIdx] = useState(0);
  const activeRef = useRef(-1);
  const navRef = useRef(0);
  // Section geometry, measured once on mount/resize so the per-frame scroll handler
  // can derive `t` from window.scrollY alone — no getBoundingClientRect (layout read)
  // every frame.
  const metricsRef = useRef({ top: 0, travel: 1 });

  function jumpTo(k: number) {
    const sec = sectionRef.current;
    if (!sec) return;
    const docTop = sec.getBoundingClientRect().top + window.scrollY;
    const travel = sec.offsetHeight - window.innerHeight;
    const targetT = k === 0 ? 0.001 : (k - 1 + 0.5) / N;
    window.scrollTo({ top: docTop + targetT * travel, behavior: "smooth" });
  }

  useEffect(() => {
    let ticking = false;
    function measure() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      metricsRef.current = { top: rect.top + window.scrollY, travel: rect.height - window.innerHeight };
    }
    function apply() {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const { top, travel } = metricsRef.current;
      const t = travel > 0 ? clamp((window.scrollY - top) / travel) : 0;
      const seg = 1 / N;
      let nextActive = -1;
      for (let i = 0; i < N; i++) {
        const start = i * seg, end = (i + 1) * seg;
        const local = clamp((t - start) / seg);
        const scene = sceneRefs.current[i];
        if (scene) {
          const fade = seg * 0.42; // long cross-scene fade — aurora colors blend into each other
          const op = clamp(Math.min(smooth((t - (start - fade)) / fade), smooth(((end + fade) - t) / fade)));
          scene.style.opacity = String(op);
          scene.style.transform = `scale(${(1.05 + 0.34 * local).toFixed(4)})`;
          scene.style.visibility = op <= 0.01 ? "hidden" : "visible";
          scene.style.zIndex = String(i);
        }
        const enter = i === 0 ? 0.28 : 0.04; // content pops a touch sooner into each scene
        if (t > start + enter * seg && t < end - 0.06 * seg) nextActive = i;
      }
      if (nextActive !== activeRef.current) { activeRef.current = nextActive; setActiveIdx(nextActive); }
      // Aurora color is per-scene (tint lives inside each scene div) so it crossfades
      // in lockstep with the photos. The one exception is DPC (scene 0): it shifts
      // from full teal on the hero to blue as you scroll into the DPC content.
      const s0 = sceneRefs.current[0];
      if (s0) {
        const local0 = clamp(t / seg);                 // 0 at the very top (hero) → 1 at end of DPC
        const k = smooth(clamp(local0 / 0.45));         // teal → blue across the first ~45% of DPC
        s0.style.setProperty("--d0a", _T);              // left edge stays teal
        s0.style.setProperty("--d0b", mixRGB(_T, _B, k));
        s0.style.setProperty("--d0c", mixRGB(_T, _B, k));
      }
      const nav = t < 0.03 ? 0 : Math.min(N - 1, Math.floor(t * N)) + 1;
      if (nav !== navRef.current) { navRef.current = nav; setNavIdx(nav); }
      if (heroRef.current) {
        const o = clamp(1 - t * 16);
        heroRef.current.style.opacity = String(o);
        heroRef.current.style.transform = `translateY(${t * -80}px) scale(${1 + t * 0.5})`;
        heroRef.current.style.visibility = o <= 0.01 ? "hidden" : "visible";
      }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }
    function onResize() { measure(); onScroll(); }
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    apply();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: `${N * 150}vh` }} className="relative">
      <style>{`
        .vc { opacity:0; transform: translateY(40px); transition: opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1);
          text-shadow: 0 1px 0 rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.85), 0 1px 18px rgba(0,0,0,0.7); }
        .vc[data-on="1"] { opacity:1; transform: translateY(0); }
        .vc .stg { opacity:0; transform: translateY(18px); transition: opacity .55s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1); }
        .vc[data-on="1"] .stg { opacity:1; transform: translateY(0); }
        .vc-cta { transition: gap .3s ease; } .vc-cta:hover { gap: 16px; }
        /* position + nav clearance (nav is hidden below lg, so no offset there) */
        .vc-left   { left: clamp(20px,6vw,40px); text-align:left; width:min(600px,86vw); }
        .vc-right  { right: clamp(20px,6vw,40px); text-align:left; width:min(600px,86vw); }
        @media (min-width:1024px){
          .vc-left   { left: 300px; }
        }
        /* ---- Mobile-first fit + readability pass ---- */
        @media (max-width:639px){
          /* heavy centered scenes (Story / Reviews / Journey): clear nav + iOS browser bar */
          .vc-centerwrap{ padding: 86px 16px calc(30px + env(safe-area-inset-bottom)) !important; }
          .vc-center h2{ font-size: clamp(1.55rem,7.2vw,2.05rem) !important; margin-bottom: 12px !important; }
          /* shrink Story photo so the whole scene fits one screen */
          .stry-photo{ width: min(230px,50vw) !important; }
          .stry-photo img{ max-height: 25dvh !important; width: auto !important; margin: 0 auto !important; }
          /* trim the reserved review-quote height + size */
          .rev-quote{ min-height: 80px !important; font-size: 1.02rem !important; line-height: 1.42 !important; }
          .cz-wrap{ margin-bottom: 12px !important; }
          /* darker bottom scrim so small white text stays readable over bright photos */
          .fly-scrim{ background: linear-gradient(to top, hsla(216,46%,4%,0.74) 0%, hsla(216,46%,5%,0.46) 28%, hsla(216,46%,6%,0.16) 52%, transparent 70%) !important; }
        }
      `}</style>

      <LeftNav active={navIdx} onJump={jumpTo} />

      <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: "hsl(220,32%,6%)", height: "100dvh" }}>
        {SCENES.map((s, i) => (
          <div key={i} ref={(el) => { sceneRefs.current[i] = el; }} className="absolute inset-0"
            style={{ backgroundImage: `url('${images?.[i] ?? DEFAULT_IMAGES[i]}')`, backgroundSize: "cover", backgroundPosition: "center 42%", opacity: 0, willChange: "transform, opacity" }} aria-hidden>
            {/* recolor ONLY the aurora ribbons to the current scroll color */}
            <AuroraTint mask={masks?.[i]} stops={i === 0 ? D0_STOPS : SCENE_AURORA[i]} />
          </div>
        ))}

        {/* Light grounding gradient only at the very bottom — the per-letter 3D
            shadows handle text readability, so the photo + aurora stay bright. */}
        {/* Subtle nighttime tint over the whole photo. The aurora is the brightest,
            most saturated element so it stays vivid; this just calms the bright
            snow/sky/mountains so the white text reads. Tune the last alpha (0–0.4). */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 38, background: "hsla(218,52%,7%,0.24)" }} aria-hidden />

        <div className="absolute inset-0 pointer-events-none fly-scrim" style={{ zIndex: 40,
          background: "linear-gradient(to top, hsla(216,45%,5%,0.5) 0%, hsla(216,45%,6%,0.18) 20%, transparent 42%)" }} aria-hidden />

        <div className="absolute inset-0" style={{ zIndex: 60, pointerEvents: "none" }}>
          {SCENES.map((s, i) => {
            const centered = s.side === "center";
            const on = activeIdx === i ? "1" : "0";
            // Per-letter 3D text shadows now handle readability — no dark backing pool.
            const halo = null;
            const content = s.type === "clinic" ? (
              <>
                <div className="stg" style={{ transitionDelay: "30ms", marginBottom: 16, display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-start" }}>
                  <span style={{ width: 34, height: 2, background: `rgb(${s.tint})`, display: "inline-block", boxShadow: `0 0 12px rgba(${s.tint},0.9)` }} />
                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: `rgb(${s.tint})` }}>{s.status}</span>
                </div>
                <h2 className="stg" style={{ transitionDelay: "100ms", color: "#fff", fontSize: "clamp(2.3rem,5.4vw,4.6rem)", fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.025em", marginBottom: 14, textShadow: `${T3D}, 0 0 28px rgba(${s.tint},0.4)` }}>{s.name}</h2>
                <p className="stg" style={{ transitionDelay: "170ms", color: "rgba(255,255,255,0.94)", fontSize: "clamp(1.05rem,1.6vw,1.4rem)", fontWeight: 600, marginBottom: 22, textShadow: TSOFT }}>{s.tagline}</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: 28, display: "flex", flexWrap: "wrap", gap: "10px 26px", justifyContent: "flex-start" }}>
                  {s.services!.map((b, j) => (
                    <li key={j} className="stg" style={{ transitionDelay: `${250 + j * 80}ms`, display: "flex", alignItems: "center", gap: 11, fontSize: "clamp(0.98rem,1.3vw,1.15rem)", color: "rgba(255,255,255,0.96)", textShadow: TSOFT }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, flexShrink: 0, background: `rgb(${s.tint})`, boxShadow: `0 0 12px rgba(${s.tint},0.95)` }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="stg" style={{ transitionDelay: "560ms", display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
                  <a href={s.href} {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="vc-cta no-underline" style={{ pointerEvents: "auto", display: "inline-flex", alignItems: "center", gap: 10, color: "#fff", fontSize: "1.05rem", fontWeight: 700, paddingBottom: 6, borderBottom: `2px solid rgb(${s.tint})` }}>
                    {s.cta}<span style={{ color: `rgb(${s.tint})`, fontSize: "1.2rem" }}>→</span>
                  </a>
                  {s.cta2 ? (
                    <a href={s.href2} className="vc-cta no-underline" style={{ pointerEvents: "auto", display: "inline-flex", alignItems: "center", gap: 10, color: "#fff", fontSize: "1.05rem", fontWeight: 700, paddingBottom: 6, borderBottom: `2px solid rgb(${s.tint})` }}>
                      {s.cta2}<span style={{ color: `rgb(${s.tint})`, fontSize: "1.2rem" }}>→</span>
                    </a>
                  ) : null}
                </div>
              </>
            ) : s.type === "vision" ? (
              <div style={{ maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
                <span className="stg" style={{ transitionDelay: "30ms", display: "inline-block", padding: "7px 18px", borderRadius: 999, fontSize: 12, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 22, background: "linear-gradient(135deg, hsl(45,94%,64%), hsl(30,92%,58%))", color: "hsl(28,45%,12%)" }}>Our Journey Forward</span>
                <h2 className="stg" style={{ transitionDelay: "110ms", color: "#fff", fontSize: "clamp(2.3rem,5.2vw,4.2rem)", fontWeight: 900, lineHeight: 1.04, letterSpacing: "-0.022em", marginBottom: 22, textShadow: T3D }}>
                  Building the future<br />
                  <span style={{ color: "#fff" }}>of wellness in Colorado Springs.</span>
                </h2>
                <p className="stg" style={{ transitionDelay: "200ms", fontSize: "clamp(1rem,1.4vw,1.18rem)", lineHeight: 1.6, color: "rgba(255,255,255,0.92)", marginBottom: 16, textShadow: "0 2px 16px rgba(0,0,0,0.8)" }}>
                  We started with direct primary care because the foundation of great health is a provider who actually knows you. Now we&apos;re building the rest — hormone optimization, GLP-1 therapy, and the only accessible 2.0 ATA hyperbaric chamber in Colorado Springs.
                </p>
                <p className="stg" style={{ transitionDelay: "280ms", fontSize: "clamp(0.95rem,1.2vw,1.05rem)", lineHeight: 1.6, color: "rgba(255,255,255,0.74)", marginBottom: 30, textShadow: "0 2px 14px rgba(0,0,0,0.8)" }}>
                  The goal is a full health campus where all of it lives under one roof. We&apos;re building toward that — one clinic at a time.
                </p>
                <a className="stg vc-cta no-underline" href={`tel:${clinicFacts.contact.phoneTel}`} style={{ transitionDelay: "360ms", pointerEvents: "auto", display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 26px", borderRadius: 14, fontWeight: 700, background: "linear-gradient(135deg, hsl(45,94%,60%), hsl(30,92%,56%))", color: "hsl(28,48%,12%)", boxShadow: "0 10px 30px hsla(38,82%,46%,0.45)" }}>
                  {clinicFacts.contact.phone}
                </a>
              </div>
            ) : (
              <>
                {s.type === "reviews" && (
                <div className="stg" style={{ transitionDelay: "30ms", marginBottom: 16, display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
                  <span style={{ width: 34, height: 2, background: `rgb(${s.tint})`, display: "inline-block", boxShadow: `0 0 12px rgba(${s.tint},0.9)` }} />
                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: `rgb(${s.tint})` }}>5.0 on Google</span>
                </div>
                )}
                <h2 className="stg" style={{ transitionDelay: "100ms", color: "#fff", fontSize: "clamp(2.1rem,4.6vw,3.8rem)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.022em", marginBottom: 26, textShadow: `${T3D}, 0 0 28px rgba(${s.tint},0.4)` }}>
                  {s.type === "reviews" ? "Loved by Colorado Springs." : "Our story."}
                </h2>
                <div className="stg" style={{ transitionDelay: "200ms" }}>
                  {s.type === "reviews" ? <ReviewCarousel tint={s.tint} /> : <StoryCarousel tint={s.tint} />}
                </div>
                {s.type === "reviews" && (
                <a href="https://share.google/A5V615VuXhaDQytso" target="_blank" rel="noopener noreferrer" className="stg vc-cta no-underline" style={{ transitionDelay: "560ms", pointerEvents: "auto", display: "inline-flex", alignItems: "center", gap: 10, color: "#fff", fontSize: "1.05rem", fontWeight: 700, paddingBottom: 6, borderBottom: `2px solid rgb(${s.tint})` }}>
                  Read all reviews<span style={{ color: `rgb(${s.tint})`, fontSize: "1.2rem" }}>→</span>
                </a>
                )}
              </>
            );
            if (centered) {
              return (
                <div key={"c" + i} className="absolute vc-centerwrap" style={{ inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "104px 40px 56px" }}>
                  <div data-on={on} className="vc vc-center" style={{ position: "relative", width: "min(840px,92vw)", textAlign: "center" }}>
                    {halo}{content}
                  </div>
                </div>
              );
            }
            return (
              <div key={"c" + i} data-on={on} className={`vc absolute ${s.side === "left" ? "vc-left" : "vc-right"}`} style={{ bottom: "calc(clamp(104px,20vh,168px) + env(safe-area-inset-bottom))" }}>
                {halo}{content}
              </div>
            );
          })}
        </div>

        {/* HERO — logo + brand name (main) + tagline (subheader) */}
        <div ref={heroRef} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none" style={{ zIndex: 70 }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 45% at 50% 46%, hsla(216,50%,4%,0.66) 0%, transparent 70%)" }} />
          <div className="relative">
            <Image src="/logo-main.png" alt="Colorado Springs Health Collective" width={120} height={120} priority className="w-20 h-20 lg:w-24 lg:h-24 object-contain mx-auto mb-6 drop-shadow-2xl" />
            <h1 className="font-black leading-[0.95] mb-2" style={{ color: "#fff", fontSize: "clamp(2.4rem,5.6vw,4.8rem)", letterSpacing: "-0.025em", textShadow: T3D }}>
              Colorado Springs
              <br />
              <span style={{ background: "linear-gradient(120deg,hsl(177,84%,74%),hsl(190,90%,72%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}>Health Collective</span>
            </h1>
            <p className="mt-5" style={{ color: "rgba(255,255,255,0.92)", fontSize: "clamp(1.05rem,2vw,1.6rem)", fontWeight: 500, letterSpacing: "0.01em", textShadow: "0 2px 18px rgba(0,0,0,0.95)" }}>This is what modern healthcare looks like.</p>
            <span className="block text-[11px] uppercase tracking-[0.3em] mt-9" style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 2px 12px rgba(0,0,0,0.95)" }}>Scroll to begin the journey ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
