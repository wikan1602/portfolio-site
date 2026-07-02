"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

// The public marketing chrome (nav + footer) should not appear on the
// internal admin dashboard. These wrappers hide it on any /admin route.
function isAdminRoute(pathname: string | null): boolean {
  return !!pathname && pathname.startsWith("/admin");
}

export function SiteNavbar() {
  const pathname = usePathname();
  if (isAdminRoute(pathname)) return null;
  return <Navbar />;
}

export function SiteFooter() {
  const pathname = usePathname();
  if (isAdminRoute(pathname)) return null;

  return (
    <footer className="w-full border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-500 font-mono">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} wikan-ai.my.id. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/wikan1602"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/wikan-priambudi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
