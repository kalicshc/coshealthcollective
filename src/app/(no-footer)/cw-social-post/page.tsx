import { Inter } from "next/font/google";

/**
 * "The Critical Window" — IG carousel for the July 24 talk (4 slides, 1080×1080).
 * 540×540 CSS px artboard → exported at deviceScaleFactor 2 via export-print.mjs.
 *
 *   /cw-social-post?s=1   HOOK — aurora sky, scroll-stopper + date/venue
 *   /cw-social-post?s=2   STAKES — why this decade matters (3 facts)
 *   /cw-social-post?s=3   VALUE — what you'll walk away with + who it's for
 *   /cw-social-post?s=4   CTA — full logistics, golden valley, Onward credit
 *
 * Design language is the deck's: light frosted glass, deep-ink type, deep-teal
 * accent (slide 4 swaps to warm burnt-umber). Backgrounds from
 * scripts/gen-social-cw.mjs (slides 2–3 reuse the aurora, dimmed in CSS).
 * Draft — pending Onward PT sign-off and the real RSVP link.
 * Event: Fri July 24 2026 · 5:30 PM · The Lincoln Center, 2727 N Cascade Ave
 * Ste 170, Colorado Springs 80907. Confirmed by Logan 2026-07-11.
 */

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Deck palette (CriticalWindowDeck.tsx)
const INK = "#1F2A2E";
const TEAL = "#2C5F5D";
const UMBER = "#6E2A12";
const GLASS = "rgba(250,247,242,0.62)";

const DATE_LINE = "Fri · July 24 · 5:30 pm";
const VENUE = "The Lincoln Center";
const ADDRESS = "2727 N Cascade Ave, Ste 170 · Colorado Springs";
const HANDLES = "@coshealthcollective · @cos.health.collec";

/** Onward PT partner credit — "In partnership with" label + their real logo
 *  (transparent white PNG cut from Logan's screenshot 2026-07-11, 400×130).
 *  Kept deliberately small: CSHC owns the frame, Onward is the partner. */
