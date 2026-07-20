const { TWEET_LIKE_COUNT } = require("./constants");

async function seedTweetLikes(prisma, users, tweets) {
  let created = 0;

  for (let i = 0; i < TWEET_LIKE_COUNT; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const tweet = tweets[Math.floor(Math.random() * tweets.length)];

    try {
      await prisma.tweetLike.create({
        data: {
          userId: user.id,
          tweetId: tweet.id,
        },
      });

      created++;
    } catch {}
  }

  console.log(`✅ ${created} tweet likes created.`);
}

module.exports = seedTweetLikes;