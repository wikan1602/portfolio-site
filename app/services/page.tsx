export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-bg text-fg py-20 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 z-10 relative">
        
        {/* Page Header */}
        <div className="space-y-4">
          <a href="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 font-mono">
            ← Back to Home
          </a>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Services & Technical Solutions
          </h1>
          <p className="text-muted max-w-2xl text-lg font-light">
            Bridging business infrastructure with modern automation technologies and artificial intelligence for maximum operational efficiency.
          </p>
        </div>

        {/* Grid of Two Core Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Category 1: Automation & Scripting */}
          <div className="bg-surface/60 border border-border/80 p-8 rounded-2xl space-y-6 hover:border-border-strong transition-all backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Automation & Scripting</h2>
              <p className="text-sm text-muted leading-relaxed">
                Building integrated data pipeline ecosystems to eliminate repetitive and error-prone manual data entry tasks.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle">Implementation Examples:</h3>
              <ul className="text-sm text-fg space-y-2 list-disc list-inside">
                <li>Automated invoice document extraction from emails directly into internal databases.</li>
                <li>Multi-platform data synchronization via custom REST API integration.</li>
                <li>Workflow automation migration from Zapier to self-hosted architecture.</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-surface-2 text-fg text-xs px-2.5 py-1 rounded-md font-mono border border-border-strong">n8n</span>
              <span className="bg-surface-2 text-fg text-xs px-2.5 py-1 rounded-md font-mono border border-border-strong">Python</span>
              <span className="bg-surface-2 text-fg text-xs px-2.5 py-1 rounded-md font-mono border border-border-strong">PostgreSQL</span>
              <span className="bg-surface-2 text-fg text-xs px-2.5 py-1 rounded-md font-mono border border-border-strong">Docker</span>
            </div>
          </div>

          {/* Category 2: AI/LLM Integration */}
          <div className="bg-surface/60 border border-border/80 p-8 rounded-2xl space-y-6 hover:border-border-strong transition-all backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">AI & LLM Integration</h2>
              <p className="text-sm text-muted leading-relaxed">
                Injecting advanced artificial intelligence capabilities into internal corporate systems with a strict focus on data privacy security.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle">Implementation Examples:</h3>
              <ul className="text-sm text-fg space-y-2 list-disc list-inside">
                <li>Retrieval-Augmented Generation (RAG) architectures for searching internal knowledge bases.</li>
                <li>On-premise deployment of Local LLMs (such as Qwen) for processing sensitive records safely.</li>
                <li>Intelligent AI agents and chatbots integrated smoothly into corporate management systems.</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-surface-2 text-fg text-xs px-2.5 py-1 rounded-md font-mono border border-border-strong">LangChain</span>
              <span className="bg-surface-2 text-fg text-xs px-2.5 py-1 rounded-md font-mono border border-border-strong">Local LLM / Qwen</span>
              <span className="bg-surface-2 text-fg text-xs px-2.5 py-1 rounded-md font-mono border border-border-strong">RAG Pipelines</span>
              <span className="bg-surface-2 text-fg text-xs px-2.5 py-1 rounded-md font-mono border border-border-strong">Ollama / vLLM</span>
            </div>
          </div>

        </div>

        {/* Process Workflow Section */}
        <div className="border border-border bg-surface/20 p-8 rounded-2xl space-y-6">
          <h3 className="text-xl font-bold text-center">3 Steps of Collaboration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
            <div className="space-y-2">
              <div className="text-blue-400 font-mono font-bold text-base">01. Discovery</div>
              <p className="text-muted">Deep analysis of current workflow bottlenecks and your specific business requirements.</p>
            </div>
            <div className="space-y-2">
              <div className="text-purple-400 font-mono font-bold text-base">02. Build & Test</div>
              <p className="text-muted">Iterative system development engineered with low-latency and performance as top priorities.</p>
            </div>
            <div className="space-y-2">
              <div className="text-emerald-400 font-mono font-bold text-base">03. Handover</div>
              <p className="text-muted">Knowledge transfer, comprehensive documentation, and production-ready deployment on your servers.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center pt-4">
          <p className="text-muted text-sm mb-4">Have custom integration needs or system bottlenecks you want to discuss?</p>
          <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-medium transition-colors">
            Start Project Discussion
          </a>
        </div>

      </div>
    </main>
  );
}