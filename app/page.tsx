export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-fg flex flex-col justify-center items-center px-6 relative overflow-hidden">
      
      {/* Background Glow Light Effect (Modern AI Web Style) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-3xl text-center z-10 space-y-6">
        
        {/* Status Availability Badge */}
        <div className="inline-flex items-center gap-2 bg-surface border border-border px-4 py-1.5 rounded-full text-sm font-medium text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Available for Freelance & Consultation
        </div>

        {/* Main Headline (As per Blueprint) */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-fg">
          I automate boring workflows and build AI-powered tools.
        </h1>

        {/* Sub-headline / Clarifier */}
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto font-light leading-relaxed">
          Helping startups and businesses increase efficiency through data pipeline automation using <span className="text-blue-400 font-medium">n8n</span> and secure, private, & low-latency <span className="text-purple-400 font-medium">Local LLM</span> integration.
        </p>

        {/* Mini Tech Stack Tags */}
        <div className="flex flex-wrap justify-center gap-2 pt-2 text-xs font-mono text-subtle">
          <span>Next.js 15</span> • <span>TypeScript</span> • <span>Python</span> • <span>n8n</span> • <span>LLM Integration</span>
        </div>

        {/* Call to Action (CTA) Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <a 
            href="/services" 
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
          >
            View Services
          </a>
          <a 
            href="/contact" 
            className="bg-surface hover:bg-surface-2 text-fg border border-border px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Contact Me
          </a>
        </div>

      </div>
    </main>
  );
}