import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/lib/auth";
import { getPool } from "@/app/lib/db";
import { getContacts, type Contact } from "@/app/lib/stats";
import { formatWIB } from "@/app/lib/format";

export const dynamic = "force-dynamic";

const card = "bg-white border border-[#10231F]/[0.09] rounded-[10px]";
const heading = "font-[family-name:var(--font-space)] font-semibold";

function windowOpen(lastIn: string | null): boolean {
  if (!lastIn) return false;
  return Date.now() - new Date(lastIn).getTime() < 24 * 60 * 60 * 1000;
}

export default async function ContactsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  let contacts: Contact[] = [];
  let dbError: string | null = null;
  try {
    contacts = await getContacts(getPool());
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Failed to load data.";
  }

  const optedIn = contacts.length; // every contact messaged the bot = implicit opt-in

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex flex-col gap-1">
          <h1 className={`${heading} text-[26px] tracking-[-0.01em] m-0`}>Contacts</h1>
          <div className="text-[13px] text-[#10231F]/55">
            {dbError ? "—" : `${contacts.length} contacts · ${optedIn} active`}
          </div>
        </div>
      </div>

      {dbError && (
        <div className="bg-[#E05B4C]/10 border border-[#E05B4C]/30 text-[#B03D30] text-sm p-4 rounded-[10px]">
          Could not load data: {dbError}
        </div>
      )}

      {!dbError && (
        <div className={`${card} overflow-hidden`}>
          <div className="grid grid-cols-[1.4fr_0.7fr_0.8fr_0.9fr_0.9fr] px-5 py-2.5 gap-3 text-[11px] font-semibold tracking-[0.07em] uppercase text-[#10231F]/45 border-b border-[#10231F]/[0.07]">
            <span>Phone</span><span>Mode</span><span>Messages</span><span>Last active</span><span>24h window</span>
          </div>
          {contacts.length === 0 && (
            <div className="px-5 py-6 text-sm text-[#10231F]/50">No contacts yet.</div>
          )}
          {contacts.map((c) => {
            const open = windowOpen(c.last_in);
            return (
              <Link
                key={c.phone_number}
                href={`/admin/inbox?phone=${encodeURIComponent(c.phone_number)}`}
                className="grid grid-cols-[1.4fr_0.7fr_0.8fr_0.9fr_0.9fr] px-5 py-3 gap-3 text-[13px] items-center border-b border-[#10231F]/[0.05] last:border-0 hover:bg-[#F5F7F5] transition-colors"
              >
                <span className="font-mono text-[12.5px] text-[#10231F]/80">{c.phone_number}</span>
                <span>
                  {c.mode === "human" ? (
                    <span className="px-2 py-0.5 rounded-full bg-[#128C7E]/10 border border-[#128C7E]/30 text-[11px] font-semibold text-[#0E6B60]">Human</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-[#25D366]/[0.14] text-[11px] font-semibold text-[#136B3B]">Bot</span>
                  )}
                </span>
                <span className="text-[#10231F]/60">{c.msg_count}</span>
                <span className="text-[#10231F]/55">{formatWIB(c.last_at)}</span>
                <span className="flex items-center gap-1.5">
                  <span className={`w-[7px] h-[7px] rounded-full ${open ? "bg-[#1FA855]" : "bg-[#10231F]/25"}`} />
                  <span className={`text-[12px] ${open ? "text-[#136B3B] font-medium" : "text-[#10231F]/50"}`}>
                    {open ? "Open" : "Closed"}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
