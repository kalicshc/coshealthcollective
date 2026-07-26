import type { Metadata } from "next";
import { clinicFacts, usd } from "@/lib/clinicFacts";
import { ACCENTS } from "@/lib/accents";
import { Eyebrow } from "@/components/SceneSection";
import { PricingColumns } from "@/components/PricingColumns";
import { PageCtaFooter } from "@/components/PageCtaFooter";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { hintLink } from "@/lib/bookingLinks";

const PAGE = "pricing";
const { enrollmentFee, dpc, urgentCare, hormone, combo, hbot } = clinicFacts;

const DESCRIPTION =
  `Every CSHC price in one place: ${usd(dpc.individualMonthly)}/mo Direct Primary Care, ` +
  `${usd(hormone.monthlyManagement)}/mo hormone care (HRT, TRT & GLP-1), ${usd(combo.monthly)}/mo combo membership, ` +
  `${usd(urgentCare.telehealth)} telehealth and ${usd(urgentCare.inPerson)} in-person urgent care visits. ` +
  `One-time ${usd(enrollmentFee)} enrollment, no contracts, cancel anytime.`;

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Pricing — Memberships, Visits & Bundles",
  description: DESCRIPTION,
  keywords:
    "DPC pricing Colorado Springs, direct primary care cost, hormone therapy cost Colorado Springs, TRT price, GLP-1 cost, urgent care prices Colorado Springs",
};

const pricingSchema = serviceSchema({
  type: "MedicalWebPage",
  name: "CSHC Pricing — Memberships, Visits & Bundles",
  description: DESCRIPTION,
  path: "/pricing",
  offers: [
    { name: "Direct Primary Care membership (individual)", price: dpc.individualMonthly, description: "Per month" },
    { name: "Direct Primary Care membership (couples)", price: dpc.couplesMonthly, description: "Per month" },
    { name: "DPC child add-on", price: dpc.childAddOnMonthly, description: `Per month, age ${dpc.childAgeMin}+` },
    { name: "Hormone membership (HRT / TRT / GLP-1)", price: hormone.monthlyManagement, description: "Per month" },
    { name: "DPC + Hormone combo membership", price: combo.monthly, description: "Per month" },
    { name: "One-time enrollment fee", price: enrollmentFee, description: "Every membership, per household for family plans" },
    { name: "Urgent care — telehealth visit", price: urgentCare.telehealth },
    { name: "Urgent care — in-person or in-home visit", price: urgentCare.inPerson },
    { name: "Topical estrogen telehealth visit", price: hormone.topicalEstrogenTelehealth, description: `Covers ${hormone.topicalEstrogenDurationMonths} months` },
  ],
});

const dpcA = ACCENTS.dpc;
const horA = ACCENTS.hormone;
const hboA = ACCENTS.hyperbaric;

// Member lab pricing vs published direct-to-consumer retail (July 2026).
// Local to this page on purpose — not shared with other surfaces, so it
// stays out of clinicFacts.ts.
const LAB_ROWS: { name: string; note?: string; member: number; retail: number }[] = [
  { name: "Complete Blood Count (CBC)", member: 3, retail: 29 },
  { name: "TSH + Free T4", note: "retail price is TSH alone", member: 3, retail: 44 },
  { name: "Magnesium", member: 4, retail: 39 },
  { name: "Hemoglobin A1c", member: 4, retail: 39 },
  { name: "Vitamin B12", member: 4, retail: 49 },
  { name: "Folate", member: 5, retail: 65 },
  { name: "Comprehensive Metabolic Panel (CMP)", member: 5, retail: 49 },
  { name: "PSA", note: "includes reflex to Free PSA", member: 6, retail: 69 },
  { name: "Lipid Panel", member: 6, retail: 59 },
  { name: "hs-CRP", member: 8, retail: 65 },
  { name: "Testosterone", member: 16, retail: 62 },
  { name: "Lipoprotein(a)", member: 18, retail: 45 },
  { name: "Vitamin D", member: 26, retail: 75 },
];
const LAB_MEMBER_TOTAL = LAB_ROWS.reduce((sum, r) => sum + r.member, 0);
const LAB_RETAIL_TOTAL = LAB_ROWS.reduce((sum, r) => sum + r.retail, 0);
const pctOff = (member: number, retail: number) => Math.round((1 - member / retail) * 100);
// Whole multiples read stronger ("10x"); below 5x a rounded-up number would
// overstate, so show one decimal there instead.
const times = (member: number, retail: number) => {
  const m = retail / member;
  return m >= 5 ? `${Math.round(m)}x` : `${(Math.floor(m * 10) / 10).toFixed(1).replace(/\.0$/, "")}x`;
};

