"use server";

import { PrismaClient } from "../../generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";
import { headers } from "next/headers";
import { createHash, randomUUID } from "crypto";
import { unstable_noStore as noStore } from "next/cache";

//speed up performance by using prisma accelerate, no need for redis
const prisma = new PrismaClient().$extends(withAccelerate());

const DAILY_LIMIT = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000;


const PUBLIC_FIELDS = { id: true, name: true, message: true, createdAt: true } as const;

export type CommentRecord = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

const toRecord = (c: { id: string; name: string; message: string; createdAt: Date }) => ({
  ...c,
  createdAt: c.createdAt.toISOString(),
});

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT;
  if (!salt) {
    throw new Error("IP_HASH_SALT is not configured");
  }
  return createHash("sha256").update(`${ip}${salt}`).digest("hex");
}

// Returns a salted hash of the client IP
async function getClientIpHash(): Promise<string | null> {
  const headerStore = await headers();
  const ip =
    headerStore.get("x-real-ip")?.trim() ||
    headerStore.get("x-forwarded-for")?.split(",")[0].trim();
  if (!ip) {
    return null;
  }
  return hashIp(ip);
}

export async function getComments(): Promise<CommentRecord[]> {
  noStore();
  const comments = await prisma.comment.findMany({
    select: PUBLIC_FIELDS,
    orderBy: { createdAt: "desc" },
  });
  return comments.map(toRecord);
}

export async function createComment(input: {
  name: string;
  message: string;
  website?: string;
}): Promise<CommentRecord> {
  const name = input.name.trim();
  const message = input.message.trim();
  if (name.length === 0 || name.length > 50) {
    throw new Error("Invalid name, must be between 1 and 50 characters");
  }
  if (message.length === 0 || message.length > 300) {
    throw new Error("Invalid message, must be between 1 and 300 characters");
  }

  //BOTS BE GONE!!
  if (input.website && input.website.trim().length > 0) {
    return {
      id: randomUUID(),
      name,
      message,
      createdAt: new Date().toISOString(),
    };
  }

  const ipHash = await getClientIpHash();

  if (ipHash) {
    const since = new Date(Date.now() - WINDOW_MS);
    const recentCount = await prisma.comment.count({
      where: { ipHash, createdAt: { gte: since } },
    });
    if (recentCount >= DAILY_LIMIT) {
      throw new Error(
        "Daily limit reached. You can post up to 5 comments per day"
      );
    }
  }

  const created = await prisma.comment.create({
    data: { name, message, ipHash },
    select: PUBLIC_FIELDS,
  });

  return toRecord(created);
}
