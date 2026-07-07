import type { Metadata } from "next";
import PreviewHomeClient from "./preview/home/PreviewHomeClient";
import { HomeContentBand } from "./HomeContentBand";

// Homepage is now the cinematic aurora photo-flythrough (raw, un-color-graded
// photos: empty masks skip the per-scene tint layer). The previous section-based
// homepage is preserved in page-classic.tsx.bak if we ever need to revert.
// Title/description/OG come from the root layout; canonical is declared here.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};
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
      {/* SEO: keyword-rich H1 (visually hidden). Clinic structured data lives in
          the root layout's @graph — don't add a second MedicalClinic node here. */}
      <h1 className="sr-only">
        Colorado Springs Health Collective — Direct Primary Care, Hormone Therapy &amp; Hyperbaric Oxygen in Colorado Springs, CO.
      </h1>
      <PreviewHomeClient images={AURORA_IMAGES} masks={NO_MASKS} label="" />
      <HomeContentBand />
    </>
  );
}
