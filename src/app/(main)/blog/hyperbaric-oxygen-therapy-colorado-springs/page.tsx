import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Hyperbaric Oxygen Therapy Colorado Springs | CSHC",
  description: "Hyperbaric oxygen therapy in Colorado Springs delivers 15× normal tissue oxygen levels. Peer-reviewed evidence for wound healing, Long COVID, fibromyalgia, hearing loss, and cellular anti-aging.",
};

const WAITLIST_URL = "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-d2b5ee660e1e0207";

const toc = [
  { id: "what-is-hbot", label: "What Is HBOT?" },
  { id: "how-it-works", label: "How It Works" },
  { id: "conditions", label: "Conditions & Evidence" },
  { id: "why-2ata", label: "Why 2.0 ATA?" },
  { id: "what-to-expect", label: "What to Expect" },
  { id: "safety", label: "Safety" },
  { id: "faq", label: "FAQ" },
];

const conditions = [
  {
    name: "Wound Healing & Diabetic Ulcers",
    stat: "2.35×",
    statLabel: "higher healing rate",
    detail: "Cochrane review of 10 RCTs (531 patients). Major amputation rate drops from 26% to 10.7% in diabetic wounds. Skin graft survival: 97.7% with HBOT vs 92.3% conventional.",
    color: "hsl(177, 70%, 59%)",
    colorBg: "hsla(177, 70%, 59%, 0.08)",
  },
  {
    name: "Sudden Hearing Loss",
    stat: "2.61×",
    statLabel: "better hearing recovery",
    detail: "2025 meta-analysis of 16 RCTs (1,087 patients): 2.61× higher odds of clinically meaningful hearing recovery (95% CI 1.86–3.68, p < 0.001).",
    color: "hsl(200, 80%, 65%)",
    colorBg: "hsla(200, 80%, 65%, 0.08)",
  },
  {
    name: "Fibromyalgia & Chronic Pain",
    stat: "87–100%",
    statLabel: "pain relief rates",
    detail: "Multiple clinical studies show 87.5–100% efficacy for pain relief. Also documented for autoimmune-associated skin ulcers in the same range.",
    color: "hsl(280, 70%, 65%)",
    colorBg: "hsla(280, 70%, 65%, 0.08)",
  },
  {
    name: "Long COVID & Brain Fog",
    stat: "86%",
    statLabel: "cognitive improvement",
    detail: "Retrospective analysis of 162 patients: 86% achieved clinically significant cognitive improvement after 40–60 sessions at 2.0 ATA.",
    color: "hsl(350, 70%, 65%)",
    colorBg: "hsla(350, 70%, 65%, 0.08)",
  },
  {
    name: "Ulcerative Colitis",
    stat: "50%",
    statLabel: "clinical remission",
    detail: "Blinded UC trial: 50% clinical remission in the HBOT group vs 0% in the control group.",
    color: "hsl(30, 85%, 62%)",
    colorBg: "hsla(30, 85%, 62%, 0.08)",
  },
  {
    name: "Cellular Anti-Aging",
    stat: "37%",
    statLabel: "fewer senescent cells",
    detail: "Hachmo et al. (2020): 37% reduction in senescent cells and 20%+ telomere lengthening after a 60-session protocol at 2.0 ATA — the first non-pharmacological intervention to achieve this.",
    color: "hsl(45, 90%, 60%)",
    colorBg: "hsla(45, 90%, 60%, 0.08)",
  },
];

