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

# Outreach & Media hub (dashboard)

The internal dashboard has an **Outreach & Media** tab (`dashboard/app/outreach/`) that is the home for all marketing and brand design previews — t-shirts, business cards, flyers, and anything else we put in front of patients. **When the user asks you to add, build, or preview a new design (apparel, print, signage, social, swag), it goes here.** Do not create a new ad-hoc page or drop the asset loose in `public/`.

## How it's wired

- **Route:** `dashboard/app/outreach/page.tsx` → renders `<OutreachDashboard />`.
- **Component:** `dashboard/components/OutreachDashboard.tsx` — auth-gated client component, renders categories with thumbnail cards, click-to-enlarge lightbox, and category filters.
- **Manifest:** `dashboard/lib/outreachAssets.ts` — single source of truth for what shows up. Each category has a list of `OutreachAsset` entries with `title`, `description`, `image` (or `images: [...]` for multi-side), and optional `status: "draft" | "approved" | "printed" | "ordered"`.
- **Image storage:** `dashboard/public/outreach/<category>/` — folders already exist for `tshirts`, `business-cards`, `flyers`, `other`.
- **Top nav:** `dashboard/lib/dashboardNav.ts` — `TOP_NAV_ITEMS` is the shared nav rendered by both `PlatformDashboard` and `OutreachDashboard`. Add new top-level dashboard tabs here.

## Adding a new design preview

1. Save the image into the matching folder in `dashboard/public/outreach/<category>/`. Note: the dashboard is a **separate Next.js app** from `src/`, so its public folder is `dashboard/public/`, NOT the root `public/`.
2. Add an entry to the matching category in `dashboard/lib/outreachAssets.ts`. `image` paths begin with `/outreach/...` (relative to the dashboard's public root).
3. If the design has multiple views (front + back, multiple color variants), use `images: [...]` instead of `image` — the lightbox supports left/right navigation between them.
4. If the design doesn't fit t-shirts / business cards / flyers / other, add a new `OutreachCategory` entry to `OUTREACH_CATEGORIES` (pick an `accent` of `aqua`, `gold`, `rose`, or `cyan`) and create a matching folder under `dashboard/public/outreach/`.

## What does NOT belong here

- Photos used on the public website (those still go in the root `public/images/...` and are referenced by pages under `src/app/`).
- Chatbot images (`public/images/chatbot/`).
- Anything user-facing on coshealthcollective.com — the dashboard is internal only.
