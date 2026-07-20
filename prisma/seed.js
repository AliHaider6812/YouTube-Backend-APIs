const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Utilities
const clearDatabase = require("./seed/clearDatabase");

// Seed files
const seedUsers = require("./seed/users");
const seedVideos = require("./seed/videos");
const seedComments = require("./seed/comments");
const seedTweets = require("./seed/tweets");
const seedVideoLikes = require("./seed/videoLikes");
const seedCommentLikes = require("./seed/commentLikes");
const seedTweetLikes = require("./seed/tweetLikes");
const seedPlaylists = require("./seed/playlists");
const seedPlaylistVideos = require("./seed/playlistVideos");
const seedSubscriptions = require("./seed/subscriptions");
const seedWatchHistory = require("./seed/watchHistory");

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear old data
  await clearDatabase(prisma);

  // Seed Users
  const users = await seedUsers(prisma);

  // Seed Videos
  const videos = await seedVideos(prisma, users);

  // Seed Comments
  const comments = await seedComments(prisma, users, videos);

  // Seed Tweets
  const tweets = await seedTweets(prisma, users);

  // Seed Video Likes
  await seedVideoLikes(prisma, users, videos);

  await seedCommentLikes(prisma, users, comments);

  await seedTweetLikes(prisma, users, tweets);

  const playlists = await seedPlaylists(prisma, users);
  
  await seedPlaylistVideos(prisma, playlists, videos);

  await seedSubscriptions(prisma, users);

  await seedWatchHistory(prisma, users, videos);
}

main()
  .then(async () => {
    console.log("✅ Seeding completed.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });