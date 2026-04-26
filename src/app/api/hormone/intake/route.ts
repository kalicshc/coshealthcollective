import { NextRequest, NextResponse } from "next/server";
import { sendNotification, sendConfirmation, emailTemplate, formatFields } from "@/lib/mailer";

const BACKEND = process.env.PLATFORM_API_URL ?? "";

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (BACKEND) {
    try {
      await fetch(`${BACKEND}/api/hormone/intake`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName ?? "",
          email: data.email,
          phone: data.phone ?? "Not provided",
          dateOfBirth: data.dateOfBirth ?? "1900-01-01",
          sex: data.sex ?? "other",
          serviceInterest: data.serviceInterest ?? "unsure",
          primaryConcerns: data.question ?? data.primaryConcerns ?? "",
          currentMedications: data.currentMedications ?? "",
          heardAboutUs: data.heardAboutUs ?? "",
          consentToContact: true,
          sourcePage: data.sourcePage ?? "/hormone",
        }),
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
      "Question": data.question ?? data.primaryConcerns,
    });
    await sendNotification(
      `Hormone Inquiry — ${data.firstName} ${data.lastName ?? ""}`.trim(),
      emailTemplate("Hormone Inquiry", data.sourcePage ?? "/hormone", rows)
    );
  } catch (err) {
    console.error("Email failed:", err);
  }

  try {
    await sendConfirmation(
      data.email,
      data.firstName,
      "We received your hormone health inquiry",
      `<p>Thank you for reaching out about hormone health. We've received your inquiry and a member of our care team will be in touch with you soon.</p>
       <p>In the meantime you can explore our hormone health services at <a href="https://coshealthcollective.com/hormone" style="color:#0d9488">coshealthcollective.com/hormone</a>.</p>
       <p style="margin-top:24px">— The CSHC Team</p>`
    );
  } catch (err) {
    console.error("Confirmation email failed:", err);
  }

  return NextResponse.json({ success: true, message: "Inquiry received. We will contact you shortly." });
}
