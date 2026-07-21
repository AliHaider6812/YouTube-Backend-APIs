const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(
    `${req.ip}-${req.method} ${req.originalUrl} - ${err.statusCode || 500} - ${
      err.stack || err.message
    }`
  );

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;