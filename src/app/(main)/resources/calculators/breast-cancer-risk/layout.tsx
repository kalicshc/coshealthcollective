import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Breast Cancer Risk Calculator (BCRAT / Gail Model) | CSHC Colorado Springs",
  description:
    "Free 5-year and lifetime breast cancer risk assessment using the validated NCI BCRAT (Gail) model. Educational tool from Colorado Springs Health Collective — not a substitute for medical advice.",
  alternates: { canonical: "/resources/calculators/breast-cancer-risk" },
  openGraph: {
    title: "Breast Cancer Risk Calculator | Colorado Springs Health Collective",
    description:
      "Estimate your 5-year and lifetime breast cancer risk with the validated NCI Gail model.",
    url: "https://coshealthcollective.com/resources/calculators/breast-cancer-risk",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
