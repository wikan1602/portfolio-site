import type { Pool } from 'pg';

// Per-conversation state: whether the bot or a human handles a number, and the
// WhatsApp phone_number_id to send outbound messages from. Lives in its own
// table so the existing wa_chat_history (per-message) is left untouched.
const DDL = `CREATE TABLE IF NOT EXISTS wa_conversation_state (
  phone_number    TEXT PRIMARY KEY,
  mode            TEXT NOT NULL DEFAULT 'bot',
  phone_number_id TEXT,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
)`;

export type ConversationMode = 'bot' | 'human';

export async function ensureStateTable(pool: Pool): Promise<void> {
  await pool.query(DDL);
}

// Adds nullable columns to the existing wa_chat_history table: media info for
// inbound photos/stickers/etc., and wa_message_id (the WhatsApp message id, aka
// "wamid") so we can reply-quote and react to specific messages.
// Idempotent + cached per process.
let columnsEnsured = false;
export async function ensureChatHistoryColumns(pool: Pool): Promise<void> {
  if (columnsEnsured) return;
  await pool.query(
    `ALTER TABLE wa_chat_history
       ADD COLUMN IF NOT EXISTS media_type    TEXT,
       ADD COLUMN IF NOT EXISTS media_id      TEXT,
       ADD COLUMN IF NOT EXISTS wa_message_id TEXT,
       ADD COLUMN IF NOT EXISTS reaction      TEXT`
  );
  columnsEnsured = true;
}

// Called on every inbound message: keep the freshest phone_number_id for the
// conversation (needed to send manual replies later) without touching mode.
export async function touchConversation(
  pool: Pool,
  phone: string,
  phoneNumberId: string
): Promise<void> {
  await ensureStateTable(pool);
  await pool.query(
    `INSERT INTO wa_conversation_state (phone_number, phone_number_id, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (phone_number)
     DO UPDATE SET phone_number_id = EXCLUDED.phone_number_id, updated_at = now()`,
    [phone, phoneNumberId]
  );
}

// Defaults to 'bot' on any error (e.g. table not created yet) so the webhook
// behaves exactly as before until a human explicitly takes over.
export async function getMode(pool: Pool, phone: string): Promise<ConversationMode> {
  try {
    const r = await pool.query(
      'SELECT mode FROM wa_conversation_state WHERE phone_number = $1',
      [phone]
    );
    return r.rows[0]?.mode === 'human' ? 'human' : 'bot';
  } catch {
    return 'bot';
  }
}

export async function setMode(
  pool: Pool,
  phone: string,
  mode: ConversationMode
): Promise<void> {
  await ensureStateTable(pool);
  await pool.query(
    `INSERT INTO wa_conversation_state (phone_number, mode, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (phone_number)
     DO UPDATE SET mode = EXCLUDED.mode, updated_at = now()`,
    [phone, mode]
  );
}

export async function getPhoneNumberId(pool: Pool, phone: string): Promise<string | null> {
  try {
    const r = await pool.query(
      'SELECT phone_number_id FROM wa_conversation_state WHERE phone_number = $1',
      [phone]
    );
    return r.rows[0]?.phone_number_id ?? null;
  } catch {
    return null;
  }
}
