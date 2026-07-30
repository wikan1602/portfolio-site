import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import AdminShell from "@/components/admin/AdminShell";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${spaceGrotesk.variable} ${plexSans.variable} font-[family-name:var(--font-plex)]`}>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
