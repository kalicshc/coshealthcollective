"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Send, X } from "lucide-react";
import Link from "next/link";
import { RemoveScroll } from "react-remove-scroll";
import { ALL_CTA_TAGS, ChatCta, getCtaByTag } from "@/lib/chatbotRouting";

const KALI_STYLES = `
  @keyframes kali-soft-pulse {
    0%, 100% {
      box-shadow:
        0 18px 42px rgba(0, 0, 0, 0.34),
        0 0 34px hsla(177, 70%, 50%, 0.2),
        0 0 58px hsla(280, 66%, 56%, 0.12);
    }
    50% {
      box-shadow:
        0 20px 46px rgba(0, 0, 0, 0.38),
        0 0 46px hsla(200, 70%, 59%, 0.27),
        0 0 72px hsla(177, 70%, 45%, 0.14);
    }
  }
  .kali-btn {
    transition: transform 0.18s ease;
  }
  .kali-btn:hover {
    transform: translateY(-2px) scale(1.06);
  }
  .kali-avatar {
    background:
      radial-gradient(circle at 50% 52%, hsla(177,70%,59%,0.26), transparent 56%),
      radial-gradient(circle at 32% 28%, hsla(280,66%,62%,0.24), transparent 36%),
      radial-gradient(circle at 72% 22%, hsla(200,70%,59%,0.24), transparent 38%),
      radial-gradient(circle at 50% 50%, hsla(210,32%,9%,0.35), transparent 72%);
    padding: 0;
    animation: kali-soft-pulse 3.8s ease-in-out infinite;
    overflow: visible;
  }
  .kali-avatar img {
    border: 0;
    filter: drop-shadow(0 0 12px hsla(177, 72%, 58%, 0.30)) drop-shadow(0 0 22px hsla(280, 66%, 62%, 0.22));
    -webkit-mask-image: radial-gradient(circle, black 63%, rgba(0,0,0,0.82) 76%, transparent 100%);
    mask-image: radial-gradient(circle, black 63%, rgba(0,0,0,0.82) 76%, transparent 100%);
    transform: scale(1.04);
  }
  .kali-status-dot {
    box-shadow: 0 0 12px hsla(177,72%,58%,0.7);
  }
  .kali-label {
    background:
      linear-gradient(135deg, hsla(210,32%,12%,0.96), hsla(210,28%,9%,0.98)) padding-box,
      linear-gradient(135deg, hsla(177,72%,58%,0.82), hsla(280,66%,62%,0.78), hsla(190,78%,56%,0.82)) border-box;
    border: 1px solid transparent;
    box-shadow: 0 10px 28px rgba(0,0,0,0.34), 0 0 18px hsla(280,60%,50%,0.18);
    backdrop-filter: blur(12px);
  }
  @keyframes kali-panel-glow {
    0%, 100% {
      box-shadow:
        0 24px 64px rgba(0, 0, 0, 0.45),
        0 0 38px hsla(177, 72%, 52%, 0.22),
        0 0 70px hsla(280, 66%, 55%, 0.12);
    }
    50% {
      box-shadow:
        0 26px 70px rgba(0, 0, 0, 0.48),
        0 0 52px hsla(280, 66%, 58%, 0.26),
        0 0 88px hsla(177, 72%, 50%, 0.16);
    }
  }
  /* teal <-> purple gradient that flows continuously around the open box */
  @keyframes kali-border-flow {
    to { background-position: 0% 0%, -220% 0%; }
  }
  .kali-panel {
    background:
      linear-gradient(180deg, hsla(210, 24%, 12%, 0.985), hsla(210, 26%, 10%, 0.985)) padding-box,
      linear-gradient(90deg, hsl(177,72%,55%), hsl(280,66%,62%), hsl(190,78%,56%), hsl(288,62%,60%), hsl(177,72%,55%)) border-box;
    background-size: 100% 100%, 220% 100%;
    border: 1.6px solid transparent;
    animation: kali-border-flow 7s linear infinite, kali-panel-glow 4.6s ease-in-out infinite;
    box-shadow:
      0 24px 64px rgba(0, 0, 0, 0.45),
      0 0 38px hsla(177, 72%, 52%, 0.22),
      0 0 70px hsla(280, 66%, 55%, 0.12);
  }
  .kali-header {
    background:
      linear-gradient(135deg, hsla(177, 72%, 55%, 0.22), hsla(280, 66%, 60%, 0.12) 45%, hsla(190, 78%, 56%, 0.20));
    border-bottom: 1px solid hsla(280, 66%, 60%, 0.18);
  }
  @media (prefers-reduced-motion: reduce) {
    .kali-avatar, .kali-panel { animation: none; }
  }
`;

