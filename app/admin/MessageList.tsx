"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type RenderedMessage = {
  content: string;
  time: string;
  isBot: boolean;
  mediaType?: string | null;
  mediaId?: string | null;
  wamid?: string | null;
};

const QUICK_EMOJIS = ["👍", "❤️", "😂", "🙏", "🔥"];

// Per-message Reply + React controls. Reply hands the target up to the composer;
// React sends an emoji reaction immediately via the API.
function MessageActions({
  phone,
  message,
  onReply,
}: {
  phone: string;
  message: RenderedMessage;
  onReply?: (m: RenderedMessage) => void;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function react(emoji: string) {
    setBusy(true);
    await fetch("/api/admin/react", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, messageId: message.wamid, emoji }),
    }).catch(() => {});
    setBusy(false);
    setOpen(false);
  }

  return (
    <div className="flex items-center gap-3 mt-1.5">
      <button
        type="button"
        onClick={() => onReply?.(message)}
        className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
      >
        ↩ Reply
      </button>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
        >
          😀 React
        </button>
        {open && (
          <div className="absolute z-10 bottom-full mb-1 flex gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 shadow-lg">
            {QUICK_EMOJIS.map((e) => (
              <button
                key={e}
                type="button"
                disabled={busy}
                onClick={() => react(e)}
                className="text-sm hover:scale-125 transition-transform disabled:opacity-50"
              >
                {e}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Renders inbound media via the auth-protected proxy. Images/stickers show
// inline; audio/video get players; documents show a download link. A text
// caption (anything that isn't the "[type]" placeholder) is shown below.
function MediaBlock({ type, id }: { type: string; id: string }) {
  const src = `/api/admin/media/${id}`;
  if (type === "image" || type === "sticker") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={type} className="rounded-lg max-w-full max-h-72 object-contain" />;
  }
  if (type === "video") {
    return <video src={src} controls className="rounded-lg max-w-full max-h-72" />;
  }
  if (type === "audio") {
    return <audio src={src} controls className="w-full" />;
  }
  return (
    <a
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200 underline"
    >
      📎 Open {type}
    </a>
  );
}

export default function MessageList({
  messages,
  phone,
  onReply,
}: {
  messages: RenderedMessage[];
  phone: string;
  onReply?: (m: RenderedMessage) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Whether the user is parked near the bottom. Starts true so a freshly
  // opened conversation lands on the newest message.
  const nearBottomRef = useRef(true);

  function handleScroll() {
    const el = containerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    nearBottomRef.current = distanceFromBottom < 120;
  }

  // Auto-scroll to the newest message — but only if the user was already near
  // the bottom, so reading older history isn't yanked away on each refresh.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (el && nearBottomRef.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  // Always jump to bottom on first mount (e.g. when switching conversations,
  // this component is remounted via its key).
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto space-y-4 pr-1"
    >
      {messages.length === 0 && (
        <p className="text-sm text-slate-600">No messages in this conversation.</p>
      )}
      {messages.map((m, i) => (
        <div key={i} className={`flex ${m.isBot ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
              m.isBot
                ? "bg-blue-600/20 border border-blue-800/50"
                : "bg-slate-800/60 border border-slate-700/50"
            }`}
          >
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
              {m.isBot ? "Bot" : "Customer"} · {m.time}
            </div>
            {m.mediaType && m.mediaId && (
              <div className="mb-1">
                <MediaBlock type={m.mediaType} id={m.mediaId} />
              </div>
            )}
            {/* Show text unless it's just the "[type]" placeholder for a media message */}
            {!(m.mediaType && m.content === `[${m.mediaType}]`) && (
              <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                {m.content}
              </div>
            )}
            {m.wamid && <MessageActions phone={phone} message={m} onReply={onReply} />}
          </div>
        </div>
      ))}
    </div>
  );
}
