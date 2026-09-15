import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { messages, threads } from "@/lib/db/schema";
import { fetchInboundEmail } from "@/lib/mail/resend";
import { notifyTelegram } from "@/lib/mail/telegram";
import { resolveThread } from "@/lib/mail/threading";
import { isEmailReceivedEvent, verifyResendWebhook } from "@/lib/mail/webhook-verify";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  let event;
  try {
    event = verifyResendWebhook(rawBody, request.headers);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }

  if (!isEmailReceivedEvent(event)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const email = await fetchInboundEmail(event.data.email_id);
  const threadId = await resolveThread(email);

  const snippet = (email.text ?? email.html ?? "").replace(/\s+/g, " ").trim().slice(0, 160);

  const inserted = await db
    .insert(messages)
    .values({
      threadId,
      resendEmailId: email.emailId,
      messageIdHeader: email.messageId,
      inReplyToHeader: email.inReplyTo,
      direction: "inbound",
      fromAddress: email.from,
      toAddress: email.to.join(", "),
      subject: email.subject,
      textBody: email.text,
      htmlBody: email.html,
      snippet,
      attachments: email.attachments,
    })
    .onConflictDoNothing({ target: messages.resendEmailId })
    .returning({ id: messages.id });

  if (inserted.length === 0) {
    // Resend retried a webhook we already processed — idempotent no-op.
    return NextResponse.json({ ok: true, duplicate: true });
  }

  await db
    .update(threads)
    .set({ lastMessageAt: new Date(), unread: true, updatedAt: new Date() })
    .where(eq(threads.id, threadId));

  try {
    await notifyTelegram({ from: email.from, subject: email.subject, snippet, threadId });
  } catch {
    // Telegram outage should never fail the webhook response.
  }

  return NextResponse.json({ ok: true });
}
