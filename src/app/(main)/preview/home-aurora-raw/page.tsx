import type { Metadata } from "next";
import PreviewHomeClient from "../home/PreviewHomeClient";

export const metadata: Metadata = {
  title: "Home — Aurora Draft (Raw, no color grading)",
  robots: { index: false, follow: false },
};

// Same six original photos as /preview/home-aurora — but with NO masks, so the
// per-scene AuroraTint layer is skipped entirely (it returns null when there's no
// mask). This shows the aurora photos in their natural, untouched hues — i.e. what
// the flythrough looked like before any color-gradient grading was applied.
const AURORA_IMAGES = [
  "/preview/aurora1.webp", // DPC
  "/preview/aurora2.webp", // Hormone
  "/preview/aurora3.webp", // Hyperbaric
  "/preview/aurora4.webp", // Our Story
  "/preview/aurora5-night.webp", // Reviews
  "/preview/aurora6.webp", // Our Journey — sunrise
];

// Empty strings → AuroraTint renders nothing → raw, ungraded photos.
const NO_MASKS = ["", "", "", "", "", ""];

export default function PreviewHomeAuroraRawPage() {
  return <PreviewHomeClient images={AURORA_IMAGES} masks={NO_MASKS} label="Preview · Aurora (raw)" />;
}
