import { NextResponse } from "next/server";

const HUBSPOT_PORTAL_ID = "6603479";
// NA2 portal (app-na2.hubspot.com), so submissions go to the na2 forms endpoint.
const HUBSPOT_FORM_ID = process.env.HUBSPOT_FORM_ID;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.email || !body?.name) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  if (!HUBSPOT_FORM_ID) {
    console.error(
      "HUBSPOT_FORM_ID is not set — contact submission not delivered:",
      JSON.stringify(body)
    );
    return NextResponse.json(
      { error: "Form delivery is not configured." },
      { status: 503 }
    );
  }

  const [firstname, ...rest] = String(body.name).trim().split(/\s+/);
  const fields = [
    { objectTypeId: "0-1", name: "firstname", value: firstname },
    { objectTypeId: "0-1", name: "lastname", value: rest.join(" ") },
    { objectTypeId: "0-1", name: "email", value: body.email },
    { objectTypeId: "0-1", name: "company", value: body.company ?? "" },
    { objectTypeId: "0-1", name: "message", value: body.message ?? "" },
  ].filter((f) => f.value !== "");

  const response = await fetch(
    `https://api-na2.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        context: {
          hutk: body.hutk || undefined,
          pageUri: body.pageUri || undefined,
          pageName: body.pageName || undefined,
        },
      }),
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    console.error("HubSpot form submission failed:", response.status, detail);
    return NextResponse.json({ error: "Submission failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
