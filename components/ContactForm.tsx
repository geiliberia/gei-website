"use client";

import { useRef, useState } from "react";
import { topics } from "@/lib/validate";

type State =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent" }
  | { status: "error"; message: string; fields?: Record<string, string> };

export function ContactForm() {
  const [state, setState] = useState<State>({ status: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const fields = state.status === "error" ? state.fields ?? {} : {};

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.status === "sending") return;
    setState({ status: "sending" });
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        formRef.current?.reset();
        setState({ status: "sent" });
      } else {
        setState({ status: "error", message: body.error ?? "Something went wrong. Please call us instead.", fields: body.fields });
      }
    } catch {
      setState({ status: "error", message: "We could not reach the server. Check your connection or call us instead." });
    }
  }

  const err = (k: string) => (fields[k] ? `${k}-err` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div>
        <label htmlFor="name" className="font-semibold">Your name</label>
        <input id="name" name="name" type="text" autoComplete="name" required maxLength={100} className="field" aria-invalid={!!fields.name} aria-describedby={err("name")} />
        {fields.name && <p id="name-err" className="mt-1 text-sm font-medium text-red-700">{fields.name}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="font-semibold">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} className="field" aria-invalid={!!fields.email} aria-describedby={err("email")} />
          {fields.email && <p id="email-err" className="mt-1 text-sm font-medium text-red-700">{fields.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="font-semibold">Phone <span className="font-normal text-ink/65">(optional)</span></label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={25} className="field" aria-invalid={!!fields.phone} aria-describedby={err("phone")} />
          {fields.phone && <p id="phone-err" className="mt-1 text-sm font-medium text-red-700">{fields.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="font-semibold">What is this about?</label>
        <select id="topic" name="topic" required defaultValue="" className="field" aria-invalid={!!fields.topic} aria-describedby={err("topic")}>
          <option value="" disabled>Choose one</option>
          {topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        {fields.topic && <p id="topic-err" className="mt-1 text-sm font-medium text-red-700">{fields.topic}</p>}
      </div>

      <div>
        <label htmlFor="message" className="font-semibold">Message</label>
        <textarea id="message" name="message" rows={6} required maxLength={3000} className="field" aria-invalid={!!fields.message} aria-describedby={err("message")} />
        {fields.message && <p id="message-err" className="mt-1 text-sm font-medium text-red-700">{fields.message}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-forest" disabled={state.status === "sending"}>
          {state.status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-ink/70">We use your details only to reply to you.</p>
      </div>

      <div role="status" aria-live="polite">
        {state.status === "sent" && (
          <p className="border-l-4 border-leaf bg-mist px-4 py-3 font-medium text-forest">Message sent. We will reply to the email address you gave.</p>
        )}
        {state.status === "error" && (
          <p className="border-l-4 border-red-700 bg-red-50 px-4 py-3 font-medium text-red-800">{state.message}</p>
        )}
      </div>
    </form>
  );
}
