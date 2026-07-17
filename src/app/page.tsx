import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import HeroSection from "@/components/home/HeroSection";
import ProblemSolutionSection from "@/components/home/ProblemSolutionSection";
import IntroAgenticSPM from "@/components/home/IntroAgenticSPM";
import DifferentiatorsSection from "@/components/home/DifferentiatorsSection";
import AutomationSection from "@/components/home/AutomationSection";
import SPMComparisonSection from "@/components/home/SPMComparisonSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import HomeContactSection from "@/components/home/HomeContactSection";
import { faqSchema, type FaqItem } from "@/lib/schema";
import { GARTNER_2019 } from "@/lib/site";

export const metadata: Metadata = {
  title: "Agentic SPM by Lanshore | AI Agents for Sales Performance Management",
  description:
    "Lanshore is an SPM implementer with agentic-build capability: one practice that implements your comp platform and builds the agents that run it.",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Lanshore",
    locale: "en_US",
    title: "Agentic SPM by Lanshore | AI Agents for Sales Performance Management",
    description:
      "SPM implementation depth plus agentic-build capability in one practice: executive dashboards, comp operations, and custom apps on the platform you already run.",
    url: "/",
    type: "website",
  },
};

const HOME_FAQ: FaqItem[] = [
  {
    question: "What is Agentic SPM?",
    answer:
      "Agentic SPM is Lanshore's approach to sales performance management that uses AI agents — software that completes multi-step work, not just chat. Agents run comp operations, answer executive questions from live data, and power custom apps that fill platform gaps. It runs alongside the SPM platforms you already own.",
  },
  {
    question: "Why does agentic-build experience matter for SPM?",
    answer:
      "Comp is money with edge cases. Agents that only chat can sound confident and still get payouts wrong. Agentic-build experience means agents that respect plan logic, handle exceptions, leave an audit trail, and know when a human must approve before anything hits payroll.",
  },
  {
    question: "Why does SPM implementation depth matter for AI agents?",
    answer:
      "Agents amplify whatever they are pointed at. Without clean hierarchies, correct plan logic, and cycle reality, they produce wrong answers faster. SPM implementation depth is how the data, rules, and process stay trustworthy enough for agents to act on.",
  },
  {
    question: "What makes Lanshore different?",
    answer:
      "Dual expertise in one practice: we implement and operate SPM platforms, and we build agentic systems on top of them. You are not coordinating an SPM shop and a separate AI vendor who blame each other when something breaks. One team owns platform and agents.",
  },
  {
    question: "Which SPM platforms does Lanshore support?",
    answer:
      "Lanshore implements and operates Varicent, Xactly, CaptivateIQ, SAP SuccessFactors Incentive Management, Anaplan, Salesforce Spiff, Performio, Akeron, and Incentivate. Agentic SPM works on top of any of these platforms; you don't need to switch systems.",
  },
  {
    question: "How is Agentic SPM different from my platform's built-in AI features?",
    answer:
      "Platform AI follows a vendor roadmap inside one product. Agentic SPM is built around your end-to-end process — platform, CRM, spreadsheets, and the people who run the cycle — so agents solve your workflow, not only the features a single vendor ships next.",
  },
  {
    question: "Do we need to replace our comp platform to use Agentic SPM?",
    answer:
      "No. Agentic SPM layers on top of your existing platform. Most engagements start with an assessment of your current stack and identify where agents remove manual work first.",
  },
  {
    question: "What is MCP, and why should buyers care?",
    answer:
      "MCP (Model Context Protocol) is a standard way for AI agents to connect securely to systems and data. In practice, it means agents can act under your policies with a clearer audit trail — without brittle one-off integrations for every tool.",
  },
  {
    question: "Has Lanshore been named in industry analyst research on SPM implementation partners?",
    /* This answer renders visibly via FaqSection AND ships in the FAQPage
       schema from the same array, so the required exact match is structural.
       The second sentence describes the report's topic, not its findings —
       safe under Gartner's quote policy without a license. */
    answer: `${GARTNER_2019.claims.standard} The research note addressed how organizations should evaluate SPM implementation partners across deployments, vendor RFP and evaluation services, and system integration.`,
  },
  {
    question: "What automation tools does Lanshore work with?",
    answer:
      "Whatever your team prefers: UiPath and Microsoft Power Automate for RPA, n8n for workflow orchestration, Claude Code and VS Code for agentic development, and direct API or MCP integrations when a platform-native approach fits better.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQ)} />

      <HeroSection />
      <ProblemSolutionSection />
      <IntroAgenticSPM />
      <DifferentiatorsSection />
      <AutomationSection />
      <SPMComparisonSection />
      <TestimonialSection />
      <IndustriesSection />
      <FaqSection items={HOME_FAQ} />
      <HomeContactSection />
    </>
  );
}
