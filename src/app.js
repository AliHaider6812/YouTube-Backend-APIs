const apiLimiter = require("./middlewares/rateLimit.middleware");
const helmet = require("helmet");

const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler.middleware.js");

const morgan = require("morgan");
const logger = require("./utils/logger");

const routes = require("./routes");

const app = express();
app.disable("x-powered-by");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(helmet());

app.use(
  morgan("combined", {
    stream: logger.stream,
  })
);
app.use(apiLimiter);

app.use("/", routes);
app.use(errorHandler);
module.exports = app;