"use client";

import { useState } from "react";

const inputClass =
  "bg-bg border border-border-strong rounded-[2px] px-[13px] py-[11px] text-sm text-fg outline-none focus:border-accent transition-colors";
const labelClass =
  "font-mono text-[11px] tracking-[0.06em] uppercase text-subtle";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceType: "automation",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);

    const N8N_WEBHOOK_URL = "https://n8n.wikan-ai.my.id/webhook/portfolio-inquiry";

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage({ type: "success", text: "Message sent successfully! I'll get back to you within 24 hours." });
        setFormData({ name: "", email: "", company: "", serviceType: "automation", message: "" });
      } else {
        throw new Error("Failed to send message.");
      }
    } catch {
      setStatusMessage({ type: "error", text: "A system error occurred. Please try again in a few moments." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] border-b border-border">
      {/* Left: intro + contact channels */}
      <div className="border-r border-border px-[clamp(18px,4vw,40px)] py-[clamp(40px,5vw,72px)]">
        <div className="font-mono text-[11.5px] tracking-[0.14em] uppercase text-accent mb-4">IDX.05 — Contact</div>
        <h1 className="text-[clamp(32px,4.6vw,58px)] font-extrabold tracking-[-0.035em] m-0 mb-[22px] leading-[0.98]">Let&apos;s collaborate.</h1>
        <p className="max-w-[44ch] text-[15.5px] text-muted leading-[1.6] m-0 mb-[34px]">
          Have a business process you want to automate, or need secure AI integration? Tell me about it.
        </p>

        <div className="flex flex-col gap-px bg-border border border-border">
          <a href="https://github.com/wikan1602" target="_blank" rel="noopener noreferrer" className="bg-bg px-[18px] py-4 flex justify-between items-center font-mono text-[13px] text-fg hover:bg-surface transition-colors">
            <span className="text-subtle">GITHUB</span><span>@wikan1602 ↗</span>
          </a>
          <a href="https://linkedin.com/in/wikan-priambudi" target="_blank" rel="noopener noreferrer" className="bg-bg px-[18px] py-4 flex justify-between items-center font-mono text-[13px] text-fg hover:bg-surface transition-colors">
            <span className="text-subtle">LINKEDIN</span><span>wikan-priambudi ↗</span>
          </a>
          <div className="bg-bg px-[18px] py-4 flex justify-between items-center font-mono text-[13px]">
            <span className="text-subtle">RESPONSE</span><span className="text-fg">&lt; 24 hours</span>
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="bg-surface px-[clamp(18px,4vw,40px)] py-[clamp(32px,4vw,56px)]">
        {statusMessage && (
          <div
            className={`px-4 py-3.5 rounded-[2px] text-[13.5px] mb-[22px] leading-[1.5] border ${
              statusMessage.type === "success"
                ? "border-live/50 text-live"
                : "border-accent/50 text-accent"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={labelClass}>Full name</label>
              <input type="text" id="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} className={inputClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClass}>Business email</label>
              <input type="email" id="email" required placeholder="john@company.com" value={formData.email} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="company" className={labelClass}>Company <span className="text-subtle normal-case tracking-normal">(optional)</span></label>
            <input type="text" id="company" placeholder="Acme Corporation" value={formData.company} onChange={handleChange} className={inputClass} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="serviceType" className={labelClass}>Required service</label>
            <select id="serviceType" value={formData.serviceType} onChange={handleChange} className={`${inputClass} cursor-pointer`}>
              <option value="automation">Workflow Automation / Data Pipelines (n8n, Python)</option>
              <option value="ai-llm">AI Integration / Custom Local LLM &amp; RAG</option>
              <option value="consultation">System Architecture Consultation</option>
              <option value="other">Other / Custom Project</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className={labelClass}>Project details</label>
            <textarea id="message" rows={4} required placeholder="Tell me about your current system constraints or bottlenecks..." value={formData.message} onChange={handleChange} className={`${inputClass} resize-y font-sans`} />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-accent text-accent-ink text-[14.5px] font-semibold py-3.5 rounded-[2px] hover:opacity-90 disabled:opacity-60 transition-opacity"
          >
            {isLoading ? "Sending inquiry..." : "Submit project inquiry →"}
          </button>
          <div className="font-mono text-[10.5px] text-subtle text-center">// Secure &amp; private — your data is processed safely.</div>
        </form>
      </div>
    </section>
  );
}
