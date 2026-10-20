"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const link = (href: string, label: string) => {
    const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return (
      <Link
        key={href}
        href={href}
        aria-current={active ? "page" : undefined}
        className={`py-2 font-medium no-underline hover:text-forest ${active ? "text-forest underline decoration-sun decoration-[3px] underline-offset-[10px]" : "text-ink/80"}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-forest/15 bg-white/90 backdrop-blur-sm">
      <div className="wrap flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 no-underline" aria-label={`${site.name}, home`}>
          <Image src="/images/logo.jpg" alt="" width={56} height={43} priority className="h-11 w-auto" />
          <span className="font-display text-lg font-bold leading-tight text-forest sm:text-xl">
            <span className="sm:hidden">GEI Liberia</span>
            <span className="hidden sm:inline">{site.name}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {nav.filter((n) => n.href !== "/get-involved").map((n) => link(n.href, n.label))}
          <Link href="/get-involved" className="btn-forest">Get involved</Link>
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-sm text-forest md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-forest/15 bg-white md:hidden">
          <div className="wrap flex flex-col py-2">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={pathname === n.href ? "page" : undefined}
                className="border-b border-forest/10 py-3.5 text-lg font-medium text-forest no-underline last:border-0 aria-[current=page]:font-bold"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
