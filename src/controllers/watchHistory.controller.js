const asyncHandler = require("../utils/asyncHandler");
const watchHistoryService = require("../services/watchHistory.service");
const ApiResponse = require("../utils/ApiResponse");

const addToWatchHistory =asyncHandler(async (req, res) => {
  
    const history = await watchHistoryService.addToWatchHistory(
      req.params.videoId,
      req.user.id
    );

    return res
    .status(201)
    .json(new ApiResponse(201,history,"video added successfully to watchHistory"));
     
});

const getWatchHistory =asyncHandler(async (req, res) => {
  
    const history = await watchHistoryService.getWatchHistory(req.user.id);

    return res
    .status(200)
    .json(new ApiResponse(200,history,"Watch history fetched successfully."))
  });

const updateWatchProgress = asyncHandler(async (req, res) => {
  
    const history = await watchHistoryService.updateWatchProgress(
      req.params.videoId,
      req.user.id,
      req.body.progressSeconds
    );

    return res
    .status(200)
    .json(new ApiResponse(200,history,"Watch progress updated successfully."));
  });

const removeFromWatchHistory =asyncHandler(async (req, res) => {
  
    await watchHistoryService.removeFromWatchHistory(
      req.params.videoId,
      req.user.id
    );

    return res
    .status(200)
    .json(new ApiResponse(200,null,"Video removed from watch history."));
    });

module.exports = {
  addToWatchHistory,
  getWatchHistory,
  updateWatchProgress,
  removeFromWatchHistory
};