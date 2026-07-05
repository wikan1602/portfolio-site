import Link from "next/link";

const DISCIPLINES = [
  {
    key: "A",
    n: "Discipline 01",
    title: "Automation & Scripting",
    desc: "Building integrated data-pipeline ecosystems to eliminate repetitive, error-prone manual data entry.",
    examples: [
      "Automated invoice extraction from emails straight into internal databases.",
      "Multi-platform data sync via custom REST API integration.",
      "Workflow migration from Zapier to self-hosted architecture.",
    ],
    tags: ["n8n", "Python", "PostgreSQL", "Docker"],
  },
  {
    key: "B",
    n: "Discipline 02",
    title: "AI & LLM Integration",
    desc: "Injecting advanced AI into internal systems with a strict focus on data-privacy security.",
    examples: [
      "RAG architectures for searching internal knowledge bases.",
      "On-premise Local LLMs (e.g. Qwen) for sensitive records.",
      "Intelligent agents & chatbots wired into management systems.",
    ],
    tags: ["LangChain", "Local LLM / Qwen", "RAG", "Ollama / vLLM"],
  },
];

const PROCESS = [
  { n: "01", title: "Discovery", desc: "Deep analysis of current workflow bottlenecks and your specific business requirements." },
  { n: "02", title: "Build & Test", desc: "Iterative development engineered with low-latency and performance as top priorities." },
  { n: "03", title: "Handover", desc: "Knowledge transfer, documentation, and production-ready deployment on your own servers." },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b border-border px-[clamp(18px,4vw,40px)] pt-[clamp(40px,6vw,80px)] pb-[clamp(30px,4vw,48px)]">
        <div className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-accent mb-4">IDX.02 — Services</div>
        <h1 className="text-[clamp(34px,5.4vw,66px)] font-extrabold tracking-[-0.035em] m-0 leading-[0.98] max-w-[16ch]">Services &amp; technical solutions.</h1>
        <p className="max-w-[56ch] text-[clamp(15px,1.3vw,18px)] leading-[1.6] text-muted mt-[22px]">
          Bridging business infrastructure with modern automation and artificial intelligence — engineered for maximum operational efficiency, privacy, and low latency.
        </p>
      </section>

      {/* Disciplines */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] border-b border-border">
        {DISCIPLINES.map((d, i) => (
          <div key={d.key} className={`px-[clamp(18px,4vw,40px)] py-[clamp(28px,3.4vw,44px)] ${i === 0 ? "border-r border-border" : "bg-surface"}`}>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-[12px] text-accent">{d.key}/</span>
              <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-subtle">{d.n}</span>
            </div>
            <h2 className="text-[clamp(23px,2.4vw,30px)] font-extrabold tracking-[-0.02em] m-0">{d.title}</h2>
            <p className="text-sm text-muted leading-[1.6] mt-3.5 mb-6">{d.desc}</p>
            <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-subtle mb-3">Implementation examples</div>
            <ul className="list-none p-0 mt-0 mb-6 flex flex-col gap-3">
              {d.examples.map((e) => (
                <li key={e} className="flex gap-[11px] text-[13.5px] text-fg leading-[1.5]">
                  <span className="text-accent font-mono">→</span>{e}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {d.tags.map((t) => (
                <span key={t} className="font-mono text-[11px] text-muted border border-border-strong px-[9px] py-[5px] rounded-[2px]">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Process */}
      <section className="border-b border-border px-[clamp(18px,4vw,40px)] py-[clamp(36px,4vw,60px)]">
        <div className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-subtle mb-7">3 steps of collaboration</div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-px bg-border border border-border">
          {PROCESS.map((p) => (
            <div key={p.n} className="bg-bg px-[clamp(22px,2.6vw,32px)] py-[clamp(22px,2.6vw,32px)]">
              <div className="font-mono text-[28px] font-bold text-accent tracking-[-0.02em]">{p.n}</div>
              <div className="text-[17px] font-bold mt-3.5 mb-2">{p.title}</div>
              <div className="text-[13.5px] text-muted leading-[1.55]">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-[clamp(18px,4vw,40px)] py-[clamp(40px,5vw,72px)] text-center">
        <p className="text-[15px] text-muted mb-[22px]">Have custom integration needs or system bottlenecks to discuss?</p>
        <Link href="/contact" className="inline-flex items-center gap-2.5 bg-fg text-bg text-[15px] font-semibold px-[26px] py-3.5 rounded-[2px] hover:opacity-90 transition-opacity">
          Start a project discussion <span className="font-mono">→</span>
        </Link>
      </section>
    </>
  );
}
