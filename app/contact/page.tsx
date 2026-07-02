"use client"; // Required as we are using state and form interactions

import { useState } from "react";

export default function ContactPage() {
  // 1. State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceType: "automation",
    message: "",
  });

  // 2. State for UI interactivity (loading & success status)
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 3. Function to capture every keystroke in the form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // 4. Handle submit function when the button is clicked
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default HTML form page reload
    setIsLoading(true);
    setStatusMessage(null);

    // Your n8n Production Webhook URL
    const N8N_WEBHOOK_URL = "https://n8n.wikan-ai.my.id/webhook/portfolio-inquiry";

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
          text: "Message sent successfully! I will get back to you within 24 hours.",
        });
        // Reset form on success
        setFormData({ name: "", email: "", company: "", serviceType: "automation", message: "" });
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: "A system error occurred. Please try again in a few moments.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg text-fg py-20 px-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-8 z-10 relative">
        <div className="space-y-3 text-center sm:text-left">
          <a href="/" className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1 font-mono">
            ← Back to Home
          </a>
          <h1 className="text-4xl font-extrabold tracking-tight">Let's Collaborate</h1>
          <p className="text-muted font-light">
            Have a business process you want to automate or need secure AI integration? Fill out the form below.
          </p>
        </div>

        {/* Success / Error Status Notification */}
        {statusMessage && (
          <div className={`p-4 rounded-xl text-sm border ${
            statusMessage.type === "success" 
              ? "bg-emerald-950/40 border-emerald-800 text-emerald-400" 
              : "bg-rose-950/40 border-rose-800 text-rose-400"
          }`}>
            {statusMessage.text}
          </div>
        )}

        {/* Inquiry Form with onSubmit Event */}
        <form onSubmit={handleSubmit} className="bg-surface/50 border border-border p-6 sm:p-8 rounded-2xl space-y-6 backdrop-blur-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-fg">Full Name</label>
              <input 
                type="text" id="name" required placeholder="John Doe"
                value={formData.name} onChange={handleChange}
                className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-fg">Business Email</label>
              <input 
                type="email" id="email" required placeholder="john@company.com"
                value={formData.email} onChange={handleChange}
                className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium text-fg">Company Name <span className="text-subtle text-xs">(Optional)</span></label>
            <input 
              type="text" id="company" placeholder="Acme Corporation"
              value={formData.company} onChange={handleChange}
              className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="serviceType" className="text-sm font-medium text-fg">Required Service</label>
            <select 
              id="serviceType"
              value={formData.serviceType} onChange={handleChange}
              className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer text-fg"
            >
              <option value="automation">Workflow Automation / Data Pipelines (n8n, Python)</option>
              <option value="ai-llm">AI Integration / Custom Local LLM & RAG</option>
              <option value="consultation">System Architecture Consultation / Problem Discovery</option>
              <option value="other">Other / Custom Project</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-fg">Brief Project Details</label>
            <textarea 
              id="message" rows={4} required placeholder="Tell me about your current system constraints or bottlenecks..."
              value={formData.message} onChange={handleChange}
              className="w-full bg-bg border border-border rounded-lg px-4 py-2.5 text-sm text-fg focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Button with Loading Condition */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-medium py-3 rounded-lg transition-colors shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
          >
            {isLoading ? "Sending Inquiry..." : "Submit Project Inquiry"}
          </button>

        </form>

        <p className="text-center text-xs text-subtle font-mono">
          Secure & Private: Your submitted data is processed safely.
        </p>
      </div>
    </main>
  );
}