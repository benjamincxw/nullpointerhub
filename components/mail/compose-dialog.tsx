"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ComposeDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function handleSend() {
    setSending(true);
    setError(null);

    const res = await fetch("/api/mail/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, body }),
    });
    const data = await res.json().catch(() => null);

    if (res.ok && data?.ok) {
      setOpen(false);
      setTo("");
      setSubject("");
      setBody("");
      router.push(`/mail/thread/${data.threadId}`);
      router.refresh();
    } else {
      setError(data?.error ?? "Failed to send email");
    }
    setSending(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Compose</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New message</DialogTitle>
        <div className="mt-5 flex flex-col gap-3">
          <Input type="email" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
          <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <Textarea placeholder="Write your message…" value={body} onChange={(e) => setBody(e.target.value)} />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button size="sm" className="self-end" onClick={handleSend} disabled={sending || !to || !subject || !body}>
            {sending ? "Sending…" : "Send"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
