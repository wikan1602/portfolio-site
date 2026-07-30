import Link from "next/link";

const STATS = [
  { label: "Latency cut", value: "69", suffix: "%", note: "3.6s → 1.1s, cloud→local inference" },
  { label: "Fusion AUC", value: "0.92", suffix: "", note: "Multimodal clinical risk model" },
  { label: "Recognition", value: "1", suffix: "st", note: "WJ Health Tech Innovation 2025" },
  { label: "Shipped", value: "12+", suffix: "", note: "Production systems & pipelines" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-border px-[clamp(18px,4vw,40px)] pt-[clamp(40px,7vw,88px)] pb-[clamp(44px,6vw,72px)]">
        <div className="wp-rise flex flex-wrap items-center gap-3.5 font-mono text-[11.5px] tracking-[0.14em] uppercase text-subtle mb-[clamp(28px,4vw,44px)]">
          <span>IDX.00 — AI &amp; Automation Engineer</span>
          <span className="inline-flex items-center gap-[7px] text-muted">
            <span className="w-[7px] h-[7px] rounded-full bg-live wp-pulse" />
            Available for work
          </span>
        </div>

        <h1 className="wp-rise font-extrabold text-[clamp(38px,7.4vw,92px)] leading-[0.98] tracking-[-0.035em] m-0 max-w-[15ch]" style={{ animationDelay: "0.08s" }}>
          Automation &amp; applied&nbsp;AI, built like <span className="text-accent">infrastructure.</span>
        </h1>

        <div className="flex flex-wrap gap-[clamp(28px,5vw,72px)] mt-[clamp(28px,4vw,44px)] items-start">
          <p className="wp-rise max-w-[52ch] text-[clamp(16px,1.35vw,19px)] leading-[1.6] text-muted m-0" style={{ animationDelay: "0.16s" }}>
            I help teams replace manual, error-prone workflows with private, self-hosted systems — data pipelines built on{" "}
            <span className="text-fg font-semibold">n8n</span>, and secure{" "}
            <span className="text-fg font-semibold">Local-LLM</span> integration that keeps sensitive data in-house.
          </p>

          <div className="wp-rise min-w-[210px] border-t border-border-strong pt-3.5 flex flex-col gap-[11px] font-mono text-[11.5px]" style={{ animationDelay: "0.24s" }}>
            <div className="flex justify-between gap-4"><span className="text-subtle">LOCATION</span><span className="text-fg">Bandung, ID</span></div>
            <div className="flex justify-between gap-4"><span className="text-subtle">FOCUS</span><span className="text-fg text-right">Pipelines · RAG · On-prem AI</span></div>
            <div className="flex justify-between gap-4"><span className="text-subtle">BASE</span><span className="text-fg">Biomedical Eng · ITB</span></div>
          </div>
        </div>

        <div className="wp-rise flex flex-wrap gap-3 mt-[clamp(32px,4vw,48px)]" style={{ animationDelay: "0.32s" }}>
          <Link href="/portfolio" className="inline-flex items-center gap-2.5 bg-fg text-bg text-[14.5px] font-semibold px-[22px] py-[13px] rounded-[2px] hover:opacity-90 transition-opacity">
            See selected work <span className="font-mono">→</span>
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2.5 border border-border-strong text-fg text-[14.5px] font-medium px-[22px] py-[13px] rounded-[2px] hover:border-fg transition-colors">
            Start a project
          </Link>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] border-b border-border">
        {STATS.map((s, i) => (
          <div key={s.label} className={`px-[clamp(18px,3vw,28px)] py-[clamp(24px,3vw,36px)] ${i < STATS.length - 1 ? "border-r border-border" : ""}`}>
            <div className="font-mono text-[11px] tracking-[0.1em] text-subtle uppercase">{s.label}</div>
            <div className="text-[clamp(34px,4vw,46px)] font-extrabold tracking-[-0.03em] mt-2 leading-none">
              {s.value}<span className="text-accent">{s.suffix}</span>
            </div>
            <div className="text-[12.5px] text-muted mt-1.5">{s.note}</div>
          </div>
        ))}
      </section>
    </>
  );
}
