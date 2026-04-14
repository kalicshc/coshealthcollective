import type { Metadata } from "next";
import Link from "next/link";
import { Network, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Referrals & Care Coordination Colorado Springs | Specialist Connections & Insurance Help",
  description: "Expert care coordination in Colorado Springs. Connect with specialists offering transparent pricing, coordinate care between providers, and get help finding affordable catastrophic health insurance coverage.",
  keywords: "care coordination Colorado Springs, specialist referrals Colorado Springs, transparent pricing specialists, medical referrals, health insurance guidance",
};

export default function ReferralsCareCoordination() {
  return (
    <div className="page-bg flex items-center justify-center">
      <div className="container mx-auto px-5 lg:px-8 text-center py-32">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(260, 70%, 65%), hsl(280, 70%, 67%))" }}>
            <Network className="w-12 h-12 lg:w-16 lg:h-16" style={{ color: "hsl(210, 32%, 12%)" }} />
          </div>
        </div>
        <span className="inline-block px-6 py-2 text-sm font-medium rounded-full mb-8" style={{ background: "linear-gradient(135deg, hsl(260, 70%, 65%), hsl(280, 70%, 67%))", color: "hsl(210, 32%, 12%)" }}>
          Connecting You to the Right Care
        </span>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6" style={{ color: "hsl(0, 0%, 100%)" }}>Referrals & Care Coordination</h1>
        <p className="text-xl lg:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed" style={{ color: "hsl(210, 40%, 89%)" }}>
          Need specialty care? We connect you with trusted providers offering transparent pricing and help coordinate your care. We also work with health insurance brokers to help you find cost-effective catastrophic coverage for hospitalization, emergencies, and specialty procedures.
        </p>
        <p className="text-lg mb-8" style={{ color: "hsl(210, 25%, 69%)" }}>Full service details coming soon. Contact us to learn more.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(30, 75%, 60%))", color: "hsl(210, 32%, 12%)" }}>
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
