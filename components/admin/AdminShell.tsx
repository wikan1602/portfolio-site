"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/inbox", label: "Inbox", exact: false },
  { href: "/admin/contacts", label: "Contacts", exact: false },
  { href: "/admin/settings", label: "Settings", exact: false },
];

function isActive(pathname: string, href: string, exact: boolean) {
  return exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  // Login page renders bare (its own centered card) — no console chrome.
  if (pathname === "/admin/login") return <>{children}</>;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#E8ECE8] text-[#10231F]">
      {/* Top nav */}
      <header className="h-[60px] px-4 sm:px-7 flex items-center gap-4 sm:gap-8 bg-[#0D2B25]">
        <Link href="/admin" className="flex items-center gap-2.5 shrink-0">
          <span className="w-[30px] h-[30px] rounded-lg bg-[#25D366] grid place-items-center font-[family-name:var(--font-space)] font-bold text-[15px] text-[#0D2B25]">R</span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-[family-name:var(--font-space)] font-semibold text-[15px] text-white">Relay</span>
            <span className="text-[10px] tracking-[0.06em] text-white/45">WHATSAPP CONSOLE</span>
          </span>
        </Link>

        <nav className="flex items-stretch gap-1 h-full overflow-x-auto">
          {NAV.map((n) => {
            const active = isActive(pathname, n.href, n.exact);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center px-3.5 text-[13.5px] whitespace-nowrap transition-colors ${
                  active
                    ? "text-white font-semibold shadow-[inset_0_-3px_0_#25D366]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        <button
          onClick={logout}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.08] border border-white/10 text-[12.5px] text-white hover:bg-white/[0.14] transition-colors"
        >
          Log out
        </button>
      </header>

      <main className="px-4 sm:px-7 py-7">
        <div className="max-w-[1360px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
