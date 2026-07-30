import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/lib/auth";
import { getPool } from "@/app/lib/db";
import { getDashboardStats, getContacts, type DashboardStats, type Contact } from "@/app/lib/stats";
import { formatWIB } from "@/app/lib/format";
import AutoRefresh from "./AutoRefresh";

export const dynamic = "force-dynamic";

const card = "bg-white border border-[#10231F]/[0.09] rounded-[10px]";
const kpiLabel = "text-[11.5px] font-semibold tracking-[0.08em] uppercase text-[#10231F]/50";
const kpiValue = "font-[family-name:var(--font-space)] font-semibold text-[30px] leading-none";
const heading = "font-[family-name:var(--font-space)] font-semibold";

export default async function DashboardPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  let stats: DashboardStats | null = null;
  let recent: Contact[] = [];
  let dbError: string | null = null;

  try {
    const pool = getPool();
    stats = await getDashboardStats(pool);
    recent = (await getContacts(pool)).slice(0, 6);
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Failed to load data.";
  }

  return (
    <div className="flex flex-col gap-[22px]">
      <AutoRefresh />

      {/* Header */}
      <div className="flex items-end gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <h1 className={`${heading} text-[26px] tracking-[-0.01em] m-0`}>WhatsApp Bot Console</h1>
          <div className="text-[13px] text-[#10231F]/55">Live metrics from your bot&apos;s database</div>
        </div>
        <div className="flex-1" />
        {!dbError && (
          <div className="flex items-center gap-[7px] px-3 py-1.5 rounded-full bg-[#25D366]/[0.14] border border-[#25D366]/40">
            <span className="w-2 h-2 rounded-full bg-[#1FA855] animate-pulse" />
            <span className="text-[12.5px] font-semibold text-[#136B3B]">Live · auto-refresh</span>
          </div>
        )}
      </div>

      {dbError && (
        <div className="bg-[#E05B4C]/10 border border-[#E05B4C]/30 text-[#B03D30] text-sm p-4 rounded-[10px]">
          Could not load data: {dbError}
        </div>
      )}

      {stats && (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`${card} p-5 flex flex-col gap-2`}>
              <div className={kpiLabel}>Total messages</div>
              <div className={kpiValue}>{stats.totalMessages.toLocaleString()}</div>
              <div className="text-[12.5px] text-[#10231F]/50">All conversations</div>
            </div>
            <div className={`${card} p-5 flex flex-col gap-2`}>
              <div className={kpiLabel}>Messages · 24h</div>
              <div className={kpiValue}>{stats.messages24h.toLocaleString()}</div>
              <div className="text-[12.5px] text-[#1FA855] font-medium">Last 24 hours</div>
            </div>
            <div className={`${card} p-5 flex flex-col gap-2`}>
              <div className={kpiLabel}>Conversations</div>
              <div className={kpiValue}>{stats.totalConversations.toLocaleString()}</div>
              <div className="text-[12.5px] text-[#10231F]/50">Unique contacts</div>
            </div>
            <div className={`${card} p-5 flex flex-col gap-2`}>
              <div className={kpiLabel}>Open windows</div>
              <div className={kpiValue}>{stats.openWindows.toLocaleString()}</div>
              <div className="text-[12.5px] text-[#10231F]/50">Inside 24-hour window</div>
            </div>
          </div>

          {/* Recent + side */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 items-start">
            {/* Recent conversations */}
            <div className={`${card} overflow-hidden`}>
              <div className="flex items-center px-5 py-4 border-b border-[#10231F]/[0.07]">
                <span className={`${heading} text-[15px]`}>Recent conversations</span>
                <Link href="/admin/inbox" className="ml-auto text-[12.5px] font-semibold text-[#128C7E] hover:underline">
                  Open inbox →
                </Link>
              </div>
              <div className="grid grid-cols-[1.4fr_0.7fr_0.9fr_0.7fr] px-5 py-2.5 gap-3 text-[11px] font-semibold tracking-[0.07em] uppercase text-[#10231F]/45 border-b border-[#10231F]/[0.07]">
                <span>Contact</span><span>Mode</span><span>Messages</span><span>Last active</span>
              </div>
              {recent.length === 0 && (
                <div className="px-5 py-6 text-sm text-[#10231F]/50">No conversations yet.</div>
              )}
              {recent.map((c) => (
                <Link
                  key={c.phone_number}
                  href={`/admin/inbox?phone=${encodeURIComponent(c.phone_number)}`}
                  className="grid grid-cols-[1.4fr_0.7fr_0.9fr_0.7fr] px-5 py-3 gap-3 text-[13px] items-center border-b border-[#10231F]/[0.05] last:border-0 hover:bg-[#F5F7F5] transition-colors"
                >
                  <span className="font-mono text-[12.5px] text-[#10231F]/80">{c.phone_number}</span>
                  <span>
                    <ModePill mode={c.mode} />
                  </span>
                  <span className="text-[#10231F]/60">{c.msg_count}</span>
                  <span className="text-[#10231F]/55">{formatWIB(c.last_at)}</span>
                </Link>
              ))}
            </div>

            {/* Side: mode split + webhook */}
            <div className="flex flex-col gap-4">
              <div className={`${card} p-5 flex flex-col gap-3`}>
                <span className={`${heading} text-[15px]`}>Handling mode</span>
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="text-[12.5px] text-[#10231F]/55">Bot (auto)</span>
                    <span className="font-[family-name:var(--font-space)] font-semibold text-[22px]">{stats.botCount}</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <span className="text-[12.5px] text-[#10231F]/55">Human takeover</span>
                    <span className="font-[family-name:var(--font-space)] font-semibold text-[22px] text-[#128C7E]">{stats.humanCount}</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-[#10231F]/[0.08] overflow-hidden flex">
                  <div
                    className="h-full bg-[#25D366]"
                    style={{ width: `${pct(stats.botCount, stats.botCount + stats.humanCount)}%` }}
                  />
                  <div
                    className="h-full bg-[#128C7E]"
                    style={{ width: `${pct(stats.humanCount, stats.botCount + stats.humanCount)}%` }}
                  />
                </div>
              </div>

              <div className={`${card} p-5 flex flex-col gap-3`}>
                <div className="flex items-center gap-2">
                  <span className={`${heading} text-[15px]`}>Webhook</span>
                  <span className="ml-auto text-[12.5px] font-semibold text-[#136B3B]">Endpoint live</span>
                </div>
                <div className="font-mono text-[12px] text-[#10231F]/70 bg-[#F5F7F5] border border-[#10231F]/[0.07] rounded-[7px] px-3 py-2.5 truncate">
                  /api/webhook
                </div>
                <Link href="/admin/settings" className="text-[12.5px] font-semibold text-[#128C7E] hover:underline">
                  Configure in Settings →
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function pct(n: number, total: number) {
  return total > 0 ? Math.round((n / total) * 100) : 0;
}

function ModePill({ mode }: { mode: "bot" | "human" }) {
  return mode === "human" ? (
    <span className="px-2 py-0.5 rounded-full bg-[#128C7E]/10 border border-[#128C7E]/30 text-[11px] font-semibold text-[#0E6B60]">Human</span>
  ) : (
    <span className="px-2 py-0.5 rounded-full bg-[#25D366]/[0.14] text-[11px] font-semibold text-[#136B3B]">Bot</span>
  );
}
