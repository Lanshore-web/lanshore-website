export const SITE_URL = "https://lanshore.com";
export const SITE_NAME = "Lanshore";
export const ENTITY = "Agentic SPM by Lanshore";

export const CONTACT = {
  email: "info@lanshore.com",
  phone: "408-899-0140",
  address: "1795 N Fry Rd Suite 289, Katy, TX 77449, USA",
  linkedin: "https://www.linkedin.com/company/lanshore-llc",
};

export const PLATFORMS = [
  "Varicent",
  "Xactly",
  "CaptivateIQ",
  "SAP SuccessFactors Incentive Management",
  "Anaplan",
  "Salesforce Spiff",
  "Performio",
  "Akeron",
];

export type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export const NAV: NavItem[] = [
  {
    label: "Agentic SPM",
    children: [
      { label: "Executive Dashboards", href: "/agentic-spm/executive-dashboards" },
      { label: "SPM Operations", href: "/agentic-spm/operations" },
      { label: "Custom Apps", href: "/agentic-spm/custom-apps" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Services Overview", href: "/services" },
      { label: "Automation & Integration", href: "/services/automation" },
      { label: "SPM Platforms", href: "/spm" },
    ],
  },
  { label: "Case Studies", href: "/case-studies" },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "White Papers", href: "/resources#white-papers" },
      { label: "FAQ & Glossary", href: "/resources/glossary" },
      { label: "Events", href: "/resources#events-press" },
      { label: "Press", href: "/resources#events-press" },
    ],
  },
  {
    label: "About",
    children: [
      { label: "Company", href: "/about" },
      { label: "Why Lanshore", href: "/about/why-lanshore" },
      { label: "Partners", href: "/about/partners" },
      { label: "Careers", href: "/about/careers" },
    ],
  },
];

export const INDUSTRY_LINKS = [
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Telecom", href: "/industries/telecom" },
  { label: "Technology & Digital", href: "/industries/technology-digital" },
  { label: "Retail", href: "/industries/retail" },
  { label: "Oil & Gas", href: "/industries/oil-gas" },
  { label: "Financial Services", href: "/industries/financial-services" },
];

export const SPM_PLATFORM_LINKS = [
  { label: "Varicent", href: "/spm/varicent" },
  { label: "Xactly", href: "/spm/xactly" },
  { label: "CaptivateIQ", href: "/spm/captivateiq" },
  { label: "SAP SuccessFactors Incentive Management", href: "/spm/sap-incentive-management" },
  { label: "Anaplan", href: "/spm/anaplan" },
  { label: "Salesforce Spiff", href: "/spm/salesforce-spiff" },
  { label: "Performio", href: "/spm/performio" },
  { label: "Akeron", href: "/spm/akeron" },
];

export const FOOTER_COLUMNS = [
  {
    heading: "Agentic SPM",
    links: [
      { label: "Executive Dashboards", href: "/agentic-spm/executive-dashboards" },
      { label: "SPM Operations", href: "/agentic-spm/operations" },
      { label: "Custom Apps", href: "/agentic-spm/custom-apps" },
      { label: "Services Overview", href: "/services" },
      { label: "Automation & Integration", href: "/services/automation" },
    ],
  },
  {
    heading: "SPM Platforms",
    links: [{ label: "All Platforms", href: "/spm" }, ...SPM_PLATFORM_LINKS],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Why Lanshore", href: "/about/why-lanshore" },
      { label: "Partners", href: "/about/partners" },
      { label: "Careers", href: "/about/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Industries",
    links: INDUSTRY_LINKS,
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "White Papers", href: "/resources#white-papers" },
      { label: "FAQ & Glossary", href: "/resources/glossary" },
      { label: "Press", href: "/resources#events-press" },
    ],
  },
];
