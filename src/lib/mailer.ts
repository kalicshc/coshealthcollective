import nodemailer from "nodemailer";

const EMAIL_USER = (process.env.EMAIL_USER ?? "").trim();
const EMAIL_PASS = (process.env.EMAIL_PASS ?? "").trim();
const NOTIFICATION_EMAIL = (process.env.NOTIFICATION_EMAIL ?? "dpc@coshealthcollective.com").trim();
const NOTIFICATION_EMAILS = (process.env.NOTIFICATION_EMAILS ?? NOTIFICATION_EMAIL)
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export async function sendNotification(subject: string, html: string) {
  await transporter.sendMail({
    from: `"CSHC Dashboard" <${EMAIL_USER}>`,
    to: NOTIFICATION_EMAILS,
    subject,
    html,
  });
}

export async function sendConfirmation(to: string, firstName: string, subject: string, bodyHtml: string) {
  await transporter.sendMail({
    from: `"Colorado Springs Health Collective" <${EMAIL_USER}>`,
    to,
    subject,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;border-radius:8px;overflow:hidden">
        <div style="background:#0d4f4f;padding:24px 32px">
          <p style="color:#5eead4;margin:0;font-size:12px;text-transform:uppercase;letter-spacing:2px">Colorado Springs Health Collective</p>
          <h1 style="color:#fff;margin:8px 0 0;font-size:22px">Hi ${firstName},</h1>
        </div>
        <div style="padding:28px 32px;background:#fff;color:#333;font-size:15px;line-height:1.6">
          ${bodyHtml}
        </div>
        <div style="padding:16px 32px;background:#f0f0f0">
          <p style="color:#999;font-size:11px;margin:0">Colorado Springs Health Collective · <a href="https://coshealthcollective.com" style="color:#0d9488;text-decoration:none">coshealthcollective.com</a></p>
        </div>
      </div>
    `,
  });
}

export function formatFields(fields: Record<string, string | undefined>) {
  return Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;color:#666;width:160px">${k}</td><td style="padding:6px 12px;font-weight:600">${v}</td></tr>`)
    .join("");
}

export function emailTemplate(title: string, source: string, rows: string) {
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;border-radius:8px;overflow:hidden">
      <div style="background:#0d4f4f;padding:24px 32px">
        <p style="color:#5eead4;margin:0;font-size:12px;text-transform:uppercase;letter-spacing:2px">Colorado Springs Health Collective</p>
        <h1 style="color:#fff;margin:8px 0 0;font-size:22px">${title}</h1>
      </div>
      <div style="padding:24px 32px;background:#fff">
        <table style="width:100%;border-collapse:collapse">${rows}</table>
      </div>
      <div style="padding:12px 32px;background:#f0f0f0">
        <p style="color:#999;font-size:11px;margin:0">Submitted from ${source} · ${new Date().toLocaleString("en-US", { timeZone: "America/Denver" })} MT</p>
      </div>
    </div>
  `;
}