function VisitCard({
  accentRgb,
  title,
  price,
  priceNote,
  body,
  cta,
}: {
  accentRgb: string;
  title: string;
  price: number;
  priceNote: string;
  body: string;
  cta: { label: string; href: string; source: string; service: "dpc" | "hormone" };
}) {
  return (
    <div
      className="flex flex-col rounded-[28px] border p-7"
      style={{
        borderColor: `rgba(${accentRgb},0.2)`,
        background: `linear-gradient(160deg, rgba(${accentRgb},0.1), hsla(210,22%,16%,0.72))`,
        boxShadow: "0 20px 60px rgba(7,10,18,0.3)",
      }}
    >
      <div className="h-0.5 w-12 rounded-full" style={{ background: `rgba(${accentRgb},0.9)` }} />
      <h3 className="mt-5 text-lg font-black text-white">{title}</h3>
      <div className="mt-3">
        <span className="text-4xl font-black text-white">{usd(price)}</span>
        <span className="ml-1.5 text-sm text-slate-400">{priceNote}</span>
      </div>
      <p className="mt-4 flex-1 text-sm leading-6 text-slate-300">{body}</p>
      <TrackedLink
        href={cta.href}
        analytics={{ page: PAGE, source: cta.source, service: cta.service, label: cta.label }}
        className="mt-6 rounded-full px-6 py-3 text-center text-sm font-bold text-white transition-opacity hover:opacity-85"
        style={{ border: `1px solid rgba(${accentRgb},0.4)`, background: "rgba(255,255,255,0.04)" }}
      >
        {cta.label}
      </TrackedLink>
    </div>
  );
}

