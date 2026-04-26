import { NextRequest, NextResponse } from "next/server";
import { sendNotification, sendConfirmation, emailTemplate, formatFields } from "@/lib/mailer";

const BACKEND = process.env.PLATFORM_API_URL ?? "";

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (BACKEND) {
    try {
      await fetch(`${BACKEND}/api/cos-health-collective/for-businesses`, {
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
      "Last Name": data.lastName,
      "Email": data.email,
      "Phone": data.phone,
      "Business Name": data.businessName,
      "Employee Count": data.employeeCount,
      "Preferred Response": data.responseType,
      "Notes": data.notes,
    });
    await sendNotification(
      `New Employer Inquiry — ${data.firstName} ${data.lastName}`,
      emailTemplate("New Employer Inquiry", data.sourcePage ?? "/for-businesses", rows)
    );
  } catch (err) {
    console.error("Email failed:", err);
  }

  try {
    await sendConfirmation(
      data.email,
      data.firstName,
      "We received your employer inquiry",
      `<p>Thank you for your interest in bringing CSHC benefits to your team. We've received your inquiry and will be in touch shortly.</p>
       <p>Learn more about our employer offerings at <a href="https://coshealthcollective.com/for-businesses" style="color:#0d9488">coshealthcollective.com/for-businesses</a>, or simply reply to this email.</p>
       <p style="margin-top:24px">— The CSHC Team</p>`
    );
  } catch (err) {
    console.error("Confirmation email failed:", err);
  }

  return NextResponse.json({ success: true, message: "Inquiry received. We will contact you shortly." });
}
