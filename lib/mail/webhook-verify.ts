import type { EmailReceivedEvent } from "resend";
import { getResend } from "@/lib/mail/resend";

export function verifyResendWebhook(payload: string, requestHeaders: globalThis.Headers) {
  const id = requestHeaders.get("svix-id");
  const timestamp = requestHeaders.get("svix-timestamp");
  const signature = requestHeaders.get("svix-signature");
  if (!id || !timestamp || !signature) {
    throw new Error("Missing Svix signature headers");
  }

  return getResend().webhooks.verify({
    payload,
    headers: { id, timestamp, signature },
    webhookSecret: process.env.RESEND_WEBHOOK_SECRET!,
  });
}

export function isEmailReceivedEvent(event: ReturnType<typeof verifyResendWebhook>): event is EmailReceivedEvent {
  return event.type === "email.received";
}
