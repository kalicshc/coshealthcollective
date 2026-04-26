import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Direct Primary Care Colorado Springs | $100/Month Unlimited Primary Care",
  description:
    "CSHC Direct Primary Care in Colorado Springs — $100/month for unlimited visits, same-day access, no copays, and labs at cost. Real primary care without insurance red tape.",
  alternates: { canonical: "/direct-primary-care" },
  openGraph: {
    title: "Direct Primary Care Colorado Springs | $100/Month | CSHC",
    description:
      "Unlimited primary care visits, same-day access, and at-cost labs for $100/month. No insurance. No copays. Just a provider who knows your name.",
    url: "https://coshealthcollective.com/direct-primary-care",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
