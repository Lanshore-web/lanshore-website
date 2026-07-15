import Link from "next/link";

export default function CtaBand({
  heading = "Get an SPM Assessment",
  body = "A 30-minute call. We look at your stack, your plan, and where agents remove manual work first.",
  ctaLabel = "Get an SPM Assessment",
  secondaryHref,
  secondaryLabel,
}: {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{heading}</h2>
          <p className="mt-2 max-w-xl text-white/75">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/contact"
            className="rounded-md bg-gold px-6 py-3 font-semibold text-ink-deep hover:bg-gold-hover"
          >
            {ctaLabel}
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link
              href={secondaryHref}
              className="rounded-md border border-white/30 px-6 py-3 text-center font-semibold text-white hover:bg-white/10"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
