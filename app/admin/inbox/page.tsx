import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/lib/auth";
import { getPool } from "@/app/lib/db";
import { getMode, ensureChatHistoryColumns, type ConversationMode } from "@/app/lib/conversation";
import { formatWIB } from "@/app/lib/format";
import AutoRefresh from "../AutoRefresh";
import ChatPanel from "../ChatPanel";

export const dynamic = "force-dynamic";

type Conversation = { phone_number: string; last_at: string; msg_count: number };
type Message = {
  role: string;
  content: string;
  created_at: string;
  media_type: string | null;
  media_id: string | null;
  wa_message_id: string | null;
  reaction: string | null;
};

const card = "bg-white border border-[#10231F]/[0.09] rounded-[10px]";
const heading = "font-[family-name:var(--font-space)] font-semibold";

export default async function InboxPage({
  searchParams,
}: {
  searchParams: Promise<{ phone?: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const { phone } = await searchParams;

  let conversations: Conversation[] = [];
  let messages: Message[] = [];
  let mode: ConversationMode = "bot";
  let within24h = true;
  let dbError: string | null = null;

  try {
    const pool = getPool();
    await ensureChatHistoryColumns(pool);
    conversations = (
      await pool.query(
        `SELECT phone_number, MAX(created_at) AS last_at, COUNT(*)::int AS msg_count
         FROM wa_chat_history GROUP BY phone_number ORDER BY last_at DESC`
      )
    ).rows as Conversation[];

    if (phone) {
      messages = (
        await pool.query(
          `SELECT role, content, created_at, media_type, media_id, wa_message_id, reaction
           FROM wa_chat_history WHERE phone_number = $1 ORDER BY created_at ASC`,
          [phone]
        )
      ).rows as Message[];
      mode = await getMode(pool, phone);
      const lastInbound = [...messages].reverse().find((m) => m.role === "user");
      within24h = lastInbound
        ? Date.now() - new Date(lastInbound.created_at).getTime() < 24 * 60 * 60 * 1000
        : false;
    }
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Failed to load data.";
  }

  return (
    <div className="flex flex-col gap-4">
      <AutoRefresh />
      <div className="flex items-center gap-3">
        <h1 className={`${heading} text-[22px] tracking-[-0.01em] m-0`}>Inbox</h1>
        {!dbError && (
          <span className="inline-flex items-center gap-1.5 text-[12.5px] text-[#136B3B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA855] animate-pulse" /> Live
          </span>
        )}
      </div>

      {dbError && (
        <div className="bg-[#E05B4C]/10 border border-[#E05B4C]/30 text-[#B03D30] text-sm p-4 rounded-[10px]">
          Could not load data: {dbError}
        </div>
      )}

      {!dbError && (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
          {/* Conversation list */}
          <aside className={`${card} overflow-hidden flex flex-col`}>
            <div className="px-4 py-3 border-b border-[#10231F]/[0.07] text-[11px] font-semibold tracking-[0.07em] uppercase text-[#10231F]/45">
              Conversations ({conversations.length})
            </div>
            <div className="overflow-y-auto max-h-[74vh]">
              {conversations.length === 0 && (
                <p className="text-sm text-[#10231F]/50 px-4 py-4">No conversations yet.</p>
              )}
              {conversations.map((c) => {
                const active = c.phone_number === phone;
                return (
                  <Link
                    key={c.phone_number}
                    href={`/admin/inbox?phone=${encodeURIComponent(c.phone_number)}`}
                    className={`block px-4 py-3 border-b border-[#10231F]/[0.05] transition-colors ${
                      active ? "bg-[#25D366]/[0.10] border-l-[3px] border-l-[#25D366]" : "hover:bg-[#F5F7F5]"
                    }`}
                  >
                    <div className="font-mono text-[13px] text-[#10231F]/85">{c.phone_number}</div>
                    <div className="flex items-center justify-between text-[11px] text-[#10231F]/50 mt-0.5">
                      <span>{c.msg_count} msgs</span>
                      <span>{formatWIB(c.last_at)}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Thread */}
          <section className={`${card} h-[78vh] flex flex-col overflow-hidden`}>
            {!phone && (
              <p className="text-sm text-[#10231F]/50 p-5">Select a conversation to view its messages.</p>
            )}
            {phone && (
              <>
                <div className="text-[13px] font-mono text-[#10231F]/70 border-b border-[#10231F]/[0.07] px-5 py-3 shrink-0">
                  {phone}
                </div>
                <div className="flex-1 flex flex-col min-h-0 p-4">
                  <ChatPanel
                    key={phone}
                    phone={phone}
                    mode={mode}
                    within24h={within24h}
                    messages={messages.map((m) => ({
                      content: m.content,
                      time: formatWIB(m.created_at),
                      isBot: m.role === "assistant",
                      mediaType: m.media_type,
                      mediaId: m.media_id,
                      wamid: m.wa_message_id,
                      reaction: m.reaction,
                    }))}
                  />
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
