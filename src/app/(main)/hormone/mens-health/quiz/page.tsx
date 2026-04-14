import type { Metadata } from "next";
import MensHormonePathway from "@/components/MensHormonePathway";

export const metadata: Metadata = {
  title: "Men's Hormone + TRT Quiz | Colorado Springs Health Collective",
  description: "A no-email men's hormone and TRT assessment to help identify what may be driving fatigue, low libido, poor recovery, or TRT issues.",
};

export default function MensHealthQuizPage() {
  return (
    <div className="page-bg pt-28">
      <section className="py-0">
        <div className="mx-auto max-w-7xl px-0 md:px-4 lg:px-8">
          <MensHormonePathway />
        </div>
      </section>
    </div>
  );
}
