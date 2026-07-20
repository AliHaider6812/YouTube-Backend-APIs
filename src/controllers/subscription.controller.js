const asyncHandler = require("../utils/asyncHandler");
const subscriptionService = require("../services/subscription.service");
const ApiResponse = require("../utils/ApiResponse");

const subscribeChannel = asyncHandler(async (req, res) => {
  const subscription = await subscriptionService.subscribeChannel(
    req.params.channelId,
    req.user.id
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        subscription,
        "Channel subscribed successfully."
      )
    );
});

const unsubscribeChannel = asyncHandler(async (req, res) => {
  await subscriptionService.unsubscribeChannel(
    req.params.channelId,
    req.user.id
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        "Channel unsubscribed successfully."
      )
    );
});

const getChannelSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await subscriptionService.getChannelSubscribers(
    req.params.channelId
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribers,
        "Channel subscribers fetched successfully."
      )
    );
});

const getMySubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await subscriptionService.getMySubscriptions(
    req.user.id
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscriptions,
        "Subscriptions fetched successfully."
      )
    );
});

module.exports = {
  subscribeChannel,
  unsubscribeChannel,
  getChannelSubscribers,
  getMySubscriptions,
};