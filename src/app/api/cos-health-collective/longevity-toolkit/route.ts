import { NextRequest, NextResponse } from "next/server";
import { sendNotification, sendConfirmation, emailTemplate, formatFields } from "@/lib/mailer";

const BACKEND = process.env.PLATFORM_API_URL ?? "";

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (BACKEND) {
    try {
      await fetch(`${BACKEND}/api/cos-health-collective/longevity-toolkit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // non-blocking
    }
  }

  try {
    const rows = formatFields({
      "First Name": data.firstName,
      "Email": data.email,
    });
    await sendNotification(
      `Longevity Toolkit Download — ${data.firstName}`,
      emailTemplate("Longevity Toolkit Download", data.sourcePage ?? "/longevity-toolkit-download", rows)
    );
  } catch (err) {
    console.error("Email failed:", err);
  }

  try {
    await sendConfirmation(
      data.email,
      data.firstName,
      "Your Longevity Toolkit is on its way",
      `<p>Thanks for downloading the CSHC Longevity Toolkit! Our team will follow up with your copy shortly.</p>
       <p>While you wait, explore our full range of longevity-focused services at <a href="https://coshealthcollective.com" style="color:#0d9488">coshealthcollective.com</a>.</p>
       <p style="margin-top:24px">— The CSHC Team</p>`
    );
  } catch (err) {
    console.error("Confirmation email failed:", err);
  }

  return NextResponse.json({ success: true, message: "Check your inbox for the toolkit." });
}
