import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clinical Calculators | Colorado Springs Health Collective",
  description: "Evidence-based risk calculators for breast cancer, cardiovascular disease, diabetes, and more — running securely on our site.",
};

const calculators = [
  {
    id: "breast-cancer-risk",
    title: "Breast Cancer Risk",
    model: "Gail Model (NCI BCRAT)",
    description: "Estimates your 5-year and lifetime risk of developing breast cancer based on age, family history, reproductive history, and biopsy results. Validated by the National Cancer Institute.",
    tags: ["Women", "Screening", "Validated"],
    href: "/resources/calculators/breast-cancer-risk",
    gradient: "linear-gradient(135deg, hsl(331,95%,72%), hsl(271,74%,55%))",
    border: "hsla(331,95%,72%,0.22)",
    accentColor: "hsl(331,95%,78%)",
    available: true,
  },
  {
    id: "ascvd",
    title: "ASCVD Risk",
    model: "Pooled Cohort Equations (ACC/AHA)",
    description: "10-year risk of a first atherosclerotic cardiovascular event. Used to guide statin therapy decisions. Based on the ACC/AHA pooled cohort equations.",
    tags: ["Cardiology", "Prevention"],
    href: "/resources/calculators/ascvd",
    gradient: "linear-gradient(135deg, hsl(188,88%,54%), hsl(216,79%,46%))",
    border: "hsla(188,88%,54%,0.22)",
    accentColor: "hsl(188,88%,78%)",
    available: false,
  },
  {
    id: "diabetes-risk",
    title: "Diabetes Risk",
    model: "ADA Diabetes Risk Score",
    description: "Screens for undiagnosed type 2 diabetes and prediabetes using age, BMI, family history, activity level, and blood pressure history.",
    tags: ["Metabolic", "Screening"],
    href: "/resources/calculators/diabetes-risk",
    gradient: "linear-gradient(135deg, hsl(45,90%,60%), hsl(25,95%,55%))",
    border: "hsla(45,90%,60%,0.22)",
    accentColor: "hsl(45,90%,75%)",
    available: false,
  },
];

export default function CalculatorsPage() {
  return (
    <div className="page-bg pt-28 min-h-screen">
      <div className="mx-auto max-w-4xl px-5 lg:px-8 py-16">
        <div className="mb-12">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-70 transition-opacity"
            style={{ color: "hsl(177, 70%, 59%)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Resources
          </Link>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(177, 70%, 59%)" }}>
            Clinical Tools
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">Risk Calculators</h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "hsl(0, 0%, 60%)" }}>
            Validated, evidence-based calculators that run securely here — results stay on your screen, nothing is stored or shared.
          </p>
        </div>

        <div className="space-y-5">
          {calculators.map((calc) => (
            <div
              key={calc.id}
              className="relative rounded-[28px] border p-7"
              style={{
                background: "hsla(210, 22%, 16%, 0.9)",
                borderColor: calc.border,
              }}
            >
              <div className="h-0.5 w-14 rounded-full mb-5" style={{ background: calc.gradient }} />
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {calc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-2.5 py-1 text-xs font-medium"
                        style={{
                          background: "hsla(177, 70%, 59%, 0.1)",
                          border: "1px solid hsla(177, 70%, 59%, 0.2)",
                          color: "hsl(177, 70%, 70%)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {!calc.available && (
                      <span
                        className="rounded-full px-2.5 py-1 text-xs font-medium"
                        style={{
                          background: "hsla(0, 0%, 50%, 0.1)",
                          border: "1px solid hsla(0, 0%, 50%, 0.2)",
                          color: "hsl(0, 0%, 55%)",
                        }}
                      >
                        Coming soon
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">{calc.title}</h2>
                  <p className="text-xs font-semibold mb-3" style={{ color: calc.accentColor, opacity: 0.75 }}>
                    {calc.model}
                  </p>
                  <p className="text-sm leading-7" style={{ color: "hsl(0, 0%, 65%)" }}>
                    {calc.description}
                  </p>
                </div>

                {calc.available ? (
                  <Link
                    href={calc.href}
                    className="mt-2 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-85 whitespace-nowrap"
                    style={{
                      background: calc.gradient,
                      color: "hsl(210, 32%, 10%)",
                    }}
                  >
                    Open calculator
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                ) : (
                  <div
                    className="mt-2 inline-flex rounded-full px-6 py-3 text-sm font-semibold whitespace-nowrap"
                    style={{
                      background: "hsla(0, 0%, 100%, 0.06)",
                      color: "hsl(0, 0%, 45%)",
                      border: "1px solid hsla(0, 0%, 100%, 0.08)",
                    }}
                  >
                    Coming soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-xs text-center leading-6" style={{ color: "hsl(0, 0%, 38%)" }}>
          These calculators are for informational and educational purposes only. Results are not a diagnosis and should always be reviewed with your provider.
        </p>
      </div>
    </div>
  );
}
