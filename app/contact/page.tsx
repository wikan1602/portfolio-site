export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-20 px-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-8 z-10 relative">
        
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left">
          <a href="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 font-mono">
            ← Kembali ke Beranda
          </a>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Mari Mulai Kolaborasi
          </h1>
          <p className="text-slate-400 font-light">
            Punya proses bisnis yang ingin diotomatisasi atau butuh integrasi AI yang aman? Isi form di bawah, saya akan pelajari kebutuhan Anda dalam 24 jam.
          </p>
        </div>

        {/* Form Form-Inquiry */}
        <form className="bg-slate-900/50 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6 backdrop-blur-sm">
          
          {/* Row: Nama & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-300">Nama Lengkap</label>
              <input 
                type="text" 
                id="name" 
                required
                placeholder="John Doe"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Bisnis</label>
              <input 
                type="email" 
                id="email" 
                required
                placeholder="john@company.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Perusahaan / Organisasi */}
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium text-slate-300">Nama Perusahaan <span className="text-slate-500 text-xs">(Opsional)</span></label>
            <input 
              type="text" 
              id="company" 
              placeholder="PT. Maju Mundur Digital"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Jenis Layanan / Kebutuhan */}
          <div className="space-y-2">
            <label htmlFor="service-type" className="text-sm font-medium text-slate-300">Layanan yang Dibutuhkan</label>
            <select 
              id="service-type"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer text-slate-300"
            >
              <option value="automation">Otomatisasi Alur Kerja / Data Pipeline (n8n, Python)</option>
              <option value="ai-llm">Integrasi AI / Kustomisasi Local LLM & RAG</option>
              <option value="consultation">Konsultasi Arsitektur Sistem / Eksplorasi Masalah</option>
              <option value="other">Lainnya / Project Custom</option>
            </select>
          </div>

          {/* Detail Pesan */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-slate-300">Detail Singkat Proyek</label>
            <textarea 
              id="message" 
              rows={4}
              required
              placeholder="Ceritakan kendala sistem Anda saat ini atau fitur AI/Otomatisasi apa yang ingin Anda bangun..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="button" 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-emerald-900/20"
          >
            Kirim Penawaran Proyek
          </button>

        </form>

        {/* Informasi Tambahan */}
        <p className="text-center text-xs text-slate-500 font-mono">
          Aman & Privat: Data yang Anda kirimkan diproses secara aman.
        </p>

      </div>
    </main>
  );
}