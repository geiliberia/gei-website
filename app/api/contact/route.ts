import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validate";
import { rateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 10_000;
const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

export async function POST(req: Request) {
  // 1. Same-origin only (blocks cross-site form posts).
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  try {
    if (!origin || !host || new URL(origin).host !== host) return json({ error: "Request not allowed." }, 403);
  } catch {
    return json({ error: "Request not allowed." }, 403);
  }

  // 2. JSON only, small bodies only.
  if (!(req.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return json({ error: "Unsupported request." }, 415);
  }
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return json({ error: "Message is too large." }, 413);
  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) return json({ error: "Message is too large." }, 413);

  // 3. Rate limit per client address.
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return json({ error: "Too many messages. Please try again in a few minutes." }, 429);

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // 4. Honeypot: real visitors never fill this hidden field. Pretend success to bots.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) return json({ ok: true });

  // 5. Validate and sanitise every field on the server.
  const result = validateContact(body);
  if (!result.ok) return json({ error: "Please check the highlighted fields.", fields: result.errors }, 422);
  const { name, email, phone, topic, message } = result.data;

  // 6. Deliver as plain text (never HTML), with a fixed subject, so nothing user-supplied can inject markup or headers.
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact:dev]", { name, email, phone, topic, message });
      return json({ ok: true });
    }
    console.error("[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set");
    return json({ error: "The form is temporarily unavailable. Please call us instead." }, 503);
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website message: ${topic}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "not given"}\nTopic: ${topic}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return json({ error: "We could not send your message. Please call us instead." }, 502);
  }
}

export function GET() {
  return json({ error: "Method not allowed." }, 405);
}
