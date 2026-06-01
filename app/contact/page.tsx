"use client"; // Wajib karena kita menggunakan state dan interaksi form

import { useState } from "react";

export default function ContactPage() {
  // 1. State untuk menampung data form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceType: "automation",
    message: "",
  });

  // 2. State untuk interaktivitas UI (loading & status sukses)
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 3. Fungsi untuk menangkap setiap ketikan di input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // 4. Fungsi handle submit saat tombol diklik
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah page reload bawaan HTML form
    setIsLoading(true);
    setStatusMessage(null);

    // Tempelkan URL Test Webhook n8n kamu di bawah ini
    const N8N_WEBHOOK_URL = "https://n8n.wikan-ai.my.id/webhook-test/portfolio-inquiry";

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage({
          type: "success",
          text: "Pesan berhasil dikirim! Saya akan menghubungi Anda dalam 24 jam.",
        });
        // Reset form jika sukses
        setFormData({ name: "", email: "", company: "", serviceType: "automation", message: "" });
      } else {
        throw new Error("Gagal mengirim pesan.");
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: "Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-20 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-8 z-10 relative">
        <div className="space-y-3 text-center sm:text-left">
          <a href="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 font-mono">
            ← Kembali ke Beranda
          </a>
          <h1 className="text-4xl font-extrabold tracking-tight">Mari Mulai Kolaborasi</h1>
          <p className="text-slate-400 font-light">
            Punya proses bisnis yang ingin diotomatisasi atau butuh integrasi AI yang aman? Isi form di bawah.
          </p>
        </div>

        {/* Notifikasi Status Sukses / Gagal */}
        {statusMessage && (
          <div className={`p-4 rounded-xl text-sm border ${
            statusMessage.type === "success" 
              ? "bg-emerald-950/40 border-emerald-800 text-emerald-400" 
              : "bg-rose-950/40 border-rose-800 text-rose-400"
          }`}>
            {statusMessage.text}
          </div>
        )}

        {/* Form Form-Inquiry dengan Event onSubmit */}
        <form onSubmit={handleSubmit} className="bg-slate-900/50 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6 backdrop-blur-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-300">Nama Lengkap</label>
              <input 
                type="text" id="name" required placeholder="John Doe"
                value={formData.name} onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Bisnis</label>
              <input 
                type="email" id="email" required placeholder="john@company.com"
                value={formData.email} onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium text-slate-300">Nama Perusahaan <span className="text-slate-500 text-xs">(Opsional)</span></label>
            <input 
              type="text" id="company" placeholder="PT. Maju Mundur Digital"
              value={formData.company} onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="serviceType" className="text-sm font-medium text-slate-300">Layanan yang Dibutuhkan</label>
            <select 
              id="serviceType"
              value={formData.serviceType} onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer text-slate-300"
            >
              <option value="automation">Otomatisasi Alur Kerja / Data Pipeline (n8n, Python)</option>
              <option value="ai-llm">Integrasi AI / Kustomisasi Local LLM & RAG</option>
              <option value="consultation">Konsultasi Arsitektur Sistem / Eksplorasi Masalah</option>
              <option value="other">Lainnya / Project Custom</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-slate-300">Detail Singkat Proyek</label>
            <textarea 
              id="message" rows={4} required placeholder="Ceritakan kendala sistem Anda saat ini..."
              value={formData.message} onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Tombol dengan Kondisi Loading */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
          >
            {isLoading ? "Mengirim Data..." : "Kirim Penawaran Proyek"}
          </button>

        </form>

        <p className="text-center text-xs text-slate-500 font-mono">
          Aman & Privat: Data yang Anda kirimkan diproses secara aman.
        </p>
      </div>
    </main>
  );
}