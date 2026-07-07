"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { ACCENTS, type ServiceKey } from "@/lib/accents";

/**
 * Shared expand/collapse accordion — the one accordion style for the whole
 * site (replaces the hand-rolled variants on the DPC, FAQ, and resources
 * pages). The only client component in the shared set; keep the surrounding
 * page server-rendered and pass items in as props. Content stays in the DOM
 * when collapsed (hidden via max-height) so search engines can read it.
 */

export type AccordionItem = {
  id: string;
  question: ReactNode;
  answer: ReactNode;
};

type Props = {
  items: AccordionItem[];
  service?: ServiceKey;
  /** Allow several items open at once (default: one at a time) */
  allowMultiple?: boolean;
};

export function Accordion({ items, service = "brand", allowMultiple = false }: Props) {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const a = ACCENTS[service];

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : ([] as string[]));
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        return (
          <div
            key={item.id}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "hsla(210,22%,22%,0.5)",
              border: `1px solid rgba(${a.rgb},${isOpen ? 0.32 : 0.16})`,
              backdropFilter: "blur(12px)",
              transition: "border-color 0.2s",
            }}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-semibold text-white text-[15px] leading-snug">{item.question}</span>
              <ChevronDown
                size={18}
                className="shrink-0 transition-transform duration-200"
                style={{ color: `rgb(${a.rgb})`, transform: isOpen ? "rotate(180deg)" : "none" }}
                aria-hidden="true"
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-200"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "hsl(210,25%,68%)" }}>
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
