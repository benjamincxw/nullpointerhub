import { desc } from "drizzle-orm";
import { ComposeDialog } from "@/components/mail/compose-dialog";
import { ThreadList } from "@/components/mail/thread-list";
import { db } from "@/lib/db/client";
import { threads } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function MailInboxPage() {
  const inbox = await db.select().from(threads).orderBy(desc(threads.lastMessageAt));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-chalk">Inbox</h1>
        <ComposeDialog />
      </div>
      <div className="mt-4">
        <ThreadList threads={inbox} />
      </div>
    </div>
  );
}
