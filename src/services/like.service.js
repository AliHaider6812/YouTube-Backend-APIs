const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");

const toggleVideoLike = async (videoId, userId) => {
  // 1. Check video exists
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });

  if (!video) {
    throw new ApiError(404,"Video not found.");
  }

  // 2. Check if already liked
  const existingLike = await prisma.videoLike.findUnique({
    where: {
      userId_videoId: {
        userId,
        videoId,
      },
    },
  });

  // 3. Unlike
  if (existingLike) {
    await prisma.videoLike.delete({
      where: {
        userId_videoId: {
          userId,
          videoId,
        },
      },
    });

    return {
      liked: false,
      message: "Video unliked successfully.",
    };
  }

  // 4. Like
  await prisma.videoLike.create({
    data: {
      userId,
      videoId,
    },
  });

  return {
    liked: true,
    message: "Video liked successfully.",
  };
};

const toggleCommentLike = async (commentId, userId) => {
  // 1. Check comment exists
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    throw new ApiError(404,"Comment not found.");
  }

  // 2. Check existing like
  const existingLike = await prisma.commentLike.findUnique({
    where: {
      userId_commentId: {
        userId,
        commentId,
      },
    },
  });

  // 3. Unlike
  if (existingLike) {
    await prisma.commentLike.delete({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });

    return {
      liked: false,
      message: "Comment unliked successfully.",
    };
  }

  // 4. Like
  await prisma.commentLike.create({
    data: {
      userId,
      commentId,
    },
  });

  return {
    liked: true,
    message: "Comment liked successfully.",
  };
};

const toggleTweetLike = async (tweetId, userId) => {
  // 1. Check tweet exists
  const tweet = await prisma.tweet.findUnique({
    where: {
      id: tweetId,
    },
  });

  if (!tweet) {
    throw new ApiError(404,"Tweet not found.");
  }

  // 2. Check existing like
  const existingLike = await prisma.tweetLike.findUnique({
    where: {
      userId_tweetId: {
        userId,
        tweetId,
      },
    },
  });

  // 3. Unlike
  if (existingLike) {
    await prisma.tweetLike.delete({
      where: {
        userId_tweetId: {
          userId,
          tweetId,
        },
      },
    });

    return {
      liked: false,
      message: "Tweet unliked successfully.",
    };
  }

  // 4. Like
  await prisma.tweetLike.create({
    data: {
      userId,
      tweetId,
    },
  });

  return {
    liked: true,
    message: "Tweet liked successfully.",
  };
};

const getLikedVideos = async (userId) => {
  return await prisma.videoLike.findMany({
    where: {
      userId,
    },
    include: {
      video: {
        include: {
          owner: {
            select: {
              id: true,
              username: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

module.exports = {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getLikedVideos


};