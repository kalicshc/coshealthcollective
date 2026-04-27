import { NextRequest, NextResponse } from "next/server";
import { sendNotification, sendConfirmation, emailTemplate, formatFields } from "@/lib/mailer";

const BACKEND = process.env.PLATFORM_API_URL ?? "";
const BOOKING_URL =
  "https://colorado-springs-health-collective-direct-primary-care.hint.com/booking?appointment-type=appty-5688330a3b52e266";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const fullName = `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim();
  const primaryConcerns =
    data.question?.trim()
    || data.mostBothersome?.trim()
    || "Completed men's hormone quiz";

  // ── Send to backend platform ─────────────────────────────────────────────
  if (BACKEND) {
    try {
      const backendRes = await fetch(`${BACKEND}/api/hormone/intake`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          email: data.email ?? "",
          phone: "Not provided",
          dateOfBirth: "1900-01-01",
          sex: "male",
          serviceInterest: "HORMONE_MENS_QUIZ",
          primaryConcerns,
          currentMedications: "",
          heardAboutUs: "",
          consentToContact: true,
          sourcePage: "/hormone/mens-health/quiz",
          // Quiz result fields — stored in payloadJson, shown as dashboard chips
          age: data.age ?? "",
          leadBucket: data.leadBucket ?? "",
          symptomLabels: Array.isArray(data.symptomLabels) ? data.symptomLabels.join(", ") : "",
          mostBothersome: data.mostBothersome ?? "",
          question: data.question ?? "",
          interest: "Men's Hormone Quiz",
        }),
      });
      if (!backendRes.ok) {
        console.error("Men's hormone quiz backend save failed:", backendRes.status, await backendRes.text());
      }
    } catch (err) {
      console.error("Men's hormone quiz backend save failed:", err);
    }
  }

  // ── Notification email to clinic ─────────────────────────────────────────
  try {
    const rows = formatFields({
      "Name": fullName,
      "Email": data.email ?? "",
      "Age": data.age ?? "Not provided",
      "Primary Pattern": data.leadBucket ?? "N/A",
      "Symptoms": Array.isArray(data.symptomLabels) ? data.symptomLabels.join(", ") : "N/A",
      "Most Bothersome": data.mostBothersome || "Not specified",
      "Question": data.question || "None",
    });
    await sendNotification(
      `Men's Hormone Quiz — ${fullName}`,
      emailTemplate("Men's Hormone Quiz Results", "/hormone/mens-health/quiz", rows),
    );
  } catch (err) {
    console.error("Notification email failed:", err);
  }

  // ── Confirmation email to patient ────────────────────────────────────────
  try {
    await sendConfirmation(
      data.email,
      data.firstName ?? "there",
      "Your men's hormone assessment results",
      `<p style="margin:0 0 16px">Thank you for completing the hormone assessment. We've received your personalized results and a member of our team will be in touch with you soon.</p>
       ${data.mostBothersome ? `<p style="margin:0 0 16px">You noted that <strong>${data.mostBothersome}</strong> has been bothering you most — we'll make sure that's part of the conversation.</p>` : ""}
       <p style="margin:0 0 16px">Want to move faster? You can book a free consult directly:</p>
       <p style="margin:0 0 24px"><a href="${BOOKING_URL}" style="display:inline-block;background:linear-gradient(135deg,#22d3ee,#8b2fe8);color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:600;font-size:14px">Book a Free Consult</a></p>
       <p style="margin:0;color:#64748b;font-size:13px">— The CSHC Hormone Team</p>`,
    );
  } catch (err) {
    console.error("Confirmation email failed:", err);
  }

  return NextResponse.json({ success: true });
}
