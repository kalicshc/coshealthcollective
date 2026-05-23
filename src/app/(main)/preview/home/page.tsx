import type { Metadata } from "next";
import PreviewHomeClient from "./PreviewHomeClient";

export const metadata: Metadata = {
  title: "Home — Cinematic Draft",
  robots: { index: false, follow: false },
};

export default function PreviewHomePage() {
  return <PreviewHomeClient />;
}
