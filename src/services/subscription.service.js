const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const subscribeChannel = async (channelId, subscriberId) => {
  // Cannot subscribe to yourself
  if (channelId === subscriberId) {
    throw new ApiError(403, "You cannot subscribe to your own channel.");
  }

  // Check channel exists
  const channel = await prisma.user.findUnique({
    where: {
      id: channelId,
    },
  });

  if (!channel) {
    throw new ApiError(404, "Channel not found.");
  }

  // Prevent duplicate subscription
  const existingSubscription = await prisma.subscription.findUnique({
    where: {
      subscriberId_channelId: {
        subscriberId,
        channelId,
      },
    },
  });

  if (existingSubscription) {
    throw new ApiError(409, "Already subscribed.");
  }

  // Subscribe
  const subscription = await prisma.subscription.create({
    data: {
      subscriberId,
      channelId,
    },
    include: {
      channel: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
  });

  logger.info(
    `User ${subscriberId} subscribed to channel ${channel.username} (${channelId})`
  );

  return subscription;
};

const unsubscribeChannel = async (channelId, subscriberId) => {
  // Check subscription exists
  const subscription = await prisma.subscription.findUnique({
    where: {
      subscriberId_channelId: {
        subscriberId,
        channelId,
      },
    },
    include: {
      channel: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!subscription) {
    throw new ApiError(404, "Subscription not found.");
  }

  // Delete subscription
  await prisma.subscription.delete({
    where: {
      subscriberId_channelId: {
        subscriberId,
        channelId,
      },
    },
  });

  logger.info(
    `User ${subscriberId} unsubscribed from channel ${subscription.channel.username} (${channelId})`
  );
};

const getChannelSubscribers = async (channelId) => {
  return await prisma.subscription.findMany({
    where: {
      channelId,
    },
    include: {
      subscriber: {
        select: {
          id: true,
          username: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getMySubscriptions = async (subscriberId) => {
  return await prisma.subscription.findMany({
    where: {
      subscriberId,
    },
    include: {
      channel: {
        select: {
          id: true,
          username: true,
          fullName: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

module.exports = {
  subscribeChannel,
  unsubscribeChannel,
  getChannelSubscribers,
  getMySubscriptions,
};