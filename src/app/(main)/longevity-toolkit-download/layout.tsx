import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Longevity Toolkit Download | Colorado Springs Health Collective",
  description:
    "Download the CSHC Longevity Toolkit — evidence-based habits for a longer, healthier life.",
  alternates: { canonical: "/longevity-toolkit-download" },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
