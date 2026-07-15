import { HUBSPOT_PORTAL_ID } from "@/lib/hubspot-config";

export { HUBSPOT_PORTAL_ID };

export type HubSpotFormKind = "contact" | "newsletter" | "whitepaper" | "careers";

export type HubSpotField = {
  objectTypeId: string;
  name: string;
  value: string;
};

export type HubSpotContext = {
  hutk?: string;
  pageUri?: string;
  pageName?: string;
};

/**
 * Resolve a form GUID from env. Property accesses are static so Next.js can
 * inline them at build time (dynamic `process.env[key]` would not).
 * Contact falls back to the legacy `HUBSPOT_FORM_ID` until Vercel is renamed.
 */
export function getFormId(kind: HubSpotFormKind): string | undefined {
  const contact = process.env.HUBSPOT_FORM_ID_CONTACT || process.env.HUBSPOT_FORM_ID;
  const newsletter = process.env.HUBSPOT_FORM_ID_NEWSLETTER;
  const whitepaper = process.env.HUBSPOT_FORM_ID_WHITEPAPER;
  const careers = process.env.HUBSPOT_FORM_ID_CAREERS;

  switch (kind) {
    case "contact":
      return contact;
    case "newsletter":
      return newsletter;
    case "whitepaper":
      return whitepaper;
    case "careers":
      return careers;
  }
}

/**
 * Submit fields to the HubSpot Forms v3 API (NA2 endpoint).
 * Throws nothing — returns a Result-like object for the route to map to status codes.
 */
export async function submitHubSpotForm(
  formId: string,
  fields: HubSpotField[],
  context: HubSpotContext
): Promise<{ ok: true } | { ok: false; status: number; detail: string }> {
  let response: Response;
  try {
    response = await fetch(
      `https://api-na2.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          context: {
            hutk: context.hutk || undefined,
            pageUri: context.pageUri || undefined,
            pageName: context.pageName || undefined,
          },
        }),
      }
    );
  } catch (err) {
    console.error("HubSpot form submission failed:", err);
    return { ok: false, status: 502, detail: String(err) };
  }

  if (!response.ok) {
    const detail = await response.text();
    console.error("HubSpot form submission failed:", response.status, detail);
    return { ok: false, status: response.status, detail };
  }

  return { ok: true };
}