type Message = {
  role: "assistant" | "user";
  content: string;
  cta?: ChatCta;
  formSubmitted?: boolean;
};

type InlineFormState = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

const EMPTY_FORM: InlineFormState = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hi, I'm Kali. What can I help you with?",
};

const VALID_CTA_TAGS = new Set<string>(ALL_CTA_TAGS);

function parseCta(value: unknown): ChatCta | undefined {
  if (!value || typeof value !== "object") return undefined;
  const tag = (value as { tag?: unknown }).tag;
  if (typeof tag !== "string" || !VALID_CTA_TAGS.has(tag)) return undefined;
  return getCtaByTag(tag as ChatCta["tag"]);
}

function KaliTriggerButton({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
  return (
    <>
      <style>{KALI_STYLES}</style>
      <button
        type="button"
        onClick={onClick}
        className="kali-btn group relative flex flex-col items-center"
        aria-label={isOpen ? "Close Kali chat" : "Ask Kali"}
      >
        <div
          className={`kali-avatar relative flex items-center justify-center rounded-full transition-[height,width,transform] duration-200 ${
            isOpen ? "h-[4.6rem] w-[4.6rem]" : "h-14 w-14 sm:h-16 sm:w-16"
          }`}
        >
          <img
            src="/images/chatbot/kali-ai-dog.webp"
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
          {isOpen && (
            <div
              className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
              style={{ background: "hsl(280,64%,62%)", color: "hsl(0,0%,100%)" }}
            >
              x
            </div>
          )}
        </div>
        <span className="kali-label mt-1.5 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black uppercase leading-none tracking-[0.14em] text-white">
          <span className="kali-status-dot h-1.5 w-1.5 rounded-full" style={{ background: "hsl(177,72%,56%)" }} />
          {isOpen ? "Close" : "Ask Kali"}
        </span>
      </button>
    </>
  );
}

export function ChatbotWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [openFormIndex, setOpenFormIndex] = useState<number | null>(null);
  const [inlineForm, setInlineForm] = useState<InlineFormState>(EMPTY_FORM);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [showHandoff, setShowHandoff] = useState(false);
  const [handoffSent, setHandoffSent] = useState(false);
  const [handoff, setHandoff] = useState({
    firstName: "",
    lastName: "",
    email: "",
    service: "General question",
    question: "",
  });
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const initialPathRef = useRef<string | null>(null);

  // Track viewport size — drives the mobile-fullscreen layout
  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Hydrate persisted convo from sessionStorage on mount (survives page navs, dies on tab close)
  useEffect(() => {
    try {
      const m = sessionStorage.getItem("kali-messages");
      if (m) {
        const parsed = JSON.parse(m) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      }
      if (sessionStorage.getItem("kali-open") === "true") setIsOpen(true);
      const d = sessionStorage.getItem("kali-draft");
      if (d) setDraft(d);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { sessionStorage.setItem("kali-messages", JSON.stringify(messages)); } catch {}
  }, [messages, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try { sessionStorage.setItem("kali-open", String(isOpen)); } catch {}
  }, [isOpen, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try { sessionStorage.setItem("kali-draft", draft); } catch {}
  }, [draft, hydrated]);

  // Close Kali on mobile when the route changes (e.g. user taps a link she suggested).
  // Desktop keeps her open across navigations.
  useEffect(() => {
    if (initialPathRef.current === null) {
      initialPathRef.current = pathname;
      return;
    }
    if (initialPathRef.current === pathname) return;
    initialPathRef.current = pathname;
    if (isMobile) setIsOpen(false);
  }, [pathname, isMobile]);

  // Keep messages pinned to the bottom whenever they grow or the keyboard moves.
  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, keyboardOffset, isOpen]);

  // Track the iOS on-screen keyboard via VisualViewport so the composer can
  // ride above it. (Body scroll lock is handled by <RemoveScroll>, not here.)
  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      const offset = window.innerHeight - vv.height - vv.offsetTop;
      setKeyboardOffset(Math.max(0, offset));
    };
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    update();
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
      setKeyboardOffset(0);
    };
  }, [isOpen]);

  const transcript = useMemo(
    () => messages.filter((message) => message.content.trim()),
    [messages]
  );

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setDraft("");
    setIsSending(true);
    // Keep keyboard open after send: refocus synchronously before iOS commits the blur
    textareaRef.current?.focus({ preventScroll: true });

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pagePath: pathname, messages: nextMessages }),
      });

      const data = await res.json();
      const reply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply.trim()
          : "I couldn't generate a useful answer. Please try again.";

      const cta = parseCta(data?.cta);

      setMessages((current) => [...current, { role: "assistant", content: reply, cta }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "I couldn’t reach the chat service. You can still submit a follow-up request and the team can respond directly.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  async function submitInlineForm(messageIndex: number, cta: ChatCta) {
    if (submittingForm) return;
    if (!inlineForm.firstName.trim() || !inlineForm.email.trim()) return;
    if (cta.formType !== "hbot") return;

    setSubmittingForm(true);
    try {
      const res = await fetch("/api/hbot/book-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: inlineForm.firstName.trim(),
          lastName: inlineForm.lastName.trim(),
          name: `${inlineForm.firstName} ${inlineForm.lastName}`.trim(),
          email: inlineForm.email.trim(),
          message: inlineForm.message.trim() || "Joined HBOT waitlist via Kali chat",
          sourcePage: pathname,
        }),
      });

      if (!res.ok) {
        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: "Hmm, something went wrong saving that. Want to try again, or use the follow-up form below?",
          },
        ]);
        return;
      }

      setMessages((current) =>
        current.map((message, index) =>
          index === messageIndex ? { ...message, formSubmitted: true } : message
        )
      );
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `You're on the HBOT waitlist, ${inlineForm.firstName.trim()}. We'll email you when 2.0 ATA opens up — keep an eye on your inbox for a 25% early-access discount confirmation.`,
        },
      ]);
      setOpenFormIndex(null);
      setInlineForm(EMPTY_FORM);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "I couldn't reach the signup service. Try the follow-up form below and the team will get back to you.",
        },
      ]);
    } finally {
      setSubmittingForm(false);
    }
  }

  async function submitHandoff(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!handoff.firstName || !handoff.email || !handoff.question) return;

    const res = await fetch("/api/chatbot/handoff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...handoff,
        pagePath: pathname,
        transcript,
      }),
    });

    if (!res.ok) return;

    setHandoffSent(true);
    setHandoff({
      firstName: "",
      lastName: "",
      email: "",
      service: "General question",
      question: "",
    });
  }

  const triggerHiddenOnMobile = isMobile && isOpen;

  const panelNode = isOpen ? (
    <RemoveScroll enabled={isMobile} forwardProps>
      <div
        className={
          isMobile
            ? "kali-panel fixed top-0 left-0 right-0 z-[60] flex flex-col overflow-hidden rounded-none"
            : "kali-panel fixed right-6 bottom-24 w-[24rem] z-[60] flex flex-col overflow-hidden rounded-3xl"
        }
        style={
          isMobile
            ? { bottom: `${keyboardOffset}px` }
            : { maxHeight: "78dvh" }
        }
      >
          <div className="kali-header relative flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="kali-avatar relative flex h-11 w-11 items-center justify-center rounded-full">
                <img
                  src="/images/chatbot/kali-ai-dog.webp"
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Kali</p>
                <p className="text-xs" style={{ color: "hsl(210, 25%, 68%)" }}>
                  Ask me anything.
                </p>
              </div>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" className="rounded-full p-2 text-white/70 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={messagesRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="px-4 py-4">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={message.role === "user" ? "flex justify-end" : "flex flex-col items-start gap-2"}>
                  <div
                    className="max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6"
                    style={
                      message.role === "user"
                        ? { background: "linear-gradient(135deg, hsl(177, 70%, 55%), hsl(200, 70%, 59%))", color: "hsl(210, 32%, 12%)" }
                        : { background: "hsla(210, 22%, 18%, 0.96)", color: "hsl(210, 35%, 90%)", border: "1px solid hsla(0, 0%, 100%, 0.06)" }
                    }
                  >
                    {message.content}
                  </div>
                  {message.role === "assistant" && message.cta ? (
                    <div className="flex w-full max-w-[88%] flex-col gap-2 pl-1">
                      <div className="flex flex-wrap gap-2">
                        {message.cta.kind === "form" ? (
                          message.formSubmitted ? null : (
                            <button
                              type="button"
                              onClick={() => {
                                setOpenFormIndex((current) => (current === index ? null : index));
                                setInlineForm(EMPTY_FORM);
                              }}
                              className="rounded-full px-3.5 py-2 text-xs font-semibold shadow-sm transition-transform hover:scale-[1.02]"
                              style={{
                                background: "linear-gradient(135deg, hsl(177, 70%, 55%), hsl(200, 70%, 59%))",
                                color: "hsl(210, 32%, 12%)",
                              }}
                            >
                              {openFormIndex === index ? "Cancel" : message.cta.book.label}
                            </button>
                          )
                        ) : message.cta.book.external ? (
                          <a
                            href={message.cta.book.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full px-3.5 py-2 text-xs font-semibold shadow-sm transition-transform hover:scale-[1.02]"
                            style={{
                              background: "linear-gradient(135deg, hsl(177, 70%, 55%), hsl(200, 70%, 59%))",
                              color: "hsl(210, 32%, 12%)",
                            }}
                          >
                            {message.cta.book.label}
                          </a>
                        ) : (
                          <Link
                            href={message.cta.book.href}
                            className="rounded-full px-3.5 py-2 text-xs font-semibold shadow-sm transition-transform hover:scale-[1.02]"
                            style={{
                              background: "linear-gradient(135deg, hsl(177, 70%, 55%), hsl(200, 70%, 59%))",
                              color: "hsl(210, 32%, 12%)",
                            }}
                          >
                            {message.cta.book.label}
                          </Link>
                        )}
                        {message.cta.learnMore ? (
                          message.cta.learnMore.external ? (
                            <a
                              href={message.cta.learnMore.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full px-3 py-2 text-xs transition-opacity hover:opacity-85"
                              style={{
                                background: "hsla(210, 22%, 18%, 0.96)",
                                color: "hsl(177, 70%, 70%)",
                                border: "1px solid hsla(177, 70%, 59%, 0.22)",
                              }}
                            >
                              {message.cta.learnMore.label}
                            </a>
                          ) : (
                            <Link
                              href={message.cta.learnMore.href}
                              className="rounded-full px-3 py-2 text-xs transition-opacity hover:opacity-85"
                              style={{
                                background: "hsla(210, 22%, 18%, 0.96)",
                                color: "hsl(177, 70%, 70%)",
                                border: "1px solid hsla(177, 70%, 59%, 0.22)",
                              }}
                            >
                              {message.cta.learnMore.label}
                            </Link>
                          )
                        ) : null}
                      </div>

                      {message.cta.kind === "form" && openFormIndex === index && !message.formSubmitted ? (
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            void submitInlineForm(index, message.cta as ChatCta);
                          }}
                          className="flex flex-col gap-2 rounded-2xl p-3"
                          style={{
                            background: "hsla(210, 22%, 14%, 0.96)",
                            border: "1px solid hsla(177, 70%, 59%, 0.22)",
                          }}
                        >
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              required
                              value={inlineForm.firstName}
                              onChange={(event) => setInlineForm((current) => ({ ...current, firstName: event.target.value }))}
                              placeholder="First name"
                              className="rounded-lg border px-3 py-2 text-xs text-white outline-none"
                              style={{ background: "hsla(210, 22%, 18%, 0.96)", borderColor: "hsla(0, 0%, 100%, 0.08)" }}
                            />
                            <input
                              value={inlineForm.lastName}
                              onChange={(event) => setInlineForm((current) => ({ ...current, lastName: event.target.value }))}
                              placeholder="Last name"
                              className="rounded-lg border px-3 py-2 text-xs text-white outline-none"
                              style={{ background: "hsla(210, 22%, 18%, 0.96)", borderColor: "hsla(0, 0%, 100%, 0.08)" }}
                            />
                          </div>
                          <input
                            required
                            type="email"
                            value={inlineForm.email}
                            onChange={(event) => setInlineForm((current) => ({ ...current, email: event.target.value }))}
                            placeholder="Email"
                            className="rounded-lg border px-3 py-2 text-xs text-white outline-none"
                            style={{ background: "hsla(210, 22%, 18%, 0.96)", borderColor: "hsla(0, 0%, 100%, 0.08)" }}
                          />
                          <textarea
                            value={inlineForm.message}
                            onChange={(event) => setInlineForm((current) => ({ ...current, message: event.target.value }))}
                            rows={2}
                            placeholder="What are you hoping HBOT helps with? (optional)"
                            className="resize-none rounded-lg border px-3 py-2 text-xs text-white outline-none"
                            style={{ background: "hsla(210, 22%, 18%, 0.96)", borderColor: "hsla(0, 0%, 100%, 0.08)" }}
                          />
                          <button
                            type="submit"
                            disabled={submittingForm || !inlineForm.firstName.trim() || !inlineForm.email.trim()}
                            className="rounded-full px-4 py-2 text-xs font-semibold shadow-sm transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                            style={{
                              background: "linear-gradient(135deg, hsl(177, 70%, 55%), hsl(200, 70%, 59%))",
                              color: "hsl(210, 32%, 12%)",
                            }}
                          >
                            {submittingForm ? "Submitting..." : "Join the waitlist"}
                          </button>
                        </form>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ))}
              {isSending ? (
                <div
                  className="max-w-[88%] rounded-2xl px-4 py-3 text-sm"
                  style={{ background: "hsla(210, 22%, 18%, 0.96)", color: "hsl(210, 25%, 68%)" }}
                >
                  Thinking...
                </div>
              ) : null}
            </div>
          </div>

          <div className="px-4 pb-3">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void sendMessage(draft);
              }}
              className="flex items-end gap-2"
            >
              <textarea
                ref={textareaRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void sendMessage(draft);
                  }
                }}
                rows={2}
                placeholder="Ask a question..."
                enterKeyHint="send"
                className="min-h-[56px] flex-1 resize-none rounded-2xl border px-4 py-3 text-sm text-white outline-none"
                style={{
                  background: "hsla(210, 22%, 18%, 0.96)",
                  borderColor: "hsla(0, 0%, 100%, 0.08)",
                  fontSize: "16px",
                }}
              />
              <button
                type="submit"
                onMouseDown={(e) => e.preventDefault()}
                disabled={isSending || !draft.trim()}
                className="flex h-12 w-12 items-center justify-center rounded-2xl disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, hsl(177, 70%, 55%), hsl(200, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="border-t px-4 py-4" style={{ borderColor: "hsla(0, 0%, 100%, 0.06)" }}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-white">Need a human follow-up?</p>
              <button
                type="button"
                onClick={() => setShowHandoff((value) => !value)}
                className="text-xs font-medium"
                style={{ color: "hsl(177, 70%, 65%)" }}
              >
                {showHandoff ? "Hide form" : "Open form"}
              </button>
            </div>

            {showHandoff ? (
              handoffSent ? (
                <p className="text-sm leading-6" style={{ color: "hsl(177, 70%, 72%)" }}>
                  Got it — your message is on the way. The team will reach out by email.
                </p>
              ) : (
                <form onSubmit={(event) => void submitHandoff(event)} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={handoff.firstName}
                      onChange={(event) => setHandoff((current) => ({ ...current, firstName: event.target.value }))}
                      placeholder="First name"
                      className="rounded-xl border px-3 py-2.5 text-sm text-white outline-none"
                      style={{ background: "hsla(210, 22%, 18%, 0.96)", borderColor: "hsla(0, 0%, 100%, 0.08)" }}
                    />
                    <input
                      value={handoff.lastName}
                      onChange={(event) => setHandoff((current) => ({ ...current, lastName: event.target.value }))}
                      placeholder="Last name"
                      className="rounded-xl border px-3 py-2.5 text-sm text-white outline-none"
                      style={{ background: "hsla(210, 22%, 18%, 0.96)", borderColor: "hsla(0, 0%, 100%, 0.08)" }}
                    />
                  </div>
                  <input
                    type="email"
                    value={handoff.email}
                    onChange={(event) => setHandoff((current) => ({ ...current, email: event.target.value }))}
                    placeholder="Email"
                    className="w-full rounded-xl border px-3 py-2.5 text-sm text-white outline-none"
                    style={{ background: "hsla(210, 22%, 18%, 0.96)", borderColor: "hsla(0, 0%, 100%, 0.08)" }}
                  />
                  <select
                    value={handoff.service}
                    onChange={(event) => setHandoff((current) => ({ ...current, service: event.target.value }))}
                    className="w-full rounded-xl border px-3 py-2.5 text-sm text-white outline-none"
                    style={{ background: "hsla(210, 22%, 18%, 0.96)", borderColor: "hsla(0, 0%, 100%, 0.08)" }}
                  >
                    <option>General question</option>
                    <option>Direct Primary Care</option>
                    <option>Hormone care</option>
                    <option>Hyperbaric therapy</option>
                    <option>Business partnership</option>
                    <option>Member resources</option>
                  </select>
                  <textarea
                    value={handoff.question}
                    onChange={(event) => setHandoff((current) => ({ ...current, question: event.target.value }))}
                    rows={3}
                    placeholder="What do you want help with?"
                    className="w-full rounded-xl border px-3 py-2.5 text-sm text-white outline-none"
                    style={{ background: "hsla(210, 22%, 18%, 0.96)", borderColor: "hsla(0, 0%, 100%, 0.08)" }}
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl px-4 py-3 text-sm font-semibold"
                    style={{ background: "linear-gradient(135deg, hsl(177, 70%, 55%), hsl(200, 70%, 59%))", color: "hsl(210, 32%, 12%)" }}
                  >
                    Send follow-up request
                  </button>
                </form>
              )
            ) : (
              <p className="text-xs leading-5" style={{ color: "hsl(210, 18%, 60%)" }}>
                The handoff form emails your team and includes the recent chat transcript for context.
              </p>
            )}
          </div>
          </div>
      </div>
    </RemoveScroll>
  ) : null;

  return (
    <>
      <div
        className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
        style={triggerHiddenOnMobile ? { display: "none" } : { bottom: "calc(env(safe-area-inset-bottom) + 1.1rem)" }}
      >
        <KaliTriggerButton onClick={() => setIsOpen((open) => !open)} isOpen={isOpen} />
      </div>
      {mounted && panelNode ? createPortal(panelNode, document.body) : null}
    </>
  );
}
