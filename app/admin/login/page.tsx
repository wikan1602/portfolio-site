"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Wrong password. Try again.");
    }
  }

  return (
    <main className="min-h-screen bg-[#E8ECE8] text-[#10231F] flex items-center justify-center px-6 font-[family-name:var(--font-plex)]">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2.5">
            <span className="w-9 h-9 rounded-lg bg-[#25D366] grid place-items-center font-[family-name:var(--font-space)] font-bold text-[17px] text-[#0D2B25]">R</span>
            <span className="font-[family-name:var(--font-space)] font-semibold text-xl">Relay</span>
          </div>
          <p className="text-sm text-[#10231F]/55">Sign in to your WhatsApp bot console.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-[#10231F]/10 p-6 rounded-[12px] shadow-[0_2px_8px_rgba(16,35,31,.08)] space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-[11.5px] font-semibold tracking-[0.06em] uppercase text-[#10231F]/45">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F5F7F5] border border-[#10231F]/12 rounded-lg px-4 py-2.5 text-sm text-[#10231F] focus:outline-none focus:border-[#128C7E] transition-colors"
            />
          </div>

          {error && <p className="text-sm text-[#B03D30]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0D2B25] hover:bg-[#128C7E] disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
