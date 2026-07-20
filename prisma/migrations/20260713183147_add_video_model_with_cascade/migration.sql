/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `videoFile` on the `Video` table. All the data in the column will be lost.
  - You are about to alter the column `duration` on the `Video` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `avatarUrl` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoUrl` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
DROP COLUMN "coverImage",
ADD COLUMN     "avatarUrl" TEXT NOT NULL,
ADD COLUMN     "coverImageUrl" TEXT;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "thumbnail",
DROP COLUMN "videoFile",
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL,
ADD COLUMN     "videoUrl" TEXT NOT NULL,
ALTER COLUMN "duration" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE INDEX "Video_createdAt_idx" ON "Video"("createdAt");

-- CreateIndex
CREATE INDEX "Video_isPublished_idx" ON "Video"("isPublished");
