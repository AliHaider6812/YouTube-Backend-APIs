const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const addToWatchHistory = async (videoId, userId) => {
  // Check video exists
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });

  if (!video) {
    throw new ApiError(404, "Video not found.");
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
  const history = await prisma.watchHistory.create({
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

  logger.info(
    `Video "${history.video.title}" added to watch history by user ${userId}`
  );

  return history;
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
    throw new ApiError(404, "Watch history not found.");
  }

  const updatedHistory = await prisma.watchHistory.update({
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

  logger.info(
    `Watch progress updated for video "${updatedHistory.video.title}" by user ${userId}. Progress: ${progressSeconds}s`
  );

  return updatedHistory;
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
    include: {
      video: {
        select: {
          title: true,
        },
      },
    },
  });

  if (!history) {
    throw new ApiError(404, "Watch history not found.");
  }

  await prisma.watchHistory.delete({
    where: {
      userId_videoId: {
        userId,
        videoId,
      },
    },
  });

  logger.info(
    `Video "${history.video.title}" removed from watch history by user ${userId}`
  );
};

module.exports = {
  addToWatchHistory,
  getWatchHistory,
  updateWatchProgress,
  removeFromWatchHistory,
};