"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`border border-border rounded-[2px] flex items-center justify-center text-muted hover:text-fg hover:border-border-strong transition-colors ${className}`}
    >
      {!mounted ? "" : isDark ? "☀" : "☾"}
    </button>
  );
}

const NAV = [
  { href: "/portfolio", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-60 bg-bg/85 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-[clamp(18px,4vw,40px)]">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-[9px] text-fg">
          <span className="font-mono font-bold text-[15px] tracking-[-0.02em]">wikan</span>
          <span className="font-mono font-medium text-[15px] text-accent">/ai</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-[clamp(14px,2.4vw,30px)]">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="font-mono text-[12.5px] tracking-[0.02em] text-muted hover:text-fg transition-colors">
              {n.label}
            </Link>
          ))}
          <ThemeToggle className="w-8 h-8 text-sm" />
          <Link href="/contact" className="font-mono text-[12.5px] font-medium bg-accent text-accent-ink px-3.5 py-2 rounded-[2px] tracking-[0.01em] hover:opacity-90 transition-opacity">
            Start a project&nbsp;↗
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle className="w-[34px] h-[34px] text-[15px]" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            className="w-[34px] h-[34px] border border-border rounded-[2px] flex items-center justify-center text-fg font-mono text-base"
          >
            {isOpen ? "✕" : "≡"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border px-[clamp(18px,4vw,40px)] pt-2 pb-[18px] flex flex-col">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setIsOpen(false)}
              className="py-3 border-b border-border font-mono text-sm text-fg"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-3 text-center font-mono text-sm bg-accent text-accent-ink py-3 rounded-[2px]"
          >
            Start a project ↗
          </Link>
        </div>
      )}
    </header>
  );
}
