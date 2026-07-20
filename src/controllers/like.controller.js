const asyncHandler = require("../utils/asyncHandler");
const likeService = require("../services/like.service");
const ApiResponse = require("../utils/ApiResponse");

const toggleVideoLike = asyncHandler(async (req, res) => {
  const result = await likeService.toggleVideoLike(
    req.params.videoId,
    req.user.id
  );

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Video like status updated successfully."));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const result = await likeService.toggleCommentLike(
    req.params.commentId,
    req.user.id
  );

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Comment like status updated successfully."));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const result = await likeService.toggleTweetLike(
    req.params.tweetId,
    req.user.id
  );

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Tweet like status updated successfully."));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const videos = await likeService.getLikedVideos(req.user.id);

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Liked videos fetched successfully."));
});

module.exports = {
  toggleVideoLike,
  toggleCommentLike,
  toggleTweetLike,
  getLikedVideos,
};