import { ACCENTS, type ServiceKey } from "@/lib/accents";
import { ACCEPTING_NEW_PATIENTS, waitlistUrl, type WaitlistInterest } from "@/lib/bookingLinks";
import { TrackedLink } from "@/components/analytics/TrackedLink";

/**
 * The one-line "we're full" notice. Drop it under a service hero so a visitor
 * learns we're not taking new patients before they read a page of pitch.
 *
 * Renders nothing when ACCEPTING_NEW_PATIENTS is true, so it can stay in
 * place through the pause and out the other side (src/lib/bookingLinks.ts).
 *
 * Copy is deliberately flat — state the fact, offer the waitlist, stop. No
 * urgency, no scarcity, no date. Server component.
 */

export function WaitlistNotice({
  service = "brand",
  interest,
  source,
}: {
  service?: ServiceKey;
  interest?: WaitlistInterest;
  source: string;
}) {
  if (ACCEPTING_NEW_PATIENTS) return null;
  const a = ACCENTS[service];
  return (
    <div className="mx-auto max-w-3xl px-5 pt-8 lg:px-8">
      <div
        className="flex flex-col items-center gap-2 rounded-2xl px-5 py-4 text-center sm:flex-row sm:justify-center sm:gap-3 sm:text-left"
        style={{
          background: `rgba(${a.rgb},0.07)`,
          border: `1px solid rgba(${a.rgb},0.22)`,
        }}
      >
        <p className="text-[14px] leading-relaxed" style={{ color: "hsl(210,25%,78%)" }}>
          We&apos;re not accepting new patients right now. Join the waitlist and we&apos;ll reach out as
          soon as we have availability.
        </p>
        <TrackedLink
          href={waitlistUrl(source, interest)}
          analytics={{ source, service, label: "Waitlist notice" }}
          className="shrink-0 whitespace-nowrap text-[13px] font-bold underline underline-offset-4 hover:opacity-80"
          style={{ color: `rgb(${a.rgb})` }}
        >
          Join the waitlist →
        </TrackedLink>
      </div>
    </div>
  );
}
