"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors border border-slate-800 hover:border-rose-900 px-3 py-1.5 rounded-lg"
    >
      Log out
    </button>
  );
}
