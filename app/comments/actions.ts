"use server";

import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export type CommentRecord = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export async function getComments(): Promise<CommentRecord[]> {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
  });
  return comments.map((c) => ({
    id: c.id,
    name: c.name,
    message: c.message,
    createdAt: c.createdAt.toISOString(),
  }));
}

export async function createComment(input: { name: string; message: string; }): Promise<CommentRecord> {
  const name = input.name.trim();
  const message = input.message.trim();
  if (name.length === 0 || name.length > 50) {
    throw new Error("Invalid name length");
  }
  if (message.length === 0 || message.length > 300) {
    throw new Error("Invalid message length");
  }

  const created = await prisma.comment.create({
    data: { name, message },
  });
  return {
    id: created.id,
    name: created.name,
    message: created.message,
    createdAt: created.createdAt.toISOString(),
  };
}