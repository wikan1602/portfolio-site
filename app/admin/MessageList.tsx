"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

export type RenderedMessage = {
  content: string;
  time: string;
  isBot: boolean;
};

export default function MessageList({ messages }: { messages: RenderedMessage[] }) {
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
            <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
              {m.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
