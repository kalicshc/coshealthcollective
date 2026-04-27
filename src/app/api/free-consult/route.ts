import { NextRequest, NextResponse } from "next/server";
import { sendNotification, sendConfirmation, emailTemplate, formatFields } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const rows = formatFields({
      "First Name": data.firstName,
      "Last Name": data.lastName,
      "Email": data.email,
      "Interested In": data.interest,
      "Source": data.sourcePage ?? "/free-consult",
    });
    await sendNotification(
      `New Free-Consult Signup — ${data.firstName} ${data.lastName} (${data.interest})`,
      emailTemplate("Free Consult + $25 Credit Signup", data.sourcePage ?? "/free-consult", rows)
    );
  } catch (err) {
    console.error("Notification email failed:", err);
  }

  try {
    await sendConfirmation(
      data.email,
      data.firstName,
      "Thanks — we'll be in touch about your free consult",
      `<p>Thank you for signing up at our event! We've got your interest in <strong>${data.interest}</strong> and will reach out shortly to schedule your free consult.</p>
       <p>When you enroll, you'll get <strong>$25 off</strong> as a thank-you for stopping by.</p>
       <p style="margin-top:24px">— The CSHC Team</p>`
    );
  } catch (err) {
    console.error("Confirmation email failed:", err);
  }

  return NextResponse.json({ success: true });
}
