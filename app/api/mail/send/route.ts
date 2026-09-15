import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { messages, threads } from "@/lib/db/schema";
import { sendEmail } from "@/lib/mail/resend";
import { sendMailSchema } from "@/lib/mail/types";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = sendMailSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  const input = parsed.data;

  let threadId = input.threadId;
  let to = input.to;
  let subject = input.subject;
  let headers: Record<string, string> | undefined;

  if (threadId) {
    const [thread] = await db.select().from(threads).where(eq(threads.id, threadId)).limit(1);
    if (!thread) {
      return NextResponse.json({ ok: false, error: "Thread not found" }, { status: 404 });
    }
    to = thread.participantEmail;
    subject = subject ?? (thread.subject.match(/^\s*re:/i) ? thread.subject : `Re: ${thread.subject}`);

    const [lastInbound] = await db
      .select({ messageIdHeader: messages.messageIdHeader })
      .from(messages)
      .where(eq(messages.threadId, threadId))
      .orderBy(desc(messages.createdAt))
      .limit(1);

    if (lastInbound?.messageIdHeader) {
      headers = {
        "In-Reply-To": lastInbound.messageIdHeader,
        References: lastInbound.messageIdHeader,
      };
    }
  }

  if (!to || !subject) {
    return NextResponse.json({ ok: false, error: "Recipient and subject are required" }, { status: 400 });
  }

  const { data, error } = await sendEmail({ to, subject, text: input.body, headers });

  if (error || !data) {
    if (threadId) {
      await db.insert(messages).values({
        threadId,
        direction: "outbound",
        fromAddress: process.env.MAIL_FROM_ADDRESS!,
        toAddress: to,
        subject,
        textBody: input.body,
        snippet: input.body.slice(0, 160),
        status: "failed",
        errorMessage: error?.message ?? "Unknown error sending email",
      });
    }
    return NextResponse.json({ ok: false, error: error?.message ?? "Failed to send email" }, { status: 502 });
  }

  if (!threadId) {
    const [created] = await db
      .insert(threads)
      .values({ subject, participantEmail: to, lastMessageAt: new Date(), unread: false })
      .returning({ id: threads.id });
    threadId = created.id;
  }

  await db.insert(messages).values({
    threadId,
    resendEmailId: data.id,
    direction: "outbound",
    fromAddress: process.env.MAIL_FROM_ADDRESS!,
    toAddress: to,
    subject,
    textBody: input.body,
    snippet: input.body.slice(0, 160),
    status: "sent",
  });

  await db.update(threads).set({ lastMessageAt: new Date(), updatedAt: new Date() }).where(eq(threads.id, threadId));

  return NextResponse.json({ ok: true, threadId });
}
