import type { Metadata } from "next";
import EmailReveal from "@/components/EmailReveal";

export const metadata: Metadata = {
  title: "Contact | Wikan",
  description: "Get in touch about automation and applied AI work.",
};

export default function ContactPage() {
  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] border-b border-border">
      {/* Left: intro + contact channels */}
      <div className="border-r border-border px-[clamp(18px,4vw,40px)] py-[clamp(40px,5vw,72px)]">
        <div className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-accent mb-4">IDX.05 — Contact</div>
        <h1 className="text-[clamp(32px,4.6vw,58px)] font-extrabold tracking-[-0.035em] m-0 mb-[22px] leading-[0.98]">Let&apos;s collaborate.</h1>
        <p className="max-w-[44ch] text-[15.5px] text-muted leading-[1.6] m-0 mb-[34px]">
          Have a business process you want to automate, or need secure AI integration? Send me a note.
        </p>

        <div className="flex flex-col gap-px bg-border border border-border">
          <a href="https://github.com/wikan1602" target="_blank" rel="noopener noreferrer" className="bg-bg px-[18px] py-4 flex justify-between items-center font-mono text-[13px] text-fg hover:bg-surface transition-colors">
            <span className="text-subtle">GITHUB</span><span>@wikan1602 ↗</span>
          </a>
          <a href="https://linkedin.com/in/wikan-priambudi" target="_blank" rel="noopener noreferrer" className="bg-bg px-[18px] py-4 flex justify-between items-center font-mono text-[13px] text-fg hover:bg-surface transition-colors">
            <span className="text-subtle">LINKEDIN</span><span>wikan-priambudi ↗</span>
          </a>
          <div className="bg-bg px-[18px] py-4 flex justify-between items-center font-mono text-[13px]">
            <span className="text-subtle">RESPONSE</span><span className="text-fg">&lt; 24 hours</span>
          </div>
        </div>
      </div>

      {/* Right: direct email */}
      <div className="bg-surface px-[clamp(18px,4vw,40px)] py-[clamp(40px,5vw,72px)] flex flex-col">
        <div className="font-mono text-[11px] tracking-[0.06em] uppercase text-subtle mb-3">Email</div>
        <EmailReveal className="text-[clamp(17px,2.4vw,25px)] font-semibold tracking-[-0.02em] text-fg break-all hover:text-accent transition-colors" />
        <p className="max-w-[42ch] text-[14px] text-muted leading-[1.6] mt-5 mb-0">
          Tell me about your current system constraints or bottlenecks — your stack, the scale you&apos;re working at, and what&apos;s slowing you down. I read every message.
        </p>
        <div className="font-mono text-[10.5px] text-subtle mt-8">// No forms, no tracking — just email.</div>
      </div>
    </section>
  );
}
