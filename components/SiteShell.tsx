import Link from "next/link";
import Navbar from "@/components/Navbar";

// Every page renders inside a centered 1200px column with border rules (the
// redesign's editorial frame) plus nav + footer.
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1200px] mx-auto border-x border-border min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="px-[clamp(18px,4vw,40px)] py-[clamp(36px,4vw,56px)] flex flex-wrap gap-8 justify-between">
        <div className="max-w-[32ch]">
          <div className="flex items-baseline gap-2 mb-3.5">
            <span className="font-mono font-bold text-base">wikan</span>
            <span className="font-mono text-base text-accent">/ai</span>
          </div>
          <p className="text-[13.5px] text-muted leading-relaxed m-0">
            Automation &amp; applied AI, engineered like infrastructure. Private, low-latency, production-grade.
          </p>
        </div>
        <div className="flex gap-[clamp(32px,6vw,80px)]">
          <div className="flex flex-col gap-3">
            <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-subtle">Navigate</div>
            <Link href="/portfolio" className="text-[13.5px] text-muted hover:text-fg transition-colors">Work</Link>
            <Link href="/services" className="text-[13.5px] text-muted hover:text-fg transition-colors">Services</Link>
            <Link href="/about" className="text-[13.5px] text-muted hover:text-fg transition-colors">About</Link>
            <Link href="/blog" className="text-[13.5px] text-muted hover:text-fg transition-colors">Blog</Link>
            <Link href="/contact" className="text-[13.5px] text-muted hover:text-fg transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-subtle">Connect</div>
            <a href="https://github.com/wikan1602" target="_blank" rel="noopener noreferrer" className="text-[13.5px] text-muted hover:text-fg transition-colors">GitHub ↗</a>
            <a href="https://linkedin.com/in/wikan-priambudi" target="_blank" rel="noopener noreferrer" className="text-[13.5px] text-muted hover:text-fg transition-colors">LinkedIn ↗</a>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-[clamp(18px,4vw,40px)] py-4 flex flex-wrap gap-3 justify-between font-mono text-[11px] text-subtle">
        <span>© {year} wikan-ai.my.id — All rights reserved.</span>
        <span>Bandung, Indonesia</span>
      </div>
    </footer>
  );
}
