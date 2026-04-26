import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DPC for Businesses Colorado Springs | Employee Healthcare Benefit | CSHC",
  description:
    "Offer your team real primary care as a tax-deductible business benefit. CSHC Direct Primary Care for employers — fewer sick days, happier employees, transparent pricing.",
  alternates: { canonical: "/for-businesses" },
  openGraph: {
    title: "DPC for Businesses | Colorado Springs Health Collective",
    description:
      "Give your employees same-day care, direct provider access, and no copays. DPC as a company benefit in Colorado Springs.",
    url: "https://coshealthcollective.com/for-businesses",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
