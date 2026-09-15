"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ReplyForm({ threadId }: { threadId: string }) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function handleSend() {
    setSending(true);
    setError(null);

    const res = await fetch("/api/mail/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId, body }),
    });
    const data = await res.json().catch(() => null);

    if (res.ok && data?.ok) {
      setBody("");
      router.refresh();
    } else {
      setError(data?.error ?? "Failed to send reply");
    }
    setSending(false);
  }

  return (
    <div className="mt-6 border-t border-hairline pt-6">
      <Textarea placeholder="Write a reply…" value={body} onChange={(e) => setBody(e.target.value)} />
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      <Button size="sm" className="mt-3" onClick={handleSend} disabled={sending || !body}>
        {sending ? "Sending…" : "Reply"}
      </Button>
    </div>
  );
}
