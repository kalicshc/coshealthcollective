import type { Metadata } from "next";

// Preview/draft pages duplicate homepage content — keep them out of search.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
