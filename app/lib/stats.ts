import type { Pool } from "pg";
import { ensureStateTable, ensureChatHistoryColumns } from "@/app/lib/conversation";

export type DashboardStats = {
  totalConversations: number;
  totalMessages: number;
  messages24h: number;
  botCount: number;
  humanCount: number;
  openWindows: number;
};

// All numbers are computed from the real tables (wa_chat_history + wa_conversation_state).
// No fabricated metrics — if the DB is unreachable the caller shows an error state.
export async function getDashboardStats(pool: Pool): Promise<DashboardStats> {
  await ensureChatHistoryColumns(pool);
  await ensureStateTable(pool);

  const totals = await pool.query(
    `SELECT
       COUNT(DISTINCT phone_number)::int AS conversations,
       COUNT(*)::int AS messages,
       COUNT(*) FILTER (WHERE created_at > now() - interval '24 hours')::int AS messages_24h
     FROM wa_chat_history`
  );

  const modes = await pool.query(
    `SELECT mode, COUNT(*)::int AS n FROM wa_conversation_state GROUP BY mode`
  );
  let botCount = 0;
  let humanCount = 0;
  for (const r of modes.rows) {
    if (r.mode === "human") humanCount = r.n;
    else botCount = r.n;
  }

  const open = await pool.query(
    `SELECT COUNT(*)::int AS n FROM (
       SELECT phone_number, MAX(created_at) AS last_in
       FROM wa_chat_history WHERE role = 'user' GROUP BY phone_number
     ) t WHERE last_in > now() - interval '24 hours'`
  );

  const t = totals.rows[0] ?? {};
  return {
    totalConversations: t.conversations ?? 0,
    totalMessages: t.messages ?? 0,
    messages24h: t.messages_24h ?? 0,
    botCount,
    humanCount,
    openWindows: open.rows[0]?.n ?? 0,
  };
}

export type Contact = {
  phone_number: string;
  last_at: string;
  msg_count: number;
  mode: "bot" | "human";
  last_in: string | null;
};

export async function getContacts(pool: Pool): Promise<Contact[]> {
  await ensureChatHistoryColumns(pool);
  await ensureStateTable(pool);
  const res = await pool.query(
    `SELECT h.phone_number,
            MAX(h.created_at) AS last_at,
            COUNT(*)::int AS msg_count,
            COALESCE(s.mode, 'bot') AS mode,
            MAX(CASE WHEN h.role = 'user' THEN h.created_at END) AS last_in
     FROM wa_chat_history h
     LEFT JOIN wa_conversation_state s ON s.phone_number = h.phone_number
     GROUP BY h.phone_number, s.mode
     ORDER BY last_at DESC`
  );
  return res.rows as Contact[];
}
