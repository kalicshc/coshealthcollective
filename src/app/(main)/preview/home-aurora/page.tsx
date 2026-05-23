import type { Metadata } from "next";
import PreviewHomeClient from "../home/PreviewHomeClient";

export const metadata: Metadata = {
  title: "Home — Aurora Draft",
  robots: { index: false, follow: false },
};

// Original photos. Each scene's aurora is recolored by a per-scene tint layer in
// PhotoFlythrough (masked to the ribbons), so the natural hue of each photo doesn't
// matter — and because the tint lives inside the scene, its color crossfades in
// lockstep with the photo.
const AURORA_IMAGES = [
  "/preview/aurora1.webp", // DPC
  "/preview/aurora2.webp", // Hormone
  "/preview/aurora3.webp", // Hyperbaric
  "/preview/aurora4.webp", // Our Story
  "/preview/aurora5-night.webp", // Reviews — darker night sky so the aurora pops
  "/preview/aurora6.webp", // Our Journey — sunrise (no tint)
];

// Masks that isolate ONLY the aurora ribbons in each photo — the tint recolors
// just these pixels, never the sky/mountains. Sunrise (slot 5) gets no tint.
const AURORA_MASKS = [
  "/preview/aurora1-mask.png",
  "/preview/aurora2-mask.png",
  "/preview/aurora3-mask.png",
  "/preview/aurora4-mask.png",
  "/preview/aurora5-mask.png",
  "",
];

export default function PreviewHomeAuroraPage() {
  return <PreviewHomeClient images={AURORA_IMAGES} masks={AURORA_MASKS} label="Preview · Aurora" />;
}
