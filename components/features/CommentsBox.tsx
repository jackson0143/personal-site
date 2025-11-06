"use client";

import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card";

type CommentBoxProps = {
  name: string;
  message: string;
  createdAt: string; // ISO string
};

export default function CommentsBox({ name, message, createdAt }: CommentBoxProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm">{name}</CardTitle>
        <CardAction>
          <time className="text-xs text-muted-foreground">
            {new Date(createdAt).toLocaleString()}
          </time>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed">{message}</p>
      </CardContent>
    </Card>
  );
}
