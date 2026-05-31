import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link"; // Di Next.js, wajib pakai Link untuk navigasi instan tanpa reload
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wikan P. | Automation & AI Specialist",
  description: "Portfolio & Jasa Otomatisasi Workflow & Integrasi AI/LLM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100 min-h-screen flex flex-col`}>
        
        {/* GLOBAL NAVBAR */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo / Nama */}
            <Link href="/" className="font-mono font-bold text-lg tracking-tight text-white hover:text-blue-400 transition-colors">
              wikan<span className="text-blue-500">.dev</span>
            </Link>

            {/* Menu Navigasi */}
            <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
              <Link href="/services" className="hover:text-slate-100 transition-colors">
                Services
              </Link>
              <Link href="/about" className="hover:text-slate-100 transition-colors">
                About
              </Link>
              
              {/* Selipkan Baris Ini */}
              <Link href="/blog" className="hover:text-slate-100 transition-colors">
                Blog
              </Link>
              
              <Link href="/portfolio" className="hover:text-slate-100 transition-colors">
                Portfolio
              </Link> 
              <Link href="/contact" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs transition-colors">
                Hire Me
              </Link>
            </nav>
          </div>
        </header>

        {/* KONTEN HALAMAN (Isinya adalah page.tsx dari masing-masing folder) */}
        <div className="flex-grow">
          {children}
        </div>

        {/* GLOBAL FOOTER */}
        <footer className="w-full border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500 font-mono">
          <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © {new Date().getFullYear()} wikan.dev. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-300 transition-colors">GitHub</a>
              <a href="#" className="hover:text-slate-300 transition-colors">LinkedIn</a>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}