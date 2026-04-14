import type { Metadata } from "next";
import Link from "next/link";
import { Droplets, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Mobile IV Therapy Colorado Springs | IV Hydration Delivered to Your Home",
  description: "Mobile IV hydration delivered to your home or office in Colorado Springs. Normal Saline, headache cocktails, nausea meds, and upset stomach relief available.",
  keywords: "mobile IV therapy Colorado Springs, IV hydration Colorado Springs, IV therapy at home, mobile IV hydration, in-home IV therapy, IV drip Colorado Springs",
};

export default function IVTherapy() {
  return (
    <div className="page-bg flex items-center justify-center">
      <div className="container mx-auto px-5 lg:px-8 text-center py-32">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(200, 70%, 59%), hsl(177, 70%, 59%))" }}>
            <Droplets className="w-12 h-12 lg:w-16 lg:h-16" style={{ color: "hsl(210, 32%, 12%)" }} />
          </div>
        </div>
        <span className="inline-block px-6 py-2 text-sm font-medium rounded-full mb-8" style={{ background: "linear-gradient(135deg, hsl(200, 70%, 59%), hsl(177, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}>
          Mobile Hydration
        </span>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6" style={{ color: "hsl(0, 0%, 100%)" }}>Mobile IV Therapy</h1>
        <p className="text-xl lg:text-2xl font-light mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: "hsl(210, 40%, 89%)" }}>
          Mobile IV hydration therapy delivered to your home or office. We offer Normal Saline, headache cocktails, nausea meds, and upset stomach relief.
        </p>
        <p className="text-lg mb-8" style={{ color: "hsl(177, 70%, 59%)" }}>
          Call or text us for details: <span className="font-bold">(719) 824-4716</span>
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(30, 75%, 60%))", color: "hsl(210, 32%, 12%)" }}>
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
