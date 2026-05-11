import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Resources & Tools | Colorado Springs Health Collective",
  description:
    "Trusted patient resources from CSHC in Colorado Springs — health calculators, screening guidelines, lab references, and tools to help you make informed decisions about your care.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Patient Resources & Tools | Colorado Springs Health Collective",
    description:
      "Calculators, screening guides, and patient education from Colorado Springs Health Collective.",
    url: "https://coshealthcollective.com/resources",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
