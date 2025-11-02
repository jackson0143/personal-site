"use server";

import { PrismaClient } from "../../generated/prisma";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

const prisma = new PrismaClient();

export type CommentRecord = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export async function getComments(): Promise<CommentRecord[]> {
  noStore();
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
    throw new Error("Invalid name, must be between 1 and 50 characters");
  }
  if (message.length === 0 || message.length > 300) {
    throw new Error("Invalid message, must be between 1 and 300 characters");
  }

 
  const cookieStore = await cookies();
  const RATE_COOKIE = "commentDaily";
  const now = new Date();
  const today = now.toISOString().slice(0, 10); 
  const [storedDate, storedCount] = (cookieStore.get(RATE_COOKIE)?.value ?? "").split("|");
  const count = storedDate === today ? Number(storedCount) || 0 : 0;
  if (count >= 3) {
    throw new Error("Daily limit reached. You can post up to 3 comments per day");
  }

  const created = await prisma.comment.create({
    data: { name, message },
  });

  
  const nextMidnightUtc = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0, 0, 0, 0
  ));
  cookieStore.set(RATE_COOKIE, `${today}|${count + 1}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: nextMidnightUtc,
  });
  return {
    id: created.id,
    name: created.name,
    message: created.message,
    createdAt: created.createdAt.toISOString(),
  };
}