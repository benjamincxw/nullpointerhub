import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { messages, threads } from "@/lib/db/schema";
import type { InboundEmail } from "@/lib/mail/resend";

function normalizeSubject(subject: string) {
  return subject.replace(/^\s*(re|fwd?):\s*/gi, "").trim().toLowerCase();
}

function lastReferenceId(references: string | null): string | null {
  if (!references) return null;
  const ids = references.trim().split(/\s+/);
  return ids.length > 0 ? ids[ids.length - 1] : null;
}

/**
 * Resolves the thread an inbound email belongs to: match by In-Reply-To/References
 * header against a prior message's Message-Id first, falling back to a normalized
 * subject + participant match, otherwise creating a new thread.
 */
export async function resolveThread(email: InboundEmail): Promise<string> {
  const candidateMessageId = email.inReplyTo ?? lastReferenceId(email.references);

  if (candidateMessageId) {
    const [match] = await db
      .select({ threadId: messages.threadId })
      .from(messages)
      .where(eq(messages.messageIdHeader, candidateMessageId))
      .limit(1);
    if (match) return match.threadId;
  }

  const normalized = normalizeSubject(email.subject);
  const participantThreads = await db
    .select({ id: threads.id, subject: threads.subject })
    .from(threads)
    .where(eq(threads.participantEmail, email.from));

  const subjectMatch = participantThreads.find((t) => normalizeSubject(t.subject) === normalized);
  if (subjectMatch) return subjectMatch.id;

  const [created] = await db
    .insert(threads)
    .values({
      subject: email.subject,
      participantEmail: email.from,
      lastMessageAt: new Date(),
      unread: true,
    })
    .returning({ id: threads.id });

  return created.id;
}
