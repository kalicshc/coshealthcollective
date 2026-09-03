import type { Instrumentation } from "next";

export const onRequestError: Instrumentation.onRequestError = async (err, request, context) => {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  const { PostHog } = await import("posthog-node");
  const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
  });

  // Immediate (not queued) — this runs at the end of a serverless invocation,
  // which may be frozen/killed before a background flush would fire.
  await posthog.captureExceptionImmediate(err, undefined, {
    path: request.path,
    method: request.method,
    routerKind: context.routerKind,
    routePath: context.routePath,
    routeType: context.routeType,
  });
  await posthog.shutdown();
};
