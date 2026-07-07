"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ChatbotWidget = dynamic(
  () => import("./ChatbotWidget").then((m) => m.ChatbotWidget),
  { ssr: false }
);

// Defers the chatbot (a large client bundle) out of every page's initial load:
// nothing is fetched until the browser is idle, the visitor interacts, or 3s
// passes — whichever comes first.
export function ChatbotWidgetLazy() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    const arm = () => setReady(true);
    const events: (keyof WindowEventMap)[] = ["pointerdown", "scroll", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, arm, { once: true, passive: true }));
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(arm, { timeout: 3000 })
      : window.setTimeout(arm, 3000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, arm));
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, [ready]);

  return ready ? <ChatbotWidget /> : null;
}
