import type { Metadata } from "next";
import WomensHormonePathway from "@/components/WomensHormonePathway";

export const metadata: Metadata = {
  title: "Women's Hormone Quiz | Colorado Springs Health Collective",
  description:
    "A free hormone assessment using the Greene Climacteric Scale. Identify whether progesterone, estrogen, or testosterone is driving your symptoms — no email required until the end.",
};

export default function WomensHealthQuizPage() {
  return (
    <div className="page-bg pt-28">
      <section className="py-0">
        <div className="mx-auto max-w-7xl px-0 md:px-4 lg:px-8">
          <WomensHormonePathway />
        </div>
      </section>
    </div>
  );
}
