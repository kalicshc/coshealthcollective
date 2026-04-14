import type { Metadata } from "next";
import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Strength & Wellness Coaching Colorado Springs | Holistic Fitness & Health Coaching",
  description: "Holistic strength and wellness coaching in Colorado Springs. Personalized fitness plans, nutrition guidance, stress reduction techniques, and health navigation. Complete mind-body wellness.",
  keywords: "strength training Colorado Springs, wellness coaching Colorado Springs, holistic fitness, nutrition coaching, stress reduction, mindfulness coaching, health coaching",
};

export default function StrengthWellnessCoaching() {
  return (
    <div className="page-bg flex items-center justify-center">
      <div className="container mx-auto px-5 lg:px-8 text-center py-32">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(190, 70%, 58%), hsl(210, 70%, 60%))" }}>
            <Dumbbell className="w-12 h-12 lg:w-16 lg:h-16" style={{ color: "hsl(210, 32%, 12%)" }} />
          </div>
        </div>
        <span className="inline-block px-6 py-2 text-sm font-medium rounded-full mb-8" style={{ background: "linear-gradient(135deg, hsl(190, 70%, 58%), hsl(210, 70%, 60%))", color: "hsl(210, 32%, 12%)" }}>
          Holistic Mind-Body Coaching
        </span>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6" style={{ color: "hsl(0, 0%, 100%)" }}>Strength & Wellness Coaching</h1>
        <p className="text-xl lg:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed" style={{ color: "hsl(210, 40%, 89%)" }}>
          Holistic coaching for complete mind-body wellness. Integrating personalized fitness training, nutrition guidance, stress reduction techniques, mindfulness practices, and health navigation to support your whole self—body, mind, and spirit.
        </p>
        <p className="text-lg mb-8" style={{ color: "hsl(210, 25%, 69%)" }}>Full service details coming soon. Contact us to learn more.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg" style={{ background: "linear-gradient(135deg, hsl(177, 70%, 59%), hsl(30, 75%, 60%))", color: "hsl(210, 32%, 12%)" }}>
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