const faqs = [
  {
    q: "How many HBOT sessions do I need?",
    a: "Most therapeutic protocols run 20–60 sessions depending on the condition. Wound healing typically requires 20–40 sessions, while cognitive and anti-aging protocols are often 40–60 sessions. Your provider will build a protocol specific to your goals.",
  },
  {
    q: "Is hyperbaric oxygen therapy covered by insurance?",
    a: "Insurance covers HBOT for a narrow list of FDA-approved indications (wound healing, decompression sickness, carbon monoxide poisoning, etc.). For longevity, Long COVID, and off-label use, sessions are typically out-of-pocket. Founding member pricing at CSHC is structured to make this accessible.",
  },
  {
    q: "What does an HBOT session feel like?",
    a: "Most patients describe it as relaxing — like lying in a reclined pod listening to music or watching something. You may feel mild pressure in your ears during pressurization, similar to descending in an airplane. The session runs 60–90 minutes at full pressure.",
  },
  {
    q: "Is HBOT safe?",
    a: "HBOT has an outstanding safety record. The most common side effects are mild ear pressure and, rarely, temporary vision changes (which resolve after treatment ends). Oxygen toxicity seizures are exceptionally rare at standard therapeutic pressures (< 1 in 10,000 sessions). Contraindications include untreated pneumothorax and certain chemotherapy agents.",
  },
  {
    q: "What makes 2.0 ATA different from lower-pressure options?",
    a: "Pressure is what drives oxygen into plasma and tissues. At 2.0 ATA you achieve 10–15× normal dissolved oxygen — enough to reach tissues with compromised blood flow. Consumer-grade soft-shell chambers operate at 1.3–1.5 ATA and deliver a fraction of the therapeutic benefit. All published RCTs showing meaningful results used 2.0 ATA or higher.",
  },
  {
    q: "Can HBOT help with sports recovery?",
    a: "Yes. HBOT accelerates clearing of lactic acid, reduces post-exercise inflammation, and promotes tissue repair. Elite athletes use HBOT between training blocks to recover faster and train harder. Several NFL and NBA teams use it regularly.",
  },
];

