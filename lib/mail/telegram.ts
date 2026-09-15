export interface NotifyTelegramInput {
  from: string;
  subject: string;
  snippet: string;
  threadId: string;
}

export async function notifyTelegram(input: NotifyTelegramInput): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const baseUrl = process.env.APP_BASE_URL;
  if (!token || !chatId) return;

  const link = baseUrl ? `${baseUrl}/mail/thread/${input.threadId}` : undefined;
  const text = [
    `📬 New email from ${input.from}`,
    input.subject,
    "",
    input.snippet,
    link ? `\n${link}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}
