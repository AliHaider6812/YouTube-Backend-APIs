const { faker } = require("@faker-js/faker");
const { WATCH_HISTORY_COUNT } = require("./constants");

async function seedWatchHistory(prisma, users, videos) {
  let created = 0;

  for (let i = 0; i < WATCH_HISTORY_COUNT; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const video = videos[Math.floor(Math.random() * videos.length)];

    try {
      await prisma.watchHistory.create({
        data: {
          userId: user.id,
          videoId: video.id,
          progressSeconds: faker.number.int({
            min: 0,
            max: video.duration,
          }),
          completed: faker.datatype.boolean(),
        },
      });

      created++;
    } catch {}
  }

  console.log(`✅ ${created} watch history records created.`);
}

module.exports = seedWatchHistory;