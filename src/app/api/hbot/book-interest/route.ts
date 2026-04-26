import { NextRequest, NextResponse } from "next/server";
import { sendNotification, sendConfirmation, emailTemplate, formatFields } from "@/lib/mailer";

const BACKEND = process.env.PLATFORM_API_URL ?? "";

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (BACKEND) {
    try {
      await fetch(`${BACKEND}/api/hbot/book-interest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name ?? `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim(),
          email: data.email,
          phone: data.phone ?? "Not provided",
          conditionGoal: data.conditionGoal ?? "Early access signup",
          preferredContact: data.preferredContact ?? "email",
          message: data.message ?? "Signed up for early access",
          sourcePage: data.sourcePage ?? "/hyperbaric",
        }),
      });
    } catch {
      // non-blocking
    }
  }

  try {
    const rows = formatFields({
      "Name": data.name ?? `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim(),
      "Email": data.email,
      "Phone": data.phone,
    });
    await sendNotification(
      `HBOT Early Access Signup — ${data.name ?? data.firstName}`,
      emailTemplate("HBOT Early Access Signup", data.sourcePage ?? "/hyperbaric", rows)
    );
  } catch (err) {
    console.error("Email failed:", err);
  }

  try {
    const firstName = data.firstName ?? (data.name ?? "").split(" ")[0] ?? "there";
    await sendConfirmation(
      data.email,
      firstName,
      "🎉 Your 25% HBOT discount is confirmed!",
      `<p>You're officially on our Hyperbaric Oxygen Therapy early access list — and your <strong>25% discount is locked in</strong>.</p>
       <p style="background:#f0fdf4;border-left:4px solid #0d9488;padding:12px 16px;border-radius:4px;margin:20px 0">
         <strong>Save this email and bring it to your first appointment</strong> to redeem your 25% off.
       </p>
       <p>Know someone who could benefit from HBOT? Send them to <a href="https://coshealthcollective.com/hyperbaric" style="color:#0d9488">coshealthcollective.com/hyperbaric</a> — the more the merrier, and they'll thank you for it.</p>
       <p>Want to learn more about what 2.0 ATA HBOT can do for recovery, performance, and longevity? Visit our <a href="https://coshealthcollective.com/hyperbaric" style="color:#0d9488">HBOT page</a>.</p>
       <p style="margin-top:24px">— The CSHC Team</p>`
    );
  } catch (err) {
    console.error("Confirmation email failed:", err);
  }

  return NextResponse.json({ success: true });
}
