import { redirect } from "next/navigation";
import { isAuthenticated } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

const card = "bg-white border border-[#10231F]/[0.09] rounded-[10px]";
const heading = "font-[family-name:var(--font-space)] font-semibold";
const label = "text-[11.5px] font-semibold tracking-[0.06em] uppercase text-[#10231F]/45";

// Presence only — never the value. Secrets stay in env.
function isSet(name: string): boolean {
  return !!process.env[name];
}

export default async function SettingsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const env = [
    { name: "DATABASE_URL", desc: "Postgres connection", required: true },
    { name: "MY_VERIFY_TOKEN", desc: "Webhook verify token", required: true },
    { name: "WHATSAPP_ACCESS_TOKEN", desc: "Send messages / media", required: true },
    { name: "WHATSAPP_PHONE_NUMBER_ID", desc: "Outbound sender (optional)", required: false },
    { name: "GROQ_API_KEY", desc: "Bot LLM replies", required: true },
    { name: "ADMIN_PASSWORD", desc: "This console's login", required: true },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className={`${heading} text-[26px] tracking-[-0.01em] m-0`}>Settings</h1>
        <div className="text-[13px] text-[#10231F]/55">Webhook configuration and environment status</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Webhook config */}
        <div className={`${card} p-5 flex flex-col gap-4`}>
          <span className={`${heading} text-[15px]`}>Webhook configuration</span>

          <div className="flex flex-col gap-1.5">
            <span className={label}>Callback path</span>
            <div className="font-mono text-[12px] text-[#10231F]/70 bg-[#F5F7F5] border border-[#10231F]/[0.07] rounded-[7px] px-3 py-2.5">
              https://&lt;your-domain&gt;/api/webhook
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className={label}>Verify token</span>
            <div className="flex items-center gap-2 font-mono text-[12px] text-[#10231F]/70 bg-[#F5F7F5] border border-[#10231F]/[0.07] rounded-[7px] px-3 py-2.5">
              <span>Stored in environment</span>
              <StatusDot ok={isSet("MY_VERIFY_TOKEN")} className="ml-auto" />
            </div>
            <span className="text-[11.5px] text-[#10231F]/45">Never displayed here — set via your hosting env vars.</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className={label}>Subscribed fields</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-[#128C7E]/10 border border-[#128C7E]/30 text-[12px] font-medium text-[#0E6B60]">messages</span>
            </div>
          </div>
        </div>

        {/* Environment status */}
        <div className={`${card} p-5 flex flex-col gap-3`}>
          <span className={`${heading} text-[15px]`}>Environment status</span>
          <div className="flex flex-col">
            {env.map((e) => {
              const ok = isSet(e.name);
              return (
                <div key={e.name} className="flex items-center gap-3 py-2.5 border-b border-[#10231F]/[0.06] last:border-0">
                  <StatusDot ok={ok} amberWhenMissing={!e.required} />
                  <div className="flex flex-col">
                    <span className="font-mono text-[12.5px] font-semibold text-[#10231F]/85">{e.name}</span>
                    <span className="text-[11.5px] text-[#10231F]/50">{e.desc}</span>
                  </div>
                  <span className={`ml-auto text-[11.5px] font-semibold ${ok ? "text-[#136B3B]" : e.required ? "text-[#B03D30]" : "text-[#9A6E1E]"}`}>
                    {ok ? "Set" : e.required ? "Missing" : "Not set"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusDot({ ok, amberWhenMissing, className = "" }: { ok: boolean; amberWhenMissing?: boolean; className?: string }) {
  const color = ok ? "bg-[#1FA855]" : amberWhenMissing ? "bg-[#E8A33D]" : "bg-[#E05B4C]";
  return <span className={`w-2 h-2 rounded-full ${color} ${className}`} />;
}
