/**
 * Gated white-paper registry. Each entry maps a public PDF under
 * `/public/whitepapers/` to a HubSpot contact-property option value.
 * Leave empty until PDFs and portal options exist — resources page keeps
 * the "request via contact form" copy while this array is empty.
 *
 * `file` must be a same-origin path: `/whitepapers/<name>.pdf` (no `..`,
 * no protocol-relative or absolute URLs).
 *
 * HubSpot: dropdown contact property `whitepaper_requested` must include
 * an option whose internal value matches each `hubspotValue` below.
 */
export type WhitePaper = {
  slug: string;
  title: string;
  description: string;
  /** Public path, e.g. `/whitepapers/spm-selection.pdf` */
  file: string;
  /** Value of the HubSpot `whitepaper_requested` property option */
  hubspotValue: string;
};

/** Same-origin white-paper PDF under /whitepapers/ only (slug-style names). */
const WHITEPAPER_FILE_RE = /^\/whitepapers\/[a-z0-9][a-z0-9-]*\.pdf$/;

function assertWhitePaperFile(file: string, slug: string): void {
  if (!WHITEPAPER_FILE_RE.test(file)) {
    throw new Error(
      `Invalid white paper file for "${slug}": expected /whitepapers/<slug>.pdf, got "${file}"`
    );
  }
}

export const WHITE_PAPERS: WhitePaper[] = [
  {
    slug: "death-of-commissions",
    title: "The Death of Commissions and Its Subsequent Rebirth",
    description:
      "Why commission structures are evolving—not dying—and how to design plans that fit modern sales roles, from high-risk unit sales to sophisticated team deals.",
    file: "/whitepapers/death-of-commissions.pdf",
    hubspotValue: "death-of-commissions",
  },
  {
    slug: "implementation-methodology",
    title: "Lanshore Implementation Methodology: Commissions",
    description:
      "A seven-phase approach to SPM/commissions delivery—prepare, define, design, develop, and hand over—with the toolkits and checkpoints that keep projects on track.",
    file: "/whitepapers/implementation-methodology.pdf",
    hubspotValue: "implementation-methodology",
  },
  {
    slug: "five-focus-areas-vendor-evaluation",
    title: "Five Focus Areas for a Successful Vendor Evaluation",
    description:
      "Stakeholder buy-in, scorecards, product demos, true implementation cost, and change management—practical criteria for evaluating SPM and enterprise software vendors.",
    file: "/whitepapers/five-focus-areas-vendor-evaluation.pdf",
    hubspotValue: "five-focus-areas-vendor-evaluation",
  },
  {
    slug: "nearshore-team-configuration",
    title: "Nearshore Team Configuration Through the Stages",
    description:
      "How to integrate a nearshore team across design, configuration, testing, UAT, and handover—roles, leadership, and communication that prevent a sunken investment.",
    file: "/whitepapers/nearshore-team-configuration.pdf",
    hubspotValue: "nearshore-team-configuration",
  },
  {
    slug: "retail-corporate-strategy-commissions",
    title: "Retail: Corporate Strategy and Commissions",
    description:
      "Linking retail incentive plans to corporate strategy—people, targets, and ICM automation that motivate store teams while protecting margin.",
    file: "/whitepapers/retail-corporate-strategy-commissions.pdf",
    hubspotValue: "retail-corporate-strategy-commissions",
  },
];

for (const paper of WHITE_PAPERS) {
  assertWhitePaperFile(paper.file, paper.slug);
  if (paper.file !== `/whitepapers/${paper.slug}.pdf`) {
    throw new Error(
      `White paper "${paper.slug}": file path should be /whitepapers/${paper.slug}.pdf`
    );
  }
}

export function getWhitePaper(slug: string): WhitePaper | undefined {
  return WHITE_PAPERS.find((p) => p.slug === slug);
}
