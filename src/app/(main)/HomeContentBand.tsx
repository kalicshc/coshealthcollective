import Link from "next/link";
import { clinicFacts, usd } from "@/lib/clinicFacts";
import { ReviewStrip } from "@/components/ReviewStrip";
import { CredentialHero } from "@/components/CredentialHero";
import { TrackedLink } from "@/components/analytics/TrackedLink";

// Server-rendered content below the cinematic flythrough. The flythrough is a
// client component whose text search engines and AI assistants can't read —
// this band is the homepage's crawlable substance (services, location, FAQ),
// and a landing spot for visitors who scroll past the journey.

const SERVICES = [
  {
    href: "/direct-primary-care",
    accent: "64,150,246",
    kicker: "Now Enrolling",
    title: "Direct Primary Care",
    body: `A membership with your own provider for ${usd(clinicFacts.dpc.individualMonthly)}/month — unlimited visits, same-day access, no copays, wholesale labs and medications. Couples ${usd(clinicFacts.dpc.couplesMonthly)}/month.`,
    cta: "Explore DPC membership",
  },
  {
    href: "/hormone",
    accent: "210,80,250",
    kicker: "Now Open",
    title: "Hormone & Metabolic Clinic",
    body: `HRT for perimenopause and menopause, TRT for men, and GLP-1 weight-loss therapy. Initial consult ${usd(clinicFacts.hormone.initialConsult)}, then ${usd(clinicFacts.hormone.monthlyManagement)}/month management.`,
    cta: "Explore hormone care",
  },
  {
    href: "/hyperbaric",
    accent: "20,225,235",
    kicker: `Opening ${clinicFacts.hbot.openingDate}`,
    title: "Hyperbaric Oxygen Therapy",
    body: `True ${clinicFacts.hbot.pressure} hard-shell hyperbaric chambers for recovery, healing, and longevity — join the waitlist for ${clinicFacts.hbot.earlyAccessDiscountPercent}% early-access pricing.`,
    cta: "Explore hyperbaric",
  },
] as const;

const FAQ_TEASERS = [
  "What is Colorado Springs Health Collective?",
  "Do you accept insurance?",
  "Do I need a DPC membership to use the Hormone Clinic or Hyperbaric?",
  "How do I get started?",
] as const;

export function HomeContentBand() {
  return (
    <section aria-label="Our clinics and contact information" className="relative">
      <div className="section-divider" />
      <div className="container mx-auto px-5 lg:px-8 py-16 lg:py-24">
        <h2 className="text-3xl lg:text-4xl font-bold text-white">
          Three clinics. One collective. All in Colorado Springs.
        </h2>
        <p className="mt-4 max-w-3xl text-lg" style={{ color: "hsl(210, 25%, 72%)" }}>
          Colorado Springs Health Collective brings direct primary care, hormone &amp;
          metabolic medicine, and hyperbaric oxygen therapy together under one roof —
          transparent pricing, real relationships with your care team, and no insurance
          games.
        </p>

        <div className="mt-8">
          <ReviewStrip variant="strip" source="home-band-reviews" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <TrackedLink
              key={s.href}
              href={s.href}
              event="cta_click"
              analytics={{ page: "home", source: `home-band-${s.title.toLowerCase().split(" ")[0]}`, label: s.cta }}
              className="service-card-transparent block rounded-2xl p-6"
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: `rgb(${s.accent})` }}
              >
                {s.kicker}
              </p>
              <h3 className="mt-2 text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 72%)" }}>
                {s.body}
              </p>
              {s.href === "/hormone" && (
                <div className="mt-3">
                  <CredentialHero size="chip" />
                </div>
              )}
              <span
                className="mt-4 inline-block text-sm font-semibold"
                style={{ color: `rgb(${s.accent})`, borderBottom: `2px solid rgb(${s.accent})` }}
              >
                {s.cta} →
              </span>
            </TrackedLink>
          ))}
        </div>

        {/* Quiz teasers — the low-commitment on-ramp */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { href: "/hormone/womens-health/quiz", title: "Women's 3-minute symptom quiz", body: "Which hormone is driving your symptoms? Validated scale, no email required until the end.", source: "home-band-quiz-womens" },
            { href: "/hormone/mens-health/quiz", title: "Men's 3-minute symptom quiz", body: "Low T or something else? Get your personalized summary and the labs worth checking.", source: "home-band-quiz-mens" },
          ].map((q) => (
            <TrackedLink
              key={q.href}
              href={q.href}
              event="cta_click"
              analytics={{ page: "home", source: q.source, service: "hormone", label: q.title }}
              className="rounded-2xl p-5 block transition-transform hover:-translate-y-0.5"
              style={{ background: "hsla(210,22%,22%,0.5)", border: "1px solid hsla(290,80%,65%,0.25)", backdropFilter: "blur(12px)" }}
            >
              <p className="text-sm font-bold text-white">{q.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "hsl(210,25%,68%)" }}>{q.body}</p>
              <span className="mt-2 inline-block text-xs font-semibold" style={{ color: "hsl(290,80%,72%)" }}>
                Take the quiz →
              </span>
            </TrackedLink>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-bold text-white">Visit or reach us</h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "hsl(210, 25%, 72%)" }}>
              Serving Colorado Springs, CO and surrounding communities with in-clinic,
              in-home, and telehealth care.
            </p>
            <p className="mt-3 text-sm">
              <a
                href={`tel:${clinicFacts.contact.phoneTel}`}
                className="font-semibold"
                style={{ color: "hsl(177, 70%, 59%)" }}
              >
                {clinicFacts.contact.phone}
              </a>
              <span style={{ color: "hsl(210, 25%, 55%)" }}> · </span>
              <a
                href={`mailto:${clinicFacts.contact.email}`}
                className="font-semibold"
                style={{ color: "hsl(177, 70%, 59%)" }}
              >
                {clinicFacts.contact.email}
              </a>
            </p>
            <p className="mt-4 text-sm">
              <Link href="/urgent-care" className="underline underline-offset-4" style={{ color: "hsl(210, 25%, 72%)" }}>
                Urgent care &amp; telehealth
              </Link>
              <span style={{ color: "hsl(210, 25%, 55%)" }}> · </span>
              <Link href="/about" className="underline underline-offset-4" style={{ color: "hsl(210, 25%, 72%)" }}>
                About us
              </Link>
              <span style={{ color: "hsl(210, 25%, 55%)" }}> · </span>
              <Link href="/blog" className="underline underline-offset-4" style={{ color: "hsl(210, 25%, 72%)" }}>
                Health blog
              </Link>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Common questions</h3>
            <ul className="mt-3 space-y-2">
              {FAQ_TEASERS.map((q) => (
                <li key={q}>
                  <Link
                    href="/faq"
                    className="text-sm underline underline-offset-4"
                    style={{ color: "hsl(210, 25%, 72%)" }}
                  >
                    {q}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
