// Server renders in UTC (Vercel); force WIB so admin timestamps match local time.
const TIME_ZONE = "Asia/Jakarta";

export function formatWIB(value: string | null): string {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  });
}
