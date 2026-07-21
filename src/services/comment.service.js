const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const createComment = async (videoId, content, userId) => {
  // 1. Check video exists
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });

  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  // 2. Create comment
  const comment = await prisma.comment.create({
    data: {
      content: content.trim(),
      videoId,
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
      video: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  logger.info(
    `Comment created by user ${userId} on video "${comment.video.title}" (Comment ID: ${comment.id})`
  );

  return comment;
};

const getCommentsByVideo = async (videoId) => {
  const video = await prisma.video.findUnique({
    where: { id: videoId },
  });

  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  return await prisma.comment.findMany({
    where: {
      videoId,
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
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateComment = async (commentId, content, userId) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    throw new ApiError(404, "Comment not found.");
  }

  if (comment.ownerId !== userId) {
    throw new ApiError(401, "You are not authorized to update this comment.");
  }

  const updatedComment = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });

  logger.info(
    `Comment updated by user ${userId} (Comment ID: ${commentId})`
  );

  return updatedComment;
};

const deleteComment = async (commentId, userId) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    throw new ApiError(404, "Comment not found.");
  }

  if (comment.ownerId !== userId) {
    throw new ApiError(401, "You are not authorized to delete this comment.");
  }

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  logger.info(
    `Comment deleted by user ${userId} (Comment ID: ${commentId})`
  );
};

module.exports = {
  createComment,
  getCommentsByVideo,
  updateComment,
  deleteComment,
};