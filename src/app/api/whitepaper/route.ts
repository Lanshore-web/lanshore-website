import { NextResponse } from "next/server";
import { getFormId, submitHubSpotForm } from "@/lib/hubspot";
import { getWhitePaper } from "@/lib/whitePapers";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = body?.name != null ? String(body.name).trim() : "";
  if (!body?.email || !name) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!body?.paper || typeof body.paper !== "string") {
    return NextResponse.json({ error: "Paper is required." }, { status: 400 });
  }

  const paper = getWhitePaper(body.paper);
  if (!paper) {
    return NextResponse.json({ error: "Unknown paper." }, { status: 400 });
  }

  const formId = getFormId("whitepaper");
  if (!formId) {
    console.error(
      "HUBSPOT_FORM_ID_WHITEPAPER is not set — white paper submission not delivered:",
      JSON.stringify(body)
    );
    return NextResponse.json(
      { error: "Form delivery is not configured." },
      { status: 503 }
    );
  }

  const [firstname, ...rest] = name.split(/\s+/);
  const fields = [
    { objectTypeId: "0-1", name: "firstname", value: firstname },
    { objectTypeId: "0-1", name: "lastname", value: rest.join(" ") },
    { objectTypeId: "0-1", name: "email", value: body.email },
    {
      objectTypeId: "0-1",
      name: "whitepaper_requested",
      value: paper.hubspotValue,
    },
  ].filter((f) => f.value !== "");

  const result = await submitHubSpotForm(formId, fields, {
    hutk: body.hutk,
    pageUri: body.pageUri,
    pageName: body.pageName,
  });

  if (!result.ok) {
    return NextResponse.json({ error: "Submission failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, url: paper.file });
}
