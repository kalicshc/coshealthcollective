import { NextRequest, NextResponse } from "next/server";
import { sendNotification, sendConfirmation, emailTemplate, formatFields } from "@/lib/mailer";
import { isEmail, isNonEmptyString } from "@/lib/validateForm";
import { sendLifeboat } from "@/lib/leadLifeboat";

const BACKEND = process.env.PLATFORM_API_URL ?? "";

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => ({}));

  if (!isNonEmptyString(data.firstName) || !isEmail(data.email) || !isNonEmptyString(data.question)) {
    return NextResponse.json(
      {
        error: "Invalid form data",
        details: {
          firstNameRequired: !isNonEmptyString(data.firstName),
          emailValid: isEmail(data.email),
          questionRequired: !isNonEmptyString(data.question),
        },
      },
      { status: 400 }
    );
  }

  if (BACKEND) {
    try {
      const upstream = await fetch(`${BACKEND}/api/hbot/question`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName ?? ""}`.trim(),
          firstName: data.firstName,
          lastName: data.lastName ?? "",
          email: data.email,
          question: data.question,
          sourcePage: data.sourcePage ?? "/hyperbaric",
        }),
      });
      if (!upstream.ok) {
        await sendLifeboat("HBOT question", data, `Backend returned HTTP ${upstream.status}`).catch(console.error);
      }
    } catch (err) {
      await sendLifeboat("HBOT question", data, `Backend fetch threw: ${(err as Error).message}`).catch(console.error);
    }
  } else {
    await sendLifeboat("HBOT question", data, "PLATFORM_API_URL is not set").catch(console.error);
  }

  try {
    const rows = formatFields({
      "First Name": data.firstName,
      "Last Name": data.lastName,
      "Email": data.email,
      "Question": data.question,
    });
    await sendNotification(
      `Hyperbaric Question — ${data.firstName} ${data.lastName ?? ""}`.trim(),
      emailTemplate("Hyperbaric Question", data.sourcePage ?? "/hyperbaric", rows)
    );
  } catch (err) {
    console.error("Email failed:", err);
  }

  try {
    await sendConfirmation(
      data.email,
      data.firstName,
      "We received your hyperbaric question",
      `<p>Thanks for reaching out about hyperbaric oxygen therapy. We've received your question and will be in touch shortly.</p>
       <p>In the meantime, feel free to explore our <a href="https://coshealthcollective.com/hyperbaric" style="color:#0d9488">Hyperbaric page</a> or reply to this email with anything else.</p>
       <p style="margin-top:24px">— The CSHC Team</p>`
    );
  } catch (err) {
    console.error("Confirmation email failed:", err);
  }

  return NextResponse.json({ ok: true });
}
