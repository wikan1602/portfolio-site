"use client";

import { useEffect, useState } from "react";

// The address is assembled in the browser after mount, so the raw
// `user@domain` string never appears in the server-rendered HTML that
// scrapers read. No-JS visitors still see a human-readable obfuscated form.
const OBFUSCATED = "wikan.bme [at] outlook [dot] com";

export default function EmailReveal({ className = "" }: { className?: string }) {
  const [addr, setAddr] = useState<string | null>(null);

  useEffect(() => {
    const user = ["wikan", "bme"].join(".");
    const domain = ["outlook", "com"].join(".");
    setAddr(`${user}@${domain}`);
  }, []);

  if (!addr) {
    return <span className={className}>{OBFUSCATED}</span>;
  }

  return (
    <a href={`mailto:${addr}`} className={className}>
      {addr}
    </a>
  );
}
