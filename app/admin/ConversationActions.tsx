"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  phone: string;
  mode: "bot" | "human";
  within24h: boolean;
};

export default function ConversationActions({ phone, mode, within24h }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const isHuman = mode === "human";

  async function toggleMode() {
    setBusy(true);
    setError("");
    const next = isHuman ? "bot" : "human";
    const res = await fetch("/api/admin/mode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, mode: next }),
    });
    setBusy(false);
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to change mode.");
    }
  }

  async function sendReply(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setBusy(true);
    setError("");
    setSent(false);
    const res = await fetch("/api/admin/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, message }),
    });
    setBusy(false);
    if (res.ok) {
      setMessage("");
      setSent(true);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to send message.");
    }
  }

  return (
    <div className="space-y-3 border-b border-slate-800 pb-4 mb-4">
      {/* Mode toggle */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Mode:</span>
          <span
            className={`px-2 py-0.5 rounded border ${
              isHuman
                ? "text-amber-300 border-amber-900/60 bg-amber-950/30"
                : "text-blue-300 border-blue-900/60 bg-blue-950/30"
            }`}
          >
            {isHuman ? "HUMAN (bot paused)" : "BOT (auto-reply)"}
          </span>
        </div>
        <button
          onClick={toggleMode}
          disabled={busy}
          className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-200 disabled:opacity-50 transition-colors"
        >
          {isHuman ? "Hand back to bot" : "Take over (pause bot)"}
        </button>
      </div>

      {/* Manual reply box */}
      <form onSubmit={sendReply} className="space-y-2">
        {!within24h && (
          <p className="text-[11px] text-amber-400/90 leading-snug">
            ⚠️ Last inbound message was over 24h ago. WhatsApp only allows free-form
            replies within 24h — this may be rejected unless you use an approved template.
          </p>
        )}
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setSent(false);
          }}
          rows={2}
          placeholder={isHuman ? "Type a manual reply…" : "Tip: take over first so the bot doesn't reply too."}
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
        />
        <div className="flex items-center justify-between">
          <div className="text-xs">
            {error && <span className="text-rose-400">{error}</span>}
            {sent && !error && <span className="text-emerald-400">Sent ✓</span>}
          </div>
          <button
            type="submit"
            disabled={busy || !message.trim()}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900 disabled:opacity-60 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
          >
            {busy ? "Sending…" : "Send reply"}
          </button>
        </div>
      </form>
    </div>
  );
}
