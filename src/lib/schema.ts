import { SITE_URL } from "./site";

export type FaqItem = { question: string; answer: string };

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: "Lanshore",
  legalName: "Lanshore LLC",
  url: SITE_URL,
  logo: `${SITE_URL}/lanshore-logo.png`,
  description:
    "Lanshore is a sales performance management consultancy delivering Agentic SPM: AI agents, executive dashboards, and custom apps for comp operations across the US and Latin America.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1795 N Fry Rd Suite 289",
    addressLocality: "Katy",
    addressRegion: "TX",
    postalCode: "77449",
    addressCountry: "US",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-408-899-0140",
      email: "info@lanshore.com",
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      telephone: "+506-6204-3938",
      email: "infolatin@lanshore.com",
      contactType: "customer service",
      areaServed: ["CR", "MX", "CO", "CL", "PE", "AR"],
      availableLanguage: ["English", "Spanish"],
    },
  ],
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Costa Rica" },
  ],
  sameAs: [
    "https://www.linkedin.com/company/lanshore",
    "https://www.facebook.com/lanshore1",
    "https://x.com/LanshoreLLC",
    "https://www.youtube.com/@Lanshore",
  ],
  knowsAbout: [
    "Sales Performance Management",
    "Incentive Compensation Management",
    "Agentic AI",
    "Robotic Process Automation",
    "Varicent",
    "Xactly Incent",
    "CaptivateIQ",
    "SAP SuccessFactors Incentive Management",
    "Anaplan",
    "Salesforce Spiff",
    "Performio",
    "Everstage",
    "UiPath",
    "n8n",
    "Claude Code",
    "Microsoft Power Automate",
  ],
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Lanshore",
  description:
    "Agentic SPM by Lanshore — sales performance management expertise converged with agentic AI.",
  publisher: { "@id": ORG_ID },
};

/* US office has full address + geocoords (1795 N Fry Rd, Katy TX);
   LATAM office has city/country only. */
export const localBusinessSchemas = [
  {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#localbusiness-us`,
    name: "Lanshore — United States",
    parentOrganization: { "@id": ORG_ID },
    url: `${SITE_URL}/contact`,
    telephone: "+1-408-899-0140",
    email: "info@lanshore.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1795 N Fry Rd Suite 289",
      addressLocality: "Katy",
      addressRegion: "TX",
      postalCode: "77449",
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: 29.8168, longitude: -95.7205 },
    areaServed: { "@type": "Country", name: "United States" },
  },
  {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#localbusiness-latam`,
    name: "Lanshore — Latin America",
    parentOrganization: { "@id": ORG_ID },
    url: `${SITE_URL}/contact`,
    telephone: "+506-6204-3938",
    email: "infolatin@lanshore.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San José",
      addressCountry: "CR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 9.9281, longitude: -84.0907 },
    areaServed: { "@type": "AdministrativeArea", name: "Latin America" },
  },
];

/* FAQPage — the questions/answers passed here MUST also be rendered visibly
   on the page; schema without visible content is treated as spam by Google. */
export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function serviceSchema(pillarName: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Agentic SPM by Lanshore — ${pillarName}`,
    serviceType: pillarName,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Costa Rica" },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.href.startsWith("http") ? item.href : `${SITE_URL}${item.href}`,
    })),
  };
}

/**
 * Serialize a schema object for a <script type="application/ld+json"> sink.
 * JSON.stringify alone is NOT safe inside <script>: a string containing
 * "</script>" terminates the element in the HTML parser and injects live
 * markup. The \uXXXX escapes are valid JSON, so consumers parse the exact
 * original strings.
 */
export function toJsonLd(schema: unknown): string {
  return JSON.stringify(schema)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
