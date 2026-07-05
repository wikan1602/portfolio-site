const CREDIBILITY = [
  { n: "01", title: "1st Place", note: "West Java Health Tech Innovation Competition 2025" },
  { n: "02", title: "Published Research", note: "Presented at the ISPACS 2025 international symposium" },
  { n: "03", title: "Biomedical Eng.", note: "Institut Teknologi Bandung (ITB)" },
];

const STACK = [
  {
    title: "Automation & AI Ecosystem",
    accent: true,
    items: [
      "n8n (Workflow Automation)",
      "Local LLM deployment (Qwen / Ollama)",
      "RAG (Retrieval-Augmented Generation)",
      "LangChain & Python scripting",
    ],
  },
  {
    title: "Core Backend & Data",
    accent: false,
    items: [
      "C# / .NET Core / ASP.NET Web Forms",
      "SQL Server & database migration",
      "Next.js / TypeScript (Frontend)",
      "Docker containers & Linux VPS",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header / Bio */}
      <section className="border-b border-border px-[clamp(18px,4vw,40px)] pt-[clamp(40px,6vw,80px)] pb-[clamp(32px,4vw,52px)]">
        <div className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-accent mb-4">IDX.03 — About</div>
        <h1 className="text-[clamp(34px,5.4vw,66px)] font-extrabold tracking-[-0.035em] m-0 mb-[26px] leading-[0.98]">Wikan Priambudi.</h1>
        <p className="max-w-[62ch] text-[clamp(16px,1.4vw,20px)] leading-[1.55] text-fg mb-4">
          A <span className="text-accent font-semibold">Biomedical Engineer (ITB)</span> turned <span className="text-accent font-semibold">AI &amp; Automation Engineer</span> — I bridge traditional enterprise systems with modern automation and AI, and I&apos;m equally comfortable talking to a clinician about the problem and building the production pipeline that solves it.
        </p>
        <p className="max-w-[62ch] text-[14.5px] leading-[1.65] text-muted m-0">
          With a strong foundation in backend development and database management, I help businesses build efficient workflow automation and integrate self-hosted LLMs — keeping sensitive data private and fully under the company&apos;s own control.
        </p>
      </section>

      {/* Credibility */}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] border-b border-border">
        {CREDIBILITY.map((c, i) => (
          <div key={c.n} className={`px-[clamp(18px,3vw,28px)] py-[clamp(24px,3vw,36px)] ${i < CREDIBILITY.length - 1 ? "border-r border-border" : ""}`}>
            <div className="font-mono text-[11px] text-subtle">{c.n}</div>
            <div className="text-[19px] font-extrabold mt-3 mb-1.5 tracking-[-0.01em]">{c.title}</div>
            <div className="text-[13px] text-muted leading-[1.5]">{c.note}</div>
          </div>
        ))}
      </section>

      {/* Philosophy */}
      <section className="border-b border-border bg-surface px-[clamp(18px,4vw,40px)] py-[clamp(40px,5vw,72px)]">
        <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-subtle mb-5">Solution philosophy</div>
        <p className="font-serif italic text-[clamp(24px,3.4vw,42px)] leading-[1.3] tracking-[-0.01em] max-w-[22ch] m-0">
          Automation isn&apos;t about replacing people. It&apos;s about eliminating the boring work so your team can move the needle.
        </p>
      </section>

      {/* Stack */}
      <section className="px-[clamp(18px,4vw,40px)] py-[clamp(36px,4vw,60px)]">
        <div className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-subtle mb-7">Technical stack &amp; tools</div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-px bg-border border border-border">
          {STACK.map((col) => (
            <div key={col.title} className="bg-bg px-[clamp(22px,2.6vw,32px)] py-[clamp(22px,2.6vw,32px)]">
              <div className={`font-mono text-[13px] font-semibold mb-4 ${col.accent ? "text-accent" : "text-fg"}`}>{col.title}</div>
              <ul className="list-none p-0 m-0 flex flex-col gap-3 font-mono text-[12.5px] text-muted">
                {col.items.map((it) => (
                  <li key={it} className="flex gap-2.5">
                    <span className={col.accent ? "text-accent" : "text-subtle"}>◆</span>{it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
