"use client"; // Wajib untuk komponen yang butuh interaksi seperti klik

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  // State untuk mengontrol buka-tutup menu di HP
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="font-mono font-bold text-lg tracking-tight text-white hover:text-blue-400 transition-colors">
          wikan-ai<span className="text-blue-500">.my.id</span>
        </Link>

        {/* DESKTOP MENU (hidden di HP, flex di desktop 'md:') */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <Link href="/services" className="hover:text-slate-100 transition-colors">Services</Link>
          <Link href="/about" className="hover:text-slate-100 transition-colors">About</Link>
          <Link href="/blog" className="hover:text-slate-100 transition-colors">Blog</Link>
          <Link href="/portfolio" className="hover:text-slate-100 transition-colors">Portfolio</Link> 
          <Link href="/contact" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs transition-colors">
            Hire Me
          </Link>
        </nav>

        {/* MOBILE HAMBURGER BUTTON (flex di HP, hidden di desktop 'md:') */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-slate-400 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              // Icon X (Tutup) jika menu terbuka
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Icon Hamburger (Garis 3) jika menu tertutup
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU (Hanya muncul di HP jika isOpen === true) */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-900 bg-slate-950 px-6 py-4 space-y-3 flex flex-col text-sm font-medium text-slate-400 animate-fadeIn">
          <Link onClick={() => setIsOpen(false)} href="/services" className="hover:text-slate-100 transition-colors py-1">Services</Link>
          <Link onClick={() => setIsOpen(false)} href="/about" className="hover:text-slate-100 transition-colors py-1">About</Link>
          <Link onClick={() => setIsOpen(false)} href="/blog" className="hover:text-slate-100 transition-colors py-1">Blog</Link>
          <Link onClick={() => setIsOpen(false)} href="/portfolio" className="hover:text-slate-100 transition-colors py-1">Portfolio</Link>
          <Link onClick={() => setIsOpen(false)} href="/contact" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs transition-colors inline-block text-center mt-2">
            Hire Me
          </Link>
        </div>
      )}
    </header>
  );
}