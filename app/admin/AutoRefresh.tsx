"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Soft-refreshes the server component data on an interval so new WhatsApp
// messages appear without a manual reload. router.refresh() re-fetches server
// data while preserving client state (e.g. text being typed in the reply box).
// Pauses while the tab is hidden to avoid needless DB queries.
export default function AutoRefresh({ intervalMs = 5000 }: { intervalMs?: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    }, intervalMs);
    return () => clearInterval(id);
  }, [router, intervalMs]);

  return null;
}
