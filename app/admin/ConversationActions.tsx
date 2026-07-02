"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  phone: string;
  mode: "bot" | "human";
  within24h: boolean;
  replyingTo: { id: string; preview: string; isBot: boolean } | null;
  onClearReply: () => void;
};

export default function ConversationActions({
  phone,
  mode,
  within24h,
  replyingTo,
  onClearReply,
}: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const isHuman = mode === "human";

  function clearFile() {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

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

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!file && !message.trim()) return;
    setBusy(true);
    setError("");
    setSent(false);

    let res: Response;
    if (file) {
      // Media send (caption = the textarea text, if any).
      const fd = new FormData();
      fd.append("phone", phone);
      fd.append("file", file);
      if (message.trim()) fd.append("caption", message);
      if (replyingTo) fd.append("replyTo", replyingTo.id);
      res = await fetch("/api/admin/send-media", { method: "POST", body: fd });
    } else {
      res = await fetch("/api/admin/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, message, replyTo: replyingTo?.id ?? null }),
      });
    }

    setBusy(false);
    if (res.ok) {
      setMessage("");
      clearFile();
      onClearReply();
      setSent(true);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to send.");
    }
  }

  const canSend = !busy && (!!file || !!message.trim());
  const sendLabel = busy ? "Sending…" : file ? "Send file" : "Send reply";

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
      <form onSubmit={handleSend} className="space-y-2">
        {!within24h && (
          <p className="text-[11px] text-amber-400/90 leading-snug">
            ⚠️ Last inbound message was over 24h ago. WhatsApp only allows free-form
            replies within 24h — this may be rejected unless you use an approved template.
          </p>
        )}
        {replyingTo && (
          <div className="flex items-center gap-2 text-xs bg-slate-900/60 border-l-2 border-blue-500 rounded px-3 py-1.5">
            <span className="text-slate-500 shrink-0">↩ Replying to {replyingTo.isBot ? "bot" : "customer"}:</span>
            <span className="text-slate-300 truncate">{replyingTo.preview}</span>
            <button
              type="button"
              onClick={onClearReply}
              className="ml-auto text-slate-500 hover:text-rose-400"
              aria-label="Cancel reply"
            >
              ✕
            </button>
          </div>
        )}
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setSent(false);
          }}
          rows={2}
          placeholder={
            file
              ? "Add a caption (optional)…"
              : isHuman
              ? "Type a manual reply…"
              : "Tip: take over first so the bot doesn't reply too."
          }
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
        />

        {/* Staged attachment */}
        {file && (
          <div className="flex items-center gap-2 text-xs bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-1.5">
            <span className="text-slate-300 truncate">📎 {file.name}</span>
            <span className="text-slate-600">({Math.round(file.size / 1024)} KB)</span>
            <button
              type="button"
              onClick={clearFile}
              className="ml-auto text-slate-500 hover:text-rose-400"
              aria-label="Remove attachment"
            >
              ✕
            </button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,audio/*,application/pdf"
          className="hidden"
          onChange={(e) => {
            setFile(e.target.files?.[0] ?? null);
            setSent(false);
            setError("");
          }}
        />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={busy}
              className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 disabled:opacity-50 transition-colors"
            >
              📎 Attach
            </button>
            <div className="text-xs">
              {error && <span className="text-rose-400">{error}</span>}
              {sent && !error && <span className="text-emerald-400">Sent ✓</span>}
            </div>
          </div>
          <button
            type="submit"
            disabled={!canSend}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900 disabled:opacity-60 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
          >
            {sendLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
