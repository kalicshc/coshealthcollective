import type { Metadata } from "next";
import { Users } from "lucide-react";
import { ComingSoonService } from "@/components/ComingSoonService";

export const metadata: Metadata = {
  alternates: { canonical: "/health-coaching" },
  title: "Health Coaching & Patient Advocate Colorado Springs | Navigate Your Wellness",
  description: "Health coaching and patient advocacy services in Colorado Springs. Navigate the medical system with confidence, understand your health better, and take control of your wellness journey.",
};

export default function Page() {
  return (
    <ComingSoonService
      service="brand"
      icon={Users}
      eyebrow="Navigate Your Wellness Journey"
      title="Health Coaching & Patient Advocacy"
      description="Already have a provider but want to understand your health better? We meet at regular scheduled intervals (weekly sessions recommended) to work together on what's working and what's not on your wellness journey. Navigate the medical system with confidence and take control of your health."
      bullets={['Weekly coaching sessions', 'Medical system navigation', 'Patient advocacy']}
    />
  );
}
