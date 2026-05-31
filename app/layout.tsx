import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar"; // <-- Impor komponen Navbar baru kita
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
        
        {/* Panggil Navbar Komponen di Sini */}
        <Navbar />

        {/* KONTEN HALAMAN */}
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