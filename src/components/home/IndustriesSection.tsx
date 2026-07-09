import Link from "next/link";
import { Heart, Radio, Building2, ShoppingBag, Flame, BarChart2 } from "lucide-react";

const INDUSTRIES = [
  { name: "Healthcare", href: "/industries/healthcare", icon: Heart },
  { name: "Telecom", href: "/industries/telecom", icon: Radio },
  { name: "Technology & Digital", href: "/industries/technology-digital", icon: Building2 },
  { name: "Retail", href: "/industries/retail", icon: ShoppingBag },
  { name: "Oil & Gas", href: "/industries/oil-gas", icon: Flame },
  { name: "Financial Services", href: "/industries/financial-services", icon: BarChart2 },
];

export default function IndustriesSection() {
  return (
    <section className="section-padding">
      <div className="container-site">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent">
            Industries We Serve
          </p>
          <h2 className="text-3xl font-black text-accent lg:text-4xl">
            Expertise Across Your Industry
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-foreground">
            Deep domain knowledge in the verticals where SPM and agentic AI matter most.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {INDUSTRIES.map(({ name, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col items-center gap-3 rounded-xl border border-line bg-white p-6 text-center text-sm font-semibold text-accent shadow-card transition-all duration-200 hover:border-accent hover:shadow-card-hover"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-light transition-colors duration-200 group-hover:bg-accent">
                <Icon className="h-7 w-7 text-button transition-colors duration-200 group-hover:text-white" />
              </div>
              <span>{name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
