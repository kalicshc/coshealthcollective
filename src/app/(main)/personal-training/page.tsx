import type { Metadata } from "next";
import { Dumbbell } from "lucide-react";
import { ComingSoonService } from "@/components/ComingSoonService";

export const metadata: Metadata = {
  alternates: { canonical: "/personal-training" },
  title: "Personal Training & Wellness Coaching Colorado Springs | Strength, Fitness & Health Coaching",
  description: "Personalized strength training and wellness coaching in Colorado Springs. Custom workout plans, nutrition guidance, stress reduction, and health navigation — tailored to your goals, abilities, and lifestyle.",
};

export default function Page() {
  return (
    <ComingSoonService
      service="brand"
      icon={Dumbbell}
      eyebrow="Fitness & Whole-Person Coaching"
      title="Personal Training & Wellness Coaching"
      description="Personalized strength and fitness plans tailored to your goals, abilities, and lifestyle — with education and proper technique to prevent injury and build lasting results. Coaching extends beyond the gym when you want it to: nutrition guidance, stress reduction, and health navigation for complete mind-body wellness."
      bullets={['Custom workout plans', 'Technique & injury prevention', 'Nutrition & stress guidance', 'Lasting results']}
    />
  );
}
