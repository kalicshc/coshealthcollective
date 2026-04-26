import { NextRequest, NextResponse } from "next/server";
import { sendNotification, sendConfirmation, emailTemplate, formatFields } from "@/lib/mailer";

const BACKEND = process.env.PLATFORM_API_URL ?? "";

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Forward to Railway backend (store in dashboard)
  if (BACKEND) {
    try {
      await fetch(`${BACKEND}/api/cos-health-collective/direct-primary-care`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // non-blocking — email still sends
    }
  }

  // Send email notification
  try {
    const rows = formatFields({
      "First Name": data.firstName,
      "Last Name": data.lastName,
      "Email": data.email,
      "Phone": data.phone,
      "Preferred Response": data.responseType,
      "Notes": data.notes,
    });
    await sendNotification(
      `New DPC Inquiry — ${data.firstName} ${data.lastName}`,
      emailTemplate("New DPC Inquiry", data.sourcePage ?? "/direct-primary-care", rows)
    );
  } catch (err) {
    console.error("Email failed:", err);
  }

  try {
    await sendConfirmation(
      data.email,
      data.firstName,
      "We received your DPC inquiry",
      `<p>Thank you for reaching out about Direct Primary Care. We've received your inquiry and will be in touch shortly${data.responseType === "phone" ? " by phone" : " by email"}.</p>
       <p>In the meantime, feel free to explore our <a href="https://coshealthcollective.com/direct-primary-care" style="color:#0d9488">DPC page</a> or reply to this email with any questions.</p>
       <p style="margin-top:24px">— The CSHC Team</p>`
    );
  } catch (err) {
    console.error("Confirmation email failed:", err);
  }

  return NextResponse.json({ success: true, message: "Inquiry received. We will contact you shortly." });
}
