"use client";

import { useState } from "react";
import ConversationActions from "./ConversationActions";
import MessageList, { type RenderedMessage } from "./MessageList";

export type ReplyTarget = { id: string; preview: string; isBot: boolean } | null;

// Wraps the composer + message list so the "reply to" state can be shared:
// the Reply button lives on a message (MessageList) but the composer that
// consumes it lives in ConversationActions.
export default function ChatPanel({
  phone,
  mode,
  within24h,
  messages,
}: {
  phone: string;
  mode: "bot" | "human";
  within24h: boolean;
  messages: RenderedMessage[];
}) {
  const [replyingTo, setReplyingTo] = useState<ReplyTarget>(null);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="shrink-0">
        <ConversationActions
          phone={phone}
          mode={mode}
          within24h={within24h}
          replyingTo={replyingTo}
          onClearReply={() => setReplyingTo(null)}
        />
      </div>
      <MessageList
        phone={phone}
        messages={messages}
        onReply={(m) => {
          if (m.wamid) setReplyingTo({ id: m.wamid, preview: m.content, isBot: m.isBot });
        }}
      />
    </div>
  );
}
