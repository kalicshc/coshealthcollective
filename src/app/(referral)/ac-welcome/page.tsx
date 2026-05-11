import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { CoBrandedHeader } from "@/components/referral/CoBrandedHeader";
import { InterestForm } from "@/components/referral/InterestForm";
import { clinicFacts } from "@/lib/clinicFacts";

// ─── PLACEHOLDERS — Logan to confirm/replace ───────────────────────────────
const LOGAN_LAST_NAME = "[Last Name]";
const BOOKING_URL =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266";
const QUIZ_URL = "/hormone/womens-health/quiz";
// Placeholder until Logan drops a real photo. Replace with /images/partners/natalie-keefe.jpg when ready.
const NATALIE_PHOTO = "/images/partners/natalie-keefe.svg";
// Activcore brand red — matches their logo
const AC_RED = "hsl(5, 78%, 57%)";
const AC_RED_BORDER = "hsla(5, 78%, 57%, 0.30)";
// ───────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Active Core × COS Health — A welcome for Active Core patients",
  description:
    "A coordinated care welcome for patients referred by Active Core Physical Therapy.",
  robots: { index: false, follow: false },
};

const overlapPills = ["Genitourinary symptoms", "Perimenopause", "Menopause", "Painful sex"];

export default function AcWelcomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "hsl(210, 32%, 9%)" }}>
      {/* Ambient gradient field — teal × red */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 15% 8%, hsla(177,70%,40%,0.20), transparent 55%), radial-gradient(ellipse 65% 50% at 88% 14%, hsla(5,78%,50%,0.18), transparent 55%), radial-gradient(ellipse 60% 50% at 50% 100%, hsla(331,75%,55%,0.08), transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* ─── Hero + Offer (combined, above the fold on desktop) ───────── */}
      <section className="relative pt-12 sm:pt-16 pb-12 sm:pb-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="mb-10 sm:mb-14">
            <CoBrandedHeader size="lg" />
          </div>

          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight mb-5"
              style={{ color: "hsl(0, 0%, 100%)" }}
            >
              You&rsquo;re in good hands at{" "}
              <span style={{ color: AC_RED }}>Active Core.</span>
            </h1>
            <p className="text-lg sm:text-xl font-light leading-relaxed" style={{ color: "hsl(210, 40%, 86%)" }}>
              If hormones are part of the picture, we&rsquo;d love to be part of your team.
            </p>
          </div>

          {/* Offer card */}
          <div
            className="rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto"
            style={{
              background:
                "linear-gradient(135deg, hsla(177, 70%, 35%, 0.20), hsla(5, 78%, 45%, 0.18))",
              border: "1px solid hsla(177, 70%, 59%, 0.30)",
              backdropFilter: "blur(12px)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-center" style={{ color: "hsl(177, 70%, 78%)" }}>
              Active Core patient pricing
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-8 mb-7">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold" style={{ color: "hsl(0, 0%, 100%)" }}>$200</div>
                <div className="text-xs sm:text-sm mt-1" style={{ color: "hsl(210, 40%, 80%)" }}>
                  Initial consult <span style={{ color: "hsl(210, 30%, 60%)" }}>+</span> first month
                </div>
              </div>
              <div className="hidden sm:block w-px h-12" style={{ background: "hsla(177, 70%, 59%, 0.3)" }} />
              <div className="block sm:hidden h-px w-16 mx-auto" style={{ background: "hsla(177, 70%, 59%, 0.3)" }} />
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold" style={{ color: "hsl(0, 0%, 100%)" }}>
                  $100<span className="text-base font-medium" style={{ color: "hsl(210, 40%, 75%)" }}>/mo</span>
                </div>
                <div className="text-xs sm:text-sm mt-1" style={{ color: "hsl(210, 40%, 80%)" }}>
                  Ongoing maintenance
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base transition-transform hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, hsl(177, 70%, 50%), ${AC_RED})`,
                  color: "hsl(210, 32%, 10%)",
                }}
              >
                Schedule consult <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href={QUIZ_URL}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-base"
                style={{
                  border: "1px solid hsla(177, 70%, 59%, 0.45)",
                  color: "hsl(177, 70%, 80%)",
                }}
              >
                Take the quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Opening — three short paragraphs ─────────────────────────── */}
      <section className="relative pb-12 sm:pb-20">
        <div
          className="mx-auto max-w-2xl px-5 sm:px-8 space-y-5 text-base sm:text-lg leading-relaxed"
          style={{ color: "hsl(210, 40%, 86%)" }}
        >
          <p>You picked Active Core for a reason — they&rsquo;re excellent at what they do.</p>
          <p>
            If, somewhere in your work together, the conversation turns to hormones —
            perimenopause, menopause, or something else that&rsquo;s making it harder for your
            body to respond — that&rsquo;s worth taking seriously. They see this every day.
          </p>
          <p>
            That&rsquo;s where we come in. We partner with Active Core because we trust their
            judgment, and because their patients deserve a hormone health resource that
            actually coordinates with their PT instead of starting from scratch.
          </p>
        </div>
      </section>

      {/* ─── Meet your team — two cards side by side ──────────────────── */}
      <section className="relative pb-12 sm:pb-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <h2 className="text-center text-xs font-semibold uppercase tracking-[0.22em] mb-8" style={{ color: "hsl(210, 40%, 70%)" }}>
            Meet your team
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Natalie card */}
            <article
              className="rounded-3xl p-6 sm:p-7 flex gap-5"
              style={{
                background: "hsla(210, 22%, 22%, 0.55)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${AC_RED_BORDER}`,
              }}
            >
              <div
                className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden"
                style={{ background: "hsla(210, 30%, 40%, 0.4)", border: "1px solid hsla(0, 0%, 100%, 0.08)" }}
              >
                {/* Falls back gracefully if file isn't dropped yet */}
                <Image
                  src={NATALIE_PHOTO}
                  alt="Dr. Natalie Keefe, DPT"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 112px"
                />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: AC_RED }}>
                  Active Core
                </div>
                <h3 className="text-xl font-semibold leading-tight mb-1" style={{ color: "hsl(0, 0%, 100%)" }}>
                  Dr. Natalie Keefe
                </h3>
                <p className="text-xs mb-3" style={{ color: "hsl(210, 40%, 70%)" }}>Physical Therapist · she/her</p>
                <ul className="space-y-1 text-sm" style={{ color: "hsl(210, 40%, 84%)" }}>
                  <li>Doctor of Physical Therapy (DPT)</li>
                  <li>Pelvic Health Physical Therapist</li>
                  <li>Dry Needling Certified</li>
                </ul>
              </div>
            </article>

            {/* Logan card */}
            <article
              className="rounded-3xl p-6 sm:p-7 flex gap-5"
              style={{
                background: "hsla(210, 22%, 22%, 0.55)",
                backdropFilter: "blur(12px)",
                border: "1px solid hsla(177, 70%, 59%, 0.30)",
              }}
            >
              <div
                className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden"
                style={{ border: "1px solid hsla(0, 0%, 100%, 0.08)" }}
              >
                <Image
                  src="/logan-photo.png"
                  alt={`Logan ${LOGAN_LAST_NAME}, PA-C`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 112px"
                />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wider mb-1" style={{ color: "hsl(177, 70%, 70%)" }}>
                  COS Health Collective
                </div>
                <h3 className="text-xl font-semibold leading-tight mb-1" style={{ color: "hsl(0, 0%, 100%)" }}>
                  Logan {LOGAN_LAST_NAME}, PA-C
                </h3>
                <p className="text-xs mb-3" style={{ color: "hsl(210, 40%, 70%)" }}>Founder · he/him</p>
                <ul className="space-y-1 text-sm" style={{ color: "hsl(210, 40%, 84%)" }}>
                  <li>Physician Assistant, Certified</li>
                  <li>Women&rsquo;s hormone health focus</li>
                  <li>Direct primary care · Colorado Springs</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─── Where it overlaps — one line + pills ─────────────────────── */}
      <section className="relative pb-12 sm:pb-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <p className="text-base sm:text-lg mb-5" style={{ color: "hsl(210, 40%, 82%)" }}>
            Where pelvic floor work and hormone care{" "}
            <span style={{ color: "hsl(177, 70%, 75%)" }}>overlap</span>:
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {overlapPills.map((label) => (
              <span
                key={label}
                className="inline-block px-4 py-2 rounded-full text-sm sm:text-base font-medium"
                style={{
                  background: "hsla(210, 22%, 22%, 0.6)",
                  border: "1px solid hsla(177, 70%, 59%, 0.25)",
                  color: "hsl(0, 0%, 96%)",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Interest form ────────────────────────────────────────────── */}
      <section className="relative pb-12 sm:pb-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-8">
          <InterestForm />
          <div className="mt-5 text-center">
            <a
              href={`mailto:${clinicFacts.contact.email}?subject=${encodeURIComponent("Question — Active Core referral")}`}
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: "hsl(210, 40%, 78%)" }}
            >
              <Mail className="w-4 h-4" /> Or just email us: {clinicFacts.contact.email}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Quiet close ──────────────────────────────────────────────── */}
      <footer className="relative pt-6 pb-14 sm:pb-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <div className="mb-5 opacity-75">
            <CoBrandedHeader size="sm" />
          </div>
          <p className="text-xs leading-relaxed mx-auto max-w-2xl" style={{ color: "hsl(210, 30%, 60%)" }}>
            Active Core Physical Therapy and Performance and COS Health Collective are
            independent practices that share patients with consent.
          </p>
        </div>
      </footer>
    </div>
  );
}
