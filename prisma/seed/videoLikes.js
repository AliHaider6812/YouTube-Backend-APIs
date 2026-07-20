const { VIDEO_LIKE_COUNT } = require("./constants");

async function seedVideoLikes(prisma, users, videos) {
  let created = 0;

  for (let i = 0; i < VIDEO_LIKE_COUNT; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const video = videos[Math.floor(Math.random() * videos.length)];

    try {
      await prisma.videoLike.create({
        data: {
          userId: user.id,
          videoId: video.id,
        },
      });

      created++;
    } catch (error) {
      // Ignore duplicate likes
    }
  }

  console.log(`✅ ${created} video likes created.`);
}

module.exports = seedVideoLikes;