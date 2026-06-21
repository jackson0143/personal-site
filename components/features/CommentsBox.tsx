"use client";

type CommentBoxProps = {
  name: string;
  message: string;
  createdAt: string; // ISO string
};

export default function CommentsBox({ name, message, createdAt }: CommentBoxProps) {
  return (
    <div className="comment">
      <div className="comment-head">
        <span className="comment-name">{name}</span>
        <time className="comment-time" dateTime={createdAt} suppressHydrationWarning>
          {new Date(createdAt).toLocaleString()}
        </time>
      </div>
      <p>{message}</p>
    </div>
  );
}
