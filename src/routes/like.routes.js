const express = require("express");
const router = express.Router();

const likeController = require("../controllers/like.controller");
const verifyJWT = require("../middlewares/auth.middleware");

// Toggle Video Like
router.post(
  "/videos/:videoId",
  verifyJWT,
  likeController.toggleVideoLike
);

router.post(
  "/comments/:commentId",
  verifyJWT,
  likeController.toggleCommentLike
);

router.post(
  "/tweets/:tweetId",
  verifyJWT,
  likeController.toggleTweetLike
);

router.get(
  "/videos",
  verifyJWT,
  likeController.getLikedVideos
);
module.exports = router;