export default function HBOTBlogPost() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Hyperbaric Oxygen Therapy in Colorado Springs: What the Clinical Evidence Shows",
            description: "How HBOT delivers 15× normal oxygen levels to accelerate healing, reduce inflammation, and reverse cellular aging.",
            datePublished: "2026-04-21",
            author: { "@type": "Organization", name: "Colorado Springs Health Collective" },
            publisher: { "@type": "Organization", name: "Colorado Springs Health Collective", url: "https://coshealthcollective.com" },
          }),
        }}
      />

      <section className="relative" style={{ background: "hsl(210, 32%, 8%)" }}>

        {/* Hero */}
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <Image
            src="/blog/hbot-hero.jpg"
            alt="Hyperbaric oxygen chamber in Colorado Springs"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsla(210,32%,8%,0.65) 0%, hsla(210,32%,8%,0.93) 55%, hsl(210,32%,8%) 85%)" }} />
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-5 lg:px-8">
            <div className="container mx-auto max-w-4xl">
              <Link href="/blog" className="inline-flex items-center gap-1.5 mb-6 text-sm hover:opacity-80" style={{ color: "hsl(177, 70%, 65%)" }}>
                <ArrowLeft className="w-4 h-4" /> Back to All Articles
              </Link>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4" style={{ background: "hsl(177, 70%, 59%)", color: "hsl(210, 32%, 10%)" }}>
                HBOT
              </span>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-4" style={{ color: "hsl(0, 0%, 100%)" }}>
                Hyperbaric Oxygen Therapy in Colorado Springs: What the Clinical Evidence Shows
              </h1>
              <p className="text-sm" style={{ color: "hsl(0, 0%, 60%)" }}>April 2026 · 12 min read</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">

            {/* Key stat callout */}
            <div className="rounded-2xl p-8 mb-10 text-center" style={{ background: "linear-gradient(135deg, hsla(177,70%,50%,0.15), hsla(200,70%,50%,0.15))", border: "1px solid hsla(177,70%,50%,0.3)" }}>
              <div className="text-6xl font-black mb-2" style={{ color: "hsl(177, 70%, 65%)" }}>15×</div>
              <div className="text-lg font-semibold mb-1" style={{ color: "hsl(0, 0%, 95%)" }}>Normal Tissue Oxygen Levels</div>
              <div className="text-sm" style={{ color: "hsl(0, 0%, 65%)" }}>Achieved at 2.0 ATA — what makes therapeutic HBOT fundamentally different</div>
            </div>

            {/* Table of contents */}
            <div className="rounded-2xl p-6 mb-10" style={{ background: "hsla(210, 22%, 18%, 0.8)", border: "1px solid hsla(177,70%,50%,0.15)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>In This Article</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {toc.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity" style={{ color: "hsl(210, 30%, 80%)" }}>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: "hsl(177, 70%, 59%)" }} />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Intro */}
            <p className="text-lg leading-relaxed mb-8" style={{ color: "hsl(210, 25%, 85%)" }}>
              Hyperbaric oxygen therapy has been used in medicine for decades — but most people's exposure to it has been through vague wellness marketing or a friend who swears by it without being able to explain why. The actual science is more interesting than either the hype or the skepticism. At therapeutic pressures, HBOT triggers biological changes that no drug or supplement can replicate. This article walks through the mechanism and the clinical evidence, specifically as it applies to what we offer in Colorado Springs.
            </p>

            {/* What is HBOT */}
            <div id="what-is-hbot" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>What Is Hyperbaric Oxygen Therapy?</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                Hyperbaric oxygen therapy means breathing pure (100%) oxygen inside a pressurized chamber at greater than normal atmospheric pressure. "Hyperbaric" literally means elevated pressure. At sea level, atmospheric pressure is 1 ATA (atmosphere absolute). Therapeutic HBOT runs at 1.5 to 3.0 ATA depending on the protocol.
              </p>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                At Colorado Springs Health Collective, we operate at <strong style={{ color: "hsl(0,0%,95%)" }}>2.0 ATA</strong> — the pressure level used in every major RCT demonstrating meaningful clinical outcomes. This isn't a detail. Pressure determines oxygen delivery, and oxygen delivery determines what HBOT can actually do.
              </p>
              <p className="leading-relaxed" style={{ color: "hsl(210, 25%, 82%)" }}>
                Under normal conditions, oxygen is carried almost entirely by red blood cells (hemoglobin). At 2.0 ATA breathing 100% O₂, oxygen also dissolves directly into blood plasma at concentrations 10–15 times higher than normal. That plasma-dissolved oxygen can reach tissues that red blood cells can't access — injured tissue, inflamed tissue, or tissue with compromised blood flow.
              </p>
            </div>

            {/* How it works */}
            <div id="how-it-works" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: "hsl(177, 70%, 65%)" }}>How HBOT Works: The Four Biological Mechanisms</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  { num: "01", title: "Angiogenesis", body: "HBOT stimulates the growth of new blood vessels (angiogenesis) by upregulating VEGF and other growth factors. More vessels mean better perfusion to previously oxygen-starved tissue — a permanent structural improvement, not a temporary effect.", color: "hsl(177, 70%, 59%)" },
                  { num: "02", title: "Stem Cell Mobilization", body: "A single 2.0 ATA session can mobilize stem cells from bone marrow into circulation by 800%. These circulating stem cells home to sites of injury and participate in tissue repair — a mechanism unavailable to any drug.", color: "hsl(200, 80%, 65%)" },
                  { num: "03", title: "Inflammation Control", body: "HBOT downregulates pro-inflammatory cytokines (TNF-α, IL-1β, IL-6) while preserving the acute inflammatory response needed for healing. The net effect is reduced chronic inflammation without immunosuppression.", color: "hsl(280, 70%, 65%)" },
                  { num: "04", title: "Senescent Cell Clearance", body: "Repeated HBOT sessions at 2.0 ATA trigger apoptosis in senescent cells (damaged 'zombie cells' that drive aging and inflammation) while simultaneously lengthening telomeres in immune cells — documented in peer-reviewed human trials.", color: "hsl(45, 90%, 60%)" },
                ].map((m) => (
                  <div key={m.num} className="rounded-2xl p-6" style={{ background: "hsla(210, 22%, 18%, 0.8)", borderLeft: `3px solid ${m.color}` }}>
                    <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: m.color }}>{m.num}</div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "hsl(0, 0%, 95%)" }}>{m.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 75%)" }}>{m.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conditions */}
            <div id="conditions" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2" style={{ color: "hsl(177, 70%, 65%)" }}>Conditions & Clinical Evidence</h2>
              <p className="leading-relaxed mb-8" style={{ color: "hsl(210, 25%, 72%)" }}>
                The following evidence comes from peer-reviewed meta-analyses and RCTs. We present the numbers as they are — no hedging, no cherry-picking.
              </p>

              <div className="space-y-4">
                {conditions.map((c) => (
                  <div key={c.name} className="rounded-2xl p-6" style={{ background: c.colorBg, border: `1px solid ${c.color}33` }}>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-shrink-0 text-center sm:text-left">
                        <div className="text-4xl font-black leading-none" style={{ color: c.color }}>{c.stat}</div>
                        <div className="text-xs mt-1 font-semibold uppercase tracking-wider" style={{ color: c.color }}>{c.statLabel}</div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1" style={{ color: "hsl(0, 0%, 95%)" }}>{c.name}</h3>
                        <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 78%)" }}>{c.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why 2.0 ATA */}
            <div id="why-2ata" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>Why 2.0 ATA? The Pressure That Actually Works</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                The consumer wellness market has flooded with soft-shell "hyperbaric" chambers operating at 1.3 ATA. At 1.3 ATA breathing air (not pure O₂), the additional oxygen delivered to tissues is marginal — insufficient to trigger angiogenesis, stem cell mobilization, or senolytic effects.
              </p>
              <p className="leading-relaxed mb-6" style={{ color: "hsl(210, 25%, 82%)" }}>
                Every published RCT showing the outcomes listed above used <strong style={{ color: "hsl(0,0%,95%)" }}>2.0 ATA or higher with 100% oxygen</strong>. That is the minimum pressure required to dissolve oxygen into plasma at therapeutically meaningful concentrations. It's why we chose 2.0 ATA as our standard and why we won't offer lower-pressure alternatives that underdeliver.
              </p>
              <div className="rounded-2xl p-6" style={{ background: "hsla(177, 70%, 50%, 0.08)", border: "1px solid hsla(177, 70%, 50%, 0.25)" }}>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 30%, 82%)" }}>
                  <strong style={{ color: "hsl(177, 70%, 70%)" }}>Learn more:</strong> See our full breakdown of pressure, oxygen delivery, and why the ATA number matters at{" "}
                  <Link href="/hyperbaric/why-2ata" className="underline hover:opacity-80" style={{ color: "hsl(177, 70%, 65%)" }}>
                    coshealthcollective.com/hyperbaric/why-2ata
                  </Link>.
                </p>
              </div>
            </div>

            {/* What to expect */}
            <div id="what-to-expect" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>What to Expect at a Session</h2>
              <div className="space-y-3">
                {[
                  ["Before", "No special preparation is needed. Avoid alcohol for 24 hours prior. Wear comfortable, loose-fitting clothes — we'll provide a 100% cotton gown to reduce static risk."],
                  ["During", "You'll lie inside the chamber as it pressurizes over about 10–15 minutes. At full pressure you breathe pure oxygen through a mask. Most patients watch a show, listen to music, or sleep. Sessions run 60–90 minutes at pressure."],
                  ["After", "Most people feel energized or pleasantly drowsy. Some report heightened mental clarity in the hours following a session. There's no downtime — you can drive yourself and return to normal activities immediately."],
                  ["Frequency", "For therapeutic protocols, sessions are typically 5 days per week for 4–12 weeks. For maintenance and longevity, many patients transition to 1–3 sessions per week indefinitely."],
                ].map(([label, text]) => (
                  <div key={label} className="flex gap-4 rounded-xl p-5" style={{ background: "hsla(210, 22%, 18%, 0.7)" }}>
                    <div className="font-bold text-sm flex-shrink-0 w-20 pt-0.5" style={{ color: "hsl(177, 70%, 65%)" }}>{label}</div>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 80%)" }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety */}
            <div id="safety" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{ color: "hsl(177, 70%, 65%)" }}>Is HBOT Safe?</h2>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                HBOT has decades of clinical use and an excellent safety record. The most common side effect is mild ear pressure during pressurization — similar to descending in an airplane — which resolves by equalizing (yawning, swallowing, or using the Valsalva maneuver).
              </p>
              <p className="leading-relaxed mb-4" style={{ color: "hsl(210, 25%, 82%)" }}>
                Oxygen toxicity seizures are the most serious theoretical risk, but they are exceedingly rare at standard therapeutic pressures — occurring in fewer than 1 in 10,000 sessions in modern clinical settings. Temporary vision changes (mild myopia) occasionally occur with extended protocols and consistently reverse after treatment ends.
              </p>
              <p className="leading-relaxed" style={{ color: "hsl(210, 25%, 82%)" }}>
                Contraindications include untreated pneumothorax, certain chemotherapy agents (bleomycin, doxorubicin), and severe COPD with CO₂ retention. All patients at CSHC complete a medical intake review before beginning any HBOT protocol.
              </p>
            </div>

            {/* FAQ */}
            <div id="faq" className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{ color: "hsl(177, 70%, 65%)" }}>Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <details key={faq.q} className="rounded-xl overflow-hidden group" style={{ background: "hsla(210, 22%, 18%, 0.8)" }}>
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-semibold list-none" style={{ color: "hsl(0, 0%, 95%)" }}>
                      {faq.q}
                      <ChevronRight className="w-4 h-4 flex-shrink-0 group-open:rotate-90 transition-transform" style={{ color: "hsl(177, 70%, 65%)" }} />
                    </summary>
                    <div className="px-5 pb-5">
                      <p className="text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 78%)" }}>{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Internal links */}
            <div className="rounded-2xl p-6 mb-10" style={{ background: "hsla(210, 22%, 18%, 0.6)", border: "1px solid hsla(177, 70%, 50%, 0.15)" }}>
              <p className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "hsl(177, 70%, 65%)" }}>Explore More</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/hyperbaric" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: "hsl(210, 30%, 80%)" }}>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: "hsl(177, 70%, 59%)" }} />
                  HBOT Overview & Conditions
                </Link>
                <Link href="/hyperbaric/evidence" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: "hsl(210, 30%, 80%)" }}>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: "hsl(177, 70%, 59%)" }} />
                  Full Clinical Evidence Database
                </Link>
                <Link href="/hyperbaric/why-2ata" className="flex items-center gap-2 text-sm hover:opacity-80" style={{ color: "hsl(210, 30%, 80%)" }}>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: "hsl(177, 70%, 59%)" }} />
                  Why 2.0 ATA Matters
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-3xl p-8 lg:p-10 text-center" style={{ background: "linear-gradient(135deg, hsla(177,70%,50%,0.15), hsla(200,70%,50%,0.15))", border: "1px solid hsla(177,70%,50%,0.3)" }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(177, 70%, 65%)" }}>Colorado Springs Health Collective</p>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3" style={{ color: "hsl(0, 0%, 100%)" }}>
                Ready to Start HBOT?
              </h3>
              <p className="mb-6 max-w-lg mx-auto" style={{ color: "hsl(210, 30%, 80%)" }}>
                We're accepting founding members at 25% off launch pricing. Join the waitlist now and lock in your rate before we open.
              </p>
              <a
                href={WAITLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-full font-semibold text-lg"
                style={{ background: "linear-gradient(135deg, hsl(177,70%,59%), hsl(200,70%,55%))", color: "hsl(210, 32%, 10%)", boxShadow: "0 8px 32px hsla(177,70%,50%,0.3)" }}
              >
                Join the Waitlist — 25% Off
              </a>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
                <a href="tel:+17198244716" className="flex items-center gap-2 hover:opacity-80">
                  <Phone className="w-4 h-4" style={{ color: "hsl(177, 70%, 65%)" }} />
                  <span className="text-sm" style={{ color: "hsl(0, 0%, 85%)" }}>(719) 824-4716</span>
                </a>
                <a href="mailto:dpc@coshealthcollective.com" className="flex items-center gap-2 hover:opacity-80">
                  <Mail className="w-4 h-4" style={{ color: "hsl(177, 70%, 65%)" }} />
                  <span className="text-sm" style={{ color: "hsl(0, 0%, 85%)" }}>dpc@coshealthcollective.com</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
