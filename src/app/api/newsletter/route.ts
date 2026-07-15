import { NextResponse } from "next/server";
import { getFormId, submitHubSpotForm } from "@/lib/hubspot";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const formId = getFormId("newsletter");
  if (!formId) {
    console.error(
      "HUBSPOT_FORM_ID_NEWSLETTER is not set — newsletter submission not delivered:",
      JSON.stringify(body)
    );
    return NextResponse.json(
      { error: "Form delivery is not configured." },
      { status: 503 }
    );
  }

  const fields = [
    { objectTypeId: "0-1", name: "email", value: String(body.email) },
  ];

  const result = await submitHubSpotForm(formId, fields, {
    hutk: body.hutk,
    pageUri: body.pageUri,
    pageName: body.pageName,
  });

  if (!result.ok) {
    return NextResponse.json({ error: "Submission failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
