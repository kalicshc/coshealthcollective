import type { Metadata } from "next";
import { Dumbbell } from "lucide-react";
import { ComingSoonService } from "@/components/ComingSoonService";

export const metadata: Metadata = {
  alternates: { canonical: "/strength-wellness-coaching" },
  title: "Strength & Wellness Coaching Colorado Springs | Holistic Fitness & Health Coaching",
  description: "Holistic strength and wellness coaching in Colorado Springs. Personalized fitness plans, nutrition guidance, stress reduction techniques, and health navigation. Complete mind-body wellness.",
  keywords: "strength training Colorado Springs, wellness coaching Colorado Springs, holistic fitness, nutrition coaching, stress reduction, mindfulness coaching, health coaching",
};

export default function Page() {
  return (
    <ComingSoonService
      service="brand"
      icon={Dumbbell}
      eyebrow="Holistic Mind-Body Coaching"
      title="Strength & Wellness Coaching"
      description="Holistic coaching for complete mind-body wellness. Integrating personalized fitness training, nutrition guidance, stress reduction techniques, mindfulness practices, and health navigation to support your whole self — body, mind, and spirit."
      bullets={['Fitness & nutrition', 'Stress reduction & mindfulness', 'Health navigation']}
    />
  );
}
