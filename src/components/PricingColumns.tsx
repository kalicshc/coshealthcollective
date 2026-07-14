import { clinicFacts, usd } from "@/lib/clinicFacts";
import { ACCENTS } from "@/lib/accents";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { bookingUrl, hintLink } from "@/lib/bookingLinks";

/**
 * The unified three-column pricing table: DPC | Hormone | DPC + Hormone.
 * One rule everywhere — a one-time enrollment fee (clinicFacts.enrollmentFee)
 * plus a flat monthly rate — so every plan reads the same way. The hormone
 * column is relabeled per page (HRT / TRT / GLP-1); the combo column is
 * always the highlighted "best value."
 *
 * All dollar amounts come from clinicFacts; first-month totals and the
 * $/mo savings are derived here so a price change stays consistent.
 */

const { enrollmentFee, dpc, hormone, combo } = clinicFacts;

const dpcA = ACCENTS.dpc;
const horA = ACCENTS.hormone;

const separateMonthly = hormone.monthlyManagement + dpc.individualMonthly;
const monthlySavings = separateMonthly - combo.monthly;

type Perspective = "womens" | "mens" | "glp1" | "dpc";

const HORMONE_NAME: Record<Perspective, string> = {
  womens: "Hormone Care",
  mens: "TRT",
  glp1: "GLP-1",
  dpc: "Hormone / TRT",
};

const COMBO_NAME: Record<Perspective, string> = {
  womens: "DPC + Hormone",
  mens: "DPC + TRT",
  glp1: "DPC + GLP-1",
  dpc: "DPC + Hormone",
};

const HORMONE_BULLETS: Record<Perspective, string[]> = {
  womens: [
    "Comprehensive consult in your first month",
    "Labs ordered & reviewed with you",
    "Personalized HRT plan for your stage of life",
    "Ongoing management & adjustments",
  ],
  mens: [
    "Full hormone panel — not just testosterone",
    "Labs ordered & reviewed with you",
    "TRT or the honest alternative, fertility-aware",
    "Ongoing management & adjustments",
  ],
  glp1: [
    "Metabolic review before any prescription",
    "Labs ordered & reviewed with you",
    "Semaglutide or tirzepatide, matched to you",
    "Body composition tracked through treatment",
  ],
  dpc: [
    "Women's HRT, men's TRT & GLP-1 weight loss",
    "Comprehensive consult in your first month",
    "Labs ordered & reviewed with you",
    "Ongoing management & adjustments",
  ],
};

