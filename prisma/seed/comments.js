const { faker } = require("@faker-js/faker");
const { COMMENT_COUNT } = require("./constants");

async function seedComments(prisma, users, videos) {
  const comments = [];

  for (let i = 0; i < COMMENT_COUNT; i++) {
    const owner = users[Math.floor(Math.random() * users.length)];
    const video = videos[Math.floor(Math.random() * videos.length)];

    const comment = await prisma.comment.create({
      data: {
        content: faker.lorem.sentences({ min: 1, max: 3 }),
        ownerId: owner.id,
        videoId: video.id,
      },
    });

    comments.push(comment);
  }

  console.log(`✅ ${comments.length} comments created.`);

  return comments;
}

module.exports = seedComments;