const asyncHandler = require("../utils/asyncHandler");
const videoService = require("../services/video.service");
const ApiResponse = require("../utils/ApiResponse");

const uploadVideo = asyncHandler(async (req, res) => {
  const video = await videoService.uploadVideo(req);

  return res
    .status(201)
    .json(new ApiResponse(201, video, "Video uploaded successfully."));
});

const getAllVideos = asyncHandler(async (req, res) => {
  const videos = await videoService.getAllVideos(req.query);

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos fetched successfully."));
});

const getVideoById = asyncHandler(async (req, res) => {
  const video = await videoService.getVideoById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully."));
});

const updateVideo = asyncHandler(async (req, res) => {
  const video = await videoService.updateVideo(
    req.params.id,
    req.user.id,
    req.body
  );

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video updated successfully."));
});

const deleteVideo = asyncHandler(async (req, res) => {
  await videoService.deleteVideo(
    req.params.id,
    req.user.id
  );

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Video deleted successfully."));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const video = await videoService.togglePublishStatus(
    req.params.id,
    req.user.id
  );

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video publish status updated successfully."));
});

module.exports = {
  uploadVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};