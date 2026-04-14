const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

async function parseError(res: Response, fallback: string) {
  const text = await res.text();
  return text || fallback;
}

function requireApiBase() {
  if (!API_BASE) {
    throw new Error("Submission service is not configured. Set NEXT_PUBLIC_API_URL.");
  }
}

// SheetMonkey — graceful, won't block or throw if not configured
async function submitToSheetMonkey(formId: string | undefined, data: Record<string, unknown>) {
  if (!formId) return;
  try {
    await fetch(`https://api.sheetmonkey.io/form/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    // SheetMonkey is optional — never block on its failure
  }
}

export async function submitDpcInquiry(data: { firstName: string; lastName: string; email: string; phone: string; responseType: string; notes: string; sourcePage: string; }) {
  requireApiBase();

  const res = await fetch(API_BASE + "/api/cos-health-collective/direct-primary-care", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(await parseError(res, "Submission failed"));
  }

  // Also send to SheetMonkey if configured
  await submitToSheetMonkey(process.env.NEXT_PUBLIC_SHEETMONKEY_DPC_ID, { ...data, source: "dpc-inquiry" });

  return res.json();
}

export async function submitEmployerInquiry(data: { firstName: string; lastName: string; email: string; phone: string; responseType: string; notes: string; sourcePage: string; }) {
  requireApiBase();

  const res = await fetch(API_BASE + "/api/cos-health-collective/for-businesses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(await parseError(res, "Submission failed"));
  }

  return res.json();
}

export async function submitLongevityToolkit(data: { firstName: string; email: string; sourcePage: string; }) {
  requireApiBase();

  const res = await fetch(API_BASE + "/api/cos-health-collective/longevity-toolkit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(await parseError(res, "Submission failed"));
  }

  return res.json();
}

// HBOT early access — homepage card + hbot site
// Submits to backend (/api/hbot/book-interest) + SheetMonkey
export async function submitHbotEarlyAccess(data: { firstName: string; lastName: string; email: string }) {
  const payload = { firstName: data.firstName, lastName: data.lastName, name: `${data.firstName} ${data.lastName}`.trim(), email: data.email, sourcePage: "/" };

  // Backend (non-blocking — don't throw if not configured)
  if (API_BASE) {
    try {
      await fetch(API_BASE + "/api/hbot/book-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // Backend optional for this form
    }
  }

  // SheetMonkey
  await submitToSheetMonkey(process.env.NEXT_PUBLIC_SHEETMONKEY_HBOT_ID, { ...payload, source: "hbot-early-access" });
}

// Hormone waitlist — homepage card
// SheetMonkey only until a /api/hormone/waitlist backend endpoint exists
export async function submitHormoneWaitlist(data: { name: string; email: string }) {
  const payload = { name: data.name, email: data.email, sourcePage: "/", source: "hormone-waitlist" };
  await submitToSheetMonkey(process.env.NEXT_PUBLIC_SHEETMONKEY_HORMONE_ID, payload);
}
