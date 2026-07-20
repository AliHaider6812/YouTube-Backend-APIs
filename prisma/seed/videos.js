const { faker } = require("@faker-js/faker");
const { VIDEO_COUNT } = require("./constants");

async function seedVideos(prisma, users) {
  const videos = [];

  for (let i = 0; i < VIDEO_COUNT; i++) {
    const owner = users[Math.floor(Math.random() * users.length)];

    const video = await prisma.video.create({
      data: {
        title: faker.lorem.sentence(4),
        description: faker.lorem.paragraph(),

        videoUrl: `https://example.com/videos/video-${i + 1}.mp4`,
        thumbnailUrl: `https://picsum.photos/seed/video${i}/640/360`,

        duration: faker.number.int({
          min: 60,
          max: 3600,
        }),

        views: faker.number.int({
          min: 0,
          max: 100000,
        }),

        isPublished: faker.datatype.boolean(),

        ownerId: owner.id,
      },
    });

    videos.push(video);
  }

  console.log(`✅ ${videos.length} videos created.`);

  return videos;
}

module.exports = seedVideos;