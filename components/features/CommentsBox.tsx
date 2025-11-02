"use client";

import * as React from "react";

type CommentBoxProps = {
  name: string;
  message: string;
  createdAt: string; // ISO string
};

export default function CommentsBox({ name, message, createdAt }: CommentBoxProps) {
  return (
    <article className="rounded-lg border p-3">
      <div className="flex items-baseline justify-between gap-3">
        <strong className="text-sm">{name}</strong>
        <time className="text-xs text-muted-foreground">
          {new Date(createdAt).toLocaleString()}
        </time>
      </div>
      <p className="mt-1 text-sm leading-relaxed">{message}</p>
    </article>
  );
}
