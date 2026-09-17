import type { Message } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

const dateFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function MessageBubble({ message }: { message: Message }) {
  const inbound = message.direction === "inbound";

  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        inbound ? "border-hairline bg-slate" : "border-signal/30 bg-signal/5"
      )}
    >
      <div className="flex items-center justify-between gap-3 text-xs text-ash">
        <span>
          {inbound ? message.fromAddress : `You → ${message.toAddress}`}
        </span>
        <span>{dateFormat.format(new Date(message.createdAt))}</span>
      </div>

      {message.status === "failed" && (
        <p className="mt-2 text-xs text-red-400">Failed to send: {message.errorMessage}</p>
      )}

      <div className="mt-3 text-sm text-chalk">
        {message.htmlBody ? (
          <iframe
            title={`message-${message.id}`}
            sandbox="allow-same-origin"
            srcDoc={message.htmlBody}
            className="h-64 w-full rounded-lg border border-hairline bg-chalk"
          />
        ) : (
          <p className="whitespace-pre-wrap">{message.textBody}</p>
        )}
      </div>

      {message.attachments.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {message.attachments.map((attachment, i) => (
            <li key={i}>
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-hairline px-3 py-1 text-xs text-ash transition-colors duration-200 hover:border-signal/50 hover:text-signal"
              >
                {attachment.filename}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
