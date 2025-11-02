-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "message" VARCHAR(300) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comment_createdAt_idx" ON "Comment"("createdAt");
