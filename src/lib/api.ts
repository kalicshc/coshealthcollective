async function post(path: string, data: Record<string, unknown>) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Submission failed");
  }
  return res.json();
}

export async function submitDpcInquiry(data: { firstName: string; lastName: string; email: string; phone: string; responseType: string; notes: string; sourcePage: string; }) {
  return post("/api/cos-health-collective/direct-primary-care", data);
}

export async function submitEmployerInquiry(data: { firstName: string; lastName: string; email: string; phone: string; responseType: string; notes: string; sourcePage: string; }) {
  return post("/api/cos-health-collective/for-businesses", data);
}

export async function submitLongevityToolkit(data: { firstName: string; email: string; sourcePage: string; }) {
  return post("/api/cos-health-collective/longevity-toolkit", data);
}

export async function submitHbotEarlyAccess(data: { firstName: string; lastName: string; email: string }) {
  const payload = { name: `${data.firstName} ${data.lastName}`.trim(), firstName: data.firstName, lastName: data.lastName, email: data.email, sourcePage: "/" };
  try {
    await post("/api/hbot/book-interest", payload);
  } catch {
    // non-blocking
  }
}

export async function submitHormoneInquiry(data: { firstName: string; lastName: string; email: string; question: string; sourcePage: string }) {
  return post("/api/hormone/intake", data);
}

export async function submitFreeConsult(data: { firstName: string; lastName: string; email: string; interest: string }) {
  return post("/api/free-consult", { ...data, sourcePage: "/free-consult" });
}
