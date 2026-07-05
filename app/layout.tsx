import type { Metadata } from "next";
import { Schibsted_Grotesk, JetBrains_Mono, Newsreader } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import SiteShell from "@/components/SiteShell";
import "./globals.css";

const sans = Schibsted_Grotesk({
  variable: "--ff-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const mono = JetBrains_Mono({
  variable: "--ff-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Newsreader({
  variable: "--ff-serif",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wikan-ai.my.id"),
  title: "Wikan | Automation & AI Engineer",
  description: "Automation & applied AI, engineered like infrastructure — private, low-latency, production-grade.",
  openGraph: {
    title: "Wikan | Automation & AI Engineer",
    description: "Automation & applied AI, engineered like infrastructure — private, low-latency, production-grade.",
    url: "https://wikan-ai.my.id",
    siteName: "Wikan Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wikan | Automation & AI Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wikan | Automation & AI Engineer",
    description: "Automation & applied AI, engineered like infrastructure — private, low-latency, production-grade.",
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
      <body className={`${sans.variable} ${mono.variable} ${serif.variable} font-sans antialiased bg-bg text-fg min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
