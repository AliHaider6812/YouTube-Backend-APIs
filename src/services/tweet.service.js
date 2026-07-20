const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const createTweet = async (content, userId) => {

  // Create tweet
  const tweet = await prisma.tweet.create({
    data: {
      content: content.trim(),
      ownerId: userId,
    },
    include: {
      owner: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
  });

  return tweet;
};

const getAllTweets = async () => {
  return await prisma.tweet.findMany({
    include: {
      owner: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
      likes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};


const updateTweet = async (tweetId, content, userId) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
    },
  });

  if (!tweet) {
    throw new ApiError(404,"Tweet not found.");
  }

  if (tweet.ownerId !== userId) {
    throw new ApiError(401,"You are not authorized to update this tweet.");
  }

  return await prisma.tweet.update({
    where: {
      id: tweetId,
    },
    data: {
      content,
    },
    include: {
      owner: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
  });
};

const deleteTweet = async (tweetId, userId) => {
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
    },
  });

  if (!tweet) {
    throw new ApiError(404,"Tweet not found.");
  }

  if (tweet.ownerId !== userId) {
    throw new ApiError(401,"You are not authorized to delete this tweet.");
  }

  await prisma.tweet.delete({
    where: {
      id: tweetId,
    },
  });
};
module.exports = {
  createTweet,
  getAllTweets,
  updateTweet,
  deleteTweet
};