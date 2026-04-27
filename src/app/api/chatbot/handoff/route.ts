import { NextRequest, NextResponse } from "next/server";
import { emailTemplate, formatFields, sendConfirmation, sendNotification } from "@/lib/mailer";

const BACKEND = process.env.PLATFORM_API_URL ?? "";

function transcriptToHtml(
  transcript: Array<{ role?: string; content?: string }>
) {
  return transcript
    .filter((item) => typeof item?.content === "string" && item.content.trim())
    .slice(-12)
    .map((item) => {
      const role = item.role === "assistant" ? "Assistant" : "Visitor";
      return `<p style="margin:0 0 10px"><strong>${role}:</strong> ${item.content}</p>`;
    })
    .join("");
}

function transcriptToText(
  transcript: Array<{ role?: string; content?: string }>
) {
  return transcript
    .filter((item) => typeof item?.content === "string" && item.content.trim())
    .slice(-12)
    .map((item) => {
      const role = item.role === "assistant" ? "Assistant" : "Visitor";
      return `${role}: ${item.content}`;
    })
    .join("\n");
}

async function routeToServiceFlow(
  data: Record<string, unknown>,
  transcriptText: string
) {
  const service = typeof data.service === "string" ? data.service : "";
  const headers = { "Content-Type": "application/json" };
  const sourcePage = typeof data.pagePath === "string" ? data.pagePath : "/";
  const question = typeof data.question === "string" ? data.question : "";
  const firstName = typeof data.firstName === "string" ? data.firstName : "";
  const lastName = typeof data.lastName === "string" ? data.lastName : "";
  const email = typeof data.email === "string" ? data.email : "";
  const combinedNotes = [question, transcriptText ? `Chat transcript:\n${transcriptText}` : ""]
    .filter(Boolean)
    .join("\n\n");

  if (service === "direct-primary-care") {
    await fetch(new URL("/api/cos-health-collective/direct-primary-care", data.origin as string), {
      method: "POST",
      headers,
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone: "",
        responseType: "Email",
        notes: combinedNotes,
        sourcePage,
      }),
    });
    return true;
  }

  if (service === "hormone-care") {
    await fetch(new URL("/api/hormone/intake", data.origin as string), {
      method: "POST",
      headers,
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        question: combinedNotes,
        sourcePage,
      }),
    });
    return true;
  }

  if (service === "hyperbaric") {
    await fetch(new URL("/api/hbot/book-interest", data.origin as string), {
      method: "POST",
      headers,
      body: JSON.stringify({
        firstName,
        lastName,
        name: `${firstName} ${lastName}`.trim(),
        email,
        message: combinedNotes,
        sourcePage,
      }),
    });
    return true;
  }

  if (service === "business-partnership") {
    await fetch(new URL("/api/cos-health-collective/for-businesses", data.origin as string), {
      method: "POST",
      headers,
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone: "",
        businessName: "",
        employeeCount: "",
        responseType: "Email",
        notes: combinedNotes,
        sourcePage,
      }),
    });
    return true;
  }

  return false;
}

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => ({}));

  if (!data?.firstName || !data?.email || !data?.question) {
    return NextResponse.json({ error: "First name, email, and question are required." }, { status: 400 });
  }

  const transcript = Array.isArray(data.transcript) ? data.transcript : [];
  const transcriptHtml = transcriptToHtml(transcript);
  const transcriptText = transcriptToText(transcript);
  const origin = req.nextUrl.origin;

  try {
    const routed = await routeToServiceFlow({ ...data, origin }, transcriptText);
    if (routed) {
      return NextResponse.json({ success: true, routed: true });
    }
  } catch (err) {
    console.error("Chatbot service routing failed:", err);
  }

  if (BACKEND) {
    try {
      await fetch(`${BACKEND}/api/chatbot/handoff`, {
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
      Email: data.email,
      Service: data.service,
      "Page Path": data.pagePath,
      Question: data.question,
    });

    await sendNotification(
      `Chatbot Follow-up — ${data.firstName} ${data.lastName ?? ""}`.trim(),
      `${emailTemplate("Chatbot Follow-up Request", data.pagePath ?? "/", rows)}
      <div style="font-family:sans-serif;max-width:600px;margin:16px auto 0;background:#fff;border-radius:8px;padding:24px 32px">
        <h2 style="margin:0 0 14px;font-size:18px;color:#0d4f4f">Recent chat transcript</h2>
        ${transcriptHtml || "<p style='margin:0;color:#666'>No transcript attached.</p>"}
      </div>`
    );
  } catch (err) {
    console.error("Chatbot handoff email failed:", err);
  }

  try {
    await sendConfirmation(
      data.email,
      data.firstName,
      "We received your message",
      `<p>Thanks for reaching out to Colorado Springs Health Collective. We received your message and someone from the team will follow up with you soon.</p>
       <p>If your question is urgent, call <a href="tel:+17198244716" style="color:#0d9488">(719) 824-4716</a>.</p>
       <p style="margin-top:24px">— The CSHC Team</p>`
    );
  } catch (err) {
    console.error("Chatbot handoff confirmation failed:", err);
  }

  return NextResponse.json({ success: true });
}
