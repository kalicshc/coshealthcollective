import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HBOT Evidence Library | Colorado Springs Health Collective — Hyperbaric",
  description: "Evidence-based hyperbaric oxygen therapy outcomes by condition. Fourteen indications reviewed across four tiers of clinical evidence — with honest clinical context.",
};

const tiers = [
  {
    tier: "Tier 1",
    stars: "★★★★",
    label: "Well-Established",
    sublabel: "FDA-approved indications, multiple RCTs, meta-analyses, and/or specialty guideline endorsement",
    color: "hsl(177,70%,59%)",
    colorBg: "hsla(177,70%,59%,0.08)",
    colorBorder: "hsla(177,70%,59%,0.25)",
    conditions: [
      {
        title: "Wound Healing & Surgical Recovery",
        urgent: false,
        bullets: [
          "FDA-approved for skin grafts, diabetic ulcers, and compromised wound healing",
          "Cochrane review (10 RCTs, 531 patients): RR 2.35 for wound healing at 6 weeks (95% CI 1.19–4.62)",
          "Aesthetic surgery: 13.3 days to heal vs. 36.9 days without HBOT in a 2023 case-control study",
          "Skin graft survival: 97.69% with HBOT vs. 92.25% conventional",
          "Major amputation rate: 10.7% with HBOT vs. 26.0% standard care in diabetic wounds",
          "Radiation tissue injury: UHMS and European Consensus Conference formal endorsement",
        ],
        protocol: "2.0–2.5 ATA · 90–120 min · 20–40 sessions",
        honest: "HBOT's strongest and most validated territory. FDA approval, guideline endorsement, and a growing evidence base for aesthetic surgery recovery make this one of our most compelling indications.",
      },
      {
        title: "Sudden Sensorineural Hearing Loss (SSNHL)",
        urgent: true,
        bullets: [
          "American Academy of Otolaryngology–HNS guideline endorsement",
          "2025 meta-analysis (16 RCTs, 1,087 HBOT patients): 2.61× higher odds of hearing recovery (95% CI 1.86–3.68, p < 0.001)",
          "Benefit most pronounced in severe-to-profound loss (≥70 dB) and when total treatment exceeds 900–1,200 minutes",
          "Time-critical: delays beyond 4 weeks significantly reduce benefit",
        ],
        protocol: "2.0–2.5 ATA · 60–90 min · 10–20 sessions · Begin within 2 weeks of onset",
        honest: "The most guideline-supported non-hospital HBOT application available. The urgency is real — if this applies to you, time matters.",
      },
      {
        title: "Fibromyalgia",
        urgent: false,
        bullets: [
          "Pain relief rates of 87.5–100% in clinical studies",
          "Head-to-head RCT vs. pregabalin and duloxetine (standard medications): HBOT won — effect size d = −0.95 ('large')",
          "SPECT imaging confirmed objective neurological changes in fibromyalgia-implicated brain regions",
          "Also documented for autoimmune-associated skin ulcers: 87.5–100% efficacy",
        ],
        protocol: "1.5–2.0 ATA · 60–90 min · 40 sessions (~8 weeks)",
        honest: "No major rheumatology guideline formally endorses HBOT for fibromyalgia yet — this reflects guideline lag behind the evidence, not a lack of data.",
      },
      {
        title: "Chronic Stroke Recovery (6+ Months Post-Stroke)",
        urgent: false,
        bullets: [
          "RCT (74 patients, 6 months–3 years post-stroke): significant improvements in neurological function — SPECT confirmed reactivated brain regions",
          "Retrospective analysis (162 patients): 86% achieved clinically significant cognitive improvement after 40–60 sessions at 2.0 ATA",
          "fNIRS studies confirm improvements in Fugl-Meyer motor scores",
        ],
        protocol: "2.0 ATA · 90 min · 40–60 sessions · Best results 6 months to several years post-stroke",
        honest: "Not yet in standard stroke rehab guidelines. But the imaging evidence confirming dormant tissue reactivation is biologically compelling.",
      },
    ],
  },
  {
    tier: "Tier 2",
    stars: "★★★",
    label: "Strong Emerging Evidence",
    sublabel: "Well-designed RCTs with clear benefit — research actively advancing",
    color: "hsl(188,88%,62%)",
    colorBg: "hsla(188,88%,62%,0.06)",
    colorBorder: "hsla(188,88%,62%,0.2)",
    conditions: [
      {
        title: "Post-Concussion Syndrome & TBI",
        urgent: false,
        bullets: [
          "Systematic review meets Centre for Evidence-Based Medicine Level 1 criteria for 40 sessions at 1.5 ATA",
          "2025 double-blind RCT at 2.0 ATA: significantly greater improvement vs. sham (7.0-point difference, p = 0.01)",
          "Adults who sustained TBI in childhood (avg age 7.7) showed cognitive gains 23+ years later — recovery window may be far longer than assumed",
        ],
        protocol: "1.5–2.0 ATA · 60–90 min · 40 sessions · Pressures above 2.0 ATA have NOT shown benefit",
        honest: "The 2025 RCT and the childhood-TBI recovery data are genuinely exciting. Earlier military studies at different protocols were less favorable — but careful patient selection and the right pressure matter enormously.",
        warning: "The VA currently recommends against HBOT for routine mild TBI based on earlier military studies.",
      },
      {
        title: "Long COVID Recovery",
        urgent: false,
        bullets: [
          "Zilberman-Itskovich et al. (2022): improvements in cognitive function, fatigue, sleep, and cardiac capacity confirmed at 1-year follow-up",
          "Addresses microvascular damage, neuroinflammation, and mitochondrial dysfunction — three overlapping mechanisms in Long COVID",
          "Multiple case series confirm consistent functional improvement patterns",
        ],
        protocol: "2.0 ATA · 90 min · 40 sessions",
        honest: "A strong mechanistic fit and reproducible clinical observations. Awaiting larger confirmatory RCTs — but the evidence-to-date is compelling for patients who have run out of options.",
      },
      {
        title: "Anti-Aging & Cellular Longevity",
        urgent: false,
        bullets: [
          "Hachmo et al. (2020): 37% fewer senescent cells and 20%+ telomere lengthening after a 60-session protocol at 2.0 ATA",
          "Measured in T-helper cells, B-cells, cytotoxic T-cells, and NK cells — not just one cell type",
          "1,912 differentially expressed genes across a full HBOT course — aging-associated pathways downregulated, regenerative pathways activated",
        ],
        protocol: "2.0 ATA · 90 min · 60 sessions",
        honest: "One well-designed human trial with striking results. Replication needed at scale, but the cellular mechanisms are real and consistent with known HBOT biology.",
      },
    ],
  },
  {
    tier: "Tier 3",
    stars: "★★",
    label: "Promising Early Evidence",
    sublabel: "Consistent findings in observational studies and smaller trials — larger RCTs needed",
    color: "hsl(271,74%,65%)",
    colorBg: "hsla(271,74%,65%,0.06)",
    colorBorder: "hsla(271,74%,65%,0.2)",
    conditions: [
      {
        title: "Athletic Recovery & Performance",
        urgent: false,
        bullets: [
          "2026 meta-analysis of 10 RCTs: significant improvement in muscle soreness, inflammatory markers, and return-to-performance timelines",
          "Tendon healing: improved collagen synthesis and fibroblast activity documented in human studies",
          "Used by professional sports teams — NFL, NBA, Premier League — as standard recovery protocol",
        ],
        protocol: "1.5–2.0 ATA · 60–90 min · 10–20 sessions per recovery cycle",
        honest: "The evidence base is growing rapidly. Not yet at the level of clinical guideline endorsement, but the biological mechanism is sound and real-world use is extensive.",
      },
      {
        title: "Autoimmune Disease & Chronic Inflammation",
        urgent: false,
        bullets: [
          "50% clinical remission in blinded UC trial vs. 0% in control group",
          "TNF-α and IL-6 — primary drivers of RA, psoriasis, and IBD — measurably reduced after HBOT",
          "Consistent case series in Crohn's, psoriasis, and lupus patients",
        ],
        protocol: "2.0 ATA · 90 min · 20–40 sessions",
        honest: "Mechanistically compelling — HBOT interrupts the same inflammatory cascade driving these diseases. Larger trials are needed before clinical guideline endorsement.",
      },
    ],
  },
  {
    tier: "Tier 4",
    stars: "★",
    label: "Mechanistically Plausible",
    sublabel: "Preclinical and early human data — promising but requiring larger confirmatory studies",
    color: "hsl(210,70%,65%)",
    colorBg: "hsla(210,70%,65%,0.06)",
    colorBorder: "hsla(210,70%,65%,0.2)",
    conditions: [
      {
        title: "Alzheimer's & Cognitive Decline",
        urgent: false,
        bullets: [
          "Pilot RCT: significant improvements in memory, attention, and information processing speed",
          "Mechanistic rationale: addresses amyloid pathology, neuroinflammation, and vascular insufficiency simultaneously",
          "Animal models consistently show plaque reduction and cognitive improvement",
        ],
        protocol: "2.0 ATA · 90 min · 60 sessions",
        honest: "The most compelling early signal in an indication that has resisted all other interventions. Not yet at clinical standard of care — but for patients facing this diagnosis, the risk profile is favorable and the early data is real.",
      },
      {
        title: "Cancer Treatment Support",
        urgent: false,
        bullets: [
          "Not a cancer treatment — but HBOT sensitizes tumors to radiation (hyperoxia reverses the radio-resistance of hypoxic tumor tissue)",
          "Used adjunctively in radiation oncology protocols in Europe",
          "Anti-tumor properties under active investigation",
        ],
        protocol: "Variable · Used adjunctively with radiation therapy",
        honest: "We are transparent about what HBOT is and is not. This is a supportive application — not a primary cancer treatment. Any use requires coordination with your oncology team.",
      },
    ],
  },
];

