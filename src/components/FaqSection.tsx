import type { FaqItem } from "@/lib/schema";

export default function FaqSection({
  items,
  heading = "Frequently asked questions",
}: {
  items: FaqItem[];
  heading?: string;
}) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h2 className="mb-8 text-2xl font-bold text-ink sm:text-3xl">{heading}</h2>
      <dl className="space-y-8">
        {items.map((item) => (
          <div key={item.question} className="border-b border-line pb-6">
            <dt className="mb-2 text-lg font-semibold text-ink">{item.question}</dt>
            <dd className="text-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
