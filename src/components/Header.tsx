"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-card" : ""
      }`}
    >
      <div
        className={`container-site relative flex items-center justify-between transition-all duration-200 ${
          scrolled ? "h-14" : "h-16 lg:h-20"
        }`}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/lanshore-logo.png"
            alt="Lanshore — Advancing Intelligence"
            width={699}
            height={241}
            priority
            className={`w-auto transition-all duration-200 ${scrolled ? "h-9" : "h-11"}`}
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex"
          aria-label="Main"
        >
          {NAV.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpen(item.label)}
                onMouseLeave={() => setOpen(null)}
              >
                <button
                  className="flex items-center gap-1 rounded px-3 py-2 text-sm font-semibold text-nav hover:text-accent"
                  aria-expanded={open === item.label}
                  onClick={() => setOpen(open === item.label ? null : item.label)}
                >
                  {item.label}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                {open === item.label && (
                  <div className="absolute left-0 top-full w-60 rounded-md border border-line bg-white/90 py-2 shadow-card-hover backdrop-blur-md">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-nav hover:bg-teal-light hover:text-accent"
                        onClick={() => setOpen(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className="rounded px-3 py-2 text-sm font-semibold text-nav hover:text-accent"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-md bg-gold px-4 py-2 text-sm font-bold text-ink-deep hover:bg-gold-hover lg:block"
        >
          Contact Us
        </Link>

        {/* Mobile toggle */}
        <button
          className="text-nav lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="max-h-[calc(100vh-3.5rem)] overflow-y-auto border-t border-line bg-white px-4 pb-4 lg:hidden"
          aria-label="Mobile"
        >
          {NAV.map((item) => (
            <div key={item.label} className="border-b border-line py-2">
              {item.children ? (
                <>
                  <div className="py-1 text-sm font-bold text-nav">{item.label}</div>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="block py-1.5 pl-3 text-sm text-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  href={item.href!}
                  className="block py-1 text-sm font-bold text-nav"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="mt-4 block rounded-md bg-gold px-4 py-2 text-center text-sm font-bold text-ink-deep"
            onClick={() => setMobileOpen(false)}
          >
            Contact Us
          </Link>
        </nav>
      )}
    </header>
  );
}
