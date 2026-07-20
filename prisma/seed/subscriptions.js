const { SUBSCRIPTION_COUNT } = require("./constants");

async function seedSubscriptions(prisma, users) {
  let created = 0;

  for (let i = 0; i < SUBSCRIPTION_COUNT; i++) {
    const subscriber = users[Math.floor(Math.random() * users.length)];
    const channel = users[Math.floor(Math.random() * users.length)];

    if (subscriber.id === channel.id) continue;

    try {
      await prisma.subscription.create({
        data: {
          subscriberId: subscriber.id,
          channelId: channel.id,
        },
      });

      created++;
    } catch {}
  }

  console.log(`✅ ${created} subscriptions created.`);
}

module.exports = seedSubscriptions;