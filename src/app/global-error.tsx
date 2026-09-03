"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { clinicFacts } from "@/lib/clinicFacts";

// Root error boundary — catches render errors that don't reach window.onerror.
// Replaces the whole document, so it must render its own <html>/<body>.
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101a25",
          color: "#f5f5f5",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>Something went wrong</h1>
          <p style={{ opacity: 0.7 }}>
            Please refresh the page, or call us at {clinicFacts.contact.phone} if the problem continues.
          </p>
        </div>
      </body>
    </html>
  );
}
