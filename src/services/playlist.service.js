const prisma = require("../config/prisma");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const createPlaylist = async (data, userId) => {
  const { name, description } = data;

  const playlist = await prisma.playlist.create({
    data: {
      name,
      description,
      createdById: userId,
    },
  });

  logger.info(
    `Playlist "${playlist.name}" created by user ${userId}`
  );

  return playlist;
};

const getMyPlaylists = async (userId) => {
  return await prisma.playlist.findMany({
    where: {
      createdById: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getPlaylistById = async (playlistId) => {
  const playlist = await prisma.playlist.findUnique({
    where: {
      id: playlistId,
    },
    include: {
      videos: {
        include: {
          video: {
            select: {
              id: true,
              title: true,
              thumbnailUrl: true,
              duration: true,
              views: true,
              isPublished: true,
            },
          },
        },
      },
      createdBy: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (!playlist) {
    throw new ApiError(404, "Playlist not found.");
  }

  return playlist;
};

const addVideoToPlaylist = async (playlistId, videoId, userId) => {
  // 1. Check playlist exists
  const playlist = await prisma.playlist.findUnique({
    where: {
      id: playlistId,
    },
  });

  if (!playlist) {
    throw new ApiError(404, "Playlist not found.");
  }

  // 2. Verify logged-in user owns the playlist
  if (playlist.createdById !== userId) {
    throw new ApiError(401, "You are not authorized to modify this playlist.");
  }

  // 3. Check video exists
  const video = await prisma.video.findUnique({
    where: {
      id: videoId,
    },
  });

  if (!video) {
    throw new ApiError(404, "Video not found.");
  }

  // 4. Prevent duplicate entry
  const existingVideo = await prisma.playlistVideo.findUnique({
    where: {
      playlistId_videoId: {
        playlistId,
        videoId,
      },
    },
  });

  if (existingVideo) {
    throw new ApiError(409, "Video already exists in the playlist.");
  }

  // 5. Add video to playlist
  const playlistVideo = await prisma.playlistVideo.create({
    data: {
      playlistId,
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
    `Video "${playlistVideo.video.title}" added to playlist "${playlist.name}" by user ${userId}`
  );

  return playlistVideo;
};

const removeVideoFromPlaylist = async (playlistId, videoId, userId) => {
  // 1. Check playlist exists
  const playlist = await prisma.playlist.findUnique({
    where: {
      id: playlistId,
    },
  });

  if (!playlist) {
    throw new ApiError(404, "Playlist not found.");
  }

  // 2. Verify logged-in user owns the playlist
  if (playlist.createdById !== userId) {
    throw new ApiError(401, "You are not authorized to modify this playlist.");
  }

  // 3. Check video exists in the playlist
  const playlistVideo = await prisma.playlistVideo.findUnique({
    where: {
      playlistId_videoId: {
        playlistId,
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

  if (!playlistVideo) {
    throw new ApiError(404, "Video not found in playlist.");
  }

  // 4. Remove video from playlist
  await prisma.playlistVideo.delete({
    where: {
      playlistId_videoId: {
        playlistId,
        videoId,
      },
    },
  });

  logger.info(
    `Video "${playlistVideo.video.title}" removed from playlist "${playlist.name}" by user ${userId}`
  );

  return {
    message: "Video removed from playlist successfully.",
  };
};

const deletePlaylist = async (playlistId, userId) => {
  // 1. Check playlist exists
  const playlist = await prisma.playlist.findUnique({
    where: {
      id: playlistId,
    },
  });

  if (!playlist) {
    throw new ApiError(404, "Playlist not found.");
  }

  // 2. Verify logged-in user owns the playlist
  if (playlist.createdById !== userId) {
    throw new ApiError(401, "You are not authorized to delete this playlist.");
  }

  // 3. Delete playlist
  await prisma.playlist.delete({
    where: {
      id: playlistId,
    },
  });

  logger.info(
    `Playlist "${playlist.name}" deleted by user ${userId}`
  );

  return;
};

module.exports = {
  createPlaylist,
  getMyPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
};