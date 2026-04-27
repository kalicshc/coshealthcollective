<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Clinic facts & chatbot knowledge — single source of truth

There are TWO related files in `src/lib/`. Don't confuse them.

## 1. `src/lib/clinicFacts.ts` — quantitative data (numbers, dates, contact)

The canonical source for prices (DPC, urgent care, hormone), contact info (phone, email, domain), and HBOT details (pressure, opening date, early-access discount).

**When the user asks to change any of these on the website, you MUST:**

1. Update the value in `src/lib/clinicFacts.ts`.
2. Grep the codebase for any leftover hardcoded copies of the OLD value (flyers, business cards, email templates, SEO metadata, structured data) and update those by hand. The flyers and transactional email templates are not yet wired to `clinicFacts.ts`.
3. Confirm to the user which surfaces you updated.

The chatbot (`chatbotContext.ts` + `chatbotKnowledge.ts`) and the main public pages (homepage, DPC, urgent-care, hyperbaric, hormone women's/men's/GLP-1, layout metadata) already import from `clinicFacts.ts` — those stay in sync automatically.

Do NOT add facts that only appear in one place to `clinicFacts.ts` — keep it limited to values that need to stay synchronized across multiple surfaces.

## 2. `src/lib/chatbotKnowledge.ts` — qualitative service knowledge

Service-by-service information for the chatbot: what's included in a visit, who a service is for, what we treat, common visitor questions, when to suggest which CTA. Organized by section (Team, DPC, Urgent Care, Hormone — Women's / Men's / GLP-1, HBOT, Vision).

This is where to add new bot knowledge. **When the user says things like "the bot should know X" or "add this to the chatbot's memory":**

1. Find the matching service section in `chatbotKnowledge.ts` and add the fact there.
2. If it's a price or contact, route it through `clinicFacts.ts` instead and let the knowledge file interpolate it.
3. If the fact contradicts an existing entry in the knowledge base, update — don't append.
4. Confirm what you added and where.

## 3. `src/lib/chatbotContext.ts` — persona, voice, CTA system, safety rules

Behavior, not content. The Kali persona, "how to talk" rules, CTA tag list and intent-to-CTA matching, "rules you do not break" (no diagnose, no invent, emergency handling). It imports `KNOWLEDGE_BASE` from `chatbotKnowledge.ts` and embeds it as the bot's primary source of truth.

Touch this file when changing voice/tone, the CTA tag list, or safety rules. NOT for adding new clinic facts.
