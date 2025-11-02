"use client";

import * as React from "react";

import { useState } from "react";
import CommentsBox from "@/components/features/CommentsBox";
import { createComment } from "@/app/comments/actions";
import { toast } from "sonner";
type Comment = {
  id: string;
  name: string;
  message: string;
  createdAt: string; 
};

type CommentsBoardProps = {
  initialComments: Comment[];
};

export default function CommentsBoard({ initialComments }: CommentsBoardProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments ?? []);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            const trimmedName = name.trim();
            const trimmedMessage = message.trim();
            const created = await createComment({ name: trimmedName, message: trimmedMessage });
            setComments((prev) => [created, ...prev]);
            setName("");
            setMessage("");
            toast.success("Comment successfully posted");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to post comment");
        } finally {
            setSubmitting(false);
        }
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={onSubmit} className="space-y-3" aria-busy={submitting}>
        <fieldset disabled={submitting} className="space-y-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              maxLength={50}
   
              autoComplete="name"
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
              maxLength={300}
             
            />
            <div className="text-xs text-muted-foreground">{message.trim().length}/300</div>
          </div>
            {/* display the error message */}
          {error ? (
            <p role="alert" className="text-xs text-red-600">{error}</p>
          ) : null}

          {/*submit*/}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md border px-3 py-2 text-sm disabled:opacity-50 hover:bg-accent hover:text-accent-foreground"
          >
            {submitting ? "Submitting…" : "Post comment"}
          </button>
        </fieldset>
      </form>



      
          {/* display comments */}
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