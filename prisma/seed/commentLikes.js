const { COMMENT_LIKE_COUNT } = require("./constants");

async function seedCommentLikes(prisma, users, comments) {
  let created = 0;

  for (let i = 0; i < COMMENT_LIKE_COUNT; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const comment = comments[Math.floor(Math.random() * comments.length)];

    try {
      await prisma.commentLike.create({
        data: {
          userId: user.id,
          commentId: comment.id,
        },
      });

      created++;
    } catch {}
  }

  console.log(`✅ ${created} comment likes created.`);
}

module.exports = seedCommentLikes;