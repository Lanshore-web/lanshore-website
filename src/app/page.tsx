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
import { faqSchema } from "@/lib/schema";
import { HOME_FAQ } from "@/lib/homeFaq";

export const metadata: Metadata = {
  title: "AI Assisted SPM by Lanshore | AI Agents for Sales Performance Management",
  description:
    "Lanshore is an SPM implementer with agentic-build capability: one practice that implements your comp platform and builds the agents that run it.",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: "Lanshore",
    locale: "en_US",
    title: "AI Assisted SPM by Lanshore | AI Agents for Sales Performance Management",
    description:
      "SPM implementation depth plus agentic-build capability in one practice: executive dashboards, comp operations, and custom apps on the platform you already run.",
    url: "/",
    type: "website",
  },
};

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
    </>
  );
}
