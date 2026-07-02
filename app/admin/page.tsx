import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/lib/auth";
import { getPool } from "@/app/lib/db";
import { getMode, ensureChatHistoryColumns, type ConversationMode } from "@/app/lib/conversation";
import LogoutButton from "./LogoutButton";
import AutoRefresh from "./AutoRefresh";
import ChatPanel from "./ChatPanel";

// Reads cookies + the database at request time — never prerender at build.
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

// This renders on the server (Vercel runs in UTC), so an explicit timeZone is
// required or timestamps show as GMT+0. WIB = Asia/Jakarta (UTC+7).
const TIME_ZONE = "Asia/Jakarta";

function formatTime(value: string): string {
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  });
}

export default async function AdminPage({
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
    await ensureChatHistoryColumns(pool); // media + wa_message_id columns must exist for the SELECT below
    conversations = (
      await pool.query(
        `SELECT phone_number, MAX(created_at) AS last_at, COUNT(*)::int AS msg_count
         FROM wa_chat_history
         GROUP BY phone_number
         ORDER BY last_at DESC`
      )
    ).rows as Conversation[];

    if (phone) {
      messages = (
        await pool.query(
          `SELECT role, content, created_at, media_type, media_id, wa_message_id, reaction
           FROM wa_chat_history
           WHERE phone_number = $1
           ORDER BY created_at ASC`,
          [phone]
        )
      ).rows as Message[];

      mode = await getMode(pool, phone);

      // 24-hour customer-service window is measured from the last inbound message.
      const lastInbound = [...messages].reverse().find((m) => m.role === "user");
      if (lastInbound) {
        within24h = Date.now() - new Date(lastInbound.created_at).getTime() < 24 * 60 * 60 * 1000;
      } else {
        within24h = false;
      }
    }
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Failed to load data.";
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Auto-refresh keeps the view in sync without manual reloads.
            Always on so a transient DB error self-heals without a manual reload. */}
        <AutoRefresh />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">WhatsApp Chat History</h1>
            <p className="text-sm text-slate-500 flex items-center gap-2">
              {!dbError && (
                <span className="inline-flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              )}
              <span>Auto-updating every 5s.</span>
            </p>
          </div>
          <LogoutButton />
        </div>

        {dbError && (
          <div className="bg-rose-950/40 border border-rose-800 text-rose-300 text-sm p-4 rounded-xl">
            Could not load data: {dbError}
          </div>
        )}

        {!dbError && (
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
            {/* Conversation list */}
            <aside className="space-y-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 px-1">
                Conversations ({conversations.length})
              </h2>
              <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
                {conversations.length === 0 && (
                  <p className="text-sm text-slate-600 px-1">No conversations yet.</p>
                )}
                {conversations.map((c) => {
                  const active = c.phone_number === phone;
                  return (
                    <a
                      key={c.phone_number}
                      href={`/admin?phone=${encodeURIComponent(c.phone_number)}`}
                      className={`block px-3 py-2.5 rounded-lg border transition-colors ${
                        active
                          ? "bg-blue-950/40 border-blue-800"
                          : "bg-slate-900/40 border-slate-800/60 hover:border-slate-700"
                      }`}
                    >
                      <div className="text-sm font-mono text-slate-200">{c.phone_number}</div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-0.5">
                        <span>{c.msg_count} msgs</span>
                        <span>{formatTime(c.last_at)}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </aside>

            {/* Message thread */}
            <section className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-5 h-[75vh] flex flex-col">
              {!phone && (
                <p className="text-sm text-slate-600">Select a conversation to view its messages.</p>
              )}

              {phone && (
                <>
                  <div className="text-sm font-mono text-slate-400 border-b border-slate-800 pb-3 mb-4 shrink-0">
                    {phone}
                  </div>
                  <ChatPanel
                    key={phone}
                    phone={phone}
                    mode={mode}
                    within24h={within24h}
                    messages={messages.map((m) => ({
                      content: m.content,
                      time: formatTime(m.created_at),
                      isBot: m.role === "assistant",
                      mediaType: m.media_type,
                      mediaId: m.media_id,
                      wamid: m.wa_message_id,
                      reaction: m.reaction,
                    }))}
                  />
                </>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
