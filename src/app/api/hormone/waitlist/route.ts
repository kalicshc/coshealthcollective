import { NextRequest, NextResponse } from "next/server";
import { sendNotification, emailTemplate, formatFields } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const rows = formatFields({
      "Name": data.name,
      "Email": data.email,
    });
    await sendNotification(
      `Hormone Waitlist Signup — ${data.name}`,
      emailTemplate("Hormone Waitlist Signup", data.sourcePage ?? "/", rows)
    );
  } catch (err) {
    console.error("Email failed:", err);
  }

  return NextResponse.json({ success: true });
}
