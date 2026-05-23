import PreviewHomeClient from "./preview/home/PreviewHomeClient";

// Homepage is now the cinematic aurora photo-flythrough (raw, un-color-graded
// photos: empty masks skip the per-scene tint layer). The previous section-based
// homepage is preserved in page-classic.tsx.bak if we ever need to revert.
// Page-level metadata still comes from src/app/(main)/layout.tsx.
const AURORA_IMAGES = [
  "/preview/aurora1.webp", // DPC
  "/preview/aurora2.webp", // Hormone
  "/preview/aurora3.webp", // Hyperbaric
  "/preview/aurora4.webp", // Our Story
  "/preview/aurora5-night.webp", // Reviews
  "/preview/aurora6.webp", // Our Journey — sunrise
];

const NO_MASKS = ["", "", "", "", "", ""];

export default function Home() {
  return (
    <>
      {/* SEO: keyword-rich H1 (visually hidden) + clinic structured data, carried
          over from the previous homepage so search ranking doesn't regress. */}
      <h1 className="sr-only">
        Colorado Springs Health Collective — Direct Primary Care, Hormone Therapy &amp; Hyperbaric Oxygen in Colorado Springs, CO.
      </h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            name: "Colorado Springs Health Collective",
            aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "6", bestRating: "5" },
          }),
        }}
      />
      <PreviewHomeClient images={AURORA_IMAGES} masks={NO_MASKS} label="" />
    </>
  );
}
