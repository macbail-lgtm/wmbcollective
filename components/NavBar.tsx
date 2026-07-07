"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/content";
import Logo from "./Logo";

// Sticky top nav shown on all inner pages (not the landing page).
export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <div className="mx-auto flex min-h-[80px] max-w-6xl items-center justify-between px-12 py-6">
        <Logo variant="nav" />
        <nav className="flex flex-nowrap items-center gap-10 overflow-x-auto">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap font-body text-[11px] font-light uppercase tracking-[3px] transition-colors ${
                  active ? "text-red" : "text-navy hover:text-red"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
