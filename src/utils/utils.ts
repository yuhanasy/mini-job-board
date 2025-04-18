import { redirect } from "next/navigation";

export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function relativeTime(date: string | Date) {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const now = new Date().getTime();
  const then = new Date(date).getTime();
  const diff = (now - then) / 1000; // in seconds

  const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
  ];

  for (const { unit, seconds } of units) {
    const delta = Math.floor(diff / seconds);
    if (Math.abs(delta) >= 1) {
      return rtf.format(-1 * delta, unit);
    }
  }

  return "just now";
}
