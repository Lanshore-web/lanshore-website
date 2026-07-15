"use client";

import { useState } from "react";
import { getHutk } from "@/lib/hutk";

type Variant = "light" | "dark";

export default function NewsletterForm({ variant = "light" }: { variant?: Variant }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const isDark = variant === "dark";
  const labelClass = isDark
    ? "mb-1 block text-sm font-medium text-white/85"
    : "mb-1 block text-sm font-medium text-ink";
  const inputClass = isDark
    ? "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
    : "w-full rounded-md border border-line px-3 py-2 focus:border-accent focus:outline-none";
  const buttonClass = isDark
    ? "rounded-md bg-gold px-5 py-2.5 font-semibold text-ink-deep hover:bg-gold-hover disabled:opacity-60"
    : "rounded-md bg-gold px-5 py-2.5 font-semibold text-ink-deep hover:bg-gold-hover disabled:opacity-60";
  const errorClass = isDark ? "text-sm font-medium text-red-300" : "text-sm font-medium text-red-700";
  const successBorder = isDark ? "border-white/10 bg-white/5" : "border-line bg-paper";
  const successTitle = isDark ? "text-white" : "text-ink";
  const successBody = isDark ? "text-white/60" : "text-muted";
  const linkClass = isDark ? "underline text-white" : "underline";

  if (status === "sent") {
    return (
      <div className={`rounded-md border p-4 text-center ${successBorder}`}>
        <p className={`text-sm font-semibold ${successTitle}`}>You&rsquo;re on the list.</p>
        <p className={`mt-1 text-sm ${successBody}`}>We&rsquo;ll send new SPM &amp; agentic AI posts.</p>
      </div>
    );
  }

  return (
    <form
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("sending");
        const form = e.currentTarget;
        const data = new FormData(form);
        const res = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.get("email"),
            hutk: getHutk(),
            pageUri: window.location.href,
            pageName: document.title,
          }),
        }).catch(() => null);
        setStatus(res?.ok ? "sent" : "error");
      }}
    >
      <label className="block">
        <span className={labelClass}>Work email</span>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            className={inputClass}
          />
          <button type="submit" disabled={status === "sending"} className={buttonClass}>
            {status === "sending" ? "Subscribing…" : "Subscribe"}
          </button>
        </div>
      </label>
      {status === "error" && (
        <p className={errorClass}>
          Something went wrong. Email us at{" "}
          <a href="mailto:sales@lanshore.com" className={linkClass}>
            sales@lanshore.com
          </a>
          .
        </p>
      )}
    </form>
  );
}
