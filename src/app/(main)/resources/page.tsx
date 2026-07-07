import Link from "next/link";
import { ChevronDown, Calculator } from "lucide-react";
import { ServiceHero } from "@/components/ServiceHero";
import { MemberPortals } from "@/components/MemberPortals";
import { PageCtaFooter } from "@/components/PageCtaFooter";

// Server component: portal details are in the HTML; only the shared
// <Accordion> inside MemberPortals ships client JS.

export default function ResourcesPage() {
  return (
    <div>
      <ServiceHero
        service="brand"
        eyebrow="Free Resources"
        title="Resources"
        subhead="Everything you need to manage your care — all in one place."
        compact
      />

      <div className="section-divider" />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <MemberPortals />
        </div>
      </section>

      {/* Clinical Calculators */}
      <section className="py-8">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "hsl(45,90%,60%)" }}>
              Clinical Tools
            </p>
            <h2 className="text-2xl font-black text-white">Calculators</h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "hsl(210,25%,62%)" }}>
              Evidence-based risk calculators that run securely on this site — no external links, no data sharing.
            </p>
          </div>

          <Link
            href="/resources/calculators"
            className="group flex items-center gap-5 rounded-2xl p-6 transition-all hover:-translate-y-0.5"
            style={{
              background: "hsla(210,22%,22%,0.5)",
              border: "1px solid hsla(45,90%,60%,0.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(45,90%,60%), hsl(36,90%,52%))" }}
            >
              <Calculator className="w-7 h-7" style={{ color: "hsl(210,32%,10%)" }} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">Risk Calculators</h3>
              <p className="text-sm mt-1" style={{ color: "hsl(210,25%,62%)" }}>
                Breast cancer risk, ASCVD, diabetes risk, and more
              </p>
            </div>
            <ChevronDown
              className="w-5 h-5 -rotate-90 transition-transform group-hover:translate-x-1"
              style={{ color: "hsl(45,90%,60%)" }}
            />
          </Link>
        </div>
      </section>

      <PageCtaFooter
        service="brand"
        heading="Can't find what you need?"
        body="We're happy to help you get set up with any of the portals or point you to the right resource."
      />
    </div>
  );
}
