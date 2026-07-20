const prisma = require("../config/prisma");
const { get } = require("../routes");
const ApiError = require("../utils/ApiError");

const addToWatchHistory = async (videoId, userId) => {
  // Check video exists
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });

  if (!video) {
    throw new ApiErrorError(404,"Video not found.");
  }

  // Prevent duplicate history
  const existing = await prisma.watchHistory.findUnique({
    where: {
      userId_videoId: {
        userId,
        videoId,
      },
    },
  });

  if (existing) {
    return existing;
  }

  // Create watch history
  return await prisma.watchHistory.create({
    data: {
      userId,
      videoId,
    },
    include: {
      video: {
        select: {
          id: true,
          title: true,
          thumbnailUrl: true,
          duration: true,
        },
      },
    },
  });
};
const getWatchHistory = async (userId) => {
  return await prisma.watchHistory.findMany({
    where: {
      userId,
    },
    include: {
      video: {
        select: {
          id: true,
          title: true,
          thumbnailUrl: true,
          duration: true,
          views: true,
        },
      },
    },
    orderBy: {
      lastWatchedAt: "desc",
    },
  });
};

const updateWatchProgress = async (
  videoId,
  userId,
  progressSeconds
) => {
  const history = await prisma.watchHistory.findUnique({
    where: {
      userId_videoId: {
        userId,
        videoId,
      },
    },
    include: {
      video: true,
    },
  });

  if (!history) {
    throw new ApiError(404,"Watch history not found.");
  }

  return await prisma.watchHistory.update({
    where: {
      userId_videoId: {
        userId,
        videoId,
      },
    },
    data: {
      progressSeconds,
      completed: progressSeconds >= history.video.duration,
    },
    include: {
      video: {
        select: {
          id: true,
          title: true,
          duration: true,
        },
      },
    },
  });
};

const removeFromWatchHistory = async (
  videoId,
  userId
) => {
  const history = await prisma.watchHistory.findUnique({
    where: {
      userId_videoId: {
        userId,
        videoId,
      },
    },
  });

  if (!history) {
    throw new ApiError(404,"Watch history not found.");
  }

  await prisma.watchHistory.delete({
    where: {
      userId_videoId: {
        userId,
        videoId,
      },
    },
  });
};
module.exports = {
  addToWatchHistory,
  getWatchHistory,
  updateWatchProgress,
  removeFromWatchHistory
};