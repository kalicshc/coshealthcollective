<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Clinic facts — single source of truth

`src/lib/clinicFacts.ts` is the canonical source for clinic-facing facts that show up on the public site AND in the chatbot prompt: prices (DPC, urgent care), contact info (phone, email, domain), and HBOT details (pressure, opening date, early-access discount).

**When the user asks to change any of these on the website, you MUST:**

1. Update the value in `src/lib/clinicFacts.ts`.
2. Grep the codebase for any leftover hardcoded copies of the OLD value (flyers, business cards, email templates, SEO metadata, structured data) and update those by hand. The flyers and email templates are not yet wired to `clinicFacts.ts`.
3. Confirm to the user which surfaces you updated.

The chatbot prompt (`src/lib/chatbotContext.ts`) and the main public pages (homepage, DPC, urgent-care, hyperbaric, layout metadata) already import from `clinicFacts.ts` — those stay in sync automatically once the source is updated.

Do NOT add facts that only ever appear in one place to `clinicFacts.ts` — keep it limited to values that need to stay synchronized across multiple surfaces.
