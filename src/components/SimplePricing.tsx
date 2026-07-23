import { clinicFacts, usd } from "@/lib/clinicFacts";
import { ACCENTS, type ServiceKey } from "@/lib/accents";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { Eyebrow } from "@/components/SceneSection";

/**
 * The simple per-clinic price statement: one big monthly number, the derived
 * first-month total, and a "Full Pricing Details" button to /pricing. The
 * full comparison table lives ONLY on /pricing (PricingColumns) — clinic
 * pages use this so there is a single surface to keep in sync.
 */

const { enrollmentFee, dpc, hormone, combo } = clinicFacts;

const separateMonthly = hormone.monthlyManagement + dpc.individualMonthly;
const monthlySavings = separateMonthly - combo.monthly;

export function SimplePricing({
  service,
  page,
  source,
  heading,
  monthly,
  sub,
  note,
}: {
  service: ServiceKey;
  page: string;
  source: string;
  heading: string;
  monthly: number;
  /** One sentence under the price — what the number covers. */
  sub?: string;
  /** Small-print line, e.g. couples/kids pricing or the $89 cream pointer. */
  note?: string;
}) {
  const accent = ACCENTS[service];

  return (
    <div className="text-center">
      <Eyebrow>Pricing</Eyebrow>
      <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">{heading}</h2>
      <div className="mt-8">
        <span className="text-6xl font-black text-white lg:text-7xl">{usd(monthly)}</span>
        <span className="ml-2 text-lg text-slate-400">/ month</span>
      </div>
      <p className="mt-3 text-sm text-slate-400">
        First month {usd(enrollmentFee + monthly)} all-in (incl. one-time {usd(enrollmentFee)} enrollment)
      </p>
      {sub && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{sub}</p>}
      {note && <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">{note}</p>}
      <p className="mx-auto mt-5 max-w-2xl text-sm leading-7" style={{ color: `rgba(${ACCENTS.hormone.rgb},0.9)` }}>
        Bundle primary care + hormone care for {usd(combo.monthly)}/mo — save {usd(monthlySavings)} every month.
      </p>
      <div className="mt-8 flex justify-center">
        <TrackedLink
          href="/pricing"
          analytics={{ page, source: `${source}-full-pricing`, service, label: "Full Pricing Details" }}
          className="rounded-full px-8 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-85"
          style={{ border: `1px solid rgba(${accent.rgb},0.45)`, background: `rgba(${accent.rgb},0.12)` }}
        >
          Full Pricing Details
        </TrackedLink>
      </div>
    </div>
  );
}
