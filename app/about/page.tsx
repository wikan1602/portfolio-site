export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg text-fg py-20 px-6 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-12 z-10 relative">

        {/* Intro / Bio */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            About Me
          </h1>
          <p className="text-lg text-fg font-light leading-relaxed">
            I&apos;m a <span className="text-blue-400 font-medium">Biomedical Engineer (ITB)</span> turned <span className="text-blue-400 font-medium">AI &amp; Automation Engineer</span>. I bridge traditional enterprise systems with modern automation and artificial intelligence — and because of my background, I&apos;m equally comfortable talking to a clinician about the problem and building the production pipeline that solves it.
          </p>
          <p className="text-muted text-sm leading-relaxed font-light">
            With a strong foundation in backend development and database management, I help businesses build efficient workflow automation and integrate self-hosted Large Language Models (LLMs) — keeping sensitive data private and fully under the company&apos;s own control.
          </p>
        </div>

        {/* Credibility / Proof Points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface/40 border border-border p-5 rounded-xl space-y-1">
            <div className="text-2xl">🏆</div>
            <div className="text-sm font-semibold text-fg">1st Place</div>
            <div className="text-xs text-subtle leading-relaxed">West Java Health Tech Innovation Competition 2025</div>
          </div>
          <div className="bg-surface/40 border border-border p-5 rounded-xl space-y-1">
            <div className="text-2xl">📄</div>
            <div className="text-sm font-semibold text-fg">Published Research</div>
            <div className="text-xs text-subtle leading-relaxed">Presented at ISPACS 2025 international symposium</div>
          </div>
          <div className="bg-surface/40 border border-border p-5 rounded-xl space-y-1">
            <div className="text-2xl">🎓</div>
            <div className="text-sm font-semibold text-fg">Biomedical Eng.</div>
            <div className="text-xs text-subtle leading-relaxed">Institut Teknologi Bandung (ITB)</div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="border-l-2 border-blue-500 pl-4 space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Solution Philosophy</h3>
          <p className="text-fg text-sm italic font-light">
            &quot;Automation isn&apos;t about replacing people — it&apos;s about eliminating the boring, repetitive tasks so your team can focus on the work that actually moves the needle.&quot;
          </p>
        </div>

        {/* Technical Stack / Skills */}
        <div className="space-y-6 pt-4">
          <h2 className="text-2xl font-bold tracking-tight">Technical Stack &amp; Tools</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Box 1: Automation & AI */}
            <div className="bg-surface/40 border border-border p-5 rounded-xl space-y-3">
              <h3 className="text-sm font-semibold text-blue-400 font-mono">Automation &amp; AI Ecosystem</h3>
              <ul className="text-xs text-muted space-y-2 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  n8n (Workflow Automation)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Local LLM deployment (Qwen / Ollama)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  RAG (Retrieval-Augmented Generation)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  LangChain &amp; Python Scripting
                </li>
              </ul>
            </div>

            {/* Box 2: Core Engineering */}
            <div className="bg-surface/40 border border-border p-5 rounded-xl space-y-3">
              <h3 className="text-sm font-semibold text-purple-400 font-mono">Core Backend &amp; Data</h3>
              <ul className="text-xs text-muted space-y-2 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  C# / .NET Core / ASP.NET Web Forms
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  SQL Server &amp; Database Migration
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Next.js / TypeScript (Frontend)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Docker Containers &amp; Linux VPS
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-surface/30 border border-border p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-medium">Interested in discussing your system architecture?</h4>
            <p className="text-xs text-subtle">Let&apos;s schedule a short, free consultation.</p>
          </div>
          <a href="/contact" className="bg-fg hover:opacity-90 text-bg text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap">
            Get in Touch
          </a>
        </div>

      </div>
    </main>
  );
}
