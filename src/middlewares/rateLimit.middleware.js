const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes

  max: 100, // 100 requests

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again after 10 minutes.",
  },
});

module.exports = apiLimiter;