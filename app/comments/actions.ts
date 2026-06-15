"use server";

import { PrismaClient } from "../../generated/prisma";
import { headers } from "next/headers";
import { createHash, randomUUID } from "crypto";
import { unstable_noStore as noStore } from "next/cache";

const prisma = new PrismaClient();

const DAILY_LIMIT = 5;
const WINDOW_MS = 24 * 60 * 60 * 1000;

export type CommentRecord = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

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
  const forwarded = headerStore.get("x-forwarded-for");
  if (!forwarded) {
    return null;
  }
  const ip = forwarded.split(",")[0].trim();
  if (!ip) {
    return null;
  }
  return hashIp(ip);
}

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
  });

  return {
    id: created.id,
    name: created.name,
    message: created.message,
    createdAt: created.createdAt.toISOString(),
  };
}
