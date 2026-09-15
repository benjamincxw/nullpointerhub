import { asc, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageBubble } from "@/components/mail/message-bubble";
import { db } from "@/lib/db/client";
import { messages, threads } from "@/lib/db/schema";
import { ReplyForm } from "./reply-form";

export const dynamic = "force-dynamic";

export default async function MailThreadPage(props: PageProps<"/mail/thread/[id]">) {
  const { id } = await props.params;

  const [thread] = await db.select().from(threads).where(eq(threads.id, id)).limit(1);
  if (!thread) notFound();

  const threadMessages = await db
    .select()
    .from(messages)
    .where(eq(messages.threadId, id))
    .orderBy(asc(messages.createdAt));

  if (thread.unread) {
    await db.update(threads).set({ unread: false, updatedAt: new Date() }).where(eq(threads.id, id));
  }

  return (
    <div>
      <Link href="/mail" className="text-sm text-ash hover:text-signal">
        ← Inbox
      </Link>

      <h1 className="mt-3 text-lg font-semibold text-chalk">{thread.subject}</h1>
      <p className="text-sm text-ash">{thread.participantEmail}</p>

      <div className="mt-6 flex flex-col gap-4">
        {threadMessages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <ReplyForm threadId={thread.id} />
    </div>
  );
}
