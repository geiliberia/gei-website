export const topics = [
  "Donation",
  "Volunteering",
  "School or youth group",
  "Business partnership",
  "Environmental assessment or consultancy",
  "Seedlings or landscaping",
  "Something else",
] as const;
export type Topic = (typeof topics)[number];

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  topic: Topic;
  message: string;
};

// Removes control characters (keeps \n and \r only where multi-line is allowed).
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u2028\u2029]/g;
const clean = (v: unknown, max: number, multiline = false): string => {
  if (typeof v !== "string") return "";
  let s = v.normalize("NFC").replace(CONTROL, "");
  s = multiline ? s.replace(/\r\n?/g, "\n") : s.replace(/[\r\n\t]+/g, " ");
  return s.trim().slice(0, max);
};

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE = /^[+\d][\d\s().-]{5,24}$/;

export function validateContact(raw: unknown): { ok: true; data: ContactInput } | { ok: false; errors: Record<string, string> } {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const name = clean(r.name, 100);
  const email = clean(r.email, 254).toLowerCase();
  const phone = clean(r.phone, 25);
  const message = clean(r.message, 3000, true);
  const topic = topics.find((t) => t === r.topic);

  if (name.length < 2) errors.name = "Enter your name.";
  if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
  if (phone && !PHONE.test(phone)) errors.phone = "Enter a valid phone number, or leave it blank.";
  if (!topic) errors.topic = "Choose what your message is about.";
  if (message.length < 10) errors.message = "Write at least a sentence so we know how to help.";

  if (Object.keys(errors).length || !topic) return { ok: false, errors };
  return { ok: true, data: { name, email, phone, topic, message } };
}
