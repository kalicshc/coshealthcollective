import type { Metadata } from "next";
import PreviewClinicsClient from "./PreviewClinicsClient";

export const metadata: Metadata = {
  title: "Clinic Spectrum — Draft",
  robots: { index: false, follow: false },
};

export default function PreviewClinicsPage() {
  return <PreviewClinicsClient />;
}
