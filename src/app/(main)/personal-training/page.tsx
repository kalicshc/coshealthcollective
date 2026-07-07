import type { Metadata } from "next";
import { Dumbbell } from "lucide-react";
import { ComingSoonService } from "@/components/ComingSoonService";

export const metadata: Metadata = {
  alternates: { canonical: "/personal-training" },
  title: "Personal Training Colorado Springs | Strength Training & Fitness Plans",
  description: "Personalized strength and fitness training in Colorado Springs. Custom workout plans tailored to your goals, abilities, and lifestyle. Focus on education, proper technique, injury prevention, and lasting results.",
};

export default function Page() {
  return (
    <ComingSoonService
      service="brand"
      icon={Dumbbell}
      eyebrow="Personalized Fitness"
      title="Personal Training"
      description="Personalized strength and fitness plans tailored to your goals, abilities, and lifestyle. Focus on education and proper strength training techniques to prevent injury and achieve lasting results."
      bullets={['Custom workout plans', 'Technique & injury prevention', 'Lasting results']}
    />
  );
}
