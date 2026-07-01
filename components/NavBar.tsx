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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo variant="nav" />
        <nav className="flex items-center gap-5 sm:gap-8">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-xs uppercase tracking-widest2 transition-colors ${
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
