const prisma = require("../config/prisma");
const uploadOnCloudinary = require("../utils/cloudinary");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const uploadVideo = async (req) => {
  const { title, description } = req.body;

  const videoFile = req.files?.video?.[0];
  const thumbnailFile = req.files?.thumbnail?.[0];

  if (!videoFile) {
    throw new ApiError(400, "Video file is required.");
  }

  if (!thumbnailFile) {
    throw new ApiError(400, "Thumbnail is required.");
  }

  const uploadedVideo = await uploadOnCloudinary(videoFile.path);
  const uploadedThumbnail = await uploadOnCloudinary(thumbnailFile.path);

  const video = await prisma.video.create({
    data: {
      title,
      description,
      videoUrl: uploadedVideo.secure_url,
      thumbnailUrl: uploadedThumbnail.secure_url,
      duration: uploadedVideo.duration || 0,
      ownerId: req.user.id,
    },
  });

  logger.info(
    `Video uploaded: "${video.title}" by user ${req.user.id}`
  );

  return video;
};

const getAllVideos = async ({
  page = 1,
  limit = 10,
  search = "",
}) => {
  const skip = (page - 1) * limit;

  const videos = await prisma.video.findMany({
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    skip,
    take: Number(limit),
    orderBy: {
      createdAt: "desc",
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

  return videos;
};

const getVideoById = async (videoId) => {
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
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

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  return video;
};

const updateVideo = async (videoId, userId, data) => {
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });

  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  if (video.ownerId !== userId) {
    throw new ApiError(401, "Unauthorized.");
  }

  const updatedVideo = await prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      title: data.title,
      description: data.description,
    },
  });

  logger.info(
    `Video updated: "${updatedVideo.title}" by user ${userId}`
  );

  return updatedVideo;
};

const deleteVideo = async (videoId, userId) => {
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });

  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  if (video.ownerId !== userId) {
    throw new ApiError(401, "Unauthorized.");
  }

  await prisma.video.delete({
    where: {
      id: videoId,
    },
  });

  logger.info(
    `Video deleted: "${video.title}" by user ${userId}`
  );
};

const togglePublishStatus = async (videoId, userId) => {
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });

  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  if (video.ownerId !== userId) {
    throw new ApiError(401, "Unauthorized.");
  }

  const updatedVideo = await prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      isPublished: !video.isPublished,
    },
  });

  logger.info(
    `Publish status changed for video "${updatedVideo.title}" by user ${userId}. Published: ${updatedVideo.isPublished}`
  );

  return updatedVideo;
};

module.exports = {
  uploadVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};