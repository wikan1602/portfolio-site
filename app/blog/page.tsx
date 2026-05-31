export default function BlogPage() {
  // Mock data artikel blog (Sesuai rekomendasi konten di blueprint)
  const articles = [
    {
      slug: "kapan-pakai-n8n-vs-python-script",
      title: "Kapan Harus Pakai n8n vs Tulis Script Python Sendiri?",
      description: "Panduan arsitektur untuk memilih antara visual workflow automation atau custom scripting berdasarkan kompleksitas, skalabilitas, dan maintenance biaya.",
      date: "31 Mei 2026",
      readingTime: "5 min read",
      tags: ["n8n", "Python", "Architecture"]
    },
    {
      slug: "strategi-deploy-local-llm-enterprise",
      title: "Strategi Deploy Local LLM untuk Menjaga Privasi Data Perusahaan",
      description: "Bagaimana startup dan enterprise bisa memanfaatkan model open-source (seperti Qwen) di server internal tanpa membiarkan data sensitif bocor ke API pihak ketiga.",
      date: "25 Mei 2026",
      readingTime: "8 min read",
      tags: ["LLM", "Security", "Private Cloud"]
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-20 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-12 z-10 relative">
        
        {/* Header */}
        <div className="space-y-4 text-center sm:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Technical Blog
          </h1>
          <p className="text-slate-400 text-lg font-light">
            Berbagi opini, tutorial, dan catatan arsitektur seputar dunia otomatisasi workflow, integrasi AI, dan rekayasa perangkat lunak.
          </p>
        </div>

        {/* List Artikel */}
        <div className="space-y-8 pt-4">
          {articles.map((article, index) => (
            <article 
              key={index} 
              className="p-6 rounded-2xl bg-slate-900/30 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/50 transition-all group cursor-pointer"
            >
              <a href={`/blog/${article.slug}`} className="block space-y-3">
                
                {/* Meta: Tanggal & Estimasi Baca */}
                <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readingTime}</span>
                </div>

                {/* Judul Artikel */}
                <h2 className="text-xl font-bold text-slate-200 group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h2>

                {/* Deskripsi Singkat */}
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  {article.description}
                </p>

                {/* Badges / Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {article.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="bg-slate-950 text-slate-500 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-900">
                      #{tag}
                    </span>
                  ))}
                </div>

              </a>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}