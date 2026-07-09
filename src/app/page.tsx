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

export const metadata: Metadata = {
  description:
    "Agentic SPM by Lanshore pairs 15+ years of sales performance management delivery with AI agents that run comp operations, answer executive questions, and fill platform gaps.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Agentic SPM by Lanshore | AI Agents for Sales Performance Management",
    description:
      "15+ years of sales performance management delivery, converged with agentic AI: executive dashboards, comp operations, and custom apps.",
    url: "/",
    type: "website",
  },
};

const HOME_FAQ: FaqItem[] = [
  {
    question: "What is Agentic SPM?",
    answer:
      "Agentic SPM is Lanshore's approach to sales performance management that uses AI agents — software that completes multi-step comp tasks autonomously — alongside the SPM platforms you already run. It covers three areas: executive dashboards, comp operations, and custom applications.",
  },
  {
    question: "Which SPM platforms does Lanshore support?",
    answer:
      "Lanshore implements and operates Varicent, Xactly, CaptivateIQ, SAP SuccessFactors Incentive Management, Anaplan, Salesforce Spiff, Performio, and Everstage. Agentic SPM works on top of any of these platforms; you don't need to switch systems.",
  },
  {
    question: "How is Agentic SPM different from my platform's built-in AI features?",
    answer:
      "Platform AI features work inside one vendor's product. Agentic SPM works across your whole stack — platform, CRM, and spreadsheets — and is built around your comp plan rather than a vendor roadmap.",
  },
  {
    question: "Do we need to replace our comp platform to use Agentic SPM?",
    answer:
      "No. Agentic SPM layers on top of your existing platform. Most engagements start with an assessment of your current stack and identify where agents remove manual work first.",
  },
  {
    question: "What automation tools does Lanshore work with?",
    answer:
      "Whatever your team prefers: UiPath and Microsoft Power Automate for RPA, n8n for workflow orchestration, Claude Code and VS Code for agentic development, and direct API integrations when a platform-native approach fits better.",
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