const glassCard = {
  background: "hsla(210,22%,22%,0.5)",
  border: "1px solid hsla(177,70%,59%,0.15)",
  backdropFilter: "blur(12px)",
} as React.CSSProperties;

export default function EvidencePage() {
  return (
    <div className="page-bg pt-28">
      {/* Header */}
      <section className="relative py-20 lg:py-24 text-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, hsla(177,70%,59%,0.1) 0%, transparent 60%)" }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-3xl px-5">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(177,70%,62%)" }}>
            Clinical Evidence
          </p>
          <h1 className="text-4xl font-black text-white lg:text-6xl mb-5">
            One Therapy.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, hsl(177,88%,62%), hsl(210,70%,58%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Fourteen Conditions.
            </span>
          </h1>
          <p style={{ color: "hsl(210,25%,65%)", fontSize: "17px", lineHeight: "1.7" }}>
            Four tiers of evidence. Honest clinical perspective on every indication — including what the studies show, where the science is still building, and what to be skeptical of. Because informed patients make the best decisions.
          </p>
        </div>
      </section>

      {/* Evidence tiers */}
      {tiers.map((tier, ti) => (
        <section
          key={tier.tier}
          className="py-16 lg:py-20"
          style={{
            background: ti % 2 === 1 ? "hsla(210,22%,13%,0.6)" : "transparent",
            borderTop: "1px solid hsla(177,70%,59%,0.08)",
          }}
        >
          <div className="mx-auto max-w-5xl px-5 lg:px-8">
            {/* Tier header */}
            <div className="mb-10 rounded-2xl p-6" style={{ background: tier.colorBg, border: `1px solid ${tier.colorBorder}` }}>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-2xl font-black" style={{ color: tier.color }}>{tier.stars}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: tier.color }}>{tier.tier}</span>
                    <span className="font-black text-lg text-white">{tier.label}</span>
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: "hsl(210,25%,62%)" }}>{tier.sublabel}</p>
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div className="space-y-6">
              {tier.conditions.map((c) => (
                <div key={c.title} className="rounded-2xl p-7" style={glassCard}>
                  <div className="flex flex-wrap items-start gap-3 mb-4">
                    <h3 className="text-xl font-black text-white">{c.title}</h3>
                    {c.urgent && (
                      <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider"
                        style={{ background: "hsla(0,80%,55%,0.15)", border: "1px solid hsla(0,80%,55%,0.4)", color: "hsl(0,80%,72%)" }}
                      >
                        ⏰ Time-Sensitive
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 mb-5">
                    {c.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "hsl(210,25%,72%)" }}>
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: tier.color }} />
                        {b}
                      </div>
                    ))}
                  </div>

                  {"warning" in c && c.warning && (
                    <div
                      className="rounded-xl px-4 py-3 mb-4 text-xs"
                      style={{ background: "hsla(45,90%,55%,0.08)", border: "1px solid hsla(45,90%,55%,0.25)", color: "hsl(45,90%,72%)" }}
                    >
                      ⚠️ {c.warning}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <div
                      className="flex-1 rounded-xl px-4 py-3 text-xs"
                      style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <span className="font-bold uppercase tracking-wider" style={{ color: "hsl(210,25%,55%)" }}>Protocol: </span>
                      <span style={{ color: "hsl(210,25%,72%)" }}>{c.protocol}</span>
                    </div>
                  </div>

                  <div
                    className="mt-4 rounded-xl px-4 py-3 text-xs leading-relaxed"
                    style={{ background: `${tier.colorBg}`, border: `1px solid ${tier.colorBorder}` }}
                  >
                    <span className="font-bold uppercase tracking-wider" style={{ color: tier.color }}>Honest take: </span>
                    <span style={{ color: "hsl(210,25%,68%)" }}>{c.honest}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(177,70%,62%)" }}>
            Pre-Launch Access
          </p>
          <h2 className="text-3xl font-black text-white lg:text-4xl mb-5">
            Opening Summer 2026.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, hsl(177,88%,62%), hsl(210,70%,58%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Register now.
            </span>
          </h2>
          <p className="mb-8" style={{ color: "hsl(210,25%,62%)", fontSize: "17px" }}>
            No commitment. Lock in your 25% founding member discount before we open.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/hyperbaric"
              className="rounded-full px-8 py-4 font-bold text-sm hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(135deg, hsl(177,70%,59%), hsl(210,70%,55%))",
                color: "hsl(210,32%,10%)",
                boxShadow: "0 8px 32px hsla(177,70%,50%,0.3)",
              }}
            >
              Register — 25% Off at Launch
            </Link>
            <Link
              href="/hyperbaric/why-2ata"
              className="rounded-full px-8 py-4 text-sm font-semibold hover:opacity-80 transition-opacity"
              style={{ border: "1px solid hsla(177,70%,59%,0.4)", color: "hsl(177,70%,72%)" }}
            >
              Why 2.0 ATA Matters →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
