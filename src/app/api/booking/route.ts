const RESEND_API_URL = "https://api.resend.com/emails";

type BookingPayload = {
  name: string;
  email: string;
  destination?: string;
  groupSize?: string;
  date?: string;
  message?: string;
};

function buildEmailHtml(payload: BookingPayload) {
  const details = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Destination", payload.destination || "Not provided"],
    ["Group size", payload.groupSize || "Not provided"],
    ["Date", payload.date || "Not provided"],
    ["Message", payload.message || "Not provided"],
  ];

  return `
    <h2>New booking request</h2>
    <ul>
      ${details
        .map(([label, value]) => `<li><strong>${label}:</strong> ${value}</li>`)
        .join("")}
    </ul>
  `;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.BOOKING_FROM_EMAIL;
  const toEmail = process.env.BOOKING_TO_EMAIL || "info@ladventure.co.uk";

  if (!apiKey || !fromEmail) {
    return Response.json(
      {
        error: "Booking email is not configured. Please set RESEND_API_KEY and BOOKING_FROM_EMAIL.",
      },
      { status: 500 }
    );
  }

  let payload: BookingPayload;
  try {
    payload = (await request.json()) as BookingPayload;
  } catch {
    return Response.json({ error: "Invalid request payload." }, { status: 400 });
  }

  if (!payload.name || !payload.email) {
    return Response.json({ error: "Name and email are required." }, { status: 400 });
  }

  const response = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email,
      subject: `New booking request from ${payload.name}`,
      html: buildEmailHtml(payload),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return Response.json({ error: errorText || "Failed to send booking request." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
