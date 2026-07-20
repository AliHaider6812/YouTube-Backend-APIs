-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_ownerId_fkey";

-- CreateIndex
CREATE INDEX "Video_ownerId_idx" ON "Video"("ownerId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
