export const SITE_URL = "https://lanshore.com";
export const SITE_NAME = "Lanshore";
export const ENTITY = "Agentic SPM by Lanshore";

export const CONTACT = {
  email: "sales@lanshore.com",
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
  "Incentivate",
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

