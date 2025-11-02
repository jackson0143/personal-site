"use client";

import * as React from "react";
import CommentsBox from "@/components/features/CommentsBox";

type Comment = {
  id: string;
  name: string;
  message: string;
  createdAt: string; // ISO string
};

export default function CommentsBoard() {
    const [comments, setComments] = React.useState<Comment[]>([]);
    const [name, setName] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [submitting, setSubmitting] = React.useState(false);

    //validate the name and message
    const nameValid = name.trim().length > 0 && name.trim().length <= 50;
    const messageValid = message.trim().length > 0 && message.trim().length <= 300;
    const canSubmit = nameValid && messageValid && !submitting;

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!canSubmit) return;
        setSubmitting(true);
        const now = new Date().toISOString();
        const newComment: Comment = {
        id: `c-${Date.now()}`,
        name: name.trim(),
        message: message.trim(),
        createdAt: now,
        };
        setComments((prev) => [newComment, ...prev]);
        setName("");
        setMessage("");
        setSubmitting(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="flex flex-col gap-2">
          <label className="text-sm">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
          <div className="text-xs text-muted-foreground">{name.trim().length}/50</div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say something nice…"
            rows={4}
            className="w-full resize-y rounded-md border bg-background px-3 py-2 text-sm"
          />
          <div className="text-xs text-muted-foreground">{message.trim().length}/300</div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-md border px-3 py-2 text-sm disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
        >
          {submitting ? "Submitting…" : "Post comment"}
        </button>
      </form>

      <div className="space-y-3">
        {comments.map((c) => (
          <CommentsBox key={c.id} name={c.name} message={c.message} createdAt={c.createdAt} />
        ))}
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        ) : null}
      </div>
    </div>
  );
}


