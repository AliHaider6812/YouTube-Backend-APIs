require("dotenv").config();
const logger = require("./utils/logger");

const app = require("./app");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});