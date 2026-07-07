import type { Metadata } from "next";
import { Network } from "lucide-react";
import { ComingSoonService } from "@/components/ComingSoonService";

export const metadata: Metadata = {
  alternates: { canonical: "/referrals-care-coordination" },
  title: "Referrals & Care Coordination Colorado Springs | Specialist Connections & Insurance Help",
  description: "Expert care coordination in Colorado Springs. Connect with specialists offering transparent pricing, coordinate care between providers, and get help finding affordable catastrophic health insurance coverage.",
  keywords: "care coordination Colorado Springs, specialist referrals Colorado Springs, transparent pricing specialists, medical referrals, health insurance guidance",
};

export default function Page() {
  return (
    <ComingSoonService
      service="brand"
      icon={Network}
      eyebrow="Connecting You to the Right Care"
      title="Referrals & Care Coordination"
      description="Need specialty care? We connect you with trusted providers offering transparent pricing and help coordinate your care. We also work with health insurance brokers to help you find cost-effective catastrophic coverage for hospitalization, emergencies, and specialty procedures."
      bullets={['Specialist connections', 'Transparent pricing', 'Insurance guidance']}
    />
  );
}
