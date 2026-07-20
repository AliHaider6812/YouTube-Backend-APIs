const asyncHandler = require("../utils/asyncHandler");
const playlistService = require("../services/playlist.service");
const ApiResponse = require("../utils/ApiResponse");

const createPlaylist = asyncHandler(async (req, res) => {
  const playlist = await playlistService.createPlaylist(
    req.body,
    req.user.id
  );

  return res
    .status(201)
    .json(new ApiResponse(201, playlist, "Playlist created successfully."));
});

const getMyPlaylists = asyncHandler(async (req, res) => {
  const playlists = await playlistService.getMyPlaylists(req.user.id);

  return res
    .status(200)
    .json(new ApiResponse(200, playlists, "Playlists fetched successfully."));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const playlist = await playlistService.getPlaylistById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist fetched successfully."));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const playlist = await playlistService.addVideoToPlaylist(
    req.params.playlistId,
    req.params.videoId,
    req.user.id
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        playlist,
        "Video added to playlist successfully."
      )
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const playlist = await playlistService.removeVideoFromPlaylist(
    req.params.playlistId,
    req.params.videoId
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        playlist,
        "Video removed from playlist successfully."
      )
    );
});

const deletePlaylist = asyncHandler(async (req, res) => {
  await playlistService.deletePlaylist(
    req.params.id,
    req.user.id
  );

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Playlist deleted successfully."));
});

module.exports = {
  createPlaylist,
  getMyPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
};