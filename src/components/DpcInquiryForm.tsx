"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { submitDpcInquiry } from "@/lib/api";
import { ACCENTS } from "@/lib/accents";
import { trackEvent } from "@/lib/analytics";
import { GlassCard } from "@/components/GlassCard";

/**
 * The DPC "Have Questions First?" inquiry form — extracted from the DPC page
 * so the page itself can be a server component. The submitDpcInquiry payload
 * (field names, sourcePage) must stay exactly as-is: it feeds the dashboard
 * inquiries pipeline.
 */

const ACCENT = ACCENTS.dpc;
const inputStyle = { background: "hsla(210,22%,35%,0.6)", border: "1px solid hsla(255,255,255,0.2)" } as const;

export function DpcInquiryForm({ source = "dpc-inquiry" }: { source?: string }) {
  const [responseType, setResponseType] = useState("Email");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const datetimeRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (datetimeRef.current) {
      datetimeRef.current.value = new Date().toLocaleString();
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      await submitDpcInquiry({
        firstName: String(formData.get("First Name") ?? ""),
        lastName: String(formData.get("Last Name") ?? ""),
        email: String(formData.get("Email") ?? ""),
        phone: String(formData.get("Phone Number") ?? ""),
        responseType,
        notes: String(formData.get("Notes") ?? ""),
        sourcePage: "/direct-primary-care",
      });
      trackEvent("form_submit", { page: "direct-primary-care", service: "dpc", source, label: "DPC inquiry" });
      setFormSubmitted(true);
      formRef.current?.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <GlassCard service="dpc" className="!p-8 lg:!p-10">
      <h2 className="text-2xl font-black mb-2 text-center text-white">Have Questions First?</h2>
      <p className="text-center mb-6 text-sm" style={{ color: "hsl(210,25%,70%)" }}>
        Get answers about Direct Primary Care, our services, pricing, or anything else you&apos;d like to know.
      </p>
      {formSubmitted ? (
        <div className="text-center py-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})` }}
          >
            <CheckCircle className="w-8 h-8" style={{ color: "hsl(210,32%,10%)" }} />
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: `rgb(${ACCENT.rgb})` }}>Message Sent Successfully!</h3>
          <p style={{ color: "hsl(210,25%,75%)" }}>We&apos;ll get back to you soon. Thank you for reaching out!</p>
          <button
            onClick={() => setFormSubmitted(false)}
            className="mt-6 px-6 py-2 rounded-full"
            style={{ background: "hsla(210,22%,28%,0.75)", color: `rgb(${ACCENT.rgb})`, border: `1px solid rgba(${ACCENT.rgb},0.3)` }}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
          <input type="hidden" name="Date and Time" ref={datetimeRef} />
          <input type="hidden" name="Status" value="DPC Page Inquiry" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>First Name *</label>
              <input type="text" name="First Name" required className="w-full px-3 py-2 rounded-lg text-white" style={inputStyle} />
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>Last Name *</label>
              <input type="text" name="Last Name" required className="w-full px-3 py-2 rounded-lg text-white" style={inputStyle} />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>Email *</label>
            <input type="email" name="Email" required className="w-full px-3 py-2 rounded-lg text-white" style={inputStyle} />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>Phone Number (Optional)</label>
            <input type="tel" name="Phone Number" className="w-full px-3 py-2 rounded-lg text-white" style={inputStyle} />
          </div>
          <div>
            <label className="block text-sm mb-2" style={{ color: "hsl(0,0%,92%)" }}>How would you prefer we respond?</label>
            <div className="flex gap-6">
              {["Email", "Phone"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="Response Type"
                    value={opt}
                    checked={responseType === opt}
                    onChange={() => setResponseType(opt)}
                    className="accent-blue-400"
                  />
                  <span style={{ color: "hsl(0,0%,85%)" }}>{opt === "Phone" ? "Phone Call" : opt}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: "hsl(0,0%,92%)" }}>Your Questions</label>
            <textarea name="Notes" rows={4} className="w-full px-3 py-2 rounded-lg text-white resize-none" style={inputStyle} />
          </div>
          <button
            type="submit"
            disabled={formSubmitting}
            className="w-full py-4 rounded-full font-bold text-lg mt-6 disabled:opacity-50 hover:opacity-85 transition-opacity"
            style={{ background: `linear-gradient(135deg, ${ACCENT.from}, ${ACCENT.to})`, color: "hsl(210,32%,10%)" }}
          >
            {formSubmitting ? "Sending..." : "Send My Questions"}
          </button>
        </form>
      )}
    </GlassCard>
  );
}
