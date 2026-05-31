export default function PortfolioPage() {
  // Mock data proyek (Nanti di Fase 2 bisa dipindah ke file MDX atau database)
  const projects = [
    {
      slug: "migrasi-local-llm-inference",
      title: "Migrasi Cloud API ke Local Inference untuk Optimalisasi Latensi & Biaya",
      description: "Memangkas ketergantungan pada third-party API eksternal dengan mengimplementasikan local open-source model yang di-deploy mandiri pada private cloud server.",
      category: "AI & LLM Integration",
      tags: ["Qwen", "Ollama", "vLLM", "Private Cloud", "Python"],
      impact: "Latensi terpangkas dari 3.6s menjadi 1.1s (Peningkatan performa >60%)"
    },
    {
      slug: "sistem-rag-rekam-medis-aman",
      title: "Arsitektur RAG & Sistem Otomatisasi Analisis Dokumen Administratif",
      description: "Pengembangan sistem Retrieval-Augmented Generation (RAG) untuk otomatisasi summary rekam medis (EMR) dan analisis billing tanpa mengekspos data sensitif ke jaringan luar.",
      category: "Automation / AI",
      tags: ["LangChain", "n8n", "PostgreSQL", "C# / .NET Core"],
      impact: "Otomatisasi pemrosesan dokumen sensitif 100% on-premise & aman"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-20 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 z-10 relative">
        
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Studi Kasus & Proyek
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg font-light">
            Bukti kerja nyata dalam menyelesaikan kendala arsitektur sistem, efisiensi infrastruktur, dan implementasi kecerdasan buatan di dunia riil.
          </p>
        </div>

        {/* Grid Proyek */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all backdrop-blur-sm group"
            >
              <div className="space-y-4">
                {/* Kategori Jasa */}
                <span className="text-xs font-mono font-medium text-blue-400 uppercase tracking-wider">
                  {project.category}
                </span>
                
                {/* Judul Proyek */}
                <h2 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h2>
                
                {/* Deskripsi */}
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  {project.description}
                </p>

                {/* Badges / Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="bg-slate-950 text-slate-400 text-xs px-2.5 py-0.5 rounded border border-slate-800 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Batas Bawah & Highlight Dampak Proyek (Impact) */}
              <div className="mt-6 pt-6 border-t border-slate-800/60 space-y-4">
                <div className="bg-emerald-950/30 border border-emerald-900/30 p-3 rounded-xl">
                  <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-500">Key Impact & Result:</div>
                  <div className="text-xs text-slate-300 mt-0.5 font-medium">{project.impact}</div>
                </div>

                {/* Link ke Detail Case Study */}
                <a 
                  href={`/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Baca Selengkapnya 
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}