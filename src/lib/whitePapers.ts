/**
 * Gated white-paper registry. Each entry maps a public PDF under
 * `/public/whitepapers/` to a HubSpot contact-property option value.
 * Leave empty until PDFs and portal options exist — resources page keeps
 * the "request via contact form" copy while this array is empty.
 *
 * `file` must be a same-origin path: `/whitepapers/<name>.pdf` (no `..`,
 * no protocol-relative or absolute URLs).
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

/** Same-origin white-paper PDF under /whitepapers/ only. */
const WHITEPAPER_FILE_RE = /^\/whitepapers\/[^./][^/]*\.pdf$/;

function assertWhitePaperFile(file: string, slug: string): void {
  if (!WHITEPAPER_FILE_RE.test(file)) {
    throw new Error(
      `Invalid white paper file for "${slug}": expected /whitepapers/<name>.pdf, got "${file}"`
    );
  }
}

export const WHITE_PAPERS: WhitePaper[] = [
  // Example (uncomment when assets + portal property exist):
  // {
  //   slug: "spm-selection",
  //   title: "Selecting an SPM Platform in the Agentic AI Era",
  //   description: "Criteria, pitfalls, and a practical evaluation checklist.",
  //   file: "/whitepapers/spm-selection.pdf",
  //   hubspotValue: "spm-selection",
  // },
];

for (const paper of WHITE_PAPERS) {
  assertWhitePaperFile(paper.file, paper.slug);
}

export function getWhitePaper(slug: string): WhitePaper | undefined {
  return WHITE_PAPERS.find((p) => p.slug === slug);
}
