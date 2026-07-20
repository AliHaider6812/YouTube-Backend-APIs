const asyncHandler = require("../utils/asyncHandler");
const tweetService = require("../services/tweet.service");
const ApiResponse = require("../utils/ApiResponse");

const createTweet = asyncHandler(async (req, res) => {
  const tweet = await tweetService.createTweet(
    req.body.content,
    req.user.id
  );

  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "Tweet created successfully."));
});

const getAllTweets = asyncHandler(async (req, res) => {
  const tweets = await tweetService.getAllTweets();

  return res
    .status(200)
    .json(new ApiResponse(200, tweets, "Tweets fetched successfully."));
});

const updateTweet = asyncHandler(async (req, res) => {
  const tweet = await tweetService.updateTweet(
    req.params.id,
    req.body.content,
    req.user.id
  );

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "Tweet updated successfully."));
});

const deleteTweet = asyncHandler(async (req, res) => {
  await tweetService.deleteTweet(
    req.params.id,
    req.user.id
  );

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Tweet deleted successfully."));
});

module.exports = {
  createTweet,
  getAllTweets,
  updateTweet,
  deleteTweet,
};