export function PricingColumns({
  perspective,
  page,
  source,
}: {
  perspective: Perspective;
  page: string;
  source: string;
}) {
  const hormoneName = HORMONE_NAME[perspective];
  const comboName = COMBO_NAME[perspective];

  const plans = [
    {
      key: "dpc",
      name: "Primary Care (DPC)",
      monthly: dpc.individualMonthly,
      accentRgb: dpcA.rgb,
      gradFrom: dpcA.from,
      gradTo: dpcA.to,
      highlight: false,
      bullets: [
        "Unlimited visits — office, telehealth & in-home",
        "Direct text access to your provider",
        "Same-day / next-day appointments",
        "Labs & medications at or near cost",
      ],
      footnote:
        perspective === "dpc"
          ? `Couples ${usd(dpc.couplesMonthly)}/mo · kids +${usd(dpc.childAddOnMonthly)}/mo (age ${dpc.childAgeMin}+)`
          : "Couples & family plans available",
      cta:
        perspective === "dpc"
          ? { label: "Become a Member", href: hintLink("dpcMembershipSignup", `${source}-dpc`), appt: undefined }
          : { label: "Free Meet & Greet", href: bookingUrl("meetGreet", `${source}-dpc`), appt: "meetGreet" as const },
    },
    {
      key: "hormone",
      name: hormoneName,
      monthly: hormone.monthlyManagement,
      accentRgb: horA.rgb,
      gradFrom: horA.from,
      gradTo: horA.to,
      highlight: false,
      bullets: HORMONE_BULLETS[perspective],
      footnote: "Labs & medications billed separately",
      cta: { label: "Free Consult", href: bookingUrl("freeConsult", `${source}-hormone`), appt: "freeConsult" as const },
    },
    {
      key: "combo",
      name: comboName,
      monthly: combo.monthly,
      accentRgb: horA.rgb,
      gradFrom: horA.from,
      gradTo: dpcA.to,
      highlight: true,
      bullets: [
        "Everything in both memberships",
        "One care team for your whole picture",
        `Save ${usd(monthlySavings)} every month`,
        "One enrollment fee — not two",
      ],
      footnote: `${usd(separateMonthly)}/mo value — bundled`,
      cta: { label: "Free Consult", href: bookingUrl("freeConsult", `${source}-combo`), appt: "freeConsult" as const },
    },
  ];

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.key}
            className="relative flex flex-col rounded-[28px] border p-7"
            style={
              plan.highlight
                ? {
                    borderColor: `rgba(${horA.rgb},0.45)`,
                    background: `linear-gradient(160deg, rgba(${horA.rgb},0.16), rgba(${dpcA.rgb},0.14), hsla(210,22%,16%,0.75))`,
                    boxShadow: `0 24px 80px rgba(7,10,18,0.4), 0 0 0 1px rgba(${horA.rgb},0.12)`,
                  }
                : {
                    borderColor: `rgba(${plan.accentRgb},0.2)`,
                    background: `linear-gradient(160deg, rgba(${plan.accentRgb},0.1), hsla(210,22%,16%,0.72))`,
                    boxShadow: "0 20px 60px rgba(7,10,18,0.3)",
                  }
            }
          >
            {plan.highlight && (
              <span
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border px-4 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
                style={{
                  background: `linear-gradient(135deg, ${horA.from}, ${dpcA.to})`,
                  borderColor: "rgba(255,255,255,0.25)",
                }}
              >
                Best Value
              </span>
            )}
            <div
              className="h-0.5 w-12 rounded-full"
              style={{ background: `linear-gradient(135deg, ${plan.gradFrom}, ${plan.gradTo})` }}
            />
            <h3 className="mt-5 text-lg font-black text-white">{plan.name}</h3>
            <div className="mt-3">
              <span className="text-4xl font-black text-white">{usd(plan.monthly)}</span>
              <span className="ml-1.5 text-sm text-slate-400">/ month</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-400">
              First month {usd(enrollmentFee + plan.monthly)} all-in (incl. one-time {usd(enrollmentFee)} enrollment)
            </p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {plan.bullets.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-6 text-slate-200">
                  <span aria-hidden="true" className="mt-0.5 font-bold" style={{ color: `rgb(${plan.accentRgb})` }}>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-400">{plan.footnote}</p>
            <TrackedLink
              href={plan.cta.href}
              analytics={{ page, source: `${source}-${plan.key}`, service: plan.key === "dpc" ? "dpc" : "hormone", appt: plan.cta.appt, label: plan.cta.label }}
              className={`mt-5 rounded-full px-6 py-3 text-center text-sm font-bold transition-opacity hover:opacity-85 ${plan.highlight ? "text-white" : ""}`}
              style={
                plan.highlight
                  ? { background: `linear-gradient(135deg, ${horA.from}, ${dpcA.to})` }
                  : { border: `1px solid rgba(${plan.accentRgb},0.4)`, color: "#fff", background: "rgba(255,255,255,0.04)" }
              }
            >
              {plan.cta.label}
            </TrackedLink>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm leading-7 text-slate-400">
        Every plan: one-time {usd(enrollmentFee)} enrollment, flat monthly rate, no contracts — cancel anytime.
        Hormone plans include the comprehensive consult, lab ordering, and lab review in your first month.
        Labs and medications billed separately.
      </p>
    </div>
  );
}
