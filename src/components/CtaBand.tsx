import Link from "next/link";

export default function CtaBand({
  heading = "Get an SPM Assessment",
  body = "A 30-minute call. We look at your stack, your plan, and where agents remove manual work first.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{heading}</h2>
          <p className="mt-2 max-w-xl text-white/75">{body}</p>
        </div>
        <Link
          href="/contact"
          className="rounded-md bg-gold px-6 py-3 font-semibold text-ink-deep hover:bg-gold-hover"
        >
          Get an SPM Assessment
        </Link>
      </div>
    </section>
  );
}
