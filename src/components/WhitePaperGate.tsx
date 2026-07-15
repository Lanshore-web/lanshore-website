"use client";

import { useState } from "react";
import { getHutk } from "@/lib/hutk";
import type { WhitePaper } from "@/lib/whitePapers";

export default function WhitePaperGate({ paper }: { paper: WhitePaper }) {
  const [status, setStatus] = useState<"card" | "form" | "sending" | "done" | "error">(
    "card"
  );
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  if (status === "card") {
    return (
      <div className="flex h-full flex-col rounded-lg border border-line bg-white p-6">
        <h3 className="font-bold text-ink">{paper.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{paper.description}</p>
        <button
          type="button"
          onClick={() => setStatus("form")}
          className="mt-4 self-start font-semibold text-accent hover:text-accent-hover"
        >
          Download →
        </button>
      </div>
    );
  }

  if (status === "done" && downloadUrl) {
    return (
      <div className="flex h-full flex-col rounded-lg border border-line bg-white p-6">
        <h3 className="font-bold text-ink">{paper.title}</h3>
        <p className="mt-2 text-sm text-muted">Your download is ready.</p>
        <a
          href={downloadUrl}
          className="mt-4 self-start font-semibold text-accent hover:text-accent-hover"
        >
          Download PDF →
        </a>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-lg border border-line bg-white p-6">
      <h3 className="font-bold text-ink">{paper.title}</h3>
      <p className="mt-1 text-sm text-muted">Enter your details to download.</p>
      <form
        className="mt-4 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setStatus("sending");
          const form = e.currentTarget;
          const data = new FormData(form);
          const res = await fetch("/api/whitepaper", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.get("name"),
              email: data.get("email"),
              paper: paper.slug,
              hutk: getHutk(),
              pageUri: window.location.href,
              pageName: document.title,
            }),
          }).catch(() => null);

          if (!res?.ok) {
            setStatus("error");
            return;
          }

          const json = (await res.json().catch(() => null)) as { url?: string } | null;
          const url = json?.url;
          if (!url) {
            setStatus("error");
            return;
          }
          setDownloadUrl(url);
          setStatus("done");
          window.location.assign(url);
        }}
      >
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink">Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            className="w-full rounded-md border border-line px-3 py-2 focus:border-accent focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink">Work email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            className="w-full rounded-md border border-line px-3 py-2 focus:border-accent focus:outline-none"
          />
        </label>
        {status === "error" && (
          <p className="text-sm font-medium text-red-700">
            Something went wrong. Email us at{" "}
            <a href="mailto:sales@lanshore.com" className="underline">
              sales@lanshore.com
            </a>
            .
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-md bg-gold px-5 py-2.5 font-semibold text-ink-deep hover:bg-gold-hover disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Get the PDF"}
          </button>
          <button
            type="button"
            onClick={() => setStatus("card")}
            className="text-sm text-muted hover:text-ink"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
