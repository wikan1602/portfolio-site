"use client"; // Wajib untuk komponen yang butuh interaksi seperti klik

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: theme is only known on the client.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="p-2 rounded-lg text-muted hover:text-fg hover:bg-surface transition-colors"
    >
      {!mounted ? (
        <span className="block w-5 h-5" />
      ) : isDark ? (
        // Sun (switch to light)
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        // Moon (switch to dark)
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

export default function Navbar() {
  // State untuk mengontrol buka-tutup menu di HP
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-mono font-bold text-lg tracking-tight text-fg hover:text-blue-400 transition-colors">
          wikan-ai<span className="text-blue-500">.my.id</span>
        </Link>

        {/* DESKTOP MENU (hidden di HP, flex di desktop 'md:') */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted">
          <Link href="/services" className="hover:text-fg transition-colors">Services</Link>
          <Link href="/about" className="hover:text-fg transition-colors">About</Link>
          <Link href="/blog" className="hover:text-fg transition-colors">Blog</Link>
          <Link href="/portfolio" className="hover:text-fg transition-colors">Portfolio</Link>
          <ThemeToggle />
          <Link href="/contact" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs transition-colors">
            Hire Me
          </Link>
        </nav>

        {/* MOBILE CONTROLS (flex di HP, hidden di desktop 'md:') */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-muted hover:text-fg focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU (Hanya muncul di HP jika isOpen === true) */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-bg px-6 py-4 space-y-3 flex flex-col text-sm font-medium text-muted">
          <Link onClick={() => setIsOpen(false)} href="/services" className="hover:text-fg transition-colors py-1">Services</Link>
          <Link onClick={() => setIsOpen(false)} href="/about" className="hover:text-fg transition-colors py-1">About</Link>
          <Link onClick={() => setIsOpen(false)} href="/blog" className="hover:text-fg transition-colors py-1">Blog</Link>
          <Link onClick={() => setIsOpen(false)} href="/portfolio" className="hover:text-fg transition-colors py-1">Portfolio</Link>
          <Link onClick={() => setIsOpen(false)} href="/contact" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs transition-colors inline-block text-center mt-2">
            Hire Me
          </Link>
        </div>
      )}
    </header>
  );
}
