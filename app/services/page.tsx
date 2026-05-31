export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-20 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 z-10 relative">
        
        {/* Header Halaman */}
        <div className="space-y-4">
          <a href="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 font-mono">
            ← Kembali ke Beranda
          </a>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Layanan & Solusi Teknis
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg font-light">
            Menjembatani infrastruktur bisnis dengan teknologi otomatisasi modern dan kecerdasan buatan untuk efisiensi operasional maksimal.
          </p>
        </div>

        {/* Grid Dua Kategori Utama */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Kategori 1: Automation & Scripting */}
          <div className="bg-slate-900/60 border border-slate-800/80 p-8 rounded-2xl space-y-6 hover:border-slate-700 transition-all backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Automation & Scripting</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Membangun ekosistem data pipeline terintegrasi untuk mengeliminasi entri data manual yang repetitif dan rentan kesalahan.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contoh Implementasi:</h3>
              <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
                <li>Otomatisasi ekstraksi dokumen invoice dari email langsung ke database internal.</li>
                <li>Sinkronisasi data multi-platform via kustomisasi REST API Integration.</li>
                <li>Migrasi alur kerja otomatisasi dari Zapier ke arsitektur mandiri.</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md font-mono border border-slate-700">n8n</span>
              <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md font-mono border border-slate-700">Python</span>
              <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md font-mono border border-slate-700">PostgreSQL</span>
              <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md font-mono border border-slate-700">Docker</span>
            </div>
          </div>

          {/* Kategori 2: AI/LLM Integration */}
          <div className="bg-slate-900/60 border border-slate-800/80 p-8 rounded-2xl space-y-6 hover:border-slate-700 transition-all backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold">AI & LLM Integration</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Menyuntikkan kapabilitas kecerdasan buatan tingkat lanjut ke dalam sistem internal perusahaan dengan fokus penuh pada keamanan data privasi.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Contoh Implementasi:</h3>
              <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside">
                <li>Arsitektur Retrieval-Augmented Generation (RAG) untuk pencarian dokumen pengetahuan internal.</li>
                <li>Deployment Local LLM (seperti Qwen) secara on-premise untuk pemrosesan rekam medis sensitif.</li>
                <li>Agen AI / Chatbot pintar yang terintegrasi ke sistem manajemen perusahaan.</li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md font-mono border border-slate-700">LangChain</span>
              <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md font-mono border border-slate-700">Local LLM / Qwen</span>
              <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md font-mono border border-slate-700">RAG Pipelines</span>
              <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md font-mono border border-slate-700">Ollama / vLLM</span>
            </div>
          </div>

        </div>

        {/* Bagian Cara Kerja / Timeline Ringkas */}
        <div className="border border-slate-800 bg-slate-900/20 p-8 rounded-2xl space-y-6">
          <h3 className="text-xl font-bold text-center">3 Langkah Kolaborasi</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-sm">
            <div className="space-y-2">
              <div className="text-blue-400 font-mono font-bold text-base">01. Discovery</div>
              <p className="text-slate-400">Analisis mendalam mengenai bottlenecks alur kerja dan kebutuhan spesifik bisnis Anda.</p>
            </div>
            <div className="space-y-2">
              <div className="text-purple-400 font-mono font-bold text-base">02. Build & Test</div>
              <p className="text-slate-400">Pengembangan sistem secara iteratif dengan prioritas pada performa latensi rendah.</p>
            </div>
            <div className="space-y-2">
              <div className="text-emerald-400 font-mono font-bold text-base">03. Handover</div>
              <p className="text-slate-400">Transfer teknologi, dokumentasi lengkap, dan deployment siap pakai di server Anda.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center pt-4">
          <p className="text-slate-400 text-sm mb-4">Punya kebutuhan integrasi custom atau masalah sistem yang ingin didiskusikan?</p>
          <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-medium transition-colors">
            Mulai Diskusi Proyek
          </a>
        </div>

      </div>
    </main>
  );
}