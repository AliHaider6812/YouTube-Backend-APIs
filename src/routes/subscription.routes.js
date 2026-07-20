const express = require("express");
const router = express.Router();

const subscriptionController = require("../controllers/subscription.controller");
const verifyJWT = require("../middlewares/auth.middleware");

router.post(
  "/:channelId",
  verifyJWT,
  subscriptionController.subscribeChannel
);
router.delete(
  "/:channelId",
  verifyJWT,
  subscriptionController.unsubscribeChannel
);
router.get(
  "/channel/:channelId",
  verifyJWT,
  subscriptionController.getChannelSubscribers
);
router.get(
  "/me",
  verifyJWT,
  subscriptionController.getMySubscriptions
);



module.exports = router;