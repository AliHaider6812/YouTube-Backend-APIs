const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { commentSchema } = require("../validations/comment.validation");

const commentController = require("../controllers/comment.controller");
const verifyJWT = require("../middlewares/auth.middleware");

// Create Comment
router.post(
  "/:videoId",
  verifyJWT,
  validate(commentSchema),
  commentController.createComment
);
router.get("/:videoId", verifyJWT, commentController.getCommentsByVideo);
router.patch(
  "/:id",
  verifyJWT,
  validate(commentSchema),
  commentController.updateComment
);
router.delete("/:id", verifyJWT, commentController.deleteComment);

module.exports = router;