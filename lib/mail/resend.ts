import { Resend } from "resend";
import type { AttachmentData } from "resend";

let cached: Resend | null = null;

// Lazily constructs the client so build-time module evaluation (which
// imports route handlers without a live RESEND_API_KEY) never crashes —
// only an actual request needs the env var to be set.
export function getResend(): Resend {
  if (!cached) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not set");
    cached = new Resend(apiKey);
  }
  return cached;
}

export interface InboundEmail {
  emailId: string;
  from: string;
  to: string[];
  subject: string;
  text: string | null;
  html: string | null;
  messageId: string;
  inReplyTo: string | null;
  references: string | null;
  attachments: { filename: string; contentType: string; size: number; url: string }[];
}

function findHeader(headers: Record<string, string> | null, name: string): string | null {
  if (!headers) return null;
  const key = Object.keys(headers).find((k) => k.toLowerCase() === name.toLowerCase());
  return key ? headers[key] : null;
}

export async function fetchInboundEmail(emailId: string): Promise<InboundEmail> {
  const resend = getResend();
  const { data, error } = await resend.emails.receiving.get(emailId);
  if (error || !data) {
    throw new Error(`Failed to fetch inbound email ${emailId}: ${error?.message ?? "unknown error"}`);
  }

  let attachments: InboundEmail["attachments"] = [];
  if (data.attachments.length > 0) {
    const { data: attachmentList } = await resend.emails.receiving.attachments.list({ emailId });
    attachments = (attachmentList?.data ?? []).map((a: AttachmentData) => ({
      filename: a.filename ?? "attachment",
      contentType: a.content_type,
      size: a.size,
      url: a.download_url,
    }));
  }

  return {
    emailId: data.id,
    from: data.from,
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
    messageId: data.message_id,
    inReplyTo: findHeader(data.headers, "In-Reply-To"),
    references: findHeader(data.headers, "References"),
    attachments,
  };
}

export interface SendEmailInput {
  to: string;
  subject: string;
  text: string;
  headers?: Record<string, string>;
}

export async function sendEmail(input: SendEmailInput) {
  return getResend().emails.send({
    from: process.env.MAIL_FROM_ADDRESS!,
    to: input.to,
    subject: input.subject,
    text: input.text,
    headers: input.headers,
  });
}
