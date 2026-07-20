const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const videoRoutes = require("./video.routes");
const playlistRoutes = require("./playlist.routes");
const commentRoutes = require("./comment.routes");
const likeRoutes = require("./like.routes");
const tweetRoutes = require("./tweet.routes");
const subscriptionRoutes = require("./subscription.routes");
const watchHistoryRoutes = require("./watchHistory.routes");

router.use("/api/v1/users", userRoutes);
router.use("/api/v1/videos", videoRoutes);
router.use("/api/v1/playlists", playlistRoutes);
router.use("/api/v1/comments", commentRoutes);
router.use("/api/v1/likes", likeRoutes);
router.use("/api/v1/tweets", tweetRoutes);
router.use("/api/v1/subscriptions", subscriptionRoutes);
router.use("/api/v1/watch-history", watchHistoryRoutes);
module.exports = router;