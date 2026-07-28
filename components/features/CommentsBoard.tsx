"use client";

import { useState, type FormEvent } from "react";
import CommentsBox from "@/components/features/CommentsBox";
import { createComment, type CommentRecord } from "@/app/comments/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CommentsBoard({
  initialComments,
}: {
  initialComments: CommentRecord[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  // fake field, bots might be fooled
  const [website, setWebsite] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const created = await createComment({ name, message, website });
      setComments((prev) => [created, ...prev]);
      setName("");
      setMessage("");
      toast.success("Comment successfully posted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-16" style={{ maxWidth: "640px" }}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6" aria-busy={submitting}>
        {/*Fake field, dont remove*/}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />
        <fieldset disabled={submitting} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="field-label" htmlFor="comment-name">
              Name
            </label>
            <Input
              id="comment-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={50}
              autoComplete="name"
              className="text-[15px] md:text-[15px]"
            />
            <div className="text-xs text-muted-foreground self-end">{name.trim().length}/50</div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="field-label" htmlFor="comment-message">
              Message
            </label>
            <Textarea
              id="comment-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say something nice…"
              rows={4}
              maxLength={300}
              className="text-[15px] md:text-[15px]"
            />
            <div className="text-xs text-muted-foreground self-end">
              {message.trim().length}/300
            </div>
          </div>

          {/*submit*/}
          <Button
            type="submit"
            disabled={submitting}
            className="self-start uppercase tracking-[0.16em] text-[0.66rem] px-6 py-5"
          >
            {submitting ? "Submitting…" : "Post comment"}
          </Button>
        </fieldset>
      </form>

      {/* display comments */}
      <div>
        {comments.map((c) => (
          <CommentsBox key={c.id} name={c.name} message={c.message} createdAt={c.createdAt} />
        ))}
        {comments.length === 0 ? (
          <p className="text-muted-foreground">No comments yet.</p>
        ) : null}
      </div>
    </div>
  );
}
