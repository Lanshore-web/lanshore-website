import { SITE_URL, CONTACT } from "@/lib/site";
import { PILLARS } from "@/lib/pillars";
import { SPM_PLATFORMS } from "@/lib/spmPlatforms";
import { INDUSTRIES } from "@/lib/industries";

export const dynamic = "force-static";

/* llms.txt — answer-engine index of the site's entities, per llmstxt.org. */
export function GET() {
  const pillars = PILLARS.map(
    (p) => `- [${p.name}](${SITE_URL}${p.path}): ${p.firstSentence}`
  ).join("\n");

  const platforms = SPM_PLATFORMS.map(
    (p) => `- [${p.name}](${SITE_URL}/spm/${p.slug}): ${p.firstSentence}`
  ).join("\n");

  const industries = INDUSTRIES.map(
    (i) => `- [${i.name}](${SITE_URL}/industries/${i.slug})`
  ).join("\n");

  const body = `# Lanshore

> Lanshore is a sales performance management (SPM) consultancy delivering Agentic SPM: AI agents, executive dashboards, and custom apps for incentive compensation operations. 15+ years of SPM delivery converged with agentic AI. Offices in Katy, Texas (US) and San José, Costa Rica (LATAM delivery).

Key facts:
- Flagship offering: Agentic SPM by Lanshore — three pillars: Executive Dashboards, SPM Operations, Custom Apps
- Platform-agnostic: implements and operates Varicent, Xactly, CaptivateIQ, SAP SuccessFactors Incentive Management, Anaplan, Salesforce Spiff, Performio, Akeron, and Incentivate
- Automation tooling: UiPath, n8n, Claude Code, VS Code, Microsoft Power Automate, direct API and MCP integrations
- Partners: Microsoft Gold Partner, UiPath Fast Track Partner
- Contact: ${CONTACT.email} · ${CONTACT.phone} · ${CONTACT.address}

## Agentic SPM (flagship)

${pillars}

## SPM Platforms

- [SPM Platforms We Implement](${SITE_URL}/spm): technology-agnostic implementation, managed operations, and agentic augmentation across the leading SPM platforms.
${platforms}

## Services

- [Services Overview](${SITE_URL}/services): implementation & consulting, managed services, vendor evaluation, custom agentic AI development.
- [Automation & Integration](${SITE_URL}/services/automation): tool-agnostic automation delivery — UiPath, n8n, Claude Code, VS Code, Microsoft Power Automate, and direct API integrations.

## Industries

${industries}

## Resources

- [Case Studies](${SITE_URL}/case-studies)
- [Blog](${SITE_URL}/blog)
- [SPM Glossary](${SITE_URL}/resources/glossary)
- [About Lanshore](${SITE_URL}/about)
- [Contact](${SITE_URL}/contact)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
