import { sendNotification } from "@/lib/mailer";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendLifeboat(
  label: string,
  data: unknown,
  reason: string
): Promise<void> {
  const safeJson = escapeHtml(JSON.stringify(data, null, 2));
  const safeReason = escapeHtml(reason);
  const html = `
    <div style="font-family:sans-serif;max-width:640px;margin:0 auto">
      <div style="background:#7c2d12;color:#fff;padding:16px 20px;border-radius:8px 8px 0 0">
        <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#fed7aa">Lead Lifeboat</p>
        <h2 style="margin:6px 0 0;font-size:18px">${escapeHtml(label)}</h2>
      </div>
      <div style="padding:20px;background:#fff;border:1px solid #fed7aa;border-top:none;border-radius:0 0 8px 8px">
        <p style="margin:0 0 12px;color:#7c2d12;font-weight:600">Backend forward failed — raw form data captured below.</p>
        <p style="margin:0 0 12px;color:#475569;font-size:13px">Reason: ${safeReason}</p>
        <pre style="background:#0f172a;color:#e2e8f0;padding:14px;border-radius:6px;font-size:12px;overflow-x:auto;white-space:pre-wrap">${safeJson}</pre>
        <p style="margin:18px 0 0;color:#64748b;font-size:12px">This email is sent automatically when a website form succeeds for the user but the upstream Railway backend fails to receive it. Reply to the lead manually, then check why the backend rejected the payload.</p>
      </div>
    </div>
  `;
  await sendNotification(`[LEAD LIFEBOAT] ${label}`, html);
}
