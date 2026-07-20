/*
  Warnings:

  - You are about to drop the column `lastwatchedAt` on the `WatchHistory` table. All the data in the column will be lost.
  - Added the required column `lastWatchedAt` to the `WatchHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WatchHistory" DROP COLUMN "lastwatchedAt",
ADD COLUMN     "lastWatchedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Video_ownerId_isPublished_idx" ON "Video"("ownerId", "isPublished");
