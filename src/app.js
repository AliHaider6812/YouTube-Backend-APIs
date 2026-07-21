const apiLimiter = require("./middlewares/rateLimit.middleware");

const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler.middleware.js");

const morgan = require("morgan");
const logger = require("./utils/logger");

const routes = require("./routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  morgan("combined", {
    stream: logger.stream,
  })
);
app.use(apiLimiter);

app.use("/", routes);
app.use(errorHandler);
module.exports = app;