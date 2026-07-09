/* Migrated from lanshore.com. Legacy case studies that predate the agentic
   positioning are tagged under the Services layer per the site spec. */

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  pillar: "Executive Dashboards" | "SPM Operations" | "Custom Apps" | "Services";
  outcome: string;
  challenge: string;
  whatWeDid: string;
  results: string[];
  stack: string[];
  legacyUrl: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "commission-architecture-redesign",
    title: "Architecture redesign to fix a broken compensation process",
    client: "Multi-billion-dollar software company",
    industry: "Technology & Digital",
    pillar: "Services",
    outcome: "Commission process broken for over a year, restored to systematic accuracy",
    challenge:
      "The commission process had been broken for over a year. Payments went out on manual overrides, statements couldn't be trusted, and every cycle added more workarounds on top of a mis-architected implementation.",
    whatWeDid:
      "We redesigned the SPM architecture from the plan document down: rebuilt crediting and calculation logic, removed the override layer, and re-established a controlled monthly cycle.",
    results: [
      "Systematic calculation accuracy restored",
      "Manual override layer eliminated",
      "Controlled, repeatable monthly cycle re-established",
    ],
    stack: ["SPM platform re-architecture", "Plan logic rebuild"],
    legacyUrl:
      "https://lanshore.com/case_studies/architecture-redesign-to-fix-a-broken-compensation-process/",
  },
  {
    slug: "crm-financial-systems-commission-link",
    title: "Linking sales commission data between financial systems and CRM",
    client: "Fortune 500 high-tech company",
    industry: "Technology & Digital",
    pillar: "Services",
    outcome: "Manual link between financial systems and CRM fully automated",
    challenge:
      "Commission data moved between the financial systems and the CRM through a manual process — slow, error-prone, and dependent on a handful of people who knew the steps.",
    whatWeDid:
      "We built an automated integration for commission data between the financial systems and the CRM, with validation on every transfer.",
    results: [
      "Manual transfer process eliminated",
      "Validated data flow between finance and CRM",
      "Key-person dependency removed",
    ],
    stack: ["SPM/CRM integration", "Data validation"],
    legacyUrl:
      "https://lanshore.com/case_studies/linking-sales-commission-data-between-financial-systems-and-crm/",
  },
  {
    slug: "spm-build-on-existing-systems",
    title: "A smart way to build on existing systems to keep pace with growth",
    client: "Fast-growing software vendor",
    industry: "Technology & Digital",
    pillar: "Services",
    outcome: "Audit capability and scalability added without replacing existing systems",
    challenge:
      "A fast-growing software vendor needed audit capability, transparent reporting, and cost modeling that could scale with the business — without ripping out the systems already in place.",
    whatWeDid:
      "We extended the existing SPM setup with audit-ready calculation logic, transparent reporting for reps and finance, and comp cost modeling for planning.",
    results: [
      "Audit capability across the comp process",
      "Transparent reporting for reps and finance",
      "Comp cost modeling for growth planning",
    ],
    stack: ["SPM platform", "Reporting layer"],
    legacyUrl:
      "https://lanshore.com/case_studies/sales-performance-management-a-smart-way-to-build-on-existing-systems-to-keep-pace-with-business-growth/",
  },
  {
    slug: "spreadsheet-to-spm-platform",
    title: "When the pressure gets too much for a manual spreadsheet system",
    client: "Mid-market company",
    industry: "Technology & Digital",
    pillar: "Services",
    outcome: "Variable pay administration moved off Excel onto a governed platform",
    challenge:
      "Variable pay was administered in Excel. The spreadsheets couldn't keep up with plan complexity, and errors were eroding rep trust — but the team was wary of change.",
    whatWeDid:
      "We implemented an SPM platform sized to the plans, migrated the spreadsheet logic, and ran change management so admins and reps came along.",
    results: [
      "Excel-based comp administration retired",
      "Plan logic moved into a governed platform",
      "Rep trust in statements rebuilt",
    ],
    stack: ["SPM platform implementation", "Change management"],
    legacyUrl:
      "https://lanshore.com/case_studies/sales-compensation-when-the-pressure-gets-too-much-for-a-manual-spreadsheet/",
  },
  {
    slug: "managed-services-commission-management",
    title: "Tackling resource challenges with expert advice and managed services",
    client: "Correctional telephone services provider",
    industry: "Telecom",
    pillar: "Services",
    outcome: "Error-prone manual Excel commission process replaced with managed operations",
    challenge:
      "Commissions ran on nothing but a manual Excel system — frequent errors, no structured reporting, and no in-house resources to fix it.",
    whatWeDid:
      "We took over commission operations as a managed service: structured calculation runs, error controls, and standardized reporting.",
    results: [
      "Frequent calculation errors eliminated",
      "Structured reporting established",
      "Comp operations covered without new headcount",
    ],
    stack: ["Managed services", "Excel replacement"],
    legacyUrl:
      "https://lanshore.com/case_studies/tackling-resource-challenges-with-expert-advice-and-managed-services/",
  },
  {
    slug: "flexible-spm-for-changing-business",
    title: "Reacting to changing business needs for variable compensation",
    client: "Procurement technology provider",
    industry: "Technology & Digital",
    pillar: "Services",
    outcome: "Third-party dependency for every plan change replaced with a flexible model",
    challenge:
      "Every comp plan change meant engaging third-party service providers — slow and expensive, with the business changing faster than vendors could respond.",
    whatWeDid:
      "We restructured the SPM configuration for maintainability and set up a flexible support model so plan changes ship in days, not procurement cycles.",
    results: [
      "Plan changes delivered without third-party lock-in",
      "Faster response to business changes",
      "Lower cost per change",
    ],
    stack: ["SPM platform", "Support model redesign"],
    legacyUrl:
      "https://lanshore.com/case_studies/technology-reacting-to-changing-business-needs-for-variable-compensation/",
  },
  {
    slug: "rpa-sales-territory-tracking",
    title: "Software company increases sales and territory tracking with automation",
    client: "Software company",
    industry: "Technology & Digital",
    pillar: "Services",
    outcome: "Daily manual process cut from 8–12 hours across two employees to 20 minutes",
    challenge:
      "A daily sales and territory tracking process consumed 8–12 hours across two employees, every day, before the sales team could act on the data.",
    whatWeDid:
      "We automated the end-to-end process — data pulls, matching, and distribution — so it runs unattended each morning.",
    results: [
      "8–12 hours of daily manual work reduced to 20 minutes",
      "Two employees freed for higher-value work",
      "Sales team working from current data every morning",
    ],
    stack: ["UiPath RPA"],
    legacyUrl:
      "https://lanshore.com/case_studies/rpa-automation-of-processes-software-company-increases-sales-and-territory-tracking-to-enhance-customer-satisfaction/",
  },
  {
    slug: "rpa-banking-sba-loans",
    title: "Enhancing productivity in banking during peak loan volume",
    client: "Bank",
    industry: "Financial Services",
    pillar: "Services",
    outcome: "$503M in SBA loans processed with automation during peak volume",
    challenge:
      "SBA loan volume spiked far past what the team could process manually, with businesses waiting on funds.",
    whatWeDid:
      "We built RPA automation for loan processing steps so the bank could absorb the volume without proportional headcount.",
    results: [
      "$503,000,000 in SBA loans processed",
      "3,000+ applicants served",
      "Throughput scaled without new hires",
    ],
    stack: ["UiPath RPA"],
    legacyUrl:
      "https://lanshore.com/case_studies/rpa-enhancing-productivity-in-retail-using-rpa-to-eliminate-backlogs-and-get-orders-to-customers/",
  },
  {
    slug: "rpa-retail-order-processing",
    title: "Eliminating backlogs and getting orders to customers in retail",
    client: "Apparel company",
    industry: "Retail",
    pillar: "Services",
    outcome: "Order processing reduced to eight minutes, clearing the backlog",
    challenge:
      "Order processing backlogs were delaying shipments and frustrating customers during peak periods.",
    whatWeDid:
      "We replicated the manual order process with RPA and tuned it until a full order ran in eight minutes.",
    results: [
      "Order processing time cut to 8 minutes",
      "Backlog cleared",
      "Peak-period orders shipped on time",
    ],
    stack: ["UiPath RPA"],
    legacyUrl:
      "https://lanshore.com/case_studies/rpa-enhancing-productivity-in-retail-using-rpa-to-eliminate-backlogs-and-get-orders-to-customers-in-retail/",
  },
  {
    slug: "rpa-government-reports",
    title: "Automation of civil reports for a government office",
    client: "Government office",
    industry: "Public Sector",
    pillar: "Services",
    outcome: "Weekly report run cut to 15 minutes, freeing 520 work hours a year",
    challenge:
      "Weekly civil reports consumed hours of staff time that should have gone to serving constituents.",
    whatWeDid:
      "We automated report generation end to end, cutting the weekly run to 15 minutes.",
    results: [
      "Weekly run time reduced to 15 minutes",
      "520 annual work hours freed",
      "Staff redeployed to constituent service",
    ],
    stack: ["UiPath RPA"],
    legacyUrl:
      "https://lanshore.com/case_studies/rpa-automation-of-reports-governmental-answer-to-serving-constituents-more-efficiently-while-raising-job-satisfaction-of-multiple-employees/",
  },
  {
    slug: "rpa-healthcare-provider",
    title: "Customized automation for a home and community-based healthcare provider",
    client: "Diversified independent healthcare provider",
    industry: "Healthcare",
    pillar: "Services",
    outcome: "Clinical and operational processes optimized across multiple service settings",
    challenge:
      "A leading home and community-based healthcare provider needed clinical and operational optimization across multiple service settings, each with its own systems and rules.",
    whatWeDid:
      "We built customized RPA solutions per service setting, standardizing where possible and automating the highest-volume workflows first.",
    results: [
      "High-volume workflows automated across settings",
      "Clinical staff time returned to patient care",
      "Standardized process baseline established",
    ],
    stack: ["UiPath RPA"],
    legacyUrl: "https://lanshore.com/case_studies/customized-rpa-solutions-for-healthcare/",
  },
  {
    slug: "rpa-manufacturing-plants",
    title: "Automating manufacturing plants to stay competitive",
    client: "Manufacturer",
    industry: "Manufacturing",
    pillar: "Services",
    outcome: "Business-critical daily processes automated, freeing employee capacity",
    challenge:
      "Business-critical processes had to finish daily, and they were consuming employee time needed elsewhere in the plant.",
    whatWeDid:
      "We automated the daily critical processes with RPA so they complete on schedule without pulling staff off other duties.",
    results: [
      "Daily critical processes run unattended",
      "Employee capacity returned to plant operations",
      "On-schedule completion every day",
    ],
    stack: ["UiPath RPA"],
    legacyUrl:
      "https://lanshore.com/case_studies/rpa-automating-manufacturing-plants-to-make-them-more-competitive-in-all-markets/",
  },
  {
    slug: "oilfield-invoicing-automation",
    title: "Revolutionizing oilfield invoicing with automation",
    client: "L&L Oilfield",
    industry: "Oil & Gas",
    pillar: "Services",
    outcome: "Invoice processing cut from hours to minutes per ticket",
    challenge:
      "Field ticket invoicing was a manual, hours-per-ticket process that delayed billing and tied up office staff.",
    whatWeDid:
      "We implemented UiPath RPA to process field tickets and generate invoices automatically, with exceptions routed for review.",
    results: [
      "Processing time cut from hours to minutes per ticket",
      "Billing cycle shortened",
      "Office staff freed from manual entry",
    ],
    stack: ["UiPath RPA"],
    legacyUrl: "https://lanshore.com/",
  },
  {
    slug: "rpa-university-enrollments",
    title: "Graduate enrollment follow-up that helps more students reach their goals",
    client: "University",
    industry: "Education",
    pillar: "Services",
    outcome: "Prospective students no longer lost between application steps",
    challenge:
      "The university was losing track of prospective students who started but didn't complete enrollment forms — and losing the students with them.",
    whatWeDid:
      "We built RPA-driven follow-up that identifies incomplete applications and triggers outreach at the right step.",
    results: [
      "Incomplete applications identified automatically",
      "Timely follow-up at every enrollment step",
      "More prospective students completing enrollment",
    ],
    stack: ["UiPath RPA"],
    legacyUrl:
      "https://lanshore.com/case_studies/rpa-university-graduate-enrollments-follow-up-means-more-students-successfully-reach-their-goals/",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}
