import type { Metadata } from "next";
import { Droplets } from "lucide-react";
import { ComingSoonService } from "@/components/ComingSoonService";
import { serviceSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  alternates: { canonical: "/iv-therapy" },
  title: "Mobile IV Therapy Colorado Springs | IV Hydration Delivered to Your Home",
  description: "Mobile IV hydration delivered to your home or office in Colorado Springs. Normal Saline, headache cocktails, nausea meds, and upset stomach relief available.",
  keywords: "mobile IV therapy Colorado Springs, IV hydration Colorado Springs, IV therapy at home, mobile IV hydration, in-home IV therapy, IV drip Colorado Springs",
};

// Coming-soon service — no offers until it launches.
const ivTherapySchema = serviceSchema({
  type: "Service",
  name: "Mobile IV Therapy",
  description: "Mobile IV hydration delivered to your home or office in Colorado Springs. Normal Saline, headache cocktails, nausea meds, and upset stomach relief available.",
  path: "/iv-therapy",
});

export default function Page() {
  return (
    <>
      <JsonLd data={ivTherapySchema} />
      <ComingSoonService
        service="brand"
        icon={Droplets}
        eyebrow="Mobile Hydration"
        title="Mobile IV Therapy"
        description="Mobile IV hydration therapy delivered to your home or office. We offer Normal Saline, headache cocktails, nausea meds, and upset stomach relief."
        bullets={['Delivered to you', 'Normal Saline & cocktails', 'Headache & nausea relief']}
      />
    </>
  );
}
