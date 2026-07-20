-- CreateTable
CREATE TABLE "TweetLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tweetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TweetLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TweetLike_userId_idx" ON "TweetLike"("userId");

-- CreateIndex
CREATE INDEX "TweetLike_tweetId_idx" ON "TweetLike"("tweetId");

-- CreateIndex
CREATE UNIQUE INDEX "TweetLike_userId_tweetId_key" ON "TweetLike"("userId", "tweetId");

-- AddForeignKey
ALTER TABLE "TweetLike" ADD CONSTRAINT "TweetLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TweetLike" ADD CONSTRAINT "TweetLike_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
