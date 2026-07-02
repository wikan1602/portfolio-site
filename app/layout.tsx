import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteNavbar, SiteFooter } from "@/components/SiteChrome";
import ThemeProvider from "@/components/ThemeProvider";
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg text-fg min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>

          {/* Public nav — hidden on /admin */}
          <SiteNavbar />

          {/* PAGE CONTENT */}
          <div className="flex-grow">
            {children}
          </div>

          {/* Public footer — hidden on /admin */}
          <SiteFooter />

        </ThemeProvider>
      </body>
    </html>
  );
}