function OnwardMark({ height = 20 }: { height?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
      <span
        style={{
          color: "#fff",
          fontSize: 9,
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
        style={{
          height,
          width: "auto",
          objectFit: "contain",
          filter: "drop-shadow(0 1px 8px rgba(0,0,0,0.6))",
        }}
      />
    </span>
  );
}

export default async function CwSocialPost({
  searchParams,
}: {
  searchParams: Promise<{ s?: string }>;
}) {
  const { s } = await searchParams;
  const slide = ["1", "2", "3", "4"].includes(s ?? "") ? Number(s) : 1;
  const isCta = slide === 4;
  const ac = isCta ? UMBER : TEAL;
  const bg = isCta ? "/social/cw/post-b.webp" : "/social/cw/post-a.webp";
  const dimmed = slide === 2 || slide === 3;

  return (
    <div className={`cwsp-shell ${inter.className}`}>
      <style>{`
        .cwsp-shell {
          background: #0a0e14; min-height: 100vh;
          padding: 2.5rem 1rem 5rem;
          display: flex; flex-direction: column; align-items: center;
        }
        .cwsp-label {
          color: #4a5568; font-size: 11px; font-weight: 600;
          letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 0.8rem;
        }
        .cwsp-artboard {
          width: 540px; height: 540px; position: relative; overflow: hidden;
          box-shadow: 0 14px 60px rgba(0,0,0,0.55);
        }
        .cwsp-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .cwsp-bg-dim { filter: blur(3px) brightness(0.62) saturate(112%); transform: scale(1.06); }
        .cwsp-vig {
          position: absolute; inset: 0;
          background:
            linear-gradient(180deg, rgba(5,8,13,0.38) 0%, rgba(5,8,13,0) 18%),
            linear-gradient(0deg, rgba(5,8,13,0.42) 0%, rgba(5,8,13,0) 20%);
        }
        .cwsp-content {
          position: relative; z-index: 5; width: 100%; height: 100%;
          padding: 22px 26px; display: flex; flex-direction: column;
          align-items: center; justify-content: space-between;
        }
        .cwsp-top { display: flex; align-items: center; gap: 9px; }
        .cwsp-wordmark {
          color: #fff; font-size: 11.5px; font-weight: 700; letter-spacing: 0.24em;
          text-transform: uppercase; text-shadow: 0 1px 8px rgba(0,0,0,0.55);
        }
        .cwsp-glass {
          width: 100%; border-radius: 18px;
          background: ${GLASS};
          backdrop-filter: blur(28px) saturate(140%);
          -webkit-backdrop-filter: blur(28px) saturate(140%);
          border: 1px solid rgba(255,255,255,0.5);
          box-shadow: 0 10px 40px rgba(0,0,0,0.28);
          padding: 24px 26px 22px; text-align: center;
        }
        .cwsp-eyebrow {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin-bottom: 12px;
        }
        .cwsp-eyebrow-line { width: 26px; height: 2px; background: ${ac}; flex-shrink: 0; }
        .cwsp-eyebrow-text {
          font-size: 10px; font-weight: 700; letter-spacing: 0.13em;
          text-transform: uppercase; color: ${ac}; white-space: nowrap;
        }
        .cwsp-hook {
          color: ${INK}; font-size: 34px; font-weight: 800; line-height: 1.08;
          letter-spacing: -0.015em; margin: 0 0 12px;
        }
        .cwsp-hook em { font-style: normal; color: ${ac}; }
        .cwsp-title {
          color: ${INK}; font-size: 30px; font-weight: 800; line-height: 1.05;
          letter-spacing: -0.015em; margin: 0 0 12px;
        }
        .cwsp-subhead {
          color: ${ac}; font-size: 15.5px; font-weight: 500; line-height: 1.4; margin: 0 0 14px;
        }
        .cwsp-divider { height: 1px; background: ${ac}; opacity: 0.35; margin: 0 8px 14px; }
        .cwsp-date {
          color: ${INK}; font-size: 16.5px; font-weight: 800; letter-spacing: 0.14em;
          text-transform: uppercase; margin-bottom: 6px;
        }
        .cwsp-venue { color: ${INK}; font-size: 13px; font-weight: 600; line-height: 1.45; }
        .cwsp-venue-sub { color: ${INK}; opacity: 0.75; font-size: 12.5px; font-weight: 400; line-height: 1.45; margin-bottom: 12px; }
        .cwsp-people { color: ${INK}; font-size: 12.5px; font-weight: 600; line-height: 1.5; }
        .cwsp-people b { color: ${ac}; font-weight: 700; }
        .cwsp-facts { text-align: left; display: flex; flex-direction: column; gap: 13px; margin: 2px 0 14px; }
        .cwsp-fact { display: flex; gap: 12px; align-items: flex-start; }
        .cwsp-fact-bar { width: 3.5px; border-radius: 2px; background: ${ac}; align-self: stretch; flex-shrink: 0; }
        .cwsp-fact-text { color: ${INK}; font-size: 14.5px; font-weight: 500; line-height: 1.42; }
        .cwsp-fact-text b { font-weight: 800; color: ${ac}; }
        .cwsp-kicker { color: ${INK}; font-size: 14px; font-weight: 700; line-height: 1.45; }
        .cwsp-kicker em { font-style: normal; color: ${ac}; }
        .cwsp-bottom { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .cwsp-chips { display: flex; gap: 10px; }
        .cwsp-chip {
          background: rgba(250,247,242,0.9); color: ${INK};
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 7px 14px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.6);
          box-shadow: 0 4px 18px rgba(0,0,0,0.3);
        }
        .cwsp-chip-accent { background: ${ac}; color: #FAF7F2; border-color: transparent; }
        .cwsp-handles {
          color: #fff; font-size: 11px; font-weight: 500; letter-spacing: 0.04em;
          text-shadow: 0 1px 8px rgba(0,0,0,0.6); opacity: 0.95;
        }
        .cwsp-swipe {
          color: #fff; font-size: 11.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; text-shadow: 0 1px 8px rgba(0,0,0,0.6);
        }
        .cwsp-dots { display: flex; gap: 6px; justify-content: center; }
        .cwsp-dot { width: 6px; height: 6px; border-radius: 999px; background: rgba(255,255,255,0.45); }
        .cwsp-dot-on { background: #fff; }
      `}</style>

      <p className="cwsp-label no-print">
        CW Carousel — slide {slide} of 4 · 540 CSS px → 1080×1080
      </p>

      <div className="cwsp-artboard">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={`cwsp-bg${dimmed ? " cwsp-bg-dim" : ""}`} src={bg} alt="" />
        <div className="cwsp-vig" />

        <div className="cwsp-content">
          <div className="cwsp-top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-main.png" alt="" style={{ width: 26, height: 26, objectFit: "contain", filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.5))" }} />
            <span className="cwsp-wordmark">Colorado Springs Health Collective</span>
          </div>

          {slide === 1 && (
            <div className="cwsp-glass">
              <div className="cwsp-eyebrow">
                <span className="cwsp-eyebrow-line" />
                <span className="cwsp-eyebrow-text" style={{ fontSize: 13.5, fontWeight: 800 }}>
                  A free live talk
                </span>
                <span className="cwsp-eyebrow-line" />
              </div>
              <div className="cwsp-venue-sub" style={{ marginBottom: 14, marginTop: -6 }}>
                For women &amp; partners
              </div>
              <h1 className="cwsp-hook" style={{ fontSize: 37 }}>
                There&rsquo;s a decade that shapes the next <em>30 years</em> of your health.
              </h1>
              <div className="cwsp-divider" style={{ marginTop: 16 }} />
              <div className="cwsp-date">The Critical Window</div>
              <div className="cwsp-venue">{DATE_LINE} · {VENUE} · Colorado Springs</div>
              <div className="cwsp-people" style={{ marginTop: 5 }}>
                Presented by <b>Logan Crist, PA-C</b> · Colorado Springs Health Collective
              </div>
            </div>
          )}

          {slide === 2 && (
            <div className="cwsp-glass">
              <div className="cwsp-eyebrow">
                <span className="cwsp-eyebrow-line" />
                <span className="cwsp-eyebrow-text">Why this decade matters</span>
                <span className="cwsp-eyebrow-line" />
              </div>
              <h1 className="cwsp-title">The window is real.</h1>
              <div className="cwsp-facts">
                <div className="cwsp-fact">
                  <span className="cwsp-fact-bar" />
                  <span className="cwsp-fact-text">
                    Women can lose up to <b>20% of their bone density</b> in the years around menopause.
                  </span>
                </div>
                <div className="cwsp-fact">
                  <span className="cwsp-fact-bar" />
                  <span className="cwsp-fact-text">
                    After menopause, <b>heart disease risk climbs</b>{" "}&mdash; it&rsquo;s already the #1 cause of death in women.
                  </span>
                </div>
                <div className="cwsp-fact">
                  <span className="cwsp-fact-bar" />
                  <span className="cwsp-fact-text">
                    <b>Muscle and strength decline faster</b>{" "}through the transition — and they&rsquo;re among the best predictors of aging well.
                  </span>
                </div>
              </div>
              <div className="cwsp-divider" />
              <p className="cwsp-kicker">
                The same years bring the most change — and the most leverage. <em>That&rsquo;s the critical window.</em>
              </p>
            </div>
          )}

          {slide === 3 && (
            <div className="cwsp-glass">
              <div className="cwsp-eyebrow">
                <span className="cwsp-eyebrow-line" />
                <span className="cwsp-eyebrow-text">What you&rsquo;ll walk away with</span>
                <span className="cwsp-eyebrow-line" />
              </div>
              <h1 className="cwsp-title">One evening. A clear plan.</h1>
              <div className="cwsp-facts">
                <div className="cwsp-fact">
                  <span className="cwsp-fact-bar" />
                  <span className="cwsp-fact-text">What&rsquo;s actually happening in perimenopause — and what&rsquo;s myth</span>
                </div>
                <div className="cwsp-fact">
                  <span className="cwsp-fact-bar" />
                  <span className="cwsp-fact-text">Hormone therapy in 2026 — what the current evidence says</span>
                </div>
                <div className="cwsp-fact">
                  <span className="cwsp-fact-bar" />
                  <span className="cwsp-fact-text">The training &amp; nutrition moves that protect bone, muscle, heart &amp; brain</span>
                </div>
                <div className="cwsp-fact">
                  <span className="cwsp-fact-bar" />
                  <span className="cwsp-fact-text">The questions to ask your provider — and when to start</span>
                </div>
              </div>
              <div className="cwsp-divider" />
              <p className="cwsp-kicker">
                For women in their 30s–50s — and the partners who love them. <em>Especially if you plan to stay active for life.</em>
              </p>
            </div>
          )}

          {slide === 4 && (
            <div className="cwsp-glass">
              <div className="cwsp-eyebrow">
                <span className="cwsp-eyebrow-line" />
                <span className="cwsp-eyebrow-text">Free to attend · Seats are limited</span>
                <span className="cwsp-eyebrow-line" />
              </div>
              <h1 className="cwsp-title">Save your seat.</h1>
              <p className="cwsp-subhead">Bring the friend who needs to hear this.</p>
              <div className="cwsp-divider" />
              <div className="cwsp-date">{DATE_LINE}</div>
              <div className="cwsp-venue">{VENUE} · {ADDRESS}</div>
              <div className="cwsp-people" style={{ marginTop: 5 }}>
                Presented by <b>Logan Crist, PA-C</b> · Colorado Springs Health Collective
              </div>
            </div>
          )}

          <div className="cwsp-bottom">
            {slide === 4 ? (
              <>
                <div className="cwsp-chips">
                  <span className="cwsp-chip cwsp-chip-accent">RSVP — link in bio</span>
                  <span className="cwsp-chip">Free to attend</span>
                </div>
                <OnwardMark height={22} />
                <div className="cwsp-handles">{HANDLES}</div>
              </>
            ) : (
              <>
                <div className="cwsp-chips">
                  <span className="cwsp-chip cwsp-chip-accent">Free to attend</span>
                  <span className="cwsp-chip">
                    {slide === 1 ? "Swipe →" : slide === 2 ? "Swipe — what you'll learn →" : "Swipe — save your seat →"}
                  </span>
                </div>
                {slide === 1 && <OnwardMark height={19} />}
                <div className="cwsp-dots">
                  {[1, 2, 3, 4].map((d) => (
                    <span key={d} className={`cwsp-dot${d === slide ? " cwsp-dot-on" : ""}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
