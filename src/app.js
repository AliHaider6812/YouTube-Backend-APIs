const apiLimiter = require("./middlewares/rateLimit.middleware");

const helmet = require("helmet");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler.middleware.js");

const morgan = require("morgan");
const logger = require("./utils/logger");

const routes = require("./routes");

const app = express();
app.disable("x-powered-by");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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


app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

module.exports = app;