export default function Pricing() {
  return (
    <div>
      <JsonLd data={pricingSchema} />

      {/* ── 1. MEMBERSHIP COLUMNS ─────────────────────────────────────── */}
      <section id="memberships" className="scroll-mt-20 pt-32 pb-8 lg:pt-40">
        <div className="mx-auto max-w-6xl px-4 lg:px-8"><div className="mx-auto max-w-5xl">
          <h1 className="sr-only">Pricing</h1>
          <PricingColumns perspective="dpc" page={PAGE} source="pricing-memberships" />
        </div>
      </div>
      </section>

      {/* ── 2. ONE-OFF VISIT COLUMNS ──────────────────────────────────── */}
      <section id="visits" className="scroll-mt-20 py-8">
        <div className="mx-auto max-w-6xl px-4 lg:px-8"><div className="mx-auto max-w-5xl">
          <div className="grid gap-5 lg:grid-cols-3">
            <VisitCard
              accentRgb={dpcA.rgb}
              title="Urgent Care — In-Person"
              price={urgentCare.inPerson}
              priceNote="/ visit"
              body="Same-day sick and injury care at the clinic — or we come to you in-home. One flat price covers the visit, no surprise charges after."
              cta={{
                label: "Book In-Person",
                href: hintLink("urgentCareInPerson", "pricing-visits"),
                source: "pricing-visits-inperson",
                service: "dpc",
              }}
            />
            <VisitCard
              accentRgb={dpcA.rgb}
              title="Urgent Care — Telehealth"
              price={urgentCare.telehealth}
              priceNote="/ visit"
              body="A video visit with a provider from anywhere in Colorado — prescriptions sent to your pharmacy when appropriate."
              cta={{
                label: "Book Telehealth",
                href: hintLink("urgentCareTelehealth", "pricing-visits"),
                source: "pricing-visits-telehealth",
                service: "dpc",
              }}
            />
            <VisitCard
              accentRgb={horA.rgb}
              title="Topical Estrogen — Telehealth"
              price={hormone.topicalEstrogenTelehealth}
              priceNote={`/ ${hormone.topicalEstrogenDurationMonths}-month visit`}
              body={`For patients who already know they want vaginal/topical estrogen and don't need the full hormone workup. One telehealth visit covers ${hormone.topicalEstrogenDurationMonths} months; medication billed separately.`}
              cta={{
                label: "Learn More",
                href: "/hormone",
                source: "pricing-visits-estrogen",
                service: "hormone",
              }}
            />
          </div>
        </div>
      </div>
      </section>

      {/* ── 3. MEMBER LAB PRICING ─────────────────────────────────────── */}
      <section id="labs" className="scroll-mt-20 py-8 lg:py-10">
        <div className="mx-auto max-w-6xl px-4 lg:px-8"><div className="mx-auto max-w-5xl">
          <div
            className="rounded-[34px] border p-8 lg:p-12"
            style={{
              borderColor: `rgba(${dpcA.rgb},0.2)`,
              background: `linear-gradient(160deg, rgba(${dpcA.rgb},0.08), hsla(210,22%,16%,0.75))`,
              boxShadow: "0 24px 80px rgba(7,10,18,0.4)",
            }}
          >
            <Eyebrow color={`rgba(${dpcA.rgb},0.9)`}>How DPC Saves You Money</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Same blood draw. {pctOff(LAB_MEMBER_TOTAL, LAB_RETAIL_TOTAL)}% less.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              The {LAB_ROWS.length} labs below cost <strong className="text-white">{usd(LAB_MEMBER_TOTAL)}</strong>{" "}
              at CoSHealth member pricing. Ordered individually through a national lab&rsquo;s
              direct-to-consumer store, the same tests total{" "}
              <strong className="text-white">{usd(LAB_RETAIL_TOTAL)}</strong>.
            </p>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[26rem] text-sm">
                <thead>
                  <tr className="text-left text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pr-4">Lab</th>
                    <th className="pb-3 pr-4 text-right">Retail</th>
                    <th
                      className="rounded-t-xl px-3 pb-3 pt-2 text-right"
                      style={{ color: `rgba(${dpcA.rgb},1)`, background: `rgba(${dpcA.rgb},0.12)` }}
                    >
                      Members Pay
                    </th>
                    <th className="pb-3 pl-3 text-right">You Save</th>
                  </tr>
                </thead>
                <tbody>
                  {LAB_ROWS.map((row) => (
                    <tr key={row.name} className="border-t border-white/10">
                      <td className="py-2.5 pr-4 font-semibold text-white">
                        {row.name}
                        {row.note && (
                          <span className="ml-2 hidden text-xs font-normal text-slate-400 sm:inline">
                            {row.note}
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 pr-4 text-right tabular-nums text-slate-400 line-through decoration-slate-500">
                        {usd(row.retail)}
                      </td>
                      <td
                        className="px-3 py-2.5 text-right text-lg font-black tabular-nums text-white"
                        style={{ background: `rgba(${dpcA.rgb},0.12)` }}
                      >
                        {usd(row.member)}
                      </td>
                      <td className="py-2.5 pl-3 text-right">
                        <span
                          className="inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold tabular-nums"
                          style={{
                            color: `rgba(${dpcA.rgb},1)`,
                            background: `rgba(${dpcA.rgb},0.12)`,
                            border: `1px solid rgba(${dpcA.rgb},0.3)`,
                          }}
                        >
                          {pctOff(row.member, row.retail)}% off · {times(row.member, row.retail)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-white/25 text-base font-black">
                    <td className="pt-3 pr-4 text-white">All {LAB_ROWS.length} labs</td>
                    <td className="pt-3 pr-4 text-right tabular-nums text-slate-400 line-through decoration-slate-500">
                      {usd(LAB_RETAIL_TOTAL)}
                    </td>
                    <td
                      className="rounded-b-xl px-3 pb-2 pt-3 text-right text-lg tabular-nums"
                      style={{ color: `rgba(${dpcA.rgb},1)`, background: `rgba(${dpcA.rgb},0.12)` }}
                    >
                      {usd(LAB_MEMBER_TOTAL)}
                    </td>
                    <td className="pt-3 pl-3 text-right whitespace-nowrap tabular-nums text-white">
                      {pctOff(LAB_MEMBER_TOTAL, LAB_RETAIL_TOTAL)}% off · {times(LAB_MEMBER_TOTAL, LAB_RETAIL_TOTAL)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <p className="mt-6 text-xs leading-5 text-slate-400">
              Retail prices are published direct-to-consumer list prices from a major national
              lab, captured July 2026, and don&rsquo;t include the physician-order fee those
              services add at checkout. Member pricing has no draw fee and no add-ons — the
              price you see is the price you pay.
            </p>
          </div>
        </div>
      </div>
      </section>

      {/* ── 4. HYPERBARIC ─────────────────────────────────────────────── */}
      <section id="hyperbaric" className="scroll-mt-20 py-8 lg:py-10">
        <div className="mx-auto max-w-6xl px-4 lg:px-8"><div className="mx-auto max-w-5xl">
          <div
            className="rounded-[34px] border p-8 text-center lg:p-12"
            style={{
              borderColor: `rgba(${hboA.rgb},0.25)`,
              background: `linear-gradient(160deg, rgba(${hboA.rgb},0.1), hsla(210,22%,16%,0.75))`,
              boxShadow: "0 24px 80px rgba(7,10,18,0.4)",
            }}
          >
            <Eyebrow color={`rgba(${hboA.rgb},0.9)`}>Hyperbaric — Opening {hbot.openingDate}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Session pricing announced at launch.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              Our {hbot.pressure} clinical-grade hyperbaric chamber opens {hbot.openingDate}. Join the waitlist
              now and lock in {hbot.earlyAccessDiscountPercent}% off early-access pricing when sessions go on sale.
            </p>
            <div className="mt-8 flex justify-center">
              <TrackedLink
                href="/hyperbaric"
                analytics={{ page: PAGE, source: "pricing-hbot", service: "hyperbaric", label: "Join the Waitlist" }}
                className="rounded-full px-8 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-85"
                style={{ background: `linear-gradient(135deg, ${hboA.from}, ${hboA.to})` }}
              >
                Join the Waitlist
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
      </section>

      <PageCtaFooter
        service="brand"
        heading="Not sure which fits?"
        body="Start with a free Meet & Greet — no commitment, no paperwork. We'll walk through your goals and tell you honestly which plan (if any) makes sense."
      />
    </div>
  );
}
