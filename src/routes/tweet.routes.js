const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate");
const { tweetSchema } = require("../validations/tweet.validation");

const tweetController = require("../controllers/tweet.controller");
const verifyJWT = require("../middlewares/auth.middleware");

// Create Tweet
router.post(
  "/",
  verifyJWT,
  validate(tweetSchema),
  tweetController.createTweet
);

router.get(
  "/",
  verifyJWT,
  tweetController.getAllTweets
);

router.patch(
  "/:id",
  verifyJWT,
  validate(tweetSchema),
  tweetController.updateTweet
);

router.delete(
  "/:id",
  verifyJWT,
  tweetController.deleteTweet
);

module.exports = router;