import posthog from "posthog-js";

// Error tracking only — no session replay, no click/input autocapture.
// Runs before hydration; see Next.js instrumentation-client docs.
if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: false,
    disable_session_recording: true,
    capture_exceptions: true,
  });
}
