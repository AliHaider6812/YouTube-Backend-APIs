async function clearDatabase(prisma) {
  await prisma.watchHistory.deleteMany();

  await prisma.subscription.deleteMany();

  await prisma.playlistVideo.deleteMany();
  await prisma.playlist.deleteMany();

  await prisma.videoLike.deleteMany();
  await prisma.commentLike.deleteMany();
  await prisma.tweetLike.deleteMany();

  await prisma.comment.deleteMany();
  await prisma.tweet.deleteMany();

  await prisma.video.deleteMany();

  await prisma.user.deleteMany();

  console.log("🗑 Database cleared.");
}

module.exports = clearDatabase;