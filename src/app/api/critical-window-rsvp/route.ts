import { NextRequest, NextResponse } from "next/server";
import { sendNotification, sendConfirmation, emailTemplate, formatFields } from "@/lib/mailer";
import { validate } from "@/lib/validateForm";
import { sendLifeboat } from "@/lib/leadLifeboat";

const BACKEND = process.env.PLATFORM_API_URL ?? "";

const EVENT = "The Critical Window — Fri July 24, 2026 · 5:30 PM · The Lincoln Center, 2727 N Cascade Ave Ste 170, Colorado Springs";

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => ({}));

  const v = validate(data, {
    firstName: "string",
    lastName: "string",
    email: "email",
  });
  if (!v.ok) {
    return NextResponse.json({ error: "Invalid form data", details: v.errors }, { status: 400 });
  }

  // Forward to Railway backend so the RSVP shows up in the dashboard.
  // Like /api/free-consult, the backend has no dedicated endpoint yet, so
  // these ride the DPC inquiries pipeline with clearly labeled metadata.
  if (BACKEND) {
    try {
      const upstream = await fetch(`${BACKEND}/api/cos-health-collective/direct-primary-care`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: "",
          responseType: "Critical Window RSVP",
          notes: `RSVP for ${EVENT}. Free talk, hosted with Onward Physical Therapy.`,
          sourcePage: data.sourcePage ?? "/rsvp",
        }),
      });
      if (!upstream.ok) {
        await sendLifeboat("Critical Window RSVP", data, `Backend returned HTTP ${upstream.status}`).catch(console.error);
      }
    } catch (err) {
      await sendLifeboat("Critical Window RSVP", data, `Backend fetch threw: ${(err as Error).message}`).catch(console.error);
    }
  } else {
    await sendLifeboat("Critical Window RSVP", data, "PLATFORM_API_URL is not set").catch(console.error);
  }

  try {
    const rows = formatFields({
      "First Name": data.firstName,
      "Last Name": data.lastName,
      "Email": data.email,
      "Event": "The Critical Window — Fri July 24 · 5:30 PM",
      "Source": data.sourcePage ?? "/rsvp",
    });
    await sendNotification(
      `New Critical Window RSVP — ${data.firstName} ${data.lastName}`,
      emailTemplate("Critical Window Talk RSVP", data.sourcePage ?? "/rsvp", rows)
    );
  } catch (err) {
    console.error("Notification email failed:", err);
  }

  try {
    await sendConfirmation(
      data.email,
      data.firstName,
      "You're on the list — The Critical Window, Fri July 24",
      `<p>Your seat is saved for <strong>The Critical Window</strong>, a free live talk on the decade that shapes the next 30 years of a woman's health.</p>
       <p><strong>Friday, July 24 · 5:30 PM</strong><br/>
       The Lincoln Center · 2727 N Cascade Ave, Ste 170 · Colorado Springs</p>
       <p>Free to attend, in partnership with Onward Physical Therapy. Bring a friend who needs to hear this — no separate RSVP required.</p>
       <p style="margin-top:24px">See you there,<br/>Logan Crist, PA-C · Colorado Springs Health Collective</p>`
    );
  } catch (err) {
    console.error("Confirmation email failed:", err);
  }

  return NextResponse.json({ success: true });
}
