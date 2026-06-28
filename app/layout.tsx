import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar"; // <-- Import our new Navbar component
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
  metadataBase: new URL("https://wikan-ai.my.id"),
  title: "Wikan | Automation & AI Specialist",
  description: "Portfolio & Services for Workflow Automation & AI/LLM Integration",
  openGraph: {
    title: "Wikan | Automation & AI Specialist",
    description: "Portfolio & Services for Workflow Automation & AI/LLM Integration",
    url: "https://wikan-ai.my.id",
    siteName: "Wikan Portfolio",
    images: [
      {
        url: "/og-image.png", // Mengarah ke public/og-image.png
        width: 1200,
        height: 630,
        alt: "Wikan | Automation & AI Specialist Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wikan | Automation & AI Specialist",
    description: "Portfolio & Services for Workflow Automation & AI/LLM Integration",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100 min-h-screen flex flex-col`}>
        
        {/* Call Navbar Component Here */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="flex-grow">
          {children}
        </div>

        {/* GLOBAL FOOTER */}
        <footer className="w-full border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500 font-mono">
          <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              © {new Date().getFullYear()} wikan-ai.my.id. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a 
                href="https://github.com/wikan1602" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-slate-300 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://linkedin.com/in/wikan-priambudi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-slate-300 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}