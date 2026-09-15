import Link from "next/link";
import type { Thread } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

const relativeTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function formatRelative(date: Date) {
  const diffMs = date.getTime() - Date.now();
  const diffMinutes = Math.round(diffMs / 60000);
  if (Math.abs(diffMinutes) < 60) return relativeTime.format(diffMinutes, "minute");
  const diffHours = Math.round(diffMinutes / 60);
  if (Math.abs(diffHours) < 24) return relativeTime.format(diffHours, "hour");
  const diffDays = Math.round(diffHours / 24);
  return relativeTime.format(diffDays, "day");
}

export function ThreadList({ threads }: { threads: Thread[] }) {
  if (threads.length === 0) {
    return <p className="py-12 text-center text-sm text-ash">No messages yet.</p>;
  }

  return (
    <ul className="divide-y divide-hairline">
      {threads.map((thread) => (
        <li key={thread.id}>
          <Link
            href={`/mail/thread/${thread.id}`}
            className="flex items-center justify-between gap-4 py-4 transition-colors hover:bg-slate/60"
          >
            <div className="min-w-0">
              <p className={cn("truncate text-sm", thread.unread ? "font-semibold text-chalk" : "text-ash")}>
                {thread.participantEmail}
              </p>
              <p className={cn("mt-0.5 truncate text-sm", thread.unread ? "text-chalk" : "text-ash")}>
                {thread.subject}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {thread.unread && <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />}
              <span className="text-xs text-ash">{formatRelative(new Date(thread.lastMessageAt))}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
