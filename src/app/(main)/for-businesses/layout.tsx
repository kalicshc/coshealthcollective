import type { Metadata } from "next";
import { serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "DPC for Businesses Colorado Springs | Employee Healthcare Benefit | CSHC",
  description:
    "Offer your team real primary care as a tax-deductible business benefit. CSHC Direct Primary Care for employers — fewer sick days, happier employees, transparent pricing.",
  keywords: [
    "DPC for businesses Colorado Springs",
    "employee healthcare benefit Colorado Springs",
    "group direct primary care",
    "employer DPC plan",
    "small business health benefits Colorado Springs",
    "direct primary care employer benefit",
    "tax-deductible healthcare benefit",
  ],
  alternates: { canonical: "/for-businesses" },
  openGraph: {
    title: "DPC for Businesses | Colorado Springs Health Collective",
    description:
      "Give your employees same-day care, direct provider access, and no copays. DPC as a company benefit in Colorado Springs.",
    url: "https://coshealthcollective.com/for-businesses",
    images: [{ url: "/images/dpc/business-hero.webp", alt: "DPC for Businesses — Colorado Springs Health Collective" }],
  },
};

// JSON-LD lives in the layout because the page itself is a client component.
const forBusinessesSchema = serviceSchema({
  type: "Service",
  name: "Direct Primary Care for Businesses",
  description:
    "Offer your team real primary care as a tax-deductible business benefit. CSHC Direct Primary Care for employers — fewer sick days, happier employees, transparent pricing.",
  path: "/for-businesses",
  image: "/images/dpc/business-hero.webp",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={forBusinessesSchema} />
      {children}
    </>
  );
}
