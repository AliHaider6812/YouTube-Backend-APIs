const { faker } = require("@faker-js/faker");
const { TWEET_COUNT } = require("./constants");

async function seedTweets(prisma, users) {
  const tweets = [];

  for (let i = 0; i < TWEET_COUNT; i++) {
    const owner = users[Math.floor(Math.random() * users.length)];

    const tweet = await prisma.tweet.create({
      data: {
        content: faker.lorem.sentences({ min: 1, max: 2 }),
        ownerId: owner.id,
      },
    });

    tweets.push(tweet);
  }

  console.log(`✅ ${tweets.length} tweets created.`);

  return tweets;
}

module.exports = seedTweets;