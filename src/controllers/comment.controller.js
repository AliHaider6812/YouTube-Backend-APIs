const asyncHandler = require("../utils/asyncHandler");
const commentService = require("../services/comment.service");
const ApiResponse = require("../utils/ApiResponse");

const createComment = asyncHandler(async (req, res) => {
  const comment = await commentService.createComment(
    req.params.videoId,
    req.body.content,
    req.user.id
  );

  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment created successfully."));
});

const getCommentsByVideo = asyncHandler(async (req, res) => {
  const comments = await commentService.getCommentsByVideo(req.params.videoId);

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully."));
});

const updateComment = asyncHandler(async (req, res) => {
  const comment = await commentService.updateComment(
    req.params.id,
    req.body.content,
    req.user.id
  );

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated successfully."));
});

const deleteComment = asyncHandler(async (req, res) => {
  await commentService.deleteComment(req.params.id, req.user.id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Comment deleted successfully."));
});

module.exports = {
  createComment,
  getCommentsByVideo,
  updateComment,
  deleteComment,
};