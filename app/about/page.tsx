export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-20 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-12 z-10 relative">
        
        {/* Pengantar / Bio */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tentang Saya
          </h1>
          <p className="text-lg text-slate-300 font-light leading-relaxed">
            Saya adalah seorang <span className="text-blue-400 font-medium">Software & AI Engineer</span> yang berfokus pada menjembatani sistem enterprise tradisional dengan teknologi otomatisasi modern dan kecerdasan buatan (*Artificial Intelligence*).
          </p>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            Dengan latar belakang yang kuat di pengembangan backend dan pengelolaan database, saya membantu bisnis membangun sistem otomatisasi alur kerja (*workflow automation*) yang efisien serta mengintegrasikan *Large Language Models* (LLM) secara mandiri (*self-hosted*) demi menjaga kedaulatan dan privasi data internal perusahaan.
          </p>
        </div>

        {/* Filosofi Kerja */}
        <div className="border-l-2 border-blue-500 pl-4 space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Filosofi Solusi</h3>
          <p className="text-slate-300 text-sm italic font-light">
            "Otomatisasi bukan tentang menggantikan manusia, melainkan mengeliminasi tugas-tugas repetitif yang membosankan agar tim Anda bisa fokus pada inovasi yang berdampak besar."
          </p>
        </div>

        {/* Technical Stack / Keahlian */}
        <div className="space-y-6 pt-4">
          <h2 className="text-2xl font-bold tracking-tight">Technical Stack & Tools</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Box 1: Automation & AI */}
            <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl space-y-3">
              <h3 className="text-sm font-semibold text-blue-400 font-mono">Automation & AI Ecosystem</h3>
              <ul className="text-xs text-slate-400 space-y-2 font-mono">
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
                  LangChain & Python Scripting
                </li>
              </ul>
            </div>

            {/* Box 2: Core Engineering */}
            <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl space-y-3">
              <h3 className="text-sm font-semibold text-purple-400 font-mono">Core Backend & Data</h3>
              <ul className="text-xs text-slate-400 space-y-2 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  C# / .NET Core / ASP.NET Web Forms
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  SQL Server & Database Migration
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Next.js / TypeScript (Frontend)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  Docker Containers & Linux VPS
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-medium">Tertarik mendiskusikan arsitektur sistem?</h4>
            <p className="text-xs text-slate-500">Mari jadwalkan sesi konsultasi singkat gratis.</p>
          </div>
          <a href="/contact" className="bg-slate-100 hover:bg-slate-200 text-slate-950 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap">
            Hubungi Saya
          </a>
        </div>

      </div>
    </main>
  );
}